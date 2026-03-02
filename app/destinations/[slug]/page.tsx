"use client"

import Image from "next/image"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import {
  MapPin, Star, Calendar, Users, Clock, Check, ChevronLeft,
  Sun, Thermometer, DollarSign, Camera, ArrowRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const destinationData: Record<string, {
  name: string; country: string; image: string; gallery: string[];
  rating: number; reviews: number; description: string; longDescription: string;
  highlights: string[]; bestTime: string; avgTemp: string; currency: string;
  tags: string[]; packages: { name: string; duration: string; price: number; features: string[] }[];
  activities: { name: string; icon: React.ReactNode; description: string }[];
}> = {
  "victoria-falls": {
    name: "Victoria Falls",
    country: "Zimbabwe",
    image: "/images/victoria-falls.jpg",
    gallery: ["/images/victoria-falls.jpg", "/images/hero-safari.jpg", "/images/safari-elephants.jpg"],
    rating: 4.9,
    reviews: 328,
    description: "One of the Seven Natural Wonders of the World",
    longDescription: "Victoria Falls, known locally as Mosi-oa-Tunya ('The Smoke That Thunders'), is one of the most spectacular waterfalls on the planet. Spanning 1,708 meters wide and 108 meters high, it creates a constant spray that can be seen from over 50km away. The surrounding area offers world-class adventure activities including bungee jumping, white water rafting, helicopter flights, and incredible wildlife safaris in nearby national parks.",
    highlights: ["Helicopter flight over the falls", "Bungee jumping from Victoria Falls Bridge", "Sunset cruise on the Zambezi", "White water rafting", "Walking with lions", "Visit the local craft markets"],
    bestTime: "February to May",
    avgTemp: "25°C",
    currency: "USD / ZWL",
    tags: ["Adventure", "Nature", "UNESCO"],
    packages: [
      { name: "Falls Explorer", duration: "3 days", price: 299, features: ["Falls guided tour", "Sunset cruise", "Hotel accommodation", "Airport transfer"] },
      { name: "Adventure Plus", duration: "5 days", price: 599, features: ["All Explorer features", "Helicopter flight", "White water rafting", "Bungee jump", "Safari day trip"] },
      { name: "Ultimate Victoria Falls", duration: "7 days", price: 999, features: ["All Adventure Plus", "Chobe day trip", "Walking with lions", "Spa treatment", "Premium lodge"] },
    ],
    activities: [
      { name: "Scenic Flights", icon: <Camera className="h-5 w-5" />, description: "Breathtaking helicopter rides over the falls" },
      { name: "Water Rafting", icon: <Star className="h-5 w-5" />, description: "Grade 5 rapids on the Zambezi River" },
      { name: "Wildlife Safari", icon: <Sun className="h-5 w-5" />, description: "Game drives in Zambezi National Park" },
    ],
  },
  "kariba": {
    name: "Lake Kariba",
    country: "Zimbabwe",
    image: "/images/kariba.jpg",
    gallery: ["/images/kariba.jpg", "/images/hero-safari.jpg"],
    rating: 4.7,
    reviews: 189,
    description: "Africa's largest man-made lake",
    longDescription: "Lake Kariba is one of the world's largest man-made lakes, stretching over 220 kilometers along the border of Zambia and Zimbabwe. It is famous for its spectacular sunsets, houseboat safaris, tiger fishing, and the wildlife along its shores. The iconic drowned trees that still stand in the lake create a hauntingly beautiful landscape.",
    highlights: ["Houseboat safari", "Tiger fishing", "Kariba Dam wall tour", "Game drives along the shores", "Bird watching", "Spectacular sunsets"],
    bestTime: "May to October",
    avgTemp: "28°C",
    currency: "USD / ZWL",
    tags: ["Lake", "Safari", "Relaxation"],
    packages: [
      { name: "Kariba Getaway", duration: "3 days", price: 249, features: ["Houseboat 2 nights", "Fishing equipment", "Meals included", "Transfer"] },
      { name: "Kariba Explorer", duration: "5 days", price: 449, features: ["Houseboat 4 nights", "Game drive", "Tiger fishing", "Sunset cruise", "All meals"] },
    ],
    activities: [
      { name: "Houseboat Safari", icon: <Sun className="h-5 w-5" />, description: "Cruise the lake in comfort" },
      { name: "Tiger Fishing", icon: <Star className="h-5 w-5" />, description: "World-class fishing experience" },
      { name: "Dam Wall Tour", icon: <Camera className="h-5 w-5" />, description: "Engineering marvel visit" },
    ],
  },
  "hwange": {
    name: "Hwange National Park",
    country: "Zimbabwe",
    image: "/images/hwange.jpg",
    gallery: ["/images/hwange.jpg", "/images/safari-elephants.jpg"],
    rating: 4.8,
    reviews: 256,
    description: "Zimbabwe's largest and most famous game reserve",
    longDescription: "Hwange National Park, covering over 14,600 square kilometers, is Zimbabwe's biggest game reserve and one of Africa's premier wildlife destinations. It is home to one of the largest elephant populations in the world, with over 44,000 elephants, along with lions, wild dogs, sable antelope, and over 400 bird species.",
    highlights: ["Big Five game drives", "Walking safaris", "Night drives", "Painted Dog conservation", "Bird watching", "Photographic safaris"],
    bestTime: "July to October",
    avgTemp: "26°C",
    currency: "USD / ZWL",
    tags: ["Safari", "Wildlife", "Nature"],
    packages: [
      { name: "Hwange Safari", duration: "3 days", price: 349, features: ["Lodge accommodation", "2 game drives daily", "Park fees", "Meals"] },
      { name: "Hwange Ultimate", duration: "5 days", price: 699, features: ["Premium camp", "Walking safari", "Night drive", "Conservation visit", "All inclusive"] },
    ],
    activities: [
      { name: "Game Drives", icon: <Sun className="h-5 w-5" />, description: "Morning and afternoon drives" },
      { name: "Walking Safari", icon: <Star className="h-5 w-5" />, description: "Get close to nature on foot" },
      { name: "Bird Watching", icon: <Camera className="h-5 w-5" />, description: "Over 400 species to spot" },
    ],
  },
  "great-zimbabwe": {
    name: "Great Zimbabwe",
    country: "Zimbabwe",
    image: "/images/great-zimbabwe.jpg",
    gallery: ["/images/great-zimbabwe.jpg", "/images/cultural-village.jpg"],
    rating: 4.6,
    reviews: 142,
    description: "The ancient ruins of a medieval African city",
    longDescription: "Great Zimbabwe is a ruined medieval city in south-eastern Zimbabwe that served as the capital of the Kingdom of Zimbabwe during the country's Late Iron Age. It is now a UNESCO World Heritage Site and one of Africa's most significant archaeological sites, featuring impressive stone walls built without mortar.",
    highlights: ["Guided ruins tour", "Museum visit", "Cultural performances", "Hiking trails", "Bird watching", "Sunset viewpoints"],
    bestTime: "April to October",
    avgTemp: "22°C",
    currency: "USD / ZWL",
    tags: ["History", "Culture", "UNESCO"],
    packages: [
      { name: "Heritage Tour", duration: "2 days", price: 199, features: ["Guided tour", "Museum entry", "Accommodation", "Meals"] },
      { name: "Cultural Immersion", duration: "4 days", price: 399, features: ["Extended tour", "Cultural village visit", "Traditional dinner", "Masvingo city tour"] },
    ],
    activities: [
      { name: "Ruins Tour", icon: <Camera className="h-5 w-5" />, description: "Expert-guided archaeological walk" },
      { name: "Cultural Visit", icon: <Star className="h-5 w-5" />, description: "Experience local traditions" },
      { name: "Museum", icon: <Sun className="h-5 w-5" />, description: "Artifacts and history exhibits" },
    ],
  },
  "nyanga": {
    name: "Nyanga & Eastern Highlands",
    country: "Zimbabwe",
    image: "/images/nyanga.jpg",
    gallery: ["/images/nyanga.jpg", "/images/mountain-hiking.jpg"],
    rating: 4.5,
    reviews: 118,
    description: "Zimbabwe's premier highland retreat",
    longDescription: "Nyanga is nestled in the Eastern Highlands of Zimbabwe, the country's highest area. It offers cool mountain air, spectacular waterfalls including Mutarazi Falls (the second-highest in Africa), rolling green hills, pine forests, and outdoor adventure activities. It is the perfect escape from the African heat.",
    highlights: ["Mutarazi Falls hike", "Trout fishing", "Mountain biking", "Zip-lining", "Horseback riding", "Tea estate visits"],
    bestTime: "September to November",
    avgTemp: "18°C",
    currency: "USD / ZWL",
    tags: ["Mountains", "Hiking", "Nature"],
    packages: [
      { name: "Highland Escape", duration: "3 days", price: 219, features: ["Mountain lodge", "Guided hike", "Trout fishing", "Meals"] },
      { name: "Adventure Highlands", duration: "5 days", price: 449, features: ["Premium lodge", "All activities", "Zip-lining", "Horseback riding", "Full board"] },
    ],
    activities: [
      { name: "Hiking", icon: <Sun className="h-5 w-5" />, description: "Trails through mountains and waterfalls" },
      { name: "Trout Fishing", icon: <Star className="h-5 w-5" />, description: "World-class fly fishing" },
      { name: "Zip-lining", icon: <Camera className="h-5 w-5" />, description: "Adrenaline over the valleys" },
    ],
  },
  "cape-town": {
    name: "Cape Town",
    country: "South Africa",
    image: "/images/cape-town.jpg",
    gallery: ["/images/cape-town.jpg", "/images/beach-resort.jpg"],
    rating: 4.9,
    reviews: 512,
    description: "Where Table Mountain meets the Atlantic Ocean",
    longDescription: "Cape Town is a vibrant, world-class city at the southern tip of Africa. It offers a unique blend of stunning beaches, the iconic Table Mountain, world-renowned vineyards, rich cultural heritage, and a thriving culinary scene. From the colorful Bo-Kaap neighbourhood to the poignant Robben Island, Cape Town captivates every visitor.",
    highlights: ["Table Mountain cable car", "Cape Peninsula tour", "Wine tasting in Stellenbosch", "Robben Island", "V&A Waterfront", "Boulder Beach penguins"],
    bestTime: "November to March",
    avgTemp: "24°C",
    currency: "ZAR",
    tags: ["City", "Beach", "Culture"],
    packages: [
      { name: "Cape Town City Break", duration: "4 days", price: 499, features: ["Hotel", "Table Mountain", "City tour", "Airport transfer", "Breakfast"] },
      { name: "Cape Explorer", duration: "7 days", price: 899, features: ["Premium hotel", "Peninsula tour", "Wine tour", "Robben Island", "All meals", "Private guide"] },
    ],
    activities: [
      { name: "Table Mountain", icon: <Sun className="h-5 w-5" />, description: "Cable car ride with views" },
      { name: "Wine Tours", icon: <Star className="h-5 w-5" />, description: "World-class vineyards" },
      { name: "Peninsula Drive", icon: <Camera className="h-5 w-5" />, description: "Cape of Good Hope journey" },
    ],
  },
  "zanzibar": {
    name: "Zanzibar",
    country: "Tanzania",
    image: "/images/zanzibar.jpg",
    gallery: ["/images/zanzibar.jpg", "/images/beach-resort.jpg"],
    rating: 4.8,
    reviews: 387,
    description: "The Spice Island paradise of East Africa",
    longDescription: "Zanzibar is a semi-autonomous archipelago off the coast of Tanzania, renowned for its pristine white sand beaches, turquoise waters, and the historic Stone Town. Known as the Spice Island, Zanzibar offers a unique blend of African, Arab, and Indian cultures, incredible snorkeling and diving, and some of the most beautiful beach resorts in the world.",
    highlights: ["Stone Town walking tour", "Spice plantation tour", "Snorkeling at Mnemba Atoll", "Jozani Forest", "Dhow sunset cruise", "Beach relaxation"],
    bestTime: "June to October",
    avgTemp: "27°C",
    currency: "TZS / USD",
    tags: ["Beach", "Island", "Culture"],
    packages: [
      { name: "Zanzibar Beach Escape", duration: "5 days", price: 599, features: ["Beach resort", "Stone Town tour", "Spice tour", "Flights", "Breakfast"] },
      { name: "Zanzibar Paradise", duration: "7 days", price: 999, features: ["Premium resort", "All tours", "Snorkeling trip", "Dhow cruise", "All inclusive"] },
    ],
    activities: [
      { name: "Snorkeling", icon: <Sun className="h-5 w-5" />, description: "Crystal clear reef waters" },
      { name: "Stone Town", icon: <Camera className="h-5 w-5" />, description: "UNESCO heritage walk" },
      { name: "Spice Tour", icon: <Star className="h-5 w-5" />, description: "Aromatic plantation visit" },
    ],
  },
}

export default function DestinationDetailPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  const dest = destinationData[slug]
  const [selectedImage, setSelectedImage] = useState(0)

  if (!dest) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4">
        <h1 className="text-2xl font-bold text-foreground">Destination not found</h1>
        <p className="text-muted-foreground">The destination you are looking for does not exist.</p>
        <Link href="/destinations">
          <Button className="rounded-full bg-primary text-primary-foreground">View All Destinations</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative h-[55vh] min-h-[400px] overflow-hidden">
        <Image src={dest.gallery[selectedImage]} alt={dest.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-foreground/20 to-foreground/40" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
          <div className="mx-auto max-w-7xl">
            <button
              onClick={() => router.push("/destinations")}
              className="mb-4 flex items-center gap-1.5 rounded-full bg-card/20 px-4 py-1.5 text-sm text-card backdrop-blur-sm transition-colors hover:bg-card/30"
            >
              <ChevronLeft className="h-4 w-4" />
              All Destinations
            </button>
            <div className="flex items-center gap-2 text-card/80">
              <MapPin className="h-4 w-4" />
              <span>{dest.country}</span>
            </div>
            <h1 className="mb-2 font-serif text-4xl font-bold text-card sm:text-5xl md:text-6xl">
              {dest.name}
            </h1>
            <p className="mb-4 max-w-xl text-lg text-card/80">{dest.description}</p>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1 rounded-full bg-card/20 px-3 py-1 backdrop-blur-sm">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-bold text-card">{dest.rating}</span>
                <span className="text-xs text-card/70">({dest.reviews} reviews)</span>
              </div>
              {dest.tags.map((t) => (
                <Badge key={t} className="bg-primary/80 text-primary-foreground backdrop-blur-sm">
                  {t}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Thumbnails */}
      {dest.gallery.length > 1 && (
        <div className="mx-auto -mt-6 flex max-w-7xl gap-2 px-6 sm:px-10">
          {dest.gallery.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelectedImage(i)}
              className={`relative h-16 w-24 overflow-hidden rounded-lg border-2 transition-all sm:h-20 sm:w-32 ${
                selectedImage === i ? "border-primary shadow-lg" : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <Image src={img} alt={`${dest.name} ${i + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Content */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="mb-8 w-full justify-start rounded-full bg-secondary p-1">
                <TabsTrigger value="overview" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Overview</TabsTrigger>
                <TabsTrigger value="packages" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Packages</TabsTrigger>
                <TabsTrigger value="activities" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Activities</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-8">
                <div>
                  <h2 className="mb-4 text-2xl font-bold text-foreground">About {dest.name}</h2>
                  <p className="text-muted-foreground leading-relaxed">{dest.longDescription}</p>
                </div>
                <div>
                  <h3 className="mb-4 text-xl font-bold text-foreground">Highlights</h3>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {dest.highlights.map((h) => (
                      <div key={h} className="flex items-center gap-3 rounded-xl bg-secondary p-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                          <Check className="h-4 w-4 text-primary" />
                        </div>
                        <span className="text-sm text-foreground">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="packages" className="space-y-6">
                <h2 className="text-2xl font-bold text-foreground">Travel Packages</h2>
                {dest.packages.map((pkg) => (
                  <div key={pkg.name} className="rounded-2xl border border-border bg-card p-6 transition-all hover:shadow-lg">
                    <div className="mb-4 flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-foreground">{pkg.name}</h3>
                        <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {pkg.duration}</span>
                          <span className="flex items-center gap-1"><Users className="h-4 w-4" /> Per person</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">From</div>
                        <div className="text-3xl font-bold text-primary">${pkg.price}</div>
                      </div>
                    </div>
                    <div className="mb-4 grid gap-2 sm:grid-cols-2">
                      {pkg.features.map((f) => (
                        <div key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Check className="h-3.5 w-3.5 text-primary" />
                          {f}
                        </div>
                      ))}
                    </div>
                    <Link href={`/booking?destination=${slug}&package=${encodeURIComponent(pkg.name)}`}>
                      <Button className="w-full rounded-full bg-primary text-primary-foreground hover:bg-accent sm:w-auto">
                        Book This Package <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="activities" className="space-y-6">
                <h2 className="text-2xl font-bold text-foreground">Things To Do</h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {dest.activities.map((a) => (
                    <div key={a.name} className="rounded-2xl border border-border bg-card p-6 text-center transition-all hover:-translate-y-1 hover:shadow-lg">
                      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        {a.icon}
                      </div>
                      <h3 className="mb-2 font-bold text-foreground">{a.name}</h3>
                      <p className="text-sm text-muted-foreground">{a.description}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="mb-4 text-lg font-bold text-foreground">Quick Info</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Best Time to Visit</div>
                    <div className="text-sm font-medium text-foreground">{dest.bestTime}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                    <Thermometer className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Average Temperature</div>
                    <div className="text-sm font-medium text-foreground">{dest.avgTemp}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                    <DollarSign className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Currency</div>
                    <div className="text-sm font-medium text-foreground">{dest.currency}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Card */}
            <div className="rounded-2xl bg-primary p-6 text-primary-foreground">
              <h3 className="mb-2 text-lg font-bold">Ready to explore {dest.name}?</h3>
              <p className="mb-4 text-sm text-primary-foreground/80">Book your trip today and experience the adventure of a lifetime.</p>
              <Link href={`/booking?destination=${slug}`}>
                <Button className="w-full rounded-full bg-card text-primary hover:bg-card/90">
                  Book Now
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="mt-2 w-full rounded-full border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                  Get a Custom Quote
                </Button>
              </Link>
            </div>

            {/* Need Documents */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="mb-2 text-lg font-bold text-foreground">Travel Documents</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Upload your passport, visa, and travel documents securely through our portal.
              </p>
              <Link href="/documents">
                <Button variant="outline" className="w-full rounded-full">
                  Upload Documents
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
