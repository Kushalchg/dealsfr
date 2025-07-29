import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Phone, Mail, ExternalLink, CheckCircle, Clock } from "lucide-react"

interface StoreInfoCardProps {
  store: {
    id: number
    logo: string
    name: string
    store_type: string
    city: string
    district: string
    location_link: string
    address: string
    phone: string
    email: string
    is_verified: boolean
    created_at: string
  }
}

export function StoreInfoCard({ store }: StoreInfoCardProps) {
  const storeTypeLabels: Record<string, string> = {
    DEPT: "Department Store",
    GROCERY: "Grocery Store",
    RESTAURANT: "Restaurant",
    FASHION: "Fashion Store",
    ELECTRONICS: "Electronics Store",
  }

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center space-x-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={store.logo || "/placeholder.svg"} alt={store.name} />
            <AvatarFallback className="bg-emerald-600 text-white">
              {store.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center space-x-2">
              <span>{store.name}</span>
              {store.is_verified ? (
                <CheckCircle className="h-5 w-5 text-emerald-400" />
              ) : (
                <Clock className="h-5 w-5 text-yellow-400" />
              )}
            </div>
            <div className="flex items-center space-x-2 mt-1">
              <Badge variant="secondary" className="bg-emerald-900 text-emerald-200">
                {storeTypeLabels[store.store_type] || store.store_type}
              </Badge>
              <Badge
                variant={store.is_verified ? "default" : "secondary"}
                className={store.is_verified ? "bg-emerald-600 text-white" : "bg-yellow-900 text-yellow-200"}
              >
                {store.is_verified ? "Verified" : "Pending Verification"}
              </Badge>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-gray-300">
              <MapPin className="h-4 w-4 text-emerald-400" />
              <span className="text-sm">{store.address}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-300">
              <span className="text-sm">
                {store.city}, {store.district}
              </span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-gray-300">
              <Phone className="h-4 w-4 text-emerald-400" />
              <span className="text-sm">{store.phone}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-300">
              <Mail className="h-4 w-4 text-emerald-400" />
              <span className="text-sm">{store.email}</span>
            </div>
          </div>
        </div>
        {store.location_link && (
          <div className="pt-2">
            <a
              href={store.location_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-emerald-400 hover:text-emerald-300 text-sm"
            >
              <ExternalLink className="h-4 w-4" />
              <span>View on Map</span>
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
