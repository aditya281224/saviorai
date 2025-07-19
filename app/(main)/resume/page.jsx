import { getResume } from '@/actions/resume'
import React from 'react'
import ResumeBuilder from './_components/resume-builder';

const ResumePage = async() => {
  const resume = await getResume();
  return (
    <div className='mx-auto py-6'>
      <ResumeBuilder inititalContent={resume?.content}/>
    </div>
  )
}

export default ResumePage
