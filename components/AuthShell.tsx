import Link from "next/link";

export default function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-md space-y-5 py-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="mt-1 text-sm opacity-70">{subtitle}</p>
      </div>
      <div className="rounded-2xl border border-base-300 bg-base-100 p-6">{children}</div>
      <Link href="/" className="block text-center text-sm opacity-70 hover:text-primary">
        ← হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
