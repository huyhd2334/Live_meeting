import styles from './projectUI.module.css'
import SubTaskList from './SubTaskList'
import CommentList from './CommentList'
import { CircleDashed, Trash } from 'lucide-react'
import { useTask } from '@/hooks/useTask.js'
import { toast } from 'sonner' // Ensure toast is imported

const TaskItem = ({ task, project_id, workspace_id, setProjects }) => {
  const { deleteTask } = useTask()

  const handleDeleteTask = async () => {
    try {
      const success = await deleteTask(task.task_id);
      
      if (success) {
        setProjects(prevRows => prevRows.filter(row => row.task_id !== task.task_id));
        toast.success("Task deleted successfully");
      }
    } catch (error) {
      toast.error("Failed to delete task");
    }
  };

  return (
    <div className={styles.task}>
      <div className='flex flex-col items-start'>
        <span className='flex flex-row gap-1.5 text-xl font-semibold items-center'>
          <CircleDashed />{task.title} 
          <div onClick={handleDeleteTask} className={styles.button2}> 
            <Trash size={16} />
          </div>
        </span>
        <div className='flex flex-row gap-2 items-center'>
          <span className={task.status === "done" ? styles.statusDone : styles.status}>
            {task.status}
          </span>
          <span className="text-sm text-gray-600"> {task.description} </span>
        </div>
      </div>
      
      <SubTaskList 
        subTasks={task.subTasks} 
        task_id={task.task_id} 
        project_id={project_id} 
        workspace_id={workspace_id} 
        description={task.description} 
        setProjects={setProjects}
      />
      
      <CommentList 
        comments={task.comments} 
        task_id={task.task_id} 
        project_id={project_id} 
        workspace_id={workspace_id} 
        setProjects={setProjects}
      />
    </div>
  )
}

export default TaskItem