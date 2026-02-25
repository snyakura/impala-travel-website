"use client"

import { useState } from "react"
import {
  CalendarDays, MapPin, Users, Minus, Plus, Check,
  Plane, Hotel, Compass, CreditCard, FileCheck, ChevronRight,
  ArrowLeft, ArrowRight, Shield
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"

const steps = [
  { label: "Travel Details", icon: CalendarDays },
  { label: "Trip Options", icon: Compass },
  { label: "Price Summary", icon: CreditCard },
  { label: "Terms", icon: FileCheck },
  { label: "Confirmation", icon: Check },
]

const destinations = [
  "Victoria Falls", "Hwange National Park", "Great Zimbabwe", "Kariba",
  "Mana Pools", "Nyanga", "Cape Town", "Zanzibar", "Kruger National Park", "Masai Mara",
]

const accommodationOptions = [
  { id: "budget", label: "Budget Lodging", price: 45, desc: "Clean, comfortable, and affordable" },
  { id: "standard", label: "Standard Hotel", price: 120, desc: "Well-appointed rooms with amenities" },
  { id: "luxury", label: "Luxury Resort", price: 350, desc: "Premium all-inclusive experience" },
]

const activityOptions = [
  { id: "safari", label: "Game Drive Safari", price: 85 },
  { id: "boat", label: "Sunset Boat Cruise", price: 55 },
  { id: "hike", label: "Guided Nature Walk", price: 35 },
  { id: "cultural", label: "Cultural Village Visit", price: 40 },
  { id: "bungee", label: "Bungee Jumping", price: 120 },
  { id: "helicopter", label: "Helicopter Tour", price: 250 },
]

const transportOptions = [
  { id: "shuttle", label: "Airport Shuttle", price: 25 },
  { id: "rental", label: "Car Rental (per day)", price: 65 },
  { id: "charter", label: "Charter Flight", price: 450 },
]

export default function BookingPage() {
  const [step, setStep] = useState(0)
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [selectedDests, setSelectedDests] = useState<string[]>([])
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)
  const [infants, setInfants] = useState(0)
  const [accommodation, setAccommodation] = useState("standard")
  const [activities, setActivities] = useState<string[]>([])
  const [transport, setTransport] = useState<string[]>([])
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [travelerName, setTravelerName] = useState("")
  const [travelerEmail, setTravelerEmail] = useState("")
  const [travelerPhone, setTravelerPhone] = useState("")

  function toggleDest(d: string) {
    setSelectedDests((prev) => prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d])
  }
  function toggleActivity(a: string) {
    setActivities((prev) => prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a])
  }
  function toggleTransport(t: string) {
    setTransport((prev) => prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t])
  }

  const days = checkIn && checkOut ? Math.max(1, Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24))) : 1
  const travelers = adults + children
  const accPrice = (accommodationOptions.find((a) => a.id === accommodation)?.price || 0) * days * travelers
  const actPrice = activities.reduce((sum, id) => sum + (activityOptions.find((a) => a.id === id)?.price || 0), 0) * travelers
  const transPrice = transport.reduce((sum, id) => sum + (transportOptions.find((t) => t.id === id)?.price || 0), 0)
  const subtotal = accPrice + actPrice + transPrice
  const taxes = Math.round(subtotal * 0.15)
  const total = subtotal + taxes

  return (
    <>
      {/* Hero */}
      <section className="bg-primary py-16">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h1 className="font-serif text-4xl font-bold text-primary-foreground md:text-5xl">Book Your Trip</h1>
          <p className="mx-auto mt-3 max-w-xl text-primary-foreground/80">
            Complete the steps below to book your dream travel experience.
          </p>
        </div>
      </section>

      <section className="bg-background py-12">
        <div className="mx-auto max-w-4xl px-4">
          {/* Progress Bar */}
          <div className="mb-12 flex items-center justify-between">
            {steps.map((s, i) => (
              <div key={s.label} className="flex flex-1 items-center">
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => i < step && setStep(i)}
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-colors ${
                      i < step
                        ? "bg-primary text-primary-foreground"
                        : i === step
                        ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {i < step ? <Check className="h-5 w-5" /> : <s.icon className="h-5 w-5" />}
                  </button>
                  <span className={`mt-2 text-xs font-medium ${i <= step ? "text-primary" : "text-muted-foreground"}`}>
                    {s.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`mx-2 h-0.5 flex-1 ${i < step ? "bg-primary" : "bg-border"}`} />
                )}
              </div>
            ))}
          </div>

          {/* Step Content */}
          <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
            {/* Step 1 - Travel Details */}
            {step === 0 && (
              <div className="flex flex-col gap-6">
                <h2 className="text-2xl font-bold text-foreground">Travel Dates & Destinations</h2>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <Label>Check-in Date</Label>
                    <div className="relative">
                      <CalendarDays className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="pl-10" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label>Check-out Date</Label>
                    <div className="relative">
                      <CalendarDays className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="pl-10" />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label>Destinations (select multiple)</Label>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {destinations.map((d) => (
                      <button
                        key={d}
                        onClick={() => toggleDest(d)}
                        className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors ${
                          selectedDests.includes(d)
                            ? "border-primary bg-primary/10 text-primary font-medium"
                            : "border-border text-foreground hover:bg-secondary"
                        }`}
                      >
                        <MapPin className="h-3.5 w-3.5" />
                        {d}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <Label>Travelers</Label>
                  <div className="grid gap-4 sm:grid-cols-3">
                    {[
                      { label: "Adults", desc: "Age 13+", value: adults, set: setAdults, min: 1 },
                      { label: "Children", desc: "Age 2-12", value: children, set: setChildren, min: 0 },
                      { label: "Infants", desc: "Under 2", value: infants, set: setInfants, min: 0 },
                    ].map(({ label, desc, value, set, min }) => (
                      <div key={label} className="flex items-center justify-between rounded-lg border border-border p-3">
                        <div>
                          <p className="text-sm font-medium text-foreground">{label}</p>
                          <p className="text-xs text-muted-foreground">{desc}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button onClick={() => set(Math.max(min, value - 1))} className="flex h-8 w-8 items-center justify-center rounded-full border border-border hover:bg-secondary" aria-label={`Decrease ${label}`}>
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-6 text-center font-medium text-foreground">{value}</span>
                          <button onClick={() => set(value + 1)} className="flex h-8 w-8 items-center justify-center rounded-full border border-border hover:bg-secondary" aria-label={`Increase ${label}`}>
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2 - Trip Options */}
            {step === 1 && (
              <div className="flex flex-col gap-8">
                <h2 className="text-2xl font-bold text-foreground">Choose Your Trip Options</h2>
                {/* Accommodation */}
                <div>
                  <h3 className="mb-3 text-lg font-semibold text-foreground">Accommodation</h3>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {accommodationOptions.map((a) => (
                      <button
                        key={a.id}
                        onClick={() => setAccommodation(a.id)}
                        className={`flex flex-col rounded-xl border p-4 text-left transition-colors ${
                          accommodation === a.id
                            ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                            : "border-border hover:border-primary/30"
                        }`}
                      >
                        <Hotel className={`h-5 w-5 ${accommodation === a.id ? "text-primary" : "text-muted-foreground"}`} />
                        <p className="mt-2 font-semibold text-foreground">{a.label}</p>
                        <p className="text-xs text-muted-foreground">{a.desc}</p>
                        <p className="mt-2 text-lg font-bold text-primary">${a.price}<span className="text-xs font-normal text-muted-foreground">/night/person</span></p>
                      </button>
                    ))}
                  </div>
                </div>
                {/* Activities */}
                <div>
                  <h3 className="mb-3 text-lg font-semibold text-foreground">Activities & Experiences</h3>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {activityOptions.map((a) => (
                      <button
                        key={a.id}
                        onClick={() => toggleActivity(a.id)}
                        className={`flex items-center justify-between rounded-xl border p-4 transition-colors ${
                          activities.includes(a.id)
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/30"
                        }`}
                      >
                        <span className="font-medium text-foreground">{a.label}</span>
                        <span className="text-sm font-bold text-primary">${a.price}<span className="text-xs font-normal text-muted-foreground">/person</span></span>
                      </button>
                    ))}
                  </div>
                </div>
                {/* Transport */}
                <div>
                  <h3 className="mb-3 text-lg font-semibold text-foreground">Transportation</h3>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {transportOptions.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => toggleTransport(t.id)}
                        className={`flex flex-col items-center rounded-xl border p-4 text-center transition-colors ${
                          transport.includes(t.id)
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/30"
                        }`}
                      >
                        <Plane className={`h-5 w-5 ${transport.includes(t.id) ? "text-primary" : "text-muted-foreground"}`} />
                        <p className="mt-2 text-sm font-medium text-foreground">{t.label}</p>
                        <p className="text-sm font-bold text-primary">${t.price}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3 - Price Summary */}
            {step === 2 && (
              <div className="flex flex-col gap-6">
                <h2 className="text-2xl font-bold text-foreground">Price Summary</h2>
                <div className="flex flex-col gap-6 lg:flex-row">
                  <div className="flex-1">
                    <h3 className="mb-3 text-lg font-semibold text-foreground">Traveler Information</h3>
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col gap-1.5">
                        <Label>Full Name</Label>
                        <Input value={travelerName} onChange={(e) => setTravelerName(e.target.value)} placeholder="John Doe" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <Label>Email</Label>
                        <Input type="email" value={travelerEmail} onChange={(e) => setTravelerEmail(e.target.value)} placeholder="john@example.com" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <Label>Phone</Label>
                        <Input type="tel" value={travelerPhone} onChange={(e) => setTravelerPhone(e.target.value)} placeholder="+263 7XX XXX XXX" />
                      </div>
                    </div>
                  </div>
                  <div className="w-full rounded-xl border border-border bg-secondary p-6 lg:w-80">
                    <h3 className="text-lg font-semibold text-foreground">Cost Breakdown</h3>
                    <div className="mt-4 flex flex-col gap-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Accommodation ({days} nights x {travelers} ppl)</span>
                        <span className="font-medium text-foreground">${accPrice}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Activities ({activities.length} selected)</span>
                        <span className="font-medium text-foreground">${actPrice}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Transportation</span>
                        <span className="font-medium text-foreground">${transPrice}</span>
                      </div>
                      <div className="border-t border-border pt-3">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Subtotal</span>
                          <span className="font-medium text-foreground">${subtotal}</span>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Taxes & Fees (15%)</span>
                        <span className="font-medium text-foreground">${taxes}</span>
                      </div>
                      <div className="border-t border-border pt-3">
                        <div className="flex justify-between text-lg font-bold">
                          <span className="text-foreground">Total</span>
                          <span className="text-primary">${total}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4 - Terms */}
            {step === 3 && (
              <div className="flex flex-col gap-6">
                <h2 className="text-2xl font-bold text-foreground">Terms & Conditions</h2>
                <div className="max-h-80 overflow-y-auto rounded-xl border border-border bg-secondary p-6 text-sm leading-relaxed text-muted-foreground">
                  <h3 className="mb-3 text-lg font-semibold text-foreground">Travel Terms</h3>
                  <p>By booking with Impala Travel Agency, you agree to the following terms and conditions:</p>
                  <ul className="mt-3 flex flex-col gap-2 pl-4">
                    <li>1. All bookings are subject to availability and confirmation.</li>
                    <li>2. Cancellations made within 48 hours of departure are non-refundable.</li>
                    <li>3. Cancellations made 7+ days before departure will receive a full refund less a 10% administrative fee.</li>
                    <li>4. Travel insurance is strongly recommended for all travelers.</li>
                    <li>5. Impala Travel Agency is not liable for delays caused by weather, strikes, or force majeure events.</li>
                    <li>6. All travelers must possess valid travel documents (passport, visa, etc.).</li>
                    <li>7. Prices are subject to change based on currency fluctuations and availability.</li>
                    <li>8. Package modifications may incur additional charges.</li>
                  </ul>
                  <h3 className="mb-3 mt-6 text-lg font-semibold text-foreground">Privacy Policy</h3>
                  <p>Your personal information is collected solely for the purpose of processing your booking and will not be shared with third parties except as required to complete your travel arrangements.</p>
                  <h3 className="mb-3 mt-6 text-lg font-semibold text-foreground">Insurance Disclaimer</h3>
                  <p>Impala Travel Agency recommends purchasing comprehensive travel insurance. We do not assume responsibility for medical expenses, trip cancellation costs, or lost/damaged baggage unless covered by an insurance policy arranged through our agency.</p>
                </div>
                <div className="flex items-center gap-3">
                  <Checkbox
                    id="terms"
                    checked={termsAccepted}
                    onCheckedChange={(checked) => setTermsAccepted(checked === true)}
                  />
                  <Label htmlFor="terms" className="text-sm text-foreground">
                    I have read and agree to the Terms & Conditions, Privacy Policy, and Insurance Disclaimer.
                  </Label>
                </div>
              </div>
            )}

            {/* Step 5 - Confirmation */}
            {step === 4 && (
              <div className="flex flex-col items-center gap-6 py-8 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check className="h-10 w-10" />
                </div>
                <h2 className="text-3xl font-bold text-foreground">Booking Confirmed!</h2>
                <p className="max-w-md text-muted-foreground">
                  Thank you, {travelerName || "traveler"}! Your booking has been confirmed. A confirmation
                  email has been sent to {travelerEmail || "your email"}.
                </p>
                <div className="w-full max-w-md rounded-xl border border-border bg-secondary p-6 text-left">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Booking Summary</h3>
                  <div className="mt-4 flex flex-col gap-2 text-sm">
                    <div className="flex justify-between"><span className="text-muted-foreground">Destinations:</span><span className="font-medium text-foreground">{selectedDests.join(", ") || "Not selected"}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Dates:</span><span className="font-medium text-foreground">{checkIn || "N/A"} to {checkOut || "N/A"}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Travelers:</span><span className="font-medium text-foreground">{adults} adults, {children} children, {infants} infants</span></div>
                    <div className="flex justify-between border-t border-border pt-2"><span className="font-bold text-foreground">Total Paid:</span><span className="text-lg font-bold text-primary">${total}</span></div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield className="h-4 w-4" />
                  <span>Payment processed securely</span>
                </div>

                {/* Payment Badges */}
                <div className="flex flex-wrap items-center justify-center gap-4">
                  {["Visa", "Mastercard", "EcoCash", "ZimSwitch", "PayNow"].map((p) => (
                    <span key={p} className="rounded-lg border border-border bg-card px-4 py-2 text-xs font-semibold text-muted-foreground">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            {step < 4 && (
              <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
                <Button
                  variant="outline"
                  onClick={() => setStep(Math.max(0, step - 1))}
                  disabled={step === 0}
                  className="rounded-full"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button
                  onClick={() => setStep(Math.min(4, step + 1))}
                  disabled={step === 3 && !termsAccepted}
                  className="rounded-full bg-primary px-8 text-primary-foreground hover:bg-accent"
                >
                  {step === 3 ? "Confirm & Pay" : "Continue"}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
