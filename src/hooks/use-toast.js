import { toast } from "sonner";

const useToast = () => {
  const showSuccess = (message) => {
    toast.success(message, {
      duration: 4000, // Duration in milliseconds
      position: "top-right", // You can use "top-left", "bottom-right", etc.
      theme: {
        primary: "#4caf50", // Success color
        secondary: "#ffffff", // Background color
      },
    });
  };

  const showError = (message) => {
    toast.error(message, {
      duration: 4000, // Duration in milliseconds
      position: "top-right",
      theme: {
        primary: "#f44336", // Error color
        secondary: "#ffffff",
      },
    });
  };

  const showInfo = (message) => {
    toast.info(message, {
      duration: 4000,
      position: "top-right",
      theme: {
        primary: "#2196f3", // Info color
        secondary: "#ffffff",
      },
    });
  };

  return { showSuccess, showError, showInfo };
};

export default useToast;
