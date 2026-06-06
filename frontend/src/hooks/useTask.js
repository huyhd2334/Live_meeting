import { createTaskService, deleteTaskService, getTaskService } from "@/service/taskService.js"
import { useState } from "react"
import { toast } from "sonner"
import { useMutation } from "@tanstack/react-query" 

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

    const createTask = useMutation({
      mutationFn: createTaskService,

      onSuccess: (data) => {
        toast.success(data.message)
        console.log("Create success", data);
      },

      onError: (error) => {
        toast.error(data.message)
        console.log("Create failed", error);
      }
    });

    const deleteTask = async(task_id) => {
        try{
          const data = await deleteTaskService(task_id)
  
          if(data.success){
            console.log("Deleted task", data.task)
            toast.success("Deleted task")
            return data.task
          }else{
            toast.error("Delete task error")
            return []
          }
        } catch (error) {
          toast.error("error when delete task")
          console.error(error)
    }}

    return {fetchTaskByProject, createTask, deleteTask, loadingT}
}
