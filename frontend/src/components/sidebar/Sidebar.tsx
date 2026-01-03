import { NavLink } from 'react-router-dom';
import { LayoutDashboard, NotepadText, Settings } from 'lucide-react';

/**
 * The main sidebar navigation component for the application.
 * It provides navigation links to the primary sections of the app, such as the Dashboard and Requests page.
 * It uses NavLink to highlight the currently active route.
 *
 * @returns {JSX.Element} The rendered sidebar component.
 */
function Sidebar() {

  return (
    <aside className="flex flex-col gradient-orange justify-between items-center w-[72px] py-6">
        <nav className="flex flex-col gap-2 justify-center items-center">
            <div className=" bg-orange-100/20 rounded-lg p-2">
                <span className="font-bold text-md text-white">HRIS</span>
            </div>
            <div className="flex border-t-2 w-full border-orange-700/60 mt-2"></div>

            <NavLink
                to="/" 
                className={ ({ isActive }) => `transition-all duration-150 ease-in-out ${
                    isActive
                    ? "h-12 w-12 p-3 bg-white text-[#f05a28] scale-105 shadow-md rounded-md cursor-pointer"
                    : "btn-sidebar"
                }` }>
                <LayoutDashboard className="btn-icon-sidebar"/>
            </NavLink>
            
            <NavLink
                to="/requests"
                className={ ({ isActive }) => `transition-all duration-150 ease-in-out ${
                    isActive
                    ? "h-12 w-12 p-3 bg-white text-[#f05a28] scale-105 shadow-md rounded-md cursor-pointer"
                    : "btn-sidebar"
                }` }>
                <NotepadText className="btn-icon-sidebar" />
            </NavLink>

        </nav>

        <button className="btn-sidebar">
            <Settings className="btn-icon-sidebar" />
        </button>
    </aside>
  );
};

export default Sidebar;
