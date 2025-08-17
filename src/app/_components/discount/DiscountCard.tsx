import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Percent } from "lucide-react";

interface DiscountCardProps {
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  terms_conditions: string;
  status: string;
  discount_type: string;
  discount_percent: string;
  main_category: number;
  sub_category: number;
  banner: number;
  layout: number;
  product: number[];
}

export const DiscountCard: React.FC<DiscountCardProps> = ({
  title,
  description,
  start_date,
  end_date,
  terms_conditions,
  status,
  discount_type,
  discount_percent,
  main_category,
  sub_category,
  banner,
  layout,
  product,
}) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card className="w-full  bg-[var(--card)] text-[var(--card-foreground)] border-[var(--border)] rounded-[var(--radius)]">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold text-[var(--primary)]">
            {title}
          </CardTitle>
          <Badge
            className={`${status === "pending"
              ? "bg-[var(--toast-loading-bg)] text-[var(--toast-loading-color)]"
              : "bg-[var(--toast-success-bg)] text-[var(--toast-success-color)]"
              }`}
          >
            {status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-[var(--muted-foreground)]">{description}</p>
        <div className="flex items-center gap-2">
          <Percent className="h-4 w-4 text-[var(--accent)]" />
          <span className="text-[var(--foreground)]">
            {discount_percent}% {discount_type} Discount
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-[var(--accent)]" />
          <span className="text-[var(--muted-foreground)]">
            {formatDate(start_date)} - {formatDate(end_date)}
          </span>
        </div>
        <div className="text-sm text-[var(--muted-foreground)]">
          <p className="font-semibold">Terms & Conditions:</p>
          <p>{terms_conditions}</p>
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm text-[var(--muted-foreground)]">
          <div>
            <p className="font-semibold">Main Category:</p>
            <p>{main_category}</p>
          </div>
          <div>
            <p className="font-semibold">Sub Category:</p>
            <p>{sub_category}</p>
          </div>
          <div>
            <p className="font-semibold">Banner:</p>
            <p>{banner}</p>
          </div>
          <div>
            <p className="font-semibold">Layout:</p>
            <p>{layout}</p>
          </div>
        </div>
        <div>
          <p className="font-semibold text-[var(--foreground)]">Products:</p>
          <p className="text-[var(--muted-foreground)]">
            {product?.length || "No products"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
