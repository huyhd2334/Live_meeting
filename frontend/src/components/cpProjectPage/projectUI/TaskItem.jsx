import styles from './projectUI.module.css'
import SubTaskList from './SubTaskList'
import CommentList from './CommentList'
import AttachmentList from './AttachmentList'
import { CircleDashed } from 'lucide-react'

const TaskItem = ({ task, project_id, workspace_id }) => {
  return (
    <div className={styles.task}>
      <div className='flex space-x-4 items-center'>
        <span className='flex flex-row gap-1.5'><CircleDashed />{task.title}</span>
        <span className={task.status === "done" ? styles.statusDone : styles.status}>
          {task.status}
        </span>
      </div>
      
      <div className="text-sm text-gray-600">
        {task.description}
      </div>

      <SubTaskList subTasks={task.subTasks} task_id = {task.task_id} workspace_id={workspace_id}/>
      <CommentList comments={task.comments} />
      <AttachmentList attachments={task.attachments} />
    </div>
  )
}

export default TaskItem