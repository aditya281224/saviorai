import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Brain, Trophy } from 'lucide-react'
import React from 'react'

const StatsInterview = () => {
  return (
    <div className='grid gap-4 md:grid-cols-3'>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className="text-sm font-medium">
            Average Score
          </CardTitle>
          <Trophy className="h-4 w-4 text-muted-foreground"/>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            Average
          </div>
          <p className="text-xs text-muted-foreground">
            Across all assessments
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className="text-sm font-medium">
            Questions Practiced

          </CardTitle>
          <Brain className="h-4 w-4 text-muted-foreground"/>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            Total Questions
          </div>
          <p className="text-xs text-muted-foreground">
            Abx
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className="text-sm font-medium">
            Average Score
          </CardTitle>
          <Trophy className="h-4 w-4 text-muted-foreground"/>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            Average
          </div>
          <p className="text-xs text-muted-foreground">
            Across all assessments
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default StatsInterview
