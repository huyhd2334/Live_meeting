import React, { useEffect, useState } from 'react'
import styles from './subSideBar.module.css'
import { ClipboardCheck, Cpu, FolderGit2, CheckCircle2, Clock, AlertCircle, Goal } from 'lucide-react'
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts'
import { useDashBoard } from '@/hooks/useDashBoard'

const DashBoard = ({ userAccount = { user_name: "User" } }) => {
  const { getTaskDashBoard, getProjectDashBoard } = useDashBoard()
  
  const [projects, setProjects] = useState([])
  const [tasksList, setTasksList] = useState([])
  const [loading, setLoading] = useState(true) // Thêm trạng thái loading
  const [taskStats, setTaskStats] = useState({
    count_tasks: 0,
    count_done: 0,
    count_todo: 0,
    count_inprogress: 0,
    count_unComplete: 0
  })

  const tokenUsageData = [
    { name: 'T2', tokens: 2400 },
    { name: 'T3', tokens: 1398 },
    { name: 'T4', tokens: 9800 },
    { name: 'T5', tokens: 3908 },
    { name: 'T6', tokens: 4800 },
    { name: 'T7', tokens: 3800 },
    { name: 'CN', tokens: 4300 },
  ]

  // Sử dụng async/await bên trong useEffect để giải quyết Promise
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        
        // Đợi Promise từ hook giải quyết xong (chú ý thêm await nếu hook gọi trực tiếp service)
        const taskRes = await getTaskDashBoard()
        const projectRes = await getProjectDashBoard()

        if (taskRes) {
          setTaskStats({
            count_tasks: taskRes.count_tasks || 0,
            count_done: taskRes.count_done || 0,
            count_todo: taskRes.count_todo || 0,
            count_inprogress: taskRes.count_inprogress || 0,
            count_unComplete: taskRes.count_unComplete || 0
          })
          setTasksList(taskRes.tasks || [])
        }

        if (projectRes && projectRes.projects) {
          setProjects(projectRes.projects)
        }
      } catch (error) {
        console.error("Lỗi khi fetch dữ liệu dashboard:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const taskPieData = [
    { name: 'Done', value: taskStats.count_done, color: '#10B981' }, 
    { name: 'In progress', value: taskStats.count_inprogress, color: '#3B82F6' },       
    { name: 'To Do', value: taskStats.count_todo, color: '#64748B' },   
  ]

  const formatUpdateDate = (dateString) => {
    if (!dateString) return 'Vừa xong';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { hour: '2-digit', minute: '2-digit' });
  }

  // Nếu đang đợi giải quyết Promise từ API, hiển thị màn hình chờ
  if (loading) {
    return <div className='flex justify-center items-center h-screen text-slate-500 font-medium'>Đang tải dữ liệu dashboard...</div>
  }

  return (
    <div className='flex flex-col space-y-8 p-6 max-w-7xl mx-auto w-full text-[#1e293b] box-border'>
      
      <div className='flex flex-col justify-start items-start space-y-1'>
        <div className='flex items-center gap-3'>
          <h1 className={`${styles.headerTitle} text-3xl font-bold tracking-tight text-slate-900`}>
            Welcome back, {userAccount.user_name}
          </h1>
          <Goal size={32} className="text-indigo-500 animate-pulse" />
        </div>
        <p className={`${styles.note} text-sm text-slate-500`}>
          Here's a snapshot of your project performance and operations today.
        </p>
      </div>
      
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className={`${styles.widget} bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between`}>
          <div className='flex justify-between items-center text-slate-500 font-medium mb-3 gap-2'>
            <span className='text-sm'>Tasks Summary</span>
            <ClipboardCheck className='w-5 h-5 text-indigo-500' />
          </div>
          <div className='flex justify-between items-end'>
            <div>
              <span className='text-3xl font-bold text-slate-800'>{taskStats.count_tasks}</span>
              <p className='text-xs text-slate-400 mt-1'>Total tasks</p>
            </div>
            <div className='text-right text-xs space-y-1 font-medium'>
              <div className='text-emerald-600 flex items-center gap-1'>
                <CheckCircle2 className='w-3 h-3'/> Hoàn thành: {taskStats.count_done}
              </div>
              <div className='text-amber-600 flex items-center gap-1'>
                <Clock className='w-3 h-3'/> Chưa hoàn thành: {taskStats.count_unComplete}
              </div>
            </div>
          </div>
        </div>

        <div className={`${styles.widget} bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between`}>
          <div className='flex justify-between items-center text-slate-500 font-medium mb-3 gap-2'>
            <span className='text-sm'>RAG Token Usage</span>
            <Cpu className='w-5 h-5 text-emerald-500' />
          </div>
          <div className='flex justify-between items-end'>
            <div>
              <span className='text-3xl font-bold text-slate-800'>30.6k</span>
              <p className='text-xs text-slate-400 mt-1'>Tokens sử dụng hôm nay</p>
            </div>
            <span className='text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md'>
              -12% yesterday
            </span>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <div className='bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex flex-col'>
          <h3 className='text-base font-semibold text-slate-800 mb-4'>Trạng thái công việc</h3>
          <div className='h-64 w-full flex items-center justify-center'>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={taskPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {taskPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className='bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex flex-col'>
          <h3 className='text-base font-semibold text-slate-800 mb-4'>Lượng Token RAG đã sử dụng tuần này</h3>
          <div className='h-64 w-full'>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={tokenUsageData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip cursor={{fill: '#f8fafc'}}/>
                <Bar dataKey="tokens" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <div className='bg-white p-5 rounded-xl border border-slate-100 shadow-sm'>
          <div className='flex items-center gap-2 mb-4'>
            <FolderGit2 className='w-5 h-5 text-indigo-500' />
            <h3 className='text-base font-semibold text-slate-800'>Recent Project</h3>
          </div>
          <div className='divide-y divide-slate-100 max-h-80 overflow-y-auto'>
            {projects.length > 0 ? (
              projects.map((project, idx) => (
                <div key={project.project_id ? `${project.project_id}-${idx}` : idx} className='py-3 flex justify-between items-center hover:bg-slate-50 px-2 rounded-lg transition-colors cursor-pointer'>
                  <div>
                    <h4 className='text-sm font-medium text-slate-700'>{project.project_name}</h4>
                    <span className='text-xs text-slate-400'>Cập nhật: {formatUpdateDate(project.updated_at)}</span>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize ${
                    project.status === 'active' || project.status === 'Active' ? 'bg-emerald-50 text-emerald-700' :
                    project.status === 'completed' || project.status === 'Completed' ? 'bg-blue-50 text-blue-700' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {project.status || 'Active'}
                  </span>
                </div>
              ))
            ) : (
              <p className='text-xs text-slate-400 py-4 text-center'>Không có dự án nào.</p>
            )}
          </div>
        </div>

        <div className='bg-white p-5 rounded-xl border border-slate-100 shadow-sm'>
          <div className='flex items-center gap-2 mb-4'>
            <AlertCircle className='w-5 h-5 text-rose-500' />
            <h3 className='text-base font-semibold text-slate-800'>Tasks List</h3>
          </div>
          <div className='space-y-3 max-h-80 overflow-y-auto'>
            {tasksList.length > 0 ? (
              tasksList.map((task, idx) => (
                <div key={task.task_id || idx} className='p-3 border border-slate-100 rounded-lg flex items-start justify-between hover:border-slate-200 transition-all'>
                  <div className='flex flex-col gap-1'>
                    <span className='text-sm font-medium text-slate-700'>{task.title}</span>
                    <span className='text-xs text-slate-400 line-clamp-1'>{task.description || 'Không có mô tả'}</span>
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                    task.status === 'todo' ? 'bg-slate-100 text-slate-600' :
                    task.status === 'inprogress' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'
                  }`}>
                    {task.status || 'To do'}
                  </span>
                </div>
              ))
            ) : (
              <p className='text-xs text-slate-400 py-4 text-center'>Không có công việc nào được giao.</p>
            )}
          </div>
        </div>
      </div>

    </div>
  )
}

export default DashBoard