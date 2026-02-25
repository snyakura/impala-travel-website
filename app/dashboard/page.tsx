"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  User, MapPin, Calendar, CreditCard, FileText,
  Settings, LogOut, Plane, Star, Clock, Bell,
  ChevronRight, Download
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const tabs = [
  { id: "overview", label: "Overview", icon: User },
  { id: "bookings", label: "My Bookings", icon: Calendar },
  { id: "documents", label: "Documents", icon: FileText },
  { id: "payments", label: "Payments", icon: CreditCard },
  { id: "settings", label: "Settings", icon: Settings },
]

const upcomingTrips = [
  {
    id: "IMP-2026-004521",
    destination: "Victoria Falls, Zimbabwe",
    dates: "Mar 15 - Mar 18, 2026",
    status: "confirmed",
    type: "Safari & Falls Package",
    price: 1299,
  },
  {
    id: "IMP-2026-004602",
    destination: "Zanzibar, Tanzania",
    dates: "Apr 22 - Apr 28, 2026",
    status: "pending",
    type: "Beach Getaway",
    price: 2199,
  },
]

const pastTrips = [
  {
    id: "IMP-2025-003201",
    destination: "Cape Town, South Africa",
    dates: "Dec 10 - Dec 15, 2025",
    status: "completed",
    type: "City & Wine Tour",
    price: 1650,
    rated: true,
  },
  {
    id: "IMP-2025-002890",
    destination: "Hwange National Park",
    dates: "Sep 5 - Sep 8, 2025",
    status: "completed",
    type: "Safari Adventure",
    price: 950,
    rated: false,
  },
]

const notifications = [
  { text: "Your Victoria Falls booking is confirmed", time: "2 hours ago", read: false },
  { text: "New promotion: 25% off Mozambique packages", time: "1 day ago", read: false },
  { text: "Document upload reminder for Zanzibar trip", time: "3 days ago", read: true },
]

