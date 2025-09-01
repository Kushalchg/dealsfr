"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getStoreList } from "@/redux/features/store/store";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  Building,
  Edit,
  Globe,
  Mail,
  MapPin,
  Phone,
  PlusCircle,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";

const StoreManager = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // dispatch(getStoreList())
  }, []);

  const { storeDetailData } = useAppSelector((s) => s.store);

  const storeTypeLabels: Record<string, string> = {
    DEPT: "Department Store",
    SUPER: "Supermarket",
    LOCAL: "Local Store",
    ONLINE: "Online Store",
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-foreground">
          Store Manager
        </h1>
        <Link href="/dashboard/create_branch">
          <Button>Add Branch</Button>
        </Link>
      </div>

      {storeDetailData && (
        <Card className="w-full transition-colors">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src={storeDetailData.logo || undefined}
                    alt={storeDetailData.name}
                    className="object-cover"
                    onError={(e) =>
                      ((e.target as HTMLImageElement).style.display = "none")
                    }
                  />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {(storeDetailData?.name ?? "")
                      .substring(0, 2)
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-card-foreground text-xl mb-2">
                    {storeDetailData.name}
                  </CardTitle>
                  <Badge variant="secondary">
                    {storeTypeLabels[storeDetailData.store_type] ||
                      storeDetailData.store_type}
                  </Badge>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="destructive" size="icon" className="h-8 w-8">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>
                    {storeDetailData.address}, {storeDetailData.city},{" "}
                    {storeDetailData.district}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4 text-primary" />
                  <span>{storeDetailData.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4 text-primary" />
                  <span>{storeDetailData.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Globe className="h-4 w-4 text-primary" />
                  <span>{storeDetailData.website}</span>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-card-foreground mb-2">
                  Description
                </h3>
                <p className="text-sm text-muted-foreground">
                  {storeDetailData.description}
                </p>
              </div>
            </div>

            <Separator className="my-4" />

            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-medium text-card-foreground">
                  Store Branches ({storeDetailData.branches?.length || 0})
                </h3>

                <Link href="/dashboard/create_branch">
                  <Button variant="outline" size="sm" className="h-8">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Branch
                  </Button>

                </Link>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {storeDetailData.branches?.map((branch) => (
                  <Card key={branch.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Building className="h-4 w-4 text-primary" />
                            <span className="font-medium text-card-foreground">
                              {branch.name}
                            </span>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {branch.address}, {branch.city}
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-destructive hover:text-destructive/90"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StoreManager;
