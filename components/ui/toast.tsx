'use client';

import { useEffect, useState } from 'react';
import { FaExclamationCircle, FaTimes } from 'react-icons/fa';

interface ToastProps {
  message: string;
  type?: 'error' | 'warning' | 'success';
  onClose: () => void;
  duration?: number;
}

export function Toast({ message, type = 'error', onClose, duration = 5000 }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for fade out animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const bgColor = {
    error: 'bg-red-50 border-red-200 text-red-700',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-700',
    success: 'bg-green-50 border-green-200 text-green-700'
  }[type];

  return (
    <div
      className={`fixed top-4 right-4 z-50 p-4 rounded-lg border shadow-lg transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
      } ${bgColor}`}
    >
      <div className="flex items-center gap-3">
        <FaExclamationCircle className="h-5 w-5" />
        <p className="text-sm font-medium">{message}</p>
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
          }}
          className="ml-4 text-current hover:opacity-70"
        >
          <FaTimes className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
} 