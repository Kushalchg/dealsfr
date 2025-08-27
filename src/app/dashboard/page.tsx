// "use client";
// import { StatsCard } from "@/app/_components/dashboardComp/stats-card";
// import { StoreAnalyticsOverview } from "@/app/_components/dashboardComp/store-analytics-overview";
// import { StoreInfoCard } from "@/app/_components/dashboardComp/store-info-card";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Skeleton } from "@/components/ui/skeleton";
// import { useAppSelector } from "@/redux/hooks";
// import {
//   Calendar,
//   Eye,
//   MousePointer,
//   ShoppingCart,
//   TrendingUp,
//   Users,
// } from "lucide-react";
//
// export default function DashboardPage() {
//   const { getUserData, userStateLoading, getUserError } = useAppSelector((state) => state.userData);
//   const { storeData } = useAppSelector(s => s.store)
//
//   const primaryStore = storeData ? storeData[0] : [];
//
//   if (userStateLoading) {
//     return (
//       <div className="min-h-screen bg-green flex items-center justify-center">
//         <div className="space-y-4 w-full max-w-md">
//           <Skeleton className="h-12 w-full bg-gray-800" />
//           <Skeleton className="h-8 w-3/4 bg-gray-800" />
//           <Skeleton className="h-8 w-1/2 bg-gray-800" />
//         </div>
//       </div>
//     );
//   }
//
//
//   if (getUserError || !getUserData) {
//     return (
//       <div className="min-h-screen bg-green-900 bg-black flex items-center justify-center p-4">
//         <Alert className="max-w-md bg-red-900 border-red-700">
//           <AlertDescription className="text-red-200">
//             {getUserError || "Failed to load dashboard data"}
//           </AlertDescription>
//         </Alert>
//       </div>
//     );
//   }
//
//
//   return (
//     <div className="p-6 space-y-6 bg-red-900">
//       {/* Welcome Section */}
//       <div className="space-y-2">
//         <h1 className="text-3xl font-bold text-white">
//           Welcome back, {getUserData && getUserData.first_name}!
//         </h1>
//         <p className="text-gray-400">
//           Here&apos;s what&apos;s happening with your store today.
//         </p>
//       </div>
//
//       {/* Stats Grid 
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         <StatsCard
//           title="Total Views"
//           value={totalViews}
//           icon={Eye}
//           description="Store profile views"
//           trend={{ value: 12, isPositive: true }}
//         />
//         <StatsCard
//           title="Discount Clicks"
//           value={totalDiscountClicks}
//           icon={MousePointer}
//           description="Clicks on your deals"
//           trend={{ value: 8, isPositive: true }}
//         />
//         <StatsCard
//           title="Orders Received"
//           value={totalOrders}
//           icon={ShoppingCart}
//           description="Total orders"
//           trend={{ value: 15, isPositive: true }}
//         />
//         <StatsCard
//           title="Followers"
//           value={totalFollowers}
//           icon={Users}
//           description="Store followers"
//           trend={{ value: 5, isPositive: true }}
//         />
//       </div>
// */}
//
//       {/* Stores Overview */}
//       {/* {stores.length > 0 && <StoreAnalyticsOverview stores={stores} />} */}
//
//       {/* Store Information and Quick Actions */}
//
//       {/*
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <div className="lg:col-span-2">
//           {primaryStore ? (
//             <StoreInfoCard store={primaryStore} />
//           ) : (
//             <Card className="bg-gray-900 border-gray-800 p-4 text-white">
//               <p>No store data found for this account.</p>
//             </Card>
//           )}
//         </div>
//
//         <div className="space-y-6">
// */}
//       {/* Quick Stats */}
//
//       {/*  
//           <Card className="bg-gray-900 border-gray-800">
//             <CardHeader>
//               <CardTitle className="text-white flex items-center space-x-2">
//                 <TrendingUp className="h-5 w-5 text-emerald-400" />
//                 <span>Quick Stats</span>
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-400">Conversion Rate</span>
//                 <span className="text-white font-medium">
//                   {orders > 0 && views > 0
//                     ? ((orders / views) * 100).toFixed(1)
//                     : "0"}
//                   %
//                 </span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-400">Click-through Rate</span>
//                 <span className="text-white font-medium">
//                   {views > 0 && discountClicks > 0
//                     ? ((discountClicks / views) * 100).toFixed(1)
//                     : "0"}
//                   %
//                 </span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-400">Store Since</span>
//                 <span className="text-white font-medium">{createdDate}</span>
//               </div>
//             </CardContent>
//           </Card>
// */}
//       {/* Verification Status */}
//
//       {/*
//           <Card className="bg-gray-900 border-gray-800">
//             <CardHeader>
//               <CardTitle className="text-white flex items-center space-x-2">
//                 <Calendar className="h-5 w-5 text-emerald-400" />
//                 <span>Account Status</span>
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-3">
//                 <div className="flex items-center justify-between">
//                   <span className="text-gray-400">Verification</span>
//                   <span
//                     className={`font-medium ${isVerified ? "text-emerald-400" : "text-yellow-400"
//                       }`}
//                   >
//                     {isVerified ? "Verified" : "Pending"}
//                   </span>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <span className="text-gray-400">Store Type</span>
//                   <span className="text-white font-medium">{storeType}</span>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <span className="text-gray-400">Business ID</span>
//                   <span className="text-white font-medium text-sm">
//                     {businessId}
//                   </span>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//
//     </div>
//       </div >
//  */}
//     </div >
//   );
// }

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white">
      <h1 className="text-6xl font-bold text-red-900">
        Welcome
      </h1>
    </main>
  );
}
