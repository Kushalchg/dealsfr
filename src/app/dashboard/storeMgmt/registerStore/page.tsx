"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SetStoreData } from "@/model/store";
import FileUploadField from "@/app/_components/fileUpload";

const storeTypes = ["DEPT", "SUPER", "LOCAL", "ONLINE"];

export default function StoreRegistrationPage() {
  const user = useSelector((state: RootState) => state.userData.user);
  const store = useSelector((state: RootState) => state.userData.store);

  // Initial form state consistent with SetStoreData interface
  const initialForm: SetStoreData = {
    name: store?.name || "",
    store_type: store?.store_type || "",
    city: store?.city || "",
    district: store?.district || "",
    location_link: store?.location_link ?? null,
    address: store?.address || "",
    phone: store?.phone || "",
    email: store?.email || "",
    social_media_links: store?.social_media_links ?? null,
    latitude: store?.latitude ?? null,
    longitude: store?.longitude ?? null,
    is_verified: store?.is_verified ?? false,
    business_registration_number:
      store?.business_registration_number || "",
    documents: store?.documents ?? null,
    admin_notes: store?.admin_notes ?? "",
    views: store?.views ?? 0,
    clicks_on_discounts: store?.clicks_on_discounts ?? 0,
    orders_received: store?.orders_received ?? 0,
    cover_image: store?.cover_image ?? null,
    bio: store?.bio ?? null,
    logo: store?.logo ?? null,
    followers: store?.followers ?? [],
  };

  const [form, setForm] = useState<SetStoreData>(initialForm);
  const [logoPreview, setLogoPreview] = useState<string | null>(
    store?.logo || null
  );
  const [coverPreview, setCoverPreview] = useState<string | null>(
    store?.cover_image || null
  );
  const [success, setSuccess] = useState(false);

  // Unified change handler that accommodates text, select, textarea, and file inputs
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | null
  ) => {
    if (!e) {
      // User removed the file
      setForm((prev) => ({
        ...prev,
        logo: null,
        cover_image: null,
        documents: null,
      }));
      setLogoPreview(null);
      setCoverPreview(null);
      return;
    }

    const target = e.target;
    const { name, value } = target as { name: keyof SetStoreData; value: any };

    if (
      target instanceof HTMLInputElement &&
      target.files &&
      target.files[0]
    ) {
      const file = target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        if (name === "logo") {
          setForm((prev) => ({
            ...prev,
            logo: reader.result as string,
          }));
          setLogoPreview(reader.result as string);
        } else if (name === "cover_image") {
          setForm((prev) => ({
            ...prev,
            cover_image: reader.result as string,
          }));
          setCoverPreview(reader.result as string);
        } else if (name === "documents") {
          setForm((prev) => ({
            ...prev,
            documents: reader.result as string,
          }));
        }
      };
      reader.readAsDataURL(file);
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
  };

  return (
    <div className="flex justify-center w-full">
      {/* Adjust max width as desired; use a larger value if you want it broader */}
      <div className="w-full max-w-5xl px-4">
        <Link
          href="/dashboard/storeMgmt"
          className="inline-flex items-center space-x-2 text-gray-400 hover:text-white mb-6 mt-8"
        >
          <ArrowLeft size={20} />
          <span className="text-lg font-medium">
            Back to Store Management
          </span>
        </Link>
        <h1 className="text-3xl font-bold text-white mb-6 mt-8 text-center">
          {store ? "Update Your Store" : "Register Your Store"}
        </h1>

        {success ? (
          <div className="text-green-400 font-semibold text-center py-8">
            Store {store ? "updated" : "registered"} successfully!
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-6 max-w-5xl mx-auto p-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Store Name */}
              <div>
                <label className="block mb-1 text-gray-300">Store Name</label>
                <Input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g. My Awesome Store"
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>

              {/* Store Type */}
              <div>
                <label className="block mb-1 text-gray-300">Store Type</label>
                <select
                  name="store_type"
                  value={form.store_type}
                  onChange={handleChange}
                  required
                  className="bg-gray-800 border-gray-700 text-white p-2 rounded w-full"
                >
                  <option value="">Select Type</option>
                  {storeTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* City */}
              <div>
                <label className="block mb-1 text-gray-300">City</label>
                <Input
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  required
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>

              {/* District */}
              <div>
                <label className="block mb-1 text-gray-300">District</label>
                <Input
                  name="district"
                  value={form.district}
                  onChange={handleChange}
                  required
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>

              {/* Location Link */}
              <div className="md:col-span-2">
                <label className="block mb-1 text-gray-300">
                  Location Link (Google Maps)
                </label>
                <Input
                  name="location_link"
                  value={form.location_link || ""}
                  onChange={handleChange}
                  placeholder="https://maps.google.com/..."
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>

              {/* Address */}
              <div>
                <label className="block mb-1 text-gray-300">Address</label>
                <Input
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  required
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block mb-1 text-gray-300">Phone</label>
                <Input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block mb-1 text-gray-300">Email</label>
                <Input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>

              {/* Business Registration Number */}
              <div className="md:col-span-2">
                <label className="block mb-1 text-gray-300">
                  Business Registration Number
                </label>
                <Input
                  name="business_registration_number"
                  value={form.business_registration_number}
                  onChange={handleChange}
                  required
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>

              {/* Documents upload */}
              <FileUploadField
                label="Documents (PDF/Image)"
                name="documents"
                accept="application/pdf,image/*"
                onChange={handleChange}
              />

              {/* Logo upload */}
              <FileUploadField
                label="Store Logo"
                name="logo"
                accept="image/*"
                onChange={handleChange}
              />

              {/* Cover image upload */}
              <FileUploadField
                label="Cover Image"
                name="cover_image"
                accept="image/*"
                onChange={handleChange}
              />

              {/* Bio */}
              <div className="md:col-span-2">
                <label className="block mb-1 text-gray-300">Bio</label>
                <textarea
                  name="bio"
                  value={form.bio || ""}
                  onChange={handleChange}
                  rows={3}  
                  placeholder="Tell us about your store..."
                  className="bg-gray-800 border-gray-700 text-white w-full rounded p-2"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold mt-6"
            >
              Submit
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
