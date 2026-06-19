import React, { useEffect, useState } from 'react'
import styles from '@/components/cpRAG/rag.module.css'
import { Paperclip, Send } from 'lucide-react'
import { Button } from '../ui/button'
import MessageContainer from './MessageContainer.jsx'
import { useChat } from '@/hooks/useChat.js'

const ChatSiteRAG = ({selectedFiles, setSelectedConversations, selectedConversations, workspace_id}) => {
    const {sendMessage, fetchMessages, createConversation} = useChat()
    const [conversationMessages, setConversationMessages] = useState([])
    const [message, setMessage] = useState("")
    
    const handleSend = async() => {
        if(!selectedConversations){
            const con = await createConversation({workspace_id, message})
            const conversation_id = con.conversation_id

            setSelectedConversations(con.conversation_id)
            const res = await sendMessage({conversation_id: conversation_id, query: message, documents: selectedFiles, workspace_id})
            // setConversationMessages(pre => [...pre, res.userMessage, res.ragMessage])
        }else{
            const res = await sendMessage({conversation_id: selectedConversations, query: message, documents: selectedFiles, workspace_id})
            // setConversationMessages(pre => [...pre, res.userMessage, res.ragMessage])
      }
    }
    
    useEffect(() => {
       const fetchConversationMessages = async() => {
            const res  = await fetchMessages({conversation_id: selectedConversations, workspace_id})
            setConversationMessages(res)
       };
       fetchConversationMessages()
    },[selectedConversations])

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
            <div>
               {conversationMessages?.map((msg) => {
                  msg.role === "user"?(
                    <div className={styles.userMessage}>{msg.content}</div>
                  ):(
                    <div className={styles.assistantMessage}>{msg.content}</div>
                  )
               })}
            </div>

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
                <Button onClick={() => handleSend()}><Send /></Button>
            </div>
            <span>AI can make mistakes. Check important info.</span>
       </div>
    </div>
  )
}

export default ChatSiteRAG
