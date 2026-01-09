import React from 'react';
import { REQUESTS_SECTIONS } from "./section.config";
import type { RequestsSections } from "../types";
import { canViewApprovals } from '../permissions';
import type { User } from '@/auth/AuthContext';

interface Props {
    active: RequestsSections;
    onChange: (section: RequestsSections) => void;
    user: User | null;
}

export const RequestsHeader = ({ active, onChange, user }: Props) => {


    //FILTER the sections before rendering
    const visibleSections = REQUESTS_SECTIONS.filter(section => {
        // Rule: If it's the approvals tab, only show if user has permission
        if (section.key === "approvals" || section.key === "assign-leave") {
            return user ? canViewApprovals(user) : false;
        }
        // Rule: Show all other tabs by default (or add more checks here)
        return true;
    });

    return (
        <div className="flex bg-white min-h-20 border flex-shrink-0 border-slate-200 justify-between py-2 px-8">
            <div className="flex items-center p-2 ">
                <span className="flex section-header">
                    Requests & Approvals
                </span>
            </div>


            <div className="flex">
                <div className="flex flex-row items-center justify-center -mb-2 gap-4">
                    {visibleSections.map((section, _index) => {
                        const isActive = active === section.key;

                        return (
                            <React.Fragment key={section.key}>
                                {/* 1. Insert Divider: Logic to place it before the 3rd item (index 2) */}

                                {/* 2. The Interactive Tab Button */}
                                <button
                                    onClick={() => onChange(section.key)}
                                    className={`flex section-header-tabs justify-center transition-all duration-200 ease-in-out
                                    ${isActive
                                            ? "border-b-3 text-[#f05a28] font-bold"
                                            : "border-b-3 border-transparent text-sm text-slate-400 font-extralight hover:text-slate-600"
                                        } 
                                    
                                `}
                                >
                                    {section.label}
                                </button>
                                {section.key === "assign-leave" && (
                                    <div className="flex border-l border-slate-400 mb-2 h-12 mx-2"></div>
                                )}
                            </React.Fragment>
                        );
                    })

                    }
                    {/* <button className="col-span-1 section-header-tabs">Approvals</button>
                    <button className="col-span-1 section-header-tabs">Assign Leave</button>
                    <div className="col-span-1 border-l border-slate-400 mb-2 h-12"></div>
                    <button className="col-span-1 section-header-tabs">My Requests</button>
                    <button className="col-span-1 section-header-tabs">Apply Leave</button> */}
                </div>
            </div>
        </div>
    );

};


