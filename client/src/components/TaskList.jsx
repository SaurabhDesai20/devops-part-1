import TaskCard from "./TaskCard";

const TaskList = ({ tasks, onDeleteTask, onEditTask }) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto max-w-md rounded-xl border border-gray-200/90 bg-white p-8 shadow-[0_2px_8px_rgba(15,23,42,0.06),0_16px_40px_-12px_rgba(15,23,42,0.12)] ring-1 ring-gray-900/[0.04] dark:border-slate-700/90 dark:bg-slate-800/90 dark:shadow-[0_2px_8px_rgba(0,0,0,0.35),0_16px_40px_-12px_rgba(0,0,0,0.45)] dark:ring-white/[0.06]">
          <div className="mb-4 text-gray-400 dark:text-slate-500">
            <svg
              className="w-16 h-16 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-gray-100">
            No tasks yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Get started by creating your first task!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
          Your Tasks ({tasks.length})
        </h2>
      </div>

      <div className="grid gap-5 max-w-3xl">
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onEdit={onEditTask}
            onDelete={onDeleteTask}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
