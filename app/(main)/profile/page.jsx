import React from "react";
import { profile } from "@/actions/user";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function Profile() {
  const user = await profile();

  if (!user) {
    return (
      <div className="p-6 text-center text-red-500 text-xl font-semibold">
        User not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 space-y-8 bg-background text-white">

      {/* Header: Name & Email */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold hover:text-primary transition duration-200">
          {user.name}
        </h1>
        <p className="text-gray-400 text-lg hover:text-white transition duration-200">
          {user.email}
        </p>
      </div>

      {/* Skills Section */}
      <Card className="bg-muted/30 border border-muted transition-transform hover:scale-[1.01] duration-300">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-white">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {user.skills?.map((skill, index) => (
              <Badge
                key={index}
                className="bg-white text-black text-sm px-3 py-1 rounded-full hover:bg-primary hover:text-white transition"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Bio Section */}
      <Card className="bg-muted/30 border border-muted transition-transform hover:scale-[1.01] duration-300">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-white">Bio</h2>
          <p className="text-sm text-gray-300 leading-relaxed">
            {user.bio}
          </p>
        </CardContent>
      </Card>

      {/* Industry Section */}
      <Card className="bg-muted/30 border border-muted transition-transform hover:scale-[1.01] duration-300">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-white">Industry</h2>
          <p className="text-sm text-gray-300">
            {user.industryInsight?.industry || "Not specified"}
          </p>
        </CardContent>
      </Card>

      {/* Experience Section */}
      <Card className="bg-muted/30 border border-muted transition-transform hover:scale-[1.01] duration-300">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-white">Experience</h2>
          <p className="text-sm text-gray-300">
            {user.experience
              ? `${user.experience} years of industry experience.`
              : "Experience not mentioned."}
          </p>
        </CardContent>
      </Card>

    </div>
  );
}
