import { PageIntro } from "@/components/PageIntro";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const THEME = {
    cyan: "#00A0D9",
    cyanDark: "#0077B6",
    cyanLight: "#90E0EF",
    purple: "#480CA8",
    purpleLight: "#7209B7",
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
            {[...Array(5)].map((_, row) => (
                <div key={row} className="flex gap-1 mb-1">
                    {[...Array(8 - row)].map((_, col) => (
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

export function AboutUsPage() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            <PageIntro
                eyebrow="Our Story"
                title="About Varenyam Cultural Club"
                description="For over two decades, we've been the heart of our community, bringing families together through shared traditions and celebrations."
            />
            <Story />
            <Objectives />
            <CoreCommittee />
        </motion.div>
    );
}

function Story() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });
    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

    return (
        <section ref={ref} className="py-32 relative overflow-hidden" style={{ backgroundColor: THEME.cream }}>
            <RainbowDots className="top-20 left-10 opacity-60" />
            <RainbowDots className="bottom-20 right-10 opacity-60 rotate-180" />

            <motion.div
                style={{ y }}
                className="absolute -right-40 top-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl"
                animate={{
                    background: [
                        `radial-gradient(circle, ${THEME.cyan} 0%, transparent 70%)`,
                        `radial-gradient(circle, ${THEME.orange} 0%, transparent 70%)`,
                        `radial-gradient(circle, ${THEME.cyan} 0%, transparent 70%)`,
                    ]
                }}
                transition={{ duration: 10, repeat: Infinity }}
            />

            <div className="max-w-7xl mx-auto px-6 grid gap-16 lg:grid-cols-2 items-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.span
                        className="inline-block px-4 py-2 rounded-full text-sm font-bold mb-6"
                        style={{ background: THEME.cyan + "20", color: THEME.cyanDark }}
                        whileHover={{ scale: 1.05 }}
                    >
                        EST. 2018
                    </motion.span>

                    <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight" style={{ color: THEME.purple }}>
                        Our Cultural
                        <span className="relative inline-block ml-3">
                            Background
                            <motion.svg
                                className="absolute -bottom-2 left-0 w-full"
                                viewBox="0 0 200 8"
                                fill="none"
                            >
                                <motion.path
                                    d="M2 6C50 2 150 2 198 6"
                                    stroke={THEME.cyan}
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                    initial={{ pathLength: 0 }}
                                    whileInView={{ pathLength: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                />
                            </motion.svg>
                        </span>
                    </h2>

                    <div className="space-y-4 text-lg leading-relaxed" style={{ color: THEME.purple, opacity: 0.85 }}>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            Varenyam Cultural Club is an initiative of <span className="font-bold" style={{ color: THEME.cyan }}>"Varenyam Foundation"</span>, Founded in 2018 with the aim of Cultural and Academic Events, Skill Development, Yoga & Wellness and Corporate Social Responsibility (CSR)
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            The name <span className="font-bold" style={{ color: THEME.cyan }}>"Varenyam"</span> comes
                            from Sanskrit, meaning <span className="italic">"excellent"</span>{" "}
                            or <span className="italic">"worthy of being chosen."</span> It
                            represents our commitment to excellence in everything we do.
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                        >
                            Today, we stand as a beacon of cultural pride, bringing
                            together over <span className="font-bold" style={{ color: THEME.cyan }}>500 families</span>{" "}
                            who share our vision of keeping traditions alive while embracing the future.
                        </motion.p>
                    </div>

                    <motion.button
                        onClick={() =>
                            window.open(
                                "http://varenyamfoundation.in/assets/Varenyam_Journey_and_Brief.pdf",
                                "_blank"
                            )
                        }
                        className="mt-10 px-8 py-4 rounded-full font-bold flex items-center gap-2 group"
                        style={{
                            background: `linear-gradient(135deg, ${THEME.cyan} 0%, ${THEME.cyanDark} 100%)`,
                            color: "white",
                            boxShadow: `0 10px 30px ${THEME.cyan}40`
                        }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Download Profile
                        <motion.span
                            className="inline-block"
                            animate={{ y: [0, -3, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                            ↓
                        </motion.span>
                    </motion.button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                    className="relative"
                >
                    <div
                        className="absolute -inset-4 rounded-3xl -z-10"
                        style={{
                            background: `linear-gradient(135deg, ${THEME.cyan}20, ${THEME.orange}20)`,
                        }}
                    />
                    <div className="overflow-hidden rounded-2xl shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
                        <motion.img
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.6 }}
                            src="http://varenyamfoundation.in/assets/Image1.png"
                            alt="Cultural Celebration"
                            className="w-full h-[500px] object-cover"
                        />
                    </div>

                    <motion.div
                        className="absolute -bottom-6 -left-6 px-6 py-4 rounded-2xl shadow-xl"
                        style={{ background: "white" }}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6, type: "spring" }}
                    >
                        <div className="text-3xl font-black" style={{ color: THEME.cyan }}>10+</div>
                        <div className="text-sm font-medium" style={{ color: THEME.purple }}>Years of Excellence</div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

function Objectives() {
    const THEME = {
        gold: "#c9a227",
        goldLight: "#d4af37",
        text: "#f8fafc",
        textMuted: "#94a3b8",
        bg: "#0f172a",
        bgLight: "#1e293b",
        card: "#334155",
    };

    const objectives = [
        { title: "Preserve Heritage", desc: "Safeguard and promote our rich cultural traditions, customs, and values for future generations.", icon: "🏛️", color: THEME.gold },
        { title: "Build Community", desc: "Create a welcoming space for Art Lovers to enrich their experience with unique innovative programs.", icon: "🤝", color: THEME.goldLight },
        { title: "Promote Arts", desc: "Encourage traditional arts, music, dance, and literature among our members.", icon: "🎭", color: THEME.gold },
        { title: "Celebrate Together", desc: "Organize festivals, events and gatherings that bring our community closer and help each other.", icon: "🎉", color: THEME.goldLight },
    ];

    return (
        <section className="py-32 relative overflow-hidden" style={{ backgroundColor: THEME.bg }}>
            <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, ${THEME.gold} 1px, transparent 0)`,
                backgroundSize: "30px 30px"
            }} />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-20"
                >
                    <span
                        className="inline-block px-4 py-2 rounded-full text-sm font-bold mb-6"
                        style={{ background: `${THEME.gold}20`, color: THEME.gold }}
                    >
                        OUR MISSION
                    </span>
                    <h2 className="text-4xl md:text-6xl font-black mb-6" style={{ color: THEME.text }}>
                        Club <span style={{ color: THEME.gold }}>Objectives</span>
                    </h2>
                    <p className="text-xl opacity-70" style={{ color: THEME.textMuted }}>
                        We are guided by a clear set of objectives that drive everything we do.
                    </p>
                </motion.div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {objectives.map((obj, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 50, rotateX: -15 }}
                            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, type: "spring" }}
                            whileHover={{ y: -10, rotateY: 5 }}
                            className="group relative p-8 rounded-3xl cursor-pointer"
                            style={{
                                background: THEME.card,
                                transformPerspective: 1000,
                                border: `1px solid ${THEME.gold}20`
                            }}
                        >
                            <motion.div
                                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                                style={{
                                    background: `linear-gradient(135deg, ${obj.color}15, ${obj.color}30)`,
                                    transform: "scale(1.05)",
                                }}
                            />

                            <motion.div
                                className="text-5xl mb-6 inline-block"
                                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.2 }}
                                transition={{ duration: 0.5 }}
                            >
                                {obj.icon}
                            </motion.div>

                            <h3 className="text-xl font-bold mb-3" style={{ color: THEME.text }}>
                                {obj.title}
                            </h3>

                            <p className="leading-relaxed" style={{ color: THEME.textMuted }}>
                                {obj.desc}
                            </p>

                            <motion.div
                                className="absolute top-4 right-4 w-8 h-8 rounded-full opacity-30"
                                style={{ background: obj.color }}
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 2, delay: idx * 0.3 }}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function CoreCommittee() {
    const committee = [
        {
            name: "Jigar Rana",
            bio: "Visionary leader with 15+ years in cultural preservation and community building.",
            image: "https://varenyamfoundation.in/assets/Media/jig.JPG",
            color: THEME.cyan
        },
        {
            name: "Tejas Rana",
            bio: "Arts administrator specializing in traditional dance and festival coordination.",
            image: "https://varenyamfoundation.in/assets/Media/Tejas.jpeg",
            color: THEME.orange
        },
        {
            name: "Kinar Rana",
            bio: "Community organizer ensuring smooth operations and member engagement.",
            image: "https://varenyamfoundation.in/assets/Media/KR.jpeg",
            color: THEME.purple
        },
        {
            name: "Digish Dave",
            bio: "Finance professional managing resources for maximum cultural impact.",
            image: "https://varenyamfoundation.in/assets/Media/014ef2f860e8e56b27d4a3267e0a193a.jpg",
            color: THEME.green
        },
        {
            name: "Anita Chawda",
            bio: "Curator of performances and workshops bridging tradition with innovation.",
            image: "https://varenyamfoundation.in/assets/Media/Anita.jpeg",
            color: THEME.red
        },
        {
            name: "Het Patel",
            bio: "Empowering the next generation through cultural education and mentorship.",
            image: "https://varenyamfoundation.in/assets/Media/Het.jpeg",
            color: THEME.yellow
        },
        {
            name: "Sameer Raami",
            bio: "Tech strategist bringing digital innovation to cultural outreach programs.",
            image: "https://varenyamfoundation.in/assets/Media/Raami.jpeg",
            color: THEME.cyanDark
        },
        {
            name: "Sidhharth Bhatt",
            bio: "Event management expert orchestrating seamless cultural experiences.",
            image: "https://varenyamfoundation.in/assets/Media/Sid.jpeg",
            color: THEME.purpleLight
        },
        {
            name: "Mrudang Rana",
            bio: "Volunteer coordinator mobilizing community participation and engagement.",
            image: "https://varenyamfoundation.in/assets/Media/MR.jpeg",
            color: THEME.orange
        },
    ];

    return (
        <section className="py-32 relative overflow-hidden" style={{ backgroundColor: THEME.cream }}>
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-10 blur-3xl"
                    style={{ background: THEME.purple }}
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                    transition={{ duration: 20, repeat: Infinity }}
                />
                <motion.div
                    className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full opacity-10 blur-3xl"
                    style={{ background: THEME.cyan }}
                    animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
                    transition={{ duration: 15, repeat: Infinity }}
                />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-20"
                >
                    <span
                        className="inline-block px-4 py-2 rounded-full text-sm font-bold mb-6"
                        style={{ background: THEME.purple + "20", color: THEME.purple }}
                    >
                        COMMITTEE MEMBER
                    </span>
                    <h2 className="text-4xl md:text-6xl font-black mb-6" style={{ color: THEME.purple }}>
                        Core <span style={{ color: THEME.cyan }}>Committee</span>
                    </h2>
                    <p className="text-xl opacity-70" style={{ color: THEME.purple }}>
                        Meet the dedicated individuals who guide our cultural mission and community vision.
                    </p>
                </motion.div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {committee.map((member, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 50, scale: 0.9 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, type: "spring", bounce: 0.3 }}
                            whileHover={{
                                y: -12,
                                scale: 1.02,
                                transition: { type: "spring", stiffness: 300, damping: 20 }
                            }}
                            className="group relative cursor-pointer"
                        >
                            <div className="overflow-hidden rounded-3xl shadow-lg bg-white transition-shadow duration-300 group-hover:shadow-2xl">
                                <div className="relative h-96 overflow-hidden">
                                    <motion.img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover transition-transform duration-500"
                                        whileHover={{ scale: 1.15 }}
                                        transition={{ duration: 0.4 }}
                                    />

                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-t from-purple-900/95 via-purple-900/50 to-transparent"
                                        initial={{ opacity: 0.7 }}
                                        whileHover={{ opacity: 0.95 }}
                                        transition={{ duration: 0.3 }}
                                    />

                                    <motion.div
                                        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                                        style={{ boxShadow: `inset 0 0 0 3px ${member.color}` }}
                                    />

                                    <div className="absolute inset-0 p-6 flex flex-col justify-end">
                                        <motion.div
                                            initial={{ y: 0 }}
                                            whileHover={{ y: -5 }}
                                            transition={{ type: "spring", stiffness: 400 }}
                                        >
                                            <h3 className="font-bold text-2xl mb-2" style={{ color: "white" }}>
                                                {member.name}
                                            </h3>

                                            <motion.p
                                                className="text-white/80 text-sm leading-relaxed mb-4"
                                                initial={{ opacity: 0.8 }}
                                                whileHover={{ opacity: 1 }}
                                            >
                                                {member.bio}
                                            </motion.p>
                                        </motion.div>

                                        <motion.div
                                            className="h-1 rounded-full mt-4 origin-left"
                                            style={{ background: member.color }}
                                            initial={{ scaleX: 0 }}
                                            whileInView={{ scaleX: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.4 + idx * 0.1, duration: 0.8 }}
                                        />
                                    </div>
                                </div>
                            </div>


                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}