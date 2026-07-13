import { useEffect, useState, useMemo } from "react";
import { PageIntro } from "@/components/PageIntro";
import { motion, AnimatePresence } from "framer-motion";
import { getGalleryCards } from "../utils/getGalleryCards";

const THEME = {
    cyan: "#00A0D9",
    cyanDark: "#0077B6",
    purple: "#480CA8",
    cream: "#FFF9F0",
    creamDark: "#FFE8CC",
    orange: "#F48C06",
    yellow: "#FAA307",
    green: "#2D6A4F",
    red: "#E63946",
};

// Rainbow dots decoration
function RainbowDots({ className = "" }) {
    const colors = [THEME.red, THEME.orange, THEME.yellow, THEME.green, THEME.cyan];
    return (
        <div className={`absolute pointer-events-none ${className}`}>
            {[...Array(4)].map((_, row) => (
                <div key={row} className="flex gap-1 mb-1">
                    {[...Array(6 - row)].map((_, col) => (
                        <motion.div
                            key={col}
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: colors[(row + col) % colors.length] }}
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{ delay: (row + col) * 0.05 }}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}

export function GalleryPage() {
    const [images, setImages] = useState([]);
    const [activeTag, setActiveTag] = useState("All");
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        async function loadGallery() {
            const data = await getGalleryCards();
            setImages(data);
            setLoading(false);
        }
        loadGallery();
    }, []);

    const categories = useMemo(() => {
        const tagSet = new Set();
        images.forEach((img) => {
            img.tags.forEach((tag) => tagSet.add(tag));
        });
        return ["All", ...Array.from(tagSet)];
    }, [images]);

    const filteredImages = activeTag === "All"
        ? images
        : images.filter((img) => img.tags.includes(activeTag));

    const categoryColors = [THEME.cyan, THEME.orange, THEME.purple, THEME.green, THEME.red];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            <PageIntro
                eyebrow="Memories & Moments"
                title="Photo Gallery"
                description="Relive the beautiful moments from our past celebrations and events."
            />

            {loading ? (
                <div className="min-h-[80vh] flex items-center justify-center" style={{ background: THEME.cream }}>
                    <motion.div
                        className="flex flex-col items-center gap-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <motion.div
                            className="w-16 h-16 rounded-full border-4 border-cyan-200 border-t-cyan-500"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        <p className="text-lg font-medium" style={{ color: THEME.purple }}>Loading gallery...</p>
                    </motion.div>
                </div>
            ) : (
                <section className="py-32 relative overflow-hidden" style={{ backgroundColor: THEME.cream }}>
                    <RainbowDots className="top-20 left-10 opacity-60" />
                    <RainbowDots className="bottom-20 right-10 opacity-60 rotate-180" />
                    
                    {/* Background blob */}
                    <motion.div 
                        className="absolute -left-40 top-1/3 w-96 h-96 rounded-full opacity-20 blur-3xl"
                        animate={{
                            background: [
                                `radial-gradient(circle, ${THEME.purple} 0%, transparent 70%)`,
                                `radial-gradient(circle, ${THEME.cyan} 0%, transparent 70%)`,
                                `radial-gradient(circle, ${THEME.purple} 0%, transparent 70%)`,
                            ]
                        }}
                        transition={{ duration: 10, repeat: Infinity }}
                    />

                    <div className="max-w-7xl mx-auto px-6 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center max-w-3xl mx-auto mb-16"
                        >
                            <span 
                                className="inline-block px-4 py-2 rounded-full text-sm font-bold mb-6"
                                style={{ background: THEME.purple + "20", color: THEME.purple }}
                            >
                                VISUAL STORIES
                            </span>
                            <h2 className="text-4xl md:text-6xl font-black mb-6" style={{ color: THEME.purple }}>
                                Our <span style={{ color: THEME.cyan }}>Gallery</span>
                            </h2>
                            <p className="text-xl" style={{ color: THEME.purple, opacity: 0.7 }}>
                                Explore moments from our festivals, performances, and community gatherings.
                            </p>
                        </motion.div>

                        {/* Filter Buttons */}
                        <motion.div 
                            className="flex flex-wrap justify-center gap-3 mb-16"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            {categories.map((cat, idx) => (
                                <motion.button
                                    key={cat}
                                    onClick={() => setActiveTag(cat)}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-6 py-3 rounded-full text-sm font-bold transition-all duration-300"
                                    style={{
                                        background: activeTag === cat 
                                            ? categoryColors[idx % categoryColors.length]
                                            : "white",
                                        color: activeTag === cat ? "white" : THEME.purple,
                                        boxShadow: activeTag === cat 
                                            ? `0 10px 30px ${categoryColors[idx % categoryColors.length]}40`
                                            : "0 4px 15px rgba(0,0,0,0.05)",
                                        border: `2px solid ${activeTag === cat ? "transparent" : THEME.creamDark}`
                                    }}
                                >
                                    {cat}
                                </motion.button>
                            ))}
                        </motion.div>

                        {/* Masonry Grid */}
                        <motion.div
                            layout
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-[250px]"
                        >
                            <AnimatePresence mode="popLayout">
                                {filteredImages.map((image, idx) => {
                                    const isLarge = idx % 5 === 0 || idx % 7 === 0;
                                    const color = categoryColors[idx % categoryColors.length];
                                    
                                    return (
                                        <motion.div
                                            key={image.src}
                                            layout
                                            initial={{ opacity: 0, scale: 0.8, y: 50 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            transition={{ duration: 0.5, delay: idx * 0.05 }}
                                            className={`relative group cursor-pointer overflow-hidden rounded-2xl ${
                                                isLarge ? "sm:col-span-2 sm:row-span-2" : ""
                                            }`}
                                            onClick={() => setSelectedImage(image)}
                                            whileHover={{ y: -5 }}
                                        >
                                            <motion.img
                                                src={image.src}
                                                alt={image.title || image.tags.join(", ")}
                                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            
                                            {/* Gradient overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 via-purple-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                                            
                                            {/* Content */}
                                            <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                                                {image.title && (
                                                    <h3 className="text-white font-bold text-xl mb-2">
                                                        {image.title}
                                                    </h3>
                                                )}
                                                <div className="flex flex-wrap gap-2">
                                                    {image.tags.slice(0, 3).map((tag) => (
                                                        <span
                                                            key={tag}
                                                            className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-sm"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            
                                            {/* Corner accent */}
                                            <motion.div
                                                className="absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                                style={{ background: color }}
                                                whileHover={{ scale: 1.1, rotate: 90 }}
                                            >
                                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                                </svg>
                                            </motion.div>
                                            
                                            {/* Border glow on hover */}
                                            <motion.div
                                                className="absolute inset-0 rounded-2xl pointer-events-none"
                                                style={{
                                                    boxShadow: `inset 0 0 0 3px ${color}`,
                                                    opacity: 0,
                                                }}
                                                whileHover={{ opacity: 1 }}
                                                transition={{ duration: 0.3 }}
                                            />
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>
                        </motion.div>

                        {filteredImages.length === 0 && (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-20"
                            >
                                <div className="text-6xl mb-4">📷</div>
                                <h3 className="text-2xl font-bold mb-2" style={{ color: THEME.purple }}>No images found</h3>
                                <p style={{ color: THEME.purple, opacity: 0.7 }}>Try selecting a different category</p>
                            </motion.div>
                        )}
                    </div>
                </section>
            )}

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: "spring", damping: 25 }}
                            className="relative max-w-5xl w-full max-h-[90vh] overflow-hidden rounded-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img 
                                src={selectedImage.src} 
                                alt={selectedImage.title}
                                className="w-full h-full object-contain max-h-[80vh]"
                            />
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                                {selectedImage.title && (
                                    <h3 className="text-white text-2xl font-bold mb-2">{selectedImage.title}</h3>
                                )}
                                <div className="flex flex-wrap gap-2">
                                    {selectedImage.tags.map((tag) => (
                                        <span key={tag} className="px-3 py-1 rounded-full text-sm bg-white/20 text-white">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}