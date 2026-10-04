

import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import {
  Utensils,
  HeartPulse,
  Home,
  ShoppingBag,
  GraduationCap,
  Briefcase,
  Plane,
  Car,
  Laptop,
  Umbrella,
  PartyPopper,
  Grid3x3,
  MoonStar,
} from "lucide-react";

const categoryCards = [
  {
    icon: <Utensils color="#FF7043" size={36} />, // Red/Orange
    title: "Food & Dining",
    subtitle: "Restaurants • Cafés • Catering",
    slug: "food_dining",
  },
  {
    icon: <HeartPulse color="#A259FF" size={36} />, // Purple
    title: "Health & Wellness",
    subtitle: "Hospitals • Gyms • Salons",
    slug: "health_wellness",
  },
  {
    icon: <Home color="#2196F3" size={36} />, // Blue
    title: "Home & Living",
    subtitle: "Plumbers • Cleaners • Security",
    slug: "home_cleaning",
  },
  {
    icon: <ShoppingBag color="#FF9800" size={36} />, // Orange/Brown
    title: "Shopping & Retail",
    subtitle: "Clothing • Electronics • Markets",
    slug: "shopping_retail",
  },
  {
    icon: <GraduationCap color="#A259FF" size={36} />, // Purple
    title: "Education & Training",
    subtitle: "Schools • Tutors • Colleges",
    slug: "education_training",
  },
  {
    icon: <Briefcase color="#B8860B" size={36} />, // Brown/Gold
    title: "Professional Services",
    subtitle: "Lawyers • Accountants • Real Estate",
    slug: "professional_services",
  },
  {
    icon: <Plane color="#43A047" size={36} />, // Green
    title: "Travel & Tourism",
    subtitle: "Hotels • Tours • Car Hire",
    slug: "travel_tours",
  },
  {
    icon: <Car color="#E53935" size={36} />, // Red
    title: "Automotive",
    subtitle: "Mechanics • Dealers • Car Wash",
    slug: "automotive",
  },
  {
    icon: <Laptop color="#2196F3" size={36} />, // Blue
    title: "Technology",
    subtitle: "IT Support • Web Design • Repair",
    slug: "technology",
  },
  {
    icon: <Umbrella color="#43A047" size={36} />, // Green
    title: "Coastal & Local",
    subtitle: "Beach Resorts • Dhow Cruises • Tours",
    slug: "coastal_local",
  },
  {
    icon: <PartyPopper color="#E53935" size={36} />, // Red
    title: "Entertainment",
    subtitle: "Movies • Polls • Reviews",
    slug: "movies",
  },
  {
    icon: <MoonStar color="#5E35B1" size={36} />,
    title: "Nightlife",
    subtitle: "Clubs • Bars • Events",
    slug: "nightlife",
  },
  {
    icon: <Grid3x3 color="#607D8B" size={36} />, // Neutral
    title: "View all",
    subtitle: "Browse everything",
    slug: "all",
  },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/" className="text-lg font-bold text-blue-600">
            ReviewMimi
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-slate-700 hover:text-blue-600"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Get started
            </Link>
          </div>
        </div>
      </header>

      <section className="flex flex-1 flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-700 px-6 py-20 text-center text-white">
          <h1 className="mb-4 max-w-3xl text-4xl font-extrabold tracking-tight md:text-6xl">
            People trust people. Businesses grow on trust.
          </h1>
          <p className="mb-8 max-w-2xl text-lg text-blue-100 md:text-xl">
            Customers speak. Businesses thrive.
          </p>
        <div className="mb-8 w-full flex justify-center">
          <SearchBar />
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/signup"
            className="rounded-lg bg-white px-6 py-3 font-semibold text-blue-600 shadow hover:bg-blue-50"
          >
            Create free account
          </Link>
          <Link
            href="/login"
            className="rounded-lg border-2 border-white px-6 py-3 font-semibold text-white hover:bg-white/10"
          >
            Sign in
          </Link>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <h2 className="mb-4 text-center text-3xl font-bold">
          Built for every role
        </h2>
        <p className="mb-12 text-center text-lg text-blue-700 font-medium">
          Got a business? List it. Had an experience? Share it.
        </p>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 text-3xl">🏢</div>
            <h3 className="mb-2 text-xl font-semibold">Business owners</h3>
            <p className="text-slate-600">
              Monitor ratings, respond to reviews, and grow with real customer
              insights.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 text-3xl">⭐</div>
            <h3 className="mb-2 text-xl font-semibold">Customers</h3>
            <p className="text-slate-600">
              Discover places, share honest reviews, and track businesses you
              love.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-100 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold">
            Browse by category
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categoryCards.map((cat) => (
              <Link
                key={cat.slug}
                href={
                  cat.slug === "all"
                    ? "/categories"
                    : cat.slug === "movies"
                      ? "/movies"
                      : `/categories/${cat.slug}`
                }
                className="block rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm transition hover:shadow-lg hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300 group"
              >
                <div className="flex flex-col items-center justify-center gap-3">
                  <span className="mb-2 flex items-center justify-center">{cat.icon}</span>
                  <span className="text-xl font-semibold mb-1 text-slate-900">{cat.title}</span>
                  <span className="text-base text-slate-500">{cat.subtitle}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <footer className="mt-auto border-t border-slate-800 bg-slate-950 py-8 text-center text-sm text-slate-400">
        <p className="mb-2 text-base text-slate-200 font-semibold">
          People trust people. Businesses grow on trust.
        </p>
        <p className="mb-4 text-blue-200">
          Join a growing community of customers and businesses building something real together.
        </p>
        <p>
          &copy; {new Date().getFullYear()} ReviewMimi. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
