import { Button } from '@/components/ui/button'
import { useState } from 'react'
import styles from './projectUI.module.css'
import { useSubTask } from '@/hooks/useSubTask.js'
import { CircleMinus, CirclePlus } from 'lucide-react'
import { useNLP } from '@/hooks/useNLP.js'

const SubTaskList = ({ subTasks, task_id, workspace_id, project_id, description, setProjects }) => {
  const { createSubTask } = useSubTask()
  const [title, setTitle] = useState("")
  const [status, setStatus] = useState("todo")
  const [pop, setPop] = useState(false)
  
  const { suggestTask } = useNLP()
  const [sgTasks, setSgTasks] = useState([])

  const handleSuggestTask = async () => {
    try {
      const res = await suggestTask({ workspace_id, description })
      if (res?.tasks) {
        setSgTasks(res.tasks)
      }
    } catch (error) {
      console.error("Failed to fetch AI suggestions:", error)
    }
  }

  const handleCreateSubTask = async () => {
    if (!title.trim()) return

    try {
      const result = await createSubTask.mutateAsync({ workspace_id, task_id, title, status });
      const subTask = result.subTask;

      // Create a flat row representation to append to the global state
      const newFlatSubTaskRow = {
        project_id,
        task_id,
        attachment_id: null,
        comment_id: null,
        subtask_id: subTask.subtask_id,
        subtask_title: subTask.title || title,
        subtask_status: subTask.status || status
      }

      // Update global parent state to trigger useMemo tree rebuild
      setProjects(prevRows => [...prevRows, newFlatSubTaskRow])
      
      setTitle("")
      setPop(false)
    } catch (error) {
      console.error("Failed to create subtask:", error)
    }
  }

  return (
    <div className={styles.mainSubTask}>
      <div className='flex space-x-2 items-center justify-between'>
        <span className='font-semibold text-[#64748B]'>SUBTASKS:</span>
        <div className={styles.taskButtonWrapper}>
          {!pop ? (
            <Button 
              className="bg-white text-blue-600"
              onClick={() => {
                setPop(true)
                handleSuggestTask()
              }}
            > 
              <CirclePlus /> 
            </Button>
          ) : (
            <Button 
              className="bg-white text-blue-600"
              onClick={() => setPop(false)}
            > 
              <CircleMinus /> 
            </Button>
          )}

          {pop && (
            <div className={styles.taskPopup}>
              <span>Create subTask</span>
              <input 
                className={styles.taskInput}
                value={title}
                placeholder='subTask title'
                onChange={(e) => setTitle(e.target.value)}
              />

              {sgTasks && sgTasks.length > 0 && (
                <div className='flex flex-col gap-1 my-2 bg-slate-50 p-2 rounded-lg border border-dashed border-slate-200'>
                  <label className="text-xs text-blue-600 font-medium">- - AI suggest tasks - -</label>
                  {sgTasks.map((task, idx) => (
                    <span 
                      className='text-xs opacity-70 cursor-pointer hover:opacity-100 hover:text-blue-500' 
                      key={idx} 
                      onClick={() => setTitle(task)}
                    >
                      • {task}
                    </span>
                  ))}
                </div>
              )}
              
              <select className="border rounded p-1 my-2" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="todo">Todo</option>
                <option value="in_progress">In Progress</option>
                <option value="done">Done</option>
              </select>
              
              <Button 
                onClick={handleCreateSubTask}
                disabled={createSubTask.isPending}
              >
                Confirm
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <div className={styles.listSubTask}>
        {subTasks && subTasks.map(st => (
          <div key={st.subtask_id} className="text-sm my-0.5">
            • {st.title} <span className="text-xs text-gray-400">({st.status})</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SubTaskList