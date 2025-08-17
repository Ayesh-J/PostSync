import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, User } from "lucide-react";

const SignupPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (err) {
      setError("Server error. Try again later.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#06032d] to-[#1d176d] text-white px-4">
      {/* Floating Card */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: 1,
          y: [0, -6, 0], // floating animation
        }}
        transition={{
          duration: 2,
        }}
        whileHover={{ scale: 1.02 }}
        className="flex flex-col md:flex-row bg-white/10 backdrop-blur-md rounded-2xl shadow-xl w-full max-w-4xl overflow-hidden border border-white/20"
      >
        {/* Left: Signup Form */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="md:w-1/2 p-8"
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-white">
            Create your PostSync account
          </h2>

          {error && (
            <motion.p
              initial={{ x: 0 }}
              animate={{ x: [0, -10, 10, -10, 10, 0] }}
              transition={{ duration: 0.4 }}
              className="text-red-400 text-sm mb-4 text-center"
            >
              {error}
            </motion.p>
          )}

          <form onSubmit={handleSignup} className="space-y-4">
            {/* Name */}
            <div className="relative">
              <label className="block text-sm font-medium text-white">Full Name</label>
              <User size={18} className="absolute left-3 top-9 text-white/70" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-10 mt-1 w-full p-2 border border-white/30 rounded-lg bg-white/20 text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-[#ffd700]"
                required
                placeholder="John Doe"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <label className="block text-sm font-medium text-white">Email</label>
              <Mail size={18} className="absolute left-3 top-9 text-white/70" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 mt-1 w-full p-2 border border-white/30 rounded-lg bg-white/20 text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-[#ffd700]"
                required
                placeholder="you@example.com"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block text-sm font-medium text-white">Password</label>
              <Lock size={18} className="absolute left-3 top-9 text-white/70" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10 mt-1 w-full p-2 border border-white/30 rounded-lg bg-white/20 text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-[#ffd700]"
                required
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-white/70 hover:text-white"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <label className="block text-sm font-medium text-white">Confirm Password</label>
              <Lock size={18} className="absolute left-3 top-9 text-white/70" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pl-10 pr-10 mt-1 w-full p-2 border border-white/30 rounded-lg bg-white/20 text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-[#ffd700]"
                required
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-9 text-white/70 hover:text-white"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Submit */}
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 0px 20px rgba(255,215,0,0.7)",
              }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-[#ffd700] text-black font-semibold py-2 rounded-lg hover:bg-[#e6c200] transition"
            >
              Sign Up
            </motion.button>
          </form>
        </motion.div>

        {/* Right: Social Signup */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="md:w-1/2 bg-white/5 p-8 flex flex-col justify-center items-center gap-6 border-t md:border-t-0 md:border-l border-white/20"
        >
          <h3 className="text-xl font-semibold text-white">Or sign up using</h3>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="w-full max-w-xs flex items-center justify-center gap-2 bg-white text-black font-medium py-2 px-4 rounded-lg hover:bg-gray-100 transition"
          >
            <img
              src="https://img.icons8.com/color/16/000000/google-logo.png"
              alt="Google"
            />
            Sign up with Google
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="w-full max-w-xs flex items-center justify-center gap-2 bg-[#3b5998] text-white font-medium py-2 px-4 rounded-lg hover:bg-[#2d4373] transition"
          >
            <img
              src="https://img.icons8.com/ios-filled/16/ffffff/facebook-new.png"
              alt="Facebook"
            />
            Sign up with Facebook
          </motion.button>
          <h3>Already have an account? <a href="/login" className="text-[#ffd700]">Login</a></h3>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SignupPage;
