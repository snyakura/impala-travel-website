"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, Quote, ChevronLeft, ChevronRight, MapPin, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const reviews = [
  {
    id: 1,
    name: "Sarah Thompson",
    avatar: "ST",
    location: "London, UK",
    date: "February 2026",
    rating: 5,
    destination: "Victoria Falls",
    title: "Absolutely breathtaking experience!",
    body: "Impala Travel arranged the most incredible trip to Victoria Falls. From the moment we arrived, everything was perfectly organized. The guided tour of the falls, the sunset cruise, and the accommodation were all world-class. Our guide was knowledgeable and passionate. Cannot recommend enough!",
    verified: true,
  },
  {
    id: 2,
    name: "David Moyo",
    avatar: "DM",
    location: "Johannesburg, SA",
    date: "January 2026",
    rating: 5,
    destination: "Hwange National Park",
    title: "Best safari experience of my life",
    body: "We booked a 4-day safari through Hwange and it exceeded all expectations. We saw the Big Five within the first two days! The lodge was comfortable and the staff were incredibly warm and hospitable. The game drives were perfectly timed for the best wildlife sightings.",
    verified: true,
  },
  {
    id: 3,
    name: "Priya Patel",
    avatar: "PP",
    location: "Mumbai, India",
    date: "December 2025",
    rating: 4,
    destination: "Cape Town + Safari",
    title: "Wonderful combo package",
    body: "The Cape Town and Safari combination package was excellent value for money. Cape Town is stunning and the safari in Kruger was amazing. Only minor issue was a slight delay in the transfer between destinations, but the Impala team resolved it quickly and professionally.",
    verified: true,
  },
  {
    id: 4,
    name: "Michael Chen",
    avatar: "MC",
    location: "Sydney, Australia",
    date: "November 2025",
    rating: 5,
    destination: "Zanzibar",
    title: "Paradise found!",
    body: "Zanzibar was pure magic. The crystal-clear waters, the spice tours, the historic Stone Town - everything was meticulously planned by Impala Travel. The beach resort they recommended was phenomenal. This was our honeymoon and they made it absolutely perfect.",
    verified: true,
  },
  {
    id: 5,
    name: "Grace Ndlovu",
    avatar: "GN",
    location: "Harare, Zimbabwe",
    date: "October 2025",
    rating: 5,
    destination: "Nyanga Highlands",
    title: "Perfect family getaway",
    body: "We took the family to Nyanga for a long weekend. Impala arranged the most wonderful cottage overlooking the mountains. The kids loved the hiking trails and the trout fishing. A truly rejuvenating experience - we will definitely be back!",
    verified: false,
  },
  {
    id: 6,
    name: "James Wilson",
    avatar: "JW",
    location: "New York, USA",
    date: "September 2025",
    rating: 4,
    destination: "Great Zimbabwe + Matobo Hills",
    title: "Culturally enriching journey",
    body: "As a history enthusiast, the Great Zimbabwe and Matobo Hills tour was a dream come true. Walking through the ancient ruins was awe-inspiring. The Matobo Hills with Cecil Rhodes' grave and the rock art sites were incredibly powerful. Great guides who really knew their stuff.",
    verified: true,
  },
]

const ratingDistribution = [
  { stars: 5, count: 187, pct: 74 },
  { stars: 4, count: 45, pct: 18 },
  { stars: 3, count: 12, pct: 5 },
  { stars: 2, count: 5, pct: 2 },
  { stars: 1, count: 3, pct: 1 },
]

export default function ReviewsPage() {
  const [page, setPage] = useState(0)
  const [showForm, setShowForm] = useState(false)
  const perPage = 4
  const totalPages = Math.ceil(reviews.length / perPage)
  const visible = reviews.slice(page * perPage, (page + 1) * perPage)

  return (
    <>
      {/* Hero */}
      <section className="bg-primary py-16">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h1 className="font-serif text-4xl font-bold text-primary-foreground md:text-5xl">
            Customer Reviews
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-primary-foreground/80">
            See what our travelers have to say about their experiences with Impala Travel.
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-b border-border bg-card py-10">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-8 md:grid-cols-3">
            {/* Overall Rating */}
            <div className="flex flex-col items-center text-center">
              <span className="text-5xl font-bold text-foreground">4.8</span>
              <div className="mt-2 flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className={`h-5 w-5 ${s <= 5 ? "fill-primary text-primary" : "text-muted"}`} />
                ))}
              </div>
              <span className="mt-1 text-sm text-muted-foreground">Based on 252 reviews</span>
            </div>

            {/* Distribution */}
            <div className="flex flex-col gap-1.5">
              {ratingDistribution.map((r) => (
                <div key={r.stars} className="flex items-center gap-2 text-sm">
                  <span className="w-8 text-right text-foreground">{r.stars}</span>
                  <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${r.pct}%` }} />
                  </div>
                  <span className="w-10 text-right text-muted-foreground">{r.count}</span>
                </div>
              ))}
            </div>

            {/* Write Review CTA */}
            <div className="flex flex-col items-center justify-center text-center">
              <Quote className="h-8 w-8 text-primary/40" />
              <p className="mt-2 text-sm text-muted-foreground">
                Traveled with us? We&apos;d love to hear about your experience.
              </p>
              <Button onClick={() => setShowForm(!showForm)} className="mt-3 rounded-full bg-primary text-primary-foreground hover:bg-accent">
                Write a Review
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Review Form */}
      {showForm && (
        <section className="border-b border-border bg-secondary py-10">
          <div className="mx-auto max-w-2xl px-4">
            <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
              <h3 className="text-xl font-bold text-foreground">Share Your Experience</h3>
              <form onSubmit={(e) => e.preventDefault()} className="mt-6 flex flex-col gap-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <Label>Full Name</Label>
                    <Input placeholder="Your name" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label>Destination Visited</Label>
                    <Input placeholder="e.g., Victoria Falls" />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label>Review Title</Label>
                  <Input placeholder="Summarize your experience" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label>Your Review</Label>
                  <Textarea placeholder="Tell us about your trip..." rows={4} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label>Rating</Label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button key={s} type="button" className="rounded p-1 hover:bg-secondary">
                        <Star className="h-6 w-6 text-muted-foreground hover:fill-primary hover:text-primary" />
                      </button>
                    ))}
                  </div>
                </div>
                <Button type="submit" className="w-fit rounded-full bg-primary px-8 text-primary-foreground hover:bg-accent">
                  Submit Review
                </Button>
              </form>
            </div>
          </div>
        </section>
      )}

      {/* Reviews Grid */}
      <section className="bg-background py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-6 md:grid-cols-2">
            {visible.map((review) => (
              <div key={review.id} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                      {review.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{review.name}</p>
                      <p className="text-xs text-muted-foreground">{review.location}</p>
                    </div>
                  </div>
                  {review.verified && (
                    <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                      Verified
                    </span>
                  )}
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`h-4 w-4 ${s <= review.rating ? "fill-primary text-primary" : "text-muted"}`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">{review.date}</span>
                </div>
                <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" /> {review.destination}
                </div>
                <h3 className="mt-3 font-semibold text-foreground">{review.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{review.body}</p>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-3">
              <Button
                variant="outline"
                size="sm"
                disabled={page === 0}
                onClick={() => setPage((p) => p - 1)}
                className="rounded-full"
              >
                <ChevronLeft className="mr-1 h-4 w-4" /> Previous
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {page + 1} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={page >= totalPages - 1}
                onClick={() => setPage((p) => p + 1)}
                className="rounded-full"
              >
                Next <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
