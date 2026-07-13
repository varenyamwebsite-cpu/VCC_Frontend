import { useToken } from "@/hooks/useToken";
import { client } from "../../config";
import { motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: "easeOut" }
};

export function MembershipFormPage() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <section
                className="py-20"
                style={{
                    backgroundColor: "#faebce",
                    fontFamily: "Georgia, serif",
                    minHeight: "100dvh"
                }}
            >
                <div className="max-w-3xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="border border-[#3e2f03]/20 rounded-lg p-8 shadow-sm"
                        style={{ backgroundColor: "#f5e3bf" }}
                    >
                        <MembershipForm />
                    </motion.div>
                </div>
            </section>
        </motion.div>
    );
}

function MembershipForm() {
    const [form, setForm] = useState({
        type: "",
        se_name: "",
        se_phone: "",
        pr_facebook: "",
        pr_instagram: "",
        se_facebook: "",
        se_instagram: "",
        pr_profession: "",
        se_profession: "",
        mode_of_payment: "",
        transaction_details: "",
        reference: "",
        se_dob: "",
        doa: ""
    });
    const token = useToken();
    const navigate = useNavigate();

    function handleChange(e) {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (!token) {
            toast.error("You must be logged in");
            return;
        }

        const payload = {
            ...form,
            type: form.type,
            mode_of_payment: form.mode_of_payment
        };

        // Extra safety for couple
        if (payload.type === "couple" && (!payload.se_name || !payload.se_phone)) {
            toast.error("Secondary member details are required");
            return;
        }

        client.post(`/users/member`, payload, {
            headers: {
                Authorization: token,
                "Content-Type": "application/json",
            },
        })
            .then(() => {
                toast.success("Membership submitted successfully!");
                navigate("/me")
            })
            .catch((err) => {
                console.error(err);

                const message =
                    err?.response?.data?.message ||
                    "Something went wrong. Please try again.";

                toast.error(message);
            });
    }

    const isCouple = form.type === "couple";

    return (
        <>
            <h2 className="text-2xl font-semibold text-[#3e2f03] mb-6">
                Membership Details
            </h2>

            <form className="space-y-5" onSubmit={handleSubmit}>
                {/* MEMBERSHIP TYPE */}
                <motion.div {...fadeInUp}>
                    <label className="block text-sm font-medium text-[#3e2f03]">
                        Membership Type *
                    </label>
                    <select
                        name="type"
                        value={form.type}
                        onChange={handleChange}
                        required
                        className="mt-1 w-full rounded-md border border-[#3e2f03]/30 bg-[#faebce] px-4 py-2"
                    >
                        <option value="">Select</option>
                        <option value="personal">Single</option>
                        <option value="couple">Couple</option>
                    </select>
                </motion.div>

                {/* PRIMARY MEMBER */}
                <motion.div {...fadeInUp}>
                    <label className="block text-sm font-medium text-[#3e2f03]">
                        Primary Facebook
                    </label>
                    <input
                        type="text"
                        name="pr_facebook"
                        value={form.pr_facebook}
                        onChange={handleChange}
                        className="mt-1 w-full rounded-md border border-[#3e2f03]/30 bg-[#faebce] px-4 py-2"
                    />
                </motion.div>

                <motion.div {...fadeInUp}>
                    <label className="block text-sm font-medium text-[#3e2f03]">
                        Primary Instagram
                    </label>
                    <input
                        type="text"
                        name="pr_instagram"
                        value={form.pr_instagram}
                        onChange={handleChange}
                        className="mt-1 w-full rounded-md border border-[#3e2f03]/30 bg-[#faebce] px-4 py-2"
                    />
                </motion.div>

                <motion.div {...fadeInUp}>
                    <label className="block text-sm font-medium text-[#3e2f03]">
                        Primary Profession
                    </label>
                    <input
                        type="text"
                        name="pr_profession"
                        value={form.pr_profession}
                        onChange={handleChange}
                        className="mt-1 w-full rounded-md border border-[#3e2f03]/30 bg-[#faebce] px-4 py-2"
                    />
                </motion.div>

                <motion.div {...fadeInUp}>
                    <label className="block text-sm font-medium text-[#3e2f03]">
                        Date of Anniversary
                    </label>
                    <input
                        type="date"
                        name="doa"
                        value={form.doa}
                        onChange={handleChange}
                        className="mt-1 w-full rounded-md border border-[#3e2f03]/30 bg-[#faebce] px-4 py-2"
                    />
                </motion.div>



                {/* SECONDARY MEMBER — ONLY FOR COUPLE */}
                {isCouple && (
                    <>
                        <motion.hr
                            {...fadeInUp}
                            className="border-[#3e2f03]/30 my-6"
                        />

                        <motion.h3
                            {...fadeInUp}
                            className="text-lg font-semibold text-[#3e2f03]"
                        >
                            Secondary Member Details
                        </motion.h3>

                        <motion.div {...fadeInUp}>
                            <label className="block text-sm font-medium text-[#3e2f03]">
                                Secondary Member Name *
                            </label>
                            <input
                                type="text"
                                name="se_name"
                                value={form.se_name}
                                onChange={handleChange}
                                required={isCouple}
                                className="mt-1 w-full rounded-md border border-[#3e2f03]/30 bg-[#faebce] px-4 py-2"
                            />
                        </motion.div>

                        <motion.div {...fadeInUp}>
                            <label className="block text-sm font-medium text-[#3e2f03]">
                                Secondary Member Phone *
                            </label>
                            <input
                                type="text"
                                name="se_phone"
                                value={form.se_phone}
                                onChange={handleChange}
                                required={isCouple}
                                className="mt-1 w-full rounded-md border border-[#3e2f03]/30 bg-[#faebce] px-4 py-2"
                            />
                        </motion.div>

                        <motion.div {...fadeInUp}>
                            <label className="block text-sm font-medium text-[#3e2f03]">
                                Secondary Facebook
                            </label>
                            <input
                                type="text"
                                name="se_facebook"
                                value={form.se_facebook}
                                onChange={handleChange}
                                className="mt-1 w-full rounded-md border border-[#3e2f03]/30 bg-[#faebce] px-4 py-2"
                            />
                        </motion.div>

                        <motion.div {...fadeInUp}>
                            <label className="block text-sm font-medium text-[#3e2f03]">
                                Secondary Instagram
                            </label>
                            <input
                                type="text"
                                name="se_instagram"
                                value={form.se_instagram}
                                onChange={handleChange}
                                className="mt-1 w-full rounded-md border border-[#3e2f03]/30 bg-[#faebce] px-4 py-2"
                            />
                        </motion.div>

                        <motion.div {...fadeInUp}>
                            <label className="block text-sm font-medium text-[#3e2f03]">
                                Secondary Profession
                            </label>
                            <input
                                type="text"
                                name="se_profession"
                                value={form.se_profession}
                                onChange={handleChange}
                                className="mt-1 w-full rounded-md border border-[#3e2f03]/30 bg-[#faebce] px-4 py-2"
                            />
                        </motion.div>

                        <motion.div {...fadeInUp}>
                            <label className="block text-sm font-medium text-[#3e2f03]">
                                Secondary DOB
                            </label>
                            <input
                                type="date"
                                name="se_dob"
                                value={form.se_dob}
                                onChange={handleChange}
                                className="mt-1 w-full rounded-md border border-[#3e2f03]/30 bg-[#faebce] px-4 py-2"
                            />
                        </motion.div>
                    </>
                )}

                {/* PAYMENT */}
                <motion.div {...fadeInUp}>
                    <label className="block text-sm font-medium text-[#3e2f03]">
                        Mode of Payment *
                    </label>
                    <select
                        name="mode_of_payment"
                        value={form.mode_of_payment}
                        onChange={handleChange}
                        required
                        className="mt-1 w-full rounded-md border border-[#3e2f03]/30 bg-[#faebce] px-4 py-2"
                    >
                        <option value="">Select</option>
                        <option value="cash">Cash</option>
                        <option value="cheque">Cheque</option>
                        <option value="upi_gpay">UPI / GPay</option>
                        <option value="bank_transfer">Bank Transfer</option>
                    </select>
                </motion.div>

                <motion.div {...fadeInUp}>
                    <label className="block text-sm font-medium text-[#3e2f03]">
                        Transaction Details (Mention Cash, Cheque no. or transaction id) *
                    </label>
                    <input
                        type="text"
                        name="transaction_details"
                        value={form.transaction_details}
                        onChange={handleChange}
                        required
                        className="mt-1 w-full rounded-md border border-[#3e2f03]/30 bg-[#faebce] px-4 py-2"
                    />
                </motion.div>

                <motion.div {...fadeInUp}>
                    <label className="block text-sm font-medium text-[#3e2f03]">
                        Reference (If any)
                    </label>
                    <input
                        type="text"
                        name="reference"
                        value={form.reference}
                        onChange={handleChange}
                        className="mt-1 w-full rounded-md border border-[#3e2f03]/30 bg-[#faebce] px-4 py-2"
                    />
                </motion.div>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full mt-6 px-6 py-3 bg-[#3e2f03] text-[#faebce] rounded-md shadow-md"
                >
                    Submit Membership
                </motion.button>
            </form>
        </>
    );
}
