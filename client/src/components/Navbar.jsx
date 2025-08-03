import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="w-full bg-gradient-to-r from-[#06032d] to-[#1d176d] px-8 py-6 flex justify-between items-center">
            {/* logo  */}
            <div className="flex items-center gap-2">
                <img
                    src="/PostSync_Logo-removebg-preview.png"
                    alt="PostSync Logo"
                    className="h-14 w-14 rounded-full object-cover"
                />
                <span className="text-white text-2xl font-bold">PostSync</span>
            </div>

            {/* login/register buttons */}
            <div className="space-x-4">
                <Link to="/login">
                <button className="border-white border-2 text-white px-6 py-2 rounded-2xl font-semibold hover:bg-white hover:text-[#1d176d] transition duration-300">
                    Get Started
                </button>
                </Link>
                {/* <button className="px-4 py-2 rounded-md bg-gradient-to-r from-[#00CFFF] to-[#D24AFF] text-white font-semibold hover:scale-105 transition duration-300">
                    Login
                </button> */}
                {/* <button className="px-4 py-2 rounded-md border-2 border-white text-white font-semibold hover:bg-white hover:text-[#1d176d] transition duration-300">
                    Register
                </button> */}
            </div>
        </nav>
    );
};

export default Navbar;
