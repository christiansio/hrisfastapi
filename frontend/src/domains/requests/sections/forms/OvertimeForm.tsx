import { Calendar } from 'lucide-react';
import { useState } from 'react';

const OvertimeForm = () => {
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [reason, setReason] = useState<string>("");

    return (

        <>
            <div className="flex flex-1 flex-row justify-between">
                <div className="flex flex-1 flex-col gap-4">
                    <div className="flex flex-row gap-8 pr-4">

                        <div className="flex flex-col gap-2 w-full px-2">

                            <label htmlFor="apply-start-date" className="field-label">Start Date</label>

                            <div className="relative w-full mx-4 group">
                                <input
                                    id="apply-start-date"
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className={`flex w-full px-4 py-2 relative border rounded-md outline-none transition-all duration-200
                            
                            /* Swapping background, border, and text based on value */
                            ${startDate
                                            ? 'bg-white border-slate-200 text-slate-700 shadow-sm'
                                            : 'bg-slate-200/40 border-transparent text-slate-400/80'
                                        }

                            /* Hover effect only */
                            hover:text-slate-600/80 

                            /* Webkit Date Picker Hacking */
                            [&::-webkit-calendar-picker-indicator]:absolute
                            [&::-webkit-calendar-picker-indicator]:w-full
                            [&::-webkit-calendar-picker-indicator]:h-full
                            [&::-webkit-calendar-picker-indicator]:inset-0
                            [&::-webkit-calendar-picker-indicator]:opacity-0
                            [&::-webkit-calendar-picker-indicator]:cursor-pointer`
                                    }
                                />
                                <Calendar
                                    size={20}
                                    className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none z-30 transition-all duration-200
                            ${startDate ? 'text-slate-600' : 'text-slate-400/80'}
                            group-hover:text-slate-600/80`
                                    }
                                />
                            </div>

                        </div>

                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="apply-end-date" className="px-2 field-label">End Date</label>

                            <div className="relative w-full mx-4 group">
                                <input
                                    id="apply-end-date"
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className={`flex w-full px-4 py-2 relative border rounded-md outline-none transition-all duration-200
                            
                            /* Swapping background, border, and text based on value */
                            ${endDate
                                            ? 'bg-white border-slate-200 text-slate-700 shadow-sm'
                                            : 'bg-slate-200/40 border-transparent text-slate-400/80'
                                        }

                            /* Hover effect only */
                            hover:text-slate-600/80 
                        

                            /* Webkit Date Picker Hacking */
                            [&::-webkit-calendar-picker-indicator]:absolute
                            [&::-webkit-calendar-picker-indicator]:w-full
                            [&::-webkit-calendar-picker-indicator]:h-full
                            [&::-webkit-calendar-picker-indicator]:inset-0
                            [&::-webkit-calendar-picker-indicator]:opacity-0
                            [&::-webkit-calendar-picker-indicator]:cursor-pointer`
                                    }
                                />
                                <Calendar
                                    size={20}
                                    className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none z-30 transition-all duration-200
                            ${endDate ? 'text-slate-600' : 'text-slate-400/80'}
                            group-hover:text-slate-600/80`
                                    }
                                />
                            </div>

                        </div>
                    </div>
                    <div className="flex flex-col gap-2 pl-2 pr-4">
                        <label htmlFor="application-reason" className="field-label" >
                            Reason For Application
                        </label>
                        <textarea
                            id="application-reason"
                            rows={6}
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder="Please provide details about your request..."
                            className={`w-full px-4 py-2 rounded-lg mx-4 border outline-none transition-all duration-200 ease-in-out
                    ${reason
                                    ? 'bg-white border-slate-200 text-slate-700 shadow-sm'
                                    : 'bg-slate-200/40 border-transparent text-slate-400/80'
                                }
                    hover:text-slate-600/80
                    focus:border-[#f05a28]/80
                    focus:bg-white`

                            }>

                        </textarea>
                        <div>

                        </div>
                    </div>

                </div>
                <div className="flex flex-1 flex-row justify-between">

                    <div className="flex-1 flex flex-col gap-2">

                        <div className="field-label px-6">
                            Shift Details & Calculation
                        </div>
                        <div className="flex justify-between border border-slate-200 mx-8 p-2.5 mb-0.5 rounded-lg shadow-sm">
                            <span className="font-medium text-slate-600/60">
                                Standard Shift
                            </span>
                            <span className="font-bold">
                                9:00 AM - 6:00 PM
                            </span>
                        </div>

                        <div className="field-label px-6">
                            Overtime Minute/s
                        </div>
                        <div className="flex place-items-center justify-end bg-slate-200/40 border border-slate-200 mx-8 p-3 gap-1 rounded-lg">

                            <span className="font-bold text-[#f05a28] text-2xl">
                                180
                            </span>
                        </div>

                    </div>
                </div>
            </div>
            <div className="flex justify-center">
                <button className="flex px-8 py-4 mb-2 justify-center btn-orange">Submit Application</button>
            </div>
        </>
    )

}

export { OvertimeForm };
