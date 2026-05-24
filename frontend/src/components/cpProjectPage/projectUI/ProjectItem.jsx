import { Button } from '@/components/ui/button'
import styles from './projectUI.module.css'
import TaskItem from './TaskItem'
import { useState } from 'react'

const ProjectItem = ({ project }) => {
  const [openTaskBox, setOpenTaskBox] = useState(false)
  const [status, setStatus] = useState("todo") // 'todo', 'in_progress','done'
  const [priority, setPriority] = useState("high")
  const [deadline, setDeadline] = useState("")
  return (
    <div className={styles.mainProject}>
      <div className={styles.headerProject}>
        <span>Project Name: {project.project_name}</span>
        <span className="underline">
          Status: {project.project_status}
        </span>
        <div className={styles.taskButtonWrapper}>
          <Button
            className="bg-white text-sm px-2 py-1 h-7 text-black"
            onClick={() => setOpenTaskBox(prev => !prev)}
          >
            {openTaskBox ? 'Cancel' : '+ Task'}
          </Button>
          {openTaskBox && (
            <div className={styles.taskPopup}>
              <input
                placeholder="Task title..."
                className={styles.taskInput}
              />
              {/* piority - status */}
              <span> Status and Priority </span>
              <div className='flex flex-row space-x-4'>
                 <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="todo">Todo</option>
                    <option value="in_progress">In progress</option>
                    <option value="done">Done</option>
                 </select>
                 <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">high</option>
                 </select>
              </div>

              <input type="datetime-local"
                     value={deadline}
                     onChange={(e) => setDeadline(e.target.value)}/>
              <input
                placeholder="Task Description..."
                className={styles.taskInput}
              />
              <Button>
                Create
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {project.tasks.map(task => (
          <TaskItem key={task.task_id} task={task} />
        ))}
      </div>
    </div>
  )
}

export default ProjectItem