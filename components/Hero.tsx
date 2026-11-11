import Image from "next/image";

export default function Hero({ date }: { date: string }) {
  return (
    <section className="rounded-3xl border border-base-300 bg-base-100 p-6 sm:p-8">
      <div className="flex flex-col-reverse items-center gap-6 md:flex-row md:justify-between">
        <div className="max-w-xl text-center md:text-left">
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            {date}
          </span>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">আজকের বাজারের দাম এক নজরে</h1>
          <p className="mt-3 opacity-80">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়,
            সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          <a href="#সব-পণ্য" className="btn btn-primary mt-5">
            সব পণ্য দেখুন
          </a>
        </div>
        <Image
          src="/bazar-hero.png"
          alt="বাজারের ঝুড়িতে তাজা সবজি"
          width={315}
          height={263}
          priority
          className="h-auto w-56 sm:w-72 md:w-80"
        />
      </div>
    </section>
  );
}
