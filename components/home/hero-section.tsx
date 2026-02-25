"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { CalendarDays, MapPin, Users, Search, Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const destinations = [
  "Victoria Falls",
  "Hwange National Park",
  "Great Zimbabwe",
  "Kariba",
  "Mana Pools",
  "Nyanga",
  "Cape Town",
  "Zanzibar",
  "Kruger National Park",
  "Masai Mara",
]

export function HeroSection() {
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([])
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)
  const [infants, setInfants] = useState(0)

  function toggleDestination(d: string) {
    setSelectedDestinations((prev) =>
      prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]
    )
  }

  return (
    <section className="relative min-h-[85vh] overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/hero-safari.jpg"
        alt="African safari landscape"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-foreground/70" />

      <div className="relative mx-auto flex min-h-[85vh] max-w-7xl flex-col items-center justify-center px-4 py-20 text-center">
        <h1 className="max-w-4xl font-serif text-4xl font-bold leading-tight text-card sm:text-5xl md:text-6xl lg:text-7xl text-balance">
          Discover Africa&apos;s Hidden Treasures
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-card/90 md:text-xl">
          Your trusted partner in travel convenience. Book flights, safaris, hotels, and custom travel
          packages with Impala Travel Agency.
        </p>

        {/* Booking Engine */}
        <div className="mt-10 w-full max-w-5xl rounded-2xl border border-card/10 bg-card/95 p-6 shadow-2xl backdrop-blur-md md:p-8">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Check-in */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-sm font-medium text-foreground">Check-in Date</Label>
              <div className="relative">
                <CalendarDays className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Check-out */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-sm font-medium text-foreground">Check-out Date</Label>
              <div className="relative">
                <CalendarDays className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Destinations */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-sm font-medium text-foreground">Destinations</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <button className="flex h-9 items-center gap-2 rounded-md border border-input bg-background px-3 text-sm text-foreground ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="truncate">
                      {selectedDestinations.length > 0
                        ? `${selectedDestinations.length} selected`
                        : "Select destinations"}
                    </span>
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-64 p-3">
                  <div className="flex max-h-56 flex-col gap-1 overflow-y-auto">
                    {destinations.map((d) => (
                      <label key={d} className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-secondary">
                        <input
                          type="checkbox"
                          checked={selectedDestinations.includes(d)}
                          onChange={() => toggleDestination(d)}
                          className="rounded accent-primary"
                        />
                        {d}
                      </label>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            {/* Travelers */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-sm font-medium text-foreground">Travelers</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <button className="flex h-9 items-center gap-2 rounded-md border border-input bg-background px-3 text-sm text-foreground ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{adults + children + infants} traveler(s)</span>
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-64 p-4">
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
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => set(Math.max(min, value - 1))}
                            className="flex h-7 w-7 items-center justify-center rounded-full border border-border text-foreground hover:bg-secondary"
                            aria-label={`Decrease ${label}`}
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-6 text-center text-sm font-medium text-foreground">{value}</span>
                          <button
                            onClick={() => set(value + 1)}
                            className="flex h-7 w-7 items-center justify-center rounded-full border border-border text-foreground hover:bg-secondary"
                            aria-label={`Increase ${label}`}
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <Link href="/booking">
              <Button size="lg" className="rounded-full bg-primary px-10 text-lg text-primary-foreground shadow-lg hover:bg-accent">
                <Search className="mr-2 h-5 w-5" />
                Search Trips
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
