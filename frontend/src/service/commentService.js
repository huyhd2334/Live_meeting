import api from "@/lib/axios"

export const createCommentService = async({workspace_id, task_id, content}) => {
      const result = await api.post(`taskcomment/create`, {workspace_id, task_id, content}, {withCredentials: true})
      return result.data
}

