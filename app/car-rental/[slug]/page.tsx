"use client"

import Image from "next/image"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import {
  Car, Users, Shield, Clock, Check, ChevronLeft, ArrowRight,
  MapPin, Star, Fuel, Settings2, Phone
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const services: Record<string, {
  name: string; tagline: string; image: string; description: string;
  longDescription: string; features: string[]; vehicles: { name: string; seats: number; price: number; image: string; features: string[] }[];
  faqs: { q: string; a: string }[]
}> = {
  "self-drive": {
    name: "Self Drive Rentals",
    tagline: "Freedom to explore at your own pace",
    image: "/images/self-drive.jpg",
    description: "Rent the vehicle of your choice from our large selection and drive to your destination in comfort and style.",
    longDescription: "Our self-drive rental service gives you the ultimate freedom to explore Zimbabwe and the surrounding region at your own pace. Choose from our extensive fleet of well-maintained vehicles ranging from compact sedans to rugged 4x4s. All vehicles come fully insured, with 24/7 roadside assistance, and unlimited mileage options available.",
    features: ["Comprehensive insurance included", "24/7 roadside assistance", "GPS navigation system", "Unlimited mileage options", "Airport pickup and drop-off", "Flexible rental periods", "Well-maintained vehicles", "Child seats available"],
    vehicles: [
      { name: "Toyota Corolla", seats: 5, price: 45, image: "/images/self-drive.jpg", features: ["AC", "Automatic", "Bluetooth"] },
      { name: "Toyota Hilux Double Cab", seats: 5, price: 85, image: "/images/self-drive.jpg", features: ["4x4", "AC", "Manual"] },
      { name: "Toyota Fortuner", seats: 7, price: 95, image: "/images/self-drive.jpg", features: ["4x4", "AC", "Automatic"] },
      { name: "Toyota Quantum", seats: 14, price: 120, image: "/images/self-drive.jpg", features: ["AC", "Manual", "Group"] },
    ],
    faqs: [
      { q: "What documents do I need?", a: "A valid driver's license, passport or national ID, and a credit/debit card for the deposit." },
      { q: "Is there a minimum rental period?", a: "Yes, the minimum rental period is 24 hours." },
      { q: "What happens in case of a breakdown?", a: "Call our 24/7 roadside assistance number and we will have a replacement vehicle to you within hours." },
    ],
  },
  "chauffeur": {
    name: "Chauffeur Driven Rentals",
    tagline: "Travel in luxury with a professional driver",
    image: "/images/chauffeur.jpg",
    description: "Our specially trained drivers provide a professional, punctual, and comfortable experience wherever you need to go.",
    longDescription: "Experience the ultimate in comfort and convenience with our chauffeur-driven service. Our professionally trained drivers are knowledgeable, courteous, and dedicated to providing you with a seamless travel experience. Whether it is a business meeting, special event, or leisure trip, our chauffeur service ensures you arrive in style.",
    features: ["Professional certified drivers", "Luxury vehicle fleet", "Meet and greet service", "Flexible scheduling", "Corporate accounts available", "Multilingual drivers", "Real-time trip tracking", "Complimentary refreshments"],
    vehicles: [
      { name: "Mercedes E-Class", seats: 4, price: 150, image: "/images/chauffeur.jpg", features: ["Luxury", "AC", "WiFi"] },
      { name: "Toyota Land Cruiser V8", seats: 7, price: 200, image: "/images/chauffeur.jpg", features: ["4x4", "Luxury", "AC"] },
      { name: "Mercedes V-Class", seats: 7, price: 180, image: "/images/chauffeur.jpg", features: ["Luxury", "AC", "WiFi"] },
    ],
    faqs: [
      { q: "Can I request a specific driver?", a: "Yes, if you have used our service before, you can request the same driver subject to availability." },
      { q: "Are the drivers vetted?", a: "All our drivers undergo rigorous background checks and defensive driving training." },
      { q: "Can the driver wait for me?", a: "Yes, our drivers will wait at your destination for as long as needed. Waiting time is included in the rate." },
    ],
  },
  "airport-transfers": {
    name: "Airport Transfers",
    tagline: "Seamless airport pickups and drop-offs",
    image: "/images/airport-transfer.jpg",
    description: "Never miss a flight or struggle with luggage. Get on the road right away with our efficient airport transfer service.",
    longDescription: "Our airport transfer service ensures stress-free travel to and from all major airports in Zimbabwe, including Harare International, Victoria Falls, Bulawayo, and Buffalo Range. Our drivers monitor flight schedules in real-time, so even if your flight is early or delayed, your driver will be there waiting with a name board.",
    features: ["Flight monitoring", "Meet and greet at arrivals", "Name board service", "Luggage assistance", "All major airports covered", "Fixed pricing - no surprises", "24/7 availability", "Comfortable vehicles"],
    vehicles: [
      { name: "Toyota Corolla (1-3 pax)", seats: 3, price: 35, image: "/images/airport-transfer.jpg", features: ["AC", "Sedan"] },
      { name: "Toyota Fortuner (1-5 pax)", seats: 5, price: 55, image: "/images/airport-transfer.jpg", features: ["SUV", "AC", "Spacious"] },
      { name: "Toyota Quantum (6-14 pax)", seats: 14, price: 85, image: "/images/airport-transfer.jpg", features: ["Minibus", "AC", "Group"] },
    ],
    faqs: [
      { q: "How early should I book?", a: "We recommend booking at least 24 hours in advance, though same-day bookings are often possible." },
      { q: "What if my flight is delayed?", a: "We monitor all flights in real-time and adjust pickup times automatically. No extra charge for delays." },
      { q: "Which airports do you cover?", a: "Harare International, Victoria Falls, Bulawayo Joshua Mqabuko Nkomo, and Buffalo Range airports." },
    ],
  },
  "shuttle": {
    name: "Shuttle Services",
    tagline: "Comfortable group transport for any occasion",
    image: "/images/shuttle.jpg",
    description: "Best for groups, we offer shuttle services between any destination in Zimbabwe with comfortable, reliable vehicles.",
    longDescription: "Our shuttle service provides comfortable, reliable, and affordable group transportation across Zimbabwe. Whether you need transport for a corporate event, wedding, conference, or regular inter-city travel, our modern fleet of shuttles and minibuses can accommodate groups of all sizes with comfort and punctuality.",
    features: ["Groups of 8 to 30+ passengers", "Inter-city routes", "Corporate event transport", "Wedding shuttles", "Conference transport", "Scheduled and charter options", "Professional drivers", "Climate-controlled vehicles"],
    vehicles: [
      { name: "Toyota Quantum (14 seater)", seats: 14, price: 100, image: "/images/shuttle.jpg", features: ["AC", "Comfortable", "Luggage space"] },
      { name: "Toyota Coaster (22 seater)", seats: 22, price: 180, image: "/images/shuttle.jpg", features: ["AC", "Reclining seats", "PA system"] },
      { name: "Full-size Coach (30+ seater)", seats: 35, price: 300, image: "/images/shuttle.jpg", features: ["AC", "TV", "Restroom"] },
    ],
    faqs: [
      { q: "Can I book a shuttle for a private event?", a: "Absolutely! We offer private charter shuttles for weddings, corporate events, and other occasions." },
      { q: "Do you offer regular scheduled routes?", a: "Yes, we operate scheduled services between Harare, Bulawayo, Victoria Falls, and other major cities." },
      { q: "Is there space for luggage?", a: "All our shuttles have dedicated luggage compartments with ample space for all passengers." },
    ],
  },
}

export default function CarRentalServicePage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  const service = services[slug]
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  if (!service) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4">
        <h1 className="text-2xl font-bold text-foreground">Service not found</h1>
        <p className="text-muted-foreground">The car rental service you are looking for does not exist.</p>
        <Link href="/services#car-rentals">
          <Button className="rounded-full bg-primary text-primary-foreground">View All Services</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative flex h-[50vh] min-h-[380px] items-center overflow-hidden">
        <Image src={service.image} alt={service.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6">
          <button
            onClick={() => router.back()}
            className="mb-6 flex items-center gap-1.5 rounded-full bg-card/20 px-4 py-1.5 text-sm text-card backdrop-blur-sm transition-colors hover:bg-card/30"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </button>
          <Badge className="mb-4 bg-primary/80 text-primary-foreground backdrop-blur-sm">Car Rental</Badge>
          <h1 className="mb-3 font-serif text-4xl font-bold text-card sm:text-5xl">{service.name}</h1>
          <p className="mb-6 max-w-xl text-lg text-card/80">{service.tagline}</p>
          <div className="flex flex-wrap gap-3">
            <Link href={`/booking?service=${slug}`}>
              <Button size="lg" className="rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-accent">
                Book Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <a href="tel:+263772302946">
              <Button size="lg" variant="outline" className="rounded-full border-card/30 text-card hover:bg-card/10">
                <Phone className="mr-2 h-4 w-4" /> Call Us
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-16 lg:grid-cols-3">
          {/* Main */}
          <div className="lg:col-span-2">
            {/* About */}
            <div className="mb-12">
              <h2 className="mb-4 text-2xl font-bold text-foreground">About This Service</h2>
              <p className="text-muted-foreground leading-relaxed">{service.longDescription}</p>
            </div>

            {/* Features */}
            <div className="mb-12">
              <h2 className="mb-6 text-2xl font-bold text-foreground">What You Get</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {service.features.map((f) => (
                  <div key={f} className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-all hover:shadow-md">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Vehicles */}
            <div className="mb-12">
              <h2 className="mb-6 text-2xl font-bold text-foreground">Available Vehicles</h2>
              <div className="grid gap-6 sm:grid-cols-2">
                {service.vehicles.map((v) => (
                  <div key={v.name} className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-xl">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image src={v.image} alt={v.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                    <div className="p-5">
                      <h3 className="mb-2 text-lg font-bold text-foreground">{v.name}</h3>
                      <div className="mb-3 flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {v.seats} seats</span>
                      </div>
                      <div className="mb-4 flex flex-wrap gap-1.5">
                        {v.features.map((f) => (
                          <Badge key={f} variant="secondary" className="text-xs">{f}</Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-2xl font-bold text-primary">${v.price}</span>
                          <span className="text-sm text-muted-foreground">/day</span>
                        </div>
                        <Link href={`/booking?service=${slug}&vehicle=${encodeURIComponent(v.name)}`}>
                          <Button className="rounded-full bg-primary text-primary-foreground hover:bg-accent">
                            Book
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div>
              <h2 className="mb-6 text-2xl font-bold text-foreground">Frequently Asked Questions</h2>
              <div className="space-y-3">
                {service.faqs.map((faq, i) => (
                  <div key={i} className="overflow-hidden rounded-xl border border-border bg-card transition-all">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="flex w-full items-center justify-between p-5 text-left font-medium text-foreground"
                    >
                      {faq.q}
                      <ChevronLeft className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 ${openFaq === i ? "-rotate-90" : "rotate-0"}`} />
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? "max-h-40 pb-5" : "max-h-0"}`}>
                      <p className="px-5 text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Quote */}
            <div className="sticky top-24 rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-bold text-foreground">Get a Quick Quote</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  router.push(`/booking?service=${slug}`)
                }}
                className="space-y-4"
              >
                <div>
                  <Label htmlFor="pickup" className="text-sm text-muted-foreground">Pickup Location</Label>
                  <Input id="pickup" placeholder="e.g. Harare Airport" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="dropoff" className="text-sm text-muted-foreground">Drop-off Location</Label>
                  <Input id="dropoff" placeholder="e.g. Victoria Falls" className="mt-1" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="pickup-date" className="text-sm text-muted-foreground">Pickup Date</Label>
                    <Input id="pickup-date" type="date" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="return-date" className="text-sm text-muted-foreground">Return Date</Label>
                    <Input id="return-date" type="date" className="mt-1" />
                  </div>
                </div>
                <Button type="submit" className="w-full rounded-full bg-primary text-primary-foreground hover:bg-accent">
                  Get Quote <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </div>

            {/* Need Help */}
            <div className="rounded-2xl bg-primary p-6 text-primary-foreground">
              <h3 className="mb-2 text-lg font-bold">Need Help?</h3>
              <p className="mb-4 text-sm text-primary-foreground/80">Call our car rental team for immediate assistance.</p>
              <a href="tel:+263772302946">
                <Button className="w-full rounded-full bg-card text-primary hover:bg-card/90">
                  <Phone className="mr-2 h-4 w-4" /> +263 772 302 946
                </Button>
              </a>
            </div>

            {/* Documents */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="mb-2 font-bold text-foreground">Required Documents</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Upload your driver&apos;s license and ID before your rental.
              </p>
              <Link href="/documents">
                <Button variant="outline" className="w-full rounded-full">Upload Documents</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
