"use client"

import { useState, useCallback } from "react"
import { Upload, FileText, X, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  status: "uploading" | "done" | "error"
}

const requiredDocs = [
  { id: "passport", label: "Passport Copy", desc: "Clear scan of the bio-data page" },
  { id: "photo", label: "Passport Photo", desc: "Recent, white background, 35x45mm" },
  { id: "itinerary", label: "Travel Itinerary", desc: "Flight and accommodation details" },
  { id: "insurance", label: "Travel Insurance", desc: "Proof of travel insurance coverage" },
  { id: "bank", label: "Bank Statement", desc: "Last 3 months, stamped by bank" },
  { id: "invitation", label: "Invitation Letter", desc: "If applicable for visa type" },
]

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default function DocumentsPage() {
  const [files, setFiles] = useState<Record<string, UploadedFile[]>>({})
  const [bookingRef, setBookingRef] = useState("")

  const handleDrop = useCallback((docId: string, fileList: FileList | null) => {
    if (!fileList) return
    const newFiles: UploadedFile[] = Array.from(fileList).map((f) => ({
      id: `${docId}-${Date.now()}-${Math.random()}`,
      name: f.name,
      size: f.size,
      type: f.type,
      status: "uploading" as const,
    }))

    setFiles((prev) => ({
      ...prev,
      [docId]: [...(prev[docId] || []), ...newFiles],
    }))

    // Simulate upload
    newFiles.forEach((nf) => {
      setTimeout(() => {
        setFiles((prev) => ({
          ...prev,
          [docId]: (prev[docId] || []).map((f) =>
            f.id === nf.id ? { ...f, status: "done" as const } : f
          ),
        }))
      }, 1500 + Math.random() * 1000)
    })
  }, [])

  const removeFile = useCallback((docId: string, fileId: string) => {
    setFiles((prev) => ({
      ...prev,
      [docId]: (prev[docId] || []).filter((f) => f.id !== fileId),
    }))
  }, [])

  const totalUploaded = Object.values(files).flat().filter((f) => f.status === "done").length
  const totalDocs = requiredDocs.length

  return (
    <>
      {/* Hero */}
      <section className="bg-primary py-16">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h1 className="font-serif text-4xl font-bold text-primary-foreground md:text-5xl">
            Document Upload
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-primary-foreground/80">
            Securely upload your travel documents for visa processing and booking confirmation.
          </p>
        </div>
      </section>

      <section className="bg-background py-12">
        <div className="mx-auto max-w-4xl px-4">
          {/* Booking Reference */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h2 className="text-xl font-bold text-foreground">Booking Reference</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Enter your booking reference number to associate documents with your trip.
            </p>
            <div className="mt-4 max-w-sm">
              <Label>Reference Number</Label>
              <Input
                value={bookingRef}
                onChange={(e) => setBookingRef(e.target.value)}
                placeholder="e.g., IMP-2026-001234"
                className="mt-1.5"
              />
            </div>
          </div>

          {/* Progress */}
          <div className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">Upload Progress</h3>
              <span className="text-sm text-muted-foreground">{totalUploaded} of {totalDocs} categories</span>
            </div>
            <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${(totalUploaded / totalDocs) * 100}%` }}
              />
            </div>
          </div>

          {/* Document Upload Areas */}
          <div className="mt-6 flex flex-col gap-4">
            {requiredDocs.map((doc) => {
              const docFiles = files[doc.id] || []
              const hasUpload = docFiles.some((f) => f.status === "done")

              return (
                <div
                  key={doc.id}
                  className={`rounded-2xl border bg-card p-6 shadow-sm transition-colors ${
                    hasUpload ? "border-primary/40" : "border-border"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground">{doc.label}</h3>
                        {hasUpload && <CheckCircle className="h-4 w-4 text-primary" />}
                      </div>
                      <p className="mt-0.5 text-sm text-muted-foreground">{doc.desc}</p>
                    </div>
                  </div>

                  {/* Drag & Drop Zone */}
                  <label
                    className="mt-4 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-secondary px-6 py-8 text-center transition-colors hover:border-primary/40 hover:bg-primary/5"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault()
                      handleDrop(doc.id, e.dataTransfer.files)
                    }}
                  >
                    <Upload className="h-8 w-8 text-muted-foreground/50" />
                    <p className="mt-2 text-sm font-medium text-foreground">
                      Drag & drop files here or click to browse
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      PDF, JPG, or PNG up to 10MB
                    </p>
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
                    <div className="mt-4 flex flex-col gap-2">
                      {docFiles.map((file) => (
                        <div key={file.id} className="flex items-center gap-3 rounded-lg bg-secondary px-4 py-2.5">
                          <FileText className="h-4 w-4 shrink-0 text-primary" />
                          <div className="flex-1 truncate">
                            <p className="truncate text-sm font-medium text-foreground">{file.name}</p>
                            <p className="text-xs text-muted-foreground">{formatSize(file.size)}</p>
                          </div>
                          {file.status === "uploading" && <Loader2 className="h-4 w-4 animate-spin text-primary" />}
                          {file.status === "done" && <CheckCircle className="h-4 w-4 text-primary" />}
                          {file.status === "error" && <AlertCircle className="h-4 w-4 text-destructive" />}
                          <button
                            onClick={() => removeFile(doc.id, file.id)}
                            className="rounded p-1 text-muted-foreground hover:text-destructive"
                            aria-label="Remove file"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Submit */}
          <div className="mt-8 flex justify-end">
            <Button
              className="rounded-full bg-primary px-8 text-primary-foreground hover:bg-accent"
              disabled={totalUploaded === 0 || !bookingRef}
            >
              Submit All Documents
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
