import Link from "next/link";
import SignOutButton from "@/components/SignOutButton";
import { requireSession } from "@/lib/session";

export default async function ProfilePage() {
  const session = await requireSession("/profile");
  const { user } = session;

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">আমার প্রোফাইল</h1>
        <p className="text-sm opacity-70">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
      </div>

      <div className="flex flex-col items-start gap-4 rounded-2xl border border-base-300 bg-base-100 p-5 sm:flex-row sm:items-center">
        {user.image ? (
          <img
            src={user.image}
            alt={user.name}
            className="size-20 rounded-2xl object-cover"
            referrerPolicy="no-referrer"
          />
        ) : (
          <span className="flex size-20 items-center justify-center rounded-2xl bg-primary text-3xl font-bold text-primary-content">
            {user.name.charAt(0).toUpperCase()}
          </span>
        )}
        <div className="flex-1">
          <p className="text-xl font-semibold">{user.name}</p>
          <p className="opacity-70">{user.email}</p>
        </div>
        <SignOutButton />
      </div>

      <div className="space-y-4 rounded-2xl border border-base-300 bg-base-100 p-5">
        <h2 className="text-lg font-semibold">তথ্য</h2>
        <dl className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl bg-base-200 p-3">
            <dt className="text-xs opacity-70">নাম</dt>
            <dd className="font-medium">{user.name}</dd>
          </div>
          <div className="rounded-xl bg-base-200 p-3">
            <dt className="text-xs opacity-70">ইমেইল</dt>
            <dd className="font-medium break-all">{user.email}</dd>
          </div>
        </dl>
        <Link href="/profile/update" className="btn btn-primary w-full">
          আপডেট
        </Link>
      </div>
    </div>
  );
}
