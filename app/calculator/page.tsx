"use client"

import { useState, useMemo } from "react"
import { Calculator, MapPin, Users, Calendar, DollarSign } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const destinationCosts: Record<string, { budget: number; standard: number; luxury: number }> = {
  "Victoria Falls": { budget: 80, standard: 180, luxury: 400 },
  "Hwange National Park": { budget: 90, standard: 200, luxury: 450 },
  "Cape Town": { budget: 70, standard: 160, luxury: 380 },
  "Zanzibar": { budget: 60, standard: 150, luxury: 350 },
  "Kruger National Park": { budget: 85, standard: 190, luxury: 420 },
  "Masai Mara": { budget: 95, standard: 220, luxury: 500 },
  "Nyanga": { budget: 50, standard: 120, luxury: 280 },
  "Kariba": { budget: 55, standard: 130, luxury: 300 },
  "Mozambique Coast": { budget: 65, standard: 145, luxury: 360 },
  "Great Zimbabwe": { budget: 45, standard: 110, luxury: 250 },
}

const destinationNames = Object.keys(destinationCosts)

const comfortLevels = [
  { id: "budget", label: "Budget", desc: "Hostels, public transport, street food" },
  { id: "standard", label: "Standard", desc: "Hotels, private transfers, restaurants" },
  { id: "luxury", label: "Luxury", desc: "5-star resorts, private guides, fine dining" },
]

export default function CalculatorPage() {
  const [destination, setDestination] = useState("Victoria Falls")
  const [days, setDays] = useState("5")
  const [travelers, setTravelers] = useState("2")
  const [comfort, setComfort] = useState<"budget" | "standard" | "luxury">("standard")

  const breakdown = useMemo(() => {
    const numDays = parseInt(days) || 1
    const numTravelers = parseInt(travelers) || 1
    const base = destinationCosts[destination]?.[comfort] || 150
    const accommodation = Math.round(base * 0.45) * numDays * numTravelers
    const transportCost = Math.round(base * 0.2) * numDays * numTravelers
    const meals = Math.round(base * 0.2) * numDays * numTravelers
    const activities = Math.round(base * 0.15) * numDays * numTravelers
    const subtotal = accommodation + transportCost + meals + activities
    const addOns = {
      travelInsurance: numTravelers * numDays * 8,
      airportTransfer: numTravelers * 25,
      visaProcessing: numTravelers * 50,
    }
    const addOnsTotal = addOns.travelInsurance + addOns.airportTransfer + addOns.visaProcessing
    const total = subtotal + addOnsTotal

    return { accommodation, transport: transportCost, meals, activities, subtotal, addOns, addOnsTotal, total }
  }, [destination, days, travelers, comfort])

  return (
    <>
      {/* Hero */}
      <section className="bg-primary py-16">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h1 className="font-serif text-4xl font-bold text-primary-foreground md:text-5xl">Travel Cost Calculator</h1>
          <p className="mx-auto mt-3 max-w-xl text-primary-foreground/80">
            Estimate the cost of your trip and plan your budget with our interactive calculator.
          </p>
        </div>
      </section>

      <section className="bg-background py-12">
        <div className="mx-auto max-w-5xl px-4">
          <div className="grid gap-8 lg:grid-cols-5">
            {/* Inputs */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <h2 className="flex items-center gap-2 text-xl font-bold text-foreground">
                  <Calculator className="h-5 w-5 text-primary" /> Trip Details
                </h2>
                <div className="mt-6 flex flex-col gap-5">
                  <div className="flex flex-col gap-1.5">
                    <Label>Destination</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <select
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className="flex h-9 w-full rounded-md border border-input bg-background px-3 pl-10 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        {destinationNames.map((d) => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label>Number of Days</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input type="number" min={1} max={30} value={days} onChange={(e) => setDays(e.target.value)} className="pl-10" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label>Number of Travelers</Label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input type="number" min={1} max={20} value={travelers} onChange={(e) => setTravelers(e.target.value)} className="pl-10" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label>Comfort Level</Label>
                    <div className="flex flex-col gap-2">
                      {comfortLevels.map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => setComfort(opt.id as "budget" | "standard" | "luxury")}
                          className={`flex flex-col rounded-xl border p-3 text-left transition-colors ${
                            comfort === opt.id
                              ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                              : "border-border hover:border-primary/30"
                          }`}
                        >
                          <p className="text-sm font-semibold text-foreground">{opt.label}</p>
                          <p className="text-xs text-muted-foreground">{opt.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <h2 className="flex items-center gap-2 text-xl font-bold text-foreground">
                  <DollarSign className="h-5 w-5 text-primary" /> Estimated Cost
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {destination} | {days} days | {travelers} traveler(s) | {comfort} level
                </p>

                {/* Main Breakdown */}
                <div className="mt-6 flex flex-col gap-4">
                  {[
                    { label: "Accommodation", value: breakdown.accommodation, pct: Math.round((breakdown.accommodation / breakdown.subtotal) * 100) },
                    { label: "Transportation", value: breakdown.transport, pct: Math.round((breakdown.transport / breakdown.subtotal) * 100) },
                    { label: "Meals & Dining", value: breakdown.meals, pct: Math.round((breakdown.meals / breakdown.subtotal) * 100) },
                    { label: "Activities & Tours", value: breakdown.activities, pct: Math.round((breakdown.activities / breakdown.subtotal) * 100) },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-foreground">{item.label}</span>
                        <span className="font-semibold text-foreground">${item.value.toLocaleString()}</span>
                      </div>
                      <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-secondary">
                        <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${item.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex justify-between border-t border-border pt-4 text-sm">
                  <span className="font-medium text-foreground">Subtotal</span>
                  <span className="font-bold text-foreground">${breakdown.subtotal.toLocaleString()}</span>
                </div>

                {/* Optional Add-ons */}
                <div className="mt-6">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Optional Add-ons</h3>
                  <div className="mt-3 flex flex-col gap-2">
                    {[
                      { label: "Travel Insurance", value: breakdown.addOns.travelInsurance },
                      { label: "Airport Transfer", value: breakdown.addOns.airportTransfer },
                      { label: "Visa Processing", value: breakdown.addOns.visaProcessing },
                    ].map((addon) => (
                      <div key={addon.label} className="flex items-center justify-between rounded-lg bg-secondary px-4 py-2.5 text-sm">
                        <span className="text-foreground">{addon.label}</span>
                        <span className="font-medium text-foreground">${addon.value.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Total */}
                <div className="mt-6 rounded-xl bg-primary p-6 text-center">
                  <p className="text-sm font-medium text-primary-foreground/70">Estimated Total Cost</p>
                  <p className="mt-1 text-4xl font-bold text-primary-foreground">${breakdown.total.toLocaleString()}</p>
                  <p className="mt-1 text-xs text-primary-foreground/60">*Prices are estimates and may vary based on availability</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
