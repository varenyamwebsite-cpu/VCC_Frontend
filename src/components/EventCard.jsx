import { motion } from "framer-motion";

const THEME = {
    // Light backgrounds
    bg: "#faf9f6",           // Warm white
    bgCard: "#ffffff",       // Pure white card
    bgHover: "#fdfcf8",      // Slightly warmer on hover
    
    // Gold accents
    gold: "#c9a227",         // Classic gold
    goldLight: "#d4af37",    // Lighter gold
    goldPale: "#e8d5b7",     // Pale gold for backgrounds
    goldDark: "#a0824d",     // Darker gold for text
    
    // Text
    text: "#2d2a26",         // Warm dark gray (not black)
    textMuted: "#6b6560",    // Muted warm gray
    textLight: "#9a9590",    // Light text
    
    // Borders
    border: "#e8e4df",       // Warm light border
    borderGold: "#d4af37",   // Gold border
};

export function EventCard({
    title,
    date,
    time,
    venue,
    image,
    isMembersOnly = false,
    onRsvp,
    accentColor = THEME.gold,
}) {
    return (
        <motion.div 
            className="relative rounded-xl overflow-hidden transition-all duration-300 w-full group"
            style={{ 
                backgroundColor: THEME.bgCard,
                border: `1px solid ${THEME.border}`,
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            }}
            whileHover={{ 
                y: -6,
                boxShadow: `0 12px 24px -8px ${accentColor}20`,
                borderColor: `${accentColor}40`,
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
        >
            {/* Subtle gold gradient overlay on hover */}
            <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                    background: `linear-gradient(135deg, ${accentColor}05 0%, transparent 50%)`,
                }}
            />

            {/* Image */}
            <div className="h-48 w-full overflow-hidden relative">
                <motion.img
                    src={image}
                    alt={title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div 
                    className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                />
                
                {/* Category tag */}
                <div 
                    className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium"
                    style={{ 
                        background: "rgba(255,255,255,0.95)",
                        color: accentColor,
                        border: `1px solid ${accentColor}30`,
                        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                    }}
                >
                    Event
                </div>
            </div>

            {/* Content */}
            <div className="p-6 relative z-10">
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 
                        className="text-lg font-semibold leading-tight"
                        style={{ 
                            color: THEME.text,
                            fontFamily: "Georgia, serif",
                        }}
                    >
                        {title}
                    </h3>

                    {isMembersOnly && (
                        <span 
                            className="shrink-0 text-xs px-3 py-1 rounded-full"
                            style={{ 
                                background: `${accentColor}15`,
                                color: accentColor,
                                border: `1px solid ${accentColor}30`,
                            }}
                        >
                            Members Only
                        </span>
                    )}
                </div>

                {/* Decorative gold line */}
                <div 
                    className="h-px w-12 mb-4 rounded-full"
                    style={{ background: `linear-gradient(90deg, ${accentColor}, transparent)` }}
                />

                {/* Details */}
                <div className="space-y-2.5 text-sm">
                    <div className="flex items-center gap-3">
                        <svg className="w-4 h-4" style={{ color: accentColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span style={{ color: THEME.textMuted }}>{date}</span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <svg className="w-4 h-4" style={{ color: accentColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span style={{ color: THEME.textMuted }}>{time}</span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <svg className="w-4 h-4" style={{ color: accentColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span style={{ color: THEME.textMuted }}>{venue}</span>
                    </div>
                </div>

                {/* CTA */}
                <motion.button
                    onClick={onRsvp}
                    className="mt-5 w-full px-4 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2"
                    style={{
                        background: "transparent",
                        border: `1px solid ${accentColor}`,
                        color: accentColor,
                    }}
                    whileHover={{ 
                        background: accentColor,
                        color: "#ffffff",
                        boxShadow: `0 4px 12px ${accentColor}30`,
                    }}
                    whileTap={{ scale: 0.98 }}
                >
                    RSVP Now
                    <span>→</span>
                </motion.button>
            </div>
        </motion.div>
    );
}