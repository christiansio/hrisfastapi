import React, { createContext, useContext, useState, useEffect } from 'react';
import { API_BASE_URL } from '@/config/api';
import logo from '@/assets/logo.png'
 
interface User {
    id: string;
    email: string;
    role: 'admin' | 'approver' | 'user';
}

interface AuthContextType {
    user: User | null;
    role: 'admin' | 'approver' | 'user' | null;
    login: (email: string, password: string) => Promise<User>;
    logout: () => Promise<string>;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true) // Track Initial Check

    useEffect(() => {
        /**
         * Verifies the user's session with the backend.
         * It sends a request to the `/auth/me` endpoint to check for a valid session cookie.
         * If the session is valid, the user state is restored.
         * If not, the user state is cleared.
         * @async
         * @returns {Promise<void>}
         */
        const verifySession = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/auth/me`, {
                    method: "GET",
                    credentials: "include",
                });

                if (res.ok) {
                    const data = await res.json();
                    setUser(data.user || data); // Restore user to state
                    
                } else {
                    // If you want it to go to the catch block, you must throw it manually:
                    if (res.status === 401) throw new Error("Unauthorized access");
                }
                
            } catch (error) {
                console.error("Session verification failed:", error);
                setUser(null);
            } finally {
                setIsLoading(false); // Stop showing the loading screen
            }


        };

        // Initial check on mount
        verifySession();

        // Define the listener handler
        const handlePopState = () => {
            verifySession();
        };
        
        // Listen for Back/Forward navigation
        window.addEventListener("popstate", handlePopState);

        // Cleanup to prevent memory leaks and duplicate requests
        return () => {
            window.removeEventListener("popstate", handlePopState);
        };

    }, []);

    if (isLoading) {
        return (
        <div className="flex bg-white justify-center items-center min-h-screen w-full space-x-2 animate-pulse">
            <div className="flex flex-row h-50 w-50 ">
                <img src={ logo } className="h-full object-contain">
                </img>
            </div>
            <div className="flex flex-col text-left text-slate-600">
                <span className="flex text-4xl font-bold">Information</span>
                <span className="flex text-4xl font-bold">System</span>
            </div>
        </div>
        )
    };
    
    /**
     * Logs the user in by sending their credentials to the backend.
     * @param {string} email - The user's email address.
     * @param {string} password - The user's password.
     * @returns {Promise<User>} The user object if login is successful.
     * @throws {Error} If login fails due to incorrect credentials or a server error.
     */
    const login = async (email: string, password: string): Promise<User> => {
        const res = await fetch(`${API_BASE_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            // IMPORTANT: ensures the session_id cookie is sent/received
            credentials: "include",
            body: JSON.stringify({ email, password }), // Convert object to JSON string
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.detail || "Login Failed");

        setUser(data.user);
        return data.user;
    };

    /**
     * Logs the user out by sending a request to the backend and clearing local state.
     * @returns {Promise<string>} A confirmation message from the server.
     */
    const logout = async (): Promise<string> => {
        try {
            const res = await fetch(`${API_BASE_URL}/auth/logout`, {
                method: "POST",
                credentials: "include",
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Logout failed on server");
            }

            // Return the specific message from your FastAPI backend
            return data.message || "Logged out Successfully";


        } catch (error) {
            console.error("Logout error:", error);
            return "Logged out locally, but server was unreachable.";
        } finally {
            // Always clear the local user state
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                role: user?.role || null,
                login,
                logout,
                isAuthenticated: !!user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

/**
 * Custom hook to access the authentication context.
 * Provides an easy way to get user data, authentication status, and login/logout functions.
 * @throws {Error} If used outside of an `AuthProvider`.
 * @returns {AuthContextType} The authentication context object.
 */
export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
};