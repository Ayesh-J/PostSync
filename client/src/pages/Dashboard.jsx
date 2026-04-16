import React, { useState, useRef } from "react";
import { Dialog } from "@headlessui/react";
import { motion } from "framer-motion";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  MessageCircle,
  Upload,
  Eye,
  Printer,
  Copy,
  Send,
} from "lucide-react";

export default function PostSync() {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const uploaded = e.target.files[0];
    setFile(uploaded || null);
  };

  const handlePlatformToggle = (platform) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
  };

  const copyContent = async () => {
    const content = `File: ${file?.name || "No file uploaded"}
Caption: ${caption || "No caption"}
Hashtags: ${hashtags || "No hashtags"}
Platforms: ${selectedPlatforms.join(", ") || "None"}`;
    try {
      await navigator.clipboard.writeText(content);
      alert("Content copied to clipboard!");
    } catch {
      alert("Failed to copy content");
    }
  };

  // 🚀 NEW: REAL BACKEND CALL
  const handlePublish = async () => {
    if (!file) {
      alert("Please upload a file");
      return;
    }

    if (selectedPlatforms.length === 0) {
      alert("Select at least one platform");
      return;
    }

    try {
      // Facebook posting
      if (selectedPlatforms.includes("Facebook")) {
        const formData = new FormData();
        formData.append("caption", caption + " " + hashtags);
        formData.append("image", file);

        const response = await fetch("http://localhost:8080/api/facebook/post", {
          method: "POST",
          body: formData,
        });

        const result = await response.text();

        if (!response.ok) {
          throw new Error(result);
        }

        alert("Facebook पोस्ट successful!\n" + result);
      }

      // Future platforms (placeholder)
      if (selectedPlatforms.includes("Instagram")) {
        console.log("Instagram coming next...");
      }

      if (selectedPlatforms.includes("LinkedIn")) {
        console.log("LinkedIn coming next...");
      }

      if (selectedPlatforms.includes("WhatsApp")) {
        console.log("WhatsApp coming next...");
      }

      if (selectedPlatforms.includes("X")) {
        console.log("Twitter/X coming next...");
      }

    } catch (error) {
      console.error(error);
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#06032d] to-[#1d176d] p-4 font-poppins">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="max-w-3xl w-full bg-white rounded-2xl shadow-xl p-6 md:p-10"
      >
        <header className="text-center mb-6">
          <img
            src="./PostSync_Logo.jpg"
            alt="PostSync Logo"
            className=" h-30 w-30 mb-3 rounded-full border-4 border-indigo-600 mx-auto"
          />
          <h1 className="text-2xl font-bold text-indigo-800">PostSync</h1>
          <p className="text-gray-500 text-sm md:text-base mt-1">
            Your all-in-one platform for publishing content effortlessly across multiple social networks.
          </p>
        </header>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setPreviewOpen(true);
          }}
          className="space-y-6"
        >
          {/* Upload Section */}
          <section className="bg-slate-50 p-4 rounded-xl shadow-inner">
            <h2 className="text-lg font-semibold text-indigo-600 mb-3">
              Upload Your Content
            </h2>
            <div
              className="flex flex-col items-center justify-center border-2 border-dashed border-indigo-300 rounded-lg p-6 bg-indigo-50 cursor-pointer hover:border-indigo-500 transition"
              onClick={() => fileInputRef.current.click()}
            >
              <Upload className="text-indigo-500 mb-2" size={40} />
              <p className="font-medium text-indigo-700">
                Drag & Drop your media here or click to browse
              </p>
              <small className="text-gray-500">(Images, Videos, or Audio files)</small>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*,video/*,audio/*"
                className="hidden"
              />
            </div>

            {file && (
              <div className="mt-4 text-center">
                {file.type.startsWith("image/") && (
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Preview"
                    className="max-h-48 mx-auto rounded-lg shadow"
                  />
                )}
                {file.type.startsWith("video/") && (
                  <video
                    src={URL.createObjectURL(file)}
                    controls
                    className="max-h-56 mx-auto rounded-lg shadow"
                  />
                )}
                {file.type.startsWith("audio/") && (
                  <audio
                    src={URL.createObjectURL(file)}
                    controls
                    className="w-full"
                  />
                )}
              </div>
            )}
          </section>

          {/* Caption + Hashtags */}
          <section className="bg-slate-50 p-4 rounded-xl shadow-inner">
            <h2 className="text-lg font-semibold text-indigo-600 mb-3">
              Add Your Message
            </h2>
            <textarea
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-300"
              rows={3}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Craft your caption..."
            />

            <input
              type="text"
              className="w-full p-2 mt-3 border rounded-md focus:ring-2 focus:ring-indigo-300"
              value={hashtags}
              onChange={(e) => setHashtags(e.target.value)}
              placeholder="#hashtags"
            />
          </section>

          {/* Platform Select */}
          <section className="bg-slate-50 p-4 rounded-xl shadow-inner">
            <h2 className="text-lg font-semibold text-indigo-600 mb-3">
              Choose Platforms
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { name: "Facebook", icon: <Facebook className="text-blue-600" /> },
                { name: "Instagram", icon: <Instagram className="text-pink-500" /> },
                { name: "WhatsApp", icon: <MessageCircle className="text-green-500" /> },
                { name: "LinkedIn", icon: <Linkedin className="text-blue-700" /> },
                { name: "X", icon: <Twitter className="text-black" /> },
              ].map((platform) => (
                <div
                  key={platform.name}
                  onClick={() => handlePlatformToggle(platform.name)}
                  className={`p-3 border rounded-lg text-center cursor-pointer ${selectedPlatforms.includes(platform.name)
                      ? "bg-green-100 border-green-500"
                      : ""
                    }`}
                >
                  {platform.icon}
                  <p>{platform.name}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white rounded-full"
            >
              <Eye className="inline mr-2" /> Preview
            </button>
          </div>
        </form>

        <footer className="text-center text-gray-400 text-sm mt-6 border-t pt-3">
          © 2025 PostSync
        </footer>
      </motion.div>

      {/* Preview Modal */}
      <Dialog open={previewOpen} onClose={() => setPreviewOpen(false)}>
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <Dialog.Panel className="bg-white p-6 rounded-xl max-w-xl w-full">
            <h2 className="text-xl font-bold mb-4">Preview</h2>

            {file && (
              <img
                src={URL.createObjectURL(file)}
                alt="preview"
                className="max-h-52 mx-auto"
              />
            )}

            <p><b>Caption:</b> {caption}</p>
            <p><b>Hashtags:</b> {hashtags}</p>

            <button
              onClick={handlePublish}
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
            >
              <Send className="inline mr-2" /> Publish
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}