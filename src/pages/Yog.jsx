import { motion } from "framer-motion";
import { useState } from "react";
import { PageIntro } from "@/components/PageIntro";

// THEME - Matching your established dark blueish palette
const THEME = {
    bg: "#0f172a",           // Slate 900
    bgLight: "#1e293b",      // Slate 800
    bgDark: "#020617",       // Slate 950
    ochre: "#d4a574",        // Warm gold
    ochreLight: "#e8c39e",   // Lighter gold
    terracotta: "#c17a53",   // Soft terracotta
    cyan: "#06b6d4",         // Muted cyan
    cream: "#f8fafc",        // Soft white
    sage: "#84a98c",         // Sage green for wellness
    sand: "#d4c5b5",         // Warm sand
};

// FLOATING PARTICLES - Same subtle dust motes
function FloatingParticles({ count = 12 }) {
    const particles = Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 20 + 15,
        delay: Math.random() * 5,
        color: [THEME.ochre, THEME.sage, THEME.cyan][Math.floor(Math.random() * 3)],
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
                        opacity: [0.1, 0.4, 0.1],
                    }}
                    transition={{
                        duration: p.duration,
                        delay: p.delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
}

// DECORATIVE LINE
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

// SECTION WRAPPER - Consistent styling for all sections
function Section({ children, className = "", id = "" }) {
    return (
        <section id={id} className={`relative py-24 md:py-32 overflow-hidden ${className}`} style={{ backgroundColor: THEME.bg }}>
            <FloatingParticles count={10} />
            <div className="absolute inset-0 opacity-30" style={{
                background: `radial-gradient(ellipse at 50% 0%, ${THEME.bgLight} 0%, transparent 70%)`
            }} />
            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {children}
            </div>
        </section>
    );
}

// INFO SECTION
function InfoSection() {
    const benefits = [
        { icon: "🧘", title: "Mindfulness", desc: "Ancient techniques for modern peace" },
        { icon: "🌿", title: "Holistic Health", desc: "Balance of body, mind, and spirit" },
        { icon: "☀️", title: "Daily Practice", desc: "Morning flows and evening meditations" },
        { icon: "🍃", title: "Natural Healing", desc: "Ayurvedic wisdom and wellness" },
    ];

    return (
        <Section id="info">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-xs md:text-sm tracking-[0.3em] uppercase font-medium" style={{ color: THEME.sage }}>
                        About Yog Corner
                    </span>
                    <DecorativeLine className="mt-4 mb-6 justify-start" />
                    
                    <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6" style={{ 
                        color: THEME.cream,
                        fontFamily: "Georgia, serif"
                    }}>
                        Find Your <span style={{ color: THEME.sage }}>Inner Balance</span>
                    </h2>
                    
                    <p className="text-lg leading-relaxed mb-6" style={{ color: THEME.cream, opacity: 0.8 }}>
                        Yog Corner is a sanctuary within Varenyam where ancient wisdom meets contemporary wellness. 
                        We offer a space for practitioners of all levels to explore yoga, meditation, and holistic health practices.
                    </p>
                    
                    <p className="text-lg leading-relaxed mb-8" style={{ color: THEME.cream, opacity: 0.7 }}>
                        Whether you seek physical flexibility, mental clarity, or spiritual growth, our guided sessions 
                        provide the tools for your journey toward complete well-being.
                        
                    </p>

                    <p className="text-lg leading-relaxed mb-8" style={{ color: THEME.cream, opacity: 0.7 }}>
                        The Classes are held at Sector 3 Garden, Near Sai Baba Temple, at 5.00 PM to 6.00 PM every Monday - Saturday. Contact - +91 98252 29494.

                        </p>
                    <div className="flex gap-4">
                        
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="grid grid-cols-2 gap-4"
                >
                    {benefits.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -5, scale: 1.02 }}
                            className="p-6 rounded-2xl border border-slate-700/50"
                            style={{ backgroundColor: `${THEME.bgLight}80` }}
                        >
                            <div className="text-4xl mb-3">{item.icon}</div>
                            <h3 className="text-lg font-semibold mb-2" style={{ color: THEME.cream }}>{item.title}</h3>
                            <p className="text-sm" style={{ color: THEME.cream, opacity: 0.6 }}>{item.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </Section>
    );
}

