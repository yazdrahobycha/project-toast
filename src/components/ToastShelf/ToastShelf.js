import React, { useContext } from "react";

import Toast from "../Toast";
import { ToastContext } from "../ToastProvider/ToastProvider";
import styles from "./ToastShelf.module.css";

function ToastShelf() {
  const { toasts } = useContext(ToastContext);
  return (
    <ol
      role="region"
      aria-live="polite"
      aria-label="Notification"
      className={styles.wrapper}
    >
      {toasts.map((toastInfo) => {
        return (
          <li key={toastInfo.id} className={styles.toastWrapper}>
            <Toast id={toastInfo.id} variant={toastInfo.variant}>
              {toastInfo.message}
            </Toast>
          </li>
        );
      })}
    </ol>
  );
}

export default ToastShelf;
