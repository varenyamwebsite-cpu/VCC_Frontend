import { useEffect, useState } from "react";
import { Calendar } from "@/components/Calender";
import { EventCard } from "@/components/EventCard";
import { PageIntro } from "@/components/PageIntro";
import { motion } from "framer-motion";
import { getEventCards } from "@/utils/getEventCards";

const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
};

const staggerContainer = {
    initial: {},
    whileInView: { transition: { staggerChildren: 0.1 } },
};

export function EventPage() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchEvents() {
            const res = await getEventCards();
            setEvents(res || []);
            setLoading(false);
        }
        fetchEvents();
    }, []);

    const calendarHighlights = {};

    events.forEach((event) => {
        const d = new Date(event.date);
        const key = `${d.getFullYear()}-${d.getMonth()}`;

        if (!calendarHighlights[key]) {
            calendarHighlights[key] = [];
        }

        calendarHighlights[key].push(d.getDate());
    });

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            <PageIntro
                eyebrow="Mark Your Calendar"
                title="Events & Celebrations"
                description="Join us for unforgettable gatherings, festivals, and cultural experiences."
            />

            {loading ? (
                <div className="text-center py-20 bg-[#f5e3bf]">
                    <h2 className="text-xl font-semibold h-[80dvh]">
                        Loading events...
                    </h2>
                </div>
            ) : (
                <>
                    <CalendarTimeline
                        calendarHighlights={calendarHighlights}
                    />
                    <Events events={events} />
                    <PastEvents />
                </>
            )}
        </motion.div>
    );
}


function CalendarTimeline({ calendarHighlights }) {
    return (
        <section
            className="py-20"
            style={{ backgroundColor: "#ffffff", fontFamily: "Georgia, serif" }}
        >
            <div className="max-w-7xl mx-auto px-6">
                <motion.h2
                    {...fadeInUp}
                    className="text-2xl md:text-3xl font-semibold text-[#3e2f03] text-center mb-14"
                >
                    Upcoming Months
                </motion.h2>

                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="whileInView"
                    viewport={{ once: true }}
                    className="flex flex-wrap justify-center gap-6"
                >
                    {(() => {
                        const now = new Date();

                        const months = [-1, 0, 1].map((offset) => {
                            const d = new Date(
                                now.getFullYear(),
                                now.getMonth() + offset,
                                1
                            );

                            return {
                                year: d.getFullYear(),
                                month: d.getMonth(),
                            };
                        });

                        return months.map(({ year, month }) => {
                            const key = `${year}-${month}`;
                            const highlightedDates =
                                calendarHighlights[key] || [];

                            return (
                                <motion.div
                                    key={key}
                                    variants={fadeInUp}
                                    className="w-[320px]"
                                >
                                    <Calendar
                                        year={year}
                                        month={month}
                                        highlightedDates={highlightedDates}
                                    />
                                </motion.div>
                            );
                        });
                    })()}
                </motion.div>
            </div>
        </section>
    );
}

