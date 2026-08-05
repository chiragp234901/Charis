import ollama from "../config/ollama.js";
import productModel from "../models/productModel.js";


// Test Qwen
const testAI = async (req, res) => {
    try {

       const response = await ollama.chat({
    model: "qwen3:4b",
    messages: [
        {
            role: "user",
            content: "Suggest one birthday gift for a woman who likes jewellery."
        }
    ]
});

        res.json({
            success: true,
            response: response.message.content
        });

    } catch (error) {
    console.error("========== OLLAMA ERROR ==========");
    console.error(error);
    console.error("Cause:", error.cause);
    console.error("Stack:", error.stack);
    console.error("==================================");

    res.status(500).json({
        success: false,
        message: error.message
    });
}
};


// AI Gift Recommendations
const getRecommendations = async (req, res) => {
    try {

        const {
            recipient,
            occasion,
            budget,
            preferences
        } = req.body;

        // Validate recipient
        if (!recipient) {
            return res.status(400).json({
                success: false,
                message: "Recipient is required"
            });
        }

        // Build MongoDB filter
        const filter = {
            recipient: recipient
        };

        // Apply budget if provided
        if (budget) {
            filter.price = {
                $lte: Number(budget)
            };
        }

        // Get products from MongoDB
        const products = await productModel
            .find(filter)
            .limit(30);

        if (products.length === 0) {
            return res.json({
                success: true,
                recommendations: [],
                message: "No suitable products found"
            });
        }

        // Only send useful information to Qwen
        const productData = products.map(product => ({
            id: product._id.toString(),
            name: product.name,
            description: product.description,
            category: product.category,
            subCategory: product.subCategory,
            price: product.price,
            bestseller: product.bestseller
        }));

        const prompt = `
You are an AI gift recommendation assistant for an online gift store.

Your job is to recommend the best products from the provided product list.

CUSTOMER INFORMATION:

Recipient: ${recipient}
Occasion: ${occasion || "General gift"}
Budget: ${budget ? `₹${budget}` : "No specific budget"}
Preferences: ${preferences || "No specific preferences"}

AVAILABLE PRODUCTS:

${JSON.stringify(productData, null, 2)}

INSTRUCTIONS:

1. Recommend the best 5 products or fewer if there are not enough suitable products.
2. ONLY recommend products from the provided list.
3. NEVER create or invent a product.
4. Consider the recipient.
5. Consider the occasion.
6. Consider the customer's budget.
7. Consider the customer's preferences.
8. Carefully read the product descriptions.
9. Consider category and subcategory.
10. Give each recommendation a score from 0 to 100.
11. Give a short explanation for each recommendation.

Return ONLY valid JSON in this exact structure:

{
    "recommendations": [
        {
            "productId": "MongoDB_PRODUCT_ID",
            "score": 95,
            "reason": "Short explanation"
        }
    ]
}
`;

        const response = await ollama.chat({
            
    model: "qwen3:4b",
    think: false,
    messages: [
        {
            role: "user",
            content: prompt
        }
    ],
    format: "json",
    options: {
        temperature: 0.2
    }
});
console.log("========== RAW AI ==========");
console.log(response.message.content);
console.log("============================");

        const aiResult = JSON.parse(
            response.message.content
        );

        // Match AI product IDs with actual MongoDB products
        const recommendations = aiResult.recommendations
            .map(recommendation => {

                const product = products.find(
                    item =>
                        item._id.toString() === recommendation.productId
                );

                if (!product) {
                    return null;
                }

                return {
                    product,
                    score: recommendation.score,
                    reason: recommendation.reason
                };
            })
            .filter(item => item !== null);

        res.json({
            success: true,
            recommendations
        });

    } catch (error) {

        console.log("Recommendation Error:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export { testAI, getRecommendations };