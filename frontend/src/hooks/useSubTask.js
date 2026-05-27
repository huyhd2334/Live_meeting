import { createSubTaskService, getSubTaskService } from "@/service/subTaskService.js"
import { useState } from "react"
import { toast } from "sonner"

export const useSubTask = () => {
    const[loadingSb, setLoadingSb] = useState(false)
    
    const fetchSubTask = async({workspace_id, project_id}) => {
      try {
        setLoadingSb(true)
        const data = await getSubTaskService({workspace_id, project_id})
        console.log(data)
        if(data.success){
          toast.success("Got SubTask")
          return data
        }else{
          toast.error("Get SubTask Error")
          return data.success   
        }
      } catch (error) {
        toast.error("error when get subTask")
        console.error(error)
      } finally {
        setLoadingSb(false)
      }
    }
    
    const createSubTask = async({workspace_id, task_id, title, status}) => {
       try {
        if(title === ""){
          toast.error("SubTask title is empty!") 
          return
        }
        const result = await createSubTaskService({workspace_id, task_id, title, status})
        console.log(result)
        if(result.success){
          toast.success(result.message)
          return result.subTask
        }else{
          toast.error("Error when create subtask")
          return
        }
       } catch (error) {
         console.error(error)
         return
       }finally{
        setLoadingSb(false)
       }
    }
    return {fetchSubTask, createSubTask, loadingSb}
}
