"use client"
import React from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const StoreManager = () => {

  // const stores = useSelector((s: RootState) => s.userData.stores) ?? [];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-white">Discount</h1>
        <Link href="/dashboard/discounts/add">
          <Button>Add Discount</Button>
        </Link>
      </div>

    </div>
  )
}

export default StoreManager
