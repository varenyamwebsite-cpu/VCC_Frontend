import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";

// THEME
const THEME = {
    cyan: "#00B4D8",
    cyanDark: "#0077B6",
    cyanLight: "#90E0EF",
    purple: "#480CA8",
    purpleLight: "#7209B7",
    cream: "#FFF9F0",
    creamDark: "#FFE8CC",
    orange: "#F48C06",
    yellow: "#FAA307",
    green: "#2D6A4F",
    red: "#D00000",
    gold: "#FFB703",
};

// PARTICLE COMPONENT FOR HERO
function FloatingParticles() {
    const particles = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 10 + 5,
        duration: Math.random() * 10 + 10,
        delay: Math.random() * 5,
        color: [THEME.cyan, THEME.orange, THEME.yellow, THEME.gold][Math.floor(Math.random() * 4)],
    }));

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full blur-[1px]"
                    style={{
                        width: p.size,
                        height: p.size,
                        left: `${p.x}%`,
                        background: `radial-gradient(circle, ${p.color}, transparent)`,
                        boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
                    }}
                    animate={{
                        y: ["-10vh", "110vh"],
                        x: [0, Math.random() * 100 - 50, 0],
                        opacity: [0, 1, 1, 0],
                        scale: [0.5, 1, 0.5],
                    }}
                    transition={{
                        duration: p.duration,
                        delay: p.delay,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
            ))}
        </div>
    );
}

// RIPPLE BUTTON COMPONENT
function RippleButton({ children, onClick, className = "", primary = false }) {
    const [ripples, setRipples] = useState([]);

    const handleClick = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setRipples([...ripples, { x, y, id: Date.now() }]);
        onClick?.(e);

        setTimeout(() => {
            setRipples((prev) => prev.slice(1));
        }, 600);
    };

    return (
        <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClick}
            className={`relative overflow-hidden px-8 py-4 rounded-full font-bold text-lg transition-all ${className}`}
            style={{
                background: primary
                    ? `linear-gradient(135deg, ${THEME.cyan} 0%, ${THEME.cyanDark} 100%)`
                    : "transparent",
                boxShadow: primary
                    ? `0 10px 30px ${THEME.cyan}50, inset 0 2px 10px rgba(255,255,255,0.3)`
                    : `0 0 0 2px ${THEME.cyan}`,
                color: primary ? "white" : THEME.cyan,
            }}
        >
            {ripples.map((ripple) => (
                <motion.span
                    key={ripple.id}
                    className="absolute rounded-full bg-white/30 pointer-events-none"
                    style={{ left: ripple.x, top: ripple.y }}
                    initial={{ width: 0, height: 0, x: 0, y: 0 }}
                    animate={{ width: 400, height: 400, x: -200, y: -200, opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                />
            ))}
            <span className="relative z-10 flex items-center gap-2">{children}</span>
        </motion.button>
    );
}

// 3D TILT CARD
function TiltCard({ children, className = "" }) {
    const ref = useRef(null);
    const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 });

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        setTransform({
            rotateX: ((y - centerY) / centerY) * -10,
            rotateY: ((x - centerX) / centerX) * 10,
        });
    };

    const handleMouseLeave = () => {
        setTransform({ rotateX: 0, rotateY: 0 });
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{
                rotateX: transform.rotateX,
                rotateY: transform.rotateY,
                transformPerspective: 1000,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={className}
            style={{ transformStyle: "preserve-3d" }}
        >
            {children}
        </motion.div>
    );
}

