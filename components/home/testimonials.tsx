"use client"

import { useState, useEffect, useCallback } from "react"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { useInView } from "@/hooks/use-in-view"

const testimonials = [
  {
    name: "Sean Hunter",
    initials: "SH",
    color: "bg-primary",
    rating: 5,
    text: "Super service and excellent customer service. Had a minor problem with the booking at night and they came out to fix it. Will continue using them for all our travel needs.",
    source: "Google",
    trip: "Victoria Falls Package",
  },
  {
    name: "Daryl Holme",
    initials: "DH",
    color: "bg-amber-500",
    rating: 5,
    text: "The rental process was easy and smooth. But what impressed us the most was when we had a problem, the office manager personally drove out to assist us. Truly outstanding service!",
    source: "Google",
    trip: "Hwange Safari",
  },
  {
    name: "Macdonald Dube",
    initials: "MD",
    color: "bg-rose-500",
    rating: 5,
    text: "Impala Travel offers professional and reliable service, making the booking process smooth from start to finish. The packages are well-maintained, clean, and ready for both business and leisure travel.",
    source: "Google",
    trip: "Cape Town Tour",
  },
  {
    name: "Linda Moyo",
    initials: "LM",
    color: "bg-blue-500",
    rating: 5,
    text: "Absolutely loved our Victoria Falls safari package! Everything was well organized, the guide was knowledgeable, and the hotel was superb. Highly recommend Impala Travel to everyone.",
    source: "Google",
    trip: "Falls & Safari Combo",
  },
  {
    name: "Tariro Mhandu",
    initials: "TM",
    color: "bg-primary",
    rating: 5,
    text: "First time using Impala Travel and I was blown away. The visa assistance was seamless and the entire trip was planned to perfection. Already planning my next adventure with them!",
    source: "Google",
    trip: "Zanzibar Getaway",
  },
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [ref, inView] = useInView<HTMLDivElement>(0.1)

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }, [])

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }, [])

  useEffect(() => {
    if (!isAutoPlaying) return
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [isAutoPlaying, next])

  const getVisibleIndices = () => {
    const indices = []
    for (let i = 0; i < 3; i++) {
      indices.push((currentIndex + i) % testimonials.length)
    }
    return indices
  }

  return (
    <section className="bg-secondary/50 py-24">
      <div ref={ref} className="mx-auto max-w-7xl px-4">
        <div className={`mx-auto max-w-2xl text-center transition-all duration-700 ${inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
            Testimonials
          </span>
          <h2 className="mt-4 font-serif text-3xl font-bold text-foreground md:text-4xl text-balance">
            What Our Clients Say
          </h2>
        </div>

        <div
          className={`relative mt-14 transition-all duration-700 delay-200 ${inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Navigation */}
          <button
            onClick={prev}
            className="absolute -left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-md transition-all duration-200 hover:bg-primary hover:text-primary-foreground hover:scale-110 lg:-left-5"
            aria-label="Previous review"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={next}
            className="absolute -right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-md transition-all duration-200 hover:bg-primary hover:text-primary-foreground hover:scale-110 lg:-right-5"
            aria-label="Next review"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Cards */}
          <div className="grid gap-6 px-4 sm:grid-cols-2 lg:grid-cols-3">
            {getVisibleIndices().map((idx, pos) => {
              const t = testimonials[idx]
              return (
                <div
                  key={`${idx}-${pos}`}
                  className={`flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-500 hover:shadow-lg hover:-translate-y-1 ${pos === 2 ? "hidden lg:flex" : pos === 1 ? "hidden sm:flex" : ""}`}
                >
                  <div className="flex items-start justify-between">
                    <Quote className="h-8 w-8 text-primary/20" />
                    <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                      {t.trip}
                    </span>
                  </div>
                  <div className="mt-3 flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                    &quot;{t.text}&quot;
                  </p>
                  <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full ${t.color} text-xs font-bold text-card`}>
                      {t.initials}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{t.name}</p>
                      <p className="text-xs text-muted-foreground">via {t.source}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Dots */}
          <div className="mt-8 flex justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === currentIndex ? "w-8 bg-primary" : "w-2.5 bg-border hover:bg-muted-foreground"
                }`}
                aria-label={`Go to review ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
