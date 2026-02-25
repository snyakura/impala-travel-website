import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react"
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
    { label: "Promotions", href: "/promotions" },
    { label: "Reviews", href: "/reviews" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-accent text-accent-foreground">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block">
              <Image src="/images/logo.png" alt="Impala Travel Agency" width={180} height={55} className="h-14 w-auto brightness-0 invert" />
            </Link>
            <p className="mt-4 max-w-sm leading-relaxed text-accent-foreground/80">
              Your trusted partner in travel convenience. We provide world-class travel services including
              flights, safaris, hotel reservations, and custom travel planning across Africa and beyond.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { icon: Facebook, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Instagram, href: "#" },
                { icon: Youtube, href: "#" },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-foreground/10 text-accent-foreground transition-colors hover:bg-primary-foreground hover:text-primary"
                  aria-label={`Social link ${i + 1}`}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-accent-foreground">{title}</h3>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-accent-foreground/70 transition-colors hover:text-primary-foreground hover:underline">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact + Subscribe Row */}
        <div className="mt-12 grid gap-8 border-t border-accent-foreground/10 pt-10 md:grid-cols-2">
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-accent-foreground">Get in Touch</h3>
            <div className="flex items-start gap-2 text-sm text-accent-foreground/70">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
              <span>40 Chiremba Road, Hillside, Harare, Zimbabwe</span>
            </div>
            <a href="tel:+263772302946" className="flex items-center gap-2 text-sm text-accent-foreground/70 hover:text-primary-foreground">
              <Phone className="h-4 w-4 shrink-0" />
              <span>+263 772 302 946</span>
            </a>
            <a href="mailto:info@impalatravel.co.zw" className="flex items-center gap-2 text-sm text-accent-foreground/70 hover:text-primary-foreground">
              <Mail className="h-4 w-4 shrink-0" />
              <span>info@impalatravel.co.zw</span>
            </a>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-accent-foreground">Subscribe</h3>
            <p className="mb-3 text-sm text-accent-foreground/70">Get our bi-monthly newsletter for the latest travel deals and offers.</p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <Input placeholder="Your Email" className="bg-accent-foreground/10 text-accent-foreground placeholder:text-accent-foreground/50 border-accent-foreground/20" />
              <Button className="rounded-full bg-primary-foreground text-primary hover:bg-primary-foreground/90">Subscribe</Button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-accent-foreground/10 bg-accent">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-accent-foreground/60 md:flex-row">
          <p>Copyright 2025 Impala Travel Agency. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-primary-foreground hover:underline">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary-foreground hover:underline">Terms and Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
