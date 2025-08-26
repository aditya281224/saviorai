"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function getUserInfo() {
  try{
    const {userId}=await auth();
  if(!userId) throw new Error("Unauthorized");
  const user=await db.user.findUnique({
    where:{clerkUserId:userId},
    select:{
      industry:true,
      skills:true,
      experience:true
    }
  });
  if(!user) throw new Error("User not found");

  return user;
  }
  catch(error){
    console.error("Error i finding user", error.message);
    throw new Error("Failed to find user profile");
  }

}