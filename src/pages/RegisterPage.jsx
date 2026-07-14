import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { client } from "../../config";
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

export function RegisterPage() {
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
                <div className="max-w-md w-full mx-auto px-1">
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
                        <RegisterForm />
                    </motion.div>
                </div>
            </section>
        </motion.div>
    );
}

function RegisterForm() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        address: "",
        dob: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    function validate() {
        const newErrors = {};

        if (form.phone.length !== 10) {
            newErrors.phone = "Phone number must be exactly 10 digits";
        }

        if (form.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (!validate()) return;

        try {
            const res = await client.post("/api/auth/register", form);
            localStorage.setItem('token', `Bearer ${res.data.jwt}`);
            toast.success(res.data.msg);
            navigate('/me');
        } catch (err) {
            console.log("Error during register: ", err);
            toast.error(err.message);
        }
    }

    return (
        <>
            <div className="flex items-center justify-between mb-8">
                <h2 
                    className="text-2xl font-semibold"
                    style={{ color: THEME.text }}
                >
                    Create Account
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
                {/* FULL NAME */}
                <motion.div {...fadeInUp}>
                    <label 
                        className="block text-sm font-medium mb-1"
                        style={{ color: THEME.text }}
                    >
                        Full Name *
                    </label>
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 transition-all"
                        style={{ 
                            borderColor: THEME.border,
                            backgroundColor: THEME.white,
                            color: THEME.text
                        }}
                    />
                </motion.div>

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
                            color: THEME.text
                        }}
                    />
                </motion.div>

                {/* PHONE */}
                <motion.div {...fadeInUp}>
                    <label 
                        className="block text-sm font-medium mb-1"
                        style={{ color: THEME.text }}
                    >
                        Phone Number *
                    </label>
                    <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        maxLength={10}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 transition-all"
                        style={{ 
                            borderColor: THEME.border,
                            backgroundColor: THEME.white,
                            color: THEME.text
                        }}
                    />
                    {errors.phone && (
                        <p 
                            className="text-sm mt-2 py-1 px-2 rounded"
                            style={{ 
                                color: THEME.error,
                                backgroundColor: `${THEME.error}10`
                            }}
                        >
                            {errors.phone}
                        </p>
                    )}
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
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    {errors.password && (
                        <p 
                            className="text-sm mt-2 py-1 px-2 rounded"
                            style={{ 
                                color: THEME.error,
                                backgroundColor: `${THEME.error}10`
                            }}
                        >
                            {errors.password}
                        </p>
                    )}
                </motion.div>

                {/* ADDRESS */}
                <motion.div {...fadeInUp}>
                    <label 
                        className="block text-sm font-medium mb-1"
                        style={{ color: THEME.text }}
                    >
                        Address *
                    </label>
                    <textarea
                        name="address"
                        rows={3}
                        value={form.address}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 transition-all resize-none"
                        style={{ 
                            borderColor: THEME.border,
                            backgroundColor: THEME.white,
                            color: THEME.text
                        }}
                    />
                </motion.div>

                {/* DOB */}
                <motion.div {...fadeInUp}>
                    <label 
                        className="block text-sm font-medium mb-1"
                        style={{ color: THEME.text }}
                    >
                        Date of Birth *
                    </label>
                    <input
                        type="date"
                        name="dob"
                        value={form.dob}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 transition-all"
                        style={{ 
                            borderColor: THEME.border,
                            backgroundColor: THEME.white,
                            color: THEME.text
                        }}
                    />
                </motion.div>

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
                    Register
                </motion.button>

                <div 
                    className="text-center mt-6 text-sm"
                    style={{ color: THEME.textMuted }}
                >
                    Already have an account? {" "}
                    <Link 
                        to="/login" 
                        className="underline hover:no-underline font-medium"
                        style={{ color: THEME.gold }}
                    >
                        Login
                    </Link>
                </div>
            </form>
        </>
    );
}
