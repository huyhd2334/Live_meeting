import React from 'react'
import MainAuth from '@/components/cpAuth/mainAuth.jsx'
import MainNavigator from '@/components/cpMainNavigator/MainNavigator.jsx'

export default function PageLoginSignup() {
  return (
    <div className='bg-gray-100'>
      <MainNavigator page={"login"}/>
      <div className="flex justify-center w-full min-h-screen mt-18">
        <div className="w-full max-w-3xl">
          <MainAuth />
        </div>
      </div>
    </div>
  );
}
