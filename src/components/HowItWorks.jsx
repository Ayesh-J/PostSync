// components/HowItWorks.tsx
import React from "react";
import { Upload, Settings, Share2, Send } from "lucide-react";

const steps = [
    {
        icon: <Upload size={36} className="text-[#00CFFF]" />,
        title: "Upload Content",
        desc: "Start by uploading your content in any format.",
    },
    {
        icon: <Settings size={36} className="text-[#D24AFF]" />,
        title: "Customize",
        desc: "Edit captions, hashtags, schedule time & more.",
    },
    {
        icon: <Share2 size={36} className="text-[#00CFFF]" />,
        title: "Select Platforms",
        desc: "Choose your target platforms like Instagram, YouTube, etc.",
    },
    {
        icon: <Send size={36} className="text-[#D24AFF]" />,
        title: "Publish",
        desc: "Just hit publish & we’ll handle the rest.",
    },
];

const HowItWorks = () => {
    return (
        <section className="w-full px-8 py-16 bg-[#f4f4f4] text-center" id="how">
            <h2 className="text-3xl md:text-4xl font-bold text-[#06032d] mb-10">How It Works</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {steps.map((step, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition duration-300"
                    >
                        <div className="mb-4 flex justify-center">{step.icon}</div>
                        <h3 className="text-xl font-semibold text-[#1d176d] mb-2">{step.title}</h3>
                        <p className="text-gray-600">{step.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default HowItWorks;