const paymentHistory = [
  { id: "PAY-001", date: "Feb 20, 2026", amount: 649.50, method: "Visa ****4521", desc: "Victoria Falls deposit" },
  { id: "PAY-002", date: "Feb 10, 2026", amount: 2199, method: "Mastercard ****8902", desc: "Zanzibar full payment" },
  { id: "PAY-003", date: "Nov 25, 2025", amount: 1650, method: "Visa ****4521", desc: "Cape Town full payment" },
]

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    confirmed: "bg-primary/10 text-primary",
    pending: "bg-amber-100 text-amber-700",
    completed: "bg-secondary text-muted-foreground",
  }
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${styles[status] || ""}`}>
      {status}
    </span>
  )
}

export default function DashboardPage() {
  const [tab, setTab] = useState("overview")

  return (
    <section className="min-h-[calc(100vh-140px)] bg-background">
      {/* Header */}
      <div className="bg-primary py-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-foreground text-xl font-bold text-primary">
              JD
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary-foreground">John Doe</h1>
              <p className="text-sm text-primary-foreground/70">john.doe@example.com</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative rounded-full p-2 text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-primary-foreground">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-400" />
            </button>
            <Button variant="outline" size="sm" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
              <LogOut className="mr-2 h-4 w-4" /> Sign Out
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
          {/* Sidebar Tabs */}
          <nav className="flex flex-row gap-1 overflow-x-auto lg:flex-col">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-2.5 whitespace-nowrap rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                  tab === t.id
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <t.icon className="h-4 w-4" />
                {t.label}
              </button>
            ))}
          </nav>

          {/* Content */}
          <div>
            {tab === "overview" && (
              <div className="flex flex-col gap-6">
                {/* Stats Cards */}
                <div className="grid gap-4 sm:grid-cols-3">
                  {[
                    { label: "Upcoming Trips", value: "2", icon: Plane },
                    { label: "Total Trips", value: "4", icon: MapPin },
                    { label: "Loyalty Points", value: "1,250", icon: Star },
                  ].map((stat) => (
                    <div key={stat.label} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10">
                        <stat.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                        <p className="text-xs text-muted-foreground">{stat.label}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Notifications */}
                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <h2 className="flex items-center gap-2 text-lg font-bold text-foreground">
                    <Bell className="h-5 w-5 text-primary" /> Notifications
                  </h2>
                  <div className="mt-4 flex flex-col gap-2">
                    {notifications.map((n, i) => (
                      <div key={i} className={`flex items-start gap-3 rounded-xl px-4 py-3 ${!n.read ? "bg-primary/5" : "bg-secondary"}`}>
                        <div className={`mt-1 h-2 w-2 shrink-0 rounded-full ${!n.read ? "bg-primary" : "bg-transparent"}`} />
                        <div className="flex-1">
                          <p className="text-sm text-foreground">{n.text}</p>
                          <p className="text-xs text-muted-foreground">{n.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Upcoming Trip Preview */}
                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <h2 className="flex items-center gap-2 text-lg font-bold text-foreground">
                    <Calendar className="h-5 w-5 text-primary" /> Upcoming Trips
                  </h2>
                  <div className="mt-4 flex flex-col gap-3">
                    {upcomingTrips.map((trip) => (
                      <div key={trip.id} className="flex items-center justify-between rounded-xl border border-border bg-secondary p-4">
                        <div className="flex items-center gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
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
                      <div key={trip.id} className="rounded-xl border border-border p-5">
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
                              <Button size="sm" variant="outline" className="rounded-full text-xs">
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
                            {!trip.rated && (
                              <Link href="/reviews">
                                <Button size="sm" className="mt-2 rounded-full bg-primary text-xs text-primary-foreground hover:bg-accent">
                                  <Star className="mr-1 h-3 w-3" /> Leave Review
                                </Button>
                              </Link>
                            )}
                            {trip.rated && (
                              <div className="mt-2 flex items-center justify-end gap-1">
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
                <h2 className="text-lg font-bold text-foreground">My Documents</h2>
                <p className="mt-1 text-sm text-muted-foreground">Manage your travel documents and upload new ones.</p>
                <div className="mt-6 flex flex-col gap-3">
                  {[
                    { name: "Passport - John Doe.pdf", date: "Feb 15, 2026", size: "2.4 MB", trip: "Victoria Falls" },
                    { name: "Travel Insurance.pdf", date: "Feb 12, 2026", size: "1.1 MB", trip: "Zanzibar" },
                    { name: "Flight Itinerary - VFA.pdf", date: "Feb 20, 2026", size: "345 KB", trip: "Victoria Falls" },
                  ].map((doc) => (
                    <div key={doc.name} className="flex items-center justify-between rounded-xl border border-border bg-secondary px-5 py-4">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm font-medium text-foreground">{doc.name}</p>
                          <p className="text-xs text-muted-foreground">{doc.size} - Uploaded {doc.date}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">{doc.trip}</Badge>
                    </div>
                  ))}
                </div>
                <Link href="/documents">
                  <Button className="mt-6 rounded-full bg-primary text-primary-foreground hover:bg-accent">
                    Upload New Documents
                  </Button>
                </Link>
              </div>
            )}

            {tab === "payments" && (
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
                        <th className="pb-3 text-right font-medium text-muted-foreground">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paymentHistory.map((pay) => (
                        <tr key={pay.id} className="border-b border-border last:border-0">
                          <td className="py-3 pr-4 font-mono text-xs text-muted-foreground">{pay.id}</td>
                          <td className="py-3 pr-4 text-foreground">{pay.date}</td>
                          <td className="py-3 pr-4 text-foreground">{pay.desc}</td>
                          <td className="py-3 pr-4 text-muted-foreground">{pay.method}</td>
                          <td className="py-3 text-right font-semibold text-foreground">${pay.amount.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {tab === "settings" && (
              <div className="flex flex-col gap-6">
                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <h2 className="text-lg font-bold text-foreground">Profile Settings</h2>
                  <form onSubmit={(e) => e.preventDefault()} className="mt-6 grid gap-5 sm:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-medium text-foreground">Full Name</label>
                      <input defaultValue="John Doe" className="flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-medium text-foreground">Email</label>
                      <input defaultValue="john.doe@example.com" className="flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-medium text-foreground">Phone</label>
                      <input defaultValue="+263 772 123 456" className="flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-medium text-foreground">Country</label>
                      <input defaultValue="Zimbabwe" className="flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm" />
                    </div>
                    <div className="sm:col-span-2">
                      <Button className="rounded-full bg-primary text-primary-foreground hover:bg-accent">
                        Save Changes
                      </Button>
                    </div>
                  </form>
                </div>

                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <h2 className="text-lg font-bold text-foreground">Change Password</h2>
                  <form onSubmit={(e) => e.preventDefault()} className="mt-6 flex max-w-sm flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-medium text-foreground">Current Password</label>
                      <input type="password" className="flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-medium text-foreground">New Password</label>
                      <input type="password" className="flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-medium text-foreground">Confirm New Password</label>
                      <input type="password" className="flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm" />
                    </div>
                    <Button className="w-fit rounded-full bg-primary text-primary-foreground hover:bg-accent">
                      Update Password
                    </Button>
                  </form>
                </div>

                <div className="rounded-2xl border border-destructive/30 bg-card p-6 shadow-sm">
                  <h2 className="text-lg font-bold text-destructive">Danger Zone</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Permanently delete your account and all associated data. This action cannot be undone.
                  </p>
                  <Button variant="destructive" size="sm" className="mt-4 rounded-full">
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
