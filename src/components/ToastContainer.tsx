import React from 'react';
import { useApp } from '../context/AppContext';
import { BowIcon } from './DecorativeElements';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 max-w-sm pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="pointer-events-auto bg-[#382D28] text-[#FAF4EC] border border-[#9A8E89]/40 px-4 py-3 shadow-2xl flex items-center justify-between gap-3 text-sm animate-in fade-in slide-in-from-bottom-3 duration-300"
          role="status"
          aria-live="polite"
        >
          <div className="flex items-center gap-2.5">
            <BowIcon size={16} className="text-[#E3BEB8] flex-shrink-0" />
            <span className="font-sans-clean font-medium leading-tight">{t.message}</span>
          </div>
          <button
            onClick={() => removeToast(t.id)}
            className="text-[#D1ADA7] hover:text-[#FAF4EC] text-xs uppercase tracking-widest pl-2 transition-colors"
            aria-label="Close notification"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};
