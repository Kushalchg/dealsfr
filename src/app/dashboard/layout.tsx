// app/dashboard/layout.tsx
"use client"

import { DashboardNav } from "@/app/_components/dashboardComp/dashboard-nav"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = {
    first_name: "John",
    last_name: "Doe",
    email: "john@example.com",
    profile_image: "/profile.jpg",
    store: {
      name: "John's Store",
      logo: "/logo.png"
    }
  }

  return (
    <DashboardNav user={user}>
      {children}
    </DashboardNav>
  )
}
