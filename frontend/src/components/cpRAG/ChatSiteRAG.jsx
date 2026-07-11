import React, { useEffect, useState, useRef } from 'react'
import styles from '@/components/cpRAG/rag.module.css'
import { BotMessageSquare, Paperclip, Send } from 'lucide-react'
import { Button } from '../ui/button'
import MessageContainer from './MessageContainer.jsx'
import { useChat } from '@/hooks/useChat.js'

const ChatSiteRAG = ({selectedFiles, setSelectedConversation, selectedConversation, workspace_id, setConversations}) => {
    const {sendMessage, fetchMessages, createConversation} = useChat()
    const [conversationMessages, setConversationMessages] = useState([])
    const [message, setMessage] = useState("")
    const textareaRef = useRef(null) // Dùng Ref để điều khiển trực tiếp DOM của textarea
    
    const handleSend = async() => {
        if (!message.trim()) return;
        
        const currentMessage = message;
        setMessage("") // Clear state ngay lập tức để tránh double click
        
        // Reset lại độ cao của textarea về 1 dòng sau khi gửi
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
        }

        try {
            if(!selectedConversation){
                const con = await createConversation({workspace_id, title: currentMessage})
                setConversations(pre => [con, ...pre])
                const conversation_id = con.conversation_id
                setSelectedConversation(con.conversation_id)

                const res = await sendMessage({conversation_id, query: currentMessage, documents: selectedFiles, workspace_id})
                setConversationMessages([res.userMessage, res.ragMessage])
            } else {
                // Tối ưu UI: Đẩy tin nhắn của User lên màn hình trước cho đỡ cảm giác lag
                setConversationMessages(pre => [...pre, { role: 'user', content: currentMessage }])
                
                const res = await sendMessage({conversation_id: selectedConversation, query: currentMessage, documents: selectedFiles, workspace_id})
                setConversationMessages(pre => {
                    // Loại bỏ tin nhắn tạm thời và nạp cặp tin nhắn chuẩn từ API trả về
                    const filtered = pre.filter(m => m.content !== currentMessage);
                    return [...filtered, res.userMessage, res.ragMessage]
                })
            }
        } catch (error) {
            console.error("Failed to send message:", error)
        }
    }
    
    useEffect(() => {
       const fetchConversationMessages = async() => {
            if (!selectedConversation) {
                setConversationMessages([]);
                return;
            }
            const res = await fetchMessages({conversation_id: Number(selectedConversation), workspace_id})
            setConversationMessages(res)
       };
       fetchConversationMessages()
    }, [selectedConversation])

    const handleChange = (e) => {
        setMessage(e.target.value);
        
        e.target.style.height = "auto";
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
            {/* Header Component */}
            <div className={styles.header}>
                <span>RAG Retrieve</span>
                <BotMessageSquare size={32} className="text-indigo-600" />
            </div>

            {/* Chứa tin nhắn: Tự động cuộn biệt lập ở giữa */}
            <MessageContainer conversationMessages={conversationMessages}/>   

            {/* Footer Khu vực nhập liệu cố định ở đáy */}
            <div className='flex flex-col items-center w-full pt-2 bg-white flex-shrink-0'>
                <div className={styles.messageComposer}> 
                    <Button type="button" size="icon" variant="ghost" className="rounded-full bg-white text-slate-600 shadow-2xs">
                        <Paperclip size={18} />
                    </Button>
                    
                    <textarea 
                        ref={textareaRef}
                        placeholder='Ask anything...' 
                        className='border-none bg-transparent p-1.5 flex-1 resize-none max-h-[150px] outline-none text-sm text-slate-800'
                        value={message} 
                        onChange={handleChange}
                        onKeyDown={(e) => {
                            // Nhấn Enter không bấm kèm Shift -> Kích hoạt gửi tin
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault(); // CHẶN tạo dòng mới (Newline) trong textarea
                                handleSend();
                            }
                        }} 
                        rows={1}
                    />
                    
                    <Button 
                        type="button" 
                        size="icon" 
                        className="rounded-full bg-slate-900 hover:bg-slate-800 text-white shadow-sm"
                        onClick={handleSend}
                    >
                        <Send size={16} />
                    </Button>
                </div>
                <span className="text-[11px] text-slate-400 mt-2 mb-1">
                    AI can make mistakes. Check important info.
                </span>
            </div>
        </div>
    )
}

export default ChatSiteRAG