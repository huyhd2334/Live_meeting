import api from '@/lib/axios'

export const getSubTaskService = async({workspace_id, project_id}) => {
      const result = await api.get(`subtask/get/${workspace_id}/${project_id}`)
      return result.data
}

export const createSubTaskService = async({workspace_id, task_id, title, status}) => {
      const result = await api.post(`subtask/create`, {workspace_id, task_id, title, status}, {withCredentials: true})
      return result.data
}