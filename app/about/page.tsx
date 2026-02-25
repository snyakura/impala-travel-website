import Image from "next/image"
import { Target, Heart, Eye, Users, Award, Globe } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us | Impala Travel Agency",
  description: "Learn about Impala Travel Agency - our mission, values, team, and commitment to providing world-class travel services across Africa.",
}

const values = [
  {
    icon: Heart,
    title: "Customer First",
    description: "Every decision we make is centered around providing the best experience for our clients.",
  },
  {
    icon: Globe,
    title: "Excellence",
    description: "We set the highest standards in every service we deliver, from booking to travel completion.",
  },
  {
    icon: Users,
    title: "Community",
    description: "We invest in local communities and sustainable tourism practices across all destinations.",
  },
]

const team = [
  { name: "James Moyo", role: "Managing Director", initials: "JM" },
  { name: "Sarah Dube", role: "Head of Operations", initials: "SD" },
  { name: "Tendai Nyathi", role: "Senior Travel Consultant", initials: "TN" },
  { name: "Grace Mutasa", role: "Marketing Manager", initials: "GM" },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary py-24">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border-[40px] border-primary-foreground" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 text-center">
          <h1 className="font-serif text-4xl font-bold text-primary-foreground md:text-5xl">About Us</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-primary-foreground/80">
            Discover the story behind Impala Travel Agency and our passion for creating unforgettable travel experiences.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative h-96 overflow-hidden rounded-2xl">
              <Image src="/images/cultural-village.jpg" alt="Impala Travel team" fill className="object-cover" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">Our Story</p>
              <h2 className="mt-2 font-serif text-3xl font-bold text-foreground md:text-4xl text-balance">
                Your Partner in Travel Convenience
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Impala Travel Agency has been a trusted name in the travel industry for over a decade.
                Founded with a vision to make African travel accessible, comfortable, and memorable, we have
                grown into a full-service travel agency offering everything from flight bookings and hotel
                reservations to safari tours and custom travel planning.
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Our dedicated team of travel experts brings firsthand knowledge of the most incredible
                destinations across Africa and beyond, ensuring every trip is meticulously planned and
                executed to perfection.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center rounded-xl bg-secondary p-4 text-center">
                  <Target className="mb-2 h-6 w-6 text-primary" />
                  <span className="text-2xl font-bold text-foreground">10+</span>
                  <span className="text-xs text-muted-foreground">Years Experience</span>
                </div>
                <div className="flex flex-col items-center rounded-xl bg-secondary p-4 text-center">
                  <Users className="mb-2 h-6 w-6 text-primary" />
                  <span className="text-2xl font-bold text-foreground">5000+</span>
                  <span className="text-xs text-muted-foreground">Happy Clients</span>
                </div>
                <div className="flex flex-col items-center rounded-xl bg-secondary p-4 text-center">
                  <Award className="mb-2 h-6 w-6 text-primary" />
                  <span className="text-2xl font-bold text-foreground">15+</span>
                  <span className="text-xs text-muted-foreground">Awards Won</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section id="values" className="bg-secondary py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">What We Stand For</p>
            <h2 className="mt-2 font-serif text-3xl font-bold text-foreground md:text-4xl">Our Values</h2>
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="flex flex-col items-center rounded-2xl bg-card p-10 text-center shadow-sm">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <v.icon className="h-8 w-8" />
                </div>
                <h3 className="mt-5 text-xl font-bold text-foreground">{v.title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Our People</p>
            <h2 className="mt-2 font-serif text-3xl font-bold text-foreground md:text-4xl">Meet the Team</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Our passionate team brings years of industry expertise and firsthand travel experience.
            </p>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <div key={member.name} className="group flex flex-col items-center rounded-2xl border border-border bg-card p-8 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                  {member.initials}
                </div>
                <h3 className="mt-4 text-lg font-bold text-foreground">{member.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission/Vision */}
      <section className="bg-primary py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-12 md:grid-cols-2">
            <div className="rounded-2xl bg-primary-foreground/10 p-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-foreground text-primary">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-2xl font-bold text-primary-foreground">Our Mission</h3>
              <p className="mt-3 leading-relaxed text-primary-foreground/80">
                To provide world-class travel services that make every journey comfortable, memorable, and
                accessible. We strive to be the leading travel partner in Africa by delivering personalized
                experiences that exceed expectations.
              </p>
            </div>
            <div className="rounded-2xl bg-primary-foreground/10 p-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-foreground text-primary">
                <Eye className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-2xl font-bold text-primary-foreground">Our Vision</h3>
              <p className="mt-3 leading-relaxed text-primary-foreground/80">
                To be Africa&apos;s most trusted travel agency, renowned for excellence, innovation, and
                commitment to sustainable tourism. We envision a world where every traveler experiences the
                beauty and richness of our continent.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
