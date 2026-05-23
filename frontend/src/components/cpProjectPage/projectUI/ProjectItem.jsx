import { Button } from '@/components/ui/button'
import styles from './projectUI.module.css'
import TaskItem from './TaskItem'

const ProjectItem = ({ project }) => {
  return (
    <div className={styles.mainProject}>
      <div className={styles.headerProject}>
        <span>Project Name: {project.project_name}</span>
        <span className="underline">
          Status: {project.project_status}
        </span>
        <Button className="bg-white text-sm px-2 py-1 h-7 text-black">
          + Task
        </Button>      
      </div>
      <div className="space-y-4">
        {project.tasks.map(task => (
          <TaskItem key={task.task_id} task={task} />
        ))}
      </div>
    </div>
  )
}

export default ProjectItem