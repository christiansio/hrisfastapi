import React from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import {CircleQuestionMark, MoveUpRightIcon, CircleCheckBigIcon, CircleSlash2, LogIn, LogOut } from 'lucide-react';



const ClockedInStatus = ( { isClockedIn, onToggle } : { isClockedIn : boolean, onToggle: () => void } ) => {

    const clockInOutModal = useRef<HTMLDialogElement>(null);
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
        clockInOutModal.current?.showModal();
    } 
    const closeModal = () => {
        setIsOpen(false);
        clockInOutModal.current?.close();
    }

    const modalContent = isClockedIn
        ? {
            title: "Confirm Clock-Out",
            message: "Are you sure you want to end your shift?"
        }
        : {
            title: "Confirm Clock-In",
            message: "Ready to start your work day?",
        }

    const handleConfirm = () => {
        onToggle(); // Changes Status
        setIsOpen(false);
        closeModal();
    }

    return (
        
        <>
        <AnimatePresence mode="wait">
        {isClockedIn ? ( 
            <React.Fragment key="clocked-in-group">
                
                <motion.div key="clocked-in"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ type: "spring", duration: 0.1 }} 
                    className="flex flex-row bg-orange-50 text-xs border border-orange-200/80 items-center justify-center gap-1 px-4 py-2 rounded-full">
                    <div className="relative pr-2">
                        <div className="absolute h-2 w-2 bg-orange-500 rounded-full animate-ping"></div>
                        <div className="relative h-2 w-2 bg-[#f05a28] rounded-full"></div>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-orange-600/50 font-extrabold">
                            STARTED AT
                        </span>
                        <span className="font-bold text-slate-500/70">
                            (Time)
                        </span>
                    </div>
                </motion.div>
                <motion.button 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0.5, scale: 0.7 }}
                    transition={{ type: "spring", duration: 0.1 }} 
                    onClick={openModal} className="flex border  border-[#f05a28] px-4 py-3 rounded-full shadow-md btn-orange cursor-pointer gap-1">
                    <LogOut />
                    Clock-Out 
                </motion.button>
            </React.Fragment> 
            ) : (
                <>
                    <motion.button
                        key="clocked-out"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }} 
                        transition={{ type: "spring", duration: 0.1, bounce: 0.5}}
                        onClick={openModal} className="flex border  border-slate-200 px-4 py-3 rounded-full shadow-md  btn-bg-white hover:border-[#f05a28] cursor-pointer gap-2">
                            <LogIn />
                            Clock-In
                    </motion.button>
                </> 
            )}
        </AnimatePresence>
        
        <dialog ref={clockInOutModal} className="fixed inset-0 m-auto backdrop:bg-slate-900/50 rounded-xl text-slate-600 shadow-lg">
            <div
                className="flex flex-col items-center px-8 py-8">
                <h2 className="text-xl font-bold text-slate-600">{modalContent.title}</h2>
                <p className="mb-6 text-gray-400 text-sm" >{modalContent.message}</p>
                <div className="flex gap-3 text-sm">
                    <button onClick={closeModal} className="flex border border-slate-300 px-10 py-2 btn-bg-white hover:border-[#f05a28] rounded-md">
                        Cancel
                    </button>
                    <button onClick={handleConfirm} className="flex px-10 py-2 btn-orange shadow-md rounded-md">
                        Confirm
                    </button>
                </div>
            </div>
        </dialog>
        
        </>
    );


    
};

const dashBoardBadges = {
    pending: (
        <div className="flex flex-row inline-block text-slate-600/60 bg-slate-100 text-[10px] font-medium gap-2 rounded-md space-x-1 ml-2 px-1">
            <MoveUpRightIcon className="flex inline-block h-[10px] w-[10px] overflow-visible" />
            <span className="flex inline-block">Pending</span>
        </div>
    ),
    approved: (
        <div className="flex flex-row inline-block text-blue-600/60 bg-blue-100 text-[10px] font-medium gap-2 rounded-md space-x-1 ml-2 px-1">
            <CircleCheckBigIcon className="flex inline-block h-[10px] w-[10px] overflow-visible" />
            <span className="flex inline-block">Approved</span>
        </div>
    ),
    rejected: (
        <div className="flex flex-row inline-block text-red-600/60 bg-red-100 text-[10px] font-medium gap-2 rounded-md space-x-1 ml-2 px-1">
            <CircleSlash2 className="flex inline-block h-[10px] w-[10px] overflow-visible" />
            <span className="flex inline-block">Rejected</span>
        </div>
    )
}

