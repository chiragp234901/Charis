import ollama from "../config/ollama.js";
import productModel from "../models/productModel.js";

// ---------------- TEST AI ----------------

const testAI = async (req, res) => {
    try {
        const response = await ollama.chat({
            model: "qwen3:4b",
            think: false,
            messages: [
                {
                    role: "user",
                    content:
                        "Suggest one birthday gift for a woman who likes jewellery."
                }
            ]
        });

        res.json({
            success: true,
            response: response.message.content
        });

    } catch (error) {
        console.error("========== TEST AI ERROR ==========");
        console.error(error);
        console.error("===================================");

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ---------------- AI RECOMMENDATIONS ----------------

const getRecommendations = async (req, res) => {
    try {

        const {
            recipient,
            occasion,
            budget,
            preferences
        } = req.body;

        if (!recipient) {
            return res.status(400).json({
                success: false,
                message: "Recipient is required"
            });
        }

        const filter = {
            recipient
        };

        if (budget) {
            filter.price = {
                $lte: Number(budget)
            };
        }

        const products = await productModel
    .find(filter)
    .sort({ bestseller: -1, price: 1 })
    .limit(8);

        if (!products.length) {
            return res.json({
                success: true,
                recommendations: []
            });
        }

        const productData = products.map(product => ({
            name: product.name,
            category: product.category,
            subCategory: product.subCategory,
            price: product.price,
            bestseller: product.bestseller,
            description: product.description.slice(0, 120)
        }));

const prompt = `
You are an AI gift recommendation assistant.

Customer:

Recipient: ${recipient}
Occasion: ${occasion || "Gift"}
Budget: ₹${budget || "No limit"}
Preferences: ${preferences || "None"}

Products:

${JSON.stringify(productData)}

Return ONLY valid JSON.

Rules:

- Recommend up to 5 products.
- ONLY choose from the given list.
- productName must exactly match the product name.
- score must be an integer.
- reason must be under 20 words.

Example:

{
  "recommendations":[
    {
      "productName":"Diamond Necklace",
      "score":95,
      "reason":"Elegant bestseller within budget."
    }
  ]
}
`;

        console.log("1. Received request");

                const response = await ollama.chat({
                model: "qwen3:4b",
                think: false,
                format: "json",
                options: {
                    temperature: 0.1,
                    num_predict: 250
                },
                messages: [
                    {
                        role: "user",
                        content: prompt
                    }
                ]
            });

        console.log("2. Ollama responded");

        console.log("========== RAW AI ==========");
        console.log(response.message.content);
        console.log("============================");

        let aiResult;

        try {
            aiResult = JSON.parse(response.message.content);
        } catch (err) {

            console.error("Invalid AI JSON");
            console.error(response.message.content);

            return res.status(500).json({
                success: false,
                message: "AI returned invalid JSON."
            });
        }

        console.log("3. JSON parsed");

        const recommendations = (aiResult.recommendations || [])
            .map(rec => {

                const product = products.find(
                    p =>
                        p.name.trim().toLowerCase() ===
                        String(rec.productName)
                            .trim()
                            .toLowerCase()
                );

                if (!product) return null;

                return {
                    product,
                    score:
                        Number(
                            String(rec.score).replace(/[^0-9]/g, "")
                        ) || 0,
                    reason: rec.reason || ""
                };
            })
            .filter(Boolean);

        return res.json({
            success: true,
            recommendations
        });

    } catch (error) {

        console.error("========== RECOMMENDATION ERROR ==========");
        console.error(error);
        console.error("Message:", error.message);
        console.error("Cause:", error.cause);
        console.error("Stack:", error.stack);
        console.error("==========================================");

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export {
    testAI,
    getRecommendations
};