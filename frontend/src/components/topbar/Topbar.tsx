import React from 'react';
import { ChevronDown, User, Bell, BellDot } from 'lucide-react';
import { useState } from 'react';

const NotificationIcon = ({ hasNotif } : { hasNotif : boolean}) => (

    
    <div className="flex-none relative btn-bg-white">
        {hasNotif ? <BellDot className="h-5 w-5" /> : <Bell className="h-5 w-5" /> }

        {hasNotif && (
            <>
            <span
                className="
                    absolute
                    top-[11.3px]
                    right-[9.5px]
                    block
                    w-[7px]
                    h-[7px]
                    bg-red-600/40
                    rounded-full
                    animate-ping
                "
            />
            <span
                className="
                absolute
                top-[11.3px]
                right-[9.5px]
                block
                w-[7px]
                h-[7px]
                bg-red-600
                rounded-full
                " />
            </>
        )}    
    </div>
    
);

const Topbar: React.FC = () => {
    const [hasNotif, setHasNotif] = useState(true);

React.useEffect(() => {
        // This will turn the dot off as soon as the dashboard renders
        setHasNotif(true); 
    }, []);

    return (
        
        <div className="flex h-12 bg-white justify-end pr-4 py-2">
            <div className="flex flex-row">
                <NotificationIcon hasNotif={hasNotif} />
                <div className="flex flex-1 flex-row group cursor-pointer px-2 text-[12px] items-center gap-2">
                        <User className="flex h-8 w-8 bg-slate-100 border border-slate-600 rounded-full group-hover:border-[#f05a28] group-hover:text-[#f05a28]" strokeWidth={1}/>
                    <div className="flex flex-col">
                        <span className="flex font-medium group-hover:text-[#f05a28]">John Doe</span>
                        <span className="flex">Approver</span>
                    </div>
                        <ChevronDown className="flex h-4 w-4 group-hover:text-[#f05a28] group-hover:border-[#f05a28] " />
                </div>
                
            </div>
        </div>
    );
}

export default Topbar;