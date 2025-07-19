"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { entrySchema } from "@/app/lib/schema";


const EntryForm = ({type,entries,onChange}) => {


  const {
    register,
    handleSubmit: handleValidation,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(entrySchema),
    defaultValues: {
      title: "",
      organization: "",
      startDate: "",
      endDate: "",
      description: "",
      current: false,
    },
  });

   const current = watch("current");

  return (
    <div>
      
        

    </div>
  )
}

export default EntryForm
