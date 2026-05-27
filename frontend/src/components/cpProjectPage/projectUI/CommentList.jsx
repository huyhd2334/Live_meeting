import { Button } from '@/components/ui/button'
import { MessageSquareText } from 'lucide-react'

const CommentList = ({ comments }) => {
  if (!comments.length) return (
    <div className="text-sm">
      <div className='flex space-x-2 items-center'>
        <label>Comments:</label>
        <Button className="bg-white text-black size-0.5"> + </Button>
      </div>
    </div>
  )

  return (
    <div className="ml-6 mt-2 text-sm">
      <div className='flex space-x-2 items-center'>
        <label>Comments:</label>
        <Button className="bg-white text-black size-0.5"> + </Button>
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