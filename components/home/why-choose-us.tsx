import { Shield, Clock, Award, Headphones } from "lucide-react"

const reasons = [
  {
    icon: Shield,
    title: "Trusted Agency",
    description: "Over a decade of reliable travel services with thousands of satisfied clients.",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock customer support to assist you whenever you need help.",
  },
  {
    icon: Award,
    title: "Award Winning",
    description: "Recognized as a leading travel agency with multiple industry accolades.",
  },
  {
    icon: Headphones,
    title: "Personalized Service",
    description: "Dedicated travel consultants to create your perfect trip experience.",
  },
]

export function WhyChooseUs() {
  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Why Impala</p>
          <h2 className="mt-2 font-serif text-3xl font-bold text-foreground md:text-4xl text-balance">
            Why Choose Us
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            We go above and beyond to make your travel experience seamless, memorable, and truly special.
          </p>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r) => (
            <div key={r.title} className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
                <r.icon className="h-8 w-8" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-foreground">{r.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
