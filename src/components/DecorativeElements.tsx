import React from 'react';

export const BowIcon: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`inline-block ${className}`}
    aria-hidden="true"
  >
    {/* Delicate Coquette Bow Motif */}
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    <path d="M12 12 C9 7, 4 8, 5 12 C6 15, 10 13, 12 12 Z" fill="none" />
    <path d="M12 12 C15 7, 20 8, 19 12 C18 15, 14 13, 12 12 Z" fill="none" />
    <path d="M11 13.5 C9.5 17, 7 19.5, 6 20" />
    <path d="M13 13.5 C14.5 17, 17 19.5, 18 20" />
  </svg>
);

export const FloralMotif: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 22 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`inline-block ${className}`}
    aria-hidden="true"
  >
    {/* Fine botanical star/flower */}
    <circle cx="12" cy="12" r="1.2" fill="currentColor" />
    <path d="M12 5V8M12 16V19M5 12H8M16 12H19" />
    <path d="M7.05 7.05L9.17 9.17M14.83 14.83L16.95 16.95M7.05 16.95L9.17 14.83M14.83 9.17L16.95 7.05" />
  </svg>
);

export const DelicateDivider: React.FC<{
  icon?: 'bow' | 'flower' | 'heart' | 'dot';
  className?: string;
}> = ({ icon = 'flower', className = '' }) => {
  return (
    <div className={`bow-divider w-full max-w-xs mx-auto text-[#D1ADA7] dark:text-[#D1ADA7] ${className}`}>
      <span className="flex items-center justify-center">
        {icon === 'bow' && <BowIcon size={18} className="text-[#E3BEB8]" />}
        {icon === 'flower' && <FloralMotif size={16} className="text-[#D1ADA7]" />}
        {icon === 'heart' && <span className="text-xs text-[#E3BEB8]">♡</span>}
        {icon === 'dot' && <span className="w-1.5 h-1.5 rounded-full bg-[#D1ADA7] inline-block" />}
      </span>
    </div>
  );
};
