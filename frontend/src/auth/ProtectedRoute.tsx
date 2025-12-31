import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

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