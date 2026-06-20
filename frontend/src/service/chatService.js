import api from "@/lib/axios"

export const getMessagesService = async({workspace_id, conversation_id}) => {
      const result = await api.get(`/chat/messages/${conversation_id}/${workspace_id}`, {withCredentials: true})
      console.log(result.data)
      return result.data
}

export const sendMessageService = async({query, documents, workspace_id, conversation_id}) => {
      const result = await api.post(`/chat/send-message/${conversation_id}/${workspace_id}`,{query, documents}, {withCredentials: true})
      console.log(result.data)
      return result.data
}

export const getConversationsService = async({workspace_id}) => {
      const result = await api.get(`/chat/conversations/${workspace_id}`, {withCredentials: true})
      console.log(result.data)
      return result.data
}

export const createConversationService = async({workspace_id, title}) => {
      const result = await api.post(`/chat/conversations/create/${workspace_id}`, {title},{withCredentials: true})
      console.log(result.data)
      return result.data
}