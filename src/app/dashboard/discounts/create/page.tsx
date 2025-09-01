"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Toast } from "@/components/ui/toast";
import { getBanner } from "@/redux/features/banner/banner";
import { createDiscount } from "@/redux/features/discount/discount";
import { getLayout } from "@/redux/features/layout/layout";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

// Define form data type
export interface DiscountFormData {
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  discount_type: "main" | "secondary" | "special";
  discount_percent: string;
  banner: string;
  layout: string;
}

export default function AddDiscountForm() {
  const dispatch = useAppDispatch();
  const { layoutData } = useAppSelector((state) => state.layout);
  const { bannerData } = useAppSelector((state) => state.banner);
  const { createDiscountData, discountError } = useAppSelector(
    (s) => s.discount
  );

  useEffect(() => {
    dispatch(getBanner(1));
    dispatch(getLayout());
  }, [dispatch]);

  const form = useForm<DiscountFormData>({
    defaultValues: {
      title: "",
      description: "",
      start_date: "",
      end_date: "",
      discount_type: "main",
      discount_percent: "",
      banner: "",
      layout: "",
    },
  });

  const onSubmit = (data: DiscountFormData) => {
    dispatch(createDiscount(data));
    console.log("Form submitted:", data);
  };

  useEffect(() => {
    if (createDiscountData) {
      if (createDiscountData.status === 201) {
        // Toast({ message: "Successfully created a discount", onClose: () => { } })
        console.log("Successfylly creaed a dicount");
      }
    }

    if (createDiscountData) {
      // Toast({ message: "Error while creating hte discount data.", onClose: () => { } })
    }
  }, [createDiscountData, discountError]);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Add New Discount</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Title */}
                <FormField
                  control={form.control}
                  name="title"
                  rules={{
                    required: "Title is required",
                    maxLength: { value: 100, message: "Title is too long" },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter discount title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Description */}
                <FormField
                  control={form.control}
                  name="description"
                  rules={{
                    required: "Description is required",
                    maxLength: {
                      value: 500,
                      message: "Description is too long",
                    },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter discount description"
                          className="resize-none"
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Date Fields Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Start Date */}
                  <FormField
                    control={form.control}
                    name="start_date"
                    rules={{ required: "Start date is required" }}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Start Date</FormLabel>
                        <FormControl>
                          <Input
                            type="datetime-local"
                            className="w-full"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* End Date */}
                  <FormField
                    control={form.control}
                    name="end_date"
                    rules={{ required: "End date is required" }}
                    render={({ field }) => (
                      <FormItem className="w-full  ">
                        <FormLabel>End Date</FormLabel>
                        <FormControl>
                          <Input
                            type="datetime-local"
                            className="w-full justify-between color-white"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Discount Type and Percent Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Discount Type */}
                  <FormField
                    control={form.control}
                    name="discount_type"
                    rules={{ required: "Discount type is required" }}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Discount Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select discount type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="main">Main</SelectItem>
                            <SelectItem value="sub">Secondary</SelectItem>
                            <SelectItem value="store">Special</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Discount Percent */}
                  <FormField
                    control={form.control}
                    name="discount_percent"
                    rules={{
                      required: "Discount percent is required",
                      pattern: {
                        value: /^-?\d*(\.\d+)?$/,
                        message: "Invalid discount percentage",
                      },
                    }}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Discount Percent</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter discount percent (e.g., 10.5)"
                            className="w-full"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Banner and Layout Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Banner */}
                  <FormField
                    control={form.control}
                    name="banner"
                    rules={{ required: "Banner is required" }}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Banner</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a banner" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {bannerData &&
                              bannerData.map((banner) => (
                                <SelectItem
                                  key={banner.id}
                                  value={banner.id.toString()}
                                >
                                  {banner.banner_name}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Layout */}
                  <FormField
                    control={form.control}
                    name="layout"
                    rules={{ required: "Layout is required" }}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Layout</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a layout" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {layoutData &&
                              layoutData.map((layout) => (
                                <SelectItem
                                  key={layout.id}
                                  value={layout.id!.toString()}
                                >
                                  {layout.layout_array}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Submit Button */}
                <Button type="submit" className="w-full">
                  Create Discount
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
