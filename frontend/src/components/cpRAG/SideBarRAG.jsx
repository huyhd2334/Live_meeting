import React from 'react'
import styles from '@/components/cpRAG/rag.module.css'
import { BotMessageSquare, ClipboardList, Folder, History } from 'lucide-react'

const SideBarRAG = () => {
  return (
    <div className={styles.sideBar}>
        <div className={styles.header}>
           RAG Retrive <BotMessageSquare size={40} />
        </div>
        <div className={styles.sideBarOption}>
            <Folder />
            <span>
                Attachments
            </span>
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
  )
}

export default SideBarRAG
