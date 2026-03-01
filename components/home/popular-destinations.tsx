"use client"

import Image from "next/image"
import Link from "next/link"
import { MapPin, Star, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useInView } from "@/hooks/use-in-view"

const destinations = [
  {
    name: "Victoria Falls",
    location: "Zimbabwe",
    image: "/images/victoria-falls.jpg",
    rating: 4.9,
    price: "From $299",
    description: "The spectacular wonder of the world and a must-visit destination.",
  },
  {
    name: "Hwange Safari",
    location: "Zimbabwe",
    image: "/images/safari-elephants.jpg",
    rating: 4.8,
    price: "From $450",
    description: "Home to over 100 mammal species and 400 bird species.",
  },
  {
    name: "Tropical Beach",
    location: "Mozambique",
    image: "/images/beach-resort.jpg",
    rating: 4.7,
    price: "From $550",
    description: "Pristine beaches with crystal-clear waters and luxury resorts.",
  },
  {
    name: "Mountain Trek",
    location: "Eastern Highlands",
    image: "/images/mountain-hiking.jpg",
    rating: 4.6,
    price: "From $199",
    description: "Adventure hiking through spectacular mountain landscapes.",
  },
]

export function PopularDestinations() {
  const [ref, inView] = useInView<HTMLDivElement>(0.1)

  return (
    <section className="bg-secondary/50 py-24">
      <div ref={ref} className="mx-auto max-w-7xl px-4">
        <div className={`flex flex-col items-center justify-between gap-4 sm:flex-row transition-all duration-700 ${inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
          <div>
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
              Explore
            </span>
            <h2 className="mt-4 font-serif text-3xl font-bold text-foreground md:text-4xl text-balance">
              Popular Destinations
            </h2>
          </div>
          <Link href="/packages">
            <Button variant="outline" className="group rounded-full border-primary text-primary transition-all duration-200 hover:bg-primary hover:text-primary-foreground">
              View All Packages <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.map((d, i) => (
            <div
              key={d.name}
              className={`group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl ${
                inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: inView ? `${i * 120 + 200}ms` : "0ms" }}
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={d.image}
                  alt={d.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="absolute right-3 top-3 rounded-full bg-card/90 px-3 py-1 text-xs font-bold text-primary glass">
                  {d.price}
                </div>
                {/* Hover overlay button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <Link href="/booking">
                    <Button className="rounded-full bg-primary px-6 text-primary-foreground shadow-lg transition-transform hover:scale-105">
                      Book Now
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-foreground">{d.name}</h3>
                  <div className="flex items-center gap-1 text-sm text-primary">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="font-semibold">{d.rating}</span>
                  </div>
                </div>
                <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{d.location}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">{d.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
