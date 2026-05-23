import { Button } from '@/components/ui/button'

const SubTaskList = ({ subTasks }) => {
  if (!subTasks.length) return null

  return (
    <div className="ml-6 mt-2 text-sm">
      <div className='flex space-x-2 items-center'>
        <span>SubTasks:</span>
        <Button className="bg-white text-black size-0.5"> + </Button>
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