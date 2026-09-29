/**
 * @path /src/components/ThemeToggle/ThemeToggle.tsx
 *
 * @project joshmu-dev-website
 * @file ThemeToggle.tsx
 *
 * @author Josh Mu <hello@joshmu.dev>
 * @created Friday, 20th November 2020 2:25:43 pm
 * @modified Sunday, 6th February 2022 9:11:10 am
 * @copyright © 2020 - 2020 MU
 */

import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";

import { useThemeContext } from "@/context/themeContext";
import { useCursorPointer } from "../Cursor/Cursor";

const motionStyle = {
  initial: { opacity: 0, rotate: -180, scale: 0 },
  animate: { opacity: 1, rotate: 0, scale: 1 },
  exit: { opacity: 0, rotate: 180, scale: 0 },
};

export const ThemeToggle = (props: { [key: string]: any }) => {
  const { theme, cycleTheme } = useThemeContext();
  const cursorActions = useCursorPointer();
  const Icon = theme.icon;

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      key="themeToggle"
      {...motionStyle}
      onClick={cycleTheme}
      className="relative flex items-center cursor-pointer"
      {...props}
      {...cursorActions}
    >
      <AnimatePresence mode="wait">
        <motion.button
          key={theme.id}
          {...motionStyle}
          className="relative focus:outline-none"
          type="button"
          aria-label={theme.label}
        >
          <Icon className="fill-current" />
        </motion.button>
      </AnimatePresence>
    </motion.div>
  );
};
