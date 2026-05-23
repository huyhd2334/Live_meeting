import styles from './projectUI.module.css'
import { CircleUser, LogOut} from 'lucide-react'
import { useAuthContext } from '@/context/AuthContext'
import { Button } from '@/components/ui/button'
import { useProject } from '@/hooks/useProject.js'
import { useState } from 'react'

const SideBarProject = ({id}) => {
  const str = localStorage.getItem("userAccount") || JSON.stringify({name: "guest"})
  const userAccount = JSON.parse(str)

  const {logoutContex} = useAuthContext()
  
  const [project_name, setProjectName] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState("active")
  
  const [create, setCreate] = useState("none")
  const [back, setBack] = useState(false)

  // workspace_id, project_name, description, status
  const { createProject } = useProject()
  
  const handleCreateProject = async() => {
     try {
        const res = await createProject({workspace_id:id, project_name, description, status})
     } catch (error) {
        console.log("Error when create new project")
     }
  }
  return (
    <div className={`${styles.SideBar}`}>
      <div className='flex space-x-2 items-center'>
        <h1 className={styles.title}>Workspace ID: {id}</h1>
        {back?(
          <Button className="bg-black " onClick={() => {setCreate("none"), setBack(pre => !pre)}}>Return !</Button>
        ):(
        <Button className="bg-black" onClick={() => {setCreate("project"), setBack(pre => !pre)}}>+ Project</Button>)}
      </div>
      
      <div>
        {create==="none"?(null):(
          <div>
            {create==="project"?(
            <div className={styles.createContainer}>
            <span>ProjectName</span>
            <input className='border-2 rounded-sm p-1 ' 
                   placeholder="Enter project's name" 
                   value={project_name}
                   onChange={(e) => setProjectName(e.target.value)}/> 
            <span>Description</span>
            <input className='border-2 rounded-sm p-1 ' 
                   placeholder="Enter project's Description" 
                   value={description}
                   onChange={(e) => setDescription(e.target.value)}/> 
            
            {/* 'active', 'completed', 'archived' */}
            <label>Status: </label> 
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="active">active</option>
              <option value="completed">completed</option>
              <option value="archived">archived</option>
            </select>

            <Button className="bg-black" onClick={() => {handleCreateProject()}}>Comfirm</Button>

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