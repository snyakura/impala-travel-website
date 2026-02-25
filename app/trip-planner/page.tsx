"use client"

import { useState } from "react"
import {
  Calendar, MapPin, Users, Heart, Compass, DollarSign,
  Plane, Plus, Trash2, ArrowRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"

const interestOptions = [
  { id: "safari", label: "Safari & Wildlife" },
  { id: "luxury", label: "Luxury Travel" },
  { id: "adventure", label: "Adventure" },
  { id: "beach", label: "Beach & Relaxation" },
  { id: "culture", label: "Culture & Heritage" },
  { id: "family", label: "Family Friendly" },
  { id: "romantic", label: "Romantic Getaway" },
  { id: "photography", label: "Photography Tours" },
]

const styleOptions = [
  { id: "backpacker", label: "Backpacker", desc: "Budget-friendly, hostel-style" },
  { id: "comfort", label: "Comfort", desc: "Mid-range hotels and lodges" },
  { id: "premium", label: "Premium", desc: "High-end accommodation" },
  { id: "ultra", label: "Ultra Luxury", desc: "Exclusive, private villas" },
]

interface ItineraryItem {
  id: number
  destination: string
  startDate: string
  endDate: string
  accommodation: string
  activities: string
}

const suggestedPackages = [
  { name: "Safari & Falls Combo", destinations: "Hwange + Victoria Falls", days: 5, price: 1299, match: 95 },
  { name: "Cultural Discovery", destinations: "Great Zimbabwe + Harare", days: 3, price: 449, match: 88 },
  { name: "Beach & Bush", destinations: "Mozambique + Kruger", days: 7, price: 2199, match: 82 },
]

export default function TripPlannerPage() {
  const [budget, setBudget] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [travelers, setTravelers] = useState("2")
  const [interests, setInterests] = useState<string[]>([])
  const [style, setStyle] = useState("")
  const [departure, setDeparture] = useState("")
  const [notes, setNotes] = useState("")
  const [items, setItems] = useState<ItineraryItem[]>([
    { id: 1, destination: "", startDate: "", endDate: "", accommodation: "", activities: "" },
  ])
  const [showSuggestions, setShowSuggestions] = useState(false)

  function toggleInterest(id: string) {
    setInterests((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])
  }

  function addItem() {
    setItems((prev) => [...prev, { id: Date.now(), destination: "", startDate: "", endDate: "", accommodation: "", activities: "" }])
  }

  function removeItem(id: number) {
    setItems((prev) => prev.filter((x) => x.id !== id))
  }

  function updateItem(id: number, field: keyof ItineraryItem, value: string) {
    setItems((prev) => prev.map((x) => x.id === id ? { ...x, [field]: value } : x))
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-primary py-16">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h1 className="font-serif text-4xl font-bold text-primary-foreground md:text-5xl">Plan My Trip</h1>
          <p className="mx-auto mt-3 max-w-xl text-primary-foreground/80">
            Tell us about your dream trip and we&apos;ll suggest the perfect packages, destinations, and experiences for you.
          </p>
        </div>
      </section>

      <section className="bg-background py-12">
        <div className="mx-auto max-w-5xl px-4">
          <div className="grid gap-10 lg:grid-cols-3">
            {/* Trip Preferences */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-foreground">Your Travel Preferences</h2>

                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <Label>Budget (USD)</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="2000" className="pl-10" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label>Number of Travelers</Label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input value={travelers} onChange={(e) => setTravelers(e.target.value)} type="number" min={1} className="pl-10" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label>Travel Start Date</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="pl-10" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label>Travel End Date</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="pl-10" />
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-1.5">
                  <Label>Departure Location</Label>
                  <div className="relative">
                    <Plane className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input value={departure} onChange={(e) => setDeparture(e.target.value)} placeholder="Harare, Zimbabwe" className="pl-10" />
                  </div>
                </div>

                {/* Interests */}
                <div className="mt-6">
                  <Label>Travel Interests</Label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {interestOptions.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => toggleInterest(opt.id)}
                        className={`flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm transition-colors ${
                          interests.includes(opt.id)
                            ? "border-primary bg-primary/10 text-primary font-medium"
                            : "border-border text-foreground hover:bg-secondary"
                        }`}
                      >
                        <Heart className={`h-3.5 w-3.5 ${interests.includes(opt.id) ? "fill-current" : ""}`} />
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Travel Style */}
                <div className="mt-6">
                  <Label>Preferred Travel Style</Label>
                  <div className="mt-2 grid gap-2 sm:grid-cols-2">
                    {styleOptions.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setStyle(opt.id)}
                        className={`flex flex-col rounded-xl border p-4 text-left transition-colors ${
                          style === opt.id
                            ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                            : "border-border hover:border-primary/30"
                        }`}
                      >
                        <p className="font-semibold text-foreground">{opt.label}</p>
                        <p className="text-xs text-muted-foreground">{opt.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-1.5">
                  <Label>Additional Notes</Label>
                  <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Any special requirements, dietary needs, accessibility needs..." rows={3} />
                </div>

                <Button onClick={() => setShowSuggestions(true)} className="mt-6 rounded-full bg-primary px-8 text-primary-foreground hover:bg-accent">
                  <Compass className="mr-2 h-4 w-4" /> Get Suggestions
                </Button>
              </div>

              {/* Itinerary Builder */}
              <div className="mt-10 rounded-2xl border border-border bg-card p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-foreground">Build Your Itinerary</h2>
                <p className="mt-1 text-sm text-muted-foreground">Add destinations, dates, and activities to plan your trip day by day.</p>

                <div className="mt-6 flex flex-col gap-4">
                  {items.map((item, idx) => (
                    <div key={item.id} className="rounded-xl border border-border bg-secondary p-5">
                      <div className="mb-3 flex items-center justify-between">
                        <span className="text-sm font-bold text-primary">Stop {idx + 1}</span>
                        {items.length > 1 && (
                          <button onClick={() => removeItem(item.id)} className="text-destructive hover:text-destructive/80" aria-label="Remove stop">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <Input placeholder="Destination" value={item.destination} onChange={(e) => updateItem(item.id, "destination", e.target.value)} />
                        <Input type="date" value={item.startDate} onChange={(e) => updateItem(item.id, "startDate", e.target.value)} />
                        <Input placeholder="Accommodation" value={item.accommodation} onChange={(e) => updateItem(item.id, "accommodation", e.target.value)} />
                        <Input type="date" value={item.endDate} onChange={(e) => updateItem(item.id, "endDate", e.target.value)} />
                      </div>
                      <Input className="mt-3" placeholder="Activities (e.g., game drive, city tour, snorkeling)" value={item.activities} onChange={(e) => updateItem(item.id, "activities", e.target.value)} />
                    </div>
                  ))}
                </div>

                <Button variant="outline" onClick={addItem} className="mt-4 rounded-full">
                  <Plus className="mr-2 h-4 w-4" /> Add Stop
                </Button>
              </div>
            </div>

            {/* Suggestions Sidebar */}
            <div>
              <div className="sticky top-28 rounded-2xl border border-border bg-card p-6 shadow-sm">
                <h3 className="text-lg font-bold text-foreground">Suggested Packages</h3>
                {showSuggestions ? (
                  <div className="mt-4 flex flex-col gap-4">
                    {suggestedPackages.map((pkg) => (
                      <div key={pkg.name} className="rounded-xl border border-border bg-secondary p-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-foreground">{pkg.name}</span>
                          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary">{pkg.match}% match</span>
                        </div>
                        <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" /> {pkg.destinations}
                        </p>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">{pkg.days} days</span>
                          <span className="text-lg font-bold text-primary">${pkg.price}</span>
                        </div>
                        <Link href="/booking">
                          <Button size="sm" className="mt-3 w-full rounded-full bg-primary text-primary-foreground hover:bg-accent">
                            Book This <ArrowRight className="ml-1 h-3.5 w-3.5" />
                          </Button>
                        </Link>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="mt-4 text-center">
                    <Compass className="mx-auto h-12 w-12 text-muted-foreground/30" />
                    <p className="mt-3 text-sm text-muted-foreground">
                      Fill in your preferences and click &quot;Get Suggestions&quot; to see recommended packages.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
