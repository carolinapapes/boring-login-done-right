import { useEffect, useState } from "react";

export function useSlowFeedback(isActive: boolean, delay = 1000) {
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setShouldShow(isActive);
    }, delay);

    return () => window.clearTimeout(timeoutId);
  }, [isActive, delay]);

  return isActive && shouldShow;
}
