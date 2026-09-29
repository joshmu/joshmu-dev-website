import { motion } from "framer-motion";

import { SECTION, scrollToSection } from "@/services/sections";
import { useCursorPointer } from "@/components/Cursor/Cursor";

export const BackToTop = () => {
  const cursorActions = useCursorPointer();

  const handleBackToTopClick = () => scrollToSection(SECTION.hero);

  return (
    <button aria-label="back to top">
      {/* back to top */}
      <motion.svg
        whileHover={{ scale: 1.3 }}
        onClick={handleBackToTopClick}
        {...cursorActions}
        className="w-4 h-4 mx-auto cursor-pointer"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </motion.svg>
    </button>
  );
};
