import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

const PerformanceInterview = () => {
  return (
    <div className="my-3">
      <Card>
        <CardHeader>
          <CardTitle>Performance Trend</CardTitle>
          <CardDescription>
            Your Interview Result Trend OverTime
          </CardDescription>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    </div>
  );
};

export default PerformanceInterview ;
