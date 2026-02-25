import { Plane, Hotel, Compass, Car, FileText, Palmtree } from "lucide-react"
import Link from "next/link"

const services = [
  {
    icon: Plane,
    title: "Flight Booking",
    description: "Book domestic and international flights at competitive rates with flexible options.",
    href: "/services#flights",
  },
  {
    icon: Hotel,
    title: "Hotel Reservations",
    description: "Premium accommodation worldwide, from luxury resorts to boutique lodges.",
    href: "/services#hotels",
  },
  {
    icon: Compass,
    title: "Safari Tours",
    description: "Experience Africa's incredible wildlife with expertly guided safari adventures.",
    href: "/services#safaris",
  },
  {
    icon: Car,
    title: "Car Rentals",
    description: "Reliable vehicle hire for self-drive or chauffeur-driven travel experiences.",
    href: "/services#car-rentals",
  },
  {
    icon: FileText,
    title: "Visa Assistance",
    description: "Complete visa processing support to ensure smooth international travel.",
    href: "/services#visa",
  },
  {
    icon: Palmtree,
    title: "Custom Travel",
    description: "Tailor-made travel packages crafted to suit your preferences and budget.",
    href: "/services#custom",
  },
]

export function ServicesOverview() {
  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">What We Offer</p>
          <h2 className="mt-2 font-serif text-3xl font-bold text-foreground md:text-4xl text-balance">
            Our Services
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Whether you&apos;re embarking on a leisurely road trip or navigating city streets, Impala Travel
            offers a smooth ride for you.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.title}
              href={s.href}
              className="group flex flex-col items-start rounded-2xl border border-border bg-card p-8 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <s.icon className="h-7 w-7" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-foreground">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
