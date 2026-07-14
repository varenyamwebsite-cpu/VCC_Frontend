import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { strapi } from "../../config";
import toast from "react-hot-toast";

const THEME = {
    gold: "#c9a227",
    goldLight: "#d4af37",
    text: "#2d2a26",
    textMuted: "#6b6560",
    white: "#ffffff",
    offWhite: "#fafaf9",
    border: "#e8e4df",
    error: "#dc2626",
};

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" }
};

export function LoginPage() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            style={{ backgroundColor: THEME.white }}
        >
            <section
                className="py-20 min-h-screen flex items-center justify-center"
                style={{
                    backgroundColor: THEME.white,
                    fontFamily: "Georgia, serif",
                }}
            >
                <div className="max-w-md w-full mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="border rounded-2xl p-8 shadow-lg"
                        style={{ 
                            backgroundColor: THEME.offWhite,
                            borderColor: THEME.border
                        }}
                    >
                        <LoginForm />
                    </motion.div>
                </div>
            </section>
        </motion.div>
    );
}

function LoginForm() {
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (!form.email || !form.password) {
            setError("Please fill in all fields");
            return;
        }

        try {
            const res = await strapi.post("/auth/local", { identifier: form.email, password: form.password });

            localStorage.setItem('token', `Bearer ${res.data.jwt}`);

            setError("");
            toast.success("Logged in successfully!");
            navigate('/me');

        } catch (err) {
            console.error("Login error:", err);
            const message = err.response?.data?.error?.message || "Invalid email or password";
            setError(message);
        }
    }

    return (
        <>
            <div className="flex items-center justify-between mb-8">
                <h2 
                    className="text-2xl font-semibold"
                    style={{ color: THEME.text }}
                >
                    Welcome Back
                </h2>

                <Link
                    to="/"
                    className="text-sm transition hover:opacity-100"
                    style={{ color: THEME.textMuted }}
                >
                    ← Back
                </Link>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
                {/* EMAIL */}
                <motion.div {...fadeInUp}>
                    <label 
                        className="block text-sm font-medium mb-1"
                        style={{ color: THEME.text }}
                    >
                        Email Address *
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 transition-all"
                        style={{ 
                            borderColor: THEME.border,
                            backgroundColor: THEME.white,
                            color: THEME.text,
                            focusRing: THEME.gold
                        }}
                    />
                </motion.div>

                {/* PASSWORD */}
                <motion.div {...fadeInUp}>
                    <label 
                        className="block text-sm font-medium mb-1"
                        style={{ color: THEME.text }}
                    >
                        Password *
                    </label>

                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border px-4 py-3 pr-10 focus:outline-none focus:ring-2 transition-all"
                            style={{ 
                                borderColor: THEME.border,
                                backgroundColor: THEME.white,
                                color: THEME.text
                            }}
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 transition hover:opacity-70"
                            style={{ color: THEME.textMuted }}
                        >
                            {showPassword ? (
                                <EyeOff size={18} />
                            ) : (
                                <Eye size={18} />
                            )}
                        </button>
                    </div>
                </motion.div>

                {error && (
                    <p 
                        className="text-sm py-2 px-3 rounded-lg"
                        style={{ 
                            color: THEME.error,
                            backgroundColor: `${THEME.error}10`
                        }}
                    >
                        {error}
                    </p>
                )}

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full mt-6 px-6 py-3 rounded-lg shadow-md transition-all font-medium"
                    style={{
                        backgroundColor: THEME.gold,
                        color: THEME.white
                    }}
                >
                    Login
                </motion.button>

                <div 
                    className="text-center mt-6 text-sm"
                    style={{ color: THEME.textMuted }}
                >
                    Don't have an account?{" "}
                    <Link 
                        to="/register" 
                        className="underline hover:no-underline font-medium"
                        style={{ color: THEME.gold }}
                    >
                        Register
                    </Link>
                </div>
            </form>
        </>
    );
}
