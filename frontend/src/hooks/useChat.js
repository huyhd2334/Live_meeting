import { createConversationService, getConversationsService, getMessagesService, sendMessageService } from "@/service/chatService.js"
import { toast } from "sonner"


export const useChat = () => {    
    const sendMessage = async({query, documents, workspace_id, conversation_id}) => {
      try {
        const data = await sendMessageService({query, documents, workspace_id, conversation_id})
        if(data.success){
          return data
        }else{
          return data.success   
        }
      } catch (error) {
        toast.error("error when send and rec message")
      }
    }

    const fetchMessages = async({workspace_id, conversation_id}) => {
      try {
        const data = await getMessagesService({workspace_id, conversation_id})
        if(data.success){
          return data.messages
        }else{
          return data.success   
        }
      } catch (error) {
        toast.error(`error when fetch conversation ${conversation_id} messages`)
      }
    }

    const fetchConversations = async({workspace_id}) => {
      try {
        const data = await getConversationsService({workspace_id})
        if(data.success){
          return data.conversations
        }else{
          return data.success   
        }
      } catch (error) {
        toast.error(`error when fetch conversation history`)
      }
    }

    const createConversation = async({workspace_id, title}) => {
      try {
        toast.info("creating conversation")
        const data = await createConversationService({workspace_id, title})

        if(data.success){
          return data.newConversation
        }else{
          return data.success   
        }
      } catch (error) {
        toast.error(`error when create conversation`)
      }
    }

    return {sendMessage, fetchConversations, fetchMessages, createConversation}
}
