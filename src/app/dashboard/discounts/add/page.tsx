"use client"
import { getBanner } from "@/redux/actions/banner";
import { createDiscount } from "@/redux/actions/discount";
import { getLayout } from "@/redux/actions/layout";
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

// Dummy data for dropdowns
const banners = [
  { id: 0, name: "Default Banner" },
  { id: 1, name: "Summer Sale" },
  { id: 2, name: "Winter Promo" },
];

const layouts = [
  { id: 0, name: "Standard Layout" },
  { id: 1, name: "Grid Layout" },
  { id: 2, name: "Carousel Layout" },
];

export default function AddDiscountForm() {
  const dispatch = useAppDispatch()
  const { layoutData } = useAppSelector(state => state.layout)
  const { bannerData } = useAppSelector(state => state.banner)
  useEffect(() => {
    dispatch(getBanner())
    dispatch(getLayout())
  }, [])
  console.log({ layoutData, bannerData })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DiscountFormData>({
    defaultValues: {
      discount_type: "main",
      banner: "0",
      layout: "0",
    },
  });

  const onSubmit = (data: DiscountFormData) => {
    dispatch(createDiscount(data))
    console.log("Form submitted:", data);
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] p-6">
      <div className="max-w-2xl mx-auto bg-[var(--card)] p-6 rounded-[var(--radius)]">
        <h1 className="text-2xl font-bold mb-6">Add New Discount</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-[var(--foreground)]"
            >
              Title
            </label>
            <input
              id="title"
              {...register("title", {
                required: "Title is required",
                maxLength: { value: 100, message: "Title is too long" },
              })}
              className="mt-1 w-full rounded-[var(--radius)] border-[var(--border)] bg-[var(--input)] p-2 text-[var(--foreground)] focus:ring-[var(--ring)] focus:ring-2"
              placeholder="Enter discount title"
            />
            {errors.title && (
              <span className="text-[var(--destructive)] text-sm mt-1">
                {errors.title.message}
              </span>
            )}
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-[var(--foreground)]"
            >
              Description
            </label>
            <input
              id="description"
              {...register("description", {
                required: "Description is required",
                maxLength: { value: 500, message: "Description is too long" },
              })}
              className="mt-1 w-full rounded-[var(--radius)] border-[var(--border)] bg-[var(--input)] p-2 text-[var(--foreground)] focus:ring-[var(--ring)] focus:ring-2"
              placeholder="Enter discount description"
            />
            {errors.description && (
              <span className="text-[var(--destructive)] text-sm mt-1">
                {errors.description.message}
              </span>
            )}
          </div>

          {/* Start Date */}
          <div>
            <label
              htmlFor="start_date"
              className="block text-sm font-medium text-[var(--foreground)]"
            >
              Start Date
            </label>
            <input
              id="start_date"
              type="datetime-local"
              {...register("start_date", { required: "Start date is required" })}
              className="mt-1 w-full rounded-[var(--radius)] border-[var(--border)] bg-[var(--input)] p-2 text-[var(--foreground)] focus:ring-[var(--ring)] focus:ring-2"
            />
            {errors.start_date && (
              <span className="text-[var(--destructive)] text-sm mt-1">
                {errors.start_date.message}
              </span>
            )}
          </div>

          {/* End Date */}
          <div>
            <label
              htmlFor="end_date"
              className="block text-sm font-medium text-[var(--foreground)]"
            >
              End Date
            </label>
            <input
              id="end_date"
              type="datetime-local"
              {...register("end_date", { required: "End date is required" })}
              className="mt-1 w-full rounded-[var(--radius)] border-[var(--border)] bg-[var(--input)] p-2 text-[var(--foreground)] focus:ring-[var(--ring)] focus:ring-2"
            />
            {errors.end_date && (
              <span className="text-[var(--destructive)] text-sm mt-1">
                {errors.end_date.message}
              </span>
            )}
          </div>


          {/* Discount Type */}
          <div>
            <label
              htmlFor="discount_type"
              className="block text-sm font-medium text-[var(--foreground)]"
            >
              Discount Type
            </label>
            <select
              id="discount_type"
              {...register("discount_type", {
                required: "Discount type is required",
              })}
              className="mt-1 w-full rounded-[var(--radius)] border-[var(--border)] bg-[var(--input)] p-2 text-[var(--foreground)] focus:ring-[var(--ring)] focus:ring-2"
            >
              <option value="main">Main</option>
              <option value="secondary">Secondary</option>
              <option value="special">Special</option>
            </select>
            {errors.discount_type && (
              <span className="text-[var(--destructive)] text-sm mt-1">
                {errors.discount_type.message}
              </span>
            )}
          </div>

          {/* Discount Percent */}
          <div>
            <label
              htmlFor="discount_percent"
              className="block text-sm font-medium text-[var(--foreground)]"
            >
              Discount Percent
            </label>
            <input
              id="discount_percent"
              {...register("discount_percent", {
                required: "Discount percent is required",
                pattern: {
                  value: /^-?\d*(\.\d+)?$/,
                  message: "Invalid discount percentage",
                },
              })}
              className="mt-1 w-full rounded-[var(--radius)] border-[var(--border)] bg-[var(--input)] p-2 text-[var(--foreground)] focus:ring-[var(--ring)] focus:ring-2"
              placeholder="Enter discount percent (e.g., 10.5)"
            />
            {errors.discount_percent && (
              <span className="text-[var(--destructive)] text-sm mt-1">
                {errors.discount_percent.message}
              </span>
            )}
          </div>

          {/* Banner */}
          <div>
            <label
              htmlFor="banner"
              className="block text-sm font-medium text-[var(--foreground)]"
            >
              Banner
            </label>
            <select
              id="banner"
              {...register("banner", { required: "Banner is required" })}
              className="mt-1 w-full rounded-[var(--radius)] border-[var(--border)] bg-[var(--input)] p-2 text-[var(--foreground)] focus:ring-[var(--ring)] focus:ring-2"
            >
              {bannerData && bannerData.map((banner) => (
                <option key={banner.id} value={banner.id.toString()}>
                  {banner.banner_name}
                </option>
              ))}
            </select>
            {errors.banner && (
              <span className="text-[var(--destructive)] text-sm mt-1">
                {errors.banner.message}
              </span>
            )}
          </div>

          {/* Layout */}
          <div>
            <label
              htmlFor="layout"
              className="block text-sm font-medium text-[var(--foreground)]"
            >
              Layout
            </label>
            <select
              id="layout"
              {...register("layout", { required: "Layout is required" })}
              className="mt-1 w-full rounded-[var(--radius)] border-[var(--border)] bg-[var(--input)] p-2 text-[var(--foreground)] focus:ring-[var(--ring)] focus:ring-2"
            >
              {layoutData && layoutData.map((layout) => (
                <option key={layout.id} value={layout.id!.toString()}>
                  {layout.layout_array}
                </option>
              ))}
            </select>
            {errors.layout && (
              <span className="text-[var(--destructive)] text-sm mt-1">
                {errors.layout.message}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-[var(--radius)] bg-[var(--primary)] px-4 py-2 text-[var(--primary-foreground)] hover:bg-[var(--accent)]"
          >
            Create Discount
          </button>
        </form>
      </div>
    </div>
  );
}
