"use client"

import { Shield, Clock, Award, Headphones } from "lucide-react"
import { useInView } from "@/hooks/use-in-view"

const reasons = [
  {
    icon: Shield,
    title: "Trusted Agency",
    description: "Over a decade of reliable travel services with thousands of satisfied clients.",
    stat: "10K+",
    statLabel: "Clients",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock customer support to assist you whenever you need help.",
    stat: "24/7",
    statLabel: "Available",
  },
  {
    icon: Award,
    title: "Award Winning",
    description: "Recognized as a leading travel agency with multiple industry accolades.",
    stat: "15+",
    statLabel: "Awards",
  },
  {
    icon: Headphones,
    title: "Personal Service",
    description: "Dedicated travel consultants to create your perfect trip experience.",
    stat: "100%",
    statLabel: "Dedicated",
  },
]

export function WhyChooseUs() {
  const [ref, inView] = useInView<HTMLDivElement>(0.1)

  return (
    <section className="bg-background py-24">
      <div ref={ref} className="mx-auto max-w-7xl px-4">
        <div className={`mx-auto max-w-2xl text-center transition-all duration-700 ${inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
            Why Impala
          </span>
          <h2 className="mt-4 font-serif text-3xl font-bold text-foreground md:text-4xl text-balance">
            Why Choose Us
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            We go above and beyond to make your travel experience seamless, memorable, and truly special.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r, i) => (
            <div
              key={r.title}
              className={`group flex flex-col items-center rounded-2xl border border-border bg-card p-8 text-center shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lg hover:border-primary/30 ${
                inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: inView ? `${i * 120 + 200}ms` : "0ms" }}
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                <r.icon className="h-7 w-7" />
              </div>
              <p className="mt-4 text-2xl font-bold text-primary">{r.stat}</p>
              <p className="text-xs font-medium text-muted-foreground">{r.statLabel}</p>
              <h3 className="mt-3 text-lg font-bold text-foreground">{r.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