// CUSTOM CURSOR
function CustomCursor() {
    const posRef = useRef({ x: 0, y: 0 });
    const targetRef = useRef({ x: 0, y: 0 });
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        let rafId;
        const lerp = (a, b, n) => a + (b - a) * n;

        const animate = () => {
            const p = posRef.current;
            const t = targetRef.current;
            p.x = lerp(p.x, t.x, 0.4);
            p.y = lerp(p.y, t.y, 0.4);
            setPosition({ x: p.x, y: p.y });
            rafId = requestAnimationFrame(animate);
        };

        const move = (e) => {
            targetRef.current.x = e.clientX;
            targetRef.current.y = e.clientY;
            setIsVisible(true);
        };

        const hoverCheck = (el) =>
            el?.closest?.("button, a, [role='button'], input, textarea");

        const over = (e) => setIsHovering(!!hoverCheck(e.target));
        const out = (e) => !hoverCheck(e.relatedTarget) && setIsHovering(false);
        const leave = () => setIsVisible(false);
        const enter = () => setIsVisible(true);

        window.addEventListener("mousemove", move, { passive: true });
        document.addEventListener("mouseover", over);
        document.addEventListener("mouseout", out);
        document.addEventListener("mouseleave", leave);
        document.addEventListener("mouseenter", enter);
        rafId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener("mousemove", move);
            document.removeEventListener("mouseover", over);
            document.removeEventListener("mouseout", out);
            document.removeEventListener("mouseleave", leave);
            document.removeEventListener("mouseenter", enter);
        };
    }, []);

    if (typeof window === "undefined") return null;

    const color = isHovering ? "#ff3b3b" : "#3b82ff";
    const glow = isHovering
        ? "0 0 20px rgba(255,59,59,0.8)"
        : "0 0 14px rgba(59,130,255,0.7)";

    return (
        <>
            {isVisible && (
                <motion.div
                    className="fixed pointer-events-none z-[9999] hidden md:block"
                    style={{
                        left: position.x,
                        top: position.y,
                        transform: "translate(-50%, -50%)",
                    }}
                    animate={{ scale: isHovering ? 2 : 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                    <div
                        className="rounded-full"
                        style={{
                            width: 18,
                            height: 18,
                            background: color,
                            boxShadow: glow,
                            transition: "background 0.2s ease, box-shadow 0.2s ease",
                        }}
                    />
                </motion.div>
            )}
            <style>{`
                @media (min-width:768px){
                    *{cursor:none!important;}
                }
            `}</style>
        </>
    );
}

// HERO — updated with real images from varenyamfoundation.in
function Hero() {
    const images = [
        {
            url: "https://varenyamfoundation.in/assets/Media/KoshetoHero1.jpg",
            position: "center",
        },
        {
            url: "https://varenyamfoundation.in/assets/Media/SnSHero1.jpeg",
            position: "center 30%",
        },
        {
            url: "https://varenyamfoundation.in/assets/Media/DastanEGoiHro1.jpeg",
            position: "center",
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 6000);
        return () => clearInterval(interval);
    }, [images.length]);

    const scrollToNext = () => {
        window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
    };

    return (
        <section className="relative h-screen min-h-[700px] overflow-hidden bg-slate-900">
            {/* Background Images - Crossfade */}
            {images.map((img, idx) => (
                <motion.div
                    key={idx}
                    className="absolute inset-0"
                    initial={false}
                    animate={{
                        opacity: idx === currentIndex ? 1 : 0,
                        scale: idx === currentIndex ? 1 : 1.1,
                    }}
                    transition={{
                        opacity: { duration: 1.5, ease: "easeInOut" },
                        scale: { duration: 8, ease: "easeOut" },
                    }}
                >
                    <div
                        className="absolute inset-0 bg-cover bg-no-repeat"
                        style={{
                            backgroundImage: `url(${img.url})`,
                            backgroundPosition: img.position,
                            filter: "saturate(1.1) contrast(1.05)",
                        }}
                    />
                </motion.div>
            ))}

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/60 via-transparent to-purple-900/40 z-10" />
            <div className="absolute inset-0 bg-black/20 z-10" />

            {/* Content */}
            <div className="relative z-20 h-full flex flex-col justify-center items-center px-6">
                <div className="max-w-5xl mx-auto text-center">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-cyan-300 text-sm md:text-base tracking-[0.3em] uppercase mb-6 font-semibold"
                    >
                        Est. 2018 • Gandhinagar
                    </motion.p>

                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-6 tracking-tight"
                        style={{ textShadow: "0 4px 30px rgba(0,0,0,0.5)", letterSpacing: "-0.02em" }}
                    >
                        VARENYAM
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="relative inline-block mb-8"
                    >
                        <p className="text-2xl md:text-4xl text-white/90 font-light tracking-wide">
                            Cultural Club
                        </p>
                        <motion.div
                            className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-yellow-400 to-cyan-400 rounded-full"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 1, delay: 1, ease: "easeOut" }}
                        />
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-12 leading-relaxed"
                    >
                        Where tradition meets innovation. Experience the unseen,
                        celebrate the unique and become part of something extraordinary
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <motion.button
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() =>
                                window.open(
                                    "https://docs.google.com/forms/d/1lQEVO_WmAA4kJzNZL23r8R_bDAoHcMt3CmAxDj1IMX8/viewform",
                                    "_blank"
                                )
                            }
                            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-bold rounded-full shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-shadow"
                        >
                            Join the Club →
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => (window.location.href = "/events")}
                            className="px-8 py-4 bg-white/10 backdrop-blur-md text-white font-bold rounded-full border-2 border-white/30 hover:bg-white/20 transition-colors"
                        >
                            Explore Events
                        </motion.button>
                    </motion.div>
                </div>
            </div>

            {/* Slide Indicators */}
            <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-20 flex gap-3">
                {images.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className="group relative h-2 rounded-full overflow-hidden bg-white/20 transition-all duration-300"
                        style={{ width: idx === currentIndex ? 40 : 20 }}
                    >
                        <motion.div
                            className="absolute inset-0 bg-white"
                            initial={false}
                            animate={{ scaleX: idx === currentIndex ? 1 : 0, originX: 0 }}
                            transition={{ duration: idx === currentIndex ? 6 : 0.3, ease: "linear" }}
                        />
                    </button>
                ))}
            </div>

            {/* Scroll indicator */}
            <motion.button
                onClick={scrollToNext}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-white/60 hover:text-white transition-colors"
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
                <div className="flex flex-col items-center gap-2">
                    <span className="text-xs tracking-widest uppercase">Scroll</span>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </motion.button>
        </section>
    );
}

