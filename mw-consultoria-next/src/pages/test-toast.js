import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TestToast() {
  const handleClick = () => {
    toast.success("Teste de notificação funcionando!");
  };

  return (
    <div>
      <h1>Teste de Toast</h1>
      <button onClick={handleClick}>Mostrar Toast</button>
      <ToastContainer />
    </div>
  );
}
