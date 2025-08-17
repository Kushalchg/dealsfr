"use client"
import React, { useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useDispatch } from "react-redux"
import { getBanner } from "@/redux/actions/banner"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { getDiscount } from "@/redux/actions/discount"
import { DiscountCard } from "@/app/_components/discount/DiscountCard"

const StoreManager = () => {
  const dispatch = useAppDispatch()
  const { discountData, discountLoading } = useAppSelector((s) => s.discount) ?? [];

  useEffect(() => {
    dispatch(getDiscount())
  }, [])

  console.log("discount", discountData)

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-white">Discount</h1>
        <Link href="/dashboard/discounts/add">
          <Button>Add Discount</Button>
        </Link>
      </div>

      <div className="w-full my-8">
        {discountData && !discountLoading ?
          discountData.results.map((item, index) => {
            return (
              <div className="my-8" key={index.toString()} >
                <DiscountCard {...item} />
              </div>
            )
          }) : null
        }
      </div>


    </div>
  )
}

export default StoreManager