// ABOUT US — updated text from built bundle
function AboutUs() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

    const stats = [
        { value: "10+", label: "Years of Excellence", icon: "🏆" },
        { value: "50+", label: "Events Hosted", icon: "🎭" },
        { value: "20000+", label: "Happy Audience", icon: "👥" },
        { value: "200+", label: "Premium Members", icon: "✨" },
    ];

    return (
        <section ref={ref} className="relative py-32 overflow-hidden bg-[#FFF9F0]">
            <motion.div
                style={{ y }}
                className="absolute -right-40 top-20 w-96 h-96 rounded-full bg-gradient-to-br from-cyan-200/30 to-purple-200/30 blur-3xl"
            />
            <motion.div
                style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
                className="absolute -left-40 bottom-20 w-80 h-80 rounded-full bg-gradient-to-tr from-orange-200/30 to-yellow-200/30 blur-3xl"
            />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.span
                            className="inline-block px-4 py-2 rounded-full text-sm font-bold mb-6"
                            style={{ background: THEME.cyan + "20", color: THEME.cyanDark }}
                            whileHover={{ scale: 1.05, rotate: -2 }}
                        >
                            WHO WE ARE
                        </motion.span>

                        <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight" style={{ color: THEME.purple }}>
                            We Don't Just
                            <br />
                            <span className="relative inline-block">
                                Celebrate Culture
                                <motion.svg
                                    className="absolute -bottom-2 left-0 w-full"
                                    viewBox="0 0 300 12"
                                    fill="none"
                                >
                                    <motion.path
                                        d="M2 10C50 2 100 2 150 6C200 10 250 10 298 2"
                                        stroke={THEME.orange}
                                        strokeWidth="4"
                                        strokeLinecap="round"
                                        initial={{ pathLength: 0 }}
                                        whileInView={{ pathLength: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1, delay: 0.5 }}
                                    />
                                </motion.svg>
                            </span>
                            <br />
                            We <span style={{ color: THEME.cyan }}>Live</span> It
                        </h2>

                        {/* Updated paragraph 1 */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-lg text-gray-700 leading-relaxed mb-6"
                        >
                            Varenyam Cultural Club is an initiative of{" "}
                            <span className="font-bold" style={{ color: THEME.cyan }}>"Varenyam Foundation"</span>
                            , Founded in 2018 with the aim of Cultural and Academic Events, Skill Development,
                            Yoga & Wellness and Corporate Social Responsibility (CSR)
                        </motion.p>

                        {/* Updated paragraph 2 */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="text-lg text-gray-700 leading-relaxed mb-6"
                        >
                            The name <span className="font-bold" style={{ color: THEME.cyan }}>"Varenyam"</span> comes
                            from Sanskrit, meaning <span className="italic">"excellent"</span> or{" "}
                            <span className="italic">"worthy of being chosen."</span> It represents our commitment to
                            excellence in everything we do.
                        </motion.p>

                        {/* Updated paragraph 3 */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="text-lg text-gray-700 leading-relaxed mb-8"
                        >
                            Today, we stand as a beacon of cultural pride, bringing together over{" "}
                            <span className="font-bold" style={{ color: THEME.cyan }}>500 families</span> who share
                            our vision of keeping traditions alive while embracing the future.
                        </motion.p>

                        <RippleButton onClick={() => window.location.href = "/about"}>
                            Our Story →
                        </RippleButton>
                    </motion.div>

                    {/* Stats Grid */}
                    <motion.div
                        className="grid grid-cols-2 gap-4"
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        variants={{
                            initial: {},
                            animate: { transition: { staggerChildren: 0.1 } },
                        }}
                    >
                        {stats.map((stat, idx) => (
                            <TiltCard key={idx}>
                                <motion.div
                                    variants={{
                                        initial: { opacity: 0, y: 50, rotateX: -30 },
                                        animate: { opacity: 1, y: 0, rotateX: 0 },
                                    }}
                                    whileHover={{ scale: 1.05, y: -10 }}
                                    className="p-6 rounded-3xl backdrop-blur-xl border-2 text-center"
                                    style={{
                                        background: "rgba(255,255,255,0.8)",
                                        borderColor: idx % 2 === 0 ? THEME.cyan : THEME.orange,
                                    }}
                                >
                                    <motion.div
                                        className="text-4xl mb-2"
                                        animate={{ y: [0, -5, 0] }}
                                        transition={{ repeat: Infinity, duration: 2, delay: idx * 0.2 }}
                                    >
                                        {stat.icon}
                                    </motion.div>
                                    <div className="text-4xl font-black mb-1" style={{ color: THEME.purple }}>
                                        {stat.value}
                                    </div>
                                    <div className="text-sm font-medium text-gray-600">{stat.label}</div>
                                </motion.div>
                            </TiltCard>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

// UPCOMING EVENTS — updated with real event data and images
function UpcomingEvents() {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const events = [
        {
            title: "Sarhad Na Sur",
            date: "Jan 25, 2025",
            time: "7:00 PM",
            venue: "Town Hall, Gandhinagar",
            image: "https://varenyamfoundation.in/assets/Media/EventGallery/1.JPG",
            tag: "Cultural",
            color: THEME.cyan,
        },
        {
            title: "Kosheto",
            date: "Feb 10, 2025",
            time: "08:00 PM",
            venue: "Ambedkar Hall, Gandhinagar",
            image: "https://varenyamfoundation.in/assets/Media/EventGallery/3.jpg",
            tag: "Act",
            color: THEME.orange,
        },
        {
            title: "Dastan Goi",
            date: "Mar 15, 2025",
            time: "07:30 PM",
            venue: "Ambedkar Hall, Gandhinagar",
            image: "https://varenyamfoundation.in/assets/Media/EventGallery/2.jpg",
            tag: "Cultural",
            color: THEME.cyan,
        },
    ];

    return (
        <section className="py-32 relative overflow-hidden bg-gradient-to-b from-[#FFF9F0] to-[#FFffff]">
            <div className="absolute inset-0 opacity-5" style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, ${THEME.cyan} 1px, transparent 0)`,
                backgroundSize: "40px 40px",
            }} />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <motion.span
                        className="inline-block px-4 py-2 rounded-full text-sm font-bold mb-6"
                        style={{ background: THEME.orange + "20", color: THEME.orange }}
                        whileHover={{ scale: 1.05 }}
                    >
                        MARK YOUR CALENDAR
                    </motion.span>
                    <h2 className="text-5xl md:text-6xl font-black mb-6" style={{ color: THEME.purple }}>
                        Upcoming <span style={{ color: THEME.cyan }}>Experiences</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Don't just attend events. Be part of memories that last forever.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {events.map((event, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 100 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2 }}
                            onMouseEnter={() => setHoveredIndex(idx)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            className="relative group cursor-pointer"
                        >
                            <motion.div
                                className="relative h-[500px] rounded-3xl overflow-hidden"
                                animate={{
                                    y: hoveredIndex === idx ? -20 : 0,
                                    scale: hoveredIndex === idx ? 1.02 : 1,
                                }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <img
                                    src={event.image}
                                    alt={event.title}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                                <motion.div
                                    className="absolute top-4 left-4 px-4 py-1 rounded-full text-xs font-bold text-white"
                                    style={{ background: event.color }}
                                    initial={{ x: -50, opacity: 0 }}
                                    whileInView={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 + idx * 0.1 }}
                                >
                                    {event.tag}
                                </motion.div>

                                <div className="absolute bottom-0 left-0 right-0 p-8">
                                    <motion.div
                                        animate={{ y: hoveredIndex === idx ? -10 : 0 }}
                                        className="space-y-3"
                                    >
                                        <div className="flex items-center gap-2 text-white/80 text-sm">
                                            <span>{event.date}</span>
                                            <span>•</span>
                                            <span>{event.time}</span>
                                        </div>
                                        <h3 className="text-3xl font-bold text-white">{event.title}</h3>
                                        <p className="text-white/70 flex items-center gap-2">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                            </svg>
                                            {event.venue}
                                        </p>


                                    </motion.div>
                                </div>

                                <motion.div
                                    className="absolute inset-0 rounded-3xl border-4"
                                    style={{ borderColor: event.color }}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: hoveredIndex === idx ? 1 : 0 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className="mt-20 text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <RippleButton onClick={() => (window.location.href = "/events")}>
                        View All Events →
                    </RippleButton>
                </motion.div>
            </div>
        </section>
    );
}

// GALLERY — updated with real images from varenyamfoundation.in
function Gallery() {
    const containerRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const images = [
        { src: "https://varenyamfoundation.in/assets/Media/EventGallery/4.jpeg", span: "col-span-2 row-span-2" },
        { src: "https://varenyamfoundation.in/assets/Media/EventGallery/9.jpg", span: "" },
        { src: "https://varenyamfoundation.in/assets/Media/EventGallery/6.jpeg", span: "" },
        { src: "https://varenyamfoundation.in/assets/Media/EventGallery/3.jpg", span: "row-span-2" },
        { src: "https://varenyamfoundation.in/assets/Media/EventGallery/7.jpg", span: "" },
        { src: "https://varenyamfoundation.in/assets/Media/EventGallery/5.JPG", span: "" },
    ];

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - containerRef.current.offsetLeft);
        setScrollLeft(containerRef.current.scrollLeft);
    };

    const handleMouseUp = () => setIsDragging(false);

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - containerRef.current.offsetLeft;
        const walk = (x - startX) * 2;
        containerRef.current.scrollLeft = scrollLeft - walk;
    };

    return (
        <section className="py-32 relative overflow-hidden bg-[#FFF9F0]">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span
                        className="inline-block px-4 py-2 rounded-full text-sm font-bold mb-6"
                        style={{ background: THEME.purple + "20", color: THEME.purple }}
                    >
                        VISUAL STORIES
                    </span>
                    <h2 className="text-5xl md:text-6xl font-black mb-6" style={{ color: THEME.purple }}>
                        Moments <span style={{ color: THEME.cyan }}>Captured</span>
                    </h2>
                    <p className="text-xl text-gray-600">Drag to explore our visual journey</p>
                </motion.div>

                <motion.div
                    ref={containerRef}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 cursor-grab active:cursor-grabbing select-none"
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                >
                    {images.map((img, idx) => (
                        <motion.div
                            key={idx}
                            className={`relative overflow-hidden rounded-2xl ${img.span} h-64 ${img.span.includes("row-span-2") ? "h-[528px]" : ""}`}
                            whileHover={{ scale: 1.02, zIndex: 10 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <img
                                src={img.src}
                                alt="Gallery"
                                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110 pointer-events-none"
                                draggable="false"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/80 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full"
                                whileHover={{ translateX: "100%" }}
                                transition={{ duration: 0.6 }}
                            />
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    className="mt-16 text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <RippleButton onClick={() => (window.location.href = "/gallery")}>
                        Visit Full Gallery →
                    </RippleButton>
                </motion.div>
            </div>
        </section>
    );
}

// MARQUEE TEXT
function MarqueeText({ text, reverse = false }) {
    return (
        <div className="overflow-hidden py-4 bg-cyan-500 text-white font-black text-2xl whitespace-nowrap">
            <motion.div
                className="flex gap-8"
                animate={{ x: reverse ? [0, -1000] : [-1000, 0] }}
                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            >
                {Array(10).fill(text).map((t, i) => (
                    <span key={i} className="flex items-center gap-4">
                        {t} <span className="text-yellow-300">★</span>
                    </span>
                ))}
            </motion.div>
        </div>
    );
}

// MAIN EXPORT
export function HomePage() {
    return (
        <div className="relative">
            <CustomCursor />
            <Hero />
            <MarqueeText text="MUSIC • DRAMA • DANCE • LITERATURE • HERITAGE • CRAFT • COMMUNITY" />
            <AboutUs />
            <UpcomingEvents />
            <MarqueeText text="JOIN THE MOVEMENT • BE THE CULTURE • LIVE THE ART" reverse />
            <Gallery />

            {/* Footer CTA */}
            <section className="py-32 bg-gradient-to-br from-purple-900 via-cyan-900 to-purple-900 relative overflow-hidden">
                <FloatingParticles />
                <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                    <motion.h2
                        className="text-6xl md:text-8xl font-black text-white mb-8"
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", bounce: 0.5 }}
                    >
                        READY TO
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-yellow-400">
                            JOIN US?
                        </span>
                    </motion.h2>
                    <RippleButton
                        primary
                        onClick={() =>
                            window.open(
                                "https://docs.google.com/forms/d/1lQEVO_WmAA4kJzNZL23r8R_bDAoHcMt3CmAxDj1IMX8/viewform",
                                "_blank"
                            )
                        }
                        className="text-xl px-12 py-6"
                    >
                        Become a Member Now →
                    </RippleButton>
                </div>
            </section>
        </div>
    );
} 