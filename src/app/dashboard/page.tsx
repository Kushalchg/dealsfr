"use client"

import { StatsCard } from "@/app/_components/dashboardComp/stats-card"
import { StoreInfoCard } from "@/app/_components/dashboardComp/store-info-card"
import { StoreAnalyticsOverview } from "@/app/_components/dashboardComp/store-analytics-overview"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { Eye, MousePointer, ShoppingCart, Users, TrendingUp, Calendar } from "lucide-react"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"

export default function DashboardPage() {
  const { user, stores, loading, error } = useSelector(
    (state: RootState) => state.userData
  )
  const primaryStore = stores[0]

  const totalViews = stores.reduce((sum, s) => sum + (s.views ?? 0), 0)
  const totalDiscountClicks = stores.reduce(
    (sum, s) => sum + (s.clicks_on_discounts ?? 0),
    0
  )
  const totalOrders = stores.reduce(
    (sum, s) => sum + (s.orders_received ?? 0),
    0
  )
  const totalFollowers = stores.reduce(
    (sum, s) => sum + (s.followers?.length ?? 0),
    0
  )


  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="space-y-4 w-full max-w-md">
          <Skeleton className="h-12 w-full bg-gray-800" />
          <Skeleton className="h-8 w-3/4 bg-gray-800" />
          <Skeleton className="h-8 w-1/2 bg-gray-800" />
        </div>
      </div>
    )
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <Alert className="max-w-md bg-red-900 border-red-700">
          <AlertDescription className="text-red-200">{error || "Failed to load dashboard data"}</AlertDescription>
        </Alert>
      </div>
    )
  }

  const views = primaryStore?.views ?? 0
  const discountClicks = primaryStore?.clicks_on_discounts ?? 0
  const orders = primaryStore?.orders_received ?? 0
  const storeType = primaryStore?.store_type ?? "N/A"
  const businessId = primaryStore?.business_registration_number ?? "N/A"
  const isVerified = primaryStore?.is_verified ?? false
  const createdDate = primaryStore?.created_at
    ? new Date(primaryStore.created_at).toLocaleDateString()
    : "N/A"

  return (
    <div className="p-6 space-y-6 bg-background">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-white">Welcome back, {user.first_name}!</h1>
        <p className="text-gray-400">Here&apos;s what&apos;s happening with your store today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Total Views" value={totalViews} icon={Eye} description="Store profile views" trend={{ value: 12, isPositive: true }} />
        <StatsCard title="Discount Clicks" value={totalDiscountClicks} icon={MousePointer} description="Clicks on your deals" trend={{ value: 8, isPositive: true }} />
        <StatsCard title="Orders Received" value={totalOrders} icon={ShoppingCart} description="Total orders" trend={{ value: 15, isPositive: true }} />
        <StatsCard title="Followers" value={totalFollowers} icon={Users} description="Store followers" trend={{ value: 5, isPositive: true }} />
      </div>

      {/* Stores Overview */}
      {stores.length > 0 && (
        <StoreAnalyticsOverview stores={stores} />
      )}

      {/* Store Information and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {primaryStore ? (
            <StoreInfoCard store={primaryStore} />
          ) : (
            <Card className="bg-gray-900 border-gray-800 p-4 text-white">
              <p>No store data found for this account.</p>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          {/* Quick Stats */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-emerald-400" />
                <span>Quick Stats</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Conversion Rate</span>
                <span className="text-white font-medium">
                  {orders > 0 && views > 0 ? ((orders / views) * 100).toFixed(1) : "0"}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Click-through Rate</span>
                <span className="text-white font-medium">
                  {views > 0 && discountClicks > 0 ? ((discountClicks / views) * 100).toFixed(1) : "0"}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Store Since</span>
                <span className="text-white font-medium">{createdDate}</span>
              </div>
            </CardContent>
          </Card>

          {/* Verification Status */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-emerald-400" />
                <span>Account Status</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Verification</span>
                  <span className={`font-medium ${isVerified ? "text-emerald-400" : "text-yellow-400"}`}>
                    {isVerified ? "Verified" : "Pending"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Store Type</span>
                  <span className="text-white font-medium">{storeType}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Business ID</span>
                  <span className="text-white font-medium text-sm">{businessId}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