// PHOTO GALLERY SECTION
function GallerySection() {
    const images = [
        { src: "https://www.varenyamfoundation.in/assets/YogPics/Yog1.jpeg"},
        { src: "https://www.varenyamfoundation.in/assets/YogPics/Yog2.jpeg"},
        { src: "https://www.varenyamfoundation.in/assets/YogPics/Yog7.jpeg"},
        { src: "https://www.varenyamfoundation.in/assets/YogPics/Yog3.jpeg"},
        { src: "https://www.varenyamfoundation.in/assets/YogPics/Yog5.jpeg"},
        { src: "https://www.varenyamfoundation.in/assets/YogPics/Yog6.jpeg"},
    ];

    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <Section id="gallery">
            <div className="text-center mb-16">
                <span className="text-xs md:text-sm tracking-[0.3em] uppercase font-medium" style={{ color: THEME.sage }}>
                    Visual Journey
                </span>
                <DecorativeLine className="mt-4 mb-6" />
                <h2 className="text-4xl md:text-5xl font-semibold tracking-tight" style={{ 
                    color: THEME.cream,
                    fontFamily: "Georgia, serif"
                }}>
                    Yog Corner <span style={{ color: THEME.sage }}>Gallery</span>
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 auto-rows-[220px]">
                {images.map((img, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        whileHover={{ scale: 1.03, zIndex: 10 }}
                        className={`
                        relative overflow-hidden rounded-2xl cursor-pointer group
                        ${idx === 0 ? "md:col-span-7 md:row-span-2" : ""}
                        ${idx === 1 ? "md:col-span-5" : ""}
                        ${idx === 2 ? "md:col-span-5" : ""}
                        ${idx === 3 ? "md:col-span-7" : ""}
                        ${idx === 4 ? "md:col-span-4" : ""}
                        ${idx === 5 ? "md:col-span-8" : ""}
                        `}
                        style={{ height: "100%" }}
                        onClick={() => setSelectedImage(img)}
                    >
                        <img 
                            src={img.src} 
                            alt={img.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                            <p className="text-white font-medium">{img.title}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Lightbox */}
            {selectedImage && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <motion.img
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        src={selectedImage.src}
                        alt={selectedImage.title}
                        className="max-w-full max-h-[90vh] rounded-lg"
                    />
                    <button 
                        className="absolute top-4 right-4 text-white text-2xl"
                        onClick={() => setSelectedImage(null)}
                    >
                        ×
                    </button>
                </motion.div>
            )}
        </Section>
    );
}

// MAIN HANDLER / INSTRUCTOR SECTION
function MainHandlerSection() {
    const instructor = {
        name: "kinar Rana",
        bio: "With multiple years of Experience in all kinds of Yoga and Aasan practices, Teaching free of cost to students from all over Gandhinagar, With one of the most successful single session class in the Gandhinagar District.",
        image: "https://varenyamfoundation.in/assets/Media/KR.jpeg",
    };

    return (
        <Section id="instructor" className="bg-[#0c1425]">
            <div className="text-center mb-16">
                <span className="text-xs md:text-sm tracking-[0.3em] uppercase font-medium" style={{ color: THEME.sage }}>
                    Guiding Light
                </span>
                <DecorativeLine className="mt-4 mb-6" />
                <h2 className="text-4xl md:text-5xl font-semibold tracking-tight" style={{ 
                    color: THEME.cream,
                    fontFamily: "Georgia, serif"
                }}>
                    Meet Our <span style={{ color: THEME.sage }}>Instructor</span>
                </h2>
            </div>

            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid md:grid-cols-2 gap-10 items-center"
                >
                    <div className="relative overflow-hidden rounded-3xl">
                        <img
                            src={instructor.image}
                            alt={instructor.name}
                            className="w-full h-[600px] object-cover"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

                        <div className="absolute top-6 left-6">
                            <span
                                className="px-4 py-2 rounded-full text-sm"
                                style={{
                                    background: `${THEME.sage}25`,
                                    color: THEME.sage,
                                    backdropFilter: "blur(10px)",
                                }}
                            >
                                {instructor.specialty}
                            </span>
                        </div>
                    </div>

                    <div>
                        <p
                            className="uppercase tracking-[0.3em] text-sm mb-4"
                            style={{ color: THEME.sage }}
                        >
                            Lead Instructor
                        </p>

                        <h3
                            className="text-4xl md:text-5xl font-semibold mb-3"
                            style={{
                                color: THEME.cream,
                                fontFamily: "Georgia, serif",
                            }}
                        >
                            {instructor.name}
                        </h3>

                        <p
                            className="leading-relaxed text-lg"
                            style={{ color: THEME.cream, opacity: 0.75 }}
                        >
                            {instructor.bio}
                        </p>
                    </div>
                </motion.div>
            </div>
            
        </Section>
    );
}

export function YogCornerPage() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            <PageIntro
                eyebrow="Our Wellness Sector"
                title="Yog Corner"
                description="Discover inner peace through ancient practices and modern wellness. Your journey to holistic health begins here."
            />
            <InfoSection />
            <GallerySection />
            <MainHandlerSection />
        </motion.div>
    );
}