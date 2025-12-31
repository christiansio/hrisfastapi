import React, { useState } from 'react';
import { LoaderCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/auth/AuthContext';
import { motion, AnimatePresence } from "framer-motion";

import logo from '@/assets/logo.png';
import loginImg from '@/assets/loginImg.png';
 
const Login: React.FC = () => {

    // State to hold input values
    const { login } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); 
        setLoading(true);

        try {
            await login(email, password);
            navigate('/');
        } catch (error: any) {
            console.error("Login error:", error);
            alert(error.message || "Invalid Credentials");
        } finally {
            setLoading(false);
        }
    };

    return (
        
        <div className="flex flex-row min-h-screen w-screen bg-white text-slate-600  overflow-hidden">
            <div className="flex flex-1 flex-col py-10 px-20">
                <div className="flex-none">
                    <div className="flex flex-row h-20 w-20 space-x-2">
                        <AnimatePresence>
                        <motion.img
                            key="Logo-static-key"
                            initial={{ opacity:0, x:-10 }}
                            animate={{ opacity:1, x:0 }}
                            transition={{ type: "spring", duration: 1}}
                            src={ logo } className="h-full object-contain"></motion.img>
                        </AnimatePresence>
                        <div className="flex justify-center items-center">
                            <span className="text-sm font-bold">Information System</span>
                        </div>
                    </div>
                </div>
                <AnimatePresence>
                <motion.div 
                    key="static-login-key"
                    initial={{ opacity:0}}
                    animate={{ opacity:1}}
                    transition={{ duration: 0.3}}
                    className="flex flex-1 max-w-[540px] flex-col justify-center pb-10 gap-2 px-20">
                    <div className="flex flex-col text-center pb-4 space-y-2">
                        <h1 className="text-4xl font-bold antialiased">Welcome Back!</h1>
                        <p className="text-sm text-slate-400">
                            Enter your Email and Password
                        </p>
                    </div>

                    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                        <label htmlFor="email" className="text-left font-medium">Email</label>
                        <input className="py-2 px-3 border border-gray-200 focus:outline-none transition-colors duration-150 focus:ring-0 focus:border-[#f05a28] mx-2 rounded-md" id="email"
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="user@example.com"
                            required
                            disabled={loading}/>

                        <label htmlFor="password" className="text-left font-medium" >Password</label>
                        <input className="py-2 px-3 border border-gray-200 focus:outline-none transition-colors duration-100 focus:ring-0 focus:border-[#f05a28] mx-2 rounded-md" id="password"
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="password"
                            required
                            disabled={loading}/>

                        <button className="flex justify-center items-center py-2 px-3 btn-orange mt-2 disabled:bg-orange-500/30" type="submit" disabled={loading}>
                            {loading ? <LoaderCircle className="object-center animate-spin" /> : 'Log In'}</button>
                    </form>

                </motion.div>
                </AnimatePresence>
            </div>
                <AnimatePresence>
                <motion.div 
                initial={{opacity:0, x:20}}
                animate={{ opacity:1, x:0}}
                transition={{ duration:1}}
                className="flex basis-[52vw] h-[100vh] justify-center items-center p-5">
                    <section className="h-full w-full rounded-xl overflow-hidden flex justify-center items-center ">
                        <img src={ loginImg } className="w-full h-full object-cover"></img>
                    </section>
                </motion.div>
                </AnimatePresence>
        </div>
    );
};

export default Login;
