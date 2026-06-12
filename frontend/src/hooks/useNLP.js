import { toast } from "sonner"
import { useMutation } from "@tanstack/react-query" 
import { suggestTaskService, uploadAttachmentService } from "@/service/nlpService.js"

export const useNLP = () => {    
    const suggestTask = async({workspace_id, description}) => {
      try {
        const data = await suggestTaskService({workspace_id, description})
        if(data.success){
          toast.success("Got suggest tasks")
          return data
        }else{
          toast.error("Get suggest task Error")
          return data.success   
        }
      } catch (error) {
        toast.error("error when get suggest task")
      }
    }
    
    const uploadAttachment = async({formData}) => {
      try {
        const data = await uploadAttachmentService({formData})
        if(data.success){
          toast.success("uploaded attachment")
          return data
        }else{
          toast.error("upload attachment error")
          return data.success
        }
      } catch (error) {
        toast.error("error when upload attachment")
      }
    }
    return {suggestTask, uploadAttachment}
}
