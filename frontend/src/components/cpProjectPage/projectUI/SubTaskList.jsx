import { Button } from '@/components/ui/button'
import { useState } from 'react'
import styles from './projectUI.module.css'
import { useSubTask } from '@/hooks/useSubTask.js'

const SubTaskList = ({ subTasks, task_id, workspace_id }) => {
  //workspace_id, task_id, title, status
  //todo', 'in_progress','done
  const {createSubTask} = useSubTask()
  const [title, setTitle] = useState("")
  const [status, setStatus] = useState("todo")
  const [pop, setPop] = useState(false)
  
  const handleCreateSubTask = () => {
     createSubTask.mutate({workspace_id, task_id, title, status})
  }
  return (
    <div className="text-sm pl-1.5">
      <div className='flex space-x-2 items-center'>
        <span>SubTasks:</span>
        <div className={styles.taskButtonWrapper}>
          <Button className="bg-white text-black size-0.5"
                  onClick={() => {setPop(pre => !pre)}}> {pop?"-":"+"} </Button>
          {pop ? (
            <div className={styles.taskPopup}>
              <span>Create subTask</span>
              <input className={styles.taskInput}
                     value={title}
                     placeholder='subTask title'
                     onChange={(e) => setTitle(e.target.value)}/>
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="todo">Todo</option>
                <option value="in_progress">In Progress</option>
                <option value="done">Done</option>
              </select>

              <Button onClick={() => {handleCreateSubTask()}}>Comfirm</Button>
            </div>
          ) : (null)}
        </div>
      </div>

      {subTasks.map(st => (
        <div key={st.subtask_id}>
          • {st.title} ({st.status})
        </div>
      ))}
    </div>
  )
}

export default SubTaskList