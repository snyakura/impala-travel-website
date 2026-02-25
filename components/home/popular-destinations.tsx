import Image from "next/image"
import Link from "next/link"
import { MapPin, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

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
  return (
    <section className="bg-secondary py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Explore</p>
          <h2 className="mt-2 font-serif text-3xl font-bold text-foreground md:text-4xl text-balance">
            Popular Destinations
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Discover our most sought-after travel destinations across Africa and beyond.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.map((d) => (
            <div key={d.name} className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={d.image}
                  alt={d.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute right-3 top-3 rounded-full bg-card/90 px-3 py-1 text-xs font-semibold text-primary backdrop-blur-sm">
                  {d.price}
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-foreground">{d.name}</h3>
                  <div className="flex items-center gap-1 text-sm text-primary">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="font-medium">{d.rating}</span>
                  </div>
                </div>
                <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{d.location}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d.description}</p>
                <Link href="/booking" className="mt-4 block">
                  <Button variant="outline" className="w-full rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                    Book Now
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
