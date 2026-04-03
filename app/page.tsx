'use client';

import type { CSSProperties, ElementType, ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

type VendorCategory = {
  label: string;
  id: string;
};

type FeaturedVendor = {
  name: string;
  category: string;
  role: string;
  desc: string;
  image?: string;
  link: string;
};

type Stat = {
  value: string;
  label: string;
};

type Tier = {
  name: string;
  price: string;
  desc: string;
  points: string[];
};

const vendorCategories: VendorCategory[] = [
  { label: 'Wedding Videographers', id: 'weddings' },
  { label: 'Brand & Business Videographers', id: 'businesses-brands' },
  { label: 'Event Videographers', id: 'events' },
  { label: 'Music Video Videographers', id: 'music-creative' },
  { label: 'Budget-Friendly Videographers', id: 'budget-friendly' },
  { label: 'Premium Videographers', id: 'premium' },
];

const featured: FeaturedVendor[] = [
  {
    name: 'Brandon Rice',
    category: 'weddings',
    role: 'Wedding Videographer',
    desc: 'Real, story-driven wedding films that feel like the day itself — not a highlight of it.',
    image: '/brandon.jpg',
    link: 'https://www.brandonricefilms.com',
  },
  {
    name: 'Matthew Lynn',
    category: 'weddings',
    role: 'Wedding Videographer',
    desc: 'Cinematic, emotion-driven wedding films built around warmth, movement, and the real in-between moments that make the day unforgettable.',
    image: '/matthew.jpg',
    link: 'https://vimeo.com/showcase/11957207?share=copy&fl=sm&fe=fe',
  },
  {
    name: 'Jack Pearl',
    category: 'weddings',
    role: 'Wedding Videographer',
    desc: 'Documentary-minded wedding films shaped with a story-first approach, blending candid coverage with thoughtful structure and emotional pacing.',
    image: '/jack.jpg',
    link: 'https://jackpearlmedia.com/',
  },
  {
    name: 'Chris Cameron',
    category: 'businesses-brands',
    role: 'Brand Videographer',
    desc: 'Cinematographer and producer focused on clean, story-driven video for brands, interviews, and music-driven projects.',
    image: '/chris.jpg',
    link: 'https://www.narrativenashville.com/',
  },
  {
    name: 'Brandon McKay',
    category: 'events',
    role: 'Event Videographer & Photographer',
    desc: 'Clean, intentional storytelling that captures the full event experience. Focused on well-produced events — from corporate gatherings to live performances — with a style built to preserve moments that can’t be recreated, only relived.',
    image: '/brandon-mckay.jpg',
    link: 'https://brandonallancreative.studio/live-events',
  },
  {
    name: 'Ryan Schmidt',
    category: 'events',
    role: 'Event & Music Video Videographer',
    desc: 'Photographer and videographer focused on raw, high-energy visuals for live shows, artists, and brands. Strong fit for music-driven content, event coverage, and story-led visuals that people actually connect with.',
    image: '/ryan.jpg',
    link: 'https://www.ryanschmidt.de/?fbclid=IwY2xjawQw7w1leHRuA2FlbQIxMABicmlkETF2c3lvWVhBVWluWFFlcmxEc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHoXhLfOJ_L5xchvWPhxCI6Wu28WJEveusKMJD8-mZgP5lR-tb252RwrE_WgH_aem_HGOxXQ5J4-VqGcbL7bt3HQ',
  },
  {
    name: 'Colin Nguyen',
    category: 'music-creative',
    role: 'Music Video Director',
    desc: 'Dreamy, colorful, nostalgic music videos and visualizers built for artists who want cinematic, emotionally memorable visuals.',
    image: '/colin.jpg',
    link: 'http://www.colinsvisuals.com',
  },
];

const stats: Stat[] = [
  { value: 'Nashville', label: 'Local focus' },
  { value: 'Featured', label: 'Top recommendations first' },
  { value: 'Simple', label: 'Built to be easy to use' },
];

const verified = [
  'Wedding Videographer',
  'Commercial / Brand Filmmaker',
  'Event Videographer',
  'Music Video Director',
  'Editor / Post-Production',
  'Budget-Friendly Videographer',
  'Podcast / Interview Shooter',
  'Social Media Content Creator',
];

const accentColor = '#E08A3A';
const matchFormLink = 'https://form.jotform.com/260835924732058';
const applyFormLink = 'https://form.jotform.com/260835296439064';

const tiers: Tier[] = [
  {
    name: 'Verified Listing',
    price: '$49/mo',
    desc: 'Simple listing for videographers who want to be found locally.',
    points: ['Listed in category', 'Portfolio or Instagram link', 'Direct contact'],
  },
  {
    name: 'Featured Placement',
    price: '$99/mo',
    desc: 'More visibility when people are actively looking to hire.',
    points: ['Top placement', 'Short written positioning', 'Higher visibility'],
  },
];

const faqs = [
  {
    question: 'How do I find the right videographer in Nashville?',
    answer:
      'Start by narrowing it down by category, budget, and style. If you need a wedding videographer, brand videographer, event videographer, or music video videographer in Nashville, the fastest move is to begin with a curated shortlist instead of digging through random comments.',
  },
  {
    question: 'How much does it cost to hire a videographer in Nashville?',
    answer:
      'Pricing depends on the type of project, timeline, and experience level. Wedding videographers, event videographers, and brand videographers in Nashville can vary widely, which is why having a clear project type and budget range helps narrow the right fit faster.',
  },
  {
    question: 'Can I get matched with a Nashville videographer instead of browsing?',
    answer:
      'Yes. If you do not want to sort through options yourself, you can submit a quick match request and get pointed toward a few Nashville videographers that fit your project, budget, and timeline.',
  },
  {
    question: 'Do you have Nashville wedding videographers, brand videographers, and second shooters?',
    answer:
      'Yes. The list includes wedding videographers, brand and business videographers, event videographers, music video videographers, and flexible collaborators for second shooter or support roles in Nashville.',
  },
];

function usePrefersReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return reducedMotion;
}

