import { Button } from '@/components/ui/button'
import { CircleMinus, CirclePlus, MessageSquareText } from 'lucide-react'
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
    <div className={styles.mainComment}>
      <div className='flex space-x-2 items-center text-[#64748B] justify-between'>
        <div className='flex flex-row space-x-2 items-center'>
          <MessageSquareText size={16} />
          <span>Comment:</span>
        </div>
        <div className={styles.taskButtonWrapper}>
          <Button className="bg-white text-blue-600"
                  onClick={() => {setPop(pre => !pre)}}> {pop?<CircleMinus />:<CirclePlus />} </Button>
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
          <span>{c.content}</span>
        </div>
      ))}
    </div>
  )
}

export default CommentList