import "framer-motion";

// Framer Motion v6 types are incompatible with React 19 types.
// motion.div/motion.span/etc. lose their HTML attribute types (children,
// className, style, event handlers, etc.). This augmentation restores them.
declare module "framer-motion" {
  interface MotionProps {
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties | Record<string, unknown>;
    id?: string;
    key?: React.Key;
    ref?: React.Ref<unknown>;
    onClick?: React.MouseEventHandler;
    onMouseEnter?: React.MouseEventHandler;
    onMouseLeave?: React.MouseEventHandler;
    type?: string;
    "aria-label"?: string;
  }

  // AnimatePresence lost its mode prop in v6 types
  interface AnimatePresenceProps {
    mode?: "sync" | "wait" | "popLayout";
  }
}