function Reveal({
  children,
  className,
  delay = 0,
  as,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
}) {
  const Tag = as || 'div';
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || reducedMotion) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.22,
        rootMargin: '0px 0px -8% 0px',
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [reducedMotion]);

  const style: CSSProperties = reducedMotion
    ? {}
    : {
        opacity: visible ? 1 : 0,
        transform: visible ? 'translate3d(0, 0, 0)' : 'translate3d(0, 22px, 0)',
        transition: `opacity 1200ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform 1200ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
        willChange: 'opacity, transform',
      };

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}

function Parallax({
  children,
  className,
  speed = 0.03,
  as,
  ...props
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
  as?: ElementType;
} & Record<string, unknown>) {
  const Tag = as || 'div';
  const ref = useRef<HTMLElement | null>(null);
  const [offset, setOffset] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || reducedMotion) {
      setOffset(0);
      return;
    }

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const viewportCenter = window.innerHeight * 0.5;
      const elementCenter = rect.top + rect.height * 0.5;
      const distance = elementCenter - viewportCenter;
      setOffset(distance * -speed);
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [reducedMotion, speed]);

  const style: CSSProperties = reducedMotion
    ? {}
    : {
        transform: `translate3d(0, ${offset.toFixed(2)}px, 0)`,
        transition: 'transform 220ms cubic-bezier(0.22, 1, 0.36, 1)',
        willChange: 'transform',
      };

  return (
    <Tag ref={ref} className={className} style={style} {...props}>
      {children}
    </Tag>
  );
}

function ExternalLink({
  href,
  children,
  className,
  style,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={className}
      style={style}
    >
      {children}
    </a>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-clip bg-[#FDF7F0] text-[#1A1A1A]">
      <header className="sticky top-0 z-20 border-b border-black/10 bg-[#FDF7F0]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10">
          <a href="#top" className="text-sm font-semibold uppercase tracking-[0.08em]">
            Nashville Video List
          </a>
          <nav className="hidden items-center gap-6 text-sm text-[#4b4541] md:flex">
            <a href="#categories" className="transition hover:text-black">
              Categories
            </a>
            <a href="#featured" className="transition hover:text-black">
              Featured
            </a>
            <a href="#verified" className="transition hover:text-black">
              Verified
            </a>
            <a href="#match" className="transition hover:text-black">
              Match
            </a>
          </nav>
        </div>
      </header>

      <section id="top" className="mx-auto max-w-6xl px-6 py-12 md:px-10 md:py-16 lg:py-18">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.96fr)_300px] lg:gap-10 xl:grid-cols-[minmax(0,1fr)_320px]">
          <Reveal className="max-w-[760px]" delay={40}>
            <Parallax speed={0.016}>
              <p className="mb-4 text-sm uppercase tracking-[0.2em] text-[#7a6d66]">Nashville, TN</p>
              <h1 className="max-w-[760px] font-semibold tracking-[-0.035em] text-[#1A1A1A]">
                <span className="block text-[1.25rem] uppercase tracking-[0.16em] text-[#7a6d66] md:text-[1.45rem]">
                  Nashville Videographers
                </span>
                <span className="mt-3 block text-[3.05rem] leading-[0.96] md:text-[4.6rem] lg:text-[5.2rem] xl:text-[5.7rem]">
                  Find the Right Videographer
                </span>
                <span className="mt-3 block text-[2.2rem] leading-[0.98] md:text-[3.25rem] lg:text-[3.8rem] xl:text-[4.1rem]">
                  in Nashville
                </span>
              </h1>
              <p className="mt-8 max-w-[640px] text-[1.02rem] leading-8 text-[#4b4541] md:text-[1.16rem] md:leading-[1.95rem]">
                Find and hire a videographer in Nashville for weddings, brands, events, and more — without digging through comments, guessing, or wasting time.
              </p>
              <p className="mt-5 max-w-[610px] text-[0.98rem] leading-8 text-[#4b4541] md:text-[1.02rem]">
                This is a curated list of Nashville videographers who are active, reliable, and consistently doing strong work across weddings, brands, events, and creative projects.
              </p>
              <p className="mt-7 max-w-[610px] text-[0.94rem] leading-7 text-[#4b4541]">
                No endless scrolling. No random guessing. Just a cleaner way to find the right fit faster.
              </p>
              <div className="mt-10 flex flex-wrap gap-4 lg:mt-11">
                <a
                  href="#categories"
                  className="rounded-full px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:brightness-105 hover:shadow-md"
                  style={{ backgroundColor: accentColor }}
                >
                  Find My Videographer
                </a>
                <ExternalLink
                  href={matchFormLink}
                  className="rounded-full border border-black/15 px-6 py-3 text-sm transition hover:bg-black/5"
                >
                  Browse Options
                </ExternalLink>
              </div>
            </Parallax>
          </Reveal>

          <div className="grid gap-4 self-start pt-2 lg:pt-6">
            {stats.map((item, index) => (
              <Reveal key={item.label} delay={180 + index * 90}>
                <Parallax speed={0.024 + index * 0.006}>
                  <div className="rounded-[1.9rem] border border-black/10 bg-white/75 px-6 py-5 shadow-sm backdrop-blur-[2px]">
                    <p className="text-[2rem] font-semibold tracking-tight">{item.value}</p>
                    <p className="mt-2 text-[0.92rem] text-[#4b4541]">{item.label}</p>
                  </div>
                </Parallax>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10 md:px-10 md:py-12">
        <Reveal className="max-w-3xl" delay={60}>
          <p className="text-sm uppercase tracking-[0.18em] text-[#7a6d66]">Why this exists</p>
          <p className="mt-4 text-lg leading-8 text-[#1A1A1A]">
            I run one of the largest videographer communities in Nashville and see work requests come through daily. This site exists to make hiring a videographer in Nashville easier — giving businesses, couples, and creatives a cleaner place to start.
          </p>
        </Reveal>
      </section>

      <Parallax as="section" speed={0.012} className="border-y border-black/10 bg-[#F7F1EA]">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-14 md:grid-cols-3 md:px-10">
          <Reveal delay={40}>
            <p className="text-sm uppercase tracking-[0.18em] text-[#7a6d66]">How this works</p>
            <h2 className="mt-3 text-2xl font-semibold">Straightforward</h2>
          </Reveal>
          <Reveal delay={150} className="space-y-3 leading-7 text-[#4b4541]">
            <p>Browse by category</p>
            <p>Check featured options first</p>
            <p>Reach out directly or request a match</p>
          </Reveal>
          <Reveal delay={260} className="leading-7 text-[#4b4541]">
            <p>
              This is built to make hiring easier for Nashville businesses, couples, and creatives — without turning the site into a giant directory.
            </p>
          </Reveal>
        </div>
      </Parallax>

      <section id="categories" className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-20">
  <Reveal delay={30}>
    <p className="text-sm uppercase tracking-[0.18em] text-[#7a6d66]">Start here</p>
    <h2 className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight md:text-5xl">
      What are you trying to film?
    </h2>
    <p className="mt-4 max-w-2xl text-base leading-7 text-[#4b4541] md:text-lg md:leading-8">
      Pick the path that feels closest. This is the fastest way to find the right videographer in Nashville without getting lost in a giant directory.
    </p>
  </Reveal>

  <div className="mt-10 grid gap-5 lg:grid-cols-2">
    {[
      {
        eyebrow: 'Weddings',
        title: 'Capture the full day, not just the highlights',
        desc: 'For couples who want emotion, pacing, and the real in-between moments preserved beautifully.',
        href: '/wedding-videographers-nashville',
      },
      {
        eyebrow: 'Business / Brand',
        title: 'Make your business look as strong online as it feels in person',
        desc: 'For founders, teams, and local businesses who need brand films, interviews, and commercial content that actually connects.',
        href: '/brand-videographers-nashville',
      },
      {
        eyebrow: 'Events',
        title: 'Document the energy, not just the schedule',
        desc: 'For live events, launches, performances, and gatherings that need to feel alive when people watch them back.',
        href: '/event-videographers-nashville',
      },
      {
        eyebrow: 'Music / Creative',
        title: 'Visuals that actually match the feeling of the work',
        desc: 'For artists and creative projects that need atmosphere, style, and a point of view — not just coverage.',
        href: '#music-creative',
      },
    ].map((item, index) => (
      <Reveal key={item.title} delay={90 + index * 50}>
        <Parallax speed={0.014 + (index % 2) * 0.004}>
          <Link
            href={item.href}
            className="group flex min-h-[260px] flex-col justify-between rounded-[2rem] border border-black/10 bg-[#EFE7DE] p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-black/20 hover:bg-[#F3ECE4] hover:shadow-md md:p-9"
          >
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-[#7a6d66]">
                {item.eyebrow}
              </p>
              <h3 className="mt-5 max-w-[18ch] text-2xl font-semibold leading-tight tracking-tight md:text-[2rem]">
                {item.title}
              </h3>
              <p className="mt-5 max-w-[52ch] text-sm leading-7 text-[#4b4541] md:text-base md:leading-8">
                {item.desc}
              </p>
            </div>

            <div className="mt-8 flex items-center justify-between text-sm font-medium text-[#1A1A1A]">
              <span>Explore this path</span>
              <span className="transition duration-300 group-hover:translate-x-1">→</span>
            </div>
          </Link>
        </Parallax>
      </Reveal>
    ))}
  </div>
</section>

      <Parallax as="section" speed={0.01} className="border-t border-black/10 bg-[#EFE7DE]">
        <div id="featured" className="mx-auto max-w-6xl px-6 py-16 md:px-10">
          <Reveal delay={30}>
            <p className="text-sm uppercase tracking-[0.18em] text-[#7a6d66]">Featured</p>
            <h2 className="mt-2 text-3xl font-semibold">Featured Nashville videographers</h2>
            <p className="mt-2 text-sm text-[#4b4541]">Handpicked. Not random.</p>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#4b4541]">
              Start here. These are the strongest videographers to consider first.
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-[#4b4541]">
              Pick one that feels right — or request a match below.
            </p>
          </Reveal>

          <div className="mt-10 space-y-12">
            {vendorCategories.map((category, groupIndex) => {
              const vendors = featured.filter((item) => item.category === category.id);
              if (!vendors.length) return null;

              return (
                <Reveal key={category.id} delay={120 + groupIndex * 40}>
                  <div id={category.id} className="scroll-mt-28">
                    <p className="text-sm uppercase tracking-[0.18em] text-[#7a6d66]">{category.label}</p>
                    <div className="mt-4 flex flex-wrap justify-center gap-6">
                      {vendors.map((item, index) => (
                        <Parallax key={item.name + item.role} speed={0.018 + index * 0.004}>
                          <div className="w-[320px] flex min-h-[520px] flex-col rounded-3xl border border-black/10 bg-[#FDF7F0] p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                            {item.image && (
                              <Image
                                src={item.image}
                                alt={item.name}
                                width={400}
                                height={300}
                                className="mb-4 h-48 w-full rounded-2xl object-cover"
                              />
                            )}
                            <p className="text-sm uppercase tracking-[0.14em] text-[#7a6d66]">{item.role}</p>
                            <h3 className="mt-2 text-xl font-semibold">{item.name}</h3>
                            <p className="mt-3 flex-1 text-sm leading-6 text-[#4b4541]">{item.desc}</p>
                            <ExternalLink
                              href={item.link}
                              className="mt-6 inline-block text-sm font-medium underline underline-offset-4"
                            >
                              View Work →
                            </ExternalLink>
                          </div>
                        </Parallax>
                      ))}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Parallax>

      <section id="verified" className="mx-auto max-w-6xl px-6 py-14 md:px-10 md:py-16">
        <Reveal delay={30}>
          <p className="text-sm uppercase tracking-[0.18em] text-[#7a6d66]">More options</p>
          <h2 className="mt-2 text-3xl font-semibold">Verified listings</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[#4b4541]">
            A broader set of options if you want to explore more — still organized, still local, just less filtered than featured.
          </p>
        </Reveal>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {verified.map((item, index) => (
            <Reveal key={item} delay={90 + index * 40}>
              <div className="flex justify-between rounded-xl border border-black/10 bg-white/70 px-5 py-4 transition hover:border-black/20 hover:bg-white">
                <span>{item}</span>
                <span>→</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>



      <section id="match" className="border-t border-black/10 bg-[#F7F1EA]">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-2 md:px-10">
          <Reveal delay={50}>
            <p className="text-sm uppercase tracking-[0.18em] text-[#7a6d66]">Need help?</p>
            <h2 className="mt-2 text-3xl font-semibold">Not sure who to choose? I’ll match you with the right videographer.</h2>
            <p className="mt-4 max-w-xl leading-7 text-[#4b4541]">
              Tell me what you need, your budget, and your timeline. I’ll point you toward a few Nashville videographers that make sense.
            </p>
          </Reveal>

          <Reveal delay={170}>
            <Parallax speed={0.024}>
              <div className="rounded-3xl border border-black/10 bg-[#FDF7F0] p-6 shadow-sm">
                <p className="text-sm uppercase tracking-[0.14em] text-[#7a6d66]">Quick Match Request</p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight">Find My Videographer (1 minute)</h3>
                <p className="mt-4 max-w-md text-sm leading-6 text-[#4b4541]">
                  The form takes about a minute and asks for your project type, budget, timeline, and a short description of what you need filmed.
                </p>

                <div className="mt-6 rounded-2xl border border-black/10 bg-white/60 p-4">
                  <p className="text-sm font-medium text-[#1A1A1A]">The form covers:</p>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-[#4b4541]">
                    <li>• Project type</li>
                    <li>• Budget range</li>
                    <li>• Timeline</li>
                    <li>• Short project description</li>
                  </ul>
                </div>

                <ExternalLink
                  href={matchFormLink}
                  className="mt-6 inline-block rounded-full px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:brightness-105 hover:shadow-md"
                  style={{ backgroundColor: accentColor } as CSSProperties}
                >
                  Get Matched (1 minute)
                </ExternalLink>

                <p className="mt-4 text-xs leading-5 text-[#7a6d66]">
                  No searching. No guessing. I’ll personally point you to 2–3 strong options.
                </p>
              </div>
            </Parallax>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14 md:px-10 md:py-16">
        <Reveal delay={30}>
          <p className="text-sm uppercase tracking-[0.18em] text-[#7a6d66]">FAQ</p>
          <h2 className="mt-2 text-3xl font-semibold">Questions about hiring a videographer in Nashville</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[#4b4541]">
            If you are trying to hire a videographer in Nashville, these are the most common questions people run into before choosing the right fit.
          </p>
        </Reveal>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {faqs.map((item, index) => (
            <Reveal key={item.question} delay={90 + index * 50}>
              <div className="rounded-2xl border border-black/10 bg-white/70 p-5 shadow-sm">
                <h3 className="text-lg font-semibold">{item.question}</h3>
                <p className="mt-3 text-sm leading-6 text-[#4b4541]">{item.answer}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14 md:px-10 md:py-16">
        <Reveal delay={40}>
          <p className="text-sm uppercase tracking-[0.18em] text-[#7a6d66]">For videographers</p>
          <h2 className="mt-2 text-3xl font-semibold">Apply to be listed</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[#4b4541]">
            Start simple. These are straightforward monthly placements for videographers who want stronger local visibility.
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-[#4b4541]">
            This is designed for videographers who want consistent visibility in Nashville — not just more posts, but better positioning.
          </p>
        </Reveal>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {tiers.map((tier, index) => (
            <Reveal key={tier.name} delay={120 + index * 90}>
              <Parallax speed={0.02 + index * 0.008}>
                <div className="rounded-3xl border border-black/10 bg-white/70 p-6 shadow-sm">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-lg font-semibold">{tier.name}</h3>
                    <p>{tier.price}</p>
                  </div>
                  <p className="mt-2 text-sm text-[#4b4541]">{tier.desc}</p>
                  <div className="mt-4 space-y-1 text-sm">
                    {tier.points.map((p) => (
                      <p key={p}>• {p}</p>
                    ))}
                  </div>
                  <ExternalLink
                    href={applyFormLink}
                    className="mt-6 inline-block rounded-full border border-black/10 px-4 py-2 text-sm transition hover:bg-black/5"
                  >
                    Apply
                  </ExternalLink>
                </div>
              </Parallax>
            </Reveal>
          ))}
        </div>
      </section>

      <Parallax as="section" speed={0.01} className="border-t border-black/10 bg-[#EFE7DE]">
        <div className="mx-auto max-w-6xl px-6 py-16 text-center md:px-10">
          <Reveal delay={40}>
            <p className="text-sm uppercase tracking-[0.18em] text-[#7a6d66]">Need a place to start?</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              Start with featured — or get matched if you want help choosing.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#4b4541]">
              The goal here is simple: make it easier for Nashville businesses and creatives to find good people faster.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#featured"
                className="rounded-full px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:brightness-105 hover:shadow-md"
                style={{ backgroundColor: accentColor }}
              >
                View Featured
              </a>
              <ExternalLink
                href={matchFormLink}
                className="rounded-full border border-black/15 px-6 py-3 text-sm transition hover:bg-black/5"
              >
                Request a Match
              </ExternalLink>
            </div>
          </Reveal>
        </div>
      </Parallax>

      <footer className="py-10 text-center text-sm text-[#7a6d66]">
        <Reveal as="div" delay={20}>
          Built for Nashville. Clean, useful, and easy to use.
        </Reveal>
      </footer>
    </main>
  );
}