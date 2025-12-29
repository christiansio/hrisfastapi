import React from 'react';
import { ChevronDown, User, Check, X } from 'lucide-react';


const RequestsHeader: React.FC = () => {

    return (
        <>
            <div className="flex bg-white h-23.5 border border-slate-200 justify-between py-2 px-8">
                <div className="flex items-center p-2 ">
                    <span className="flex section-header">
                        Requests & Approvals
                    </span>
                </div>
                <div
                className="flex">
                    <div className="grid grid-cols-[1fr_1fr_auto_1fr_1fr] items-center justify-center -mb-2 space-x-4">
                        <button className="col-span-1 section-header-tabs">Approvals</button>
                        <button className="col-span-1 section-header-tabs">Assign Leave</button>
                        <div className="col-span-1 border-l border-slate-400 mb-2 h-12"></div>
                        <button className="col-span-1 section-header-tabs">My Requests</button>
                        <button className="col-span-1 section-header-tabs">Apply Leave</button>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-center h-full w-full p-6">
                <div className="flex flex-col card h-full w-full bg-white p-4">
                    <div className="flex card-header pb-4">
                        Approvals
                    </div>
                    <div className="flex flex-col h-full w-full space-y-2 rounded-md" >
                        <div className="flex flex-row justify-between">
                            <div className="grid grid-cols-2 gap-1">
                                <button className="col-span-1 text-center border border-slate-400/60 text-slate-400 p-2 hover:text-[#f05a28] hover:border-[#f05a28] focus:text-white focus:bg-[#f05a28]/90 focus:border-[#f05a28]/90 focus:shadow-lg cursor-pointer transition-all duration-105 rounded-lg ">
                                    Pending
                                </button>
                                <button className="col-span-1 text-center border border-slate-400/60 text-slate-400 p-2 hover:text-[#f05a28] hover:border-[#f05a28] focus:text-white focus:bg-[#f05a28]/90 focus:border-[#f05a28]/90 focus:shadow-lg cursor-pointer transition-all duration-105 rounded-lg ">
                                    History
                                </button>
                            </div>

                            <div className="flex flex-row">
                                
                                <button className="flex flex-row border border-slate-400/60 text-slate-400 hover:text-[#f05a28] hover:border-[#f05a28] focus:text-white focus:bg-[#f05a28]/90 focus:border-[#f05a28]/90 focus:shadow-md cursor-pointer transition-all duration-105 place-items-center pl-2 pr-1 rounded-md">
                                    <span >All Types</span>
                                    <ChevronDown className="p-1" />
                                </button>
                            </div>

                           
                            
                        </div>
                        <div className="flex-1 max-h-[414px] w-full flex-row border border-slate-400/60 shadow-[inset_0px_1px_8px_rgba(0,0,0,0.05)] rounded-md overflow-y-auto">
                             <div className="flex flex-row justify-between h-22 w-full border border-slate-400/60 p-4  ">
                                <div className="flex flex-row h-full place-items-center gap-3">
                                    
                                    <User className="flex border-2 border-slate-400 text-slate-400 h-14 w-14 rounded-full" />
                                    
                                    <div className="flex flex-col text-xs">
                                        <span className="font-bold">FirstName LastName</span>
                                        <span className="font-light">Leave Dates</span>
                                        <span className="font-light">Date Requested</span>

                                    </div>
                                    <div className="self-start -m-[1.5px]">
                                        <span className="text-xs bg-slate-100 px-2 py-1 rounded-full">
                                            Leave Type
                                        </span>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-[1fr_1fr] place-items-center space-x-1">
                                    <button className="cols-span-1 gap-2 border h-10 w-28 border-slate-400/60 px-4 py-2 rounded-lg hover:border-blue-500 hover:text-blue-500 hover:shadow-md transition-all duration-105 cursor-pointer"><Check className="inline-block pr-1 pb-[3px]"/>Accept</button>
                                    <button className="cols-span-1 gap-2 border h-10 w-28 border-slate-400/60 px-4 py-2 rounded-lg hover:border-red-500 hover:text-red-500 hover:shadow-md transition-all duration-105 cursor-pointer"><X className="inline-block pr-1 pb-[3px]"/>Reject</button>
                                </div>

                             </div> 
                             <div className="flex flex-row justify-between h-22 w-full border border-slate-400/60 p-4  ">
                                <div className="flex flex-row h-full place-items-center gap-3">
                                    
                                    <User className="flex border-2 border-slate-400 text-slate-400 h-14 w-14 rounded-full" />
                                    
                                    <div className="flex flex-col text-xs">
                                        <span className="font-bold">FirstName LastName</span>
                                        <span className="font-light">Leave Dates</span>
                                        <span className="font-light">Date Requested</span>

                                    </div>
                                    <div className="self-start -m-[1.5px]">
                                        <span className="text-xs bg-slate-100 px-2 py-1 rounded-full">
                                            Leave Type
                                        </span>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-[1fr_1fr] place-items-center space-x-1">
                                    <button className="cols-span-1 gap-2 border h-10 w-28 border-slate-400/60 px-4 py-2 rounded-md hover:border-blue-500 hover:text-blue-500 hover:shadow-md transition-all duration-105 cursor-pointer"><Check className="inline-block pr-1 pb-[3px]"/>Accept</button>
                                    <button className="cols-span-1 gap-2 border h-10 w-28 border-slate-400/60 px-4 py-2 rounded-md hover:border-red-500 hover:text-red-500 hover:shadow-md transition-all duration-105 cursor-pointer"><X className="inline-block pr-1 pb-[3px]"/>Reject</button>
                                </div>

                             </div>
                             

                             <div className="flex flex-row justify-between h-22 w-full border border-slate-400/60 p-4">
                                <div className="flex flex-row h-full place-items-center gap-3">
                                    
                                    <User className="flex border-2 border-slate-400 text-slate-400 h-14 w-14 rounded-full" />
                                    
                                    <div className="flex flex-col text-xs">
                                        <span className="font-bold">FirstName LastName</span>
                                        <span className="font-light">Leave Dates</span>
                                        <span className="font-light">Date Requested</span>

                                    </div>
                                    <div className="self-start -m-[1.5px]">
                                        <span className="text-xs bg-slate-100 px-2 py-1 rounded-full">
                                            Leave Type
                                        </span>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-[1fr_1fr] place-items-center space-x-1">
                                    <button className="cols-span-1 gap-2 border h-10 w-28 border-slate-400/60 px-4 py-2 rounded-md hover:border-blue-500 hover:text-blue-500 hover:shadow-md transition-all duration-105 cursor-pointer"><Check className="inline-block pr-1 pb-[3px]"/>Accept</button>
                                    <button className="cols-span-1 gap-2 border h-10 w-28 border-slate-400/60 px-4 py-2 rounded-md hover:border-red-500 hover:text-red-500 hover:shadow-md transition-all duration-105 cursor-pointer"><X className="inline-block pr-1 pb-[3px]"/>Reject</button>
                                </div>

                             </div> 
                             <div className="flex flex-row justify-between h-22 w-full border border-slate-400/60 p-4">
                                <div className="flex flex-row h-full place-items-center gap-3">
                                    
                                    <User className="flex border-2 border-slate-400 text-slate-400 h-14 w-14 rounded-full" />
                                    
                                    <div className="flex flex-col text-xs">
                                        <span className="font-bold">FirstName LastName</span>
                                        <span className="font-light">Leave Dates</span>
                                        <span className="font-light">Date Requested</span>

                                    </div>
                                    <div className="self-start -m-[1.5px]">
                                        <span className="text-xs bg-slate-100 px-2 py-1 rounded-full">
                                            Leave Type
                                        </span>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-[1fr_1fr] place-items-center space-x-1">
                                    <button className="cols-span-1 gap-2 border h-10 w-28 border-slate-400/60 px-4 py-2 rounded-md hover:border-blue-500 hover:text-blue-500 hover:shadow-md transition-all duration-105 cursor-pointer"><Check className="inline-block pr-1 pb-[3px]"/>Accept</button>
                                    <button className="cols-span-1 gap-2 border h-10 w-28 border-slate-400/60 px-4 py-2 rounded-md hover:border-red-500 hover:text-red-500 hover:shadow-md transition-all duration-105 cursor-pointer"><X className="inline-block pr-1 pb-[3px]"/>Reject</button>
                                </div>

                             </div> 
                             <div className="flex flex-row justify-between h-22 w-full border border-slate-400/60 p-4">
                                <div className="flex flex-row h-full place-items-center gap-3">
                                    
                                    <User className="flex border-2 border-slate-400 text-slate-400 h-14 w-14 rounded-full" />
                                    
                                    <div className="flex flex-col text-xs">
                                        <span className="font-bold">FirstName LastName</span>
                                        <span className="font-light">Leave Dates</span>
                                        <span className="font-light">Date Requested</span>

                                    </div>
                                    <div className="self-start -m-[1.5px]">
                                        <span className="text-xs bg-slate-100 px-2 py-1 rounded-full">
                                            Leave Type
                                        </span>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-[1fr_1fr] place-items-center space-x-1">
                                    <button className="cols-span-1 gap-2 border h-10 w-28 border-slate-400/60 px-4 py-2 rounded-md hover:border-blue-500 hover:text-blue-500 hover:shadow-md transition-all duration-105 cursor-pointer"><Check className="inline-block pr-1 pb-[3px]"/>Accept</button>
                                    <button className="cols-span-1 gap-2 border h-10 w-28 border-slate-400/60 px-4 py-2 rounded-md hover:border-red-500 hover:text-red-500 hover:shadow-md transition-all duration-105 cursor-pointer"><X className="inline-block pr-1 pb-[3px]"/>Reject</button>
                                </div>

                             </div> 

                        </div>
                    </div>

                </div>

            </div>
        </>
    );
};

export default RequestsHeader;