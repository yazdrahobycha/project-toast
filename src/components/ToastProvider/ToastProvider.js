import React, { createContext, useEffect, useState } from "react";
export const ToastContext = createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  function clearAllToasts() {
    setToasts([]);
  }
  useEffect(() => {
    function clearOnEscape(e) {
      if (e.code !== "Escape") {
        return;
      }
      clearAllToasts();
    }

    window.addEventListener("keydown", clearOnEscape);

    return () => window.removeEventListener("keydown", clearOnEscape);
  }, []);

  function addToastItem(e, variant, message) {
    e.preventDefault();
    const newToast = {
      id: crypto.randomUUID(),
      variant,
      message,
    };
    setToasts([...toasts, newToast]);
  }

  function dismissToastItem(id) {
    setToasts((currentToasts) => {
      return currentToasts.filter((toastInfo) => {
        return toastInfo.id !== id;
      });
    });
  }

  return (
    <ToastContext.Provider value={{ toasts, addToastItem, dismissToastItem }}>
      {children}
    </ToastContext.Provider>
  );
}
export default ToastProvider;
