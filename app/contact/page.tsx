"use client"

import { useState } from "react"
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const contactInfo = [
  {
    icon: MapPin,
    title: "Our Office",
    lines: ["40 Chiremba Road", "Hillside, Harare, Zimbabwe"],
  },
  {
    icon: Phone,
    title: "Phone",
    lines: ["+263 772 302 946", "+263 712 945 076"],
  },
  {
    icon: Mail,
    title: "Email",
    lines: ["info@impalatravel.co.zw", "bookings@impalatravel.co.zw"],
  },
  {
    icon: Clock,
    title: "Working Hours",
    lines: ["Mon - Fri: 8:00 AM - 5:00 PM", "Sat: 8:00 AM - 1:00 PM"],
  },
]

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary py-24">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full border-[40px] border-primary-foreground" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 text-center">
          <h1 className="font-serif text-4xl font-bold text-primary-foreground md:text-5xl">Contact Us</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-primary-foreground/80">
            Have questions or need assistance? Our travel consultants are ready to help you plan your perfect trip.
          </p>
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Contact Info */}
            <div className="lg:col-span-2">
              <h2 className="font-serif text-2xl font-bold text-foreground">Get in Touch</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                Reach out to us via any of the channels below. We&apos;d love to hear from you.
              </p>
              <div className="mt-8 flex flex-col gap-6">
                {contactInfo.map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{item.title}</p>
                      {item.lines.map((line) => (
                        <p key={line} className="text-sm text-muted-foreground">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="rounded-2xl border border-border bg-card p-8 shadow-sm lg:col-span-3">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Send className="h-8 w-8" />
                  </div>
                  <h3 className="mt-4 text-2xl font-bold text-foreground">Message Sent!</h3>
                  <p className="mt-2 text-muted-foreground">
                    Thank you for reaching out. Our team will get back to you within 24 hours.
                  </p>
                  <Button className="mt-6 rounded-full bg-primary text-primary-foreground" onClick={() => setSubmitted(false)}>
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <h3 className="text-xl font-bold text-foreground">Send Us a Message</h3>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" placeholder="John Doe" required />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" placeholder="john@example.com" required />
                    </div>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" placeholder="+263 7XX XXX XXX" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" placeholder="Trip enquiry" required />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="Tell us about your travel plans..." rows={5} required />
                  </div>
                  <Button type="submit" size="lg" className="self-start rounded-full bg-primary px-8 text-primary-foreground hover:bg-accent">
                    Send Message
                    <Send className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="bg-secondary py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3798.5!2d31.05!3d-17.82!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDQ5JzEyLjAiUyAzMcKwMDMnMDAuMCJF!5e0!3m2!1sen!2szw!4v1709000000000"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Impala Travel Agency Location - 40 Chiremba Road, Hillside, Harare"
              className="w-full"
            />
          </div>
        </div>
      </section>
    </>
  )
}
