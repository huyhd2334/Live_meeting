import { Button } from '@/components/ui/button'
import styles from './projectUI.module.css'
import TaskItem from './TaskItem'
import { useState } from 'react'
import { useTask } from '@/hooks/useTask.js'
import { useProject } from '@/hooks/useProject.js'
import { BotMessageSquare, PanelBottomClose, PanelTopClose, Trash } from 'lucide-react'
import { useNavigate } from 'react-router'

const ProjectItem = ({ project, workspace_id, project_id }) => {
  const {createTask} = useTask()
  const [openTaskBox, setOpenTaskBox] = useState(false)
  const [status, setStatus] = useState("todo") // 'todo', 'in_progress','done'
  const [priority, setPriority] = useState("high")
  const [deadline, setDeadline] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [assigned_to, setAssigned_to] = useState(1)
  const [show, setShow] = useState(false)
  const navigate = useNavigate()
  const {deleteProject} = useProject()
  // task: workspace_id, project_id, title, description, status, priority, deadline, assigned_to

  const handleCreateTask = () => {
    createTask.mutate({ workspace_id, project_id: project.project_id, 
                        title, description, status, priority,
                        deadline, assigned_to})
    setOpenTaskBox(fasle)
  }
  
  const handleDeleteProject = async() => {
    await deleteProject(project_id)
  }
  
  const handleRAG = async() => {
      if(typeof project_id === "number"){
         navigate(`/project/${project_id}/rag`, {state: {project_id}})
      }else{toast.error(`Cannot access rag in this project ${project_id}`)}
  }
  return (
    <div className={styles.mainProject}>
      <div className={`${styles.headerProject} ${show ? 'sticky top-0 z-50 bg-white' : ''}`}>
       <div className='flex flex-row gap-2'>
        <span>ID: {project_id}</span>
        <span>Project Name: {project.project_name}</span>
        <span className=" inline-flex items-center justify-center rounded-sm text-[#2563EB] px-3 py-1 text-xs font-medium">
          {project.project_status.toUpperCase()}
        </span>
        <div className={styles.button2} onClick={() => handleRAG()}> <span>RAG</span> <BotMessageSquare /> </div>
      </div>

      
        
        <div className='flex flex-row gap-2'>
        <div className={styles.taskButtonWrapper}>
          <div
            className={styles.button}
            onClick={() => setOpenTaskBox(prev => !prev)}
          >
            {openTaskBox ? 'Cancel' : '+ Task'}
          </div>

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
              <Button onClick={() => handleCreateTask()} disabled={createTask.isPending}>
                Create
              </Button>
            </div>
          )}
        </div>

        <div onClick={() => setShow(pre=>!pre)} className={styles.button2}> 
          {!show?<PanelBottomClose />:<PanelTopClose />} 
        </div>

        <div onClick={() => handleDeleteProject()} className={styles.button2}> 
          <Trash />
        </div>
        
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {show?project.tasks.map(task => (
          <TaskItem key={task.task_id} task={task} project_id={project.project_id} workspace_id={workspace_id}/>
        )):(null)}
      </div>
    </div>
  )
}

export default ProjectItem