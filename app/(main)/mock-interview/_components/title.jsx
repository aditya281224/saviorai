import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

const TitlePage = ({userProfile}) => {
  return (
    <div className='flex justify-between items-center'>
      <div className='p-5 rounded-xl bg-accent'>
        <h1 className='text-lg font-bold'>Hello {userProfile.name}</h1>
        <h2>AI-driver interview, get job ready</h2>
      </div>


    </div>
  )
}

export default TitlePage
