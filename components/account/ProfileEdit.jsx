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
        <div className="bg-white rounded-xl shadow-sm border p-6 h-fit sticky top-24">
            <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mb-4 overflow-hidden border-4 border-white shadow-md relative">
                    {avatarSrc ? (
                        <img src={avatarSrc} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                        <span className="text-4xl font-bold text-blue-600">{initial}</span>
                    )}
                    {/* Online indicator or badges could go here */}
                </div>

                {!isEditing ? (
                    <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                ) : (
                    <div className="w-full">
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 text-left">Full Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-center font-medium"
                        />
                    </div>
                )}

                <p className="text-sm text-gray-500 mt-1">{user.email}</p>

                {/* Verification Badge */}
                <div className="mt-3 flex items-center text-xs font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-100">
                    <Shield size={12} className="mr-1 fill-green-600" />
                    Verified Account
                </div>
            </div>

            <div className="space-y-4">
                {!isEditing ? (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="w-full py-2.5 rounded-lg bg-gray-900 text-white font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                    >
                        Edit Profile
                    </button>
                ) : (
                    <div className="flex gap-2">
                        <button
                            onClick={() => setIsEditing(false)}
                            disabled={loading}
                            className="flex-1 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={loading}
                            className="flex-1 py-2.5 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                        >
                            {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                            Save
                        </button>
                    </div>
                )}
            </div>

            <div className="mt-8 pt-6 border-t space-y-3">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 flex items-center gap-2">
                        <User size={16} /> Member Since
                    </span>
                    <span className="font-medium text-gray-900">
                        {new Date(user.createdAt || Date.now()).toLocaleDateString("en-IN", { month: 'short', year: 'numeric' })}
                    </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 flex items-center gap-2">
                        <Shield size={16} /> Login via
                    </span>
                    <span className="font-medium text-gray-900 capitalize">
                        {user.provider || "Email"}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ProfileEdit;
