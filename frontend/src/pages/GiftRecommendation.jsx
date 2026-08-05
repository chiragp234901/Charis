import React, { useState } from "react";
import axios from "axios";
import { backendUrl } from "../config";
import { Link } from "react-router-dom";

const GiftRecommendation = () => {

    const [recipient, setRecipient] = useState("Women");
    const [occasion, setOccasion] = useState("Birthday");
    const [budget, setBudget] = useState("");
    const [preferences, setPreferences] = useState("");

    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const getRecommendations = async () => {

        try {

            setLoading(true);
            setError("");
            setRecommendations([]);

            const response = await axios.post(
                backendUrl + "/api/ai/recommend",
                {
                    recipient,
                    occasion,
                    budget: budget ? Number(budget) : undefined,
                    preferences
                }
            );

            if (response.data.success) {
                setRecommendations(
                    response.data.recommendations
                );
            } else {
                setError(response.data.message);
            }

        } catch (error) {

            console.log(error);

            setError(
                error.response?.data?.message ||
                "Something went wrong while finding gifts."
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">

            {/* Heading */}
            <div className="text-center mb-14">

                <h1 className="text-4xl sm:text-5xl font-bold text-[#4B072B]">
                    Find the Perfect Gift 🎁
                </h1>

                <p className="text-gray-600 mt-4 max-w-2xl mx-auto leading-7">
                    Tell us who you're shopping for, the occasion, and your budget.
                    Our AI will recommend thoughtful gifts tailored to your needs.
                </p>

            </div>


            {/* Form */}
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg border p-6 sm:p-8">

                {/* Recipient */}
                <div className="mb-5">

                    <label className="block mb-2 text-sm font-semibold text-gray-700">
                        Who are you buying for?
                    </label>

                    <select
                        value={recipient}
                        onChange={(e) =>
                            setRecipient(e.target.value)
                        }
                        className="w-full rounded-lg bg-[#4B072B] text-[#ffddd2] py-4 font-semibold transition hover:bg-[#64103c] disabled:opacity-60"
                    >
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                        <option value="Kids">Kids</option>
                    </select>

                </div>


                {/* Occasion */}
                <div className="mb-5">

                    <label className="block mb-2 font-medium">
                        What's the occasion?
                    </label>

                    <select
                        value={occasion}
                        onChange={(e) =>
                            setOccasion(e.target.value)
                        }
                        className="w-full border px-3 py-2"
                    >
                        <option value="Birthday">
                            Birthday
                        </option>

                        <option value="Anniversary">
                            Anniversary
                        </option>

                        <option value="Wedding">
                            Wedding
                        </option>

                        <option value="Valentine's Day">
                            Valentine's Day
                        </option>

                        <option value="Christmas">
                            Christmas
                        </option>

                        <option value="Just Because">
                            Just Because
                        </option>
                    </select>

                </div>


                {/* Budget */}
                <div className="mb-5">

                    <label className="block mb-2 font-medium">
                        What's your budget?
                    </label>

                    <input
                        type="number"
                        value={budget}
                        onChange={(e) =>
                            setBudget(e.target.value)
                        }
                        placeholder="Enter budget in $"
                        className="w-full border px-3 py-2"
                    />

                </div>


                {/* Preferences */}
                <div className="mb-6">

                    <label className="block mb-2 font-medium">
                        What do they like?
                    </label>

                    <textarea
                        value={preferences}
                        onChange={(e) =>
                            setPreferences(e.target.value)
                        }
                        placeholder="For example: She likes elegant jewellery and minimalist designs..."
                        rows="4"
                        className="w-full border px-3 py-2"
                    />

                </div>


                {/* Button */}
                <button
                    onClick={getRecommendations}
                    disabled={loading}
                    className="w-full bg-[#4B072B] text-white py-3"
                >
                    {loading
                        ? <div className="flex justify-center items-center gap-3">
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Finding Perfect Gifts...
                            </div>
                        : "Find Perfect Gifts"}
                </button>

            </div>


            {/* Error */}
            {error && (
                <p className="text-center text-red-500 mt-6">
                    {error}
                </p>
            )}


            {!loading && recommendations.length === 0 && !error && (
                <div className="text-center py-16">

                    <div className="text-6xl">🎁</div>

                    <h2 className="mt-6 text-2xl font-semibold text-[#4B072B]">
                        Ready to find the perfect gift?
                    </h2>

                    <p className="mt-3 text-gray-500">
                        Fill in the details above and let Charis AI help you.
                    </p>

                </div>
            )}


            {/* Recommendations */}
            {recommendations.length > 0 && (

                <div className="mt-12">

                    <h2 className="text-3xl font-bold text-[#4B072B] mb-8 text-center">
                        AI Recommendations ✨
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                        {recommendations.map((item) => (

                            <div
                                key={item.product._id}
                                className="rounded-2xl overflow-hidden border shadow-sm hover:shadow-xl transition duration-300 hover:-translate-y-2 bg-white"
                            >

                                {/* Product Image */}
                                <img
                                    src={item.product.image?.[0]}
                                    alt={item.product.name}
                                    className="w-full aspect-square object-cover"
                                />


                                <div className="p-4">

                                    <div className="flex justify-between items-start gap-3">

                                        <h3 className="font-medium text-lg">
                                            {item.product.name}
                                        </h3>

                                        <span className="text-sm font-semibold bg-[#ffddd2] text-[#4B072B] px-3 py-1 rounded-full">
                                            {item.score}% Match
                                        </span>

                                    </div>


                                    <p className="mt-3 text-xl font-bold text-[#4B072B]">
                                        ${item.product.price}
                                    </p>


                                    <p className="text-sm text-gray-600 leading-6 mt-3">
                                        {item.product.description}
                                    </p>


                                    <div className="mt-5 rounded-xl bg-[#ffddd2]/30 p-4">

                                        <p className="text-sm">
                                            <span className="font-medium">
                                                Why we recommend it:
                                            </span>
                                        </p>

                                        <p className="text-sm text-gray-600 mt-1">
                                            {item.reason}
                                        </p>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

            )}

        </div>
    );
};

export default GiftRecommendation;