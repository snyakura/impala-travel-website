import Image from "next/image"
import Link from "next/link"
import { Clock, Tag, MapPin, ArrowRight, Star, Percent, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export const metadata = {
  title: "Promotions & Deals | Impala Travel Agency",
  description: "Discover exclusive travel deals, seasonal promotions, and limited-time offers from Impala Travel Agency.",
}

const featuredDeal = {
  title: "Victoria Falls Weekend Escape",
  description:
    "Experience the majesty of Victoria Falls with a 3-night luxury stay including guided tour of the falls, sunset cruise on the Zambezi, and all meals included. Limited availability for the dry season!",
  image: "/images/victoria-falls.jpg",
  originalPrice: 1899,
  salePrice: 1299,
  discount: 32,
  validUntil: "March 31, 2026",
  destination: "Victoria Falls, Zimbabwe",
}

const promotions = [
  {
    title: "Safari & Beach Combo",
    description: "7-night Hwange safari plus Mozambique beach retreat with flights included.",
    image: "/images/safari-elephants.jpg",
    originalPrice: 3200,
    salePrice: 2499,
    discount: 22,
    validUntil: "April 15, 2026",
    destination: "Hwange + Mozambique",
    tag: "Best Seller",
  },
  {
    title: "Cultural Discovery Tour",
    description: "Explore Great Zimbabwe ruins, Matobo Hills, and Harare arts scene over 4 days.",
    image: "/images/cultural-village.jpg",
    originalPrice: 799,
    salePrice: 599,
    discount: 25,
    validUntil: "May 1, 2026",
    destination: "Southern Zimbabwe",
    tag: "New",
  },
  {
    title: "Mountain Adventure Package",
    description: "3-night Nyanga highlands hiking, trout fishing, and zip-lining adventure.",
    image: "/images/mountain-hiking.jpg",
    originalPrice: 650,
    salePrice: 449,
    discount: 31,
    validUntil: "June 30, 2026",
    destination: "Eastern Highlands",
    tag: "Adventure",
  },
  {
    title: "Tropical Beach Getaway",
    description: "5-night all-inclusive beach resort with snorkeling, spa, and island excursions.",
    image: "/images/beach-resort.jpg",
    originalPrice: 2100,
    salePrice: 1599,
    discount: 24,
    validUntil: "April 30, 2026",
    destination: "Bazaruto, Mozambique",
    tag: "Luxury",
  },
]

const seasonalOffers = [
  {
    icon: Percent,
    title: "Early Bird Discount",
    description: "Book 3+ months in advance and save 15% on any package.",
  },
  {
    icon: Gift,
    title: "Group Special",
    description: "Groups of 6+ get a complimentary airport transfer and welcome dinner.",
  },
  {
    icon: Star,
    title: "Loyalty Rewards",
    description: "Returning customers enjoy 10% off their next booking automatically.",
  },
]

export default function PromotionsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary py-16">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h1 className="font-serif text-4xl font-bold text-primary-foreground md:text-5xl">
            Exclusive Travel Deals
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-primary-foreground/80">
            Grab limited-time offers on our most popular destinations and packages.
          </p>
        </div>
      </section>

      {/* Featured Deal */}
      <section className="bg-background py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <div className="grid lg:grid-cols-2">
              <div className="relative aspect-[4/3] lg:aspect-auto">
                <Image
                  src={featuredDeal.image}
                  alt={featuredDeal.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute left-4 top-4">
                  <Badge className="bg-destructive text-destructive-foreground px-3 py-1 text-sm font-bold">
                    {featuredDeal.discount}% OFF
                  </Badge>
                </div>
              </div>
              <div className="flex flex-col justify-center p-8 lg:p-12">
                <Badge variant="outline" className="mb-3 w-fit border-primary text-primary">
                  Featured Deal
                </Badge>
                <h2 className="font-serif text-3xl font-bold text-foreground">{featuredDeal.title}</h2>
                <p className="mt-3 leading-relaxed text-muted-foreground">{featuredDeal.description}</p>
                <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" /> {featuredDeal.destination}
                </div>
                <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" /> Valid until {featuredDeal.validUntil}
                </div>
                <div className="mt-6 flex items-center gap-4">
                  <span className="text-lg text-muted-foreground line-through">
                    ${featuredDeal.originalPrice}
                  </span>
                  <span className="text-4xl font-bold text-primary">
                    ${featuredDeal.salePrice}
                  </span>
                  <span className="text-sm text-muted-foreground">per person</span>
                </div>
                <Link href="/booking" className="mt-6">
                  <Button className="rounded-full bg-primary px-8 text-primary-foreground hover:bg-accent">
                    Book This Deal <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Promotions Grid */}
      <section className="bg-secondary py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-center font-serif text-3xl font-bold text-foreground">More Great Deals</h2>
          <p className="mx-auto mt-2 max-w-lg text-center text-muted-foreground">
            Browse our curated selection of travel deals across Africa.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {promotions.map((promo) => (
              <div
                key={promo.title}
                className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-lg"
              >
                <div className="relative aspect-[4/3]">
                  <Image src={promo.image} alt={promo.title} fill className="object-cover transition-transform group-hover:scale-105" />
                  <div className="absolute left-3 top-3 flex gap-2">
                    <Badge className="bg-destructive text-destructive-foreground text-xs font-bold">
                      {promo.discount}% OFF
                    </Badge>
                    {promo.tag && (
                      <Badge variant="secondary" className="text-xs">{promo.tag}</Badge>
                    )}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-foreground">{promo.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground line-clamp-2">{promo.description}</p>
                  <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" /> {promo.destination}
                  </div>
                  <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" /> Until {promo.validUntil}
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-sm text-muted-foreground line-through">${promo.originalPrice}</span>
                    <span className="text-xl font-bold text-primary">${promo.salePrice}</span>
                  </div>
                  <Link href="/booking">
                    <Button size="sm" className="mt-3 w-full rounded-full bg-primary text-primary-foreground hover:bg-accent">
                      Book Now
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seasonal Offers */}
      <section className="bg-background py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-center font-serif text-3xl font-bold text-foreground">Ongoing Offers</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {seasonalOffers.map((offer) => (
              <div key={offer.title} className="flex flex-col items-center rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <offer.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-foreground">{offer.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{offer.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <Tag className="mx-auto h-10 w-10 text-primary-foreground/70" />
          <h2 className="mt-4 font-serif text-3xl font-bold text-primary-foreground">
            Don&apos;t Miss Out
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-primary-foreground/80">
            These deals are for a limited time only. Contact us to secure your spot or customize any package to your needs.
          </p>
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href="/booking">
              <Button size="lg" className="rounded-full bg-card text-foreground hover:bg-card/90">
                Start Booking
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="rounded-full border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
