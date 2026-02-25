import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-primary py-20">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full border-[40px] border-primary-foreground" />
        <div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full border-[30px] border-primary-foreground" />
      </div>
      <div className="relative mx-auto max-w-3xl px-4 text-center">
        <h2 className="font-serif text-3xl font-bold text-primary-foreground md:text-4xl text-balance">
          Ready to Start Your Adventure?
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-primary-foreground/80">
          Let our travel experts create the perfect itinerary for your dream trip. Book today and enjoy
          exclusive deals on safari packages, beach getaways, and cultural tours.
        </p>
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link href="/booking">
            <Button size="lg" className="rounded-full bg-primary-foreground px-8 text-primary shadow-lg hover:bg-primary-foreground/90">
              Book Your Trip
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/trip-planner">
            <Button size="lg" variant="outline" className="rounded-full border-primary-foreground/40 bg-transparent px-8 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
              Plan My Trip
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
