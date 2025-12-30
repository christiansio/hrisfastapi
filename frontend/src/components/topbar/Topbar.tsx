import React from 'react';
import { ChevronDown, User, Bell, BellDot } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Menu, MenuButton, MenuItems, MenuItem, Transition } from '@headlessui/react';


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

const LogoutButton = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
}


const Topbar: React.FC = () => {
    const [hasNotif, setHasNotif] = useState(true);

    React.useEffect(() => {
        // This will turn the dot off as soon as the dashboard renders
        setHasNotif(true); 

    }, []);

    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
        } finally {
            navigate('/login')
        }
    }
    

    return (
        
        <div className="flex h-12 bg-white justify-end pr-4 py-2 relative">
            <Menu as="div" className="flex items-center">
        {/* Notification sits next to the Menu but isn't part of the toggle */}
        <NotificationIcon hasNotif={hasNotif} />
        
        <div className="relative"> {/* Container for positioning the dropdown */}
            <MenuButton className="flex flex-row group cursor-pointer px-2 text-[12px] items-center gap-2 outline-none group data-[open]:text-[#f05a28]/80  ">
                <User className="h-8 w-8 bg-slate-100 border border-slate-600 rounded-full group-hover:border-[#f05a28] group-hover:text-[#f05a28] transition-colors group-data-[open]:border-[#f05a28]" strokeWidth={1}/>
                <div className="flex flex-col text-left">
                    <span className="font-medium group-hover:text-[#f05a28]">John Doe</span>
                    <span className="text-slate-600/70">Approver</span>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-400 group-hover:text-[#f05a28] group-data-[open]:rotate-180 group-data-[open]:text-[#f05a28] transition-all duration-105" />
            </MenuButton>

            <Transition
                // 1. Fragment prevents adding an unnecessary extra <div> to the DOM
                as={React.Fragment}
                
                // 2. Classes applied when the menu starts opening
                enter="transition ease-out duration-105"
                enterFrom="transform opacity-0 scale-95 -translate-y-2"
                enterTo="transform opacity-100 scale-100 translate-y-0"
                
                // 3. Classes applied when the menu starts closing
                leave="transition ease-in duration-105"
                leaveFrom="transform opacity-100 scale-100 translate-y-0"
                leaveTo="transform opacity-0 scale-95 -translate-y-2"
                >

            <MenuItems className="absolute right-0 w-24 origin-top-right bg-white rounded-md shadow-lg border border-slate-100 focus:outline-none">
                <div className="py-1 shadow-md">
                    <MenuItem>
                        {({ focus }) => (
                            <button className={`${focus ? 'bg-slate-200/10 text-[#f05a28]' : ''} block w-full px-4 py-2 text-center text-sm cursor-pointer`}>
                                Biologs
                            </button>
                        )}
                    </MenuItem>
                    <MenuItem>
                        {({ focus }) => (
                            <button className={`${focus ? 'bg-slate-200/10 text-[#f05a28]' : ''} block w-full px-4 py-2 text-center text-sm cursor-pointer`} onClick={handleLogout}>
                                Logout
                            </button>
                        )}
                    </MenuItem>
                </div>
            </MenuItems>

            </Transition>
        </div>
    </Menu>
        </div>
    );
}

export default Topbar;