function Events({ events }) {
    const THEME = {
        blueAccent: "#0ea5e9",
        cream: "#0f172a",
        creamMuted: "#334155",
    };

    const upcomingEvents = events.filter(
        (event) => new Date(event.date) >= new Date()
    );

    return (
        <section
            className="py-20"
            style={{ backgroundColor: "#336a8aff", fontFamily: "Georgia, serif" }}
        >
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    {...fadeInUp}
                    className="text-center mb-14"
                >
                    <span
                        className="inline-block px-4 py-2 rounded-full text-sm font-bold mb-6 border"
                        style={{
                            background: `${THEME.blueAccent}15`,
                            color: THEME.blueAccent,
                            borderColor: `${THEME.blueAccent}30`,
                        }}
                    >
                        GET INVOLVED
                    </span>

                    <h2
                        className="text-4xl md:text-6xl font-black"
                        style={{ color: THEME.cream }}
                    >
                        Event{" "}
                        <span style={{ color: THEME.blueAccent }}>
                            Details
                        </span>
                    </h2>
                </motion.div>

                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="whileInView"
                    viewport={{ once: true }}
                    className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {upcomingEvents.length === 0 ? (
                        <p className="text-center col-span-full text-[#3e2f03] text-lg">
                            No upcoming events
                        </p>
                    ) : (
                        upcomingEvents.map((event) => (
                            <motion.div
                                key={event.id}
                                variants={fadeInUp}
                            >
                                <EventCard
                                    title={event.title}
                                    date={new Date(event.date).toLocaleDateString(
                                        "en-US",
                                        {
                                            month: "long",
                                            day: "numeric",
                                            year: "numeric",
                                        }
                                    )}
                                    time={new Date(event.date).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                    venue={event.venue}
                                    image={event.image}
                                    isMembersOnly={event.isMembersOnly}
                                    onRsvp={() =>
                                        window.open(event.gForm, "_blank")
                                    }
                                />
                            </motion.div>
                        ))
                    )}
                </motion.div>

                {events.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <div className="text-6xl mb-4">📅</div>
                        <h3
                            className="text-2xl font-bold mb-2"
                            style={{ color: THEME.cream }}
                        >
                            No events found
                        </h3>
                        <p style={{ color: THEME.creamMuted }}>
                            Check back soon for upcoming celebrations!
                        </p>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
function PastEvents() {
    const pastEvents = [
        {
            title: "kosheto",
            date: "October 12, 2025",
            image: "/events/navratri.jpg",
            paragraph1:
                "Our Navratri celebration brought together students, alumni, and guests for an evening filled with traditional dance, vibrant music, and cultural performances.",
            paragraph2:
                "The event featured live Garba performances, food stalls, and community activities that created an unforgettable festive atmosphere for everyone involved.",
        },

        {
            title: "Prem Nu Aakhu Aakash",
            date: "January 18, 2026",
            image: "/events/culturalfest.jpg",
            paragraph1:
                "The Annual Cultural Fest showcased creativity through performances, competitions, and exhibitions from talented participants across multiple disciplines.",
            paragraph2:
                "From music and drama to art installations and interactive workshops, the celebration highlighted the spirit of collaboration and artistic expression.",
        },
        
        {
            title: "United States of Pada ni Pol",
            date: "January 18, 2026",
            image: "/events/culturalfest.jpg",
            paragraph1:
                "The Annual Cultural Fest showcased creativity through performances, competitions, and exhibitions from talented participants across multiple disciplines.",
            paragraph2:
                "From music and drama to art installations and interactive workshops, the celebration highlighted the spirit of collaboration and artistic expression.",
        },
        
           {
            title: "Sarhad Na Soor",
            date: "January 18, 2026",
            image: "/events/culturalfest.jpg",
            paragraph1:
                "The Annual Cultural Fest showcased creativity through performances, competitions, and exhibitions from talented participants across multiple disciplines.",
            paragraph2:
                "From music and drama to art installations and interactive workshops, the celebration highlighted the spirit of collaboration and artistic expression.",
        },
        
            {
            title: "Zarmar - A Comedy Show",
            date: "January 18, 2026",
            image: "/events/culturalfest.jpg",
            paragraph1:
                "The Annual Cultural Fest showcased creativity through performances, competitions, and exhibitions from talented participants across multiple disciplines.",
            paragraph2:
                "From music and drama to art installations and interactive workshops, the celebration highlighted the spirit of collaboration and artistic expression.",
        },

            {
            title: "Aadu Ghaas Ubhu Ghaas",
            date: "January 18, 2026",
            image: "/events/culturalfest.jpg",
            paragraph1:
                "The Annual Cultural Fest showcased creativity through performances, competitions, and exhibitions from talented participants across multiple disciplines.",
            paragraph2:
                "From music and drama to art installations and interactive workshops, the celebration highlighted the spirit of collaboration and artistic expression.",
        },

            {
            title: "Dasntan-E-Goi",
            date: "January 18, 2026",
            image: "/events/culturalfest.jpg",
            paragraph1:
                "The Annual Cultural Fest showcased creativity through performances, competitions, and exhibitions from talented participants across multiple disciplines.",
            paragraph2:
                "From music and drama to art installations and interactive workshops, the celebration highlighted the spirit of collaboration and artistic expression.",
        },    

            {
            title: "Male Soor Jo Taro Maro",
            date: "January 18, 2026",
            image: "/events/culturalfest.jpg",
            paragraph1:
                "The Annual Cultural Fest showcased creativity through performances, competitions, and exhibitions from talented participants across multiple disciplines.",
            paragraph2:
                "From music and drama to art installations and interactive workshops, the celebration highlighted the spirit of collaboration and artistic expression.",
        }, 

            {
            title: "Dil No Dariyo",
            date: "January 18, 2026",
            image: "/events/culturalfest.jpg",
            paragraph1:
                "The Annual Cultural Fest showcased creativity through performances, competitions, and exhibitions from talented participants across multiple disciplines.",
            paragraph2:
                "From music and drama to art installations and interactive workshops, the celebration highlighted the spirit of collaboration and artistic expression.",
        }, 
            {
            title: "Drama Competetion",
            date: "March 26, 2026",
            image: "/events/culturalfest.jpg",
            paragraph1:
                "The Annual Cultural Fest showcased creativity through performances, competitions, and exhibitions from talented participants across multiple disciplines.",
            paragraph2:
                "From music and drama to art installations and interactive workshops, the celebration highlighted the spirit of collaboration and artistic expression.",
        }, 
            {
            title: "Saaz Aur Aavaz",
            date: "May 16, 2026",
            image: "/events/culturalfest.jpg",
            paragraph1:
                "The Annual Cultural Fest showcased creativity through performances, competitions, and exhibitions from talented participants across multiple disciplines.",
            paragraph2:
                "From music and drama to art installations and interactive workshops, the celebration highlighted the spirit of collaboration and artistic expression.",
        }, 
    ];

    return (
        <section
            className="py-24"
            style={{
                backgroundColor: "#ffffff",
                fontFamily: "Georgia, serif",
            }}
        >
            <div className="max-w-6xl mx-auto px-6">
                <motion.div
                    {...fadeInUp}
                    className="text-center mb-20"
                >
                    <span
                        className="inline-block px-4 py-2 rounded-full text-sm font-bold mb-6 border"
                        style={{
                            background: "#0ea5e915",
                            color: "#0ea5e9",
                            borderColor: "#0ea5e930",
                        }}
                    >
                        MEMORIES ARCHIVE
                    </span>

                    <h2 className="text-4xl md:text-6xl font-black text-slate-900">
                        Past{" "}
                        <span className="text-sky-500">
                            Events
                        </span>
                    </h2>
                </motion.div>

                <div className="space-y-24">
                    {pastEvents.map((event, index) => (
                        <motion.div
                            key={index}
                            {...fadeInUp}
                            className={`grid lg:grid-cols-2 gap-10 items-center ${
                                index % 2 !== 0 ? "lg:[&>*:first-child]:order-2" : ""
                            }`}
                        >
                            {/* IMAGE */}
                            <div className="overflow-hidden rounded-3xl shadow-2xl">
                                <img
                                    src={event.image}
                                    alt={event.title}
                                    className="w-full h-[400px] object-cover hover:scale-105 transition duration-700"
                                />
                            </div>

                            {/* TEXT */}
                            <div>
                                <p className="text-sky-500 font-bold tracking-widest uppercase mb-3">
                                    {event.date}
                                </p>

                                <h3 className="text-4xl font-black text-slate-900 mb-6">
                                    {event.title}
                                </h3>

                                <div className="space-y-5 text-slate-700 leading-relaxed text-lg">
                                    <p>{event.paragraph1}</p>
                                    <p>{event.paragraph2}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}