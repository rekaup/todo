import '../styles/components/TaskCounter.css'

export default function AppTaskCounter({ activeCount, completedCount, progressPercent }) {
  return (
    <div className="task-counter flex-column">
      <div className='task-container flex'>
        <div className="active-tasks-container flex">
          <span className="active-tasks">{activeCount}</span>
          <span className="task-count">progress</span>
        </div>
        <div className="completed-tasks-container flex">
          <span className="completed-tasks">{completedCount}</span>
          <span className="task-count">done</span>
        </div>
      </div>
      <div className='progress-bar'>
        <div className='progress-fill' style={{width: `${progressPercent}%`}}>
        </div>
      </div>
    </div>
  )
}