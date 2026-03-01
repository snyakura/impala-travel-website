"use client"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send, Bot, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const quickReplies = ["Book a trip", "Check promotions", "Upload documents", "Talk to agent"]

const autoResponses: Record<string, string> = {
  "book a trip": "Great! You can start booking at our booking page. Would you like me to redirect you there?",
  "check promotions": "We have amazing deals right now! Check our promotions page for up to 30% off Victoria Falls packages.",
  "upload documents": "You can securely upload your travel documents at our Documents portal. Need help getting there?",
  "talk to agent": "Connecting you with a travel consultant. Please hold for a moment, someone will be with you shortly!",
}

export function LiveChat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { from: "bot" as const, text: "Welcome to Impala Travel! How can we help you today?" },
  ])
  const [input, setInput] = useState("")
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, typing])

  function sendMessage(text: string) {
    if (!text.trim()) return
    setMessages((prev) => [...prev, { from: "user" as const, text }])
    setInput("")
    setTyping(true)

    const lower = text.toLowerCase().trim()
    const response = autoResponses[lower] || "Thank you for your message! A travel consultant will respond shortly. In the meantime, explore our packages at /packages."

    setTimeout(() => {
      setTyping(false)
      setMessages((prev) => [...prev, { from: "bot" as const, text: response }])
    }, 1200)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      <div
        className={`mb-4 flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl transition-all duration-300 ${
          open ? "h-[440px] w-[340px] scale-100 opacity-100" : "pointer-events-none h-0 w-0 scale-90 opacity-0"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between bg-primary px-4 py-3 text-primary-foreground">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-foreground/20">
              <Bot className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-semibold">Impala Travel</p>
              <div className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                <p className="text-xs text-primary-foreground/70">Online now</p>
              </div>
            </div>
          </div>
          <button onClick={() => setOpen(false)} className="rounded-full p-1.5 transition-colors hover:bg-primary-foreground/20" aria-label="Close chat">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="flex flex-col gap-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex items-end gap-2 animate-fade-in ${msg.from === "user" ? "flex-row-reverse" : ""}`}
              >
                <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-card ${msg.from === "bot" ? "bg-primary" : "bg-muted-foreground"}`}>
                  {msg.from === "bot" ? <Bot className="h-3 w-3" /> : <User className="h-3 w-3" />}
                </div>
                <div
                  className={`max-w-[75%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
                    msg.from === "bot"
                      ? "rounded-bl-sm bg-secondary text-secondary-foreground"
                      : "rounded-br-sm bg-primary text-primary-foreground"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex items-end gap-2 animate-fade-in">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-card">
                  <Bot className="h-3 w-3" />
                </div>
                <div className="flex gap-1 rounded-2xl rounded-bl-sm bg-secondary px-4 py-3">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:0ms]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:150ms]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:300ms]" />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        </div>

        {/* Quick Replies */}
        {messages.length <= 2 && (
          <div className="flex flex-wrap gap-1.5 border-t border-border px-3 py-2">
            {quickReplies.map((qr) => (
              <button
                key={qr}
                onClick={() => sendMessage(qr)}
                className="rounded-full border border-primary/30 px-3 py-1 text-xs font-medium text-primary transition-all duration-200 hover:bg-primary hover:text-primary-foreground"
              >
                {qr}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault()
            sendMessage(input)
          }}
          className="flex gap-2 border-t border-border p-3"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="rounded-full text-sm"
          />
          <Button type="submit" size="icon" className="shrink-0 rounded-full bg-primary text-primary-foreground transition-transform hover:bg-accent hover:scale-105">
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className={`group flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 ${open ? "rotate-0" : "animate-bounce [animation-iteration-count:3]"}`}
        aria-label={open ? "Close live chat" : "Open live chat"}
      >
        <MessageCircle className={`h-6 w-6 transition-all duration-300 ${open ? "scale-0 opacity-0" : "scale-100 opacity-100"}`} />
        <X className={`absolute h-6 w-6 transition-all duration-300 ${open ? "scale-100 opacity-100" : "scale-0 opacity-0"}`} />
      </button>

      {/* Pulse ring */}
      {!open && (
        <span className="absolute bottom-0 right-0 h-14 w-14 animate-ping rounded-full bg-primary/30 pointer-events-none" />
      )}
    </div>
  )
}
