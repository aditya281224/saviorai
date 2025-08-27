"use client"
import { Button } from '@/components/ui/button';
import { Phone, Video } from 'lucide-react'
import { useRouter } from "next/navigation";
import React from 'react'

const Options = () => {
  const router=useRouter();
  return (
    <div className='grid grid-cols-2 gap-5'>
      <div className='bg-accent rounded-lg p-5'>
        <Video className='p-3 rounded-lg h-12 w-12'/>
        <Button onClick={()=>router.push('/mock-interview/mockInterview/create-interview')} className='font-bold'>Create New Interview</Button>
      </div>
      <div className='bg-accent rounded-lg p-5'>
        <Phone className='p-3 rounded-lg h-12 w-12'/>
        <h2 className='font-bold'>Create Phone Screening</h2>
      </div>
      
    </div>
  )
}

export default Options
