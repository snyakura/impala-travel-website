"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown, Phone, Mail, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Flight Booking", href: "/services#flights" },
      { label: "Hotel Reservations", href: "/services#hotels" },
      { label: "Safari Tours", href: "/services#safaris" },
      { label: "Visa Assistance", href: "/services#visa" },
      { label: "Custom Travel Planning", href: "/services#custom" },
    ],
  },
  {
    label: "Car Rental",
    href: "/services#car-rentals",
    children: [
      { label: "Self Drive Rentals", href: "/car-rental/self-drive" },
      { label: "Chauffeur Driven Rentals", href: "/car-rental/chauffeur" },
      { label: "Airport Transfers", href: "/car-rental/airport-transfers" },
      { label: "Shuttle Services", href: "/car-rental/shuttle" },
    ],
  },
  {
    label: "Destinations",
    href: "/destinations",
    children: [
      { label: "Victoria Falls", href: "/destinations/victoria-falls" },
      { label: "Kariba", href: "/destinations/kariba" },
      { label: "Hwange National Park", href: "/destinations/hwange" },
      { label: "Great Zimbabwe", href: "/destinations/great-zimbabwe" },
      { label: "Nyanga & Eastern Highlands", href: "/destinations/nyanga" },
      { label: "Cape Town", href: "/destinations/cape-town" },
      { label: "Zanzibar", href: "/destinations/zanzibar" },
      { label: "View All Destinations", href: "/destinations" },
    ],
  },
  { label: "Packages", href: "/packages" },
  { label: "Promotions", href: "/promotions" },
  { label: "Contact", href: "/contact" },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-xs sm:text-sm">
          <div className="flex items-center gap-4">
            <a href="tel:+263772302946" className="flex items-center gap-1.5 transition-opacity hover:opacity-80">
              <Phone className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">+263 772 302 946</span>
            </a>
            <span className="hidden text-primary-foreground/40 md:inline">|</span>
            <a href="mailto:info@impalatravel.co.zw" className="hidden items-center gap-1.5 transition-opacity hover:opacity-80 md:flex">
              <Mail className="h-3.5 w-3.5" />
              info@impalatravel.co.zw
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/documents" className="text-primary-foreground/80 transition-opacity hover:opacity-100">
              Upload Docs
            </Link>
            <span className="text-primary-foreground/40">|</span>
            <Link href="/login" className="text-primary-foreground/80 transition-opacity hover:opacity-100">
              Sign In
            </Link>
            <Link href="/dashboard" className="hidden text-primary-foreground/80 transition-opacity hover:opacity-100 sm:inline">
              My Account
            </Link>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-border/50 bg-card/80 shadow-lg glass"
            : "border-b border-border bg-card"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-[1.02]">
            <Image
              src="/images/logo.png"
              alt="Impala Travel Agency"
              width={160}
              height={50}
              className="h-11 w-auto"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-0.5 lg:flex">
            {navLinks.map((link) =>
              link.children ? (
                <DropdownMenu key={link.label}>
                  <DropdownMenuTrigger asChild>
                    <button
                      className={`group flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
                        isActive(link.href)
                          ? "bg-primary/10 text-primary"
                          : "text-foreground hover:bg-secondary hover:text-primary"
                      }`}
                    >
                      {link.label}
                      <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className={`animate-scale-in ${link.children.length > 5 ? "w-64" : "w-56"}`}>
                    {link.children.map((child) => (
                      <DropdownMenuItem key={child.label} asChild>
                        <Link
                          href={child.href}
                          className={`flex items-center justify-between ${
                            child.label.startsWith("View All") ? "border-t border-border font-semibold text-primary" : ""
                          }`}
                        >
                          {child.label}
                          <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
                    isActive(link.href)
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-secondary hover:text-primary"
                  }`}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <span className="absolute bottom-0 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-primary" />
                  )}
                </Link>
              )
            )}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link href="/booking">
              <Button className="rounded-full bg-primary px-6 text-primary-foreground shadow-md transition-all duration-200 hover:bg-accent hover:shadow-lg hover:-translate-y-0.5">
                Book Now
              </Button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="rounded-lg p-2 text-foreground transition-colors hover:bg-secondary lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <div className="relative h-6 w-6">
              <Menu className={`absolute inset-0 h-6 w-6 transition-all duration-300 ${mobileOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"}`} />
              <X className={`absolute inset-0 h-6 w-6 transition-all duration-300 ${mobileOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"}`} />
            </div>
          </button>
        </div>

        {/* Mobile Nav */}
        <div
          className={`overflow-hidden overflow-y-auto border-t border-border bg-card transition-all duration-300 lg:hidden ${
            mobileOpen ? "max-h-[700px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="flex flex-col px-4 py-4">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.label} className="flex flex-col">
                  <span className="px-3 py-2.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {link.label}
                  </span>
                  {link.children.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      className="rounded-lg px-6 py-2 text-sm text-foreground transition-colors hover:bg-secondary hover:text-primary"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-secondary hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
            <div className="mt-4 flex flex-col gap-2 px-3">
              <Link href="/booking">
                <Button className="w-full rounded-full bg-primary text-primary-foreground hover:bg-accent">
                  Book Now
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" className="w-full rounded-full">
                  Sign In
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      </header>
    </>
  )
}
