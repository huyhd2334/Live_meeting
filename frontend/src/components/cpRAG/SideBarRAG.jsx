import React, { useRef } from "react";
import styles from '@/components/cpRAG/rag.module.css'
import { BotMessageSquare, ClipboardList, Folder, History } from 'lucide-react'
import api from "@/lib/axios";
import { toast } from "sonner";

const SideBarRAG = ({workspace_id, project_id, attachments}) => {
    const fileInputRef = useRef(null);

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

        console.log(file)

        console.log("FORMDATA DEBUG:")
        for (let pair of formData.entries()) {
        console.log(pair[0], pair[1])
        }

        await api.post(`/attachment/upload/`, formData)
    }
  return (
    <div className={styles.sideBar}>
        <div className={styles.header}>
           RAG Retrive <BotMessageSquare size={40} />
        </div>
        <div className={styles.sideBarOption}>
            <Folder />
            <span onClick={() => {handleAddAttach()}}>
                Attachments +
            </span>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}/>
        </div>
        {attachments?.map((attachment) => (
            <span key={attachment.attachment_id}>{attachment.file_name}</span>
        ))}
        <div className={styles.sideBarOption}>
            <ClipboardList />
            <span>
                Tasks
            </span>
        </div>
        <div className={styles.sideBarOption}>
            <History />
            <span>
                Chat History
            </span>
        </div>
    </div>
  )
}

export default SideBarRAG
