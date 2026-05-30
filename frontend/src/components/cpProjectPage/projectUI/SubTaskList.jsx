import { Button } from '@/components/ui/button'
import { useState } from 'react'
import styles from './projectUI.module.css'
import { useSubTask } from '@/hooks/useSubTask.js'
import { CircleMinus, CirclePlus } from 'lucide-react'

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
    <div className={styles.mainSubTask}>
      <div className='flex space-x-2 items-center justify-between '>
        <span className='font-semibold text-[#64748B]'>SUBTASKS:</span>
        <div className={styles.taskButtonWrapper}>
          <Button className="bg-white text-blue-600"
                  onClick={() => {setPop(pre => !pre)}}> {pop?<CircleMinus />:<CirclePlus />} </Button>
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
      
      <div className={styles.listSubTask}>
        {subTasks.map(st => (
          <div key={st.subtask_id}>
            • {st.title} ({st.status})
          </div>
        ))}
      </div>
    </div>
  )
}

export default SubTaskList