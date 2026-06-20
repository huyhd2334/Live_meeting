import React, { useEffect, useState } from 'react'
import styles from '@/components/cpRAG/rag.module.css'
import { Paperclip, Send } from 'lucide-react'
import { Button } from '../ui/button'
import MessageContainer from './MessageContainer.jsx'
import { useChat } from '@/hooks/useChat.js'

const ChatSiteRAG = ({selectedFiles, setSelectedConversation, selectedConversation, workspace_id, setConversations}) => {
    const {sendMessage, fetchMessages, createConversation} = useChat()
    const [conversationMessages, setConversationMessages] = useState([])
    const [message, setMessage] = useState("")
    
    const handleSend = async() => {
        console.log("selectedConversation =", selectedConversation)
        if(!selectedConversation){

            const con = await createConversation({workspace_id, title: message})
            console.log("new conversation =", con);
            setConversations(pre => [con, ...pre])
            const conversation_id = con.conversation_id
            setSelectedConversation(con.conversation_id)

            const res = await sendMessage({conversation_id: conversation_id, query: message, documents: selectedFiles, workspace_id})
            setConversationMessages([res.userMessage, res.ragMessage])
            console.log(res)
            setMessage("")
        }else{
            const res = await sendMessage({conversation_id: selectedConversation, query: message, documents: selectedFiles, workspace_id})
            console.log("userMessage:", res.userMessage)
            console.log("ragMessage:", res.ragMessage)
            setConversationMessages(pre => [...pre, res.userMessage, res.ragMessage])
            setMessage("")
      }
    }
    
    useEffect(() => {
        console.log("selectedConversation =", selectedConversation)
       const fetchConversationMessages = async() => {
            if (!selectedConversation) return;
            console.log(selectedConversation)
            const res  = await fetchMessages({conversation_id: Number(selectedConversation), workspace_id})
            console.log(res)

            setConversationMessages(res)
       };
       fetchConversationMessages()
    },[selectedConversation])

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

       {/* Messages */}
       <MessageContainer conversationMessages={conversationMessages}/>   
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
                <Button onClick={() => handleSend()}><Send /></Button>
            </div>
            <span>AI can make mistakes. Check important info.</span>
       </div>
    </div>
  )
}

export default ChatSiteRAG
