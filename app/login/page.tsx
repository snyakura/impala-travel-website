"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const router = useRouter()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      router.push("/dashboard")
    }, 1500)
  }

  return (
    <section className="flex min-h-[calc(100vh-140px)] bg-background">
      {/* Left - Image Panel */}
      <div className="relative hidden lg:flex lg:w-1/2">
        <Image
          src="/images/hero-safari.jpg"
          alt="African safari landscape"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-primary/50" />
        <div className="relative z-10 flex flex-col justify-between p-12">
          <Link href="/" className="inline-block">
            <Image src="/images/logo.png" alt="Impala Travel" width={140} height={42} className="h-10 w-auto brightness-0 invert" />
          </Link>
          <div>
            <h2 className="font-serif text-4xl font-bold text-primary-foreground text-balance">
              Your Journey{" "}Starts Here
            </h2>
            <p className="mt-3 max-w-sm text-primary-foreground/80">
              Sign in to manage your bookings, track your trips, and access exclusive travel deals.
            </p>
            <div className="mt-8 flex flex-col gap-3">
              {["Manage bookings and documents", "Access exclusive deals", "Track loyalty points"].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-primary-foreground/70">
                  <CheckCircle className="h-4 w-4 text-primary-foreground" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right - Form Panel */}
      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md animate-fade-in-up">
          <Link href="/" className="mb-8 inline-block lg:hidden">
            <Image src="/images/logo.png" alt="Impala Travel" width={140} height={42} className="h-10 w-auto" />
          </Link>

          <h1 className="text-2xl font-bold text-foreground">
            {isRegister ? "Create your account" : "Welcome back"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {isRegister
              ? "Join Impala Travel for a personalized travel experience."
              : "Sign in to access your travel dashboard."}
          </p>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
            {isRegister && (
              <div className="flex flex-col gap-1.5 animate-fade-in">
                <Label>Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" className="h-11 rounded-xl pl-10" required />
                </div>
              </div>
            )}
            <div className="flex flex-col gap-1.5">
              <Label>Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="h-11 rounded-xl pl-10" required />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <Label>Password</Label>
                {!isRegister && (
                  <button type="button" onClick={() => alert("Password reset email would be sent to your email address.")} className="text-xs text-primary hover:underline">
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="h-11 rounded-xl pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            {isRegister && (
              <div className="flex flex-col gap-1.5 animate-fade-in">
                <Label>Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    className="h-11 rounded-xl pl-10"
                    required
                  />
                </div>
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="h-11 w-full rounded-full bg-primary text-primary-foreground transition-all duration-200 hover:bg-accent hover:-translate-y-0.5 hover:shadow-md disabled:opacity-60"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
                  {isRegister ? "Creating account..." : "Signing in..."}
                </span>
              ) : (
                <>
                  {isRegister ? "Create Account" : "Sign In"} <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            {isRegister ? (
              <>
                Already have an account?{" "}
                <button onClick={() => setIsRegister(false)} className="font-semibold text-primary transition-colors hover:underline">
                  Sign in
                </button>
              </>
            ) : (
              <>
                {"Don't have an account?"}{" "}
                <button onClick={() => setIsRegister(true)} className="font-semibold text-primary transition-colors hover:underline">
                  Create one
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
