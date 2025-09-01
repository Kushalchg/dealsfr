"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/toast-manager";
import { registerUser } from "@/redux/features/user/user";
import { resetAllUserState } from "@/redux/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

interface RegisterPageProps {
  userType: "STORE_ADMIN" | "CUSTOMER";
}

export default function RegisterPage({ userType }: RegisterPageProps) {
  const [formData, setFormData] = useState<any>({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
    confirm_password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const { addToast } = useToast();
  const errorToastShown = useRef(false);
  const successToastShown = useRef(false);

  const { userStateLoading, userRegisterError, userRegisterData } = useAppSelector((state) => state.userData);

  useEffect(() => {
    if (userRegisterError && !errorToastShown.current) {
      addToast({ type: "error", message: userRegisterError });
      errorToastShown.current = true;
    }
    if (!userRegisterError) {
      errorToastShown.current = false;
    }
  }, [userRegisterError, addToast]);

  useEffect(() => {
    if (userRegisterData && !successToastShown.current) {
      addToast({
        type: "success",
        message: `Account created successfully! Redirecting to ${userType === "STORE_ADMIN" ? "store" : "customer"
          } login...`,
      });
      successToastShown.current = true;

      setTimeout(() => {
        router.push("/loginUser");
        dispatch(resetAllUserState());
      }, 2000);
    }
    if (!userRegisterData) {
      successToastShown.current = false;
    }
  }, [userRegisterData, addToast, router, userType]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirm_password) {
      addToast({ type: "error", message: "Passwords do not match" });
      return;
    }

    // Enforce required fields based on user type
    if (userType === "STORE_ADMIN" && !formData.email) {
      addToast({ type: "error", message: "Email is required for store admin" });
      return;
    }

    if (userType === "CUSTOMER" && !formData.phone_number) {
      addToast({
        type: "error",
        message: "Phone number is required for customer",
      });
      return;
    }
    const { phone_number, ...payload } = formData;
    dispatch(registerUser({ ...payload }));
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <div className="text-3xl font-bold text-white mb-2">
              <Image
                src="/images/TheDealsFr.png"
                alt="TheDealsFr"
                width={120}
                height={40}
                className="h-8 md:h-10 w-auto"
              />
            </div>
            <div className="text-emerald-400 text-sm">Deals For Real</div>
          </Link>
        </div>

        <Card className="bg-gray-900 border-none">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center text-white">
              {userType === "STORE_ADMIN"
                ? "Create Store Account"
                : "Create Customer Account"}
            </CardTitle>
            <CardDescription className="text-center text-gray-400">
              {userType === "STORE_ADMIN"
                ? "Register your store and start showcasing deals."
                : "Join DealsFr and discover exclusive offers near you."}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="first_name" className="text-gray-300">
                  First Name
                </Label>
                <Input
                  id="first_name"
                  name="first_name"
                  type="text"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  required
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-emerald-400"
                  placeholder="John"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="last_name" className="text-gray-300">
                  Last Name
                </Label>
                <Input
                  id="last_name"
                  name="last_name"
                  type="text"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  required
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-emerald-400"
                  placeholder="Doe"
                />
              </div>

              {/* Conditionally show only one field */}
              {userType === "STORE_ADMIN" && (
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-300">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-emerald-400"
                    placeholder="store@example.com"
                  />
                </div>
              )}

              {userType === "CUSTOMER" && (
                <div className="space-y-2">
                  <Label htmlFor="phone_number" className="text-gray-300">
                    Phone Number
                  </Label>
                  <Input
                    id="phone_number"
                    name="phone_number"
                    type="tel"
                    value={formData.phone_number}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-emerald-400"
                    placeholder="+9779800000000"
                  />
                </div>
              )}

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-emerald-400 pr-10"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirm_password" className="text-gray-300">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirm_password"
                    name="confirm_password"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirm_password}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-emerald-400 pr-10"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={userStateLoading}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2 px-4 rounded-md transition-colors btn-glow"
              >
                {userStateLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-400">
                Already have an account?{" "}
                <Link
                  href="/loginUser"
                  className="text-emerald-400 hover:text-emerald-300 font-medium"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
