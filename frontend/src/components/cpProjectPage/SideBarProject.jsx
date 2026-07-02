import styles from './projectUI.module.css'
import { CircleUser, LogOut} from 'lucide-react'
import { useAuthContext } from '@/context/AuthContext'
import { Button } from '@/components/ui/button'
import { useProject } from '@/hooks/useProject.js'
import { useState } from 'react'

const SideBarProject = ({id, workspace_name}) => {

  const str = localStorage.getItem("userAccount") || JSON.stringify({name: "guest"})
  const userAccount = JSON.parse(str)

  const {logoutContex} = useAuthContext()
  
  const [project_name, setProjectName] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState("active")
  
  const [create, setCreate] = useState("project")

  // workspace_id, project_name, description, status
  const { createProject } = useProject()
  
  console.log("workspace_name", workspace_name)
  
  const handleCreateProject = () => {
    createProject.mutate({workspace_id:id, project_name, description, status}) 
  }
  
  return (
    <div className={`${styles.sideBar}`}>
      <div className='flex flex-col space-x-2 items-center'>
        <h1 className={styles.title}>WorkspaceID: {id}</h1>
      </div>
      <label> - {workspace_name} - </label>
      <div className='border border-gray-300 p-4 rounded-lg'>
        {create==="none"?(null):(
          <div>
            {create==="project"?(
            <div className={styles.createContainer}>
            <span>ProjectName</span>
            <input className='border-2 rounded-sm p-1' 
                   placeholder="Enter project's name" 
                   value={project_name}
                   onChange={(e) => setProjectName(e.target.value)}/> 
            <span>Description</span>
            <input className='border-2 rounded-sm p-1 ' 
                   placeholder="Enter project's Description" 
                   value={description}
                   onChange={(e) => setDescription(e.target.value)}/> 
            
            {/* 'active', 'completed', 'archived' */}
            <div className='flex flex-row space-x-4'>
              <label> Status: </label> 
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="active">active</option>
                <option value="completed">completed</option>
                <option value="archived">archived</option>
              </select>
            </div>
            
            <Button className="text-[#2563EB] bg-white " onClick={() => {handleCreateProject()}}>Comfirm</Button>

            </div>
          ):(
            <div>
            <span>TaskName</span>
            <input className='border-2 rounded-sm p-1 ' 
                   placeholder="Enter project's name" 
                   value={project_name}
                   onChange={(e) => setProjectName(e.target.value)}/>
          </div>
          )}
        </div>
        )} 
      </div>
      
    <div className={`${styles.profileContainer}` } >
       <div>
          <CircleUser size={36} />
       </div>
       <div className='flex flex-col'>
            <a className='text-lg font-semibold'>{userAccount.user_name}</a>
            <a className='text-sm'>Account: {userAccount.user_account}</a>
       </div>
       <div className={styles.buttonLogOut} onClick={()=>logoutContex()}>
          <LogOut />
       </div>
    </div>
    </div>
  )
}

export default SideBarProject