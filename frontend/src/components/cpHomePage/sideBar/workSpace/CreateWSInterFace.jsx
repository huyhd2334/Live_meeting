import React, { useRef, useState } from 'react'
import styles from '../subSideBar.module.css'
import { useWorkSpace } from '@/hooks/useWorkSpace.js'
import { toast } from 'sonner'

const CreateWSInterFace = ({setMode}) => {
    const [name, setName] = useState("")
    const [des, setDes] = useState("")
    const {createUserWorkSpace, loading} = useWorkSpace()

    const input2Ref = useRef()

    const handleEnter = (e) => {
    if (e.key === "Enter") {
        e.preventDefault()
        input2Ref.current.focus()
    }
  }

  const handleCreate = async () => {
    if(name === ""){
      toast.info("workspace's name is empty")
      return 
    }else{
      await createUserWorkSpace({workspace_name: name, description:des})}
      setMode("view")
  }
  return (
    <div className='flex flex-col space-y-6 w-1/2'>
       <h1 className={`text-2xl font-semibold ${styles.highlightTitle} `}> Create New WorkSpace </h1>
       <input placeholder='Enter Work Space Name'
                 value={name}
                 onKeyDown={handleEnter}
                 onChange={(e) => setName(e.target.value)}
                 className={styles.input}>
       </input>
       <input  ref={input2Ref}
                  placeholder='Enter Description'
                  value={des}
                  onChange={(e)=> setDes(e.target.value)}
                  className={styles.input}>
       </input>
       <div className={`${styles.buttonCreate}`} onClick={() => handleCreate()}> Create +</div>
    </div>
  )
}

export default CreateWSInterFace
