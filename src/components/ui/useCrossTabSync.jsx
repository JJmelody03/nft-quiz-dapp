import { useEffect } from "react";

/**
 * Syncs a localStorage key across tabs and when the tab regains focus.
 * @param {string} key - The localStorage key to watch.
 * @param {function} onChange - Callback when the value changes.
 */
export function useCrossTabSync(key, onChange) {
  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === key) {
        onChange(e.newValue);
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        const currentValue = localStorage.getItem(key);
        onChange(currentValue);
      }
    };

    window.addEventListener("storage", handleStorage);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("storage", handleStorage);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [key, onChange]);
}
