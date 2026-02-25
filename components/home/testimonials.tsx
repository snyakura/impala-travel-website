"use client"

import { useState } from "react"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Sean Hunter",
    initials: "S",
    color: "bg-primary",
    rating: 5,
    text: "Super service and excellent customer service. Had a minor problem with the booking at night and they came out to fix it. Will continue using them for all our travel needs.",
    source: "Google",
  },
  {
    name: "Daryl Holme",
    initials: "D",
    color: "bg-amber-500",
    rating: 5,
    text: "The rental process was easy and smooth. But what impressed us the most was when we had a problem, the office manager personally drove out to assist us. Truly outstanding service!",
    source: "Google",
  },
  {
    name: "Macdonald Dube",
    initials: "M",
    color: "bg-rose-500",
    rating: 5,
    text: "Impala Travel offers professional and reliable service, making the booking process smooth from start to finish. The packages are well-maintained, clean, and ready for both business and leisure travel.",
    source: "Google",
  },
  {
    name: "Linda Moyo",
    initials: "L",
    color: "bg-blue-500",
    rating: 5,
    text: "Absolutely loved our Victoria Falls safari package! Everything was well organized, the guide was knowledgeable, and the hotel was superb. Highly recommend Impala Travel to everyone.",
    source: "Google",
  },
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const visibleCount = 3
  const maxIndex = Math.max(0, testimonials.length - visibleCount)

  return (
    <section className="bg-secondary py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Testimonials</p>
          <h2 className="mt-2 font-serif text-3xl font-bold text-foreground md:text-4xl text-balance">
            Our Customer Reviews
          </h2>
        </div>

        <div className="relative mt-14">
          {/* Navigation */}
          <button
            onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
            disabled={currentIndex === 0}
            className="absolute -left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-md transition-colors hover:bg-primary hover:text-primary-foreground disabled:opacity-30 lg:-left-5"
            aria-label="Previous review"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => setCurrentIndex(Math.min(maxIndex, currentIndex + 1))}
            disabled={currentIndex >= maxIndex}
            className="absolute -right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-md transition-colors hover:bg-primary hover:text-primary-foreground disabled:opacity-30 lg:-right-5"
            aria-label="Next review"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Cards */}
          <div className="overflow-hidden px-4">
            <div
              className="flex gap-6 transition-transform duration-500"
              style={{ transform: `translateX(-${currentIndex * (100 / visibleCount)}%)` }}
            >
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className="w-full flex-shrink-0 sm:w-1/2 lg:w-1/3"
                >
                  <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm">
                    <Quote className="h-8 w-8 text-primary/20" />
                    <div className="mt-3 flex gap-0.5">
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {t.text}
                    </p>
                    <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full ${t.color} text-sm font-bold text-card`}
                      >
                        {t.initials}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{t.name}</p>
                        <p className="text-xs text-muted-foreground">via {t.source}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="mt-8 flex justify-center gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-2.5 rounded-full transition-all ${
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
