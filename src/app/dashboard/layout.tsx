"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { RootState, AppDispatch } from "@/redux/store"
import { getUser } from "@/redux/actions/user_api/getUserData"
import { getStoredTokens } from "@/lib/auth"
import { DashboardNav } from "@/app/_components/dashboardComp/dashboard-nav"
import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const { user, loading, error } = useSelector((state: RootState) => state.userData)

  // Check authentication on mount
  useEffect(() => {
    const tokens = getStoredTokens()
    
    // If we have tokens but no user data, fetch user data
    if (tokens && !user && !loading) {
      dispatch(getUser())
    }
    
    // If no tokens and no user, redirect to login
    if (!tokens && !user && !loading) {
      router.push("/loginUser")
    }
  }, [dispatch, user, loading, router])

  // Show loading skeleton while fetching user data
  if (loading && !user) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="space-y-4 w-full max-w-md">
          <Skeleton className="h-12 w-full bg-gray-800" />
          <Skeleton className="h-8 w-3/4 bg-gray-800" />
          <Skeleton className="h-8 w-1/2 bg-gray-800" />
        </div>
      </div>
    )
  }

  // Show error state
  if (error && !user) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-white mb-2">Authentication Error</h2>
          <p className="text-gray-400 mb-4">{error}</p>
          <button 
            onClick={() => router.push("/loginUser")}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
          >
            Go to Login
          </button>
        </div>
      </div>
    )
  }

  // Don't render anything if still loading or no user
  if (!user) {
    return null
  }

  return (
    <DashboardNav>
      {children}
    </DashboardNav>
  )
}