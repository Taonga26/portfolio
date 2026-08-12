import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaLock } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import Loader from "../components/Loader";

function AdminLogin() {
    const { user, loading, login } = useAuth();

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    if (loading) {
        return (
            <Loader/>
        );
    }

    if (user) {
        return <Navigate to="/admin" replace />;
    }

    async function handleSubmit(e) {
        e.preventDefault();

        setError("");
        setSubmitting(true);

        const { error } = await login(email, password);

        if (error) {
            setError(error.message);
            setSubmitting(false);
            return;
        }

        navigate("/admin");
    }

    return (
        <main className="min-h-screen bg-slate-950 flex items-center justify-center px-6">

            <motion.div
                initial={{
                    opacity: 0,
                    y: 30
                }}
                animate={{
                    opacity: 1,
                    y: 0
                }}
                className="
                    w-full
                    max-w-md
                    bg-slate-900
                    border
                    border-slate-800
                    rounded-3xl
                    p-8
                    shadow-2xl
                "
            >

                <div className="text-center mb-8">

                    <div className="
                        mx-auto
                        w-14
                        h-14
                        rounded-2xl
                        bg-blue-600/20
                        flex
                        items-center
                        justify-center
                        text-blue-400
                        mb-5
                    ">
                        <FaLock size={22} />
                    </div>

                    <h1 className="text-3xl font-bold text-white">
                        Admin Login
                    </h1>

                    <p className="text-slate-400 mt-2">
                        Sign in to manage your portfolio.
                    </p>

                </div>


                {error && (
                    <div className="
                        bg-red-500/10
                        border
                        border-red-500/30
                        text-red-400
                        rounded-xl
                        p-4
                        mb-6
                        text-sm
                    ">
                        {error}
                    </div>
                )}


                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <div>
                        <label className="block text-sm text-slate-300 mb-2">
                            Email
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="
                                w-full
                                bg-slate-800
                                border
                                border-slate-700
                                rounded-xl
                                px-4
                                py-3
                                text-white
                                outline-none
                                focus:border-blue-500
                            "
                            placeholder="admin@example.com"
                        />
                    </div>


                    <div>
                        <label className="block text-sm text-slate-300 mb-2">
                            Password
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="
                                w-full
                                bg-slate-800
                                border
                                border-slate-700
                                rounded-xl
                                px-4
                                py-3
                                text-white
                                outline-none
                                focus:border-blue-500
                            "
                            placeholder="••••••••"
                        />
                    </div>


                    <button
                        type="submit"
                        disabled={submitting}
                        className="
                            w-full
                            bg-blue-600
                            hover:bg-blue-700
                            disabled:opacity-50
                            disabled:cursor-not-allowed
                            text-white
                            font-semibold
                            py-3
                            rounded-xl
                            transition
                        "
                    >
                        {submitting ? "Signing in..." : "Sign In"}
                    </button>

                </form>

            </motion.div>

        </main>
    );
}

export default AdminLogin;