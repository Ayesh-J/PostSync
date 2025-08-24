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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 p-4 font-poppins">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="max-w-3xl w-full bg-white rounded-2xl shadow-xl p-6 md:p-10"
      >
        <header className="text-center mb-6">
          <img
            src="https://placehold.co/80x80/6a5acd/FFFFFF/png?text=PS"
            alt="PostSync Logo"
            className="mb-3 rounded-full border-4 border-indigo-600 mx-auto"
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
            <label className="block mb-2 font-medium text-gray-700">Caption:</label>
            <textarea
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-300"
              rows={3}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Craft your compelling caption here..."
            />

            <label className="block mt-3 mb-2 font-medium text-gray-700">
              Hashtags:
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-300"
              value={hashtags}
              onChange={(e) => setHashtags(e.target.value)}
              placeholder="#PostSync #SocialMediaTips #DigitalMarketing"
            />
          </section>

          {/* Platform Select */}
          <section className="bg-slate-50 p-4 rounded-xl shadow-inner">
            <h2 className="text-lg font-semibold text-indigo-600 mb-3">
              Choose Social Media Platforms
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { name: "Facebook", icon: <Facebook className="text-blue-600" size={24} /> },
                { name: "Instagram", icon: <Instagram className="text-pink-500" size={24} /> },
                { name: "WhatsApp", icon: <MessageCircle className="text-green-500" size={24} /> },
                { name: "LinkedIn", icon: <Linkedin className="text-blue-700" size={24} /> },
                { name: "X", icon: <Twitter className="text-black" size={24} /> },
              ].map((platform) => (
                <div
                  key={platform.name}
                  onClick={() => handlePlatformToggle(platform.name)}
                  className={`flex flex-col items-center p-3 border rounded-lg cursor-pointer shadow-sm hover:shadow-md transition ${
                    selectedPlatforms.includes(platform.name)
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  {platform.icon}
                  <p className="mt-2 text-sm font-semibold">{platform.name}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-full shadow hover:bg-indigo-700 transition"
            >
              <Eye className="inline-block mr-2" size={18} /> Preview Post
            </button>
          </div>
        </form>

        <footer className="text-center text-gray-400 text-sm mt-6 border-t pt-3">
          © 2025 PostSync. All rights reserved.
        </footer>
      </motion.div>

      {/* Preview Modal */}
      <Dialog open={previewOpen} onClose={() => setPreviewOpen(false)}>
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-6">
            <Dialog.Title className="text-xl font-bold text-indigo-700 mb-4">
              Your Post Preview
            </Dialog.Title>

            {file && (
              <div className="mb-4 text-center">
                {file.type.startsWith("image/") && (
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Preview"
                    className="max-h-52 mx-auto rounded-lg shadow"
                  />
                )}
                {file.type.startsWith("video/") && (
                  <video
                    src={URL.createObjectURL(file)}
                    controls
                    className="max-h-60 mx-auto rounded-lg shadow"
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

            <p className="mb-2"><strong>File:</strong> {file?.name || "No file uploaded"}</p>
            <p className="mb-2"><strong>Caption:</strong> {caption || "No caption provided"}</p>
            <p className="mb-2"><strong>Hashtags:</strong> {hashtags || "No hashtags provided"}</p>
            <p className="mb-2 font-semibold">Platforms:</p>
            <ul className="list-disc list-inside">
              {selectedPlatforms.length > 0 ? (
                selectedPlatforms.map((p) => <li key={p}>{p}</li>)
              ) : (
                <li className="text-red-500">No platforms selected</li>
              )}
            </ul>

            <div className="flex gap-2 justify-end mt-6 flex-wrap">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-gray-600 text-white rounded-md flex items-center gap-2 hover:bg-gray-700"
              >
                <Printer size={18} /> Print
              </button>
              <button
                onClick={copyContent}
                className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center gap-2 hover:bg-blue-700"
              >
                <Copy size={18} /> Copy Content
              </button>
              <button
                onClick={() => alert("Your content has been published! (simulation)")}
                disabled={selectedPlatforms.length === 0}
                className={`px-4 py-2 rounded-md flex items-center gap-2 text-white font-semibold transition ${
                  selectedPlatforms.length > 0
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                <Send size={18} /> Publish
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
