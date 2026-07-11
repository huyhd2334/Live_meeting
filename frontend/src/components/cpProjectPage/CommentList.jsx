import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import styles from './projectUI.module.css'
import { useComment } from '@/hooks/useComment.js'
import { CircleMinus, CirclePlus, MessageSquareText, Send } from 'lucide-react'

const CommentList = ({ comments = [], task_id, workspace_id, project_id, setProjects }) => {
  const [pop, setPop] = useState(false)
  const [content, setContent] = useState("")
  const { createComment } = useComment()

  const handleCreateComment = async () => {
    if (!content.trim()) return
    try {
      const result = await createComment.mutateAsync({ workspace_id, task_id, content })
      
      const newFlatCommentRow = {
        project_id,
        task_id,
        attachment_id: null,
        subtask_id: null,
        comment_id: result.comment.comment_id,
        comment_content: result.comment.content || content,
        comment_user_id: result.comment.user_id,
        comment_created_at: result.comment.created_at
      }

      setProjects(prevRows => [...prevRows, newFlatCommentRow])
      
      setContent("")
      setPop(false)
    } catch (error) {
      console.error("Failed to create comment:", error)
    }
  }
  
  return (
    <div className={styles.mainComment}>
      {/* Comment Header Component */}
      <div className='flex items-center justify-between pb-2 border-b border-slate-100 mb-3'>
        <div className='flex items-center gap-1.5 text-xs font-bold tracking-wider text-slate-500 uppercase'>
          <MessageSquareText size={14} className="text-slate-400" />
          <span>Comments ({comments.length})</span>
        </div>
        
        <div className={styles.taskButtonWrapper}>
          <Button 
            variant="ghost"
            className="w-8 h-8 p-0 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg transition-colors"
            onClick={() => setPop(prev => !prev)}
          > 
            {pop ? <CircleMinus size={18} /> : <CirclePlus size={18} />} 
          </Button>
          
          {/* Create Comment Floating Popup */}
          {pop && (
            <div className={styles.taskPopupFixed}>
              <div className="text-sm font-bold text-slate-800 mb-1">Add Comment</div>
              <textarea 
                className={`${styles.taskInput} min-h-[70px] resize-none text-xs`}
                value={content}
                placeholder='Type your comment here...'
                onChange={(e) => setContent(e.target.value)}
              />
              <Button 
                size="sm"
                className="w-full mt-1 bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs rounded-lg flex items-center justify-center gap-1"
                onClick={handleCreateComment}
                disabled={createComment.isPending}
              >
                <Send size={12} />
                {createComment.isPending ? "Sending..." : "Comment"}
              </Button>
            </div>
          )}
        </div>
      </div>
      
      {/* Comments List View Stack */}
      <div className="flex flex-col gap-2 max-h-[220px] overflow-y-auto pr-1">
        {comments.length > 0 ? (
          comments.map(c => (
            <div key={c.comment_id} className='flex items-start gap-2.5 bg-slate-50/60 p-2.5 rounded-xl border border-slate-100'>
              {/* Ý tưởng Avatar viết tắt nhẹ nhàng */}
              <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                U
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-slate-700">User</span>
                  <span className="text-[10px] text-slate-400">
                    {c.created_at ? new Date(c.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 'Just now'}
                  </span>
                </div>
                <p className='text-xs text-slate-600 mt-0.5 leading-relaxed break-words'>
                  {c.content}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-xs font-medium text-slate-400 border border-dashed border-slate-200/80 rounded-xl bg-slate-50/50">
            No comments yet. Share your thoughts!
          </div>
        )}
      </div>
    </div>
  )
}

export default CommentList