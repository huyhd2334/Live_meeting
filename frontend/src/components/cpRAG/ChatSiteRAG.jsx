import React, { useState } from 'react'
import styles from '@/components/cpRAG/rag.module.css'
import { Paperclip, Send } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '../ui/button'
import MessageContainer from './MessageContainer.jsx'

const ChatSiteRAG = () => {
    const [message, setMessage] = useState("")

    const handleSend = () => {
        toast.info(message)
        setMessage("")
    }

const handleChange = (e) => {
    setMessage(e.target.value);

    e.target.style.height = "auto";
    // e.target.style.backgroundColor = "red"

    const maxHeight = 150;

    if (e.target.scrollHeight > maxHeight) {
        e.target.style.height = maxHeight + "px";
        e.target.style.overflowY = "auto";
    } else {
        e.target.style.height = e.target.scrollHeight + "px";
        e.target.style.overflowY = "hidden";
    }
};
  return (
    <div className={styles.chatSite}>
       <MessageContainer></MessageContainer>
       <div className='flex flex-col mb-12 items-center'>
            <div className={styles.messageComposer}> 
                <Button><Paperclip /></Button>
                <textarea placeholder='Ask anything' 
                        className='border-none bg-[#F0F1F1] p-2 rounded-2xl flex-1 resize-none overflow-y-auto outline-none'
                        value={message} 
                        onChange={handleChange}
                        onKeyDown={(e) => {
                        if(e.key == "Enter"){
                            handleSend()
                        }
                        }} 
                        rows={1}/>
                <Button><Send /></Button>
            </div>
            <span>AI can make mistakes. Check important info</span>
       </div>
    </div>
  )
}

export default ChatSiteRAG
