"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { cn } from "@/app/aceternity/lib/utils";

const InfiniteMovingHeadings = ({
  headings,
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
  className,
}: {
  headings: string[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);

  const [start, setStart] = useState(false);

  const getDirection = useCallback(() => {
    containerRef.current?.style.setProperty(
      "--animation-direction",
      direction === "left" ? "forwards" : "reverse"
    );
  }, [direction]);

  const getSpeed = useCallback(() => {
    if (!containerRef.current) return;
    const duration =
      speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s";
    containerRef.current.style.setProperty("--animation-duration", duration);
  }, [speed]);

  const addAnimation = useCallback(() => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        scrollerRef.current?.appendChild(duplicatedItem);
      });
      getDirection();
      getSpeed();
      setStart(true);
    }
  }, [getDirection, getSpeed]);

  useEffect(() => {
    addAnimation();
  }, [addAnimation]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {headings.map((text, idx) => (
          <li key={idx}>
            <h1 className="text-white font-lato text-[10vw] font-bold whitespace-nowrap">
              {text}
            </h1>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InfiniteMovingHeadings;
