import React, { useCallback, useState } from 'react'
import styles from './mainNavigator.module.css'
import { Plus, Search, Zap } from 'lucide-react'
import { toast } from 'sonner'
const MainNavigator = () => {
   const [searchContent, setSearchContent] = useState("")
   const handelSearch = () => {
         toast.info(searchContent)
   }
   return (
    <div className={`${styles.mainNavigator}`}>
      <div className='flex flex-row space-x-12 justify-center items-center'>
       <div className={`${styles.logo}`}>
          <Zap className='w-10 h-10'/> <a>TECHFLOW</a>
       </div>
       <div className={`${styles.search}`}>
          <Search /> 
          <input type='text' placeholder='project name' className='border-none outline-none focus:outline-none focus:ring-0'
                 value={searchContent} 
                 onChange={(e) => setSearchContent(e.target.value)}
                 onKeyDown={(e) => {
                  if(e.key == "Enter"){
                     handelSearch()
                  }
                 }}/>
       </div> 
    </div>
    </div>
  )
}

export default MainNavigator
