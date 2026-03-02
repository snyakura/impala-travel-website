import Link from "next/link"
import Image from "next/image"
import { Plane, Hotel, Compass, Car, FileText, Palmtree, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Our Services | Impala Travel Agency",
  description: "Explore our comprehensive travel services: flight booking, hotel reservations, safari tours, car rentals, visa assistance, and custom travel planning.",
}

const services = [
  {
    id: "flights",
    icon: Plane,
    title: "Flight Booking",
    description: "Book domestic and international flights at competitive rates. We partner with all major airlines to get you the best deals on economy, business, and first-class tickets. Our real-time booking engine ensures you always see the latest availability and pricing.",
    features: ["Real-time fare comparison", "Flexible booking options", "Group booking discounts", "24/7 flight support"],
    image: "/images/hero-safari.jpg",
  },
  {
    id: "hotels",
    icon: Hotel,
    title: "Hotel Reservations",
    description: "From luxury five-star resorts to charming boutique lodges, we offer a wide selection of accommodation options worldwide. Our partnerships with premier hospitality brands ensure you enjoy the best rates and exclusive perks.",
    features: ["Best price guarantee", "Luxury to budget options", "Last-minute deals", "Free cancellation options"],
    image: "/images/beach-resort.jpg",
  },
  {
    id: "safaris",
    icon: Compass,
    title: "Safari Tours",
    description: "Experience the magic of Africa's wildlife with our expertly curated safari tours. From the Big Five in Hwange to the great wildebeest migration in the Masai Mara, we craft unforgettable safari experiences.",
    features: ["Expert wildlife guides", "Luxury safari lodges", "Photography tours", "Family-friendly options"],
    image: "/images/safari-elephants.jpg",
  },
  {
    id: "car-rentals",
    icon: Car,
    title: "Car Rentals",
    description: "Explore destinations at your own pace with our reliable vehicle hire service. Choose from sedans, SUVs, 4x4s, and luxury vehicles with optional chauffeur service for the ultimate convenience.",
    features: ["Self Drive Rentals", "Chauffeur Driven Rentals", "Airport Transfers", "Shuttle Services"],
    image: "/images/mountain-hiking.jpg",
    subLinks: [
      { label: "Self Drive Rentals", href: "/car-rental/self-drive" },
      { label: "Chauffeur Driven", href: "/car-rental/chauffeur" },
      { label: "Airport Transfers", href: "/car-rental/airport-transfers" },
      { label: "Shuttle Services", href: "/car-rental/shuttle" },
    ],
  },
  {
    id: "visa",
    icon: FileText,
    title: "Visa Assistance",
    description: "Navigate the complexity of international visa applications with our expert guidance. We handle document preparation, application submissions, and follow-ups to ensure a smooth process.",
    features: ["Document preparation", "Application tracking", "Express processing", "Multi-country visas"],
    image: "/images/victoria-falls.jpg",
  },
  {
    id: "custom",
    icon: Palmtree,
    title: "Custom Travel Planning",
    description: "Have a dream trip in mind? Our experienced travel consultants will work with you to design a tailor-made itinerary that perfectly matches your preferences, budget, and travel style.",
    features: ["Personalized itineraries", "Budget optimization", "Local insider tips", "Dedicated planner"],
    image: "/images/cultural-village.jpg",
  },
]

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary py-24">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full border-[40px] border-primary-foreground" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 text-center">
          <h1 className="font-serif text-4xl font-bold text-primary-foreground md:text-5xl">Our Services</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-primary-foreground/80">
            Comprehensive travel solutions tailored to make your journey seamless and unforgettable.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col gap-20">
            {services.map((s, i) => (
              <div key={s.id} id={s.id} className="scroll-mt-32">
                <div className={`grid items-center gap-10 lg:grid-cols-2 ${i % 2 === 1 ? "lg:[direction:rtl]" : ""}`}>
                  <div className="relative h-80 overflow-hidden rounded-2xl lg:h-96 [direction:ltr]">
                    <Image src={s.image} alt={s.title} fill className="object-cover" />
                  </div>
                  <div className="[direction:ltr]">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <s.icon className="h-6 w-6" />
                      </div>
                      <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl">{s.title}</h2>
                    </div>
                    <p className="mt-4 leading-relaxed text-muted-foreground">{s.description}</p>
                    <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                      {s.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-foreground">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Link href="/booking" className="mt-6 inline-block">
                      <Button className="rounded-full bg-primary px-6 text-primary-foreground hover:bg-accent">
                        Book Now
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                    {"subLinks" in s && s.subLinks && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {(s.subLinks as { label: string; href: string }[]).map((link) => (
                          <Link
                            key={link.label}
                            href={link.href}
                            className="rounded-full border border-primary/20 px-4 py-1.5 text-sm font-medium text-primary transition-colors hover:bg-primary/10"
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    )}
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