const DashboardSection: React.FC = () => {

    const [isClockedIn, setIsClockedIn] = useState(false);
        
    const handleToggleClock = () => {
        setIsClockedIn(!isClockedIn);
        
    };

    return (
        <>
        <div className="flex bg-white h-20 border border-slate-200 justify-between py-2 px-8">
            <div
            className="flex flex-col items-left justify-center p-2">
                <span className="flex section-header">
                    Dashboard
                </span>
                <span className="flex section-subheader">
                    Day, Month, Year
                </span>
            </div>
            <div 
            className="flex items-center gap-2">
                <ClockedInStatus 
                    isClockedIn={isClockedIn}
                    onToggle={handleToggleClock}
                    />   
            </div>
        </div>

        <div className="grid grid-cols-6 grid-rows-[45%_55%] min-h-0 w-full p-6 gap-4">
                    
            <div className="card col-span-4">

                <div className="grid grid-cols-1 min-w-0 h-full">
                    
                    <div className="grid grid-rows-[0.5fr_3.5fr]">
                        <div className="card-header row-span-1 px-4 pt-4">
                            Attendance Metrics
                        </div>
                        
                        <div className="rows-span-1 grid grid-cols-4 gap-2 min-w-0 h-full p-4">
                            <div className="grid col-span-1 rounded-md shadow-sm text-slate-600 place-items-start p-4">
                                <div className="flex flex-row justify-between w-full font-medium text-slate-600/80 gap-1">
                                    <div>Overtimes</div>
                                    <CircleQuestionMark className="p-1 text-slate-600/60" />
                                </div>
                                
                                <div className="">
                                    <span className=" text-6xl font-bold">74</span>
                                    <span className=" font-extralight text-md">mins</span>
                                </div>
                                
                            </div>

                            <div className="grid col-span-1 rounded-md shadow-sm text-slate-600 place-items-start p-4">
                                <div className="flex flex-row justify-between w-full font-medium text-slate-600/80 gap-1">
                                    <div>Undertimes</div>
                                    <CircleQuestionMark className="p-1 text-slate-600/60" />
                                </div>

                                <div className="">
                                    <span className=" text-6xl font-bold">23</span>
                                    <span className=" font-extralight text-md">mins</span>
                                </div>
                                
                            </div>

                            <div className="grid col-span-1 rounded-md shadow-sm text-slate-600 place-items-start p-4">
                                <div className="flex flex-row justify-between w-full font-medium text-slate-600/80 gap-1">
                                    <div>Lates</div>
                                    <CircleQuestionMark className="p-1 text-slate-600/60" />
                                </div>

                                <div className="">
                                    <span className=" text-6xl font-bold">40</span>
                                    <span className=" font-extralight text-md">mins</span>
                                </div>
                                
                            </div>

                            <div className="grid col-span-1 rounded-md shadow-sm text-slate-600 place-items-start p-4">
                                <div className="flex flex-row justify-between w-full font-medium text-slate-600/80 gap-1">
                                    <div>Trips</div>
                                    <CircleQuestionMark className="p-1 text-slate-600/60" />
                                </div>

                                <div className="">
                                    <span className=" text-6xl font-bold">74</span>
                                    <span className=" font-extralight text-sm">OB</span>
                                </div>
                                
                            </div>
                            
                        </div>
                    </div>
                    
                </div>
            </div>

            <div className="card col-span-2 flex flex-col">
                <div className="flex justify-between px-4 pt-4 object-fill ">
                    <div className="card-header" >Leave Credits</div>
                    <button className="text-sm font-extralight text-[#f05a28] text-[12px] hover:text-orange-400/80 cursor-pointer">Request Leave</button>
                </div>

                <div className="flex h-full p-4 rounded-md">
                    <div className="flex flex-grow flex-col gap-2">
                        <div className="flex-1 flex flex-row justify-between items-center rounded-md shadow-sm px-4">
                            <div className="flex font-light">Vacation Leaves</div>
                            <div className="flex font-light">10/12</div>
                        </div>
                        <div className="flex-1 flex flex-row justify-between items-center rounded-md shadow-sm px-4">
                            <div className="flex font-light">Sick Leaves</div>
                            <div className="flex font-light">9/12</div>
                        </div>
                    </div>
                </div>

            </div>

            <div className="card col-span-3 pb-12">
                <div className="flex justify-between px-4 py-4 object-fill ">
                    <div className="card-header">Upcoming Leaves</div>
                    <button className="text-sm font-extralight text-[#f05a28] text-[12px] hover:text-orange-400/80 cursor-pointer">View Logs</button>
                </div>
                <table className="table-fixed w-full">

                    <thead className="text-left text-sm text-slate-600/80 bg-slate-200/40">
                        <th className="th-space">Type</th>
                        <th className="th-space">Date</th>
                        <th className="th-space">Reason</th>
                    </thead>
                </table>

                    <div className="h-[168px] overflow-y-scroll 
                        [&::-webkit-scrollbar]:w-1
                        [&::-webkit-scrollbar-track]:rounded-md
                        [&::-webkit-scrollbar-track]:bg-slate-200
                        [&::-webkit-scrollbar-thumb]:rounded-md
                        [&::-webkit-scrollbar-thumb]:bg-slate-400">
                        
                        <table className="table-fixed w-full">
                            <tbody className="text-left text-sm font-extralight">
                                <tr className="dash-tr">
                                    <td className="tb-space">
                                        <span className="font-bold">Sick</span>
                                        {dashBoardBadges.pending}
                                    </td>    
                                    <td className="tb-space">Oct 25 - Oct 27, 2023</td>
                                    <td className="tb-space">Medical Recovery Period</td>
                                </tr>
                                <tr className="dash-tr">
                                    <td className="tb-space">
                                        <span className="font-bold">Sick</span> 
                                        {dashBoardBadges.approved}
                                    </td> 
                                    <td className="tb-space">Dec 20 - Dec 22, 2023</td>
                                    <td className="tb-space">Year-End Planning & Administration</td>
                                </tr>
                                <tr className="dash-tr">
                                    <td className="tb-space ">
                                        <span className="font-bold">Vacation</span>
                                        {dashBoardBadges.rejected}
                                    </td>
                                    <td className="tb-space">Nov 10 - Nov 12, 2023</td>
                                    <td className="tb-space">Personal Family Event</td>
                                </tr>
                                <tr className="dash-tr">
                                    <td className="tb-space">
                                        <span className="font-bold">Vacation</span>
                                        {dashBoardBadges.pending}
                                    </td>
                                    <td className="tb-space">Jan 15 - Jan 17, 2024</td>
                                    <td className="tb-space">Off-Site Professional Training</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    


            </div>
            <div className="card col-span-3 pb-12">
                <div className="flex justify-between px-4 py-4 object-fill ">
                    <div className="card-header" >Recent Logs</div>
                    <button className="text-sm font-extralight text-[#f05a28] text-[12px] hover:text-orange-400/80 cursor-pointer">View Logs</button>
                </div>
                
                <table className="table-fixed w-full">
                    <thead className="text-left text-sm text-slate-600/80 bg-slate-200/40">
                        <th className="th-space">Date</th>
                        <th className="th-space">Clock-In</th>
                        <th className="th-space">Clock-Out</th>
                    </thead>
                </table>

                <div className="h-[168px] overflow-y-scroll
                        [&::-webkit-scrollbar]:w-1
                        [&::-webkit-scrollbar-track]:rounded-md
                        [&::-webkit-scrollbar-track]:bg-slate-200
                        [&::-webkit-scrollbar-thumb]:rounded-md
                        [&::-webkit-scrollbar-thumb]:bg-slate-400">
                    <table className="table-fixed w-full">
                        <tbody className="text-left text-sm font-extralight">
                            <tr className="dash-tr">
                                <td className="tb-space font-bold">Oct 23, 2023</td>
                                <td className="tb-space">8:45 AM</td>
                                <td className="tb-space">5:15 PM</td>
                            </tr>
                            <tr className="dash-tr">
                                <td className="tb-space font-bold">Oct 24, 2023</td>
                                <td className="tb-space">9:00 AM</td>
                                <td className="tb-space">5:30 PM</td>
                            </tr>
                            <tr className="dash-tr">
                                <td className="tb-space font-bold">Oct 25, 2023</td>
                                <td className="tb-space">8:30 AM</td>
                                <td className="tb-space">4:45 PM</td>
                            </tr>
                            <tr className="dash-tr">
                                <td className="tb-space font-bold">Oct 26, 2023</td>
                                <td className="tb-space">8:55 AM</td>
                                <td className="tb-space">5:20 PM</td>
                            </tr>
                            <tr className="dash-tr">
                                <td className="tb-space font-bold">Oct 27, 2023</td>
                                <td className="tb-space">9:10 AM</td>
                                <td className="tb-space">3:45 PM</td>
                            </tr>
                        </tbody>
                    </table>
                </div>



            </div>
        </div>
    </>
    );
};

export default DashboardSection;
