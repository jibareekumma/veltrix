import { createContext, useContext, useRef, useState } from "react";
import "../styles/components/Toast.scss";

const ToastContext = createContext(null);

export const ToastProvider = function ({ children }) {
  const [toast, setToast] = useState(null);
  const timerRef = useRef(null);

  const showToast = function (message, type = "success") {
    clearTimeout(timerRef.current);
    setToast({ message, type, id: Date.now() });
    timerRef.current = setTimeout(function () {
      setToast(null);
    }, 3200);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div key={toast.id} className={`toast toast--${toast.type}`} role="status">
          <span className="toast__dot"></span>
          {toast.message}
        </div>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = function () {
  return useContext(ToastContext);
};
