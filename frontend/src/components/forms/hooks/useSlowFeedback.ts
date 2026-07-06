import { useEffect, useState } from "react";

export function useSlowFeedback(isActive: boolean, delay = 1000) {
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(
      () => {
        setShouldShow(isActive);
      },
      isActive ? delay : 0,
    );

    return () => clearTimeout(timeoutId);
  }, [isActive, delay]);

  return isActive && shouldShow;
}
