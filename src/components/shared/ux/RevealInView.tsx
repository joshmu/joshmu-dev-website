import { Transition, Variants, motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

type RevealInViewProps = {
  children: React.ReactNode;
  delay?: number;
  variants?: Variants | null;
  transition?: Transition | null;
  custom?: number;
  triggerOnce?: boolean;
  props?: { [key: string]: any };
};

export const RevealInView = ({
  children,
  delay: _delay = 0,
  variants: initialVariants = null,
  transition: initialTransition = null,
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

  const variants: Variants = initialVariants || {
    animate: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: initialTransition || {
        delay: custom * 0.2,
        ease: [0.6, 0.05, -0.01, 0.9],
      },
    }),
    initial: { opacity: 0, y: 25 },
  };

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
