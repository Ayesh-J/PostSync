import react from 'react';
import { LogOut, Settings, Plus, CalendarDays } from "lucide-react";

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#06032d] to-[#1d176d] text-white p-6">
            <header className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-primary">
                    <span className="bg-gradient-to-r from-[#00CFFF] to-[#D24AFF] bg-clip-text text-transparent">
                        PostSync
                    </span>{""}
                    Dashboard
                </h1>
                <div className="flex gap-4">
                    <Settings className="hover:text-[#00CFFF] cursor-pointer"/>
                    <LogOut className="hover:text-[#D24AFF] cursor-pointer"/>
                </div>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#1d176d]/60 rounded-2xl p-6 shadow-lg">
                    <h2 className="text-xl font-semibold mb-2">New Post</h2>
                        <p className='text-sm mb-4'>
                            Create and publish content  to your connected platforms
                        </p>
                        <button className="bg-white text-[#1d176d] px-4 py-2 mt-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-[#00CFFF] hover:text-white transition">
                            <Plus size={16}/>
                            Create Post
                        </button>
                </div>

                <div className="bg-[#1d176d]/60 rounded-2xl p-6 shadow-lg">
                    <h2 className='text-xl font-semibold mb-2'>Scheduled Post</h2>
                    <p className='text-sm mb-4 '>View and manage your upcoming scheduled content.</p>
                    <button className='bg-white text-[#1d176d] px-4 py-2 mt-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-[#00CFFF] hover:text-white transition  '>
                        <CalendarDays size={16}/>
                        View Schedule
                    </button>
                </div>

                <div className="bg-[#1d176d]/60 rounded-2xl p-6 shadow-lg">
                    <h2 className='text-xl font-semibold mb-2'>Analytics</h2>
                    <p className='text-sm mb-4 '>Track engagement and reach across platforms.</p>
                    <button className='bg-white text-[#1d176d] px-4 py-2 mt-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-[#00CFFF] hover:text-white transition'>
                        View Insights
                    </button>
                </div>
            </section>
        </div>
    );
};

export default Dashboard;