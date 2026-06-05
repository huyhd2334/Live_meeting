import api from "@/lib/axios"

export const suggestTaskService = async({workspace_id, description}) => {
      const result = await api.post(`nlp/suggest-task`, {workspace_id, description}, {withCredentials: true})
      console.log(result.data)
      return result.data
}