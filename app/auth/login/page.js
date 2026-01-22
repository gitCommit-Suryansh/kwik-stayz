"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import GoogleLoginButton from "@/components/auth/GoogleLoginButton";
import { Loader2 } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [mode, setMode] = useState("login"); // login | signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isSignup = mode === "signup";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`/api/auth/${isSignup ? "signup" : "login"}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          isSignup ? { name, email, password } : { email, password },
        ),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      // Auth cookie is already set by backend
      const redirect = searchParams.get("redirect");
      window.location.href = redirect || "/";
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm">
      <h1 className="text-xl font-bold mb-1">
        {isSignup ? "Create account" : "Sign in"}
      </h1>
      <p className="text-sm text-gray-500 mb-4">
        {isSignup
          ? "Create an account to continue"
          : "Welcome back, sign in to continue"}
      </p>

      {/* GOOGLE LOGIN */}
      <GoogleLoginButton />

      <div className="flex items-center gap-3 my-4">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-xs text-gray-400">OR</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      {/* EMAIL FORM */}
      <form onSubmit={handleSubmit} className="space-y-3">
        {isSignup && (
          <input
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
          />
        )}

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
        />

        {error && <p className="text-xs text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition disabled:opacity-50"
        >
          {loading ? "Please wait..." : isSignup ? "Create account" : "Sign in"}
        </button>
      </form>

      {/* TOGGLE */}
      <p className="text-xs text-gray-600 mt-4 text-center">
        {isSignup ? "Already have an account?" : "New here?"}{" "}
        <button
          onClick={() => setMode(isSignup ? "login" : "signup")}
          className="text-emerald-600 font-semibold hover:underline"
        >
          {isSignup ? "Sign in" : "Create account"}
        </button>
      </p>

      <p className="text-[10px] text-gray-400 mt-4 text-center">
        By continuing, you agree to our Terms & Privacy Policy.
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Suspense
        fallback={
          <div className="flex items-center justify-center p-12">
            <Loader2 className="animate-spin text-emerald-600" />
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </div>
  );
}
