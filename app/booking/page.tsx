"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import {
  CalendarDays, MapPin, Users, Minus, Plus, Check,
  Plane, Hotel, Compass, CreditCard, FileCheck, ChevronRight,
  ArrowLeft, ArrowRight, Shield, Wallet, Smartphone, Building
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

const steps = [
  { label: "Travel Details", icon: CalendarDays },
  { label: "Trip Options", icon: Compass },
  { label: "Your Info", icon: Users },
  { label: "Payment", icon: CreditCard },
  { label: "Terms", icon: FileCheck },
  { label: "Confirmed", icon: Check },
]

const allDestinations = [
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

const paymentMethods = [
  { id: "visa", label: "Visa / Mastercard", icon: CreditCard, desc: "Pay securely with your credit or debit card" },
  { id: "ecocash", label: "EcoCash", icon: Smartphone, desc: "Mobile money payment via EcoCash" },
  { id: "zimswitch", label: "ZimSwitch", icon: Building, desc: "Direct bank transfer via ZimSwitch" },
  { id: "paynow", label: "PayNow", icon: Wallet, desc: "Online payment through PayNow Zimbabwe" },
  { id: "bank", label: "Bank Transfer", icon: Building, desc: "Direct bank deposit or wire transfer" },
]

export default function BookingPage() {
  const searchParams = useSearchParams()
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState<"next" | "prev">("next")
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
  const [paymentMethod, setPaymentMethod] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [cardExpiry, setCardExpiry] = useState("")
  const [cardCVC, setCardCVC] = useState("")
  const [ecocashNumber, setEcocashNumber] = useState("")

  // Pre-fill from search params
  useEffect(() => {
    const ci = searchParams.get("checkIn")
    const co = searchParams.get("checkOut")
    const dests = searchParams.get("destinations")
    const a = searchParams.get("adults")
    const c = searchParams.get("children")

    if (ci) setCheckIn(ci)
    if (co) setCheckOut(co)
    if (dests) setSelectedDests(dests.split(",").filter(Boolean))
    if (a) setAdults(parseInt(a) || 2)
    if (c) setChildren(parseInt(c) || 0)
  }, [searchParams])

  function toggleDest(d: string) {
    setSelectedDests((prev) => prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d])
  }
  function toggleActivity(a: string) {
    setActivities((prev) => prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a])
  }
  function toggleTransport(t: string) {
    setTransport((prev) => prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t])
  }

  function goNext() {
    setDirection("next")
    setStep((s) => Math.min(steps.length - 1, s + 1))
  }
  function goPrev() {
    setDirection("prev")
    setStep((s) => Math.max(0, s - 1))
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
      <section className="bg-primary py-14">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h1 className="font-serif text-3xl font-bold text-primary-foreground md:text-5xl animate-fade-in-up">Book Your Trip</h1>
          <p className="mx-auto mt-3 max-w-xl text-primary-foreground/80 animate-fade-in-up [animation-delay:200ms]">
            Complete the steps below to book your dream travel experience.
          </p>
        </div>
      </section>

      <section className="bg-background py-10">
        <div className="mx-auto max-w-4xl px-4">
          {/* Progress Bar */}
          <div className="mb-10 hidden items-center justify-between sm:flex">
            {steps.map((s, i) => (
              <div key={s.label} className="flex flex-1 items-center">
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => { if (i < step) { setDirection("prev"); setStep(i); } }}
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all duration-300 ${
                      i < step
                        ? "bg-primary text-primary-foreground scale-100"
                        : i === step
                        ? "bg-primary text-primary-foreground ring-4 ring-primary/20 scale-110"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {i < step ? <Check className="h-5 w-5" /> : <s.icon className="h-5 w-5" />}
                  </button>
                  <span className={`mt-2 text-xs font-medium transition-colors ${i <= step ? "text-primary" : "text-muted-foreground"}`}>
                    {s.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className="relative mx-2 h-0.5 flex-1 overflow-hidden bg-border">
                    <div
                      className="absolute inset-y-0 left-0 bg-primary transition-all duration-500"
                      style={{ width: i < step ? "100%" : "0%" }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile step indicator */}
          <div className="mb-6 flex items-center justify-between sm:hidden">
            <span className="text-sm font-medium text-muted-foreground">Step {step + 1} of {steps.length}</span>
            <span className="text-sm font-bold text-primary">{steps[step].label}</span>
          </div>

          {/* Step Content with animation */}
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <div
              key={step}
              className={`p-6 md:p-8 ${direction === "next" ? "animate-slide-in-right" : "animate-slide-in-left"}`}
            >
              {/* Step 1 - Travel Details */}
              {step === 0 && (
                <div className="flex flex-col gap-6">
                  <h2 className="text-2xl font-bold text-foreground">Travel Dates & Destinations</h2>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                      <Label>Check-in Date</Label>
                      <div className="relative">
                        <CalendarDays className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="h-11 rounded-xl pl-10" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label>Check-out Date</Label>
                      <div className="relative">
                        <CalendarDays className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="h-11 rounded-xl pl-10" />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label>Destinations (select multiple)</Label>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                      {allDestinations.map((d) => (
                        <button
                          key={d}
                          onClick={() => toggleDest(d)}
                          className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-sm transition-all duration-200 ${
                            selectedDests.includes(d)
                              ? "border-primary bg-primary/10 text-primary font-medium shadow-sm"
                              : "border-border text-foreground hover:bg-secondary hover:border-primary/30"
                          }`}
                        >
                          <MapPin className="h-3.5 w-3.5 shrink-0" />
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
                        <div key={label} className="flex items-center justify-between rounded-xl border border-border p-3">
                          <div>
                            <p className="text-sm font-medium text-foreground">{label}</p>
                            <p className="text-xs text-muted-foreground">{desc}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button onClick={() => set(Math.max(min, value - 1))} disabled={value <= min} className="flex h-8 w-8 items-center justify-center rounded-full border border-border transition-colors hover:bg-primary hover:text-primary-foreground hover:border-primary disabled:opacity-30" aria-label={`Decrease ${label}`}>
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="w-6 text-center font-semibold text-foreground">{value}</span>
                            <button onClick={() => set(value + 1)} className="flex h-8 w-8 items-center justify-center rounded-full border border-border transition-colors hover:bg-primary hover:text-primary-foreground hover:border-primary" aria-label={`Increase ${label}`}>
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
                  <div>
                    <h3 className="mb-3 text-lg font-semibold text-foreground">Accommodation</h3>
                    <div className="grid gap-3 sm:grid-cols-3">
                      {accommodationOptions.map((a) => (
                        <button
                          key={a.id}
                          onClick={() => setAccommodation(a.id)}
                          className={`flex flex-col rounded-xl border p-4 text-left transition-all duration-200 ${
                            accommodation === a.id
                              ? "border-primary bg-primary/5 ring-2 ring-primary/20 shadow-md"
                              : "border-border hover:border-primary/30 hover:shadow-sm"
                          }`}
                        >
                          <Hotel className={`h-5 w-5 transition-colors ${accommodation === a.id ? "text-primary" : "text-muted-foreground"}`} />
                          <p className="mt-2 font-semibold text-foreground">{a.label}</p>
                          <p className="text-xs text-muted-foreground">{a.desc}</p>
                          <p className="mt-2 text-lg font-bold text-primary">${a.price}<span className="text-xs font-normal text-muted-foreground">/night/person</span></p>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-3 text-lg font-semibold text-foreground">Activities & Experiences</h3>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {activityOptions.map((a) => (
                        <button
                          key={a.id}
                          onClick={() => toggleActivity(a.id)}
                          className={`flex items-center justify-between rounded-xl border p-4 transition-all duration-200 ${
                            activities.includes(a.id)
                              ? "border-primary bg-primary/5 shadow-sm"
                              : "border-border hover:border-primary/30"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`flex h-5 w-5 items-center justify-center rounded border transition-colors ${activities.includes(a.id) ? "border-primary bg-primary" : "border-border"}`}>
                              {activities.includes(a.id) && <Check className="h-3 w-3 text-primary-foreground" />}
                            </div>
                            <span className="font-medium text-foreground">{a.label}</span>
                          </div>
                          <span className="text-sm font-bold text-primary">${a.price}<span className="text-xs font-normal text-muted-foreground">/person</span></span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-3 text-lg font-semibold text-foreground">Transportation</h3>
                    <div className="grid gap-3 sm:grid-cols-3">
                      {transportOptions.map((t) => (
                        <button
                          key={t.id}
                          onClick={() => toggleTransport(t.id)}
                          className={`flex flex-col items-center rounded-xl border p-4 text-center transition-all duration-200 ${
                            transport.includes(t.id)
                              ? "border-primary bg-primary/5 shadow-sm"
                              : "border-border hover:border-primary/30"
                          }`}
                        >
                          <Plane className={`h-5 w-5 transition-colors ${transport.includes(t.id) ? "text-primary" : "text-muted-foreground"}`} />
                          <p className="mt-2 text-sm font-medium text-foreground">{t.label}</p>
                          <p className="text-sm font-bold text-primary">${t.price}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3 - Traveler Info + Price Summary */}
              {step === 2 && (
                <div className="flex flex-col gap-6">
                  <h2 className="text-2xl font-bold text-foreground">Your Information</h2>
                  <div className="flex flex-col gap-6 lg:flex-row">
                    <div className="flex-1">
                      <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1.5">
                          <Label>Full Name</Label>
                          <Input value={travelerName} onChange={(e) => setTravelerName(e.target.value)} placeholder="John Doe" className="h-11 rounded-xl" />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <Label>Email</Label>
                          <Input type="email" value={travelerEmail} onChange={(e) => setTravelerEmail(e.target.value)} placeholder="john@example.com" className="h-11 rounded-xl" />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <Label>Phone</Label>
                          <Input type="tel" value={travelerPhone} onChange={(e) => setTravelerPhone(e.target.value)} placeholder="+263 7XX XXX XXX" className="h-11 rounded-xl" />
                        </div>
                      </div>
                    </div>
                    <div className="w-full rounded-xl border border-border bg-secondary/50 p-6 lg:w-80">
                      <h3 className="text-lg font-semibold text-foreground">Cost Breakdown</h3>
                      <div className="mt-4 flex flex-col gap-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Accommodation ({days} nights x {travelers} ppl)</span>
                          <span className="font-medium text-foreground">${accPrice}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Activities ({activities.length})</span>
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

              {/* Step 4 - Payment Method */}
              {step === 3 && (
                <div className="flex flex-col gap-6">
                  <h2 className="text-2xl font-bold text-foreground">Payment Method</h2>
                  <p className="text-muted-foreground">Choose your preferred payment method to complete the booking.</p>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {paymentMethods.map((pm) => (
                      <button
                        key={pm.id}
                        onClick={() => setPaymentMethod(pm.id)}
                        className={`flex flex-col items-center rounded-xl border p-5 text-center transition-all duration-200 ${
                          paymentMethod === pm.id
                            ? "border-primary bg-primary/5 ring-2 ring-primary/20 shadow-md"
                            : "border-border hover:border-primary/30 hover:shadow-sm"
                        }`}
                      >
                        <div className={`flex h-12 w-12 items-center justify-center rounded-xl transition-colors ${paymentMethod === pm.id ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>
                          <pm.icon className="h-6 w-6" />
                        </div>
                        <p className="mt-3 font-semibold text-foreground">{pm.label}</p>
                        <p className="mt-1 text-xs text-muted-foreground">{pm.desc}</p>
                      </button>
                    ))}
                  </div>

                  {/* Payment details */}
                  {paymentMethod === "visa" && (
                    <div className="rounded-xl border border-border bg-secondary/30 p-6 animate-fade-in">
                      <h3 className="mb-4 font-semibold text-foreground">Card Details</h3>
                      <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1.5">
                          <Label>Card Number</Label>
                          <Input value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} placeholder="4242 4242 4242 4242" className="h-11 rounded-xl font-mono" maxLength={19} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex flex-col gap-1.5">
                            <Label>Expiry Date</Label>
                            <Input value={cardExpiry} onChange={(e) => setCardExpiry(e.target.value)} placeholder="MM/YY" className="h-11 rounded-xl" maxLength={5} />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <Label>CVC</Label>
                            <Input value={cardCVC} onChange={(e) => setCardCVC(e.target.value)} placeholder="123" className="h-11 rounded-xl" maxLength={4} type="password" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === "ecocash" && (
                    <div className="rounded-xl border border-border bg-secondary/30 p-6 animate-fade-in">
                      <h3 className="mb-4 font-semibold text-foreground">EcoCash Details</h3>
                      <div className="flex flex-col gap-1.5">
                        <Label>EcoCash Mobile Number</Label>
                        <Input value={ecocashNumber} onChange={(e) => setEcocashNumber(e.target.value)} placeholder="077X XXX XXXX" className="h-11 rounded-xl" />
                      </div>
                      <p className="mt-3 text-sm text-muted-foreground">You will receive a payment prompt on your phone to approve the transaction.</p>
                    </div>
                  )}

                  {(paymentMethod === "zimswitch" || paymentMethod === "bank") && (
                    <div className="rounded-xl border border-border bg-secondary/30 p-6 animate-fade-in">
                      <h3 className="mb-4 font-semibold text-foreground">Bank Transfer Details</h3>
                      <div className="flex flex-col gap-2 text-sm">
                        <div className="flex justify-between"><span className="text-muted-foreground">Bank:</span><span className="font-medium text-foreground">CBZ Bank</span></div>
                        <div className="flex justify-between"><span className="text-muted-foreground">Account:</span><span className="font-mono font-medium text-foreground">0123456789</span></div>
                        <div className="flex justify-between"><span className="text-muted-foreground">Branch:</span><span className="font-medium text-foreground">Harare Main</span></div>
                        <div className="flex justify-between"><span className="text-muted-foreground">Reference:</span><span className="font-mono font-medium text-primary">IMP-{Date.now().toString(36).toUpperCase()}</span></div>
                      </div>
                      <p className="mt-3 text-sm text-muted-foreground">Please use the reference number above when making your transfer.</p>
                    </div>
                  )}

                  {paymentMethod === "paynow" && (
                    <div className="rounded-xl border border-border bg-secondary/30 p-6 animate-fade-in">
                      <h3 className="mb-4 font-semibold text-foreground">PayNow</h3>
                      <p className="text-sm text-muted-foreground">You will be redirected to the PayNow payment gateway to complete your transaction securely.</p>
                    </div>
                  )}

                  <div className="flex items-center gap-2 rounded-xl bg-primary/5 px-4 py-3 text-sm text-primary">
                    <Shield className="h-4 w-4 shrink-0" />
                    <span>All payments are encrypted and processed securely. Your financial data is never stored on our servers.</span>
                  </div>
                </div>
              )}

              {/* Step 5 - Terms */}
              {step === 4 && (
                <div className="flex flex-col gap-6">
                  <h2 className="text-2xl font-bold text-foreground">Terms & Conditions</h2>
                  <div className="max-h-72 overflow-y-auto rounded-xl border border-border bg-secondary/30 p-6 text-sm leading-relaxed text-muted-foreground">
                    <h3 className="mb-3 text-base font-semibold text-foreground">Travel Terms</h3>
                    <p>By booking with Impala Travel Agency, you agree to the following:</p>
                    <ul className="mt-3 flex flex-col gap-2 pl-4">
                      <li>1. All bookings are subject to availability and confirmation.</li>
                      <li>2. Cancellations within 48 hours of departure are non-refundable.</li>
                      <li>3. Cancellations 7+ days before departure receive a full refund less 10% admin fee.</li>
                      <li>4. Travel insurance is strongly recommended for all travelers.</li>
                      <li>5. Impala Travel is not liable for delays caused by weather, strikes, or force majeure.</li>
                      <li>6. All travelers must possess valid travel documents (passport, visa, etc.).</li>
                      <li>7. Prices are subject to change based on currency fluctuations.</li>
                      <li>8. Package modifications may incur additional charges.</li>
                    </ul>
                    <h3 className="mb-3 mt-6 text-base font-semibold text-foreground">Privacy Policy</h3>
                    <p>Your personal information is collected solely for processing your booking and will not be shared with third parties except as required to complete your travel arrangements.</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Checkbox id="terms" checked={termsAccepted} onCheckedChange={(checked) => setTermsAccepted(checked === true)} />
                    <Label htmlFor="terms" className="text-sm text-foreground cursor-pointer">
                      I have read and agree to the Terms & Conditions and Privacy Policy.
                    </Label>
                  </div>
                </div>
              )}

              {/* Step 6 - Confirmation */}
              {step === 5 && (
                <div className="flex flex-col items-center gap-6 py-8 text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground animate-scale-in">
                    <Check className="h-10 w-10" />
                  </div>
                  <h2 className="text-3xl font-bold text-foreground animate-fade-in-up">Booking Confirmed!</h2>
                  <p className="max-w-md text-muted-foreground animate-fade-in-up [animation-delay:200ms]">
                    Thank you, {travelerName || "traveler"}! Your booking has been confirmed. A confirmation email has been sent to {travelerEmail || "your email"}.
                  </p>
                  <div className="w-full max-w-md rounded-xl border border-border bg-secondary/30 p-6 text-left animate-fade-in-up [animation-delay:400ms]">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Booking Summary</h3>
                    <div className="mt-4 flex flex-col gap-2 text-sm">
                      <div className="flex justify-between"><span className="text-muted-foreground">Destinations:</span><span className="font-medium text-foreground">{selectedDests.join(", ") || "Not selected"}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">Dates:</span><span className="font-medium text-foreground">{checkIn || "N/A"} to {checkOut || "N/A"}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">Travelers:</span><span className="font-medium text-foreground">{adults} adults, {children} children, {infants} infants</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">Payment:</span><span className="font-medium text-foreground">{paymentMethods.find((p) => p.id === paymentMethod)?.label || "Not selected"}</span></div>
                      <div className="flex justify-between border-t border-border pt-2"><span className="font-bold text-foreground">Total Paid:</span><span className="text-lg font-bold text-primary">${total}</span></div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3 animate-fade-in-up [animation-delay:600ms]">
                    <Link href="/documents">
                      <Button className="rounded-full bg-primary text-primary-foreground hover:bg-accent">
                        Upload Documents
                      </Button>
                    </Link>
                    <Link href="/dashboard">
                      <Button variant="outline" className="rounded-full">
                        Go to Dashboard
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            {step < 5 && (
              <div className="flex items-center justify-between border-t border-border px-6 py-4 md:px-8">
                <Button
                  variant="outline"
                  onClick={goPrev}
                  disabled={step === 0}
                  className="rounded-full transition-all duration-200 hover:-translate-x-0.5"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button
                  onClick={goNext}
                  disabled={step === 4 && !termsAccepted}
                  className="rounded-full bg-primary px-8 text-primary-foreground transition-all duration-200 hover:bg-accent hover:-translate-y-0.5 hover:shadow-md"
                >
                  {step === 4 ? "Confirm & Pay" : "Continue"}
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
