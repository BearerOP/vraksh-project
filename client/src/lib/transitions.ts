
interface TransitionProps {
  duration?: number;
  delay?: number;
  easing?: string;
}

export const transitions = {
  fadeIn: ({ duration = 300, delay = 0, easing = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }: TransitionProps = {}) => ({
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: duration / 1000, delay: delay / 1000, ease: easing }
  }),
  
  slideUp: ({ duration = 400, delay = 0, easing = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }: TransitionProps = {}) => ({
    initial: { y: 10, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 10, opacity: 0 },
    transition: { duration: duration / 1000, delay: delay / 1000, ease: easing }
  }),
  
  slideDown: ({ duration = 400, delay = 0, easing = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }: TransitionProps = {}) => ({
    initial: { y: -10, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -10, opacity: 0 },
    transition: { duration: duration / 1000, delay: delay / 1000, ease: easing }
  }),
  
  scaleIn: ({ duration = 300, delay = 0, easing = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }: TransitionProps = {}) => ({
    initial: { scale: 0.95, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.95, opacity: 0 },
    transition: { duration: duration / 1000, delay: delay / 1000, ease: easing }
  }),
  
  staggeredContainer: (staggerChildren = 0.1, delayChildren = 0) => ({
    animate: {
      transition: {
        staggerChildren,
        delayChildren
      }
    }
  }),
  
  // For page transitions
  pageTransition: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3 }
  }
};
