"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { CalendarDays, MapPin, Users, Search, Minus, Plus, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const destinations = [
  "Victoria Falls", "Hwange National Park", "Great Zimbabwe", "Kariba",
  "Mana Pools", "Nyanga", "Cape Town", "Zanzibar", "Kruger National Park", "Masai Mara",
]

const heroStats = [
  { value: "10K+", label: "Happy Travelers" },
  { value: "50+", label: "Destinations" },
  { value: "15+", label: "Years Experience" },
  { value: "4.9", label: "Star Rating" },
]

export function HeroSection() {
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([])
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)
  const [infants, setInfants] = useState(0)
  const [visible, setVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setVisible(true)
  }, [])

  function toggleDestination(d: string) {
    setSelectedDestinations((prev) =>
      prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]
    )
  }

  const buildSearchParams = () => {
    const params = new URLSearchParams()
    if (checkIn) params.set("checkIn", checkIn)
    if (checkOut) params.set("checkOut", checkOut)
    if (selectedDestinations.length) params.set("destinations", selectedDestinations.join(","))
    params.set("adults", String(adults))
    params.set("children", String(children))
    params.set("infants", String(infants))
    return params.toString()
  }

  return (
    <section ref={sectionRef} className="relative min-h-[90vh] overflow-hidden">
      {/* Background Image with parallax-like overlay */}
      <Image
        src="/images/hero-safari.jpg"
        alt="African safari landscape"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/40 to-foreground/80" />

      <div className="relative mx-auto flex min-h-[90vh] max-w-7xl flex-col items-center justify-center px-4 py-24 text-center">
        {/* Badge */}
        <div className={`transition-all duration-700 ${visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}>
          <span className="inline-flex items-center gap-2 rounded-full border border-card/20 bg-card/10 px-4 py-1.5 text-sm font-medium text-card glass">
            <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            Trusted by 10,000+ travelers
          </span>
        </div>

        <h1
          className={`mt-6 max-w-4xl font-serif text-4xl font-bold leading-tight text-card sm:text-5xl md:text-6xl lg:text-7xl text-balance transition-all duration-700 delay-200 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          Discover Africa&apos;s{" "}
          <span className="relative">
            Hidden Treasures
            <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none">
              <path d="M1 5.5C40 2 80 2 100 4C120 6 160 6 199 3" stroke="oklch(0.55 0.15 155)" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </span>
        </h1>

        <p
          className={`mt-6 max-w-2xl text-lg leading-relaxed text-card/80 md:text-xl transition-all duration-700 delay-300 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          Book flights, safaris, hotels, and custom travel packages with Impala Travel Agency -- your partner in travel convenience.
        </p>

        {/* Hero Stats */}
        <div
          className={`mt-8 flex flex-wrap items-center justify-center gap-8 transition-all duration-700 delay-500 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {heroStats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-bold text-card md:text-3xl">{stat.value}</p>
              <p className="text-xs text-card/60">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Booking Engine */}
        <div
          className={`mt-10 w-full max-w-5xl transition-all duration-700 delay-700 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <div className="rounded-2xl border border-card/10 bg-card/95 p-5 shadow-2xl glass md:p-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {/* Check-in */}
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Check-in</Label>
                <div className="relative">
                  <CalendarDays className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="h-11 rounded-xl pl-10 transition-shadow focus:shadow-md"
                  />
                </div>
              </div>

              {/* Check-out */}
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Check-out</Label>
                <div className="relative">
                  <CalendarDays className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="h-11 rounded-xl pl-10 transition-shadow focus:shadow-md"
                  />
                </div>
              </div>

              {/* Destinations */}
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Where to</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="flex h-11 items-center justify-between rounded-xl border border-input bg-background px-3 text-sm text-foreground transition-shadow hover:shadow-md">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="truncate">
                          {selectedDestinations.length > 0
                            ? `${selectedDestinations.length} selected`
                            : "Select destinations"}
                        </span>
                      </div>
                      <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64 p-2" align="start">
                    <div className="flex max-h-56 flex-col gap-0.5 overflow-y-auto">
                      {destinations.map((d) => (
                        <button
                          key={d}
                          onClick={() => toggleDestination(d)}
                          className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                            selectedDestinations.includes(d)
                              ? "bg-primary/10 text-primary font-medium"
                              : "text-foreground hover:bg-secondary"
                          }`}
                        >
                          <div className={`flex h-4 w-4 items-center justify-center rounded border transition-colors ${
                            selectedDestinations.includes(d) ? "border-primary bg-primary" : "border-border"
                          }`}>
                            {selectedDestinations.includes(d) && (
                              <svg className="h-3 w-3 text-primary-foreground" viewBox="0 0 12 12" fill="none">
                                <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )}
                          </div>
                          {d}
                        </button>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Travelers */}
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Travelers</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="flex h-11 items-center justify-between rounded-xl border border-input bg-background px-3 text-sm text-foreground transition-shadow hover:shadow-md">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{adults + children + infants} traveler{adults + children + infants !== 1 ? "s" : ""}</span>
                      </div>
                      <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64 p-4" align="end">
                    <div className="flex flex-col gap-4">
                      {[
                        { label: "Adults", desc: "Age 13+", value: adults, set: setAdults, min: 1 },
                        { label: "Children", desc: "Age 2-12", value: children, set: setChildren, min: 0 },
                        { label: "Infants", desc: "Under 2", value: infants, set: setInfants, min: 0 },
                      ].map(({ label, desc, value, set, min }) => (
                        <div key={label} className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-foreground">{label}</p>
                            <p className="text-xs text-muted-foreground">{desc}</p>
                          </div>
                          <div className="flex items-center gap-2.5">
                            <button
                              onClick={() => set(Math.max(min, value - 1))}
                              disabled={value <= min}
                              className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-primary hover:text-primary-foreground hover:border-primary disabled:opacity-30"
                              aria-label={`Decrease ${label}`}
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="w-5 text-center text-sm font-semibold text-foreground">{value}</span>
                            <button
                              onClick={() => set(value + 1)}
                              className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-primary hover:text-primary-foreground hover:border-primary"
                              aria-label={`Increase ${label}`}
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="mt-5 flex justify-center">
              <Link href={`/booking?${buildSearchParams()}`}>
                <Button size="lg" className="rounded-full bg-primary px-10 text-base text-primary-foreground shadow-lg transition-all duration-200 hover:bg-accent hover:shadow-xl hover:-translate-y-0.5">
                  <Search className="mr-2 h-5 w-5" />
                  Search Trips
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
