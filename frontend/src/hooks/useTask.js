import { createTaskService, getTaskService } from "@/service/taskService.js"
import { useState } from "react"
import { toast } from "sonner"

export const useTask = () => {
    const[loadingT, setLoadingT] = useState(false)
    
    const fetchTaskByProject = async(project_id) => {
      try {
        setLoadingT(true)
        const data = await getTaskService(project_id)
        console.log(data)
        if(data.success){
          toast.success("Got Task")
          return data
        }else{
          toast.error("Get task Error")
          return data.success   
        }
      } catch (error) {
        toast.error("error when get task")
        console.error(error)
      } finally {
        setLoadingT(false)
      }
    }

    const createTask = async({workspace_id, project_id, title, description, status, priority, deadline, assigned_to}) => {
      try {
        setLoadingT(true)
        if(title === ""){
          toast.error("Task title is empty")
          return 
        }
        console.log(workspace_id, project_id, title, description, status)
        const data = await createTaskService({workspace_id, project_id, title, description, status, priority, deadline, assigned_to})
        console.log(data)
        if(data.success){
          toast.success(data.message)
          return data
        }else{
          toast.error("create task Error")
          return data.success   
        }
      } catch (error) {
        toast.error("error when create task")
        console.error(error)
      } finally {
        setLoadingT(false)
      }
    }

    return {fetchTaskByProject, createTask, loadingT}
}
