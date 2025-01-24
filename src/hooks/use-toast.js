import { useState } from "react";

export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = ({ title, description, variant = "default" }) => {
    setToasts((prev) => [...prev, { title, description, variant, id: Date.now() }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== toasts[0].id));
    }, 3000);
  };

  return {
    toast: addToast,
    toasts,
  };
};
