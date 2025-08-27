import { profile } from "@/actions/user";
import React from "react";
import Options from "../_components/create-options";

import LatestInterviewList from "../_components/latest-interviews";

const TitlePage = async () => {
  const userProfile = await profile();
  return (
    <div>
      <div className="flex justify-between items-center my-3">
        <div className="p-5 rounded-xl bg-accent">
          <h1 className="text-lg font-bold">Hello {userProfile.name}</h1>
          <h2>AI-driver interview, get job ready</h2>
        </div>
      </div>
      <Options />
      <LatestInterviewList/>
    </div>
  );
};

export default TitlePage;
