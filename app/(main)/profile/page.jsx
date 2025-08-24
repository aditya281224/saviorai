import React from "react";
import { getUserOnboardingStatus, profile } from "@/actions/user";
import UserProfile from "./_components/page";
import { redirect } from "next/navigation";



export default async function Profile() {
  const user = await profile();

  if (!user) {
    return (
      <div className="p-6 text-center text-red-500 text-xl font-semibold">
        User not found.
      </div>
    );
  }
  const { isOnboarded } = await getUserOnboardingStatus();
  if(!isOnboarded){
    redirect('/onboarding');
  }

  return (
    <div>
      <UserProfile user={user} isOnboarded={isOnboarded} />
    </div>
  );
}
