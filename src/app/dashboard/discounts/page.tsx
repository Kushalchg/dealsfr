"use client";
import { DiscountCard } from "@/app/_components/discount/DiscountCard";
import { Button } from "@/components/ui/button";
import { getBanner } from "@/redux/features/banner/banner";
import { getMainCategory, getSubCategory } from "@/redux/features/category/category";
import { getDiscount } from "@/redux/features/discount/discount";
import { getLayout } from "@/redux/features/layout/layout";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import React, { useEffect } from "react";

const StoreManager = () => {
  const dispatch = useAppDispatch();
  const { discountData, discountLoading } = useAppSelector((s) => s.discount);

  useEffect(() => {
    dispatch(getDiscount());
    dispatch(getSubCategory());
    dispatch(getMainCategory());
    dispatch(getBanner(1));
    dispatch(getLayout());
  }, []);

  console.log("discount", discountData);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-white">Discount</h1>
        <Link href="/dashboard/discounts/create">
          <Button>Add Discount</Button>
        </Link>
      </div>

      <div className="w-full my-8">
        {discountData && !discountLoading
          ? discountData?.results.map((item, index) => {
            return (
              <div className="my-8" key={index.toString()}>
                <DiscountCard item={item} />
              </div>
            );
          })
          : null}
      </div>
    </div>
  );
};

export default StoreManager;
