import React, { useState } from "react";
import { User, Mail, Shield, Save, Loader2 } from "lucide-react";

const ProfileEdit = ({ user, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(user?.name || "");
    const [loading, setLoading] = useState(false);

    // Determine avatar source: Google avatar or fallback initial
    const avatarSrc = user?.avatar;
    const initial = user?.name ? user.name.charAt(0).toUpperCase() : "U";

    const handleSave = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/account/profile", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name }),
            });

            if (res.ok) {
                const data = await res.json();
                onUpdate(data.user); // Update parent state
                setIsEditing(false);
            } else {
                console.error("Failed to update profile");
                // Optional: Show toast error
            }
        } catch (error) {
            console.error("Error updating profile", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full">
            <div className="flex flex-col items-center mb-6">
                <div className="w-28 h-28 rounded-full bg-red-50 flex items-center justify-center mb-4 overflow-hidden border-4 border-white shadow-xl relative">
                    {avatarSrc ? (
                        <img src={avatarSrc} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                        <span className="text-4xl font-bold text-red-600">{initial}</span>
                    )}
                </div>

                {!isEditing ? (
                    <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                ) : (
                    <div className="w-full max-w-xs">
                        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1 text-center">Update Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 border-b-2 border-red-200 focus:border-red-600 outline-none text-center font-bold text-xl bg-transparent transition-colors"
                        />
                    </div>
                )}

                <p className="text-sm font-medium text-gray-400 mt-1">{user.email}</p>

                {/* Verification Badge */}
                <div className="mt-4 flex items-center text-xs font-bold text-green-700 bg-green-50 px-3 py-1 rounded-full border border-green-200">
                    <Shield size={12} className="mr-1 fill-green-700" />
                    Verified Traveler
                </div>
            </div>

            <div className="w-full max-w-xs mx-auto space-y-3">
                {!isEditing ? (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="w-full py-3 rounded-full bg-gray-900 text-white font-bold hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                    >
                        Edit Profile
                    </button>
                ) : (
                    <div className="flex gap-3">
                        <button
                            onClick={() => setIsEditing(false)}
                            disabled={loading}
                            className="flex-1 py-3 rounded-full border border-gray-300 text-gray-600 font-bold hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={loading}
                            className="flex-1 py-3 rounded-full bg-red-600 text-white font-bold hover:bg-red-700 hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                        >
                            {loading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                            Save
                        </button>
                    </div>
                )}
            </div>

            <div className="mt-10 pt-8 border-t border-gray-100 grid grid-cols-2 gap-4 text-center">
                <div>
                    <p className="text-xs text-gray-400 uppercase font-bold tracking-wide mb-1">Joined</p>
                    <p className="text-sm font-bold text-gray-900">
                        {new Date(user.createdAt || Date.now()).toLocaleDateString("en-IN", { month: 'short', year: 'numeric' })}
                    </p>
                </div>
                <div>
                    <p className="text-xs text-gray-400 uppercase font-bold tracking-wide mb-1">Method</p>
                    <p className="text-sm font-bold text-gray-900 capitalize">
                        {user.provider || "Email"}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProfileEdit;
