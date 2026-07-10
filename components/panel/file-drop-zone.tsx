"use client"

import {
  useState,
  useRef,
  useCallback,
  type DragEvent,
  type ChangeEvent,
} from "react"
import { Upload, Loader2, X, Image as ImageIcon, FileText } from "lucide-react"
import { cn } from "@/lib/utils"
import { formatSize } from "@/lib/panel-utils"

export type PendingFile = {
  id: string
  file: File
  preview?: string
  uploading: boolean
  error?: string
}

type Props = {
  files: PendingFile[]
  onAddFiles: (files: File[]) => void
  onRemoveFile: (id: string) => void
  maxFileSize?: number
  allowedTypes?: string[]
  allowedExtensions?: string
}

const DEFAULT_MAX_SIZE = 10 * 1024 * 1024
const DEFAULT_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]
const DEFAULT_EXTENSIONS = ".pdf,.jpg,.jpeg,.png,.webp,.doc,.docx"

export function FileDropZone({
  files,
  onAddFiles,
  onRemoveFile,
  maxFileSize = DEFAULT_MAX_SIZE,
  allowedTypes = DEFAULT_TYPES,
  allowedExtensions = DEFAULT_EXTENSIONS,
}: Props) {
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validate = useCallback(
    (fileList: FileList | File[]) => {
      const valid: File[] = []
      for (const file of Array.from(fileList)) {
        if (!allowedTypes.includes(file.type)) continue
        if (file.size > maxFileSize) continue
        valid.push(file)
      }
      return valid
    },
    [allowedTypes, maxFileSize]
  )

  const handleDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault()
      setDragOver(false)
      onAddFiles(validate(e.dataTransfer.files))
    },
    [validate, onAddFiles]
  )

  const handleSelect = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        onAddFiles(validate(e.target.files))
        e.target.value = ""
      }
    },
    [validate, onAddFiles]
  )

  return (
    <div className="space-y-3">
      <div
        onDragOver={(e) => {
          e.preventDefault()
          setDragOver(true)
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-8 transition-colors",
          dragOver
            ? "border-brand-sky bg-brand-sky/5"
            : "border-border hover:border-muted-foreground/30"
        )}
      >
        <Upload
          className={cn(
            "h-8 w-8",
            dragOver ? "text-brand-sky" : "text-muted-foreground"
          )}
        />
        <div className="text-center">
          <p className="text-sm font-medium text-foreground">
            Arrastra archivos aquí o haz clic para seleccionar
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            PDF, JPG, PNG, DOCX — máximo 10MB por archivo
          </p>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={allowedExtensions}
          onChange={handleSelect}
          className="hidden"
        />
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">
            {files.length} archivo{files.length > 1 ? "s" : ""}
          </p>
          {files.map((pf) => (
            <div
              key={pf.id}
              className={cn(
                "flex items-center gap-3 rounded-lg border bg-background px-4 py-3",
                pf.error ? "border-red-200 bg-red-50" : "border-border"
              )}
            >
              {pf.preview ? (
                <>
                  {/* Object URLs from local file selection cannot use next/image. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={pf.preview}
                    alt={pf.file.name}
                    className="h-10 w-10 rounded object-cover"
                  />
                </>
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded bg-brand-navy/5">
                  {pf.file.type.startsWith("image/") ? (
                    <ImageIcon className="h-5 w-5 text-brand-sky" />
                  ) : (
                    <FileText className="h-5 w-5 text-brand-navy" />
                  )}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">
                  {pf.file.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatSize(pf.file.size)}
                </p>
              </div>
              {pf.uploading ? (
                <Loader2 className="h-4 w-4 animate-spin text-brand-sky" />
              ) : (
                <button
                  onClick={() => onRemoveFile(pf.id)}
                  className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
