"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import Link from "next/link"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

const StoreManager = () => {

  const store = useSelector((state: RootState) => state.userData.store)
  return (
     <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-white">Store Manager</h1>
        <Link href="/dashboard/storeMgmt/registerStore">
        <Button>Register Store</Button>
        </Link>
      </div>

      
      {store ? (
        <Card className="max-w-md mx-auto">
          <CardContent className="text-center">
            <Avatar className="h-16 w-16 mx-auto">
              <AvatarImage src={store.logo} alt={store.name} />
              <AvatarFallback>
                {store.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <p className="mt-4 text-white">{store.name}</p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button asChild variant="outline">
              <Link href="/dashboard/storeMgmt/registerStore">Edit Store</Link>
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <p className="text-center text-white">No store data available.</p>
      )}
    </div>
  )
}

export default StoreManager
