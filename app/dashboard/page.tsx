"use client"

import { useState } from "react"
import Link from "next/link"
import {
  User, MapPin, Calendar, CreditCard, FileText,
  Settings, LogOut, Plane, Star, Clock, Bell,
  ChevronRight, Download, Plus, Trash2, Smartphone, Building, Wallet, CheckCircle, ArrowRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const tabs = [
  { id: "overview", label: "Overview", icon: User },
  { id: "bookings", label: "My Bookings", icon: Calendar },
  { id: "documents", label: "Documents", icon: FileText },
  { id: "payments", label: "Payments", icon: CreditCard },
  { id: "settings", label: "Settings", icon: Settings },
]

const upcomingTrips = [
  { id: "IMP-2026-004521", destination: "Victoria Falls, Zimbabwe", dates: "Mar 15 - Mar 18, 2026", status: "confirmed", type: "Safari & Falls Package", price: 1299 },
  { id: "IMP-2026-004602", destination: "Zanzibar, Tanzania", dates: "Apr 22 - Apr 28, 2026", status: "pending", type: "Beach Getaway", price: 2199 },
]

const pastTrips = [
  { id: "IMP-2025-003201", destination: "Cape Town, South Africa", dates: "Dec 10 - Dec 15, 2025", status: "completed", type: "City & Wine Tour", price: 1650, rated: true },
  { id: "IMP-2025-002890", destination: "Hwange National Park", dates: "Sep 5 - Sep 8, 2025", status: "completed", type: "Safari Adventure", price: 950, rated: false },
]

const notifications = [
  { text: "Your Victoria Falls booking is confirmed", time: "2 hours ago", read: false },
  { text: "New promotion: 25% off Mozambique packages", time: "1 day ago", read: false },
  { text: "Document upload reminder for Zanzibar trip", time: "3 days ago", read: true },
]

const paymentHistory = [
  { id: "PAY-001", date: "Feb 20, 2026", amount: 649.50, method: "Visa ****4521", desc: "Victoria Falls deposit", status: "completed" },
  { id: "PAY-002", date: "Feb 10, 2026", amount: 2199, method: "EcoCash 077X", desc: "Zanzibar full payment", status: "completed" },
  { id: "PAY-003", date: "Nov 25, 2025", amount: 1650, method: "Visa ****4521", desc: "Cape Town full payment", status: "completed" },
]

const initialSavedCards = [
  { id: "1", type: "visa", last4: "4521", expiry: "09/27", name: "John Doe", isDefault: true },
  { id: "2", type: "mastercard", last4: "8902", expiry: "03/28", name: "John Doe", isDefault: false },
]

const initialMobileWallets = [
  { id: "1", type: "EcoCash", number: "077X XXX XXX", name: "John Doe", isDefault: true },
]

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    confirmed: "bg-primary/10 text-primary border-primary/20",
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    completed: "bg-secondary text-muted-foreground border-border",
  }
  return (
    <span className={`rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${styles[status] || ""}`}>
      {status}
    </span>
  )
}

