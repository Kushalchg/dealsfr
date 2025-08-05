"use client"

import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useToast } from "@/components/ui/toast-manager"
import Link from "next/link"
const StoreManager = () => {
  

  const { addToast } = useToast()

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-white">Store Manager</h1>
        <Link href="/dashboard/storeMgmt/registerStore">
        <Button>Register Store</Button>
        </Link>
      </div>

      
    </div>
  )
}

export default StoreManager
