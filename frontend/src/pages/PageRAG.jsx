import React from 'react'
import ChatSiteRAG from '@/components/cpRAG/ChatSiteRAG.jsx'
import SideBarRAG from '@/components/cpRAG/SideBarRAG.jsx'
import MainNavigator from '@/components/cpMainNavigator/MainNavigator.jsx'

const PageRAG = () => {
  return (
    <div>
        <MainNavigator/>
        <div className='flex flex-row'>
           <SideBarRAG/>
           <ChatSiteRAG/>
        </div>
    </div>
  )
}

export default PageRAG
