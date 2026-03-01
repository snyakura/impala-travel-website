"use client"

import { useState, useCallback } from "react"
import Link from "next/link"
import { Upload, FileText, X, CheckCircle, AlertCircle, Loader2, Shield, ArrowRight, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  status: "uploading" | "done" | "error"
  progress: number
}

const requiredDocs = [
  { id: "passport", label: "Passport Copy", desc: "Clear scan of the bio-data page", icon: "PP" },
  { id: "photo", label: "Passport Photo", desc: "Recent, white background, 35x45mm", icon: "PH" },
  { id: "itinerary", label: "Travel Itinerary", desc: "Flight and accommodation details", icon: "TI" },
  { id: "insurance", label: "Travel Insurance", desc: "Proof of travel insurance coverage", icon: "IN" },
  { id: "bank", label: "Bank Statement", desc: "Last 3 months, stamped by bank", icon: "BS" },
  { id: "invitation", label: "Invitation Letter", desc: "If applicable for visa type", icon: "IL" },
]

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default function DocumentsPage() {
  const [files, setFiles] = useState<Record<string, UploadedFile[]>>({})
  const [bookingRef, setBookingRef] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [dragOver, setDragOver] = useState<string | null>(null)

  const handleDrop = useCallback((docId: string, fileList: FileList | null) => {
    if (!fileList) return
    setDragOver(null)
    const newFiles: UploadedFile[] = Array.from(fileList).map((f) => ({
      id: `${docId}-${Date.now()}-${Math.random()}`,
      name: f.name,
      size: f.size,
      type: f.type,
      status: "uploading" as const,
      progress: 0,
    }))

    setFiles((prev) => ({
      ...prev,
      [docId]: [...(prev[docId] || []), ...newFiles],
    }))

    // Simulate upload with progress
    newFiles.forEach((nf) => {
      let prog = 0
      const interval = setInterval(() => {
        prog += Math.random() * 30
        if (prog >= 100) {
          prog = 100
          clearInterval(interval)
          setFiles((prev) => ({
            ...prev,
            [docId]: (prev[docId] || []).map((f) =>
              f.id === nf.id ? { ...f, status: "done" as const, progress: 100 } : f
            ),
          }))
        } else {
          setFiles((prev) => ({
            ...prev,
            [docId]: (prev[docId] || []).map((f) =>
              f.id === nf.id ? { ...f, progress: Math.round(prog) } : f
            ),
          }))
        }
      }, 300)
    })
  }, [])

  const removeFile = useCallback((docId: string, fileId: string) => {
    setFiles((prev) => ({
      ...prev,
      [docId]: (prev[docId] || []).filter((f) => f.id !== fileId),
    }))
  }, [])

  const completedCategories = requiredDocs.filter((doc) =>
    (files[doc.id] || []).some((f) => f.status === "done")
  ).length
  const totalDocs = requiredDocs.length
  const progressPercent = (completedCategories / totalDocs) * 100

  function handleSubmit() {
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <>
        <section className="bg-primary py-14">
          <div className="mx-auto max-w-7xl px-4 text-center">
            <h1 className="font-serif text-3xl font-bold text-primary-foreground md:text-5xl animate-fade-in-up">Documents Submitted</h1>
          </div>
        </section>
        <section className="bg-background py-20">
          <div className="mx-auto max-w-lg px-4 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground mx-auto animate-scale-in">
              <CheckCircle className="h-10 w-10" />
            </div>
            <h2 className="mt-6 text-2xl font-bold text-foreground animate-fade-in-up [animation-delay:200ms]">All Documents Received!</h2>
            <p className="mt-3 text-muted-foreground animate-fade-in-up [animation-delay:400ms]">
              Your documents for booking <span className="font-semibold text-foreground">{bookingRef}</span> have been submitted successfully. Our team will review them within 24-48 hours.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center animate-fade-in-up [animation-delay:600ms]">
              <Link href="/dashboard">
                <Button className="rounded-full bg-primary px-8 text-primary-foreground hover:bg-accent">Go to Dashboard</Button>
              </Link>
              <Link href="/booking">
                <Button variant="outline" className="rounded-full">Book Another Trip</Button>
              </Link>
            </div>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-primary py-14">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h1 className="font-serif text-3xl font-bold text-primary-foreground md:text-5xl animate-fade-in-up">
            Document Upload
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-primary-foreground/80 animate-fade-in-up [animation-delay:200ms]">
            Securely upload your travel documents for visa processing and booking confirmation.
          </p>
        </div>
      </section>

      <section className="bg-background py-10">
        <div className="mx-auto max-w-4xl px-4">
          {/* Booking Reference */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm animate-fade-in-up">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
              <div className="flex-1">
                <Label className="text-sm font-semibold text-foreground">Booking Reference</Label>
                <p className="mb-2 text-xs text-muted-foreground">Enter your booking reference to link documents to your trip.</p>
                <Input
                  value={bookingRef}
                  onChange={(e) => setBookingRef(e.target.value)}
                  placeholder="e.g., IMP-2026-001234"
                  className="h-11 rounded-xl"
                />
              </div>
              <Link href="/booking">
                <Button variant="outline" className="rounded-full text-sm">
                  {"Don't have a reference? Book now"}
                  <ArrowRight className="ml-2 h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Progress */}
          <div className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">Upload Progress</h3>
              <span className="text-sm font-medium text-primary">{completedCategories}/{totalDocs} complete</span>
            </div>
            <div className="mt-3 h-3 overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-primary transition-all duration-700 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="mt-2 flex gap-1">
              {requiredDocs.map((doc) => {
                const done = (files[doc.id] || []).some((f) => f.status === "done")
                return (
                  <div
                    key={doc.id}
                    className={`h-1 flex-1 rounded-full transition-colors duration-500 ${done ? "bg-primary" : "bg-border"}`}
                  />
                )
              })}
            </div>
          </div>

          {/* Document Upload Cards */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {requiredDocs.map((doc) => {
              const docFiles = files[doc.id] || []
              const hasUpload = docFiles.some((f) => f.status === "done")
              const isDragging = dragOver === doc.id

              return (
                <div
                  key={doc.id}
                  className={`rounded-2xl border bg-card shadow-sm transition-all duration-300 ${
                    hasUpload ? "border-primary/40" : isDragging ? "border-primary shadow-lg" : "border-border"
                  }`}
                >
                  <div className="p-5">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-xl text-xs font-bold transition-colors ${
                        hasUpload ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                      }`}>
                        {hasUpload ? <CheckCircle className="h-5 w-5" /> : doc.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{doc.label}</h3>
                        <p className="text-xs text-muted-foreground">{doc.desc}</p>
                      </div>
                    </div>

                    {/* Drop Zone */}
                    <label
                      className={`mt-4 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-4 py-6 text-center transition-all duration-200 ${
                        isDragging
                          ? "border-primary bg-primary/10"
                          : "border-border bg-secondary/50 hover:border-primary/40 hover:bg-primary/5"
                      }`}
                      onDragOver={(e) => { e.preventDefault(); setDragOver(doc.id) }}
                      onDragLeave={() => setDragOver(null)}
                      onDrop={(e) => { e.preventDefault(); handleDrop(doc.id, e.dataTransfer.files) }}
                    >
                      <Upload className={`h-6 w-6 transition-colors ${isDragging ? "text-primary" : "text-muted-foreground/40"}`} />
                      <p className="mt-2 text-xs font-medium text-foreground">
                        {isDragging ? "Drop files here" : "Drag & drop or click to browse"}
                      </p>
                      <p className="mt-0.5 text-[10px] text-muted-foreground">PDF, JPG, PNG up to 10MB</p>
                      <input
                        type="file"
                        className="sr-only"
                        accept=".pdf,.jpg,.jpeg,.png"
                        multiple
                        onChange={(e) => handleDrop(doc.id, e.target.files)}
                      />
                    </label>

                    {/* Uploaded Files */}
                    {docFiles.length > 0 && (
                      <div className="mt-3 flex flex-col gap-2">
                        {docFiles.map((file) => (
                          <div key={file.id} className="rounded-lg bg-secondary px-3 py-2 animate-fade-in">
                            <div className="flex items-center gap-2">
                              <FileText className="h-3.5 w-3.5 shrink-0 text-primary" />
                              <div className="flex-1 min-w-0">
                                <p className="truncate text-xs font-medium text-foreground">{file.name}</p>
                                <p className="text-[10px] text-muted-foreground">{formatSize(file.size)}</p>
                              </div>
                              {file.status === "uploading" && <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />}
                              {file.status === "done" && <CheckCircle className="h-3.5 w-3.5 text-primary" />}
                              {file.status === "error" && <AlertCircle className="h-3.5 w-3.5 text-destructive" />}
                              <button onClick={() => removeFile(doc.id, file.id)} className="rounded p-0.5 text-muted-foreground hover:text-destructive" aria-label="Remove file">
                                <X className="h-3.5 w-3.5" />
                              </button>
                            </div>
                            {file.status === "uploading" && (
                              <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-border">
                                <div className="h-full rounded-full bg-primary transition-all duration-300" style={{ width: `${file.progress}%` }} />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Security notice + Submit */}
          <div className="mt-6 flex items-center gap-2 rounded-xl bg-primary/5 px-4 py-3 text-sm text-primary">
            <Shield className="h-4 w-4 shrink-0" />
            <span>Your documents are encrypted and stored securely. They are only accessible to our travel team.</span>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
            <p className="text-sm text-muted-foreground">
              {completedCategories === totalDocs
                ? "All documents uploaded! Ready to submit."
                : `${totalDocs - completedCategories} document${totalDocs - completedCategories !== 1 ? "s" : ""} remaining`}
            </p>
            <Button
              onClick={handleSubmit}
              className="rounded-full bg-primary px-8 text-primary-foreground transition-all duration-200 hover:bg-accent hover:-translate-y-0.5 hover:shadow-md"
              disabled={completedCategories === 0 || !bookingRef}
            >
              Submit All Documents <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
