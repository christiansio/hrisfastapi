import React, { createContext, useContext, useState, useEffect } from 'react';
import { API_BASE_URL } from '../config/api';

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
                <img src="./src/assets/logo.png" className="h-full object-contain">
                </img>
            </div>
            <div className="flex flex-col text-left text-slate-600">
                <span className="flex text-4xl font-bold">Information</span>
                <span className="flex text-4xl font-bold">System</span>
            </div>
        </div>
        )
    };
    
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

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
};