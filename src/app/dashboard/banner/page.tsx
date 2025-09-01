"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toast } from "@/components/ui/toast";
import { createBanner, getBanner } from "@/redux/features/banner/banner";
import { getUser } from "@/redux/features/user/user";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { getURL } from "next/dist/shared/lib/utils";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

const BannerPage = () => {
  const dispatch = useAppDispatch();
  const { bannerData, bannerLoading } = useAppSelector((state) => state.banner);
  const [bannerName, setBannerName] = useState<string>("");
  const [bannerImage, setBannerImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [toasts, setToasts] = useState<
    { id: string; message: string; type: "success" | "error" | "loading" }[]
  >([]);

  // console.log(bannerData);

  const addToast = (message: string, type: "success" | "error" | "loading") => {
    const id = uuidv4();
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const handleCloseToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBannerImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!bannerName || !bannerImage) {
      addToast("Please provide both a name and an image.", "error");
      return;
    }

    const formData = new FormData();
    formData.append("banner_name", bannerName);
    formData.append("web_banner_image", bannerImage);
    formData.append("store", "4");
    formData.append("banner_type", "custom");

    try {
      // addToast("Saving banner...", "loading");
      dispatch(createBanner(formData));
      addToast("Banner saved successfully!", "success");
      setBannerName("");
      setBannerImage(null);
      setPreview(null);
    } catch (err) {
      addToast("Failed to save banner.", "error");
    }
  };

  useEffect(() => {
    console.log("first");
    dispatch(getBanner(1));
    // addToast("Please provide both a name and an image.", "error");
  }, []);

  return (
    <div className="container mx-auto p-4">
      <Card className="bg-[var(--card)] text-[var(--card-foreground)]">
        <CardHeader>
          <CardTitle>Create New Banner</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label
                htmlFor="bannerName"
                className="text-[var(--muted-foreground)]"
              >
                Banner Name
              </Label>
              <Input
                id="bannerName"
                value={bannerName}
                onChange={(e) => setBannerName(e.target.value)}
                placeholder="Enter banner name"
                className="bg-[var(--input)] text-[var(--foreground)] border-[var(--border)] focus:ring-[var(--ring)]"
              />
            </div>
            <div>
              <Label
                htmlFor="bannerImage"
                className="text-[var(--muted-foreground)]"
              >
                Banner Image
              </Label>
              <Input
                id="bannerImage"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="bg-[var(--input)] text-[var(--foreground)] border-[var(--border)]"
              />
            </div>
            {preview && (
              <div className="mt-4">
                <img
                  src={preview}
                  alt="Banner Preview"
                  className="max-w-xs rounded-md"
                />
              </div>
            )}
            <Button
              type="submit"
              disabled={bannerLoading}
              className="bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--accent)]"
            >
              {bannerLoading ? "Saving..." : "Save Banner"}
            </Button>
          </form>
        </CardContent>
      </Card>
      <div className="fixed bottom-4 right-4 space-y-2">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            id={toast.id}
            message={toast.message}
            type={toast.type}
            duration={3000}
            onClose={handleCloseToast}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerPage;
