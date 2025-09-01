"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as z from "zod";

const branchFormSchema = z.object({
  name: z.string().min(2, {
    message: "Branch name must be at least 2 characters.",
  }),
  city: z.string().min(2, {
    message: "City name must be at least 2 characters.",
  }),
  district: z.string().min(2, {
    message: "District name must be at least 2 characters.",
  }),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  location_link: z.string().url({
    message: "Please enter a valid URL.",
  }),
  latitude: z.string().regex(/^-?\d*\.?\d*$/, {
    message: "Please enter a valid latitude.",
  }),
  longitude: z.string().regex(/^-?\d*\.?\d*$/, {
    message: "Please enter a valid longitude.",
  }),
});

type BranchFormValues = z.infer<typeof branchFormSchema>;

const defaultValues: Partial<BranchFormValues> = {
  name: "",
  city: "",
  district: "",
  address: "",
  location_link: "",
  latitude: "",
  longitude: "",
};

export default function CreateBranchPage() {
  const form = useForm<BranchFormValues>({
    resolver: zodResolver(branchFormSchema),
    defaultValues,
  });

  function onSubmit(data: BranchFormValues) {
    // TODO: Implement the API call to create branch
    console.log(data);
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-card-foreground">
          Create New Branch
        </h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-card-foreground">Branch Details</CardTitle>
          <CardDescription className="text-muted-foreground">
            Fill in the details for your new branch location.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">
                        Branch Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter branch name"
                          className="bg-background text-foreground border-input"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">City</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter city"
                          className="bg-background text-foreground border-input"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="district"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">
                        District
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter district"
                          className="bg-background text-foreground border-input"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location_link"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">
                        Location Link
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Google Maps URL"
                          type="url"
                          className="bg-background text-foreground border-input"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-muted-foreground">
                        Add a Google Maps link for your branch location
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="latitude"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">
                        Latitude
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter latitude"
                          className="bg-background text-foreground border-input"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="longitude"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">
                        Longitude
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter longitude"
                          className="bg-background text-foreground border-input"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter complete address"
                        className="bg-background text-foreground border-input"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => window.history.back()}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Create Branch
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
