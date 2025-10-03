import { useState } from 'react';

interface ToastHook {
  toast: string | null;
  addToast: (message: string) => void;
}

const useToast = (): ToastHook => {
  const [toast, setToast] = useState<string | null>(null);

  const addToast = (message: string): void => {
    setToast(message);
  };

  return {
    toast,
    addToast,
  };
};

export default useToast;