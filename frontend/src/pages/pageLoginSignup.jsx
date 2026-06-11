import React from 'react'
import MainAuth from '@/components/cpAuth/mainAuth.jsx'

const PageLoginSignup = () => {
  return (
    <div className='flex flex-col justify-center items-center min-h-screen'>
      <div className='shadow-xl shadow-gray-400/50 rounded-4xl w-150 h-90 items-center'>
          <MainAuth/>
      </div>
    </div>
  )
}

export default PageLoginSignup
