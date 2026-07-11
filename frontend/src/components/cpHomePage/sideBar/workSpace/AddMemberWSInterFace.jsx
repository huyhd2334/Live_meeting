import React, { useRef, useState } from 'react'
import styles from '../subSideBar.module.css'
import { useWorkSpace } from '@/hooks/useWorkSpace.js'
import { toast } from 'sonner'

const AddMemberWSInterFace = ({setMode, dataWorkSpace}) => {
    const [id, setId] = useState("")
    const [role, setRole] = useState("")

    const {addMemberWorkSpace, loading} = useWorkSpace()

  const handleAddMember = async () => {
    if(id === ""){
      toast.info("ID is empty")
      return 
    }else{
      await addMemberWorkSpace({workspace_id: dataWorkSpace.workspace_id, member_id: id, role})}
  }
  return (
    <div className='flex flex-col space-y-6 w-1/2'>
       <h1 className={`text-4xl font-semibold text-blue-500`}> Add New Member </h1>
       <h1 className={`text-2xl font-semibold `}> WorkSpace: {dataWorkSpace.workspace_name} </h1>
       <input placeholder='Enter Member ID '
                 value={id}
                 onChange={(e) => setId(e.target.value)}
                 className={styles.input}>
       </input>
       <input placeholder='Set Member role '
                 value={role}
                 onChange={(e) => setRole(e.target.value)}
                 className={styles.input}>
       </input>
       <div className='flex flex-row gap-4'>
        <div className={`${styles.buttonCreate}`} onClick={() => handleAddMember()}> Add +</div>
        <div className={`${styles.buttonCancel} bg-red-400`} onClick={() => setMode("view")}> Go Back </div>
       </div>
    </div>
  )
}

export default AddMemberWSInterFace
