import { ChevronDown, Search, SquarePen } from 'lucide-react';
import InfoTip from '@/components/infoTip';
import { getRequestTypeContent, getDurationContent } from '@/helpers/infoTipHelpers';

const MyRequestsSection = () => {
    return (
        <div className="flex items-center justify-center h-full w-full p-6">
            <div className="flex flex-col card h-full w-full bg-white p-4">
                <div className="flex card-header pb-4">
                    My Requests
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

                    <div className="flex-1 -mx-4 flex-row border-b border-slate-200/60 mb-2">
                        <div className="grid grid-cols-5  bg-slate-200/30 font-medium text-slate-600/80">
                            <span className="col-span-1 table-req-th">
                                Request ID
                            </span>
                            <span className="col-span-1 table-req-th">
                                Request Type
                            </span >
                            <span className="col-span-1 table-req-th">
                                Requested Dates
                            </span >
                            <span className="col-span-1 table-req-th ">
                                Requested On
                            </span >
                            <span className="col-span-1 flex items-center justify-center text-center">
                                Actions
                            </span >
                        </div>
                        
                        <div className="grid-rows-5 divide-y divide-slate-200/60">

                            <div className="grid rows-span-1 h-14 grid-cols-5  hover:bg-slate-100/30">
                                
                                <div className="col-span-1 table-req-tr">
                                    <span className="flex text-[12px] font-bold text-slate-600/60 bg-slate-200/40 px-3 border border-slate-200/80 rounded-full">REQ-20260102-0047</span>
                                </div>
                                <div className="col-span-1 table-req-tr">
                                    <span className="font-bold">Vacation</span>
                                </div>

                                <div className="col-span-1 table-req-tr">
                                    <span>Oct 10 - Oct 12, 2025</span>
                                </div>
                                <div className="col-span-1 table-req-tr">
                                    <span>Oct 8, 2025</span>
                                </div>
                                <div className="col-span-1 flex items-center gap-2 justify-center">
                                    <button className="flex p-2 bg-slate-100 hover:text-orange-600 hover:bg-orange-100 cursor-pointer rounded-xl">
                                        <SquarePen className=""/>
                                    </button>
                                </div>
                            </div>

                            <div className="grid rows-span-1 h-14 grid-cols-5 hover:bg-slate-100/30">
                                
                                <div className="col-span-1 table-req-tr">
                                    <span className="flex text-[12px] font-bold text-slate-600/60 bg-slate-200/40 px-3 border border-slate-200/80 rounded-full">REQ-20260102-0047</span>
                                </div>
                                
                                <div className="col-span-1 table-req-tr">
                                    <InfoTip
                                        trigger={<span className="flex font-bold border-b border-dotted border-slate-400 hover:text-slate-700 hover:border-slate-700">Vacation</span>}
                                        content={ getRequestTypeContent("vacation") }
                                    /> 
                                </div> 
                                
                                <div className="col-span-1 table-req-tr">
                                    <InfoTip
                                        trigger={<span className="border-b border-dotted border-slate-400 hover:text-slate-700 hover:border-slate-700">Oct 10 - Oct 12, 2025</span>}
                                        content={ getDurationContent("vacation")}
                                        
                                    />
                                </div>

                                <div className="col-span-1 table-req-tr">
                                    <span>Oct 8, 2025</span>
                                </div>
                                <div className="col-span-1 flex items-center gap-2 justify-center">
                                    <button className="flex p-2 bg-slate-100 hover:text-orange-600 hover:bg-orange-100 cursor-pointer rounded-xl">
                                        <SquarePen className=""/>
                                    </button>
                                </div>
                            </div>


                            <div className="grid rows-span-1 grid-cols-5 h-14 hover:bg-slate-100/30">
                                
                                <div className="col-span-1 table-req-tr">
                                    <span className="flex text-[12px] font-bold text-slate-600/60 bg-slate-200/40 px-3 border border-slate-200/80 rounded-full">REQ-20260102-0048</span>
                                </div>
                                
                                <div className="col-span-1 table-req-tr">
                                    <InfoTip
                                        trigger={<span className="font-bold border-b border-dotted border-slate-400 hover:text-slate-700 hover:border-slate-700">Overtime</span>}
                                        content={ getRequestTypeContent("overtime") }
                                    /> 
                                </div> 
                                
                                <div className="col-span-1 table-req-tr">
                                    <InfoTip
                                        trigger={<span className="border-b border-dotted border-slate-400 hover:text-slate-700 hover:border-slate-700">Oct 15, 2025</span>}
                                        content={ getDurationContent("overtime")}
                                        
                                    />
                                </div>

                                <div className="col-span-1 table-req-tr">
                                    <span>Oct 8, 2025</span>
                                </div>
                                <div className="col-span-1 flex items-center gap-2 justify-center">
                                    <button className="flex p-2 bg-slate-100 hover:text-orange-600 hover:bg-orange-100 cursor-pointer rounded-xl">
                                        <SquarePen className=""/>
                                    </button>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
                <div className="flex justify-end">
                    <div className="flex flex-row">
                        <a className="pagination rounded-l-lg">Previous</a>
                        <a className="pagination">1</a>
                        <a className="pagination rounded-r-lg">Next</a>
                        <span className="px-4 py-1">Go To</span>
                        <input type="text" className="border w-12 p-1 text-center rounded-sm outline-none focus:border-[#f05a28]"></input>
                    </div>
                </div>

            </div>

        </div>
    );
}

export { MyRequestsSection };
