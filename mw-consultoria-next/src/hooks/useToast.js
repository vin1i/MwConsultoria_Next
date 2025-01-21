// import { createContext, useContext, useState } from "react";

// const ToastContext = createContext();

// export const ToastProvider = ({ children }) => {
//   const [toasts, setToasts] = useState([]);

/*************  ✨ Codeium Command ⭐  *************/
  /**
   * Adds a toast to the list of toasts. If a duration is not provided in the toast object, it will be shown for 3 seconds.
   * @param {Object} toast
   * @param {string} toast.message - The text to be displayed in the toast
   * @param {string} [toast.duration] - The duration in ms for the toast to be shown. Defaults to 3000.
   */
/******  2fff21a6-a6ec-4d83-b9c2-faa0bccb51b7  *******/
//   const addToast = (toast) => {
//     setToasts((prev) => [...prev, toast]);
//     setTimeout(() => {
//       setToasts((prev) => prev.filter((t) => t !== toast));
//     }, toast.duration || 3000);
//   };

//   return (
//     <ToastContext.Provider value={{ toast: addToast }}>
//       {children}
//       <div className="fixed bottom-4 right-4 space-y-2 z-50">
//         {toasts.map((toast, index) => (
//           <div
//             key={index}
//             className="bg-gray-800 text-white px-4 py-2 rounded shadow-lg max-w-xs"
//           >
//             <strong>{toast.title}</strong>
//             {toast.description && <p className="text-sm">{toast.description}</p>}
//           </div>
//         ))}
//       </div>
//     </ToastContext.Provider>
//   );
// };

// export const useToast = () => {
//   const context = useContext(ToastContext);
//   if (!context) {
//     throw new Error("useToast must be used within a ToastProvider");
//   }
//   return context;
// };
