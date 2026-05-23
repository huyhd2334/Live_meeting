import api from '@/lib/axios'

export const getTaskService = async(project_id) => {
      const result = await api.get(`project/task/${project_id}`)
      return result.data
}
