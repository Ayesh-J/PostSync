import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FeedbackSection = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
        rating: 5, // Default rating
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === "rating" ? parseInt(value) : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage("");

        try {
            const res = await fetch("http://localhost:5000/api/feedback", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const result = await res.json();

            if (res.ok) {
                setMessage("Thank you for your feedback!");
                setFormData({
                    name: "",
                    email: "",
                    message: "",
                    rating: 5,
                });
                toast.success("Feedback submitted successfully!");
            } else {
                setMessage(result.message || "Something went wrong.");
                toast.error(result.message || "Submission failed.");
            }
        } catch (error) {
            setMessage("Server error. Please try again later.");
            toast.error("Server error. Please try again.");
        }

        setIsSubmitting(false);
    };

    return (
        <section className="bg-[#0b082b] text-white pt-16 pb-8 px-4">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12">Feedback</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">

                    {/* Left: Logo */}
                    <div className="flex justify-center">
                        <img
                            src="./PostSync_Logo.jpg"
                            alt="PostSync Logo"
                            className="w-100 h-100 drop-shadow-xl"
                        />
                    </div>

                    {/* Right: Feedback Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="backdrop-blur-md bg-white/10 border border-white/20 p-8 rounded-2xl shadow-lg space-y-5 w-full max-w-md mx-auto"
                    >
                        <h3 className="text-xl font-semibold text-white">We value your feedback!</h3>

                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full bg-white/10 text-white placeholder-white/70 border border-white/30 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            required
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-white/10 text-white placeholder-white/70 border border-white/30 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            required
                        />

                        <textarea
                            name="message"
                            placeholder="Your Feedback"
                            rows="4"
                            value={formData.feedback}
                            onChange={handleChange}
                            className="w-full bg-white/10 text-white placeholder-white/70 border border-white/30 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            required
                        />

                        {/* ⭐ Rating Field */}
                        <select
                            name="rating"
                            value={formData.rating}
                            onChange={handleChange}
                            className="w-full bg-white/10 text-black border border-white/30 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            required
                        >
                            <option value={5}>Excellent (5)</option>
                            <option value={4}>Good (4)</option>
                            <option value={3}>Average (3)</option>
                            <option value={2}>Poor (2)</option>
                            <option value={1}>Terrible (1)</option>
                        </select>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-yellow-400 text-black font-semibold px-6 py-2 rounded-lg hover:bg-yellow-300 transition duration-200"
                        >
                            {isSubmitting ? "Submitting..." : "Submit"}
                        </button>

                        {message && (
                            <p className="mt-4 text-sm text-green-600 dark:text-green-400">
                                {message}
                            </p>
                        )}
                    </form>
                </div>
                <ToastContainer position="bottom-right" autoClose={3000} />
            </div>
        </section>
    );
};

export default FeedbackSection;
