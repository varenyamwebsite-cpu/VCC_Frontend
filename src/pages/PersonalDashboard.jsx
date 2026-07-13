import { useToken } from "@/hooks/useToken";
import { client } from "../../config";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function PersonalDashboard() {
    const [personalData, setPersonalData] = useState({
        name: "Loading...",
        age: "",
        phone: "",
        email: "",
        address: "",
        isMember: false,
        membership: null,
    });

    const token = useToken();

    useEffect(() => {
        if (!token) return;

        async function getPersonalData() {
            try {
                const res = await client.get("/users/", {
                    headers: { Authorization: token },
                });

                const dob = new Date(res.data.dob);
                const age = new Date().getFullYear() - dob.getFullYear();

                setPersonalData({
                    name: res.data.name,
                    age,
                    phone: res.data.phone,
                    email: res.data.email,
                    address: res.data.address,
                    isMember: res.data.isMember,
                    membership: res.data.membership,
                });
            } catch (err) {
                console.error(err);
                toast.error("Failed to load dashboard");
                window.location.href = "/";
            }
        }

        getPersonalData();
    }, [token]);

    return (
        <section
            className="min-h-screen py-20"
            style={{ backgroundColor: "#fdfaf3", fontFamily: "Georgia, serif" }}
        >
            <div className="max-w-7xl mx-auto px-6">

                <DashboardHeader />

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                    <aside className="lg:col-span-1">
                        <ProfileCard
                            name={personalData.name}
                            isMember={personalData.isMember}
                        />
                    </aside>

                    <main className="lg:col-span-3 space-y-8">
                        <MembershipDetails
                            membership={personalData.membership}
                            isMember={personalData.isMember}
                        />

                        <PersonalDetails personalData={personalData} />

                        {/* <EventHistory /> */}
                    </main>

                </div>
            </div>
        </section>
    );
}

function DashboardHeader() {
    return (
        <div className="mb-14 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
                <h1 className="text-3xl md:text-4xl font-semibold text-[#3e2f03]">
                    Personal Dashboard
                </h1>
                <p className="mt-2 text-[#3e2f03] opacity-70">
                    Manage your membership and profile.
                </p>
            </div>

            <button
                onClick={() => {
                    localStorage.removeItem("token");
                    window.location.href = "/login";
                }}
                className="px-5 py-2 border border-red-600 text-red-600 rounded-md hover:bg-red-600 hover:text-white transition text-sm"
            >
                Logout
            </button>
        </div>
    );
}

function ProfileCard({ name, isMember }) {
    return (
        <div className="bg-white border border-[#3e2f03]/10 rounded-lg p-6 text-center">
            <div className="w-28 h-28 mx-auto rounded-full bg-neutral-100 mb-4 overflow-hidden">
                <img
                    src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name || "User")}`}
                    alt="Profile"
                    className="w-full h-full object-cover"
                />
            </div>

            <h2 className="text-lg font-medium text-[#3e2f03]">
                {name}
            </h2>

            <p className="text-sm opacity-50">
                {isMember ? "Active Member" : "Not a Member"}
            </p>
        </div>
    );
}

function MembershipDetails({ membership, isMember }) {
    const navigate = useNavigate();

    if (!isMember) {
        return (
            <Card title="Membership Details">
                <button
                    onClick={() => navigate("/membership")}
                    className="w-full px-4 py-2 border border-[#3e2f03] rounded-md hover:bg-[#3e2f03] hover:text-white transition"
                >
                    Get Membership
                </button>
            </Card>
        );
    }

    if (!membership) return null;

    const verified = membership.isVerified;

    return (
        <Card title="Membership Details">
            <ul className="space-y-3 text-sm">
                <li><b>Type:</b> {membership.type}</li>
                <li><b>ID:</b> {membership.membership_id || "Pending"}</li>

                <li>
                    <b>Status:</b>{" "}
                    {verified ? (
                        new Date(membership.expiry) >= new Date()
                            ? <span className="text-green-600">Active</span>
                            : <span className="text-red-600">Expired</span>
                    ) : (
                        <span className="text-yellow-700">Under verification</span>
                    )}
                </li>

                {verified && membership.expiry && (
                    <li><b>Expiry:</b> {new Date(membership.expiry).toLocaleDateString()}</li>
                )}
            </ul>
        </Card>
    );
}

function PersonalDetails({ personalData }) {
    return (
        <Card title="Personal Details">
            <ul className="space-y-3 text-sm">
                <li><b>Name:</b> {personalData.name}</li>
                <li><b>Age:</b> {personalData.age}</li>
                <li><b>Phone:</b> {personalData.phone}</li>
                <li><b>Email:</b> {personalData.email}</li>
                <li><b>Address:</b> {personalData.address}</li>
            </ul>
        </Card>
    );
}

function EventHistory() {
    return (
        <Card title="Event Participation History">
            <table className="w-full text-sm">
                <thead className="bg-neutral-50">
                    <tr>
                        <th className="text-left px-4 py-2">Event</th>
                        <th className="text-left px-4 py-2">Date</th>
                        <th className="text-left px-4 py-2">Status</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td className="px-4 py-2">Annual Cultural Night</td>
                        <td className="px-4 py-2">25 Jan 2025</td>
                        <td className="px-4 py-2 text-green-600">Attended</td>
                    </tr>
                </tbody>
            </table>
        </Card>
    );
}

function Card({ title, children }) {
    return (
        <div className="bg-white border border-[#3e2f03]/10 rounded-lg p-6">
            <h3 className="font-medium mb-4">{title}</h3>
            {children}
        </div>
    );
}