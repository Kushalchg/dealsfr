"use client";

import { Button } from "@/components/ui/button";
import  Link  from "next/link";

export default function SettingsPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-10 space-y-8">
      <header className="mb-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your store and account preferences</p>
      </header>



      {/* Change Email and User Info */}
      <section className="rounded-2xl border bg-background p-6 shadow-sm hover:shadow-md transition-all">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">User Info</h2>
            <p className="text-sm text-muted-foreground">Change your email and username.</p>
          </div>
          <Button>Update Info</Button>
        </div>
      </section>

      {/* Change Password */}
      <section className="rounded-2xl border bg-background p-6 shadow-sm hover:shadow-md transition-all">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Change Password</h2>
            <p className="text-sm text-muted-foreground">Update your login credentials.</p>
          </div>
          <Button>Change Password</Button>
        </div>
      </section>

      {/* Delete Account */}
      <section className="rounded-2xl border bg-red-50 dark:bg-red-900/10 p-6 shadow-sm hover:shadow-md transition-all">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-red-600 dark:text-red-400">Danger Zone</h2>
            <p className="text-sm text-red-500 dark:text-red-300">Deleting your account is irreversible.</p>
          </div>
          <Button variant="destructive">Delete Account</Button>
        </div>
      </section>
    </main>
  );
}
