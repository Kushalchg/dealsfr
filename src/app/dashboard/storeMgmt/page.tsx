"use client";

import BranchCard from "@/app/_components/storeComp/BranchCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import api from "@/lib/interceptor";
import { getBranchDetails, getStoreDetail } from "@/redux/features/store/store";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { DialogClose } from "@radix-ui/react-dialog";
import {
  Building,
  Edit,
  Files,
  Globe,
  Mail,
  MapPin,
  Phone,
  Plus,
  PlusCircle,
  Store,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const StoreManager = () => {
  const dispatch = useAppDispatch();
  const router = useRouter()
  const { storeDetailData, branchDetailsData } = useAppSelector((s) => s.store);
  const [socialModal, setSocialModal] = useState<boolean>(false)

  const handleStoreDetailEdit = (id: number) => {
    router.push(`/dashboard/store_setup/`)
    console.log({ id })
  }


  useEffect(() => {
    if (branchDetailsData) {
      router.push('/dashboard/create_branch/?action=edit')
    }
  }, [branchDetailsData])

  const handleAddSocial = () => {
    console.log("closed modal")
    setSocialModal(false)
  }

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
          Store Management
        </h1>
      </div>
      {!storeDetailData && (
        <Card className="justify-center p-20 border-0 gap-4">
          <CardContent className="flex flex-col items-center text-card-foreground mx-auto gap-4 text-xl  mb-2">
            <CardTitle>
              No Store data found!!
            </CardTitle>
            <Link href="/dashboard/store_setup" className="" >
              <Button variant="outline" size="lg" >
                <PlusCircle className="h-4 w-4 mr-2" />
                Register Your Store
              </Button>
            </Link>
          </CardContent>
        </Card >
      )}


      {storeDetailData && (
        <Card className="w-full transition-colors">
          <CardHeader>
            <div className="flex justify-between items-start flex-wrap gap-4">
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
              </div >
              <div className="flex gap-5 flex-wrap">
                <Button
                  onClick={() => handleStoreDetailEdit(storeDetailData.id)}
                  variant={'outline'} className="flex flex-row">
                  <Files />
                  <span>
                    Documents
                  </span>
                </Button>
                <Button
                  onClick={() => handleStoreDetailEdit(storeDetailData.id)}
                  variant={'outline'} className="flex flex-row">
                  <Edit />
                  <span>
                    Details
                  </span>
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

            <Dialog onOpenChange={(value) => setSocialModal(value)} open={socialModal}>
              <DialogTrigger onClick={() => setSocialModal(true)} className=" border p-2 rounded-lg border-dashed">
                <Plus />
              </DialogTrigger>
              <DialogContent className="text-foreground">
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      Close
                    </Button>
                  </DialogClose>
                  <Button type="submit" onClick={() => handleAddSocial()} >Confirm</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
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

              {/*List of branches*/}
              <div className="grid grid-cols gap-4">
                {storeDetailData.branches?.map((branch) => (
                  <div key={branch.id.toString()}>
                    <BranchCard branch={branch} />
                  </div>
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
