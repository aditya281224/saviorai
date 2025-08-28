import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InterviewType } from "@/data/interviewType";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

const FormContainer = ({ onHandleInputChange }) => {
  const [interviewType, setInterviewType] = useState([]);
  useEffect(() => {
    if (interviewType) {
      onHandleInputChange("type", interviewType);
    }
  }, [interviewType]);

  const AddInterviewType = (type) => {
  const exists = interviewType.includes(type);
  if (!exists) {
    setInterviewType((prev) => [...prev, type]); 
  } else {
    const result = interviewType.filter((item) => item !== type); 
    setInterviewType(result);
  }
};

  return (
    <div className="p-5 bg-white">
      <div>
        <h2 className="text-sm font-bold text-black">Job Position</h2>
        <Input
          placeholder="Full Stack Developer"
          className="mt-2 text-blue-950 border-black"
          onChange={(event) =>
            onHandleInputChange("jobPosition", event.target.value)
          }
        />
      </div>
      <div className="mt-5 ">
        <h2 className="text-sm text-black font-bold">Job Description</h2>
        <Textarea
          placeholder="Enter Job details"
          className="h-[200px] mt-2 text-blue-950 border-gray-900 "
          onChange={(event) =>
            onHandleInputChange("jobDescription", event.target.value)
          }
        />
      </div>
      <div className="mt-5">
        <h2 className="text-sm text-black font-bold">Interview Duration</h2>
        <Select
          onValueChange={(value) => onHandleInputChange("duration", value)}
        >
          <SelectTrigger className="w-[180px] text-blue-950 border-gray-900">
            <SelectValue placeholder="Select Duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5 min</SelectItem>
            <SelectItem value="15">15 min</SelectItem>
            <SelectItem value="30">30 min</SelectItem>
            <SelectItem value="45">45 min</SelectItem>
            <SelectItem value="60">60 min</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mt-5">
        <h2 className="text-sm text-black font-bold">Interview Type</h2>
        <div className="flex gap-3 flex-wrap mt-2">
          {InterviewType.map((type, index) => (
            <div
              key={index}
              className={`flex items-center cursor-pointer gap-2 p-1 px-4 
    border border-gray-300 rounded-2xl 
    hover:bg-secondary
    ${
      interviewType.includes(type.title)
        ? "bg-blue-50 text-black"
        : "bg-amber-500"
    }
  `}
              onClick={() => AddInterviewType(type.title)
              }
            >
              <type.icon className="h-6 w-6" />
              <span>{type.title}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-7 flex justify-end">
        <Button>
          Generate Question<ArrowRight></ArrowRight>
        </Button>
      </div>
    </div>
  );
};

export default FormContainer;
