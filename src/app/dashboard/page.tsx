"use client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { getBranches, getStoreDetail } from "@/redux/features/store/store";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import {
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const dispatch = useAppDispatch()
  const { userData, userStateLoading, userError } = useAppSelector((state) => state.userData);
  const { branchesData } = useAppSelector((state) => state.store);

  useEffect(() => {
    if (userData && userData.managed_stores.length > 0) {
      dispatch(getStoreDetail(userData.managed_stores[0]))
      dispatch(getBranches(userData.managed_stores[0]))
    }
  }, [])


  if (userStateLoading) {
    return (
      <div className="min-h-screen bg-green flex items-center justify-center">
        <div className="space-y-4 w-full max-w-md">
          <Skeleton className="h-12 w-full bg-gray-800" />
          <Skeleton className="h-8 w-3/4 bg-gray-800" />
          <Skeleton className="h-8 w-1/2 bg-gray-800" />
        </div>
      </div>
    );
  }


  if (userError || !userData) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <Alert className="max-w-md  border-red-700">
          <AlertDescription className="text-red-200">
            {userError || "Failed to load dashboard data"}
          </AlertDescription>
        </Alert>
      </div>
    );
  }


  return (
    <div className="p-6 space-y-6 ">
      {/* Welcome Section */}
      {userData.assignments.length > 0 && branchesData && branchesData?.length < 1 && (
        <Link
          href={'/dashboard/create_branch'}
        >
          <h3 className="cursor-pointer flex justify-between items-center pr-10 mb-5 flex-row px-5 py-3 bg-primary/30 rounded-md text-white">
            You need to setup at least one store branch to publish Discounts.
            <ChevronRight />
          </h3>
        </Link>
      )}

      {userData?.assignments?.length <= 0 && (
        <Link
          href={'/dashboard/store_setup'}
        >
          <h3 className="cursor-pointer flex justify-between items-center pr-10 mb-5 flex-row px-5 py-3 bg-primary/30 rounded-md text-white">
            Complete your store registration process.
            <ChevronRight />
          </h3>
        </Link>
      )}

      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-white">
          Welcome back, {userData && userData.first_name}!
        </h1>
        <p className="text-gray-400">
          Here&apos;s what&apos;s happening with your store today.
        </p>
      </div>

    </div >
  );
}
