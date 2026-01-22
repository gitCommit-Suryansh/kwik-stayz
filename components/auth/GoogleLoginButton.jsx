"use client";

import { GoogleLogin } from "@react-oauth/google";
import { useRouter, useSearchParams } from "next/navigation";

export default function GoogleLoginButton() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleSuccess = async (credentialResponse) => {
        try {
            const res = await fetch("/api/auth/google", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    idToken: credentialResponse.credential,
                }),
            });

            const data = await res.json();

            if (!res.ok || !data.success) {
                throw new Error("Authentication failed");
            }

            // ✅ Cookie is already set by backend
            // ✅ Now redirect client
            const redirect = searchParams.get("redirect");
            window.location.href = redirect || "/";
        } catch (err) {
            console.error("Google login error:", err);
            alert("Google sign-in failed. Please try again.");
        }
    };

    return (
        <div className="flex justify-center">
            <GoogleLogin
                onSuccess={handleSuccess}
                onError={() => {
                    alert("Google Sign In Failed");
                }}
                useOneTap={false} // safer for dev
            />
        </div>
    );
}
