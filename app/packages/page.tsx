import Image from "next/image"
import Link from "next/link"
import { MapPin, Star, Clock, Users, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Travel Packages | Impala Travel Agency",
  description: "Browse our curated travel packages featuring safaris, beach getaways, cultural tours, and adventure trips across Africa.",
}

const packages = [
  {
    name: "Victoria Falls Explorer",
    location: "Victoria Falls, Zimbabwe",
    image: "/images/victoria-falls.jpg",
    duration: "3 Days / 2 Nights",
    maxPeople: 12,
    rating: 4.9,
    price: 599,
    originalPrice: 799,
    description: "Experience the majestic Victoria Falls with guided tours, sunset cruises, and thrilling adventure activities.",
    highlights: ["Guided Falls tour", "Sunset Zambezi cruise", "Rainforest walk", "Cultural dinner"],
  },
  {
    name: "Hwange Safari Adventure",
    location: "Hwange National Park",
    image: "/images/safari-elephants.jpg",
    duration: "4 Days / 3 Nights",
    maxPeople: 8,
    rating: 4.8,
    price: 899,
    originalPrice: 1099,
    description: "Immerse yourself in the wild with game drives, bush walks, and luxury lodge accommodation.",
    highlights: ["Morning & evening game drives", "Bush walking safari", "Night safari experience", "Luxury lodge stay"],
  },
  {
    name: "Beach Paradise Retreat",
    location: "Mozambique Coast",
    image: "/images/beach-resort.jpg",
    duration: "5 Days / 4 Nights",
    maxPeople: 6,
    rating: 4.7,
    price: 1299,
    originalPrice: 1599,
    description: "Relax on pristine beaches, enjoy water sports, and indulge in fresh seafood at a tropical resort.",
    highlights: ["Beachfront villa", "Snorkeling & diving", "Island hopping", "Seafood dining"],
  },
  {
    name: "Eastern Highlands Trek",
    location: "Nyanga & Chimanimani",
    image: "/images/mountain-hiking.jpg",
    duration: "3 Days / 2 Nights",
    maxPeople: 10,
    rating: 4.6,
    price: 449,
    originalPrice: 549,
    description: "Hike through spectacular mountain landscapes, waterfalls, and misty forests in Zimbabwe's highlands.",
    highlights: ["Mt. Nyangani summit", "Bridal Veil Falls", "Tea estate tour", "Forest nature walks"],
  },
  {
    name: "Cultural Heritage Tour",
    location: "Great Zimbabwe & Masvingo",
    image: "/images/cultural-village.jpg",
    duration: "2 Days / 1 Night",
    maxPeople: 15,
    rating: 4.5,
    price: 299,
    originalPrice: 399,
    description: "Explore the ancient ruins of Great Zimbabwe and immerse yourself in local culture and traditions.",
    highlights: ["Great Zimbabwe ruins", "Cultural village", "Traditional cuisine", "Craft markets"],
  },
  {
    name: "Grand African Safari",
    location: "Multi-destination",
    image: "/images/hero-safari.jpg",
    duration: "7 Days / 6 Nights",
    maxPeople: 8,
    rating: 5.0,
    price: 2499,
    originalPrice: 3199,
    description: "The ultimate African safari spanning multiple parks and destinations for the adventure of a lifetime.",
    highlights: ["Big Five game viewing", "Hot air balloon ride", "5-star lodges", "Private guide"],
  },
]

export default function PackagesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary py-24">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full border-[40px] border-primary-foreground" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 text-center">
          <h1 className="font-serif text-4xl font-bold text-primary-foreground md:text-5xl">Travel Packages</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-primary-foreground/80">
            Explore our handpicked travel packages designed for every type of traveler and budget.
          </p>
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {packages.map((pkg) => (
              <div key={pkg.name} className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                <div className="relative h-56 overflow-hidden">
                  <Image src={pkg.image} alt={pkg.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute left-3 top-3 rounded-full bg-destructive px-3 py-1 text-xs font-bold text-card">
                    Save ${pkg.originalPrice - pkg.price}
                  </div>
                  <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-card/90 px-2 py-1 text-xs font-semibold text-primary backdrop-blur-sm">
                    <Star className="h-3.5 w-3.5 fill-current" />
                    {pkg.rating}
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-bold text-foreground">{pkg.name}</h3>
                  <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" />
                    {pkg.location}
                  </div>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{pkg.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {pkg.highlights.map((h) => (
                      <span key={h} className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">{h}</span>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{pkg.duration}</span>
                    <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />Max {pkg.maxPeople}</span>
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                    <div>
                      <span className="text-sm text-muted-foreground line-through">${pkg.originalPrice}</span>
                      <span className="ml-2 text-2xl font-bold text-primary">${pkg.price}</span>
                      <span className="text-xs text-muted-foreground">/person</span>
                    </div>
                    <Link href="/booking">
                      <Button className="rounded-full bg-primary text-primary-foreground hover:bg-accent">
                        Book <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
