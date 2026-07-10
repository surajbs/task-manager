import { createContext, useCallback, useState } from "react";

import Toast from "../components/common/Toast/Toast";

export const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const hideToast = useCallback(() => {
    setToast((prev) => ({
      ...prev,
      show: false,
    }));
  }, []);

  const showToast = useCallback(
    (message, type = "success") => {
      setToast({
        show: true,
        message,
        type,
      });

      setTimeout(() => {
        hideToast();
      }, 3000);
    },
    [hideToast]
  );

  return (
    <ToastContext.Provider
      value={{
        showToast,
      }}
    >
      {children}

      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={hideToast}
      />
    </ToastContext.Provider>
  );
};