import React from "react";

const FeedbackSection = () => {
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
                        className="backdrop-blur-md bg-white/10 border border-white/20 p-8 rounded-2xl shadow-lg space-y-5 w-full max-w-md mx-auto"
                    >
                        <h3 className="text-xl font-semibold text-white">We value your feedback!</h3>
                        
                        <input 
                            type="text" 
                            placeholder="Your Name" 
                            className="w-full bg-white/10 text-white placeholder-white/70 border border-white/30 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            required
                        />

                        <input 
                            type="email" 
                            placeholder="Your Email" 
                            className="w-full bg-white/10 text-white placeholder-white/70 border border-white/30 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            required
                        />

                        <textarea 
                            placeholder="Your Feedback" 
                            rows="4" 
                            className="w-full bg-white/10 text-white placeholder-white/70 border border-white/30 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            required
                        />

                        <button 
                            type="submit" 
                            className="bg-yellow-400 text-black font-semibold px-6 py-2 rounded-lg hover:bg-yellow-300 transition duration-200"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default FeedbackSection;
