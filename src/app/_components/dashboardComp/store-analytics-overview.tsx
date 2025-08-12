import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface StoreAnalytics {
  id: number
  name: string
  views?: number
  clicks_on_discounts?: number
  orders_received?: number
  followers?: unknown[]
}

interface StoreAnalyticsOverviewProps {
  stores: StoreAnalytics[]
}

export function StoreAnalyticsOverview({ stores }: StoreAnalyticsOverviewProps) {
  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">Store Analytics Overview</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="text-gray-400">
              <th className="px-4 py-2">Store</th>
              <th className="px-4 py-2">Views</th>
              <th className="px-4 py-2">Discount Clicks</th>
              <th className="px-4 py-2">Orders</th>
              <th className="px-4 py-2">Followers</th>
            </tr>
          </thead>
          <tbody>
            {stores.map((store) => (
              <tr key={store.id} className="border-t border-gray-800">
                <td className="px-4 py-2 text-white">{store.name}</td>
                <td className="px-4 py-2 text-white">{(store.views ?? 0).toLocaleString()}</td>
                <td className="px-4 py-2 text-white">{(store.clicks_on_discounts ?? 0).toLocaleString()}</td>
                <td className="px-4 py-2 text-white">{(store.orders_received ?? 0).toLocaleString()}</td>
                <td className="px-4 py-2 text-white">{(store.followers?.length ?? 0).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  )
}

