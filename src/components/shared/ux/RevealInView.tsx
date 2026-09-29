import { HTMLMotionProps, Variants, motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

type RevealInViewProps = {
  children: React.ReactNode;
  custom?: number;
  triggerOnce?: boolean;
} & Omit<
  HTMLMotionProps<"div">,
  "animate" | "initial" | "variants" | "transition" | "custom" | "children" | "ref"
>;

const variants: Variants = {
  animate: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.2,
      ease: [0.6, 0.05, -0.01, 0.9],
    },
  }),
  initial: { opacity: 0, y: 25 },
};

export const RevealInView = ({
  children,
  custom = 1,
  triggerOnce = true,
  ...props
}: RevealInViewProps) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce,
    threshold: 0.15,
  });

  useEffect(() => {
    if (inView) {
      controls.start("animate");
    } else {
      controls.start("initial");
    }
  }, [controls, inView]);

  return (
    <div className="inline-block" ref={ref}>
      <motion.div
        animate={controls}
        initial="initial"
        custom={custom}
        variants={variants}
        style={{ display: "inline-block" }}
        {...props}
      >
        {children}
      </motion.div>
    </div>
  );
};
