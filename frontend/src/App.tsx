import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/auth/AuthContext";
import ProtectedRoute from "@/auth/ProtectedRoute";
import DashboardPage from "@/pages/DashboardPage";
import RequestsPage from "@/pages/RequestsPage";
import AppPage from "@/pages/AppPage";
import Login from "@/pages/Login";
import AuthRedirectRoute from '@/auth/AuthRedirectRoute';
import './App.css';
import * as Tooltip from '@radix-ui/react-tooltip';

/**
 * The main application component that sets up the routing structure.
 * It uses React Router to define public and protected routes.
 * 
 * @returns {JSX.Element} The rendered application with all its routes.
 */
const App = () => {
  return (
    <AuthProvider>
      <Tooltip.Provider delayDuration={300}>
        <Routes>
            {/* Public but not guarded  */}
            
              <Route 
                path="/login" 
                element={
                  <AuthRedirectRoute>
                    <Login />
                  </ AuthRedirectRoute>} 
                />
              {/* Protected */}
              <Route element={<ProtectedRoute />}>
              <Route element={<AppPage />}>
                <Route index element={<DashboardPage />} />
                <Route path="requests/*" element={<RequestsPage />} />
              </Route>
            </Route>
          </Routes>
        </Tooltip.Provider>
    </AuthProvider>
  );
};

export default App;

