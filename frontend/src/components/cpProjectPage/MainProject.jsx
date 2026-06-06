import { useMemo } from 'react'
import styles from './projectUI.module.css'
import { useWorkSpace } from '@/hooks/useWorkSpace.js'
import ProjectItem from './ProjectItem.jsx'
import SideBarProject from './SideBarProject.jsx'

const MainProject = ({ id, workspace_name }) => {
  const { getWorkspaceFull } = useWorkSpace(id)

  const tree = useMemo(() => {
    const rows = getWorkspaceFull?.data || []
    const projectMap = new Map()

    rows.forEach(row => {
      let project = projectMap.get(row.project_id)

      if (!project) {
        project = {
          project_id: row.project_id,
          project_name: row.project_name,
          project_description: row.project_description,
          project_status: row.project_status,
          tasks: []
        }

        projectMap.set(row.project_id, project)
      }

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
          comments: [],
          attachments: []
        }

        project.tasks.push(task)
      }

      if (
        row.subtask_id &&
        !task.subTasks.find(st => st.subtask_id === row.subtask_id)
      ) {
        task.subTasks.push({
          subtask_id: row.subtask_id,
          title: row.subtask_title,
          status: row.subtask_status
        })
      }

      if (
        row.comment_id &&
        !task.comments.find(c => c.comment_id === row.comment_id)
      ) {
        task.comments.push({
          comment_id: row.comment_id,
          content: row.comment_content,
          user_id: row.comment_user_id,
          created_at: row.comment_created_at
        })
      }

      if (
        row.attachment_id &&
        !task.attachments.find(a => a.attachment_id === row.attachment_id)
      ) {
        task.attachments.push({
          attachment_id: row.attachment_id,
          file_url: row.file_url,
          uploaded_by: row.uploaded_by
        })
      }
    })

    return Array.from(projectMap.values())
  }, [getWorkspaceFull.data])

  if (getWorkspaceFull.isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className={`${styles.layOut} flex-1`}>
      <SideBarProject
        id={id}
        workspace_name={workspace_name}
      />
      <div className={styles.Project}>
        {tree.length === 0 ? (
              <h2 className={styles.subTitle}>
                No project found
              </h2>
            ) : (
              tree.map(project => (
                <ProjectItem
                  key={project.project_id}
                  project_id={project.project_id}
                  project={project}
                  workspace_id={id}
                />
              ))
          )}
      </div>
    </div>
  )
}

export default MainProject