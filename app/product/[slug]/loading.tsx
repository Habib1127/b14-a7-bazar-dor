export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="skeleton h-5 w-56" />
      <div className="skeleton h-36 w-full rounded-2xl" />
      <div className="grid gap-4 md:grid-cols-3">
        <div className="skeleton h-24 rounded-2xl" />
        <div className="skeleton h-24 rounded-2xl" />
        <div className="skeleton h-24 rounded-2xl" />
      </div>
      <div className="skeleton h-72 w-full rounded-2xl" />
    </div>
  );
}
