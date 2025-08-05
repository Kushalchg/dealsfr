"use client"

import React, { createContext, useContext, useState } from "react"
import { Toast } from "@/components/ui/toast"

export type ToastType = "success" | "error" | "info" | "warning" | "loading" | "delete"

export interface ToastItem {
  id: string
  type: ToastType
  message: string
}

interface ToastContextType {
  toasts: ToastItem[]
  addToast: (toast: Omit<ToastItem, "id">) => void
  removeToast: (id: string) => void
}

const ToastContext = createContext<ToastContextType | null>(null)

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const addToast = (toast: Omit<ToastItem, "id">) => {
    const newToast = { ...toast, id: Date.now().toString() }
    setToasts((prev) => [...prev, newToast])
  }

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <div className="fixed bottom-4 right-4 flex flex-col items-end gap-3 z-[9999]">
        {toasts.map(({ id, type, message }) => (
          <Toast key={id} id={id} type={type} message={message} onClose={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) throw new Error("useToast must be used within ToastProvider")
  return context
}
