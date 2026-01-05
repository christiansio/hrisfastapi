import React from 'react';
import { ChevronDown, User, Check, X, Search } from 'lucide-react';

/**
 * The main component for the Requests & Approvals page.
 * It provides a UI for users to view their own leave requests and for approvers to manage pending requests.
 *
 * @returns {JSX.Element} The rendered requests page component.
 */
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

                    <div className="flex flex-col h-full w-full space-y-2 rounded-lg" >
                        <div className="flex flex-row justify-between">
                            
                            <div className="flex flex-row gap-2">
                                <div className="flex">
                                    <div className="grid grid-cols-4">
                                        <button className="col-span-1 table-filter-1 rounded-l-md">
                                            Pending
                                        </button>
                                        <button className="col-span-1 table-filter-1">
                                            Approved
                                        </button>
                                        <button className="col-span-1 table-filter-1">
                                            Rejected
                                        </button>
                                        <button className="col-span-1 table-filter-1 rounded-r-md">
                                            All
                                        </button>
                                    </div>
                                </div>
                                
                                <div className="flex">
                                    <button className="flex flex-row  text-slate-400 font-medium hover:text-slate-600 cursor-pointer transition-all duration-105 place-items-center pl-4 pr-2 rounded-md">
                                        <span >All Types</span>
                                        <ChevronDown className="p-1" />
                                    </button>

                                    <button className="flex flex-row  text-slate-400 font-medium hover:text-slate-600 cursor-pointer transition-all duration-105 place-items-center pl-4 pr-2 rounded-md">
                                        <span >All Dates</span>
                                        <ChevronDown className="p-1" />
                                    </button>
                                </div>

                                
                            </div>
                            

                            <div className="flex flex-row">
                                <input type="text" placeholder="Enter Request ID..." className="border border-gray-200 w-42 focus:outline-none transition-colors duration-150 focus:ring-0 focus:border-[#f05a28] rounded-l-md p-2">
                                </input>
                                <button className="bg-[#f05a28] font-medium text-white px-2 rounded-r-md hover:bg-orange-500/80 transition-all duration-100 shadow-md cursor-pointer">
                                    <Search className="flex items-center m-1"/>
                                </button>
                            </div>

                        </div>

                        <div className="flex-1 -mx-4 flex-row ">
                            <div className="grid grid-cols-6 w-full bg-slate-200/30 font-bold text-slate-600">
                                <span className="col-span-1  px-6 py-2">
                                    Employee
                                </span>
                                <span className="col-span-1 px-6 py-2">
                                    Request ID
                                </span>
                                <span className="col-span-1 px-6 py-2">
                                    Type
                                </span >
                                <span className="col-span-1 px-6 py-2">
                                    Duration
                                </span >
                                <span className="col-span-1 px-6 py-2">
                                    Requested On
                                </span >
                                <span className="col-span-1 px-6 py-2">
                                    Actions
                                </span >
                            </div>
                            
                            <div grid-rows-5>
                                <div className="grid rows-span-1 grid-cols-6">
                                    <span className="col-span-1 px-6 py-4">c</span>
                                    <span className="col-span-1 px-6 py-4">c</span>
                                    <span className="col-span-1 px-6 py-4">c</span>
                                    <span className="col-span-1 px-6 py-4">c</span>
                                    <span className="col-span-1 px-6 py-4">c</span>
                                    <span className="col-span-1 px-6 py-4">c</span>
                                </div>

                                <div className="rows-span-1">s</div>
                                <div className="rows-span-1">s</div>
                                <div className="rows-span-1">s</div>
                                <div className="rows-span-1">s</div>

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
                                    <button className="cols-span-1 gap-2 border h-10 w-28 border-slate-400/60 px-4 py-2 rounded-lg hover:border-blue-500 hover:text-blue-500 hover:shadow-md transition-all duration-105 cursor-pointer"><Check className="inline-block pr-1 pb-[3px]"/>Accept</button>
                                    <button className="cols-span-1 gap-2 border h-10 w-28 border-slate-400/60 px-4 py-2 rounded-lg hover:border-red-500 hover:text-red-500 hover:shadow-md transition-all duration-105 cursor-pointer"><X className="inline-block pr-1 pb-[3px]"/>Reject</button>
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
                    <div>
                        s
                    </div>

                </div>

            </div>
        </>
    );
};

export default RequestsHeader;