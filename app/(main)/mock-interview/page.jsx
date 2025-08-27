import { profile } from '@/actions/user';
import React from 'react'

import PerformanceInterview from './_components/performance';
import LatestInterviewList from './_components/latest-interviews';
import StatsInterview from './_components/stats-interview';



const mock = async () => {
  
  
  return (
    <div>
      <StatsInterview/>
      <PerformanceInterview/>
      <LatestInterviewList/>
    </div>
  )
}

export default mock;
