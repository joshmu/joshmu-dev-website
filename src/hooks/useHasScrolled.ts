import { useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";

/** Whether the page has scrolled away from the top. Re-renders only when that flips. */
export const useHasScrolled = () => {
  const { scrollYProgress } = useScroll();
  const [hasScrolled, setHasScrolled] = useState(() => scrollYProgress.get() > 0);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (!hasScrolled && progress > 0) {
      setHasScrolled(true);
    } else if (hasScrolled && progress === 0) {
      setHasScrolled(false);
    }
  });

  return hasScrolled;
};
