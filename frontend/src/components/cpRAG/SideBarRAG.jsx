import React, { useRef } from "react"
import styles from '@/components/cpRAG/rag.module.css'
import { BotMessageSquare, ClipboardList, FolderPlus, History, FileText } from 'lucide-react'
import { useNLP } from "@/hooks/useNLP"

const SideBarRAG = ({ 
  workspace_id, 
  project_id, 
  attachments = [], 
  selectedFiles = [], 
  setSelectedFiles, 
  setSelectedConversation, 
  selectedConversation, 
  conversations = [] 
}) => {
  const fileInputRef = useRef(null)
  const { uploadAttachment } = useNLP()

  const handleAddAttach = () => {
    fileInputRef.current.click()
  }

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    const formData = new FormData()
    formData.append("file", file)
    formData.append("project_id", project_id)
    formData.append("workspace_id", workspace_id)

    await uploadAttachment({ formData })
    e.target.value = ""
  }

  const handleSelectFile = (attachment_id) => {
    setSelectedFiles((prev) =>
      prev.includes(attachment_id)
        ? prev.filter(id => id !== attachment_id)
        : [...prev, attachment_id]
    )
  }

  return (
    <div className={styles.sideBar}>
      <div className={styles.sideBarOptionContainer}>
        
        {/* ATTACHMENTS SECTION */}
        <div className="flex flex-col gap-1.5">
          <button 
            type="button" 
            className={styles.sideBarOption} 
            onClick={handleAddAttach}
          >
            <FolderPlus size={18} />
            <span className="font-semibold text-slate-700 cursor-pointer">Attachments +</span>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </button>
          
          {/* Sub-list File */}
          <div className="flex flex-col gap-1 max-h-[180px] overflow-y-auto pl-7 pr-1">
            {attachments.length > 0 ? (
              attachments.map((attachment) => {
                const isChecked = selectedFiles.includes(attachment.attachment_id)
                return (
                  <label 
                    key={attachment.attachment_id} 
                    className={`flex items-center gap-2 p-1.5 rounded-lg border transition-all cursor-pointer select-none text-xs ${
                      isChecked 
                        ? "bg-indigo-50/60 border-indigo-100 text-indigo-700 font-medium" 
                        : "bg-transparent border-transparent text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <input 
                      type="checkbox" 
                      className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 h-3.5 w-3.5 cursor-pointer" 
                      checked={isChecked}
                      onChange={() => handleSelectFile(attachment.attachment_id)}
                    />
                    <FileText size={13} className={isChecked ? "text-indigo-500" : "text-slate-400"} />
                    <span className="truncate flex-1" title={attachment.file_name}>
                      {attachment.file_name}
                    </span>
                  </label>
                )
              })
            ) : (
              <span className="text-[11px] text-slate-400 italic pl-1 py-1">No files attached yet</span>
            )}
          </div>
        </div>

        {/* TASKS ROUTE/ACTION */}
        <div className={styles.sideBarOption}>
          <ClipboardList size={18} />
          <span className="font-semibold text-slate-700">Project Tasks</span>
        </div>

        {/* CHAT HISTORY SECTION */}
        <div className="flex flex-col flex-1 min-h-0 mt-2">
          <div className={`${styles.sideBarOption} cursor-default hover:bg-transparent`}>
            <History size={18} />
            <span className="font-semibold text-slate-700">Chat History</span>
          </div>
          
          <div className="flex flex-col gap-1 overflow-y-auto flex-1 pr-1 mt-1 pl-2">
            {conversations.length > 0 ? (
              conversations.map((c) => {
                const isActive = selectedConversation === c.conversation_id
                return (
                  <button
                    type="button"
                    key={c.conversation_id}
                    className={`${isActive ? "bg-blue-500 text-white font-medium shadow-2xs pl-5 p-1 rounded-2xl" : "text-slate-600 pl-5 p-1 rounded-2xl hover:bg-slate-100"}`}
                    onClick={() => setSelectedConversation(c.conversation_id)}
                  >
                    <span className="truncate text-left block w-full">{c.title || "Untitled Chat"}</span>
                  </button>
                )
              })
            ) : (
              <span className="text-[11px] text-slate-400 italic pl-6 py-2">No history conversations</span>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}

export default SideBarRAG