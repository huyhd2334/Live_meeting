import { Button } from '@/components/ui/button'
import { MessageSquareText } from 'lucide-react'
import styles from './projectUI.module.css'
import { useState } from 'react'
import { useComment } from '@/hooks/useComment.js'

const CommentList = ({ comments, task_id, workspace_id}) => {
  const [pop, setPop] = useState(false)
  const [content, setContent] = useState("")
  const {createComment} = useComment()

  const handleCreateComment = () => {
    setContent("")
    createComment.mutate({workspace_id, task_id, content})
    setPop(false)
  }
  
  return (
    <div className="ml-6 mt-2 text-sm">
      <div className='flex space-x-2 items-center'>
        <span>comments:</span>
        <div className={styles.taskButtonWrapper}>
          <Button className="bg-white text-black size-0.5"
                  onClick={() => {setPop(pre => !pre)}}> {pop?"-":"+"} </Button>
          {pop ? (
            <div className={styles.taskPopup}>
              <span>Add comment</span>
              <input className={styles.taskInput}
                     value={content}
                     placeholder='content'
                     onChange={(e) => setContent(e.target.value)}/>
              <Button onClick={() => {handleCreateComment()}}>Comfirm</Button>
            </div>
          ) : (null)}
        </div>
      </div>

      {comments.map(c => (
        <div key={c.comment_id} className='flex space-x-2'>
          <MessageSquareText size={16} />
          <span>{c.content}</span>
        </div>
      ))}
    </div>
  )
}

export default CommentList