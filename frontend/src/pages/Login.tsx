import React, { useState } from 'react';

// 1. Define the type for the request body (Frontend model matching FastAPI's LoginRequest)
interface LoginRequestBody {
  email: string;
  password: string;
}

// 2. Define the type for the successful response body (Matching FastAPI's LoginResponse)
interface LoginSuccessResponse {
  message: string;
  user: {
    id: string; // Using string for UUID
    email: string;
  };
  sessionId: string;
}

const Login: React.FC = () => {
    // State to hold input values
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    // 3. Handle Form Submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); 
        setLoading(true);

        // Prepare the data with type assertion
        const requestBody: LoginRequestBody = { email, password };

        try {
            // 4. Send the POST Request
            const res = await fetch("http://localhost:8000/login", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json" 
                },
                // IMPORTANT: ensures the session_id cookie is sent/received
                credentials: "include", 
                body: JSON.stringify(requestBody) // Convert object to JSON string
            });
            
            const data = await res.json();

            // 5. Check Response Status
            if (!res.ok) {
                // Handle non-2xx status codes (e.g., 401 Unauthorized, 400 Bad Request)
                const errorMessage = data.detail || data.message || "Login failed.";
                alert(`Error: ${errorMessage}`);
                return;
            }

            // Type is asserted here for successful data structure
            const successData = data as LoginSuccessResponse;
            console.log("Login successful! Session ID:", successData.sessionId);
            
            // Success logic: redirect user, update global state, etc.
            alert(`Welcome, ${successData.user.email}!`);

        } catch (error) {
            console.error("Login error:", error);
            alert("An unexpected error occurred during login.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-row min-h-screen w-screen">
        <div className="flex flex-1 flex-col bg-gray-100 py-10 px-20">
            <div className="flex-none">
            <div className="inline-block px-4 py-2 h-20 w-40 border">Label</div>
            </div>

            <div className="flex flex-1 max-w-[540px] flex-col justify-center pb-10 gap-2 px-20">
            <div className="flex flex-col text-center pb-4">
                <h1>Welcome Back! (TypeScript)</h1>
                <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor
                </p>
            </div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email" className="text-left">Email</label>
                <input className="py-2 px-3 border border-gray-400 rounded-md" id="email"
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@example.com"
                required
                disabled={loading}/>

                <label htmlFor="password" className="text-left" >Password</label>
                <input className="py-2 px-3 border border-gray-400 rounded-md" id="password"
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                required
                disabled={loading}/>

                <button className="py-2 px-3 bg-gray-500 rounded-md mt-2" type="submit" disabled={loading}>
                {loading ? 'Logging In...' : 'Log In'}</button>
            </form>
            </div>
        </div>

        <div className="flex basis-[52vw] bg-gray-100 justify-center items-center p-5">
            <section className="h-full w-full object-fill bg-gray-200 rounded-xl">
            </section>
        </div>
        </div>
    );
};

export default Login;