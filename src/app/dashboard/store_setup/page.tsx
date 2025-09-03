"use client";
import FileUploadField from "@/app/_components/fileUpload";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createStore, getStoreDetail, updateStore } from "@/redux/features/store/store";
import { clearStoreCreateState, clearStoreUpdateState } from "@/redux/features/store/storeSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { id } from "zod/v4/locales";

const storeTypes = ["DEPT", "SUPER", "LOCAL", "ONLINE"];

const storeFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Store name must be at least 2 characters." }),
  store_type: z.enum(["DEPT", "SUPER", "LOCAL", "ONLINE"], {
    required_error: "Please select a store type.",
  }),
  city: z
    .string()
    .min(2, { message: "City name must be at least 2 characters." }),
  district: z
    .string()
    .min(2, { message: "District name must be at least 2 characters." }),
  location_link: z.string().url().optional().or(z.literal("")),
  address: z
    .string()
    .min(5, { message: "Address must be at least 5 characters." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  business_registration_number: z
    .string()
    .min(1, { message: "Business registration number is required." }),
  slogan: z.string().optional(),
  logo: z.any().optional(),
  cover_image: z.any().optional(),
  documents: z.any().optional(),
});

type StoreFormValues = z.infer<typeof storeFormSchema>;

export default function StoreRegistrationPage() {
  const router = useRouter()
  const dispatch = useAppDispatch();
  const params = useSearchParams();
  const store_id = params.get("id");
  const { userData } = useAppSelector((state) => state.userData);
  const { storeDetailData, storeCreateData, storeCreateError, storeUpdateData, storeUpdateError } = useAppSelector((state) => state.store);


  const defaultValues: Partial<StoreFormValues> = useMemo(() => ({
    name: storeDetailData?.name || "",
    store_type: storeDetailData?.store_type as "DEPT" || "DEPT",
    city: storeDetailData?.city || "",
    district: storeDetailData?.district || "",
    location_link: storeDetailData?.location_link || "",
    address: storeDetailData?.address || "",
    phone: storeDetailData?.phone || "",
    email: storeDetailData?.email || "",
    business_registration_number:
      storeDetailData?.business_registration_number || "",
    slogan: storeDetailData?.slogan || "",
  }), [storeDetailData]);

  const form = useForm<StoreFormValues>({
    resolver: zodResolver(storeFormSchema),
    defaultValues,
  });

  useEffect(() => {
    if (storeDetailData) {
      form.reset({
        name: storeDetailData?.name || "",
        store_type: (storeDetailData?.store_type as "DEPT" | "SUPER" | "LOCAL" | "ONLINE") || "DEPT",
        city: storeDetailData?.city || "",
        district: storeDetailData?.district || "",
        location_link: storeDetailData?.location_link || "",
        address: storeDetailData?.address || "",
        phone: storeDetailData?.phone || "",
        email: storeDetailData?.email || "",
        business_registration_number: storeDetailData?.business_registration_number || "",
        slogan: storeDetailData?.slogan || "",
      });
    }
  }, [storeDetailData, form]);


  const [logoPreview, setLogoPreview] = React.useState<string | null>(
    storeDetailData?.logo || null
  );
  const [coverPreview, setCoverPreview] = React.useState<string | null>(
    storeDetailData?.cover_image || null
  );

  const [success, setSuccess] = useState(false);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement> | null,
    fieldName: string
  ) => {
    if (!e?.target?.files) {
      if (fieldName === "logo") setLogoPreview(null);
      if (fieldName === "cover_image") setCoverPreview(null);
      return;
    }

    const files = Array.from(e.target.files);
    if (fieldName === "logo" || fieldName === "cover_image") {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        form.setValue(fieldName, file);
        if (fieldName === "logo") setLogoPreview(result);
        if (fieldName === "cover_image") setCoverPreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  async function onSubmit(data: StoreFormValues) {
    const payload = new FormData();
    // Append all form fields to FormData
    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        if (value instanceof File) {
          payload.append(key, value);
        } else if (typeof value === "string") {
          payload.append(key, value);
        }
      }
    });

    console.log({ payload })
    //update the store if the user has one update(that is the limit) otherwise create
    if (userData && userData?.managed_stores.length > 0) {
      dispatch(updateStore({ payload, id: userData?.managed_stores[0] }));
    } else {
      dispatch(createStore(payload));
    }

  }



  //reacting to the store update status
  useEffect(() => {
    if (storeUpdateData) {
      toast.success("Successfully updated the store detail", {
        richColors: true,
      })
      router.back()
    }
    if (storeCreateData) {
      toast.success("Successfully created the store.", {
        richColors: true,
      })
      router.back()
    }

    if (storeCreateError) {
      toast.error(storeCreateError, {
        richColors: true,
      })
    }

    if (storeUpdateError) {
      toast.error(storeUpdateError, {
        richColors: true,
      })
    }
    return () => {
      dispatch(clearStoreUpdateState())
      dispatch(clearStoreCreateState())
    }
  }, [storeDetailData, storeCreateData, storeCreateError, storeUpdateError]);

  return (
    <div className="flex justify-center w-full">
      <div className="w-full max-w-5xl px-4">
        <Link
          href="/dashboard"
          className="inline-flex items-center space-x-2 text-gray-400 hover:text-white mb-6 mt-8"
        >
          <ArrowLeft size={20} />
          <span className="text-lg font-medium">Back to Dashboard</span>
        </Link>
        <h1 className="text-3xl font-bold text-white mb-6 mt-8 text-center">
          {storeDetailData ? "Update Your Store" : "Register Your Store"}
        </h1>

        {success ? (
          <div className="text-green-400 font-semibold text-center py-8">
            Store {storeDetailData ? "updated" : "registered"} successfully!
          </div>
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 max-w-5xl mx-auto p-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">
                        Store Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. My Awesome Store"
                          className="bg-gray-800 border-gray-700 text-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="store_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">
                        Store Type
                      </FormLabel>
                      <FormControl>
                        <select
                          className="bg-gray-800 border-gray-700 text-white p-2 rounded w-full"
                          {...field}
                        >
                          <option value="">Select Type</option>
                          {storeTypes.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">City</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter city"
                          className="bg-gray-800 border-gray-700 text-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="district"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">District</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter district"
                          className="bg-gray-800 border-gray-700 text-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location_link"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel className="text-gray-300">
                        Location Link (Google Maps)
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://maps.google.com/..."
                          className="bg-gray-800 border-gray-700 text-white"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter address"
                          className="bg-gray-800 border-gray-700 text-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Phone</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter phone number"
                          className="bg-gray-800 border-gray-700 text-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter email"
                          className="bg-gray-800 border-gray-700 text-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="business_registration_number"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel className="text-gray-300">
                        Business Registration Number
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter registration number"
                          className="bg-gray-800 border-gray-700 text-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  <FileUploadField
                    label="Store Logo"
                    name="logo"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, "logo")}
                  />
                  {logoPreview && (
                    <div className="mt-2">
                      <img
                        src={logoPreview}
                        alt="Logo preview"
                        className="h-20 w-auto object-contain rounded"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <FileUploadField
                    label="Cover Image"
                    name="cover_image"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, "cover_image")}
                  />
                  {coverPreview && (
                    <div className="mt-2">
                      <img
                        src={coverPreview}
                        alt="Cover preview"
                        className="h-20 w-auto object-contain rounded"
                      />
                    </div>
                  )}
                </div>

                <FormField
                  control={form.control}
                  name="slogan"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel className="text-gray-300">Slogan</FormLabel>
                      <FormControl>
                        <textarea
                          rows={3}
                          placeholder="Tell us about your store..."
                          className="bg-gray-800 border-gray-700 text-white w-full rounded p-2"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold mt-6"
              >
                {userData && userData?.managed_stores?.length > 0
                  ? "Update"
                  : "Submit"}
              </Button>
            </form>
          </Form>
        )}
      </div>
    </div>
  );
}
