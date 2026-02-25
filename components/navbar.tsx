"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu, X, ChevronDown, Globe, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navLinks = [
  { label: "Home", href: "/" },
  {
    label: "About Us",
    href: "/about",
  },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Flight Booking", href: "/services#flights" },
      { label: "Hotel Reservations", href: "/services#hotels" },
      { label: "Safari Tours", href: "/services#safaris" },
      { label: "Car Rentals", href: "/services#car-rentals" },
      { label: "Visa Assistance", href: "/services#visa" },
      { label: "Custom Travel Planning", href: "/services#custom" },
    ],
  },
  { label: "Travel Packages", href: "/packages" },
  { label: "Trip Planner", href: "/trip-planner" },
  { label: "Cost Calculator", href: "/calculator" },
  { label: "Promotions", href: "/promotions" },
  { label: "Contact", href: "/contact" },
]

const languages = [
  { code: "en", label: "English" },
  { code: "sn", label: "Shona" },
  { code: "nd", label: "Ndebele" },
  { code: "fr", label: "French" },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [lang, setLang] = useState("en")

  return (
    <>
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-sm">
          <div className="flex items-center gap-4">
            <a href="tel:+263772302946" className="flex items-center gap-1 hover:underline">
              <Phone className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">+263 772 302 946</span>
            </a>
            <span className="hidden text-primary-foreground/70 md:inline">|</span>
            <span className="hidden md:inline">info@impalatravel.co.zw</span>
          </div>
          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 rounded px-2 py-1 text-sm transition-colors hover:bg-accent/20">
                  <Globe className="h-3.5 w-3.5" />
                  <span>{languages.find((l) => l.code === lang)?.label}</span>
                  <ChevronDown className="h-3 w-3" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map((l) => (
                  <DropdownMenuItem key={l.code} onClick={() => setLang(l.code)}>
                    {l.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href="/login">
              <Button variant="outline" size="sm" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <header className="sticky top-0 z-50 border-b border-border bg-card shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/images/logo.png" alt="Impala Travel Agency" width={160} height={50} className="h-12 w-auto" priority />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) =>
              link.children ? (
                <DropdownMenu key={link.label}>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary hover:text-primary">
                      {link.label}
                      <ChevronDown className="h-3.5 w-3.5" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {link.children.map((child) => (
                      <DropdownMenuItem key={child.label} asChild>
                        <Link href={child.href}>{child.label}</Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary hover:text-primary"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link href="/booking">
              <Button className="rounded-full bg-primary px-6 text-primary-foreground shadow-md hover:bg-accent">
                Book Now
              </Button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="rounded-lg p-2 text-foreground lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="border-t border-border bg-card lg:hidden">
            <nav className="flex flex-col px-4 py-4">
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.label} className="flex flex-col">
                    <span className="px-3 py-2.5 text-sm font-semibold text-muted-foreground">
                      {link.label}
                    </span>
                    {link.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="rounded-lg px-6 py-2 text-sm text-foreground transition-colors hover:bg-secondary"
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                )
              )}
              <div className="mt-4 flex flex-col gap-2 px-3">
                <Link href="/booking" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full rounded-full bg-primary text-primary-foreground hover:bg-accent">
                    Book Now
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  )
}
