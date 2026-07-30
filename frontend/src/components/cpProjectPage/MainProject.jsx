import { useMemo, useState, useEffect } from 'react'
import styles from './projectUI.module.css'
import { useWorkSpace } from '@/hooks/useWorkSpace.js'
import ProjectItem from './ProjectItem.jsx'
import SideBarProject from './SideBarProject.jsx'

const MainProject = ({ id, workspace_name }) => {
  const { getWorkspaceFull } = useWorkSpace(id)
  
  const [rawData, setRawData] = useState([])

  useEffect(() => {
    if (getWorkspaceFull?.data) {
      setRawData(getWorkspaceFull.data)
    }
  }, [getWorkspaceFull?.data])

  const projectsTree = useMemo(() => {
    const projectMap = new Map()

    rawData.forEach(row => {
      if (!row.project_id) return

      // ===== 1. PROJECT =====
      let project = projectMap.get(row.project_id)
      if (!project) {
        project = {
          project_id: row.project_id,
          project_name: row.project_name,
          project_description: row.project_description,
          project_status: row.project_status,
          tasks: [],
          attachments: []
        }
        projectMap.set(row.project_id, project)
      }

      // ===== 2. PROJECT ATTACHMENTS =====
      if (
        row.attachment_id &&
        !project.attachments.some(a => a.attachment_id === row.attachment_id)
      ) {
        project.attachments.push({
          attachment_id: row.attachment_id,
          file_name: row.file_name,
          file_url: row.file_url,
          uploaded_by: row.uploaded_by
        })
      }

      // ===== 3. TASK =====
      if (!row.task_id) return

      let task = project.tasks.find(t => t.task_id === row.task_id)
      if (!task) {
        task = {
          task_id: row.task_id,
          title: row.task_title,
          description: row.task_description,
          status: row.task_status,
          priority: row.priority,
          deadline: row.deadline,
          assigned_to: row.assigned_to,
          subTasks: [],
          comments: []
        }
        project.tasks.push(task)
      }

      // ===== 4. SUBTASKS =====
      if (
        row.subtask_id &&
        !task.subTasks.some(st => st.subtask_id === row.subtask_id)
      ) {
        task.subTasks.push({
          subtask_id: row.subtask_id,
          title: row.subtask_title,
          status: row.subtask_status
        })
      }

      // ===== 5. COMMENTS =====
      if (
        row.comment_id &&
        !task.comments.some(c => c.comment_id === row.comment_id)
      ) {
        task.comments.push({
          comment_id: row.comment_id,
          content: row.comment_content,
          user_id: row.comment_user_id,
          created_at: row.comment_created_at
        })
      }
    })

    return Array.from(projectMap.values())
  }, [rawData])

  if (getWorkspaceFull?.isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  return (
    <div className={`${styles.layOut} flex-1`}>
      <div className='min-w-[300px]'>
        <SideBarProject
          id={id}
          workspace_name={workspace_name}
        />
      </div>

      <div className={styles.Project}>
        {projectsTree.length === 0 ? (
          <h2 className={styles.subTitle}>
            No project found
          </h2>
        ) : (
          projectsTree.map(project => (
            <ProjectItem
              key={project.project_id}
              project={project}
              setProjects={setRawData}
              workspace_id={id}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default MainProject