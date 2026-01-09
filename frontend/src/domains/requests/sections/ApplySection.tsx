import React, { useState } from 'react';
import { VacationForm } from '@/domains/requests/sections/forms/VacationForm';
import { SickForm } from '@/domains/requests/sections/forms/SickForm';
import { OvertimeForm } from '@/domains/requests/sections/forms/OvertimeForm';
import { UndertimeForm } from '@/domains/requests/sections/forms/UndertimeForm';



type RequestType = 'vacation' | 'sick' | 'overtime' | 'undertime';

const FORM_COMPONENTS: Record<RequestType, React.ReactNode> = {
    vacation: <VacationForm />,
    sick: <SickForm />,
    overtime: <OvertimeForm />,
    undertime: <UndertimeForm />,
};

const ApplySection = () => {
    const [selectedType, setSelectedType] = useState<RequestType>('vacation');
    const requestTypes: RequestType[] = ['vacation', 'sick', 'overtime', 'undertime'];

    return (
        <div className="flex flex-row items-center justify-center h-full w-full p-6">
            <div className="flex flex-col card h-full w-full bg-white p-4">
                <div className="flex card-header pb-4">
                    Apply
                </div>
                <div className="flex flex-row justify-between px-2">
                    <div className="flex field-label">
                        Select Request Type
                    </div>
                    <div className="flex gap-2 text-sm pr-4">
                        <span className="font-medium text-[#f05a28]">Available Credits:</span><span className="font-bold">#</span>
                    </div>
                </div>
                <div className="flex flex-row items-center py-6 px-4 w-full">
                    {requestTypes.map((type, idx) => (
                        <button
                            key={type}
                            onClick={() => setSelectedType(type)}
                            className={`flex-1 grid place-content-center text-center text-slate-400/80 z-0 font-medium w-full h-10 cursor-pointer transition-all ease-in-out duration-300
                                
                                /* 1. Handle the outer container corners conditionally */
                                ${idx === 0 && selectedType !== type ? 'rounded-l-lg' : ''}
                                ${idx === requestTypes.length - 1 && selectedType !== type ? 'rounded-r-lg' : ''}

                                /* 2. Active vs Inactive State */
                                ${selectedType === type
                                    ? 'text-white bg-[#f05a28] rounded-md scale-105 shadow-lg z-20' // Active: Floating rounded box
                                    : 'hover:text-slate-600/80 bg-slate-200/40 z-5' // Inactive: Flat part of the bar
                                }
                            `}
                        >
                            <span className="capitalize">{type}</span>
                        </button>
                    ))}
                </div>
                {/* The Form Switcher Area */}
                {FORM_COMPONENTS[selectedType]}
            </div>

        </div>
    )
}

export { ApplySection };