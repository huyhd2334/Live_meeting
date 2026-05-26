import { Button } from '@/components/ui/button'
import styles from './projectUI.module.css'
import TaskItem from './TaskItem'
import { useState } from 'react'
import { useTask } from '@/hooks/useTask.js'

const ProjectItem = ({ project, workspace_id }) => {
  const {createTask} = useTask()

  const [openTaskBox, setOpenTaskBox] = useState(false)
  const [status, setStatus] = useState("todo") // 'todo', 'in_progress','done'
  const [priority, setPriority] = useState("high")
  const [deadline, setDeadline] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [assigned_to, setAssigned_to] = useState(1)

  // task: workspace_id, project_id, title, description, status, priority, deadline, assigned_to

  const handleCreateTask = async() => {
      await createTask({workspace_id, project_id: project.project_id, title, description, status, priority, deadline, assigned_to})
  }
  
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
                placeholder="Task Title..."
                className={styles.taskInput}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Button onClick={() => handleCreateTask()}>
                Create
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {project.tasks.map(task => (
          <TaskItem key={task.task_id} task={task} project_id={project.project_id}/>
        ))}
      </div>
    </div>
  )
}

export default ProjectItem