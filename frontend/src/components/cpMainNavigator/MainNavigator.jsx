import React, { useCallback, useState } from 'react'
import styles from './mainNavigator.module.css'
import {Search, Zap } from 'lucide-react'
import { toast } from 'sonner'
import { useNavigate } from 'react-router'

const MainNavigator = ({page}) => {
   const navigator = useNavigate()
   const [searchContent, setSearchContent] = useState("")
   const handleSearch = () => {
         toast.info(searchContent)
   }

   const handleBack = () => {
      navigator("/homepage")
   }

   return (
    <div className={`${styles.mainNavigator}`}>
      <div className='flex flex-row space-x-12 justify-center items-center '>
       <div className={`${styles.logo}`}>
          <Zap className='w-10 h-10'/> <a>TECHFLOW</a>
       </div>
       <div className={`${styles.search}`} style={{display: page === "login" ? "none" : "flex"}}>
          <Search /> 
          <input type='text' placeholder='project name' className={`border-none outline-none focus:outline-none focus:ring-0 `}
                 value={searchContent} 
                 onChange={(e) => setSearchContent(e.target.value)}
                 onKeyDown={(e) => {
                  if(e.key == "Enter"){
                     handleSearch()
                  }
                 }}/>
       </div>
    </div>

    <div className={styles.button} onClick={() => handleBack()}>Back to HomePage</div>

    </div>
  )
}

export default MainNavigator
