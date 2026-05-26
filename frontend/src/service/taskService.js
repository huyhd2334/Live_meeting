import api from '@/lib/axios'

export const getTaskService = async(project_id) => {
      const result = await api.get(`project/task/${project_id}`)
      return result.data
}

export const createTaskService = async({workspace_id, project_id, title, description, status, priority, deadline, assigned_to}) => {
      const result = await api.post(`task/create`, {workspace_id, project_id, title, description, status, priority, deadline, assigned_to}, {withCredentials: true})
      return result.data
}