import styles from './projectUI.module.css'
import SubTaskList from './SubTaskList'
import CommentList from './CommentList'
import AttachmentList from './AttachmentList'
import { CircleDashed } from 'lucide-react'

const TaskItem = ({ task, project_id, workspace_id }) => {
  return (
    <div className={styles.task}>
      <div className='flex flex-col items-start'>
        <span className='flex flex-row gap-1.5 text-xl font-semibold'><CircleDashed />{task.title}</span>
        <div className='flex flex-row gap-2 items-center'>
          <span className={task.status === "done" ? styles.statusDone : styles.status}>
            {task.status}
          </span>
          <span className="text-sm text-gray-600"> {task.description} </span>
        </div>
      </div>
      <SubTaskList subTasks={task.subTasks} task_id = {task.task_id} workspace_id={workspace_id} description ={task.description} />
      <CommentList comments={task.comments} task_id = {task.task_id} workspace_id={workspace_id}/>
      <AttachmentList attachments={task.attachments} />
    </div>
  )
}

export default TaskItem