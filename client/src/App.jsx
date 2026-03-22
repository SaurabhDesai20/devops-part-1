'use client';

import { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import AddTaskDialog from './components/AddTaskDialog';
import LoadingSpinner from './components/LoadingSpinner';
import ThemeToggle from './components/ThemeToggle';
import { taskService } from './services/taskService';
import { readStoredTheme, applyDocumentTheme } from './utils/theme';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [theme, setTheme] = useState(readStoredTheme);

  useEffect(() => {
    applyDocumentTheme(theme);
  }, [theme]);

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await taskService.getAllTasks();
      setTasks(response.data);
    } catch (err) {
      setError('Failed to fetch tasks. Please try again.');
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (taskData) => {
    try {
      const response = await taskService.createTask(taskData);
      setTasks((prevTasks) => [response.data, ...prevTasks]);
      setIsDialogOpen(false);
      return { success: true };
    } catch (err) {
      console.error('Error creating task:', err);
      return {
        success: false,
        error: err.message || 'Failed to create task',
      };
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await taskService.deleteTask(taskId);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (err) {
      setError('Failed to delete task. Please try again.');
      console.error('Error deleting task:', err);
    }
  };

  const handleUpdateTask = async (taskData) => {
    if (!editingTask) {
      return { success: false, error: 'No task selected' };
    }
    try {
      const response = await taskService.updateTask(editingTask._id, taskData);
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === editingTask._id ? response.data : task))
      );
      setEditingTask(null);
      return { success: true };
    } catch (err) {
      console.error('Error updating task:', err);
      return {
        success: false,
        error: err.message || 'Failed to update task',
      };
    }
  };

  const handleRetry = () => {
    fetchTasks();
  };

 let sd = "sample var"

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-50 to-slate-200/90 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Header */}
      <header className="border-b border-gray-200/80 bg-white/90 shadow-[0_1px_0_rgba(15,23,42,0.04),0_12px_32px_-8px_rgba(15,23,42,0.12)] backdrop-blur-sm dark:border-slate-700/80 dark:bg-slate-900/90 dark:shadow-[0_1px_0_rgba(0,0,0,0.2),0_12px_32px_-8px_rgba(0,0,0,0.45)]">
        <div className="mx-auto max-w-4xl px-4 py-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
                Task Manager
              </h1>
              <p className="mt-1 text-[15px] text-gray-600 dark:text-gray-400">
                Simple task management for DevOps demo
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setEditingTask(null);
                  setIsDialogOpen(true);
                }}
                className="shrink-0 rounded-xl bg-gray-900 px-6 py-2.5 font-semibold text-white shadow-md shadow-gray-900/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-gray-800 hover:shadow-lg hover:shadow-gray-900/30 active:translate-y-0 active:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 focus:ring-offset-gray-50 dark:bg-white dark:text-gray-900 dark:shadow-black/30 dark:hover:bg-gray-100 dark:focus:ring-white dark:focus:ring-offset-slate-900"
              >
                Add Task
              </button>
              <ThemeToggle
                theme={theme}
                onToggle={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 pb-16">
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="text-center py-12">
            <div className="mx-auto max-w-md rounded-xl border border-red-200/80 bg-red-50 p-6 shadow-lg shadow-red-900/5 ring-1 ring-red-900/5 dark:border-red-900/50 dark:bg-red-950/40 dark:shadow-red-950/20 dark:ring-red-900/30">
              <div className="mb-4 text-red-600 dark:text-red-400">
                <svg
                  className="w-12 h-12 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-medium text-red-800 dark:text-red-300">Error</h3>
              <p className="mb-4 text-red-700 dark:text-red-200/90">{error}</p>
              <button
                type="button"
                onClick={handleRetry}
                className="rounded-lg bg-red-600 px-4 py-2.5 font-semibold text-white shadow-md shadow-red-900/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-red-700 hover:shadow-lg active:translate-y-0"
              >
                Try Again
              </button>
            </div>
          </div>
        ) : (
          <TaskList
            tasks={tasks}
            onDeleteTask={handleDeleteTask}
            onEditTask={(task) => {
              setIsDialogOpen(false);
              setEditingTask(task);
            }}
          />
        )}
      </main>

      {/* Add Task Dialog */}
      {isDialogOpen && (
        <AddTaskDialog onClose={() => setIsDialogOpen(false)} onSubmit={handleAddTask} />
      )}

      {editingTask && (
        <AddTaskDialog
          key={editingTask._id}
          taskToEdit={editingTask}
          onClose={() => setEditingTask(null)}
          onSubmit={handleUpdateTask}
        />
      )}
    </div>
  );
}

export default App;
