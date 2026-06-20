import React from 'react'
import styles from '@/components/cpRAG/rag.module.css'


const MessageContainer = ({conversationMessages}) => {
  if(!conversationMessages){
    console.log(conversationMessages)
    return <div>Ask any thing</div>
  }
  return (
      <div className={styles.messageContainer}>
        {conversationMessages?.map((msg) =>
            msg?.role === "user" ? (
                <div key={msg?.message_id} className={styles.userMessage}>
                    {msg?.content}
                </div>
            ) : (
                <div key={msg?.message_id} className={styles.assistantMessage}>
                    <span>{msg?.content}</span>
                    <span>[SOURCES] {msg?.sources}</span>
                </div>
            )
        )}
      </div>
  )
}

export default MessageContainer
