import React, { useState } from 'react'
import styles from './projectUI.module.css'
import { CircleUser, LogOut } from 'lucide-react'
import { useAuthContext } from '@/context/AuthContext'
import { Button } from '@/components/ui/button'
import { useProject } from '@/hooks/useProject.js'

const SideBarProject = ({ id, workspace_name }) => {
  const str = localStorage.getItem("userAccount") || JSON.stringify({ name: "guest" })
  const userAccount = JSON.parse(str)

  const { logoutContex } = useAuthContext()
  
  const [project_name, setProjectName] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState("active")
  const [create, setCreate] = useState("project")

  const { createProject } = useProject()
  
  const handleCreateProject = () => {
    if (!project_name.trim()) return
    createProject.mutate({ workspace_id: id, project_name, description, status }) 
  }
  
  return (
    <div className='flex flex-col border border-t-0 h-full'>
      {/* Workspace Branding */}
      <div className='w-full flex flex-col items-center text-center px-4 mt-2'>
        <h1 className={styles.title}>Workspace #{id}</h1>
        <span className="text-sm font-medium text-slate-400 mt-1 px-3 py-1 bg-slate-50 rounded-full max-w-full truncate">
          {workspace_name}
        </span>
      </div>

      {/* Form Container */}
      <div className="w-full px-4 flex-1 overflow-y-auto mt-4">
        {create !== "none" && (
          <div className="border border-slate-100 bg-slate-50/50 p-4 rounded-xl shadow-sm">
            {create === "project" ? (
              <div className={styles.createContainer}>
                <h3 className="text-sm text-xl text-black">New Project</h3>
                
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-semibold text-slate-500">Project Name</span>
                  <input 
                    className={styles.taskInput} 
                    placeholder="Enter project's name" 
                    value={project_name}
                    onChange={(e) => setProjectName(e.target.value)}
                  /> 
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-xs font-semibold text-slate-500">Description</span>
                  <textarea 
                    className={`${styles.taskInput} min-h-[60px] resize-none`}
                    placeholder="Enter description" 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  /> 
                </div>
                
                <div className='flex items-center justify-between bg-white p-2.5 rounded-lg border border-slate-200/60 text-sm'>
                  <span className="font-medium text-slate-600">Status</span> 
                  <select
                    className="bg-transparent font-semibold text-indigo-600 outline-none cursor-pointer"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
                
                <Button 
                  className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-sm" 
                  onClick={handleCreateProject}
                >
                  Confirm Project
                </Button>
              </div>
            ) : (
              <div className={styles.createContainer}>
                <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-1">New Task</h3>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-semibold text-slate-500">Task Name</span>
                  <input 
                    className={styles.taskInput} 
                    placeholder="Enter task's name" 
                    value={project_name}
                    onChange={(e) => setProjectName(e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className={styles.profileContainer}>
        <div className='flex items-center gap-3 min-w-0 flex-1'>
          <CircleUser size={38} className="text-slate-400 flex-shrink-0" />
          <div className='flex flex-col min-w-0'>
            <span className='text-sm font-semibold text-slate-800 truncate'>{userAccount.user_name}</span>
            <span className='text-xs text-slate-500 truncate'>@{userAccount.user_account}</span>
          </div>
        </div>
        <button 
          type="button"
          className={styles.buttonLogOut} 
          onClick={() => logoutContex()}
          title="Log out"
        >
          <LogOut size={16} />
        </button>
      </div>
    </div>
  )
}

export default SideBarProject