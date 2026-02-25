import { Shield, FileText, Globe, Lock, Mail } from "lucide-react"

export const metadata = {
  title: "Privacy Policy | Impala Travel Agency",
  description: "Learn how Impala Travel Agency collects, uses, and protects your personal information.",
}

export default function PrivacyPage() {
  return (
    <>
      <section className="bg-primary py-16">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h1 className="font-serif text-4xl font-bold text-primary-foreground md:text-5xl">Privacy Policy</h1>
          <p className="mx-auto mt-3 max-w-xl text-primary-foreground/80">Last updated: February 2026</p>
        </div>
      </section>

      <section className="bg-background py-12">
        <div className="mx-auto max-w-3xl px-4">
          <div className="prose prose-lg max-w-none">
            {[
              {
                icon: FileText,
                title: "Information We Collect",
                content: "We collect personal information that you voluntarily provide when using our services, including your name, email address, phone number, passport details, travel preferences, and payment information. We also automatically collect certain information when you visit our website, such as your IP address, browser type, and browsing patterns.",
              },
              {
                icon: Globe,
                title: "How We Use Your Information",
                content: "We use your information to process bookings, arrange travel services, communicate with you about your trips, send promotional offers (with your consent), improve our services, and comply with legal obligations. We may share your information with travel service providers, airlines, hotels, and tour operators as necessary to fulfill your bookings.",
              },
              {
                icon: Lock,
                title: "Data Security",
                content: "We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. All payment transactions are encrypted using SSL technology. However, no method of transmission over the internet is 100% secure.",
              },
              {
                icon: Shield,
                title: "Your Rights",
                content: "You have the right to access, correct, or delete your personal data at any time. You may also object to processing or request data portability. To exercise these rights, please contact our data protection team at privacy@impalatravel.co.zw.",
              },
              {
                icon: Mail,
                title: "Contact Us",
                content: "If you have any questions about this Privacy Policy or our data practices, please contact us at privacy@impalatravel.co.zw or write to us at 40 Chiremba Road, Hillside, Harare, Zimbabwe.",
              },
            ].map((section) => (
              <div key={section.title} className="mb-8 rounded-2xl border border-border bg-card p-6 shadow-sm">
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
        </div>
      </section>
    </>
  )
}
