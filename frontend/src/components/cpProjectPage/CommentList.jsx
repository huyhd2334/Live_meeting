import { Button } from '@/components/ui/button'
import { CircleMinus, CirclePlus, MessageSquareText } from 'lucide-react'
import styles from './projectUI.module.css'
import { useState } from 'react'
import { useComment } from '@/hooks/useComment.js'

const CommentList = ({ comments, task_id, workspace_id, project_id, setProjects }) => {
  const [pop, setPop] = useState(false)
  const [content, setContent] = useState("")
  const { createComment } = useComment()

  const handleCreateComment = async () => {
    if (!content.trim()) return

    try {
      const result = await createComment.mutateAsync({ workspace_id, task_id, content })
      console.log("comment: ",result)
      // Create a flat row representation to append to the global state
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

      // Update global parent state to trigger useMemo tree rebuild
      setProjects(prevRows => [...prevRows, newFlatCommentRow])
      
      setContent("")
      setPop(false)
    } catch (error) {
      console.error("Failed to create comment:", error)
    }
  }
  
  return (
    <div className={styles.mainComment}>
      <div className='flex space-x-2 items-center text-[#64748B] justify-between'>
        <div className='flex flex-row space-x-2 items-center'>
          <MessageSquareText size={16} />
          <span>Comment:</span>
        </div>
        <div className={styles.taskButtonWrapper}>
          <Button 
            className="bg-white text-blue-600"
            onClick={() => setPop(prev => !prev)}
          > 
            {pop ? <CircleMinus /> : <CirclePlus />} 
          </Button>
          
          {pop && (
            <div className={styles.taskPopup}>
              <span>Add comment</span>
              <input 
                className={styles.taskInput}
                value={content}
                placeholder='content'
                onChange={(e) => setContent(e.target.value)}
              />
              <Button 
                onClick={handleCreateComment}
                disabled={createComment.isPending}
              >
                Confirm
              </Button>
            </div>
          )}
        </div>
      </div>
      
      {comments && comments.map(c => (
        <div key={c.comment_id} className='flex space-x-2'>
          <span>{c.content}</span>
        </div>
      ))}
    </div>
  )
}

export default CommentList