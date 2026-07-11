import React, { useEffect, useRef } from 'react'
import styles from '@/components/cpRAG/rag.module.css'
import { Bot, User, Bookmark } from 'lucide-react'

const MessageContainer = ({ conversationMessages = [] }) => {
  const messagesEndRef = useRef(null)

  // Tự động cuộn xuống đáy khi có tin nhắn mới
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [conversationMessages])

  if (!conversationMessages || conversationMessages.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-slate-400 gap-2">
        <Bot size={40} className="text-slate-300 stroke-[1.5]" />
        <p className="text-sm font-medium">Ask anything to start the conversation</p>
      </div>
    )
  }

  return (
    <div className={styles.messageContainer}>
      {conversationMessages.map((msg, index) => {
        const isUser = msg?.role === "user"
        // Dùng message_id hoặc fallback về index nếu data dev tạm thời chưa có id biệt lập
        const uniqueKey = msg?.message_id || index 

        return (
          <div 
            key={uniqueKey} 
            className={`${isUser ? styles.userMessage : styles.assistantMessage} group`}
          >
            {/* Header Icon + Tên để phân biệt rõ vai trò */}
            <div className="flex items-center gap-1.5 text-[11px] font-bold tracking-wide uppercase mb-1.5 opacity-60">
              {isUser ? (
                <>
                  <User size={12} />
                  <span>You</span>
                </>
              ) : (
                <>
                  <Bot size={12} className="text-indigo-600" />
                  <span className="text-indigo-600">AI Assistant</span>
                </>
              )}
            </div>

            <div className="text-sm leading-relaxed whitespace-pre-wrap">
              {msg?.content}
            </div>

            {!isUser && msg?.sources && (
              <div className="mt-3 pt-2 border-t border-slate-200/60 flex flex-col gap-1">
                <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  <Bookmark size={10} />
                  <span>Sources & References</span>
                </div>
                <div className="text-xs text-slate-500 italic bg-white/60 p-2 rounded-lg border border-slate-200/40">
                  {msg.sources}
                </div>
              </div>
            )}
          </div>
        )
      })}
      <div ref={messagesEndRef} />
    </div>
  )
}

export default MessageContainer