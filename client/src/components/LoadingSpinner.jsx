const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="rounded-2xl border border-gray-200/90 bg-white/90 px-10 py-12 text-center shadow-[0_2px_8px_rgba(15,23,42,0.06),0_16px_40px_-12px_rgba(15,23,42,0.1)] ring-1 ring-gray-900/[0.04] backdrop-blur-sm dark:border-slate-700/90 dark:bg-slate-800/90 dark:shadow-[0_2px_8px_rgba(0,0,0,0.35),0_16px_40px_-12px_rgba(0,0,0,0.4)] dark:ring-white/[0.06]">
        <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-2 border-gray-200 border-t-gray-900 dark:border-slate-600 dark:border-t-amber-300" />
        <p className="text-[15px] font-medium text-gray-600 dark:text-gray-400">Loading tasks...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
