import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("token", data.token);
                navigate("/dashboard");
            } else {
                setError(data.message || "Login failed");
            }
        } catch (err) {
            setError("Server error. Try again later.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#06032d] to-[#1d176d] text-white px-4">
            <div className="flex flex-col md:flex-row bg-white/10 backdrop-blur-md rounded-2xl shadow-xl w-full max-w-4xl overflow-hidden">
                
                {/* Left: Login Form */}
                <div className="md:w-1/2 p-8">
                    <h2 className="text-3xl font-bold mb-6 text-center text-white">Login to PostSync</h2>
                    {error && <p className="text-red-400 text-sm mb-4 text-center">{error}</p>}

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-white">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 w-full p-2 border border-white/30 rounded-lg bg-white/20 text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-[#ffd700]"
                                required
                                placeholder="you@example.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 w-full p-2 border border-white/30 rounded-lg bg-white/20 text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-[#ffd700]"
                                required
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#ffd700] text-black font-semibold py-2 rounded-lg hover:bg-[#e6c200] transition"
                        >
                            Login
                        </button>
                    </form>
                </div>

                {/* Right: Social Logins */}
                <div className="md:w-1/2 bg-white/5 p-8 flex flex-col justify-center items-center gap-6 border-t md:border-t-0 md:border-l border-white/20">
                    <h3 className="text-xl font-semibold text-white">Or login using</h3>
                    
                    <button className="w-full max-w-xs flex items-center justify-center gap-2 bg-white text-black font-medium py-2 px-4 rounded-lg hover:bg-gray-100 transition">
                        <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google" />
                        Continue with Google
                    </button>

                    <button className="w-full max-w-xs flex items-center justify-center gap-2 bg-[#3b5998] text-white font-medium py-2 px-4 rounded-lg hover:bg-[#2d4373] transition">
                        <img src="https://img.icons8.com/ios-filled/16/ffffff/facebook-new.png" alt="Facebook" />
                        Continue with Facebook
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
