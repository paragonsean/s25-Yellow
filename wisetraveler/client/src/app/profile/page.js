"use client";
import Profile from "@/components/profile/profile";

export default function ProfilePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     <div className="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
           Your Profile Information
          </h2>
        </div>

        <Profile />
      </div>
    </main>
  );
}