"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion, MotionProps } from "motion/react";
import { useEffect, useRef, useState } from "react";

type CharacterSet = string[] | readonly string[];

interface HyperTextProps extends MotionProps {
  /** The text content to be animated */
  children: string;
  /** Optional className for styling */
  className?: string;
  /** Duration of the animation in milliseconds */
  duration?: number;
  /** Delay before animation starts in milliseconds */
  delay?: number;
  /** Component to render as - defaults to div */
  as?: React.ElementType;
  /** Whether to start animation when element comes into view */
  startOnView?: boolean;
  /** Whether to trigger animation on hover */
  animateOnHover?: boolean;
  /** Custom character set for scramble effect. Defaults to uppercase alphabet */
  characterSet?: CharacterSet;
}

const DEFAULT_CHARACTER_SET = "ABCDEFGHIJKLMNOP".split("");
const DEFAULT_TEXT_END = "$!@2&9%^";

const getRandomInt = (max: number): number => Math.floor(Math.random() * max);

export default function HyperText({
  children,
  className,
  duration = 1600,
  delay = 0,
  as: Component = "div",
  startOnView = false,
  characterSet = DEFAULT_CHARACTER_SET,
  ...props
}: HyperTextProps) {
  const MotionComponent = motion.create(Component, {
    forwardMotionProps: true,
  });

  const [displayText, setDisplayText] = useState<string[]>(children.split(""));
  const [isAnimating, setIsAnimating] = useState(false);
  const [targetText, setTargetText] = useState<string[]>(children.split(""));
  const iterationCount = useRef(0);
  const elementRef = useRef<HTMLElement>(null);

  const handleAnimationTrigger = () => {
    if (!isAnimating) {
      iterationCount.current = 0;
      setIsAnimating(true);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleAnimationTrigger();
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Handle animation start based on view or delay
  useEffect(() => {
    if (!startOnView) {
      const startTimeout = setTimeout(() => {
        setIsAnimating(true);
      }, delay);
      return () => clearTimeout(startTimeout);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsAnimating(true);
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "-30% 0px -30% 0px" }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [delay, startOnView]);

  // Handle scramble animation
  useEffect(() => {
    if (!isAnimating) return;

    const intervalDuration = duration / (children.length * 8);
    const maxIterations = children.length;

    const interval = setInterval(() => {
      if (iterationCount.current < maxIterations) {
        setDisplayText((currentText) =>
          currentText.map((letter, index) =>
            letter === " "
              ? letter
              : index <= iterationCount.current
                ? targetText[index]
                : characterSet[getRandomInt(characterSet.length)]
          )
        );
        iterationCount.current += 0.1;
      } else {
        setIsAnimating(false);
        clearInterval(interval);
        // Toggle between children and DEFAULT_TEXT_END
        setTargetText((prev) =>
          prev.join("") === children ? DEFAULT_TEXT_END.split("") : children.split("")
        );
      }
    }, intervalDuration);

    return () => clearInterval(interval);
  }, [children, duration, isAnimating, characterSet, targetText]);

  return (
    <MotionComponent
      ref={elementRef}
      className={cn("overflow-hidden py-2 text-4xl font-bold", className)}
      {...props}
    >
      <AnimatePresence>
        {displayText.map((letter, index) => (
          <motion.span
            key={index}
            className={cn("font-mono", letter === " " ? "w-3" : "")}
          >
            {letter}
          </motion.span>
        ))}
      </AnimatePresence>
    </MotionComponent>
  );
}