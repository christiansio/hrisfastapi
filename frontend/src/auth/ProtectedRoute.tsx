import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

/**
 * A route component that protects child routes from unauthenticated access.
 * If the user is authenticated, it renders the child routes using the Outlet component.
 * If not, it redirects the user to the login page, remembering the page they intended to visit.
 *
 * @returns {JSX.Element} Either the child routes (via Outlet) or a redirect to the login page.
 */
const ProtectedRoute = () => {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    // If logged in, show the page. If not, redirect to login
    return isAuthenticated ? <Outlet /> : <Navigate 
                                                to="/login" 
                                                replace
                                                state={{ from: location }} // remember where user wanted to go
                                            />;
};

export default ProtectedRoute;