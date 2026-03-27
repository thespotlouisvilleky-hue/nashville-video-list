import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Brand Videographers Nashville | Find the Right Brand Videographer',
  description:
    'Find brand videographers in Nashville for businesses, campaigns, interviews, and commercial content. Browse curated options or get matched with the right fit.',
};

export default function BrandPage() {
  return (
    <main className="min-h-screen bg-[#FDF7F0] text-[#1A1A1A] px-6 py-16 md:px-10">
      <div className="max-w-4xl">
        <p className="text-sm uppercase tracking-[0.18em] text-[#7a6d66]">
          Nashville, TN
        </p>

        <h1 className="mt-4 text-4xl md:text-6xl font-semibold leading-tight">
          Brand Videographers Nashville
        </h1>

        <p className="mt-6 text-lg leading-8 text-[#4b4541]">
          Looking for a brand videographer in Nashville? This is a curated
          starting point for businesses that need strong commercial, interview,
          campaign, and social content.
        </p>

        <p className="mt-4 text-base leading-7 text-[#4b4541]">
          Instead of sorting through random options, start here or request a
          match based on your goals, budget, and timeline.
        </p>

        <div className="mt-10 flex gap-4 flex-wrap">
          <a
            href="/#featured"
            className="rounded-full px-6 py-3 text-sm font-medium text-white"
            style={{ backgroundColor: '#E08A3A' }}
          >
            View Featured Videographers
          </a>

          <a
            href="https://form.jotform.com/260835924732058"
            className="rounded-full border border-black/15 px-6 py-3 text-sm"
          >
            Get Matched
          </a>
        </div>
      </div>
    </main>
  );
}