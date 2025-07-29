"use client"

import type React from "react"
import { Menu } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Home, Store, BarChart3, Users, Settings, HelpCircle, LogOut, Bell } from "lucide-react"
import { clearTokens } from "@/lib/auth"
import Image from "next/image"

interface DashboardNavProps {
  user: {
    first_name: string
    last_name: string
    email: string
    profile_image: string
    store: {
      name: string
      logo: string
    }
  }
  children: React.ReactNode
}

const navigationItems = [
  {
    title: "Overview",
    icon: Home,
    href: "/dashboard",
  },
  {
    title: "Layout Preview",
    icon: Store,
    href: "/dashboard/layoutPreview",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    href: "/dashboard/analytics",
  },
  {
    title: "Customers",
    icon: Users,
    href: "/dashboard/customers",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
  },
  {
    title: "Help & Support",
    icon: HelpCircle,
    href: "/dashboard/help",
  },
]

export function DashboardNav({ user, children }: DashboardNavProps) {
  const handleLogout = () => {
    clearTokens()
    window.location.href = "/loginStore"
  }

  const userInitials = `${user.first_name[0]}${user.last_name[0]}`.toUpperCase()

  return (
    <SidebarProvider>
      <Sidebar className="mt-2 bg-gray-900">
        <SidebarHeader className="border-r-2 border-white px-6 py-2.5 bg-gray-800">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user.store?.logo || "/placeholder.svg"} alt={user.store?.name || "Store Logo"} />
              <AvatarFallback className="bg-emerald-600 text-white font-bold">
                {user.store?.name ? user.store.name.substring(0, 2).toUpperCase() : "ST"}
              </AvatarFallback>
            </Avatar>
           
          </div>
        </SidebarHeader>

        <SidebarContent className="px-3 py-4 bg-gray-900 border-r-2 border-white ">
          <SidebarGroup>
            <SidebarGroupLabel className="text-emerald-400 text-xs uppercase tracking-wider font-semibold mb-3 px-3">
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1 ">
                {navigationItems.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.href}
                        className="flex items-center space-x-3 px-3 py-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200 group border-none hover:border-gray-700"
                      >
                        <item.icon className="h-5 w-5 text-emerald-400 transition-colors" />
                        <span className="font-medium">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="border-r-2 border-white p-4 bg-gray-900">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="w-full h-[50px] cursor-pointer justify-start space-x-3 text-gray-300 hover:text-white hover:bg-gray-700 p-3 rounded-lg transition-all duration-200"
              >
                <Avatar className="h-9 w-9">
                  <AvatarImage
                    src={user.profile_image || "/placeholder.svg"}
                    alt={`${user.first_name} ${user.last_name}`}
                  />
                  <AvatarFallback className="bg-emerald-600 text-white text-sm font-semibold">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 text-left min-w-0">
                  <div className="text-sm font-semibold truncate text-white">
                    {user.first_name} {user.last_name}
                  </div>
                  <div className="text-xs text-gray-400 truncate">{user.email}</div>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-gray-800 border-gray-600">
              <DropdownMenuLabel className="text-gray-200 font-semibold">My Account</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-600" />
              <DropdownMenuItem className="text-gray-300 hover:bg-gray-700 hover:text-white focus:bg-gray-700 focus:text-white">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="text-gray-300 hover:bg-gray-700 hover:text-white focus:bg-gray-700 focus:text-white">
                <HelpCircle className="mr-2 h-4 w-4" />
                Support
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-gray-600" />
              <DropdownMenuItem
                onClick={handleLogout}
                className="text-red-400 hover:bg-red-900 hover:text-red-300 focus:bg-red-900 focus:text-red-300"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarFooter>
      </Sidebar>

      <div className="flex-1 flex flex-col min-h-screen">
          {/* Fixed Header */}
          <header className="fixed top-0 left-0 right-0 z-50 bg-gray-800 border-none px-6 py-4 shadow-lg">
            <div className="py-2 flex items-center justify-between">
              {/* Logo and Sidebar */}
              <div className="flex items-center space-x-4">
                <SidebarTrigger
                  className="text-gray-300 cursor-pointer hover:text-white hover:bg-gray-700 p-2 rounded-md transition-colors shadow-md"
                  aria-label="Toggle Sidebar"
                />

                {/* Logo with text below */}
                <div className="flex flex-col items-start space-y-1">
                  <div className="relative h-8 w-32">
                    <Image
                      src="/images/TheDealsFr.png"
                      alt="TheDealsFr"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                  <span className="text-xs text-emerald-400 font-semibold tracking-wide px-4">
                    The Deals For Real
                  </span>
                </div>
              </div>

              {/* Notification Bell */}
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white bg-gray-700 relative"
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-emerald-500 rounded-full"></span>
                </Button>
              </div>
            </div>
          </header>

          {/* Main Content with top padding to prevent overlap */}
          <main className="pt-24 flex-1 bg-background px-4">{children}</main>
        </div>

    </SidebarProvider>
  )
}
