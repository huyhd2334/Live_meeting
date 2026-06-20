import React, { useEffect, useRef, useState } from "react";
import styles from '@/components/cpRAG/rag.module.css'
import { BotMessageSquare, ClipboardList, Folder, History } from 'lucide-react'
import { useNLP } from "@/hooks/useNLP";
import { Button } from "../ui/button";

const SideBarRAG = ({workspace_id, project_id, attachments, setSelectedFiles, setSelectedConversation, conversations}) => {
    const fileInputRef = useRef(null);
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
            <div className="flex flex-col max-h-3/5 justify-start pl-10 overflow-y-auto">
                {attachments?.map((attachment) => (
                    <div key={attachment.attachment_id} className="flex flex-row space-x-2">
                        <input type="checkbox" className="cursor-pointer" 
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

            {/* HISTORY */}
            <div className="flex flex-col space-y-5 max-h-50 ">
                <div className={styles.sideBarOption}>
                    <History />
                    <span>
                        Chat History
                    </span>
                </div>
                
                <div className="flex flex-col space-y-3 overflow-y-auto">
                {conversations?.map((c) => (
                    <Button
                    key={c.conversation_id}
                    onClick={() => {console.log("clicked", c.conversation_id); setSelectedConversation(c.conversation_id)}}
                    >
                    {c.title}
                    </Button>
                ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default SideBarRAG
