import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { CLUB_NAME } from "@/consts";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";

const THEME = {
    cyan: "#00A0D9",
    cyanDark: "#0077B6",
    purple: "#480CA8",
    cream: "#FFF9F0",
    creamDark: "#FFE8CC",
    orange: "#F48C06",
};

const navLinks = [
    { label: "Home", path: "/" },
    { label: "About Us", path: "/about" },
    { label: "Events", path: "/events" },
    { label: "Gallery", path: "/gallery" },
    { label: "Contact Us", path: "/contact" },
    { label: "Yog & Welness", path: "/yog" },
];

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const isLoggedIn = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const variant = isOpen ? "opened" : "closed";
    const top = {
        closed: { rotate: 0, translateY: 0 },
        opened: { rotate: 45, translateY: 6 },
    };
    const center = {
        closed: { opacity: 1 },
        opened: { opacity: 0 },
    };
    const bottom = {
        closed: { rotate: 0, translateY: 0 },
        opened: { rotate: -45, translateY: -6 },
    };

    const lineProps = {
        stroke: "currentColor",
        strokeWidth: 2.5,
        vectorEffect: "non-scaling-stroke",
        initial: "closed",
        animate: variant,
        transition: { type: "spring", stiffness: 260, damping: 20 },
    };

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ${
                scrolled 
                    ? "py-3 shadow-lg backdrop-blur-xl bg-white/90" 
                    : "py-5 bg-transparent"
            }`}
        >
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-6">
                {/* Logo */}
                <NavLink
                    to="/"
                    className="relative group"
                >
                    <motion.span 
                        className="text-2xl font-black tracking-tight"
                        style={{ 
                            color: scrolled ? THEME.purple : "white",
                            textShadow: scrolled ? "none" : "0 2px 10px rgba(0,0,0,0.3)"
                        }}
                        whileHover={{ scale: 1.05 }}
                    >
                        {CLUB_NAME}
                    </motion.span>
                    <motion.div
                        className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-orange-400"
                        initial={{ width: 0 }}
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.3 }}
                    />
                </NavLink>

                {/* Hamburger (Mobile) */}
                <button
                    className={`md:hidden flex flex-col justify-center items-center p-2 rounded-lg transition-colors ${
                        scrolled ? "text-purple-900" : "text-white"
                    }`}
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <motion.line x1="4" y1="6" x2="20" y2="6" {...lineProps} variants={top} />
                        <motion.line x1="4" y1="12" x2="20" y2="12" {...lineProps} variants={center} />
                        <motion.line x1="4" y1="18" x2="20" y2="18" {...lineProps} variants={bottom} />
                    </svg>
                </button>

                {/* Center Links - Desktop */}
                <ul className="hidden md:flex md:flex-1 justify-center items-center gap-8">
                    {navLinks.map((link) => (
                        <li key={link.path}>
                            <NavLink
                                to={link.path}
                                className={({ isActive }) =>
                                    `relative px-3 py-2 text-sm font-semibold transition-all duration-300 ${
                                        isActive ? "text-cyan-600" : scrolled ? "text-purple-900/80 hover:text-purple-900" : "text-white/90 hover:text-white"
                                    }`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        {link.label}
                                        <motion.div
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-orange-400 rounded-full"
                                            initial={false}
                                            animate={{ 
                                                scaleX: isActive ? 1 : 0,
                                                opacity: isActive ? 1 : 0 
                                            }}
                                            whileHover={{ scaleX: 1, opacity: 1 }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    </>
                                )}
                            </NavLink>
                        </li>
                    ))}
                </ul>

                {/* Right Side Auth - Desktop */}
                <div className="hidden md:flex items-center gap-4">
                    {isLoggedIn ? (
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <NavLink
                                to="/me"
                                className="px-6 py-2.5 rounded-full font-bold text-white bg-gradient-to-r from-cyan-500 to-cyan-600 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all"
                            >
                                Dashboard
                            </NavLink>
                        </motion.div>
                    ) : (
                        <>
                            <NavLink
                                to="/login"
                                className={`text-sm font-semibold transition-colors ${
                                    scrolled ? "text-purple-900 hover:text-cyan-600" : "text-white/90 hover:text-white"
                                }`}
                            >
                                Log In
                            </NavLink>

                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <NavLink
                                    to="/register"
                                    className="px-6 py-2.5 rounded-full font-bold text-white bg-gradient-to-r from-cyan-500 to-cyan-600 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all"
                                >
                                    Join Now
                                </NavLink>
                            </motion.div>
                        </>
                    )}
                </div>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="md:hidden overflow-hidden bg-white/95 backdrop-blur-xl border-t border-gray-100"
                    >
                        <ul className="flex flex-col gap-2 px-6 py-6">
                            {navLinks.map((link, i) => (
                                <motion.li
                                    key={link.path}
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: -20, opacity: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                >
                                    <NavLink
                                        to={link.path}
                                        onClick={() => setIsOpen(false)}
                                        className={({ isActive }) =>
                                            `block py-3 px-4 rounded-xl text-base font-semibold transition-all ${
                                                isActive 
                                                    ? "bg-cyan-50 text-cyan-600" 
                                                    : "text-purple-900 hover:bg-gray-50"
                                            }`
                                        }
                                    >
                                        {link.label}
                                    </NavLink>
                                </motion.li>
                            ))}
                            <motion.div
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -20, opacity: 0 }}
                                transition={{ delay: navLinks.length * 0.05 }}
                                className="pt-4 mt-2 border-t border-gray-100 flex flex-col gap-3"
                            >
                                {isLoggedIn ? (
                                    <NavLink
                                        to="/me"
                                        onClick={() => setIsOpen(false)}
                                        className="block text-center py-3 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-cyan-500 to-cyan-600"
                                    >
                                        Dashboard
                                    </NavLink>
                                ) : (
                                    <>
                                        <NavLink
                                            to="/login"
                                            onClick={() => setIsOpen(false)}
                                            className="block py-3 px-4 rounded-xl text-center font-semibold text-purple-900 hover:bg-gray-50"
                                        >
                                            Log In
                                        </NavLink>
                                        <NavLink
                                            to="/register"
                                            onClick={() => setIsOpen(false)}
                                            className="block text-center py-3 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-cyan-500 to-cyan-600"
                                        >
                                            Join Now
                                        </NavLink>
                                    </>
                                )}
                            </motion.div>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}