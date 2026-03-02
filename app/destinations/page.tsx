"use client"

import Image from "next/image"
import Link from "next/link"
import { useRef, useState } from "react"
import { MapPin, Star, ArrowRight, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useInView } from "@/hooks/use-in-view"

export const metadata = { title: "Destinations | Impala Travel" }

const destinations = [
  {
    slug: "victoria-falls",
    name: "Victoria Falls",
    country: "Zimbabwe",
    image: "/images/victoria-falls.jpg",
    rating: 4.9,
    description: "One of the Seven Natural Wonders of the World, Victoria Falls is the largest curtain of falling water on earth.",
    tags: ["Adventure", "Nature", "UNESCO"],
    startingPrice: 299,
  },
  {
    slug: "kariba",
    name: "Lake Kariba",
    country: "Zimbabwe",
    image: "/images/kariba.jpg",
    rating: 4.7,
    description: "A vast man-made lake offering incredible houseboat safaris, fishing, and stunning sunsets over the water.",
    tags: ["Lake", "Safari", "Relaxation"],
    startingPrice: 249,
  },
  {
    slug: "hwange",
    name: "Hwange National Park",
    country: "Zimbabwe",
    image: "/images/hwange.jpg",
    rating: 4.8,
    description: "Zimbabwe's largest game reserve, home to over 100 mammal species including huge herds of elephant.",
    tags: ["Safari", "Wildlife", "Nature"],
    startingPrice: 349,
  },
  {
    slug: "great-zimbabwe",
    name: "Great Zimbabwe",
    country: "Zimbabwe",
    image: "/images/great-zimbabwe.jpg",
    rating: 4.6,
    description: "The ancient ruins of a great city that was the capital of the Kingdom of Zimbabwe during the Late Iron Age.",
    tags: ["History", "Culture", "UNESCO"],
    startingPrice: 199,
  },
  {
    slug: "nyanga",
    name: "Nyanga & Eastern Highlands",
    country: "Zimbabwe",
    image: "/images/nyanga.jpg",
    rating: 4.5,
    description: "Cool mountain air, rolling green hills, waterfalls, and pine forests in Zimbabwe's premier highland retreat.",
    tags: ["Mountains", "Hiking", "Nature"],
    startingPrice: 219,
  },
  {
    slug: "cape-town",
    name: "Cape Town",
    country: "South Africa",
    image: "/images/cape-town.jpg",
    rating: 4.9,
    description: "Where Table Mountain meets the ocean - a world-class city blending beaches, vineyards, and rich culture.",
    tags: ["City", "Beach", "Culture"],
    startingPrice: 499,
  },
  {
    slug: "zanzibar",
    name: "Zanzibar",
    country: "Tanzania",
    image: "/images/zanzibar.jpg",
    rating: 4.8,
    description: "The Spice Island paradise offering pristine beaches, Stone Town heritage, and turquoise waters.",
    tags: ["Beach", "Island", "Culture"],
    startingPrice: 599,
  },
]

const allTags = Array.from(new Set(destinations.flatMap((d) => d.tags)))

export default function DestinationsPage() {
  const [search, setSearch] = useState("")
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [ref, inView] = useInView(0.1)

  const filtered = destinations.filter((d) => {
    const matchesSearch =
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.country.toLowerCase().includes(search.toLowerCase())
    const matchesTag = !activeTag || d.tags.includes(activeTag)
    return matchesSearch && matchesTag
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner */}
      <section className="relative flex h-[50vh] min-h-[380px] items-center justify-center overflow-hidden">
        <Image
          src="/images/hero-safari.jpg"
          alt="Explore Africa"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-background" />
        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
          <h1 className="mb-4 font-serif text-4xl font-bold tracking-tight text-card sm:text-5xl md:text-6xl">
            Destination Guide
          </h1>
          <p className="mb-8 text-lg text-card/80">
            Discover incredible places across Africa and beyond. From thundering waterfalls to pristine beaches.
          </p>
          <div className="relative mx-auto max-w-xl">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search destinations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-14 rounded-full border-card/20 bg-card/90 pl-12 text-base shadow-xl backdrop-blur-sm placeholder:text-muted-foreground focus-visible:ring-primary"
            />
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b border-border bg-card py-4">
        <div className="mx-auto flex max-w-7xl items-center gap-3 overflow-x-auto px-4">
          <Filter className="h-4 w-4 shrink-0 text-muted-foreground" />
          <button
            onClick={() => setActiveTag(null)}
            className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
              !activeTag
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-secondary text-muted-foreground hover:bg-primary/10 hover:text-primary"
            }`}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                activeTag === tag
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-secondary text-muted-foreground hover:bg-primary/10 hover:text-primary"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      {/* Destination Grid */}
      <section ref={ref as React.RefObject<HTMLElement>} className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((dest, i) => (
            <Link
              href={`/destinations/${dest.slug}`}
              key={dest.slug}
              className={`group relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl ${
                inView ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={dest.image}
                  alt={dest.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center gap-1.5 rounded-full bg-card/90 px-3 py-1 text-sm font-medium text-foreground backdrop-blur-sm">
                  <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                  {dest.rating}
                </div>
                <div className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                  {"From $"}{dest.startingPrice}
                </div>
              </div>
              <div className="p-5">
                <div className="mb-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  {dest.country}
                </div>
                <h3 className="mb-2 text-xl font-bold text-foreground transition-colors group-hover:text-primary">
                  {dest.name}
                </h3>
                <p className="mb-4 line-clamp-2 text-sm text-muted-foreground leading-relaxed">
                  {dest.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {dest.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-xs font-normal"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-border px-5 py-3">
                <span className="text-sm font-medium text-primary">
                  Explore destination
                </span>
                <ArrowRight className="h-4 w-4 text-primary transition-transform duration-200 group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-lg text-muted-foreground">
              No destinations found matching your search. Try a different keyword.
            </p>
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="bg-primary py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="mb-4 font-serif text-3xl font-bold text-primary-foreground">
            {"Can't find what you're looking for?"}
          </h2>
          <p className="mb-8 text-primary-foreground/80">
            Our travel experts can create a custom itinerary for any destination in Africa and beyond.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/trip-planner">
              <Button size="lg" className="rounded-full bg-card text-primary hover:bg-card/90">
                Plan Custom Trip
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              >
                Talk to an Expert
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
