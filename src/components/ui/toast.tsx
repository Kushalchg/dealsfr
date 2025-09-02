"use client"
import {
  CheckCircle,
  XCircle,
  Info,
  AlertTriangle,
  Loader2,
  Trash2,
  X,
} from "lucide-react"
import { useEffect } from "react"
import { cn } from "@/lib/utils"
import { v4 as uuidv4 } from "uuid"

interface ToastProps {
  id?: string
  message: string | { message: string }
  type?: "success" | "error" | "loading" | "warning" | "info" | "delete"
  duration?: number
  onClose?: (id: string) => void
}

const typeStyles: Record<string, { bg: string; text: string; icon: React.ReactElement }> = {
  success: {
    bg: "bg-[var(--toast-success-bg)] border border-emerald-200",
    text: "text-[var(--toast-success-color)]",
    icon: <CheckCircle className="h-5 w-5 text-emerald-600" />,
  },
  error: {
    bg: "bg-[var(--toast-error-bg)] border border-red-200",
    text: "text-[var(--toast-error-color)]",
    icon: <XCircle className="h-5 w-5 text-red-600" />,
  },
  loading: {
    bg: "bg-[var(--toast-loading-bg)] border border-blue-200",
    text: "text-[var(--toast-loading-color)]",
    icon: <Loader2 className="h-5 w-5 animate-spin text-blue-600" />,
  },
  warning: {
    bg: "bg-yellow-100 border border-yellow-200",
    text: "text-yellow-900",
    icon: <AlertTriangle className="h-5 w-5 text-yellow-600" />,
  },
  info: {
    bg: "bg-sky-100 border border-sky-200",
    text: "text-sky-900",
    icon: <Info className="h-5 w-5 text-sky-600" />,
  },
  delete: {
    bg: "bg-[var(--toast-error-bg)] border border-red-200",
    text: "text-[var(--toast-error-color)]",
    icon: <Trash2 className="h-5 w-5 text-red-600" />,
  },
}

export const Toast = ({
  id = uuidv4(),
  message,
  type = "success",
  duration = 3000,
  onClose = () => { },
}: ToastProps) => {

  const { bg, text, icon } = typeStyles[type] ?? typeStyles.success

  // Extract message string from either string or object
  const displayMessage = typeof message === "string" ? message : message.message

  return (
    <div
      className={cn(
        "flex items-start gap-3 w-full max-w-sm px-4 py-3 rounded-xl shadow-xl animate-in fade-in slide-in-from-bottom z-99",
        bg,
        text
      )}
    >
      {icon}
      <span className="flex-1 text-sm font-medium">{displayMessage}</span>
      <button onClick={() => onClose(id)} className="text-inherit hover:text-[var(--foreground)]">
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}
