import React from 'react';
import { LayoutDashboard, NotepadText, Settings, Bell, BellDot, ChevronDown, User } from 'lucide-react';


const Dashboard: React.FC = () =>
{
    return (
        <div className="flex flex-row min-h-screen w-screen bg-gray-100 text-slate-600">
            <div className="flex flex-col gradient-orange justify-between items-center w-[94px] py-6">
                <div className="flex flex-col gap-2 justify-center">
                    <div className="h-17 w-16 bg-orange-50 rounded-lg shadow-md">
                        <img src="./src/assets/logo.png" className="h-full w-full p-2.5"></img>
                    </div>
                    <div className="border-t border-[#c2410c]"></div>
                    <button className="btn-sidebar">
                        <LayoutDashboard className="btn-icon-sidebar" />
                    </button>
                    <button className="btn-sidebar">
                       <NotepadText className="btn-icon-sidebar" />
                    </button>
                    
                </div>

                <button className="btn-sidebar">
                    <Settings className="btn-icon-sidebar" />
                </button>
            </div>

            <div className="flex flex-col w-full">
                <div className="flex h-14 bg-white justify-end p-2">
                    <div className="flex flex-row gap-2">
                        <div className="flex-none relative btn-bg-white">

                            {/* When no notification use this icon */}
                            <Bell className="h-6 w-6" />
                            
                            {/* When there is notification, use this icon */}
                            {/* <BellDot className="h-6 w-6" />
                            <span
                                className="
                                    absolute
                                    top-3
                                    right-2.5
                                    block
                                    w-2
                                    h-2
                                    bg-red-400
                                    rounded-full
                                "
                                /> */}

                        </div>
                        <div className="border border-l border-slate-400/40 h-full"></div>
                        <div className="flex flex-1 flex-row group cursor-pointer pr-2 text-[12px] items-center gap-2">
                                <User className="flex h-8 w-8 bg-gray-100 border border-slate-600 rounded-full group-hover:border-[#f05a28] group-hover:text-[#f05a28]" strokeWidth={1}/>
                            <div className="flex flex-col">
                                <span className="flex font-medium group-hover:text-[#f05a28]">FirstName LastName</span>
                                <span className="flex">Role</span>
                            </div>
                                <ChevronDown className="flex h-4 w-4 group-hover:text-[#f05a28] group-hover:border-[#f05a28] " />
                        </div>
                        
                    </div>
                </div>

                <div className="flex bg-white h-30 border border-gray-200 justify-between p-2">
                    <div className="flex flex-col items-left p-2">
                        <span className="flex section-header">
                            Dashboard
                        </span>
                        <span className="flex section-subheader">
                            Day, Month, Year
                        </span>
                        
                    </div>
                    <button className="flex border border-gray-500 p-4">
                        Clock-In
                    </button>
                </div>

                <div className="grid grid-cols-2 grid-rows-2 h-full w-full p-10 gap-6">
                    <div className="card col-span-2">

                    </div>
                    <div className="card col-span-1 ">

                    </div>
                    <div className="card col-span-1 ">

                    </div>
                </div>
            </div>


        </div>
    )
}

export default Dashboard;