import { profile } from '@/actions/user';
import React from 'react'
import TitlePage from './_components/title';
import createOption from './_components/create-options';

const mock = async () => {
  const userProfile= await profile();
  
  return (
    <div>
      <TitlePage userProfile={userProfile}/>
      <h2 className='my-3 font-bold text-2xl'>Dashboard</h2>
      <createOption/>
    </div>
  )
}

export default mock;
