import api from '@/lib/axios'
import { toast } from 'sonner'

export const getTaskService = async(project_id) => {
      const result = await api.get(`project/task/${project_id}`)
      return result.data
}

export const getTaskDashBoardService = async() => {
      const result = await api.get(`task/get`, { withCredentials: true})
      console.log("Tasks: ",  result.data)
      return result.data
}

export const createTaskService = async({workspace_id, project_id, title, description, status, priority, deadline, assigned_to}) => {
      if(!workspace_id || !project_id || !title || !description || !status || !priority){
         toast.info("Please fill all imformations");
         return;
      };
      const result = await api.post(`task/create`, {workspace_id, project_id, title, description, status, priority, deadline, assigned_to}, {withCredentials: true})
      return result.data
}

export const deleteTaskService = async(task_id) => {
    const id = task_id
    const result = await api.delete(`task/delete/${id}`, { withCredentials: true})
    return result.data
}