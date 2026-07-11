import React from 'react'
import styles from './projectUI.module.css'
import SubTaskList from './SubTaskList'
import CommentList from './CommentList'
import { CircleDashed, Trash2, CheckCircle2 } from 'lucide-react'
import { useTask } from '@/hooks/useTask.js'
import { toast } from 'sonner'

const TaskItem = ({ task, project_id, workspace_id, setProjects }) => {
  const { deleteTask } = useTask()
  const isDone = task.status === "done"

  const handleDeleteTask = async (e) => {
    e.stopPropagation() 
    try {
      const success = await deleteTask(task.task_id)
      if (success) {
        setProjects(prevRows => prevRows.filter(row => row.task_id !== task.task_id))
        toast.success("Task deleted successfully")
      }
    } catch (error) {
      toast.error("Failed to delete task")
    }
  }

  return (
    <div className={styles.task}>
      {/* Task Header & Controls */}
      <div className='flex items-start justify-between w-full gap-4 pb-1'>
        <div className='flex flex-col items-start min-w-0 flex-1'>
          {/* Title Area */}
          <div className='flex items-center gap-2 w-full min-w-0'>
            {isDone ? (
              <CheckCircle2 size={20} className="text-emerald-500 flex-shrink-0" />
            ) : (
              <CircleDashed size={20} className="text-slate-400 animate-spin-slow flex-shrink-0" />
            )}
            <h2 className={`text-lg font-bold text-slate-800 truncate ${isDone ? "line-through text-slate-400 font-normal" : ""}`}>
              {task.title}
            </h2>
          </div>

          {/* Badges & Description */}
          <div className='flex items-center gap-2 mt-1.5 flex-wrap'>
            <span className={isDone ? styles.statusDone : styles.status}>
              {task.status.replace('_', ' ')}
            </span>
            {task.description && (
              <span className="text-xs text-slate-500 font-medium line-clamp-1">
                {task.description}
              </span>
            )}
          </div>
        </div>

        {/* Action Button: Delete */}
        <button 
          type="button"
          onClick={handleDeleteTask} 
          className={styles.button2}
          title="Delete task"
        > 
          <Trash2 size={15} />
        </button>
      </div>

      {/* Divider nhẹ giữa Header và các danh sách con */}
      <div className="w-full h-px bg-slate-100/80 my-1" />

      {/* Nested Components Layout */}
      <div className="w-full flex flex-col gap-4 mt-1">
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
    </div>
  )
}

export default TaskItem