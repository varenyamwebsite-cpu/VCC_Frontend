// Calendar.tsx - Wider, more spacious layout
import { motion } from "framer-motion";

const THEME = {
    bg: "#0f172a",
    bgLight: "#1e293b",
    bgDark: "#020617",
    ochre: "#d4a574",
    ochreLight: "#e8c39e",
    terracotta: "#c17a53",
    cyan: "#06b6d4",
    cream: "#f8fafc",
};

function FloatingParticles() {
    const particles = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        duration: Math.random() * 20 + 15,
        delay: Math.random() * 5,
        color: [THEME.ochre, THEME.cyan][Math.floor(Math.random() * 2)],
    }));

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-xl">
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
                        y: [0, -30, 0],
                        opacity: [0.1, 0.3, 0.1],
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

export function Calendar({
    year,
    month,
    highlightedDates = [],
    accentColor = THEME.ochre,
}) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let d = 1; d <= daysInMonth; d++) days.push(d);

    const isPast = (day) => new Date(year, month, day) < today;
    const isHighlighted = (day) => highlightedDates.includes(day);
    const isToday = (day) => {
        const check = new Date(year, month, day);
        return check.getTime() === today.getTime();
    };

    const monthName = new Date(year, month).toLocaleString("default", {
        month: "long",
        year: "numeric",
    });

    return (
        <motion.div 
            className="relative w-full min-w-[320 px] max-w-[350px] rounded-xl p-3 overflow-hidden border border-slate-700/50"
            style={{ backgroundColor: THEME.bgLight }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
        >
            <FloatingParticles />
            
            <div 
                className="absolute inset-0 opacity-30 pointer-events-none"
                style={{
                    background: `radial-gradient(ellipse at 50% 0%, ${THEME.bg} 0%, transparent 70%)`
                }}
            />

            <div className="relative z-10">
                {/* Header */}
                <div className="text-center mb-3">
                    <motion.h3 
                        className="font-medium text-xl tracking-wide"
                        style={{ color: accentColor || THEME.ochreLight, fontFamily: "Georgia, serif" }}
                    >
                        {monthName}
                    </motion.h3>
                    <div className="flex items-center justify-center gap-3 mt-3">
                        <div className="h-px w-10 bg-gradient-to-r from-transparent to-amber-600/50" />
                        <svg width="16" height="16" viewBox="0 0 24 24" className="text-amber-600/70">
                            <path fill="currentColor" d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
                        </svg>
                        <div className="h-px w-10 bg-gradient-to-l from-transparent to-amber-600/50" />
                    </div>
                </div>

                {/* Weekdays - more spacing */}
                <div 
                    className="grid grid-cols-7 gap-2 text-sm mb-4 text-center uppercase tracking-wider"
                    style={{ color: THEME.cream, opacity: 0.5, fontFamily: "Georgia, serif" }}
                >
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                        <div key={d} className="py-2">{d}</div>
                    ))}
                </div>

                {/* Dates - larger cells, more gap */}
                <div className="grid grid-cols-7 gap-3 text-center">
                    {days.map((day, i) => {
                        if (!day) return <div key={i} className="h-12"></div>;

                        const past = isPast(day);
                        const highlighted = isHighlighted(day);
                        const todayFlag = isToday(day);

                        let classes = "h-12 w-12 flex items-center justify-center rounded-lg transition-all duration-200 mx-auto";
                        let style = {};

                        if (todayFlag) {
                            style = { 
                                backgroundColor: `${THEME.cyan}20`, 
                                color: THEME.cyan,
                                border: `1px solid ${THEME.cyan}40`,
                                fontWeight: "600"
                            };
                        } else if (highlighted && past) {
                            style = { 
                                backgroundColor: `${accentColor}30`, 
                                color: THEME.ochreLight,
                                opacity: 0.7
                            };
                        } else if (highlighted) {
                            style = { 
                                backgroundColor: accentColor, 
                                color: THEME.bgDark,
                                fontWeight: "600",
                                boxShadow: `0 2px 12px ${accentColor}50`
                            };
                        } else if (past) {
                            style = { 
                                color: THEME.cream, 
                                opacity: "0.3" 
                            };
                        } else {
                            style = { 
                                color: THEME.cream,
                                opacity: "0.8"
                            };
                        }

                        return (
                            <motion.div 
                                key={i} 
                                className={classes} 
                                style={style}
                                whileHover={!past && !highlighted ? { 
                                    backgroundColor: `${accentColor}15`,
                                    scale: 1.1
                                } : {}}
                            >
                                <span className="text-base">{day}</span>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Legend - more breathing room */}
                <div className="mt-8 pt-6 border-t border-slate-700/30 flex gap-6 justify-center text-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded" style={{ background: accentColor }} />
                        <span style={{ color: THEME.cream, opacity: 0.6 }}>Event</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded border border-cyan-500/40 bg-cyan-500/10" />
                        <span style={{ color: THEME.cream, opacity: 0.6 }}>Today</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded opacity-50" style={{ background: accentColor }} />
                        <span style={{ color: THEME.cream, opacity: 0.6 }}>Past</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}