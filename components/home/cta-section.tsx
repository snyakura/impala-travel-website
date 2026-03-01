"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, FileText, CreditCard } from "lucide-react"
import { useInView } from "@/hooks/use-in-view"

export function CTASection() {
  const [ref, inView] = useInView<HTMLDivElement>(0.1)

  return (
    <section className="relative overflow-hidden bg-primary py-24">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full border-[40px] border-primary-foreground" />
        <div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full border-[30px] border-primary-foreground" />
        <div className="absolute left-1/3 top-10 h-40 w-40 rounded-full border-[20px] border-primary-foreground" />
      </div>

      <div ref={ref} className="relative mx-auto max-w-5xl px-4">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* Left content */}
          <div className={`transition-all duration-700 ${inView ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"}`}>
            <h2 className="font-serif text-3xl font-bold text-primary-foreground md:text-4xl lg:text-5xl text-balance">
              Ready to Start Your Adventure?
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-primary-foreground/80">
              Let our travel experts create the perfect itinerary for your dream trip. Book today and enjoy exclusive deals.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/booking">
                <Button size="lg" className="rounded-full bg-primary-foreground px-8 text-primary shadow-lg transition-all duration-200 hover:bg-primary-foreground/90 hover:-translate-y-0.5">
                  Book Your Trip
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/trip-planner">
                <Button size="lg" variant="outline" className="rounded-full border-primary-foreground/30 bg-transparent px-8 text-primary-foreground transition-all duration-200 hover:bg-primary-foreground/10 hover:text-primary-foreground">
                  Plan My Trip
                </Button>
              </Link>
            </div>
          </div>

          {/* Right - Quick action cards */}
          <div className={`flex flex-col gap-4 transition-all duration-700 delay-300 ${inView ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"}`}>
            <Link href="/documents" className="group flex items-center gap-4 rounded-2xl bg-primary-foreground/10 p-5 transition-all duration-200 hover:bg-primary-foreground/20">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-foreground/20 text-primary-foreground transition-transform group-hover:scale-110">
                <FileText className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-primary-foreground">Upload Documents</p>
                <p className="text-sm text-primary-foreground/60">Securely submit your travel documents</p>
              </div>
              <ArrowRight className="h-5 w-5 text-primary-foreground/50 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/calculator" className="group flex items-center gap-4 rounded-2xl bg-primary-foreground/10 p-5 transition-all duration-200 hover:bg-primary-foreground/20">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-foreground/20 text-primary-foreground transition-transform group-hover:scale-110">
                <CreditCard className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-primary-foreground">Cost Calculator</p>
                <p className="text-sm text-primary-foreground/60">Estimate your trip costs instantly</p>
              </div>
              <ArrowRight className="h-5 w-5 text-primary-foreground/50 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
