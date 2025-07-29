"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface Product {
  image?: string;
  name: string;
  stock: number;
  rating: number;
  description: string;
  price: number;
}

interface CustomerProductCardProps {
  product: Product;
  columnSpan: number;
  isMobile?: boolean;
}

export default function CustomerProductCard({ product, columnSpan, isMobile = false }: CustomerProductCardProps) {
  const getAspectRatio = (span: number) => {
    if (isMobile) return "aspect-[4/3]";
    switch (span) {
      case 1:
        return "aspect-square";
      case 2:
        return "aspect-[4/3]";
      case 3:
        return "aspect-video";
      default:
        return "aspect-video";
    }
  };

  const aspectRatio = getAspectRatio(columnSpan);
 

  return (
    <Card className="overflow-hidden h-full flex flex-col hover:shadow-xl transition-all duration-300 bg-grey border border-muted rounded-2xl">
      <div className={`${aspectRatio} relative overflow-hidden`}>
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
        />
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Badge variant="destructive" className="text-sm">Out of Stock</Badge>
          </div>
        )}
        {product.stock > 0 && product.stock <= 10 && (
          <Badge className="absolute top-2 left-2 bg-yellow-500 text-white shadow-md">Low Stock</Badge>
        )}
      </div>
      <CardContent className="flex-grow p-4">
        <div className="space-y-2">
          <h3 className={`font-semibold ${isMobile ? "text-base" : "text-lg"} line-clamp-2 text-foreground`}>
            {product.name}
          </h3>
          <div className="flex items-center gap-1">
            <div className="flex text-yellow-400 text-sm">
              {[...Array(5)].map((_, i) => (
                <span key={i}>{i < Math.floor(product.rating) ? "★" : "☆"}</span>
              ))}
            </div>
            <span className="text-sm text-muted-foreground">({product.rating})</span>
          </div>
          <p className="text-muted-foreground text-sm line-clamp-2">{product.description}</p>
        </div>
      </CardContent>
      <CardFooter className="border-t border-border p-4 bg-muted/50">
        <div className="w-full flex justify-between items-center">
          <span className={`font-bold ${isMobile ? "text-lg" : "text-xl"} text-primary`}>
            ${product.price.toFixed(2)}
          </span>
          <Button
            variant="default"
            size="sm"
            disabled={product.stock === 0}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}