import React, { useEffect, useState } from 'react'
import styles from '../subSideBar.module.css'
import { useWorkSpace } from '@/hooks/useWorkSpace'
import CreateWSInterFace from './CreateWSInterFace.jsx'
import { Button } from '@/components/ui/button'
import { Plus, Target, Trash2, Waypoints } from 'lucide-react'
import AddMemberWSInterFace from './AddMemberWSInterFace'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'

const WorkSpace = ({ userAccount }) => {
  const [content, setContent] = useState([])
  const { getUserWorkSpace, deleteWorkSpace, loading } = useWorkSpace()
  const [dataWorkSpace, setDataWorkSpace] = useState({})
  const [mode, setMode] = useState("view")
  const navigate = useNavigate()

  const fetchData = async () => {
    const data = await getUserWorkSpace()
    setContent(data || [])
  }

  useEffect(() => {
    fetchData()
  }, [mode])

  const handleDelete = async (workspace_id) => {
    await deleteWorkSpace(workspace_id)
    await fetchData() 
  }
  
  const handleWidgetClick = async (workspace_id, workspace_name) => {
    if (typeof workspace_id === "number") {
      navigate(`/homepage/project/${workspace_id}`, { state: { workspace_name } })
    } else {
      toast.error(`Cannot access this workspace ${workspace_id}`)
    }
  }

  let contentUI
  if (mode === "create") {
    contentUI = <CreateWSInterFace setMode={setMode} />
  } else if (mode === "addMember") {
    contentUI = <AddMemberWSInterFace setMode={setMode} dataWorkSpace={dataWorkSpace} />
  }

  return (
    <div className='flex flex-col space-y-6 p-8 max-w-7xl mx-auto w-full box-border'>
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-100">
        <div className='flex items-center gap-3'>
          <Waypoints className='text-indigo-600' size={36} /> 
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Your Workspaces</h1>
        </div>
        
        <button 
          type="button"
          className={`${styles.button} ${mode === "create" ? styles.buttonCancel : styles.buttonCreate}`}
          onClick={() => setMode(prev => prev === "create" ? "view" : "create")}
        >
          {mode === "create" ? "Cancel Process" : "+ New Workspace"} 
        </button>
      </div>

      {/* Sub Header Status */}
      <div className="flex items-center gap-2 text-slate-500 font-medium text-2xl">
        <Target size={18} className="text-slate-400" />
        <span>Workspace Overview</span>
      </div>

      {/* Main Container */}
      <div className={styles.mainContainer}>
        {mode === "create" || mode === "addMember" ? (
          <div className="w-full bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
            {contentUI}
          </div>
        ) : (
          loading ? (
            <div className="w-full py-12 text-center text-slate-400 font-medium">
              Loading workspaces...
            </div>
          ) : content.length !== 0 ? (
            content.map((ws, idx) => (
              <div 
                key={ws.workspace_id} 
                className={styles.widget} 
                onClick={() => handleWidgetClick(ws.workspace_id, ws.workspace_name)}
              >
                {/* Card Top / Header */}
                <div className='flex flex-row justify-between items-start w-full mb-3'>
                  <span className="text-xs font-bold tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md uppercase">
                    WS #{idx + 1}
                  </span>
                  
                  {ws.role === "admin" && (
                    <div className='flex items-center gap-1.5' onClick={(e) => e.stopPropagation()}>
                      <Button 
                        variant="ghost" 
                        className="w-8 h-8 p-0 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        onClick={() => handleDelete(ws.workspace_id)}
                      > 
                        <Trash2 size={16} /> 
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="w-8 h-8 p-0 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        onClick={() => {
                          setMode("addMember")
                          setDataWorkSpace({ "workspace_id": ws.workspace_id, "workspace_name": ws.workspace_name })
                        }}
                      > 
                        <Plus size={16} /> 
                      </Button>
                    </div>
                  )}
                </div>

                {/* Card Info Details */}
                <div className="flex flex-col space-y-2 w-full mt-auto">
                  <h3 className="text-lg font-bold text-slate-800 line-clamp-1" title={ws.workspace_name}>
                    {ws.workspace_name}
                  </h3>
                  
                  <div className="flex flex-col gap-1 text-xs text-slate-500 font-medium">
                    <div className="flex justify-between border-t border-slate-50 pt-1.5">
                      <span>ID:</span>
                      <span className="text-slate-700 font-mono">{ws.workspace_id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Role:</span>
                      <span className={`capitalize font-semibold ${ws.role === 'admin' ? 'text-emerald-600' : 'text-amber-600'}`}>
                        {ws.role}
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            ))
          ) : (
            <div className="w-full py-12 text-center text-slate-400 font-medium bg-white rounded-xl border border-dashed border-slate-200">
              No workspace found. Create one to get started!
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default WorkSpace