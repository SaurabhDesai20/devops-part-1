"use client";

import { useState } from "react";
import { formatDate } from "../utils/dateUtils";

const TaskCard = ({ task, onEdit, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setIsDeleting(true);
      try {
        await onDelete(task._id);
      } catch (error) {
        console.error("Error deleting task:", error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="rounded-xl border border-gray-200/90 bg-white p-6 shadow-[0_2px_8px_rgba(15,23,42,0.06),0_12px_28px_-6px_rgba(15,23,42,0.12)] ring-1 ring-gray-900/[0.04] transition-all duration-200 hover:-translate-y-0.5 hover:border-gray-200 hover:shadow-[0_8px_24px_rgba(15,23,42,0.1),0_20px_40px_-12px_rgba(15,23,42,0.14)] dark:border-slate-700/90 dark:bg-slate-800/90 dark:shadow-[0_2px_8px_rgba(0,0,0,0.35),0_12px_28px_-6px_rgba(0,0,0,0.45)] dark:ring-white/[0.06] dark:hover:border-slate-600 dark:hover:shadow-[0_8px_24px_rgba(0,0,0,0.45),0_20px_40px_-12px_rgba(0,0,0,0.35)]">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="mb-2 break-words text-lg font-semibold tracking-tight text-gray-900 dark:text-gray-50">
            {task.title}
          </h3>
          <p className="mb-3 break-words text-[15px] leading-relaxed text-gray-600 dark:text-gray-300">
            {task.description}
          </p>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-500">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Created {formatDate(task.createdAt)}
          </div>
        </div>

        <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-start">
          <button
            type="button"
            onClick={() => onEdit(task)}
            className="rounded-xl bg-blue-50 p-2.5 text-blue-600 shadow-sm shadow-blue-900/5 ring-1 ring-blue-200/60 transition-all duration-200 hover:-translate-y-px hover:bg-blue-100 hover:text-blue-700 hover:shadow-md hover:shadow-blue-900/10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-950/40 dark:text-blue-400 dark:ring-blue-900/50 dark:hover:bg-blue-900/35 dark:hover:text-blue-300 dark:focus:ring-offset-slate-800"
            title="Edit task"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            className="rounded-xl bg-red-50 p-2.5 text-red-600 shadow-sm shadow-red-900/5 ring-1 ring-red-200/60 transition-all duration-200 hover:-translate-y-px hover:bg-red-100 hover:text-red-700 hover:shadow-md hover:shadow-red-900/10 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 dark:bg-red-950/50 dark:text-red-400 dark:ring-red-900/50 dark:hover:bg-red-900/40 dark:hover:text-red-300 dark:focus:ring-offset-slate-800"
            title="Delete task"
          >
            {isDeleting ? (
              <svg
                className="w-5 h-5 animate-spin"
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
            ) : (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
