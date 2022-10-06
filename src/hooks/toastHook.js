import { useState } from 'react';

const toastHook = () => {
  const [toast, setToast] = useState(null);

  const addToast = message => {
    setToast(message);
  };

  return {
    toast,
    addToast,
  };
};

export default toastHook;
