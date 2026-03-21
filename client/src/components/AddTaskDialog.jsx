'use client';

import { useState, useEffect } from 'react';

const AddTaskDialog = ({ onClose, onSubmit, taskToEdit = null }) => {
  const isEdit = Boolean(taskToEdit);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (taskToEdit) {
      setFormData({
        title: taskToEdit.title ?? '',
        description: taskToEdit.description ?? '',
      });
    } else {
      setFormData({ title: '', description: '' });
    }
    setError(null);
  }, [taskToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.title.trim() || !formData.description.trim()) {
      setError('Both title and description are required');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const result = await onSubmit({
        title: formData.title.trim(),
        description: formData.description.trim(),
      });

      if (result.success) {
        // Dialog will be closed by parent component
      } else {
        setError(result.error || (isEdit ? 'Failed to update task' : 'Failed to create task'));
      }
    } catch (err) {
      console.log(err);

      setError('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/45 p-4 backdrop-blur-[2px] dark:bg-black/55"
      onClick={handleBackdropClick}
    >
      <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl border border-gray-200/80 bg-white shadow-[0_24px_64px_-12px_rgba(15,23,42,0.35),0_12px_24px_-8px_rgba(15,23,42,0.12)] ring-1 ring-gray-900/5 dark:border-slate-600/80 dark:bg-slate-800 dark:shadow-[0_24px_64px_-12px_rgba(0,0,0,0.65),0_12px_24px_-8px_rgba(0,0,0,0.4)] dark:ring-white/10">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 p-6 dark:border-slate-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {isEdit ? 'Edit Task' : 'Add New Task'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 transition-colors duration-200 hover:text-gray-600 dark:text-slate-500 dark:hover:text-slate-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-4 rounded-md border border-red-200 bg-red-50 p-3 dark:border-red-900/60 dark:bg-red-950/40">
              <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
            </div>
          )}

          <div className="mb-4">
            <label
              htmlFor={isEdit ? 'edit-task-title' : 'task-title'}
              className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Task Title *
            </label>
            <input
              type="text"
              id={isEdit ? 'edit-task-title' : 'task-title'}
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter task title..."
              maxLength={100}
              className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm transition-colors duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-900 dark:text-gray-100 dark:placeholder:text-slate-500 dark:focus:border-blue-400 dark:focus:ring-blue-400"
              disabled={isSubmitting}
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-slate-500">
              {formData.title.length}/100 characters
            </p>
          </div>

          <div className="mb-6">
            <label
              htmlFor={isEdit ? 'edit-task-description' : 'task-description'}
              className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Description *
            </label>
            <textarea
              id={isEdit ? 'edit-task-description' : 'task-description'}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter task description..."
              rows={4}
              maxLength={500}
              className="w-full resize-none rounded-md border border-gray-300 px-3 py-2 shadow-sm transition-colors duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-900 dark:text-gray-100 dark:placeholder:text-slate-500 dark:focus:border-blue-400 dark:focus:ring-blue-400"
              disabled={isSubmitting}
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-slate-500">
              {formData.description.length}/500 characters
            </p>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-lg bg-gray-100 px-4 py-2.5 font-semibold text-gray-700 shadow-sm shadow-gray-900/5 ring-1 ring-gray-200/80 transition-all duration-200 hover:bg-gray-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 dark:bg-slate-700 dark:text-gray-200 dark:ring-slate-600 dark:hover:bg-slate-600 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !formData.title.trim() || !formData.description.trim()}
              className="flex items-center rounded-lg bg-blue-600 px-4 py-2.5 font-semibold text-white shadow-md shadow-blue-900/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 dark:focus:ring-blue-400 dark:focus:ring-offset-slate-800"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="w-4 h-4 mr-2 animate-spin"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  {isEdit ? 'Saving...' : 'Creating...'}
                </>
              ) : isEdit ? (
                'Save changes'
              ) : (
                'Create Task'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskDialog;
