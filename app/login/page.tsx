"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

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
        <div className="absolute inset-0 bg-primary/60" />
        <div className="relative z-10 flex flex-col justify-end p-12">
          <h2 className="font-serif text-4xl font-bold text-primary-foreground">
            Your Journey<br />Starts Here
          </h2>
          <p className="mt-3 max-w-sm text-primary-foreground/80">
            Sign in to manage your bookings, track your trips, and access exclusive travel deals.
          </p>
        </div>
      </div>

      {/* Right - Form Panel */}
      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <Link href="/" className="mb-8 inline-block">
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

          <form onSubmit={(e) => e.preventDefault()} className="mt-8 flex flex-col gap-5">
            {isRegister && (
              <div className="flex flex-col gap-1.5">
                <Label>Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="John Doe" className="pl-10" />
                </div>
              </div>
            )}
            <div className="flex flex-col gap-1.5">
              <Label>Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input type="email" placeholder="you@example.com" className="pl-10" />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <Label>Password</Label>
                {!isRegister && (
                  <Link href="#" className="text-xs text-primary hover:underline">
                    Forgot password?
                  </Link>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            {isRegister && (
              <div className="flex flex-col gap-1.5">
                <Label>Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    className="pl-10"
                  />
                </div>
              </div>
            )}

            <Button type="submit" className="w-full rounded-full bg-primary text-primary-foreground hover:bg-accent">
              {isRegister ? "Create Account" : "Sign In"} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            {isRegister ? (
              <>
                Already have an account?{" "}
                <button onClick={() => setIsRegister(false)} className="font-medium text-primary hover:underline">
                  Sign in
                </button>
              </>
            ) : (
              <>
                Don&apos;t have an account?{" "}
                <button onClick={() => setIsRegister(true)} className="font-medium text-primary hover:underline">
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
