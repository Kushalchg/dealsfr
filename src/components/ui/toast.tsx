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

interface ToastProps {
  id: string
  message: string
  type?: "success" | "error" | "loading" | "warning" | "info" | "delete"
  duration?: number
  onClose: (id: string) => void
}

const typeStyles: Record<string, { bg: string; text: string; icon: React.ReactElement }> = {
  success: {
    bg: "bg-emerald-100 border border-emerald-200",
    text: "text-emerald-900",
    icon: <CheckCircle className="h-5 w-5 text-emerald-600" />,
  },
  error: {
    bg: "bg-red-100 border border-red-200",
    text: "text-red-900",
    icon: <XCircle className="h-5 w-5 text-red-600" />,
  },
  loading: {
    bg: "bg-blue-100 border border-blue-200",
    text: "text-blue-900",
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
    bg: "bg-red-100 border border-red-200",
    text: "text-red-900",
    icon: <Trash2 className="h-5 w-5 text-red-600" />,
  },
}

export const Toast = ({
  id,
  message,
  type = "success",
  duration = 3000,
  onClose,
}: ToastProps) => {
  useEffect(() => {
    if (type !== "loading") {
      const timer = setTimeout(() => onClose(id), duration)
      return () => clearTimeout(timer)
    }
  }, [id, duration, onClose, type])

  const { bg, text, icon } = typeStyles[type] ?? typeStyles.success

  return (
    <div
      className={cn(
        "flex items-start gap-3 w-full max-w-sm px-4 py-3 rounded-xl shadow-xl animate-in fade-in slide-in-from-bottom z-50",
        bg,
        text
      )}
    >
      {icon}
      <span className="flex-1 text-sm font-medium">{message}</span>
      <button onClick={() => onClose(id)} className="text-inherit hover:text-black">
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}
