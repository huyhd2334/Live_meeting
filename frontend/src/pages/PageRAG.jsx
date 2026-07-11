import React, { useEffect, useState } from "react"
import { useParams, useLocation } from "react-router-dom"
import MainNavigator from "@/components/cpMainNavigator/MainNavigator"
import SideBarRAG from "@/components/cpRAG/SideBarRAG.jsx"
import ChatSiteRAG from "@/components/cpRAG/ChatSiteRAG.jsx"
import { toast } from "sonner"
import { useChat } from "@/hooks/useChat.js"

const PageRAG = () => {
  console.log("PageRAG render")
  const { workspace_id, project_id } = useParams()
  const { fetchConversations } = useChat()
  const [conversations, setConversations] = useState([])

  const location = useLocation()
  const attachments = location.state?.attachments || []
 
  const [selectedFiles, setSelectedFiles] = useState([])
  const [selectedConversation, setSelectedConversation] = useState(null)

  useEffect(() => {
    console.log("MOUNT OK:", { project_id, workspace_id })
    if (workspace_id && project_id) {
      toast.info(`Workspace: ${workspace_id}, Project: ${project_id}`)
    }
  }, [workspace_id, project_id])

  useEffect(() => {
    const handleFetchConversations = async () => {
      if (!workspace_id) return
      try {
        const res = await fetchConversations({ workspace_id })
        setConversations(res || [])
        console.log("Conversations: ", res)
      } catch (error) {
        console.error("Failed to fetch conversations:", error)
      }
    }
    handleFetchConversations()
  }, [workspace_id])

  return (
    // Sử dụng flex-col và h-screen cho khung ngoài cùng để cố định toàn màn hình
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-50">
      {/* Thanh điều hướng tổng của ứng dụng (Cố định ở trên) */}
      <div className="flex-shrink-0">
        <MainNavigator />
      </div>
      
      {/* Khung làm việc chính chia đôi Sidebar và Chat Box */}
      <div className="flex flex-row flex-1 min-h-0 w-full">
        <SideBarRAG
          project_id={project_id}
          workspace_id={workspace_id}
          attachments={attachments}
          selectedFiles={selectedFiles}
          setSelectedFiles={setSelectedFiles}
          setSelectedConversation={setSelectedConversation}
          selectedConversation={selectedConversation} 
          conversations={conversations}
        />
        
        <ChatSiteRAG 
          selectedFiles={selectedFiles} 
          selectedConversation={selectedConversation} 
          workspace_id={workspace_id}
          setSelectedConversation={setSelectedConversation}
          setConversations={setConversations}
        />
      </div>
    </div>
  )
}

export default PageRAG