"use client"

import React, { useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import Link from "next/link"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { getStoreList } from "@/redux/features/store/store"

const StoreManager = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getStoreList())
  }, [])

  const { storeListData } = useAppSelector((s) => s.store)

  const storeTypeLabels: Record<string, string> = {
    DEPT: "Department Store",
    SUPER: "Supermarket",
    LOCAL: "Local Store",
    ONLINE: "Online Store",
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-white">Store Manager</h1>
        <Link href="/dashboard/storeMgmt/registerStore">
          <Button>Register Store</Button>
        </Link>
      </div>

      {storeListData && storeListData.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {storeListData.map((store) => (
            <Card
              key={store.id}
              className="w-full bg-gray-900 border-gray-800 hover:border-gray-700 transition-colors flex flex-col h-full"
            >
              <CardHeader className="items-center text-center pb-0">
                <Avatar className="h-16 w-16 mb-3">
                  <AvatarImage
                    src={store.logo || undefined}
                    alt={store.name}
                    className="object-cover"
                    onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
                  />
                  <AvatarFallback className="bg-emerald-600 text-white">
                    {(store?.name ?? "").substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <CardTitle className="text-white text-xl">{store.name}</CardTitle>
                <CardDescription className="mt-1">
                  <Badge
                    variant="secondary"
                    className="bg-emerald-900 text-emerald-200 text-xs"
                  >
                    {storeTypeLabels[store.store_type] || store.store_type}
                  </Badge>
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-2 text-sm text-gray-300 flex-1">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-emerald-400" />
                  <span>
                    {store.city}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-emerald-400" />
                  <span>{store.phone}</span>
                </div>
              </CardContent>

              <CardFooter className="pt-4">
                <Button asChild variant="outline" className="w-full">
                  <Link href="/dashboard/storeMgmt/registerStore">Manage</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center text-white">No store data available.</p>
      )}
    </div>
  )
}

export default StoreManager
