import { FileText, Scale, AlertTriangle, CreditCard, XCircle } from "lucide-react"

export const metadata = {
  title: "Terms & Conditions | Impala Travel Agency",
  description: "Read the terms and conditions governing the use of Impala Travel Agency services.",
}

export default function TermsPage() {
  return (
    <>
      <section className="bg-primary py-16">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h1 className="font-serif text-4xl font-bold text-primary-foreground md:text-5xl">Terms & Conditions</h1>
          <p className="mx-auto mt-3 max-w-xl text-primary-foreground/80">Last updated: February 2026</p>
        </div>
      </section>

      <section className="bg-background py-12">
        <div className="mx-auto max-w-3xl px-4">
          {[
            {
              icon: FileText,
              title: "1. General Terms",
              content: "By accessing and using the Impala Travel Agency website and services, you accept and agree to be bound by these terms and conditions. All bookings made through our platform are subject to these terms as well as the specific conditions of the travel service providers involved.",
            },
            {
              icon: CreditCard,
              title: "2. Booking & Payment",
              content: "A booking is confirmed only upon receipt of the required deposit or full payment. Prices are quoted in USD unless otherwise stated. We accept major credit cards, bank transfers, and mobile payments. Full payment is typically required 30 days before the travel date. Failure to pay by the due date may result in automatic cancellation.",
            },
            {
              icon: XCircle,
              title: "3. Cancellation Policy",
              content: "Cancellations made 60+ days before departure: Full refund minus administrative fee. 30-59 days: 50% refund. 15-29 days: 25% refund. Less than 15 days: No refund. Some travel packages may have different cancellation terms as specified at the time of booking. We strongly recommend purchasing travel insurance.",
            },
            {
              icon: AlertTriangle,
              title: "4. Liability",
              content: "Impala Travel Agency acts as an intermediary between travelers and service providers. While we take every care to ensure the quality of services, we are not liable for acts, omissions, or defaults of third-party suppliers. We are not responsible for delays, cancellations, or changes caused by force majeure, including natural disasters, pandemics, or political unrest.",
            },
            {
              icon: Scale,
              title: "5. Governing Law",
              content: "These terms and conditions are governed by and construed in accordance with the laws of Zimbabwe. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of Zimbabwe.",
            },
          ].map((section) => (
            <div key={section.title} className="mb-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <section.icon className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-bold text-foreground">{section.title}</h2>
              </div>
              <p className="mt-4 leading-relaxed text-muted-foreground">{section.content}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
