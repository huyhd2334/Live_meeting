import { toast } from "sonner"
import { getTaskDashBoardService } from "@/service/taskService.js"
import { getProjectDashBoardService } from "@/service/projectService"

export const useDashBoard = () => {    
    const getTaskDashBoard = async() => {
      try {
        const data = await getTaskDashBoardService()
        if(data.success){
           toast.success("Got tasks")
           return data
        }else{
          return data.success   
        }
      } catch (error) {
        toast.error("Error when get task")
      }
    }
    
    const getProjectDashBoard = async() => {
      try {
        const data = await getProjectDashBoardService()
        if(data.success){
          return data
        }else{
          return data.success   
        }
      } catch (error) {
        toast.error("Error when get project")
      }
    }

    return {getTaskDashBoard, getProjectDashBoard}
}
