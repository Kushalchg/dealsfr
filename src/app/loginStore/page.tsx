"use client"

import React, { useState, useEffect } from "react"
import api from "@/lib/axios"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Eye, EyeOff, Store, User } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LoginPage() {
  const [loginType, setLoginType] = useState<"store" | "customer">("store")
  const [formData, setFormData] = useState({
    email: "",
    phone_number: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  useEffect(() => {
  if (error) {
    const timer = setTimeout(() => {
      setError("");
    }, 5000);
    return () => clearTimeout(timer);
  }
}, [error]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const loginData = {
      password: formData.password,
      ...(loginType === "store"
        ? { email: formData.email, phone_number: "" }
        : { phone_number: formData.phone_number, email: "" }),
    }

    try {
      const response = await api.post("/api/accounts/login/", loginData)
      const data = response.data
      localStorage.setItem("access_token", data.data.access)
      localStorage.setItem("refresh_token", data.data.refresh)

      router.push("/dashboard")
    } catch (error: any) {
      setError(error?.response?.data?.message || "Login failed. Please check your credentials.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <div className="text-3xl font-bold text-white mb-2">
            <Image src="/images/TheDealsFr.png" alt="TheDealsFr" width={120} height={40} className="h-8 md:h-10 w-auto" />
            </div>
            <div className="text-emerald-400 text-sm">Deals For Real</div>
          </Link>
        </div>

        <Card className="bg-gray-900 border-none">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center text-white">Welcome Back</CardTitle>
            <CardDescription className="text-center text-gray-400">
              {loginType === "store"
                ? "Sign in to access your own store dashboard"
                : "Sign in to access exclusive deals"}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {error && (
              <Alert className="mb-4 bg-red-900 border-red-700">
                <AlertDescription className="text-red-200">{error}</AlertDescription>
              </Alert>
            )}

            {/* Tabs for Store / Customer */}
            <Tabs
              value={loginType}
              onValueChange={(value) => setLoginType(value as "store" | "customer")}
              className="mb-6"
            >
              <TabsList className="grid w-full grid-cols-2 bg-gray-800 rounded-full">
                <TabsTrigger
                  value="store"
                  className="data-[state=active]:!bg-emerald-600 data-[state=active]:!text-white border-none rounded-full"
                >
                  <Store className="w-4 h-4 mr-2" />
                  Store
                </TabsTrigger>
                <TabsTrigger
                  value="customer"
                  className="data-[state=active]:!bg-emerald-600 data-[state=active]:!text-white border-none rounded-full"
                >
                  <User className="w-4 h-4 mr-2" />
                  Customer
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <form onSubmit={handleSubmit} className="space-y-4">
              {loginType === "store" ? (
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-300">Store Email</Label>
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
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="phone_number" className="text-gray-300">Customer Phone Number</Label>
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

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">Password</Label>
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
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Link href="/forgot-password" className="text-sm text-emerald-400 hover:text-emerald-300">
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2 px-4 rounded-md transition-colors btn-glow"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-400">
                {"Don't have an account?"}{" "}
                <Link href="/registerStore" className="text-emerald-400 hover:text-emerald-300 font-medium">
                  Create account
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
