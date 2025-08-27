"use client"
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useState } from "react";

const LatestInterviewList = () => {
  
  const [interviewList, setInterviewList] = useState([]);
  return (
    <div className="my-5">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Interviews</CardTitle>
              <CardDescription>
                Your latest interview performance
              </CardDescription>
            </div>
            
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};

export default LatestInterviewList;
