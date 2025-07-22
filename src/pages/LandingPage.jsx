import React from "react";
import { Instagram, Youtube, Facebook, Twitter } from "lucide-react";

const LandingPage = () => {
    return (
        <section className="relative h-screen bg-gradient-to-r from-[#06032d] to-[#1d176d] bg-cover bg-center">
            <div className="absolute inset-0 bg-overlay flex flex-col justify-center items-center text-white text-center px-6">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 text-primary">
                    Welcome to{" "}
                    <span className="bg-gradient-to-r from-[#00CFFF] to-[#D24AFF] bg-clip-text text-transparent">
                        PostSync
                    </span>
                </h1>
                <p className="text-lg md:text-xl mb-8 max-w-xl">
                    Your all-in-one platform for publishing content effortlessly across multiple social networks.
                </p>
                <button className="border-white border-2 text-white px-6 py-2 rounded-2xl font-semibold hover:bg-white hover:text-[#1d176d] transition duration-300">
                    Get Started
                </button>

                {/* Tagline and supported platforms */}
                <div className="mt-10">
                    <p className="text-sm md:text-base text-white font-semibold mb-4">
                        Supporting 4+ Platforms
                    </p>
                    <div className="flex gap-6 justify-center items-center">
                        <Instagram className="w-7 h-7 text-white hover:text-[#E1306C] transition duration-200" />
                        <Youtube className="w-7 h-7 text-white hover:text-[#FF0000] transition duration-200" />
                        <Facebook className="w-7 h-7 text-white hover:text-[#1877F2] transition duration-200" />
                        <Twitter className="w-7 h-7 text-white hover:text-[#1DA1F2] transition duration-200" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LandingPage;
