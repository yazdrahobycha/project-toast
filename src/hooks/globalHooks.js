import React, { useEffect } from "react";

export function useEscapeKey(callback) {
  useEffect(() => {
    function keydownHandler(e) {
      if (e.code !== "Escape") {
        return;
      }
      callback();
    }

    window.addEventListener("keydown", keydownHandler);

    return () => window.removeEventListener("keydown", keydownHandler);
  }, []);
}
