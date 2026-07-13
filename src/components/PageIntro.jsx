import { motion } from "framer-motion";

// DARK BLUEISH THEME - Sophisticated, inviting, not spacey
const THEME = {
    // Deep blue-charcoal (not black, not purple)
    bg: "#0f172a",           // Slate 900 - deep blue-gray
    bgLight: "#1e293b",      // Slate 800 - lighter blue-gray
    bgDark: "#020617",       // Slate 950 - deepest
    
    // Warm accents that work with blue
    ochre: "#d4a574",        // Warm gold
    ochreLight: "#e8c39e",   // Lighter warm gold
    terracotta: "#c17a53",   // Soft terracotta
    cyan: "#06b6d4",         // Muted cyan (not neon)
    cream: "#f8fafc",        // Soft white with warm tint
};

// SUBTLE FLOATING PARTICLES - Dust motes in warm light
function FloatingParticles() {
    const particles = Array.from({ length: 12 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 20 + 15,
        delay: Math.random() * 5,
        color: [THEME.ochre, THEME.cyan, THEME.terracotta][Math.floor(Math.random() * 3)],
    }));

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full"
                    style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        width: p.size,
                        height: p.size,
                        background: p.color,
                        boxShadow: `0 0 ${p.size * 3}px ${p.color}40`,
                    }}
                    animate={{
                        y: [0, -40, 0],
                        x: [0, Math.random() * 20 - 10, 0],
                        opacity: [0.1, 0.4, 0.1],
                    }}
                    transition={{
                        duration: p.duration,
                        delay: p.delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}1
        </div>
    );
}

// SUBTLE MANDALA TEXTURE - Static, background only
function MandalaTexture({ className = "" }) {
    return (
        <div className={`absolute pointer-events-none opacity-[0.02] ${className}`}>
            <svg width="300" height="300" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke={THEME.ochre} strokeWidth="0.5" />
                <circle cx="50" cy="50" r="25" fill="none" stroke={THEME.ochre} strokeWidth="0.3" />
                {Array.from({ length: 8 }).map((_, i) => (
                    <line
                        key={i}
                        x1="50"
                        y1="10"
                        x2="50"
                        y2="30"
                        stroke={THEME.ochre}
                        strokeWidth="0.3"
                        transform={`rotate(${i * 45} 50 50)`}
                    />
                ))}
            </svg>
        </div>
    );
}

// DECORATIVE LINE - Traditional motif
function DecorativeLine({ className = "" }) {
    return (
        <motion.div 
            className={`flex items-center justify-center gap-3 ${className}`}
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
        >
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-600/50" />
            <svg width="20" height="20" viewBox="0 0 24 24" className="text-amber-600/70">
                <path fill="currentColor" d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
            </svg>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-600/50" />
        </motion.div>
    );
}

export function PageIntro({ eyebrow, title, description }) {
    return (
        <section className="relative py-20 md:py-28 overflow-hidden" style={{ backgroundColor: THEME.bg }}>
            {/* Subtle blue gradient overlay */}
            <div 
                className="absolute inset-0 opacity-60" 
                style={{
                    background: `radial-gradient(ellipse at 50% 0%, ${THEME.bgLight} 0%, transparent 70%)`
                }}
            />
            
            {/* Floating particles - subtle dust motes */}
            <FloatingParticles />
            
            {/* Static mandala textures */}
            <MandalaTexture className="top-0 right-0 w-48 h-48" />
            <MandalaTexture className="bottom-0 left-0 w-48 h-48" />
            
            {/* Warm ambient glow */}
            <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] opacity-30 blur-3xl pointer-events-none"
                style={{
                    background: `radial-gradient(ellipse, ${THEME.ochre}15 0%, transparent 70%)`
                }}
            />
            
            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                {/* Eyebrow */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <span 
                        className="text-xs md:text-sm tracking-[0.3em] uppercase font-medium"
                        style={{ color: THEME.ochreLight }}
                    >
                        {eyebrow}
                    </span>
                </motion.div>

                <DecorativeLine className="mt-4 mb-8" />

                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
                    className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight"
                    style={{ 
                        color: THEME.cream,
                        fontFamily: "Georgia, 'Times New Roman', serif",
                        letterSpacing: "-0.02em",
                        textShadow: `0 2px 20px ${THEME.bgDark}50`
                    }}
                >
                    {title}
                </motion.h1>

                {/* Subtle underline */}
                <motion.div
                    className="h-0.5 w-20 mx-auto mt-6 rounded-full"
                    style={{ background: `linear-gradient(90deg, transparent, ${THEME.ochre}, transparent)` }}
                    initial={{ scaleX: 0, opacity: 0 }}
                    whileInView={{ scaleX: 1, opacity: 0.5 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                />

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                    className="mt-8 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
                    style={{ 
                        color: THEME.cream,
                        opacity: 0.8,
                        fontFamily: "Georgia, 'Times New Roman', serif"
                    }}
                >
                    {description}
                </motion.p>
                
                {/* Bottom decorative dots */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-12 flex justify-center"
                >
                    <svg width="36" height="10" viewBox="0 0 36 10" className="opacity-50" style={{ color: THEME.ochre }}>
                        <circle cx="5" cy="5" r="2" fill="currentColor" />
                        <circle cx="18" cy="5" r="3" fill="currentColor" />
                        <circle cx="31" cy="5" r="2" fill="currentColor" />
                    </svg>
                </motion.div>
            </div>
        </section>
    );
}