import { PageIntro } from "@/components/PageIntro";
import { client } from "../../config";
import { motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";

const THEME = {
    gold: "#c9a227",
    goldLight: "#d4af37",
    text: "#2d2a26",
    textMuted: "#6b6560",
    white: "#ffffff",
    offWhite: "#fafaf9",
    border: "#e8e4df",
};

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" }
};

export function ContactPage() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <PageIntro
                eyebrow="Get in Touch"
                title="Contact Us"
                description="Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible."
            />

            <section
                className="py-20"
                style={{
                    backgroundColor: THEME.white,
                    fontFamily: "Georgia, serif"
                }}
            >
                <div className="max-w-7xl mx-auto px-6 grid gap-14 lg:grid-cols-2">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <ContactInfo />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <ContactForm />
                    </motion.div>
                </div>
            </section>
        </motion.div>
    );
}

function ContactInfo() {
    return (
        <div
            className="border rounded-lg p-8 h-full shadow-sm"
            style={{
                backgroundColor: THEME.offWhite,
                borderColor: THEME.border
            }}
        >
            <h2
                className="text-2xl font-semibold mb-6"
                style={{ color: THEME.text }}
            >
                Contact Information
            </h2>

            <div className="space-y-6 text-sm" style={{ color: THEME.text }}>
                <div className="group">
                    <h4 className="font-medium" style={{ color: THEME.gold }}>Address</h4>
                    <p className="mt-1 opacity-70 group-hover:opacity-100 transition-opacity">Janadhar Complex, GiftCity, Gandhinagar, Gujarat</p>
                </div>

                <div className="group">
                    <h4 className="font-medium" style={{ color: THEME.gold }}>Phone</h4>
                    <p className="mt-1 opacity-70 group-hover:opacity-100 transition-opacity">+91 97221 99270</p>
                </div>

                <div className="group">
                    <h4 className="font-medium" style={{ color: THEME.gold }}>Email</h4>
                    <p className="mt-1 opacity-70 group-hover:opacity-100 transition-opacity">varenyam.gnr@gmail.com</p>
                </div>

                <div className="group">
                    <h4 className="font-medium" style={{ color: THEME.gold }}>
                        Office Hours
                    </h4>
                    <p className="mt-1 opacity-70 group-hover:opacity-100 transition-opacity">
                        Monday – Saturday: 9:00 AM – 6:00 PM
                        <br />
                        Sunday: Closed
                    </p>
                </div>
            </div>

            {/* Google Map */}
            <motion.div
                whileHover={{ scale: 1.01 }}
                className="mt-8 h-64 w-full overflow-hidden rounded-lg border shadow-inner"
                style={{ borderColor: THEME.border }}
            >
                <iframe
                    title="Club Location"
                    src="https://www.google.com/maps?q=GiftCity%20Gujarat&output=embed"
                    className="w-full h-full border-0 opacity-80 hover:opacity-100 transition-all duration-700"
                    loading="lazy"
                />
            </motion.div>
        </div>
    );
}

function ContactForm() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
    });

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    async function handleContact(e) {
        e.preventDefault();

        try {
            await client.post("/email/contact", form);
            toast.success("Message sent successfully!");
        } catch (err) {
            console.error(err);
            toast.error("Failed to send message");
        }
    }

    return (
        <div
            className="border rounded-lg p-8 shadow-sm"
            style={{
                backgroundColor: THEME.offWhite,
                borderColor: THEME.border
            }}
        >
            <h2
                className="text-2xl font-semibold"
                style={{ color: THEME.text }}
            >
                Send us a Message
            </h2>

            <p
                className="mt-2 text-sm opacity-60"
                style={{ color: THEME.text }}
            >
                Fill out the form below and we'll get back to you shortly.
            </p>

            <form className="mt-8 space-y-5" onSubmit={handleContact}>
                {[
                    { label: "Full Name *", type: "text", name: "name" },
                    { label: "Email Address *", type: "email", name: "email" },
                    { label: "Phone Number", type: "tel", name: "phone" },
                    { label: "Subject *", type: "text", name: "subject" }
                ].map((field, idx) => (
                    <motion.div
                        key={idx}
                        variants={fadeInUp}
                        initial="initial"
                        whileInView="whileInView"
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 * idx }}
                    >
                        <label
                            className="block text-sm font-medium"
                            style={{ color: THEME.text }}
                        >
                            {field.label}
                        </label>
                        <input
                            type={field.type}
                            name={field.name}
                            value={form[field.name]}
                            onChange={handleChange}
                            required={field.label.includes("*")}
                            className="mt-1 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-1 transition-all"
                            style={{
                                borderColor: THEME.border,
                                backgroundColor: THEME.white,
                                color: THEME.text
                            }}
                        />
                    </motion.div>
                ))}

                <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView">
                    <label
                        className="block text-sm font-medium"
                        style={{ color: THEME.text }}
                    >
                        Message *
                    </label>
                    <textarea
                        name="message"
                        rows={4}
                        required
                        value={form.message}
                        onChange={handleChange}
                        className="mt-1 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-1 transition-all"
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
                    className="w-full mt-4 px-6 py-3 rounded-md shadow-md transition-all font-medium"
                    style={{
                        backgroundColor: THEME.gold,
                        color: THEME.white
                    }}
                >
                    Send Message
                </motion.button>
            </form>
        </div>
    );
}