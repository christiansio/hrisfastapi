import React from 'react';
import { Outlet } from 'react-router-dom';
import Topbar from '@/components/topbar/Topbar';
import Sidebar from '@/components/sidebar/Sidebar';

/**
 * The main layout for the authenticated sections of the application.
 * It combines the Sidebar, Topbar, and a content area for nested routes.
 *
 * @returns {JSX.Element} The rendered application layout.
 */
const AppLayout: React.FC = () => {
    
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
    
