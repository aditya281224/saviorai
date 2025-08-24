"use client";

import React, { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const UserProfile = ({ user, isOnboarded }) => {
  const router = useRouter();

  
  useEffect(() => {
    if (!isOnboarded) {
      router.push("/onboarding");
    }
  }, [isOnboarded, router]);

  



  return (
    <div className="min-h-screen p-6 space-y-8 bg-background text-white">
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h1 className="text-3xl font-bold hover:text-primary transition duration-200">
          {user.name}
        </h1>
        <p className="text-gray-400 text-lg hover:text-white transition duration-200">
          {user.email}
        </p>
      </div>

      
      <Card className="bg-muted/30 border border-muted hover:shadow-lg transition-transform hover:scale-[1.01] duration-300">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {user.skills?.map((skill, index) => (
              <Badge
                key={index}
                className="bg-white text-black text-sm px-3 py-1 rounded-full hover:bg-primary hover:text-blue transition"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      
      <Card className="bg-muted/30 border border-muted hover:shadow-lg transition-transform hover:scale-[1.01] duration-300">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Bio</h2>
          <p className="text-sm text-gray-300 leading-relaxed">
            {user.bio || "No bio available."}
          </p>
        </CardContent>
      </Card>

      
      <Card className="bg-muted/30 border border-muted hover:shadow-lg transition-transform hover:scale-[1.01] duration-300">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Industry</h2>
          <p className="text-sm text-gray-300">
            {user.industryInsight?.industry || "Not specified"}
          </p>
        </CardContent>
      </Card>

      
      <Card className="bg-muted/30 border border-muted hover:shadow-lg transition-transform hover:scale-[1.01] duration-300">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Experience</h2>
          <p className="text-sm text-gray-300">
            {user.experience
              ? `${user.experience} years of industry experience.`
              : "Experience not mentioned."}
          </p>
        </CardContent>
      </Card>

      
      <div className="flex justify-end">
        <Button
          onClick={() => router.push("/onboarding")}
          className="px-6 py-2 rounded-xl text-lg font-semibold shadow-md transition-transform hover:scale-105"
        >
          Update Profile
        </Button>
      </div>
    </div>
  );
};

export default UserProfile;
