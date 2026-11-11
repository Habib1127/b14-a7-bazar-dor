"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import type { Category } from "@/lib/types";

function Avatar({ name, image }: { name: string; image?: string | null }) {
  if (image) {
    return <img src={image} alt={name} className="size-9 rounded-xl object-cover" referrerPolicy="no-referrer" />;
  }
  return (
    <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-content">
      {(name || "U").charAt(0).toUpperCase()}
    </span>
  );
}

export default function NavbarClient({ categories, date }: { categories: Category[]; date: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  async function handleSignOut() {
    await authClient.signOut();
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  }

  return (
    <header className="border-b border-base-300 bg-base-100">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-lg text-primary-content">
            🛒
          </span>
          <span className="leading-tight">
            <span className="block text-xl font-bold">বাজার দর</span>
            <span className="block text-xs opacity-70">{date}</span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          {isPending ? (
            <div className="skeleton h-10 w-28 rounded-lg" />
          ) : session ? (
            <div className="dropdown dropdown-end">
              <button tabIndex={0} className="btn btn-ghost btn-sm sm:btn-md gap-2 px-2">
                <Avatar name={session.user.name} image={session.user.image} />
                <span className="hidden max-w-28 truncate text-sm font-medium sm:inline">
                  {session.user.name}
                </span>
                <span className="text-xs">▾</span>
              </button>
              <ul
                tabIndex={0}
                className="dropdown-content menu z-50 mt-2 w-64 rounded-xl border border-base-300 bg-base-100 p-2 shadow-lg"
              >
                <li className="menu-title px-3 py-2">
                  <span className="block truncate text-sm font-semibold text-base-content">
                    {session.user.name}
                  </span>
                  <span className="block truncate text-xs font-normal">{session.user.email}</span>
                </li>
                <li>
                  <Link href="/profile">👤 আমার প্রোফাইল</Link>
                </li>
                <li>
                  <button onClick={handleSignOut} className="text-error">
                    ↩ সাইন আউট
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link href="/signin" className="btn btn-ghost btn-sm sm:btn-md">
                সাইন ইন
              </Link>
              <Link href="/signup" className="btn btn-primary btn-sm sm:btn-md">
                সাইন আপ
              </Link>
            </>
          )}
        </div>
      </div>

      <nav className="border-t border-base-200">
        <ul className="no-scrollbar mx-auto flex max-w-6xl items-center gap-2 overflow-x-auto px-4 py-2">
          {categories.map((c) => {
            const active = pathname === `/category/${c.slug}`;
            return (
              <li key={c.slug} className="shrink-0">
                <Link
                  href={`/category/${c.slug}`}
                  className={`flex h-8 items-center gap-1.5 rounded-lg px-3 text-xs font-semibold transition ${
                    active ? "bg-primary text-primary-content" : "hover:bg-base-200"
                  }`}
                >
                  <span>{c.emoji}</span>
                  <span>{c.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
