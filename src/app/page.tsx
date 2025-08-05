import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  Store,
  Users,
  Zap,
  TrendingUp,
  Shield,
  Clock,
  Star,
  ArrowRight,
  Download,
  Smartphone,
  User,
  Building2,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 lg:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Image src="/images/TheDealsFr.png" alt="TheDealsFr" width={120} height={40} className="h-8 md:h-10 w-auto" />
          </div>

          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link
              href="#features"
              className="text-gray-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-emerald-400 hover:to-teal-400 transition-all duration-300 text-sm lg:text-base font-medium cursor-pointer"
            >
              How It Works
            </Link>
            <Link
              href="#for-stores"
              className="text-gray-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-emerald-400 hover:to-teal-400 transition-all duration-300 text-sm lg:text-base font-medium cursor-pointer"
            >
              For Stores
            </Link>
            <Link
              href="#customers"
              className="text-gray-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-emerald-400 hover:to-teal-400 transition-all duration-300 text-sm lg:text-base font-medium cursor-pointer"
            >
              For Customers
            </Link>
            <Link
              href="#pricing"
              className="text-gray-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-emerald-400 hover:to-teal-400 transition-all duration-300 text-sm lg:text-base font-medium cursor-pointer"
            >
              Pricing
            </Link>
          </nav>

          <div className="flex items-center space-x-2 md:space-x-3">
            <Button
              variant="outline"
              className="border-gray-700 text-gray-300 hover:bg-gradient-to-r hover:from-emerald-500/20 hover:to-teal-500/20 hover:border-emerald-400 hover:text-emerald-400 bg-transparent text-xs md:text-sm px-3 md:px-4 py-2 transition-all duration-300 cursor-pointer"
            >
              <Download className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
              Download App
            </Button>
            <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white text-xs md:text-sm px-3 md:px-4 py-2 shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 cursor-pointer">
              <Building2 className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
              Register Store
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 md:py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-teal-500/10" />
        <div className="container mx-auto px-4 lg:px-6 relative">
          <div className="max-w-5xl mx-auto text-center">
            <Badge className="mb-4 md:mb-6 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-400 border border-emerald-500/30 text-xs md:text-sm hover:from-emerald-500/30 hover:to-teal-500/30 transition-all duration-300 cursor-pointer">
              🎯 Connecting Local Communities
            </Badge>

            <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 leading-tight px-2">
              Discover{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 animate-pulse">
                Local Deals
              </span>
              , Effortlessly.
            </h1>

            <p className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-6 md:mb-8 max-w-4xl mx-auto leading-relaxed px-4">
              TheDealsFr connects you with exclusive discounts from nearby stores. Save smarter, support local.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-8 md:mb-12 px-4">
              <Link
              href={'/register/registerCustomer'}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg shadow-lg hover:shadow-emerald-500/25 transform hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <User className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                Join as Customer
              </Button>
              </Link>
              <Link
              href={'/register/registerStore'}>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-gray-700 text-gray-300 hover:bg-gradient-to-r hover:from-emerald-500/20 hover:to-teal-500/20 hover:border-emerald-400 hover:text-emerald-400 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg bg-transparent transform hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <Building2 className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                Register Store
              </Button>
              </Link>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12 md:mb-16 px-4">
              <div className="flex items-center space-x-2 bg-gradient-to-r from-gray-800/50 to-gray-700/50 hover:from-emerald-500/20 hover:to-teal-500/20 rounded-full px-3 md:px-4 py-2 border border-gray-700 hover:border-emerald-400 transition-all duration-300 cursor-pointer">
                <MapPin className="w-3 h-3 md:w-4 md:h-4 text-emerald-400" />
                <span className="text-xs md:text-sm text-gray-300">HyperLocal</span>
              </div>
              <div className="flex items-center space-x-2 bg-gradient-to-r from-gray-800/50 to-gray-700/50 hover:from-emerald-500/20 hover:to-teal-500/20 rounded-full px-3 md:px-4 py-2 border border-gray-700 hover:border-emerald-400 transition-all duration-300 cursor-pointer">
                <Zap className="w-3 h-3 md:w-4 md:h-4 text-emerald-400" />
                <span className="text-xs md:text-sm text-gray-300">Exclusive Offer</span>
              </div>
              <div className="flex items-center space-x-2 bg-gradient-to-r from-gray-800/50 to-gray-700/50 hover:from-emerald-500/20 hover:to-teal-500/20 rounded-full px-3 md:px-4 py-2 border border-gray-700 hover:border-emerald-400 transition-all duration-300 cursor-pointer">
                <TrendingUp className="w-3 h-3 md:w-4 md:h-4 text-emerald-400" />
                <span className="text-xs md:text-sm text-gray-300">Real-Time Updates</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-3xl mx-auto px-4">
              <div className="text-center group cursor-pointer">
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-2 group-hover:from-emerald-300 group-hover:to-teal-300 transition-all duration-300">
                  10K+
                </div>
                <div className="text-gray-400 text-sm md:text-base group-hover:text-gray-300 transition-colors duration-300">
                  Happy Users
                </div>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-2 group-hover:from-emerald-300 group-hover:to-teal-300 transition-all duration-300">
                  500+
                </div>
                <div className="text-gray-400 text-sm md:text-base group-hover:text-gray-300 transition-colors duration-300">
                  Partnered Stores
                </div>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-2 group-hover:from-emerald-300 group-hover:to-teal-300 transition-all duration-300">
                  98%
                </div>
                <div className="text-gray-400 text-sm md:text-base group-hover:text-gray-300 transition-colors duration-300">
                  Deal Satisfaction
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="features" className="py-20 bg-gray-800/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              How TheDealsFr Works
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Simple, fast, and effective way to connect local businesses with customers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="bg-gradient-to-br from-gray-800/50 to-gray-700/30 border-gray-700 hover:border-emerald-500/50 text-center p-8 group hover:shadow-2xl hover:shadow-emerald-500/10 transform hover:scale-105 transition-all duration-300 cursor-pointer">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 group-hover:from-emerald-500/30 group-hover:to-teal-500/30 rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-300">
                  <Store className="w-8 h-8 text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-emerald-400 group-hover:to-teal-400 transition-all duration-300">
                  Stores Post Deals
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                  Local businesses create and publish exclusive discount offers on our platform
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-800/50 to-gray-700/30 border-gray-700 hover:border-emerald-500/50 text-center p-8 group hover:shadow-2xl hover:shadow-emerald-500/10 transform hover:scale-105 transition-all duration-300 cursor-pointer">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 group-hover:from-emerald-500/30 group-hover:to-teal-500/30 rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-300">
                  <MapPin className="w-8 h-8 text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-emerald-400 group-hover:to-teal-400 transition-all duration-300">
                  Customers Discover
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                  Users find amazing deals from stores in their neighborhood through our app
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-800/50 to-gray-700/30 border-gray-700 hover:border-emerald-500/50 text-center p-8 group hover:shadow-2xl hover:shadow-emerald-500/10 transform hover:scale-105 transition-all duration-300 cursor-pointer">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 group-hover:from-emerald-500/30 group-hover:to-teal-500/30 rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-300">
                  <Users className="w-8 h-8 text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-emerald-400 group-hover:to-teal-400 transition-all duration-300">
                  Everyone Wins
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                  Customers save money while supporting local businesses in their community
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* For Stores Section */}
      <section id="for-stores" className="py-20 px-25">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-400 border border-emerald-500/30 hover:from-emerald-500/30 hover:to-teal-500/30 transition-all duration-300 cursor-pointer">
                For Store Owners
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Grow Your Business with{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                  Local Marketing
                </span>
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Reach customers in your area with targeted deals and promotions. Build loyalty and increase foot traffic
                to your store.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3 group cursor-pointer">
                  <div className="w-6 h-6 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 group-hover:from-emerald-500/30 group-hover:to-teal-500/30 rounded-full flex items-center justify-center mt-1 transition-all duration-300">
                    <TrendingUp className="w-4 h-4 text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-emerald-400 group-hover:to-teal-400 transition-all duration-300">
                      Increase Visibility
                    </h4>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                      Get discovered by customers actively looking for deals
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 group cursor-pointer">
                  <div className="w-6 h-6 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 group-hover:from-emerald-500/30 group-hover:to-teal-500/30 rounded-full flex items-center justify-center mt-1 transition-all duration-300">
                    <Clock className="w-4 h-4 text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-emerald-400 group-hover:to-teal-400 transition-all duration-300">
                      Real-Time Control
                    </h4>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                      Update deals instantly and track performance
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 group cursor-pointer">
                  <div className="w-6 h-6 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 group-hover:from-emerald-500/30 group-hover:to-teal-500/30 rounded-full flex items-center justify-center mt-1 transition-all duration-300">
                    <Star className="w-4 h-4 text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-emerald-400 group-hover:to-teal-400 transition-all duration-300">
                      Build Loyalty
                    </h4>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                      Create repeat customers with exclusive offers
                    </p>
                  </div>
                </div>
              </div>

              <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg hover:shadow-emerald-500/25 transform hover:scale-105 transition-all duration-300 cursor-pointer">
                <Building2 className="w-4 h-4 mr-2" />
                Start Listing Deals
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 hover:from-emerald-500/30 hover:to-teal-500/30 rounded-2xl p-8 border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300 group cursor-pointer">
                <Image
                  src="/placeholder.svg?height=400&width=500"
                  alt="Store owner managing deals on dashboard"
                  width={500}
                  height={400}
                  className="rounded-lg group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Customers Section */}
      <section id="customers" className="py-20 px-25 bg-gray-800/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 hover:from-emerald-500/30 hover:to-teal-500/30 rounded-2xl p-8 border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300 group cursor-pointer">
                <Image
                  src="/placeholder.svg?height=400&width=500"
                  alt="Customer discovering local deals on mobile app"
                  width={500}
                  height={400}
                  className="rounded-lg group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <Badge className="mb-4 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-400 border border-emerald-500/30 hover:from-emerald-500/30 hover:to-teal-500/30 transition-all duration-300 cursor-pointer">
                For Customers
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Save Money While Supporting{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                  Local Business
                </span>
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Discover exclusive deals from stores in your neighborhood. Save money on everything you need while
                helping local businesses thrive.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3 group cursor-pointer">
                  <div className="w-6 h-6 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 group-hover:from-emerald-500/30 group-hover:to-teal-500/30 rounded-full flex items-center justify-center mt-1 transition-all duration-300">
                    <MapPin className="w-4 h-4 text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-emerald-400 group-hover:to-teal-400 transition-all duration-300">
                      Location-Based Deals
                    </h4>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                      Find deals from stores within walking distance
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 group cursor-pointer">
                  <div className="w-6 h-6 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 group-hover:from-emerald-500/30 group-hover:to-teal-500/30 rounded-full flex items-center justify-center mt-1 transition-all duration-300">
                    <Zap className="w-4 h-4 text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-emerald-400 group-hover:to-teal-400 transition-all duration-300">
                      Instant Notifications
                    </h4>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                      Get alerted when new deals are posted nearby
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 group cursor-pointer">
                  <div className="w-6 h-6 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 group-hover:from-emerald-500/30 group-hover:to-teal-500/30 rounded-full flex items-center justify-center mt-1 transition-all duration-300">
                    <Shield className="w-4 h-4 text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-emerald-400 group-hover:to-teal-400 transition-all duration-300">
                      Verified Offers
                    </h4>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                      All deals are verified and guaranteed by local stores
                    </p>
                  </div>
                </div>
              </div>

              <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg hover:shadow-emerald-500/25 transform hover:scale-105 transition-all duration-300 cursor-pointer">
                <User className="w-4 h-4 mr-2" />
                Join as Customer
                <Download className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile App Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="mobile-app-container">
            {/* Mobile Phone Mockup */}
            <div className="mobile-phone-container">
              <div className="relative group rounded-[40px]">
                {/* Phone Frame - Enhanced with CSS classes */}
                <div className="enhanced-phone-frame group-hover:shadow-emerald-500/20">
                  {/* Screen */}
                  <div className="enhanced-phone-screen">
                    {/* Status Bar */}
                    <div className="flex justify-between items-center px-4 md:px-6 py-2 md:py-3 text-white text-xs md:text-sm">
                      <span className="font-medium">9:41</span>
                      <div className="flex items-center space-x-1">
                        <div className="w-3 h-1.5 md:w-4 md:h-2 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-sm"></div>
                        <div className="w-4 h-2 md:w-6 md:h-3 border border-white rounded-sm">
                          <div className="w-3 h-full md:w-4 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-sm"></div>
                        </div>
                      </div>
                    </div>

                    {/* App Content */}
                    <div className="px-4 md:px-6 py-3 md:py-4 flex flex-col h-full">
                      {/* App Header */}
                      <div className="text-center mb-4 md:mb-6">
                        <Image
                          src="/images/TheDealsFr.png"
                          alt="TheDealsFr"
                          width={120}
                          height={40}
                          className="h-6 md:h-8 w-auto mx-auto mb-2"
                        />
                        <p className="text-gray-300 text-xs md:text-sm">Your local deal finder</p>
                      </div>

                      {/* Search Bar */}
                      <div className="bg-gradient-to-r from-gray-700/50 to-gray-600/50 rounded-lg md:rounded-xl p-2 md:p-3 mb-4 md:mb-6 flex items-center space-x-2 md:space-x-3 border border-gray-600/50">
                        <MapPin className="w-3 h-3 md:w-4 md:h-4 text-emerald-400" />
                        <span className="text-gray-300 text-xs md:text-sm">Search deals near you...</span>
                      </div>

                      {/* Deal Cards */}
                      <div className="space-y-2 md:space-y-3 flex-1">
                        <div className="deal-card">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2 md:space-x-3">
                              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-md md:rounded-lg flex items-center justify-center">
                                <Store className="w-3 h-3 md:w-5 md:h-5 text-white" />
                              </div>
                              <div>
                                <p className="text-white text-xs md:text-sm font-medium">Coffee Shop</p>
                                <p className="text-gray-400 text-xs">50% off lattes</p>
                              </div>
                            </div>
                            <Badge className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-400 text-xs border border-emerald-500/30">
                              2 min
                            </Badge>
                          </div>
                        </div>

                        <div className="deal-card deal-card-blue">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2 md:space-x-3">
                              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-md md:rounded-lg flex items-center justify-center">
                                <Store className="w-3 h-3 md:w-5 md:h-5 text-white" />
                              </div>
                              <div>
                                <p className="text-white text-xs md:text-sm font-medium">Pizza Palace</p>
                                <p className="text-gray-400 text-xs">Buy 1 Get 1 Free</p>
                              </div>
                            </div>
                            <Badge className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-400 text-xs border border-blue-500/30">
                              5 min
                            </Badge>
                          </div>
                        </div>

                        <div className="deal-card deal-card-purple">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2 md:space-x-3">
                              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-md md:rounded-lg flex items-center justify-center">
                                <Store className="w-3 h-3 md:w-5 md:h-5 text-white" />
                              </div>
                              <div>
                                <p className="text-white text-xs md:text-sm font-medium">Book Store</p>
                                <p className="text-gray-400 text-xs">30% off novels</p>
                              </div>
                            </div>
                            <Badge className="bg-gradient-to-r from-purple-500/20 to-purple-600/20 text-purple-400 text-xs border border-purple-500/30">
                              8 min
                            </Badge>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Navigation */}
                      <div className="flex justify-around items-center py-3 md:py-4 border-t border-gray-700 mt-3 md:mt-4">
                        <div className="nav-item nav-item-active">
                          <MapPin className="nav-icon w-4 h-4 md:w-5 md:h-5 mb-1 transition-colors duration-300" />
                          <span className="nav-text text-xs transition-colors duration-300">Nearby</span>
                        </div>
                        <div className="nav-item">
                          <Star className="nav-icon w-4 h-4 md:w-5 md:h-5 text-gray-500 mb-1 transition-colors duration-300" />
                          <span className="nav-text text-xs text-gray-500 transition-colors duration-300">
                            Favorites
                          </span>
                        </div>
                        <div className="nav-item">
                          <Users className="nav-icon w-4 h-4 md:w-5 md:h-5 text-gray-500 mb-1 transition-colors duration-300" />
                          <span className="nav-text text-xs text-gray-500 transition-colors duration-300">Profile</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Phone Reflection */}
                <div className="phone-reflection"></div>
              </div>
            </div>

            {/* Content */}
            <div className="mobile-content-container">
              <Badge className="mb-4 md:mb-6 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-400 border border-emerald-500/30 text-xs md:text-sm hover:from-emerald-500/30 hover:to-teal-500/30 transition-all duration-300 cursor-pointer">
                📱 Mobile Experience
              </Badge>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                  Deals in Your Pocket.
                </span>{" "}
                <span className="text-white">Always.</span>
              </h2>

              <p className="text-lg md:text-xl text-gray-300 mb-6 md:mb-8 leading-relaxed">
                Our sleek mobile app gives you instant access to the best local deals. Designed for modern shoppers
                seeking convenience and savings.
              </p>

              {/* Features Grid - Using CSS classes */}
              <div className="mobile-features-grid mb-6 md:mb-8">
                <div className="feature-card">
                  <div className="flex items-center space-x-2 md:space-x-3">
                    <div className="feature-icon bg-gradient-to-br from-blue-500/20 to-blue-600/20">
                      <Zap className="w-4 h-4 md:w-5 md:h-5 text-blue-400 transition-colors duration-300" />
                    </div>
                    <div>
                      <h4 className="feature-title">Real-time Alerts</h4>
                      <p className="feature-description">Instant notifications</p>
                    </div>
                  </div>
                </div>

                <div className="feature-card">
                  <div className="flex items-center space-x-2 md:space-x-3">
                    <div className="feature-icon">
                      <MapPin className="w-4 h-4 md:w-5 md:h-5 text-emerald-400 transition-colors duration-300" />
                    </div>
                    <div>
                      <h4 className="feature-title">Map View</h4>
                      <p className="feature-description">Intuitive navigation</p>
                    </div>
                  </div>
                </div>

                <div className="feature-card">
                  <div className="flex items-center space-x-2 md:space-x-3">
                    <div className="feature-icon bg-gradient-to-br from-purple-500/20 to-purple-600/20">
                      <Star className="w-4 h-4 md:w-5 md:h-5 text-purple-400 transition-colors duration-300" />
                    </div>
                    <div>
                      <h4 className="feature-title">Personalized</h4>
                      <p className="feature-description">Smart recommendations</p>
                    </div>
                  </div>
                </div>

                <div className="feature-card">
                  <div className="flex items-center space-x-2 md:space-x-3">
                    <div className="feature-icon bg-gradient-to-br from-orange-500/20 to-orange-600/20">
                      <Smartphone className="w-4 h-4 md:w-5 md:h-5 text-orange-400 transition-colors duration-300" />
                    </div>
                    <div>
                      <h4 className="feature-title">One-tap Redeem</h4>
                      <p className="feature-description">Easy redemption</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Download Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white px-6 md:px-8 py-4 md:py-5 rounded-2xl flex items-center space-x-3 md:space-x-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer min-w-[160px] md:min-w-[180px]"
                >
                  {/* Apple Logo */}
                  <svg className="w-6 h-6 md:w-7 md:h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>

                  <span className="text-base md:text-lg font-semibold">App Store</span>
                </Button>

                <Button
                  size="lg"
                  className="bg-black hover:bg-gray-900 text-white px-6 md:px-8 py-4 md:py-5 rounded-2xl flex items-center space-x-3 md:space-x-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer border border-white/20 hover:border-white/40 min-w-[160px] md:min-w-[180px]"
                >
                  {/* Google Play Logo */}
                  <svg className="w-6 h-6 md:w-7 md:h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                  </svg>

                  <span className="text-base md:text-lg font-semibold">Google Play</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 md:py-20 bg-gray-800/30">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Choose Your Plan
            </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
              Select the perfect plan for your business needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
            {/* Starter Plan */}
            <Card className="bg-gradient-to-br from-gray-800/50 to-gray-700/30 border-gray-700 hover:border-orange-500/50 p-8 relative group hover:shadow-2xl hover:shadow-orange-500/10 transform hover:scale-105 transition-all duration-300 cursor-pointer">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 group-hover:from-orange-400 group-hover:to-orange-500 rounded-xl flex items-center justify-center transition-all duration-300">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-orange-300 transition-all duration-300">
                      Starter
                    </h3>
                    <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
                      For new businesses.
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <span className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-orange-300 bg-clip-text text-transparent">
                    ₹999
                  </span>
                  <span className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">/month</span>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center space-x-3 group/item">
                    <div className="w-5 h-5 bg-gradient-to-br from-orange-500/20 to-orange-600/20 group-hover/item:from-orange-500/30 group-hover/item:to-orange-600/30 rounded-full flex items-center justify-center transition-all duration-300">
                      <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-orange-300 rounded-full"></div>
                    </div>
                    <span className="text-gray-300 group-hover/item:text-white transition-colors duration-300">
                      50 Deals/mo
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 group/item">
                    <div className="w-5 h-5 bg-gradient-to-br from-orange-500/20 to-orange-600/20 group-hover/item:from-orange-500/30 group-hover/item:to-orange-600/30 rounded-full flex items-center justify-center transition-all duration-300">
                      <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-orange-300 rounded-full"></div>
                    </div>
                    <span className="text-gray-300 group-hover/item:text-white transition-colors duration-300">
                      Basic Analytics
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 group/item">
                    <div className="w-5 h-5 bg-gradient-to-br from-orange-500/20 to-orange-600/20 group-hover/item:from-orange-500/30 group-hover/item:to-orange-600/30 rounded-full flex items-center justify-center transition-all duration-300">
                      <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-orange-300 rounded-full"></div>
                    </div>
                    <span className="text-gray-300 group-hover/item:text-white transition-colors duration-300">
                      Email Support
                    </span>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-orange-500/20 to-orange-600/20 hover:from-orange-500 hover:to-orange-600 border border-orange-500/50 hover:border-orange-400 text-orange-400 hover:text-white transition-all duration-300 transform hover:scale-105 cursor-pointer">
                  Get Started
                </Button>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card className="bg-gradient-to-br from-gray-800/50 to-gray-700/30 border-blue-500/50 p-8 relative group hover:shadow-2xl hover:shadow-blue-500/20 transform hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-1 shadow-lg cursor-pointer">
                  ⭐ Most Popular
                </Badge>
              </div>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 group-hover:from-blue-400 group-hover:to-blue-500 rounded-xl flex items-center justify-center transition-all duration-300">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-blue-300 transition-all duration-300">
                      Pro
                    </h3>
                    <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
                      Growing Business
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
                    ₹2,499
                  </span>
                  <span className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">/month</span>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center space-x-3 group/item">
                    <div className="w-5 h-5 bg-gradient-to-br from-blue-500/20 to-blue-600/20 group-hover/item:from-blue-500/30 group-hover/item:to-blue-600/30 rounded-full flex items-center justify-center transition-all duration-300">
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-blue-300 rounded-full"></div>
                    </div>
                    <span className="text-gray-300 group-hover/item:text-white transition-colors duration-300">
                      Unlimited Deals
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 group/item">
                    <div className="w-5 h-5 bg-gradient-to-br from-blue-500/20 to-blue-600/20 group-hover/item:from-blue-500/30 group-hover/item:to-blue-600/30 rounded-full flex items-center justify-center transition-all duration-300">
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-blue-300 rounded-full"></div>
                    </div>
                    <span className="text-gray-300 group-hover/item:text-white transition-colors duration-300">
                      Advanced Analytics
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 group/item">
                    <div className="w-5 h-5 bg-gradient-to-br from-blue-500/20 to-blue-600/20 group-hover/item:from-blue-500/30 group-hover/item:to-blue-600/30 rounded-full flex items-center justify-center transition-all duration-300">
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-blue-300 rounded-full"></div>
                    </div>
                    <span className="text-gray-300 group-hover/item:text-white transition-colors duration-300">
                      Priority Support
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 group/item">
                    <div className="w-5 h-5 bg-gradient-to-br from-blue-500/20 to-blue-600/20 group-hover/item:from-blue-500/30 group-hover/item:to-blue-600/30 rounded-full flex items-center justify-center transition-all duration-300">
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-blue-300 rounded-full"></div>
                    </div>
                    <span className="text-gray-300 group-hover/item:text-white transition-colors duration-300">
                      Custom Promotions
                    </span>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 cursor-pointer">
                  Choose Pro
                </Button>
              </CardContent>
            </Card>

            {/* Enterprise Plan */}
            <Card className="bg-gradient-to-br from-gray-800/50 to-gray-700/30 border-gray-700 hover:border-purple-500/50 p-8 relative group hover:shadow-2xl hover:shadow-purple-500/10 transform hover:scale-105 transition-all duration-300 cursor-pointer">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-400 group-hover:to-pink-400 rounded-xl flex items-center justify-center transition-all duration-300">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
                      Enterprise
                    </h3>
                    <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
                      Large scale needs.
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                    Custom
                  </span>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center space-x-3 group/item">
                    <div className="w-5 h-5 bg-gradient-to-br from-purple-500/20 to-pink-500/20 group-hover/item:from-purple-500/30 group-hover/item:to-pink-500/30 rounded-full flex items-center justify-center transition-all duration-300">
                      <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                    </div>
                    <span className="text-gray-300 group-hover/item:text-white transition-colors duration-300">
                      All Pro Features
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 group/item">
                    <div className="w-5 h-5 bg-gradient-to-br from-purple-500/20 to-pink-500/20 group-hover/item:from-purple-500/30 group-hover/item:to-pink-500/30 rounded-full flex items-center justify-center transition-all duration-300">
                      <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                    </div>
                    <span className="text-gray-300 group-hover/item:text-white transition-colors duration-300">
                      Dedicated Manager
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 group/item">
                    <div className="w-5 h-5 bg-gradient-to-br from-purple-500/20 to-pink-500/20 group-hover/item:from-purple-500/30 group-hover/item:to-pink-500/30 rounded-full flex items-center justify-center transition-all duration-300">
                      <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                    </div>
                    <span className="text-gray-300 group-hover/item:text-white transition-colors duration-300">
                      API Access
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 group/item">
                    <div className="w-5 h-5 bg-gradient-to-br from-purple-500/20 to-pink-500/20 group-hover/item:from-purple-500/30 group-hover/item:to-pink-500/30 rounded-full flex items-center justify-center transition-all duration-300">
                      <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                    </div>
                    <span className="text-gray-300 group-hover/item:text-white transition-colors duration-300">
                      Custom Integration
                    </span>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500 hover:to-pink-500 border border-purple-500/50 hover:border-purple-400 text-purple-400 hover:text-white transition-all duration-300 transform hover:scale-105 cursor-pointer">
                  Contact Us
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-500/10 to-teal-500/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Ready to Connect with Your Local Community?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of stores and customers who are already saving money and supporting local business.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8 py-4 shadow-lg hover:shadow-emerald-500/25 transform hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <Building2 className="w-5 h-5 mr-2" />
              Register Your Store
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-gray-700 text-gray-300 hover:bg-gradient-to-r hover:from-emerald-500/20 hover:to-teal-500/20 hover:border-emerald-400 hover:text-emerald-400 px-8 py-4 bg-transparent transform hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <User className="w-5 h-5 mr-2" />
              Join as Customer
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-12 px-15">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <h3 className="text-xl font-bold text-white">TheDealsFr</h3>
              </div>
              <div className="w-8 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 mb-4"></div>
              <p className="text-gray-400 mb-6">
                Discover local deals and help businesses thrive. We bridge shoppers and local stores in a smarter way.
              </p>

              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gradient-to-br from-gray-800 to-gray-700 hover:from-emerald-500/20 hover:to-teal-500/20 rounded-full flex items-center justify-center hover:border hover:border-emerald-400 transition-all duration-300 cursor-pointer group">
                  <svg
                    className="w-4 h-4 text-gray-400 group-hover:text-emerald-400 transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-gray-800 to-gray-700 hover:from-emerald-500/20 hover:to-teal-500/20 rounded-full flex items-center justify-center hover:border hover:border-emerald-400 transition-all duration-300 cursor-pointer group">
                  <svg
                    className="w-4 h-4 text-gray-400 group-hover:text-emerald-400 transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-gray-800 to-gray-700 hover:from-emerald-500/20 hover:to-teal-500/20 rounded-full flex items-center justify-center hover:border hover:border-emerald-400 transition-all duration-300 cursor-pointer group">
                  <svg
                    className="w-4 h-4 text-gray-400 group-hover:text-emerald-400 transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z" />
                  </svg>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-gray-800 to-gray-700 hover:from-emerald-500/20 hover:to-teal-500/20 rounded-full flex items-center justify-center hover:border hover:border-emerald-400 transition-all duration-300 cursor-pointer group">
                  <svg
                    className="w-4 h-4 text-gray-400 group-hover:text-emerald-400 transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Quick Links</h4>
              <div className="w-8 h-1 bg-gradient-to-r from-orange-400 to-orange-300 mb-4"></div>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    href="#"
                    className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-emerald-400 hover:to-teal-400 transition-all duration-300 cursor-pointer"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-emerald-400 hover:to-teal-400 transition-all duration-300 cursor-pointer"
                  >
                    For Stores
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-emerald-400 hover:to-teal-400 transition-all duration-300 cursor-pointer"
                  >
                    Mobile App
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-emerald-400 hover:to-teal-400 transition-all duration-300 cursor-pointer"
                  >
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Support</h4>
              <div className="w-8 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mb-4"></div>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    href="#"
                    className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-emerald-400 hover:to-teal-400 transition-all duration-300 cursor-pointer"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-emerald-400 hover:to-teal-400 transition-all duration-300 cursor-pointer"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-emerald-400 hover:to-teal-400 transition-all duration-300 cursor-pointer"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-emerald-400 hover:to-teal-400 transition-all duration-300 cursor-pointer"
                  >
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Contact</h4>
              <div className="w-8 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 mb-4"></div>
              <div className="space-y-3 text-gray-400">
                <div className="flex items-center space-x-3 group cursor-pointer">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-gray-500 group-hover:text-emerald-400 transition-colors duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <span className="group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-emerald-400 group-hover:to-teal-400 transition-all duration-300">
                    hello@thedealsfr.com
                  </span>
                </div>
                <div className="flex items-center space-x-3 group cursor-pointer">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-gray-500 group-hover:text-emerald-400 transition-colors duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <span className="group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-emerald-400 group-hover:to-teal-400 transition-all duration-300">
                    +977-9851129971
                  </span>
                </div>
                <div className="flex items-center space-x-3 group cursor-pointer">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-gray-500 group-hover:text-emerald-400 transition-colors duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <span className="group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-emerald-400 group-hover:to-teal-400 transition-all duration-300">
                    Sanepa-2, Lalitpur, Nepal
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 TheDealsFr. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
