"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface IExpand {
  children: React.ReactNode;
  maxHeight?: number;
}

export default function Expand({ children, maxHeight = 100 }: IExpand) {
  const [expanded, setExpanded] = useState(false);
  const containerRef = useRef<null | HTMLDivElement>(null);
  useEffect(() => {
    const id = setInterval(() => {
      if (expanded){

        setExpanded((containerRef.current?.offsetHeight ?? 0) < 2 * maxHeight);
      }
    }, 500);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="relative w-full">
      <motion.div
        initial={{ maxHeight: "100px" }}
        animate={{
          maxHeight: expanded
            ? `${containerRef.current?.offsetHeight ?? 0}px`
            : "100px",
        }}
        transition={{
          type: "spring",
          stiffness: 1000,
          damping: 100,
          mass: 0.1,
          duration: 0.1,
        }}
        className={`mb-4 overflow-hidden rounded-xl border transition`}
      >
        <div ref={containerRef} className="h-fit pb-[1px]">
          {children}
        </div>
      </motion.div>

      <div
        className={`pointer-events-none absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-background to-background/5 ${expanded ? "opacity-0" : "opacity-100"} transition ${(containerRef.current?.offsetHeight ?? 0) < maxHeight && "hidden"}`}
      ></div>

      <div
        className={`absolute -bottom-9 left-1/2 -translate-x-1/2 cursor-pointer rounded-xl border border-border/75 bg-background px-2 py-1 text-sm ${(containerRef.current?.offsetHeight ?? 0) < 2 * maxHeight && "hidden"}`}
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? "свернуть" : "еще"}
      </div>
    </div>
  );
}
