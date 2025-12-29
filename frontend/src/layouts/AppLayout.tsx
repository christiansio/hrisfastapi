import React from 'react';
import { Outlet } from 'react-router-dom';
import Topbar from '@/components/topbar/Topbar';
import Sidebar from '@/components/sidebar/Sidebar';
import { useState } from 'react';



const AppLayout: React.FC = () => {
    const [hasNotif, setHasNotif] = useState(true);


    React.useEffect(() => {
        // This will turn the dot off as soon as the dashboard renders
        setHasNotif(true); 
    }, []);

    return (
        <>
        <div className="flex flex-row min-h-screen w-screen bg-slate-100 text-slate-600">
            <Sidebar />
            
            <div className="flex flex-col w-full">
                <Topbar />
                <Outlet />
            </div>
            

        </div>

        </>

    );
};

export default AppLayout;
    
