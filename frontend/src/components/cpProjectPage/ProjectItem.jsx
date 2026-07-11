import { Button } from '@/components/ui/button'
import styles from './projectUI.module.css'
import TaskItem from './TaskItem'
import { useState } from 'react'
import { useTask } from '@/hooks/useTask.js'
import { useProject } from '@/hooks/useProject.js'
import { BotMessageSquare, PanelBottomClose, PanelTopClose, Trash } from 'lucide-react'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'

const ProjectItem = ({ project, workspace_id, setProjects }) => {
  const {createTask } = useTask()
  const [openTaskBox, setOpenTaskBox] = useState(false)
  const [status, setStatus] = useState("todo") 
  const [priority, setPriority] = useState("high")
  const [deadline, setDeadline] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [assigned_to, setAssigned_to] = useState(1)
  const [show, setShow] = useState(false)
  
  const navigate = useNavigate()
  const { deleteProject } = useProject()

  const currentProjectId = project.project_id

  const handleCreateTask = async () => {
    if (!title.trim()) {
      toast.error("Please enter a task title")
      return
    }

    try {
      const res = await createTask.mutateAsync({
        workspace_id,
        project_id: currentProjectId,
        title,
        description,
        status,
        priority,
        deadline,
        assigned_to,
      });

      const newFlatRow = {
        project_id: currentProjectId,
        project_name: project.project_name,
        project_description: project.project_description,
        project_status: project.project_status,
        
        task_id: res.task.task_id,
        task_title: res.task.title || title,
        task_description: res.task.description || description,
        task_status: res.task.status || status,
        priority: res.task.priority || priority,
        deadline: res.task.deadline || deadline,
        assigned_to: res.task.assigned_to || assigned_to,
        
        attachment_id: null, 
        subtask_id: null,
        comment_id: null
      }

      setProjects(prev => [...prev, newFlatRow]);

      setTitle("");
      setDescription("");
      setOpenTaskBox(false);

    } catch (error) {
      console.error(error)
    }
  };
  
  const handleDeleteProject = async () => {
    try {
      await deleteProject(currentProjectId)
      setProjects(prev => prev.filter(p => p.project_id !== currentProjectId))
      toast.success("Project deleted")
    } catch (error) {
      toast.error("Failed to delete project")
    }
  }
  
  const handleRAG = () => {
    if (!currentProjectId || !workspace_id) {
      toast.error("Missing IDs")
      return
    }

    navigate(
      `/workspace/${workspace_id}/project/${currentProjectId}/rag-chatbot`,
      { state: { attachments: project.attachments } }
    )
  }
  
  return (
    <div className={styles.mainProject}>
      <div className={`${styles.headerProject} ${show ? 'sticky top-0 z-50 bg-white' : ''}`}>
        <div className='flex flex-row items-center gap-2'>
          <span className="text-lg bg-amber-100 rounded-2xl p-2">ID: {currentProjectId}</span>
          <span className="font-semibold">Project Name: {project.project_name}</span>
          <span className="inline-flex items-center justify-center rounded-sm text-[#2563EB] bg-blue-50 px-3 py-1 text-xs font-medium">
            {project.project_status?.toUpperCase()}
          </span>
          <div className={`cursor-pointer flex items-center gap-1`} onClick={handleRAG}> 
            <span>RAG</span> <BotMessageSquare size={16} /> 
          </div>
        </div>

        <div className='flex flex-row gap-2 items-center'>
          <div className={styles.taskButtonWrapper}>
            <div
              className={`cursor-pointer`}
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
                
                <span className="text-xs text-gray-500 block mt-1">Status and Priority</span>
                <div className='flex flex-row space-x-4'>
                  <select className="border rounded p-1" value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="todo">Todo</option>
                    <option value="in_progress">In progress</option>
                    <option value="done">Done</option>
                  </select>
                  <select className="border rounded p-1" value={priority} onChange={(e) => setPriority(e.target.value)}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <input 
                  type="datetime-local"
                  className="border rounded p-1 core-input"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                />
                <input
                  placeholder="Task Description..."
                  className={styles.taskInput}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <Button onClick={handleCreateTask} disabled={createTask.isPending}>
                  {createTask.isPending ? 'Creating...' : 'Create'}
                </Button>
              </div>
            )}
          </div>

          <div onClick={() => setShow(prev => !prev)} className={`cursor-pointer`}> 
            {!show ? <PanelBottomClose size={18} /> : <PanelTopClose size={18} />} 
          </div>

          <div onClick={handleDeleteProject} className={`text-red-500 hover:bg-red-50 cursor-pointer`}> 
            <Trash size={18} />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-2">
        {show && project.tasks && project.tasks.map(task => (
          <TaskItem 
            key={task.task_id} 
            task={task} 
            project_id={currentProjectId} 
            workspace_id={workspace_id}
            setProjects={setProjects}
          />
        ))}
      </div>
    </div>
  )
}

export default ProjectItem