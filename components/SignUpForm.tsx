"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import SocialButtons from "./SocialButtons";

export default function SignUpForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function fail(msg: string) {
    setError(msg);
    toast.error(msg);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!name.trim()) return fail("আপনার নাম দিন");
    if (!email.trim()) return fail("ইমেইল দিন");
    if (password.length < 8) return fail("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
    if (password !== confirm) return fail("দুটি পাসওয়ার্ড মিলছে না");

    setLoading(true);
    const { error } = await authClient.signUp.email({
      name: name.trim(),
      email: email.trim(),
      password,
    });
    setLoading(false);

    if (error) return fail(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি");

    toast.success("অ্যাকাউন্ট তৈরি হয়েছে। এবার সাইন ইন করুন");
    router.push("/signin");
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block space-y-1">
          <span className="text-sm font-medium">নাম</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="যেমন: রহিম উদ্দিন"
            className="input w-full"
            autoComplete="name"
          />
        </label>
        <label className="block space-y-1">
          <span className="text-sm font-medium">ইমেইল</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="input w-full"
            autoComplete="email"
          />
        </label>
        <label className="block space-y-1">
          <span className="text-sm font-medium">পাসওয়ার্ড</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="কমপক্ষে ৮ অক্ষর"
            className="input w-full"
            autoComplete="new-password"
          />
        </label>
        <label className="block space-y-1">
          <span className="text-sm font-medium">পাসওয়ার্ড নিশ্চিত করুন</span>
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="আবার লিখুন"
            className="input w-full"
            autoComplete="new-password"
          />
        </label>
        {error && <p className="text-sm text-error">{error}</p>}
        <button type="submit" disabled={loading} className="btn btn-primary w-full">
          {loading ? <span className="loading loading-spinner loading-sm" /> : "অ্যাকাউন্ট তৈরি করুন"}
        </button>
      </form>

      <div className="divider my-2 text-xs">অথবা</div>
      <SocialButtons callbackURL="/" />

      <p className="pt-2 text-center text-sm">
        অ্যাকাউন্ট আছে?{" "}
        <Link href="/signin" className="font-semibold text-primary hover:underline">
          সাইন ইন করুন
        </Link>
      </p>
    </div>
  );
}
