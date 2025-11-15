// components/Toast.tsx
import React from 'react';
import { ToastState } from '@/components/Trust-Islam/types/form';

interface ToastProps {
  state: Exclude<ToastState, null>;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ state, onClose }) => {
  const bg = state.type === "success" ? "bg-green-600" : 
              state.type === "error" ? "bg-red-600" : "bg-blue-600";
  
  return (
    <div className={`fixed right-4 top-6 z-[10000] rounded-lg shadow-lg text-white px-4 py-3 ${bg} animate-slide`}>
      <div className="flex items-start gap-3">
        <div className="font-semibold">
          {state.type === "success" ? "Success" : state.type === "error" ? "Error" : "Info"}
        </div>
        <div className="text-sm">{state.message}</div>
        <button className="ml-3 opacity-90" onClick={onClose}>✕</button>
      </div>
    </div>
  );
};

export default Toast;