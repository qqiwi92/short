"use client";
import {
  useScroll,
  useTransform,
  motion,
  useMotionTemplate,
  useSpring,
} from "framer-motion";
export default function Header() {
  const { scrollY } = useScroll();

  const textSizeLinear = useTransform(scrollY, [0, 80], [4, 1.25]);
  const textSize = useSpring(textSizeLinear, {
    stiffness: 1000,
    damping: 100,
    mass: 0.1,
    duration: 0.1,
  });

  const textSizeRem = useMotionTemplate`${textSize}rem`;
  return (
    <div className="fixed left-1/2 top-2 z-[100] w-fit -translate-x-1/2 rounded-xl bg-opacity-radial-gradient px-4 backdrop-blur-xl">
      <motion.h1
        style={{
          fontSize: textSizeRem,
          paddingTop: textSizeLinear,
          paddingBottom: textSizeLinear.get() - 1,
        }}
        className="z-[100] select-none font-bold leading-tight"
        draggable={false}
      >
        shorter!
      </motion.h1>
    </div>
  );
}
