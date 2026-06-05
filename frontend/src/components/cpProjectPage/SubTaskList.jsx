import { Button } from '@/components/ui/button'
import { useState } from 'react'
import styles from './projectUI.module.css'
import { useSubTask } from '@/hooks/useSubTask.js'
import { CircleMinus, CirclePlus } from 'lucide-react'
import { useNLP } from '@/hooks/useNLP.js'

const SubTaskList = ({ subTasks, task_id, workspace_id, description }) => {
  //workspace_id, task_id, title, status
  //todo', 'in_progress','done
  const {createSubTask} = useSubTask()
  const [title, setTitle] = useState("")
  const [status, setStatus] = useState("todo")
  const [pop, setPop] = useState(false)
  
  const {suggestTask} = useNLP()
  const [sgTasks, setSgTasks] = useState([])

  const handleSuggestTask = async() => {
    const res = await suggestTask({workspace_id, description})
    setSgTasks(res.tasks)
  }

  const handleCreateSubTask = () => {
    createSubTask.mutate({workspace_id, task_id, title, status})
  }
  return (
    <div className={styles.mainSubTask}>
      <div className='flex space-x-2 items-center justify-between '>
        <span className='font-semibold text-[#64748B]'>SUBTASKS:</span>
        <div className={styles.taskButtonWrapper}>
          <Button className="bg-white text-blue-600"
                  onClick={() => {setPop(pre => !pre), handleSuggestTask()}}> {pop?<CircleMinus />:<CirclePlus />} </Button>
          {pop ? (
            <div className={styles.taskPopup}>
              <span>Create subTask</span>
              <input className={styles.taskInput}
                     value={title}
                     placeholder='subTask title'
                     onChange={(e) => setTitle(e.target.value)}/>

              {/* suggest tasks */}
              {sgTasks ?(
                <div className='flex flex-col'>
                  <label>--AI suggest tasks--</label>
                  {sgTasks.map((task, idx) => (
                    <span className='opacity-70 cursor-pointer hover:opacity-100' key={idx} onClick={() => setTitle(task)}>{task}</span>
                  ))}
                </div>
              ):(null)}
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