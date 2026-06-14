import React, { useEffect, useState } from 'react'
import styles from '../subSideBar.module.css'
import { useWorkSpace } from '@/hooks/useWorkSpace'
import CreateWSInterFace from './CreateWSInterFace.jsx'
import { Button } from '@/components/ui/button'
import { Plus, Trash2 } from 'lucide-react'
import AddMemberWSInterFace from './AddMemberWSInterFace'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'

const WorkSpace = ({userAccount}) => {
  const[content, setContent] = useState([])
  const {getUserWorkSpace, deleteWorkSpace, loading} = useWorkSpace()
  const[dataWorkSpace, setDataWorkSpace] = useState({})
  const[mode, setMode] = useState("view")
  const navigate = useNavigate()

  const fetchData = async () => {
    const data = await getUserWorkSpace()
    setContent(data || [])
  }

  useEffect(() => {
    fetchData()
  }, [mode])

  const handleDelete = async (workspace_id) => {
    await deleteWorkSpace(workspace_id)
    await fetchData() 
  }
  
  const handleWidgetClick = async (workspace_id, workspace_name) => {
      if(typeof workspace_id === "number"){
         navigate(`/homepage/project/${workspace_id}`, {state: {workspace_name}})
      }else{toast.error(`Cannot access this work space ${workspace_id}`)}
  }

  let contentUI

  if(mode === "create"){
    contentUI =  <CreateWSInterFace setMode={setMode}/>
  }else if(mode === "addMember"){
    contentUI = <AddMemberWSInterFace setMode={setMode} dataWorkSpace={dataWorkSpace}/>
  }
  return (
    <div className='flex flex-col space-y-2'>
       <div className={styles.headerContainer}>
           <div className='space-x-4'>
              <span className={styles.headerTitle}>Your Work Spaces</span>
              <div className={styles.button} onClick={() => setMode(pre => pre === "create" ? "view" : "create")}> 
                {mode === "create" ? "Cancel Process" : "+ New WorkSpace"} 
              </div>
           </div>
           <span className={styles.headerText}> OverView </span>
       </div>

       <div className={styles.mainContainer}>
        {mode === "create" || mode === "addMember" ? (
          contentUI
        ):(
          (loading?(
            <p>Loading...</p>
            ):(content.length != 0 ? (
              content.map((ws, idx) => (
                <div key={ws.workspace_id} className={styles.widget} onClick={() => {handleWidgetClick(ws.workspace_id, ws.workspace_name)}}>
                  { ws.role === "admin" ?
                  (
                    <div className='flex flex-row justify-between items-center w-full'>
                      <h1 className={`text-2xl font-semibold`}> WSpace {idx+1} </h1>
                      <div className='flex flex-row space-x-2'>
                        <Button className='bg-white text-black w-6 h-7' onClick={(e) => {e.stopPropagation(), handleDelete(ws.workspace_id)}}> <Trash2 /> </Button>
                        <Button className='  bg-white text-black  w-6 h-7' onClick={(e) => {e.stopPropagation(), setMode("addMember"), setDataWorkSpace({"workspace_id": ws.workspace_id, "workspace_name": ws.workspace_name})}}> 
                          <Plus /> 
                        </Button>
                      </div>
                    </div>
                  ): (
                    <h1 className={`text-2xl font-semibold ${styles.highlightTitle}`}> WSpace {idx+1} </h1>)}
                    <span className={`${styles.widgetTitle} ${styles.highlight}`}> Name: {ws.workspace_name} </span>
                    <span className={`${styles.highlight}`}> ID {ws.workspace_id} </span>
                    <span className={`${styles.highlight}`}> Role {ws.role} </span>
                </div>
              ))
            ) : (
            <p>No workspace</p>
          )))
        )}
       </div>
    </div>
  )
}

export default WorkSpace
