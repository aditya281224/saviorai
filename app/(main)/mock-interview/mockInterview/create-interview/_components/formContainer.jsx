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

const FormContainer = () => {
  return (
    <div className="p-5 bg-white">
      <div>
        <h2 className="text-sm text-black">Job Position</h2>
        <Input placeholder="Full Stack Developer" className="mt-2 text-blue-950 border-black" />
      </div>
      <div className="mt-5 ">
        <h2 className="text-sm text-black">Job Description</h2>
        <Textarea placeholder="Enter Job details" className="h-[200px] mt-2 text-blue-950 border-gray-900" />
      </div>
      <div className="mt-5">
        <h2 className="text-sm text-black">Interview Duration</h2>
        <Select>
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
        <h2 className="text-sm text-black">Interview Type</h2>
        <div>
          {InterviewType.map((type,index)=>(
            <div key={index} className="text-black text-sm flex gap-2">
              <type.icon/>
              <span>{type.title}</span>
            </div>
          ))}
        </div>
      </div>


    </div>
  );
};

export default FormContainer;
