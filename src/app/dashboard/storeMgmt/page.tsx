"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
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

const StoreManager = () => {

  const stores = useSelector((state: RootState) => state.userData.stores)

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

      {stores.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stores.map((store) => (

            <Card key={store.id} className="max-w-md mx-auto">
              <CardContent className="text-center">
                <Avatar className="h-16 w-16 mx-auto">
                  <AvatarImage src={store.logo} alt={store.name} />
                  <AvatarFallback>
                    {store.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-white">{store.name}</CardTitle>
                  <CardDescription>
                    <Badge variant="secondary" className="text-xs">
                      {storeTypeLabels[store.store_type] || store.store_type}
                    </Badge>
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="text-sm text-gray-300 space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>
                    {store.city}, {store.district}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>{store.phone}</span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button asChild variant="outline">
                  <Link href="/dashboard/storeMgmt/registerStore">Manage</Link>

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