export default function DashboardPage() {
  const [tab, setTab] = useState("overview")
  const [savedCards, setSavedCards] = useState(initialSavedCards)
  const [mobileWallets, setMobileWallets] = useState(initialMobileWallets)
  const [showAddCard, setShowAddCard] = useState(false)
  const [showAddWallet, setShowAddWallet] = useState(false)
  const [profileSaved, setProfileSaved] = useState(false)
  const [passwordSaved, setPasswordSaved] = useState(false)

  function removeCard(id: string) {
    setSavedCards((prev) => prev.filter((c) => c.id !== id))
  }
  function setDefaultCard(id: string) {
    setSavedCards((prev) => prev.map((c) => ({ ...c, isDefault: c.id === id })))
  }
  function removeWallet(id: string) {
    setMobileWallets((prev) => prev.filter((w) => w.id !== id))
  }

  function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault()
    setProfileSaved(true)
    setTimeout(() => setProfileSaved(false), 3000)
  }
  function handleSavePassword(e: React.FormEvent) {
    e.preventDefault()
    setPasswordSaved(true)
    setTimeout(() => setPasswordSaved(false), 3000)
  }

  return (
    <section className="min-h-[calc(100vh-140px)] bg-background">
      {/* Header */}
      <div className="bg-primary py-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-foreground text-xl font-bold text-primary shadow-lg">
              JD
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary-foreground">John Doe</h1>
              <p className="text-sm text-primary-foreground/70">john.doe@example.com</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative rounded-full p-2 text-primary-foreground/70 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full border-2 border-primary bg-red-400" />
            </button>
            <Link href="/login">
              <Button variant="outline" size="sm" className="rounded-full border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                <LogOut className="mr-2 h-4 w-4" /> Sign Out
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
          {/* Sidebar */}
          <nav className="flex flex-row gap-1 overflow-x-auto lg:flex-col">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-2.5 whitespace-nowrap rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  tab === t.id
                    ? "bg-primary/10 text-primary shadow-sm"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <t.icon className="h-4 w-4" />
                {t.label}
              </button>
            ))}
          </nav>

          {/* Content */}
          <div className="animate-fade-in" key={tab}>
            {tab === "overview" && (
              <div className="flex flex-col gap-6">
                <div className="grid gap-4 sm:grid-cols-3">
                  {[
                    { label: "Upcoming Trips", value: "2", icon: Plane, change: "+1 this month" },
                    { label: "Total Trips", value: "4", icon: MapPin, change: "Since 2024" },
                    { label: "Loyalty Points", value: "1,250", icon: Star, change: "+350 this trip" },
                  ].map((stat) => (
                    <div key={stat.label} className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-transform group-hover:scale-110">
                        <stat.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                        <p className="text-xs text-muted-foreground">{stat.label}</p>
                        <p className="text-[10px] text-primary">{stat.change}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <h2 className="flex items-center gap-2 text-lg font-bold text-foreground"><Bell className="h-5 w-5 text-primary" /> Notifications</h2>
                  <div className="mt-4 flex flex-col gap-2">
                    {notifications.map((n, i) => (
                      <div key={i} className={`flex items-start gap-3 rounded-xl px-4 py-3 transition-colors ${!n.read ? "bg-primary/5" : "bg-secondary/50"}`}>
                        <div className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${!n.read ? "bg-primary" : "bg-transparent"}`} />
                        <div className="flex-1">
                          <p className="text-sm text-foreground">{n.text}</p>
                          <p className="text-xs text-muted-foreground">{n.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <h2 className="flex items-center gap-2 text-lg font-bold text-foreground"><Calendar className="h-5 w-5 text-primary" /> Upcoming Trips</h2>
                    <Link href="/booking" className="text-sm font-medium text-primary hover:underline">Book new trip</Link>
                  </div>
                  <div className="mt-4 flex flex-col gap-3">
                    {upcomingTrips.map((trip) => (
                      <div key={trip.id} className="flex items-center justify-between rounded-xl border border-border bg-secondary/30 p-4 transition-all duration-200 hover:shadow-sm">
                        <div className="flex items-center gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                            <Plane className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">{trip.destination}</p>
                            <p className="text-xs text-muted-foreground">{trip.dates}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <StatusBadge status={trip.status} />
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {tab === "bookings" && (
              <div className="flex flex-col gap-6">
                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <h2 className="text-lg font-bold text-foreground">Upcoming Bookings</h2>
                  <div className="mt-4 flex flex-col gap-4">
                    {upcomingTrips.map((trip) => (
                      <div key={trip.id} className="rounded-xl border border-border p-5 transition-all duration-200 hover:shadow-sm">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-foreground">{trip.destination}</h3>
                              <StatusBadge status={trip.status} />
                            </div>
                            <p className="mt-1 text-sm text-muted-foreground">{trip.type}</p>
                            <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {trip.dates}</span>
                              <span className="flex items-center gap-1"><CreditCard className="h-3 w-3" /> Ref: {trip.id}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-primary">${trip.price}</p>
                            <div className="mt-2 flex gap-2">
                              <Link href="/documents">
                                <Button size="sm" variant="outline" className="rounded-full text-xs">Upload Docs</Button>
                              </Link>
                              <Button size="sm" variant="outline" className="rounded-full text-xs" onClick={() => alert(`Invoice for ${trip.id} downloaded!`)}>
                                <Download className="mr-1 h-3 w-3" /> Invoice
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <h2 className="text-lg font-bold text-foreground">Past Trips</h2>
                  <div className="mt-4 flex flex-col gap-4">
                    {pastTrips.map((trip) => (
                      <div key={trip.id} className="rounded-xl border border-border p-5">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <h3 className="font-semibold text-foreground">{trip.destination}</h3>
                            <p className="mt-1 text-sm text-muted-foreground">{trip.type}</p>
                            <p className="mt-1 text-xs text-muted-foreground">{trip.dates}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xl font-bold text-foreground">${trip.price}</p>
                            {!trip.rated ? (
                              <Link href="/reviews">
                                <Button size="sm" className="mt-2 rounded-full bg-primary text-xs text-primary-foreground hover:bg-accent">
                                  <Star className="mr-1 h-3 w-3" /> Leave Review
                                </Button>
                              </Link>
                            ) : (
                              <div className="mt-2 flex items-center justify-end gap-0.5">
                                {[1, 2, 3, 4, 5].map((s) => (
                                  <Star key={s} className="h-3.5 w-3.5 fill-primary text-primary" />
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {tab === "documents" && (
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-foreground">My Documents</h2>
                    <p className="mt-1 text-sm text-muted-foreground">Manage your travel documents and upload new ones.</p>
                  </div>
                  <Link href="/documents">
                    <Button className="rounded-full bg-primary text-primary-foreground hover:bg-accent">
                      <Plus className="mr-2 h-4 w-4" /> Upload New
                    </Button>
                  </Link>
                </div>
                <div className="mt-6 flex flex-col gap-3">
                  {[
                    { name: "Passport - John Doe.pdf", date: "Feb 15, 2026", size: "2.4 MB", trip: "Victoria Falls" },
                    { name: "Travel Insurance.pdf", date: "Feb 12, 2026", size: "1.1 MB", trip: "Zanzibar" },
                    { name: "Flight Itinerary - VFA.pdf", date: "Feb 20, 2026", size: "345 KB", trip: "Victoria Falls" },
                  ].map((doc) => (
                    <div key={doc.name} className="flex items-center justify-between rounded-xl border border-border bg-secondary/30 px-5 py-4 transition-all duration-200 hover:shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{doc.name}</p>
                          <p className="text-xs text-muted-foreground">{doc.size} - Uploaded {doc.date}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">{doc.trip}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === "payments" && (
              <div className="flex flex-col gap-6">
                {/* Saved Payment Methods */}
                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-foreground">Saved Payment Methods</h2>
                    <Button size="sm" variant="outline" className="rounded-full" onClick={() => setShowAddCard(!showAddCard)}>
                      <Plus className="mr-1 h-3.5 w-3.5" /> Add Card
                    </Button>
                  </div>

                  {showAddCard && (
                    <div className="mt-4 rounded-xl border border-primary/20 bg-primary/5 p-5 animate-fade-in">
                      <h3 className="font-semibold text-foreground">Add New Card</h3>
                      <div className="mt-3 flex flex-col gap-3">
                        <div className="flex flex-col gap-1.5">
                          <Label>Card Number</Label>
                          <Input placeholder="4242 4242 4242 4242" className="h-10 rounded-xl font-mono" />
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                          <div className="flex flex-col gap-1.5">
                            <Label>Expiry</Label>
                            <Input placeholder="MM/YY" className="h-10 rounded-xl" />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <Label>CVC</Label>
                            <Input placeholder="123" className="h-10 rounded-xl" type="password" />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <Label>Name</Label>
                            <Input placeholder="John Doe" className="h-10 rounded-xl" />
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button className="rounded-full bg-primary text-primary-foreground hover:bg-accent" onClick={() => {
                            setSavedCards((prev) => [...prev, { id: String(Date.now()), type: "visa", last4: "9999", expiry: "12/29", name: "John Doe", isDefault: false }])
                            setShowAddCard(false)
                          }}>
                            Save Card
                          </Button>
                          <Button variant="outline" className="rounded-full" onClick={() => setShowAddCard(false)}>Cancel</Button>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mt-4 flex flex-col gap-3">
                    {savedCards.map((card) => (
                      <div key={card.id} className={`flex items-center justify-between rounded-xl border p-4 transition-all duration-200 ${card.isDefault ? "border-primary/30 bg-primary/5" : "border-border"}`}>
                        <div className="flex items-center gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary">
                            <CreditCard className="h-5 w-5 text-foreground" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-semibold text-foreground capitalize">{card.type} ****{card.last4}</p>
                              {card.isDefault && <Badge className="bg-primary/10 text-primary text-[10px]">Default</Badge>}
                            </div>
                            <p className="text-xs text-muted-foreground">Expires {card.expiry} - {card.name}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {!card.isDefault && (
                            <Button size="sm" variant="outline" className="rounded-full text-xs" onClick={() => setDefaultCard(card.id)}>
                              Set Default
                            </Button>
                          )}
                          <button onClick={() => removeCard(card.id)} className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive" aria-label="Remove card">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mobile Wallets */}
                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-foreground">Mobile Wallets</h2>
                    <Button size="sm" variant="outline" className="rounded-full" onClick={() => setShowAddWallet(!showAddWallet)}>
                      <Plus className="mr-1 h-3.5 w-3.5" /> Add Wallet
                    </Button>
                  </div>

                  {showAddWallet && (
                    <div className="mt-4 rounded-xl border border-primary/20 bg-primary/5 p-5 animate-fade-in">
                      <h3 className="font-semibold text-foreground">Add Mobile Wallet</h3>
                      <div className="mt-3 flex flex-col gap-3">
                        <div className="flex flex-col gap-1.5">
                          <Label>Mobile Number</Label>
                          <Input placeholder="077X XXX XXXX" className="h-10 rounded-xl" />
                        </div>
                        <div className="flex gap-2">
                          <Button className="rounded-full bg-primary text-primary-foreground hover:bg-accent" onClick={() => {
                            setMobileWallets((prev) => [...prev, { id: String(Date.now()), type: "EcoCash", number: "078X XXX XXX", name: "John Doe", isDefault: false }])
                            setShowAddWallet(false)
                          }}>
                            Save Wallet
                          </Button>
                          <Button variant="outline" className="rounded-full" onClick={() => setShowAddWallet(false)}>Cancel</Button>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mt-4 flex flex-col gap-3">
                    {mobileWallets.map((wallet) => (
                      <div key={wallet.id} className="flex items-center justify-between rounded-xl border border-border p-4">
                        <div className="flex items-center gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary">
                            <Smartphone className="h-5 w-5 text-foreground" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-foreground">{wallet.type}</p>
                            <p className="text-xs text-muted-foreground">{wallet.number} - {wallet.name}</p>
                          </div>
                        </div>
                        <button onClick={() => removeWallet(wallet.id)} className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive" aria-label="Remove wallet">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment History */}
                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <h2 className="text-lg font-bold text-foreground">Payment History</h2>
                  <div className="mt-6 overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border text-left">
                          <th className="pb-3 pr-4 font-medium text-muted-foreground">ID</th>
                          <th className="pb-3 pr-4 font-medium text-muted-foreground">Date</th>
                          <th className="pb-3 pr-4 font-medium text-muted-foreground">Description</th>
                          <th className="pb-3 pr-4 font-medium text-muted-foreground">Method</th>
                          <th className="pb-3 pr-4 font-medium text-muted-foreground">Status</th>
                          <th className="pb-3 text-right font-medium text-muted-foreground">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paymentHistory.map((pay) => (
                          <tr key={pay.id} className="border-b border-border last:border-0 transition-colors hover:bg-secondary/30">
                            <td className="py-3.5 pr-4 font-mono text-xs text-muted-foreground">{pay.id}</td>
                            <td className="py-3.5 pr-4 text-foreground">{pay.date}</td>
                            <td className="py-3.5 pr-4 text-foreground">{pay.desc}</td>
                            <td className="py-3.5 pr-4 text-muted-foreground">{pay.method}</td>
                            <td className="py-3.5 pr-4">
                              <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                                <CheckCircle className="h-3 w-3" /> {pay.status}
                              </span>
                            </td>
                            <td className="py-3.5 text-right font-semibold text-foreground">${pay.amount.toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {tab === "settings" && (
              <div className="flex flex-col gap-6">
                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <h2 className="text-lg font-bold text-foreground">Profile Settings</h2>
                  <form onSubmit={handleSaveProfile} className="mt-6 grid gap-5 sm:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                      <Label>Full Name</Label>
                      <Input defaultValue="John Doe" className="h-10 rounded-xl" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label>Email</Label>
                      <Input defaultValue="john.doe@example.com" className="h-10 rounded-xl" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label>Phone</Label>
                      <Input defaultValue="+263 772 123 456" className="h-10 rounded-xl" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label>Country</Label>
                      <Input defaultValue="Zimbabwe" className="h-10 rounded-xl" />
                    </div>
                    <div className="sm:col-span-2 flex items-center gap-3">
                      <Button type="submit" className="rounded-full bg-primary text-primary-foreground hover:bg-accent">
                        Save Changes
                      </Button>
                      {profileSaved && (
                        <span className="flex items-center gap-1 text-sm text-primary animate-fade-in">
                          <CheckCircle className="h-4 w-4" /> Saved successfully
                        </span>
                      )}
                    </div>
                  </form>
                </div>

                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <h2 className="text-lg font-bold text-foreground">Change Password</h2>
                  <form onSubmit={handleSavePassword} className="mt-6 flex max-w-sm flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <Label>Current Password</Label>
                      <Input type="password" className="h-10 rounded-xl" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label>New Password</Label>
                      <Input type="password" className="h-10 rounded-xl" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label>Confirm New Password</Label>
                      <Input type="password" className="h-10 rounded-xl" />
                    </div>
                    <div className="flex items-center gap-3">
                      <Button type="submit" className="rounded-full bg-primary text-primary-foreground hover:bg-accent">
                        Update Password
                      </Button>
                      {passwordSaved && (
                        <span className="flex items-center gap-1 text-sm text-primary animate-fade-in">
                          <CheckCircle className="h-4 w-4" /> Password updated
                        </span>
                      )}
                    </div>
                  </form>
                </div>

                <div className="rounded-2xl border border-destructive/30 bg-card p-6 shadow-sm">
                  <h2 className="text-lg font-bold text-destructive">Danger Zone</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Permanently delete your account and all associated data. This action cannot be undone.
                  </p>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="mt-4 rounded-full"
                    onClick={() => alert("Account deletion would require additional confirmation in production.")}
                  >
                    Delete Account
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
