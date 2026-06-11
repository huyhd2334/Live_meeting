import styles from './projectUI.module.css'
import SubTaskList from './SubTaskList'
import CommentList from './CommentList'
import { CircleDashed, Trash } from 'lucide-react'
import { useTask } from '@/hooks/useTask.js'

const TaskItem = ({ task, project_id, workspace_id }) => {
  const {deleteTask} = useTask()

  const handleDeleteTask = async () => {
    await deleteTask(task.task_id)
  }

  return (
    <div className={styles.task}>
      <div className='flex flex-col items-start'>
        <span className='flex flex-row gap-1.5 text-xl font-semibold items-center'><CircleDashed />{task.title} 
          <div onClick={() => handleDeleteTask()} className={styles.button2}> 
            <Trash />
          </div>
        </span>
        <div className='flex flex-row gap-2 items-center'>
          <span className={task.status === "done" ? styles.statusDone : styles.status}>
            {task.status}
          </span>
          <span className="text-sm text-gray-600"> {task.description} </span>
        </div>
      </div>
      <SubTaskList subTasks={task.subTasks} task_id = {task.task_id} workspace_id={workspace_id} description ={task.description} />
      <CommentList comments={task.comments} task_id = {task.task_id} workspace_id={workspace_id}/>
    </div>
  )
}

export default TaskItem