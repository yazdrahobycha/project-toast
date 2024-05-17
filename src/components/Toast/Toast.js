import React, { useContext, useEffect } from "react";
import { ToastContext } from "../ToastProvider/ToastProvider";
import {
  AlertOctagon,
  AlertTriangle,
  CheckCircle,
  Info,
  X,
} from "react-feather";

import VisuallyHidden from "../VisuallyHidden";

import styles from "./Toast.module.css";

const ICONS_BY_VARIANT = {
  notice: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  error: AlertOctagon,
};

function Toast({ id, variant, children }) {
  if (!ICONS_BY_VARIANT[variant]) {
    throw new Error("Invalid toast variant provided");
  }
  const { dismissToastItem } = useContext(ToastContext);

  useEffect(() => {
    const timeout = setTimeout(() => {
      dismissToastItem(id);
    }, 5000);
    return () => clearTimeout(timeout);
  }, []);

  const ToastIcon = ICONS_BY_VARIANT[variant];
  return (
    <div className={`${styles.toast} ${styles[variant]}`}>
      <div className={styles.iconContainer}>
        <ToastIcon size={24} />
      </div>
      <p className={styles.content}>
        <VisuallyHidden>{variant}</VisuallyHidden>
        {children}
      </p>
      <button
        onClick={() => dismissToastItem(id)}
        className={styles.closeButton}
      >
        <X aria-live="off" aria-label="Dismiss message" size={24} />
      </button>
    </div>
  );
}

export default Toast;
