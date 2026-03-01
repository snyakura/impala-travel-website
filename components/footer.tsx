"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube, ArrowRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const footerLinks = {
  "About Us": [
    { label: "Our Story", href: "/about" },
    { label: "Our Team", href: "/about#team" },
    { label: "Awards", href: "/about#awards" },
    { label: "CSR", href: "/about#csr" },
  ],
  "Our Services": [
    { label: "Flight Booking", href: "/services#flights" },
    { label: "Hotel Reservations", href: "/services#hotels" },
    { label: "Safari Tours", href: "/services#safaris" },
    { label: "Car Rentals", href: "/services#car-rentals" },
    { label: "Visa Assistance", href: "/services#visa" },
  ],
  "Quick Links": [
    { label: "Travel Packages", href: "/packages" },
    { label: "Trip Planner", href: "/trip-planner" },
    { label: "Cost Calculator", href: "/calculator" },
    { label: "Upload Documents", href: "/documents" },
    { label: "Reviews", href: "/reviews" },
  ],
}

const socials = [
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
]

export function Footer() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setSubscribed(true)
    setEmail("")
    setTimeout(() => setSubscribed(false), 4000)
  }

  return (
    <footer className="bg-foreground text-background">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block transition-opacity hover:opacity-80">
              <Image src="/images/logo.png" alt="Impala Travel Agency" width={180} height={55} className="h-14 w-auto brightness-0 invert" />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-background/60">
              Your trusted partner in travel convenience. We provide world-class travel services including
              flights, safaris, hotel reservations, and custom travel planning across Africa and beyond.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-background/10 text-background/70 transition-all duration-200 hover:bg-primary hover:text-primary-foreground hover:-translate-y-0.5"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-background/90">{title}</h3>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-1 text-sm text-background/50 transition-colors hover:text-primary"
                    >
                      <ArrowRight className="h-3 w-3 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-1" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact + Subscribe Row */}
        <div className="mt-12 grid gap-8 border-t border-background/10 pt-10 md:grid-cols-2">
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-background/90">Get in Touch</h3>
            <a href="https://maps.google.com/?q=40+Chiremba+Road+Hillside+Harare+Zimbabwe" target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 text-sm text-background/50 transition-colors hover:text-primary">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
              <span>40 Chiremba Road, Hillside, Harare, Zimbabwe</span>
            </a>
            <a href="tel:+263772302946" className="flex items-center gap-2 text-sm text-background/50 transition-colors hover:text-primary">
              <Phone className="h-4 w-4 shrink-0" />
              <span>+263 772 302 946</span>
            </a>
            <a href="mailto:info@impalatravel.co.zw" className="flex items-center gap-2 text-sm text-background/50 transition-colors hover:text-primary">
              <Mail className="h-4 w-4 shrink-0" />
              <span>info@impalatravel.co.zw</span>
            </a>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-background/90">Subscribe</h3>
            <p className="mb-3 text-sm text-background/50">Get our bi-monthly newsletter for the latest travel deals.</p>
            {subscribed ? (
              <div className="flex items-center gap-2 rounded-full bg-primary/20 px-4 py-2.5 text-sm text-primary animate-fade-in">
                <CheckCircle className="h-4 w-4" />
                Thank you for subscribing!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="rounded-full border-background/20 bg-background/10 text-background placeholder:text-background/40 focus:border-primary"
                />
                <Button type="submit" className="rounded-full bg-primary px-6 text-primary-foreground transition-all duration-200 hover:bg-primary/80 hover:-translate-y-0.5">
                  Subscribe
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-background/40 md:flex-row">
          <p>Copyright 2025 Impala Travel Agency. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="transition-colors hover:text-primary">Privacy Policy</Link>
            <Link href="/terms" className="transition-colors hover:text-primary">Terms and Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
