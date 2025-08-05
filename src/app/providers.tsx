"use client"

import { Provider } from "react-redux"
import { store } from "@/redux/store"
import { ToastProvider } from "@/components/ui/toast-manager"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ToastProvider>{children}</ToastProvider>
    </Provider>
  )
}
