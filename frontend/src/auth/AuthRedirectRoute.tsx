import { Navigate } from "react-router-dom";
import { useAuth } from './AuthContext';

/**
 * A route component that redirects authenticated users away from certain pages (e.g., the login page).
 * If the user is authenticated, they are redirected to the home page.
 * Otherwise, the child components are rendered.
 *
 * @param {{ children: React.ReactNode }} props - The component props.
 * @param {React.ReactNode} props.children - The child components to render if the user is not authenticated.
 * @returns {JSX.Element | React.ReactNode} A redirect to the home page or the children components.
 */
const AuthRedirectRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return <Navigate to="/" replace />
    }

    return children;
}

export default AuthRedirectRoute;