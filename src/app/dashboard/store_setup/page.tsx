"use client";
import FileUploadField from "@/app/_components/fileUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast-manager";
import api from "@/lib/interceptor";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const storeTypes = ["DEPT", "SUPER", "LOCAL", "ONLINE"];

export default function StoreRegistrationPage() {
  const { userData } = useAppSelector((state) => state.userData);
  const { storeDetailData } = useAppSelector((state) => state.store);

  // Access the toast function
  const { addToast } = useToast();

  // Initialize form state with SetStoreData model
  const [form, setForm] = useState<any>({
    name: storeDetailData?.name || "",
    store_type: storeDetailData?.store_type || "DEPT",
    city: storeDetailData?.city || "",
    district: storeDetailData?.district || "",
    location_link: storeDetailData?.location_link || "",
    address: storeDetailData?.address || "",
    phone: storeDetailData?.phone || "",
    email: storeDetailData?.email || "",
    business_registration_number:
      storeDetailData?.business_registration_number || "",
    documents: null,
    cover_image: storeDetailData?.cover_image || null,
    slogan: storeDetailData?.slogan || null,
    logo: storeDetailData?.logo || null,
  });

  // Previews for image/pdf files
  const [logoPreview, setLogoPreview] = useState<string | null>(
    storeDetailData?.logo || null
  );
  const [coverPreview, setCoverPreview] = useState<string | null>(
    storeDetailData?.cover_image || null
  );
  const [documentPreview, setDocumentPreview] = useState<string | null>(
    null
  );
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | null
  ) => {
    if (!e) {
      // Reset file fields if user clicks "remove"
      setForm((prev: any) => ({
        ...prev,
        logo: null,
        cover_image: null,
        documents: null,
      }));
      setLogoPreview(null);
      setCoverPreview(null);
      setDocumentPreview(null);
      return;
    }

    const target = e.target;
    const { name, value } = target as { name: any; value: string };

    // Handle file inputs
    if (
      target instanceof HTMLInputElement &&
      target.files &&
      target.files[0]
    ) {
      const file = target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        if (name === "logo") {
          setForm((prev: any) => ({ ...prev, logo: file }));
          setLogoPreview(result);
        } else if (name === "cover_image") {
          setForm((prev: any) => ({ ...prev, cover_image: file }));
          setCoverPreview(result);
        } else if (name === "documents") {
          setForm((prev: any) => ({ ...prev, documents: file }));
          setDocumentPreview(result);
        }
      };
      reader.readAsDataURL(file);
    } else {
      // Handle text/select/textarea inputs
      setForm((prev: any) => ({ ...prev, [name]: value }));
    }
  };

  // Submit handler with a single toast for any missing required fields
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Required fields to validate
    const requiredValues = [
      form.name,
      form.store_type,
      form.city,
      form.district,
      form.address,
      form.phone,
      form.email,
      form.business_registration_number,
    ];

    // If any required field is empty or blank, show one toast and stop
    const allFilled = requiredValues.every(
      (val) => typeof val === "string" && val.trim() !== ""
    );
    if (!allFilled) {
      addToast({
        type: "error",
        message:
          "Please fill in all the fields properly. All fields are required.",
      });
      return;
    }

    // Prepare payload; use FormData if you need to send files
    const payload = new FormData();
    payload.append("name", form.name);
    payload.append("store_type", form.store_type);
    payload.append("city", form.city);
    payload.append("district", form.district);
    payload.append("address", form.address);
    payload.append("phone", form.phone);
    payload.append("email", form.email);
    payload.append(
      "business_registration_number",
      form.business_registration_number || ""
    );
    if (form.location_link)
      payload.append("location_link", form.location_link);
    if (form.slogan) payload.append("slogan", form.slogan);
    if (form.logo instanceof File) payload.append("logo", form.logo);
    if (form.documents instanceof File)
      payload.append("documents", form.documents);
    if (form.cover_image instanceof File)
      payload.append("cover_image", form.cover_image);

    try {
      await api.post("/api/stores/", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccess(true);
    } catch (error) {
      console.error(error);
      addToast({
        type: "error",
        message: "Failed to submit store. Please try again.",
      });
    }
  };

  // Helpers to decide whether document is an image or a PDF
  const isImage = (dataUrl: string) => dataUrl?.startsWith("data:image/");
  const isPdf = (dataUrl: string) =>
    dataUrl.startsWith("data:application/pdf");

  return (
    <div className="flex justify-center w-full">
      <div className="w-full max-w-5xl px-4">
        <Link
          href="/dashboard"
          className="inline-flex items-center space-x-2 text-gray-400 hover:text-white mb-6 mt-8"
        >
          <ArrowLeft size={20} />
          <span className="text-lg font-medium">
            Back to Dashboard
          </span>
        </Link>
        <h1 className="text-3xl font-bold text-white mb-6 mt-8 text-center">
          {storeDetailData ? "Update Your Store" : "Register Your Store"}
        </h1>

        {success ? (
          <div className="text-green-400 font-semibold text-center py-8">
            Store {storeDetailData ? "updated" : "registered"} successfully!
          </div>
        ) : (
          <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6 max-w-5xl mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block mb-1 text-gray-300">Store Name</label>
                <Input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. My Awesome Store"
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>

              {/* Type */}
              <div>
                <label className="block mb-1 text-gray-300">
                  Store Type
                </label>
                <select
                  name="store_type"
                  value={form.store_type}
                  onChange={handleChange}
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
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>

              {/* Location link */}
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
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>

              {/* Business reg number */}
              <div className="md:col-span-2">
                <label className="block mb-1 text-gray-300">
                  Business Registration Number
                </label>
                <Input
                  name="business_registration_number"
                  value={form.business_registration_number}
                  onChange={handleChange}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>

              {/* Documents upload */}
              <div className="md:col-span-2">
                <FileUploadField
                  label="Documents (PDF/Image)"
                  name="documents"
                  accept="application/pdf,image/*"
                  onChange={handleChange}
                />
                {documentPreview && (
                  <div className="mt-2">
                    {isImage(documentPreview) ? (
                      <img
                        src={documentPreview}
                        alt="Document preview"
                        className="h-20 w-auto object-contain rounded"
                      />
                    ) : isPdf(documentPreview) ? (
                      <iframe
                        src={documentPreview}
                        title="PDF preview"
                        className="h-20 w-full border border-gray-600 rounded"
                      />
                    ) : (
                      <p className="text-sm text-gray-400">
                        {form.documents ? "File selected" : ""}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Logo upload */}
              <div>
                <FileUploadField
                  label="Store Logo"
                  name="logo"
                  accept="image/*"
                  onChange={handleChange}
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

              {/* Cover image (banner) upload */}
              <div>
                <FileUploadField
                  label="Cover Image"
                  name="cover_image"
                  accept="image/*"
                  onChange={handleChange}
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

              {/* Slogan */}
              <div className="md:col-span-2">
                <label className="block mb-1 text-gray-300">Slogan</label>
                <textarea
                  name="slogan"
                  value={form.slogan || ""}
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
