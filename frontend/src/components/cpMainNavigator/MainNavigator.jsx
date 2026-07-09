import React, { useState } from 'react'
import styles from './mainNavigator.module.css'
import { Search, Zap } from 'lucide-react'
import { toast } from 'sonner'
import { useNavigate } from 'react-router'

const MainNavigator = ({ page }) => {
   const navigate = useNavigate() 
   const [searchContent, setSearchContent] = useState("")
   
   const handleSearch = () => {
      toast.info(searchContent)
   }

   const handleBack = () => {
      navigate("/homepage")
   }

   return (
    <div className={`${styles.mainNavigator}`}>
      <div className='flex flex-row space-x-12 justify-center items-center'>
        <div className={`${styles.logo} flex items-center gap-2 cursor-pointer`} onClick={handleBack}>
          <Zap className='w-8 h-8 text-indigo-500 fill-indigo-500'/> 
          <span className="font-bold tracking-wider text-slate-800">TECHFLOW</span>
        </div>
        
        <div className={`${styles.search} flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200`} style={{ display: page === "login" ? "none" : "flex" }}>
          <Search className="w-4 h-4 text-slate-400" /> 
          <input 
            type='text' 
            placeholder='Search project...' 
            className="border-none outline-none focus:outline-none focus:ring-0 bg-transparent text-sm w-48"
            value={searchContent} 
            onChange={(e) => setSearchContent(e.target.value)}
            onKeyDown={(e) => {
              if(e.key === "Enter"){
                 handleSearch()
              }
            }}
          />
        </div>
      </div>

      <button className={`${styles.button} text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors`} onClick={handleBack}>
        Back to HomePage
      </button>

    </div>
  )
}

export default MainNavigator