"use client"

import { Plane, Hotel, Compass, Car, FileText, Palmtree, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useInView } from "@/hooks/use-in-view"

const services = [
  {
    icon: Plane,
    title: "Flight Booking",
    description: "Book domestic and international flights at competitive rates with flexible options.",
    href: "/services#flights",
    color: "from-primary/10 to-primary/5",
  },
  {
    icon: Hotel,
    title: "Hotel Reservations",
    description: "Premium accommodation worldwide, from luxury resorts to boutique lodges.",
    href: "/services#hotels",
    color: "from-amber-500/10 to-amber-500/5",
  },
  {
    icon: Compass,
    title: "Safari Tours",
    description: "Experience Africa's incredible wildlife with expertly guided safari adventures.",
    href: "/services#safaris",
    color: "from-primary/10 to-primary/5",
  },
  {
    icon: Car,
    title: "Car Rentals",
    description: "Reliable vehicle hire for self-drive or chauffeur-driven travel experiences.",
    href: "/services#car-rentals",
    color: "from-blue-500/10 to-blue-500/5",
  },
  {
    icon: FileText,
    title: "Visa Assistance",
    description: "Complete visa processing support to ensure smooth international travel.",
    href: "/services#visa",
    color: "from-primary/10 to-primary/5",
  },
  {
    icon: Palmtree,
    title: "Custom Travel",
    description: "Tailor-made travel packages crafted to suit your preferences and budget.",
    href: "/services#custom",
    color: "from-rose-500/10 to-rose-500/5",
  },
]

export function ServicesOverview() {
  const [ref, inView] = useInView<HTMLDivElement>(0.1)

  return (
    <section className="bg-background py-24">
      <div ref={ref} className="mx-auto max-w-7xl px-4">
        <div className={`mx-auto max-w-2xl text-center transition-all duration-700 ${inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
            What We Offer
          </span>
          <h2 className="mt-4 font-serif text-3xl font-bold text-foreground md:text-4xl text-balance">
            Our Services
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Whether you&apos;re embarking on a leisurely road trip or navigating city streets, Impala Travel offers a smooth ride for you.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Link
              key={s.title}
              href={s.href}
              className={`group relative flex flex-col items-start overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl ${
                inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: inView ? `${i * 100 + 200}ms` : "0ms" }}
            >
              {/* Hover gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${s.color} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110">
                  <s.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-foreground">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2">
                  Learn more <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
