import React, { useEffect, useRef, useState } from "react";
import styles from '@/components/cpRAG/rag.module.css'
import { BotMessageSquare, ClipboardList, Folder, History } from 'lucide-react'
import api from "@/lib/axios";
import { toast } from "sonner";
import { useNLP } from "@/hooks/useNLP";

const SideBarRAG = ({workspace_id, project_id, attachments}) => {
    const fileInputRef = useRef(null);
    const [selectedFiles, setSelectedFiles] = useState([])
    const {uploadAttachment} = useNLP()

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
        
        await uploadAttachment({formData})
    }

    const handleSelectFile = async(attachment_id) => {
          setSelectedFiles((pre) =>
            pre.includes(attachment_id)
            ? pre.filter(id => id !== attachment_id)
            : [...pre, attachment_id]
          )
    }

    useEffect(() => {
        console.log("selectedFiles:", selectedFiles)
    }, [selectedFiles])
    
  return (
    <div className={styles.sideBar}>
        <div className={styles.header}>
           RAG Retrive <BotMessageSquare size={40} />
        </div>
        <div className={styles.sideBarOptionContainer}>
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
            <div className="flex flex-col max-h-2/3 justify-start pl-13 overflow-y-auto">
                {attachments?.map((attachment) => (
                    <div key={attachment.attachment_id} className="flex flex-row space-x-2">
                        <input type="checkbox" className="cursor-pointer" 
                               checked={selectedFiles.includes(attachment.attachment_id)}
                               onChange={() => handleSelectFile(attachment.attachment_id)}/>
                        <span className="max-w-[200px] truncate block cursor-pointer" 
                            title={attachment.file_name}>
                            {attachment.file_name}
                        </span>                 
                    </div>
                ))}
            </div>
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
    </div>
  )
}

export default SideBarRAG
