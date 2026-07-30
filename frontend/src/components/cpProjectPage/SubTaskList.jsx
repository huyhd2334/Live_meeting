import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import styles from './projectUI.module.css'
import { useSubTask } from '@/hooks/useSubTask.js'
import { CircleMinus, CirclePlus, Sparkles, CheckCircle2, Circle } from 'lucide-react'
import { useNLP } from '@/hooks/useNLP.js'

const SubTaskList = ({ subTasks = [], task_id, workspace_id, project_id, description, setProjects }) => {
  const { createSubTask } = useSubTask()
  const [title, setTitle] = useState("")
  const [status, setStatus] = useState("todo")
  const [pop, setPop] = useState(false)
  
  const { suggestTask } = useNLP()
  const [sgTasks, setSgTasks] = useState([])
  const [loadingAi, setLoadingAi] = useState(false)

  const handleSuggestTask = async () => {
    setLoadingAi(true)
    try {
      const res = await suggestTask({ workspace_id, description })
      if (res?.tasks) {
        setSgTasks(res.tasks)
      }
    } catch (error) {
      console.error("Failed to fetch AI suggestions:", error)
    } finally {
      setLoadingAi(false)
    }
  }

  const handleCreateSubTask = async () => {
    if (!title.trim()) return

    try {
      const result = await createSubTask.mutateAsync({ workspace_id, task_id, title, status });
      const subTask = result.subTask;

      const newFlatSubTaskRow = {
        project_id,
        task_id,
        attachment_id: null,
        comment_id: null,
        subtask_id: subTask.subtask_id,
        subtask_title: subTask.title || title,
        subtask_status: subTask.status || status
      }

      setProjects(prevRows => [...prevRows, newFlatSubTaskRow])
      
      setTitle("")
      setPop(false)
    } catch (error) {
      console.error("Failed to create subtask:", error)
    }
  }

  return (
    <div className={styles.mainSubTask}>
      {/* Subtask Header Component */}
      <div className='flex items-center justify-between pb-2 border-b border-slate-100 mb-3'>
        <span className='text-xs font-bold tracking-wider text-slate-500 uppercase'>Subtasks</span>
        
        <div className={styles.taskButtonWrapper}>
          <Button 
            variant="ghost"
            className="w-8 h-8 p-0 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg transition-colors"
            onClick={() => {
              const nextPop = !pop;
              setPop(nextPop);
              if (nextPop) handleSuggestTask();
            }}
          > 
            {pop ? <CircleMinus size={18} /> : <CirclePlus size={18} />} 
          </Button>

          {/* Create Subtask Popup */}
          {pop && (
            <div className={styles.taskPopup}>
              <div className="flex items-center gap-1.5 text-sm text-black mb-1">
                <span>Create Subtask</span>
              </div>
              
              <input 
                className={styles.taskInput}
                value={title}
                placeholder='What needs to be done?'
                onChange={(e) => setTitle(e.target.value)}
              />

              {/* AI Suggestion Box */}
              {(loadingAi || (sgTasks && sgTasks.length > 0)) && (
                <div className='flex flex-col gap-1.5 my-2 bg-gradient-to-sm from-indigo-50/60 to-purple-50/40 p-3 rounded-xl border border-indigo-100'>
                  <div className="flex items-center gap-1 text-xs text-indigo-600 uppercase">
                    <Sparkles size={12} className="animate-pulse" />
                    <span>AI Suggestions</span>
                  </div>
                  
                  {loadingAi ? (
                    <span className="text-[11px] text-slate-400 italic">Thinking of suggestions...</span>
                  ) : (
                    <div className="flex flex-col gap-1 max-h-[100px] overflow-y-auto pr-1">
                      {sgTasks.map((task, idx) => (
                        <button
                          type="button"
                          key={idx}
                          className='text-left text-xs text-slate-600 bg-white hover:bg-indigo-50 hover:text-indigo-600 border border-slate-200/60 px-2 py-1 rounded-md transition-all truncate w-full'
                          onClick={() => setTitle(task)}
                        >
                          {task}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
              
              {/* Status Selector */}
              <div className="flex items-center justify-between text-xs bg-slate-50 p-2 rounded-lg border border-slate-100 my-1">
                <span className="font-semibold text-slate-500">Initial Status</span>
                <select 
                  className="bg-transparent font-bold text-slate-700 outline-none cursor-pointer" 
                  value={status} 
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="todo">Todo</option>
                  <option value="in_progress">In Progress</option>
                  <option value="done">Done</option>
                </select>
              </div>
              
              <Button 
                size="sm"
                className="w-full mt-2 bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs rounded-lg"
                onClick={handleCreateSubTask}
                disabled={createSubTask.isPending}
              >
                {createSubTask.isPending ? "Creating..." : "Confirm"}
              </Button>
            </div>
          )}
        </div>
      </div>
      
      {/* Subtasks Item List */}
      <div className={styles.listSubTask}>
        {subTasks.length > 0 ? (
          subTasks.map(st => {
            const isDone = st.status === "done";
            return (
              <div key={st.subtask_id} className="flex items-center justify-between bg-white px-3 py-2.5 rounded-lg border border-slate-200/60 shadow-2xs group/item">
                <div className="flex items-center gap-2.5 min-w-0">
                  {isDone ? (
                    <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0" />
                  ) : (
                    <Circle size={16} className="text-slate-300 flex-shrink-0" />
                  )}
                  <span className={`text-sm text-slate-700 font-medium truncate ${isDone ? "line-through text-slate-400 font-normal" : ""}`}>
                    {st.title}
                  </span>
                </div>
                
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                  st.status === "done" ? "bg-emerald-50 text-emerald-600" :
                  st.status === "in_progress" ? "bg-amber-50 text-amber-600" : "bg-slate-100 text-slate-500"
                }`}>
                  {st.status.replace('_', ' ')}
                </span>
              </div>
            )
          })
        ) : (
          <div className="text-center py-4 text-xs font-medium text-slate-400 border border-dashed border-slate-200/80 rounded-xl bg-slate-50/50">
            No subtasks yet. Click + to add.
          </div>
        )}
      </div>
    </div>
  )
}

export default SubTaskList