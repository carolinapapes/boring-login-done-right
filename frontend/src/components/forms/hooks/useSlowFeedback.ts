import { useEffect, useState } from "react";

export function useSlowFeedback(isActive: boolean, delay = 1000) {
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    const timeoutId = window.setTimeout(() => {
      setShouldShow(true);
    }, delay);

    return () => window.clearTimeout(timeoutId);
  }, [isActive, delay]);

  return isActive && shouldShow;
}
