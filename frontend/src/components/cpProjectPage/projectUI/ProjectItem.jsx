import { Button } from '@/components/ui/button'
import styles from './projectUI.module.css'
import TaskItem from './TaskItem'

const ProjectItem = ({ project }) => {
  return (
    <div className={styles.mainProject}>
      <div className={styles.headerProject}>
        <b>Name: {project.project_name}</b>
        <span className="ml-2 underline">
          Status: {project.project_status}
        </span>
        <Button className="bg-blue-500">+ New Task</Button>
      </div>

      <div className="ml-6 mt-3 space-y-4">
        {project.tasks.map(task => (
          <TaskItem key={task.task_id} task={task} />
        ))}
      </div>
    </div>
  )
}

export default ProjectItem