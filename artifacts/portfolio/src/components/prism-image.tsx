import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { asset } from "@/data/content";

export interface PrismTurn {
  from: number;
  to: number;
  direction: number;
}

export function PrismImage({ images, index, turn, alt, onComplete }: {
  images: string[];
  index: number;
  turn: PrismTurn | null;
  alt: string;
  onComplete: () => void;
}) {
  const stage = useRef<HTMLDivElement>(null);
  const [depth, setDepth] = useState(0);
  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => setDepth(entry.contentRect.width / 2));
    if (stage.current) observer.observe(stage.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={stage} className="prism-stage" role="img" aria-label={alt}>
      {turn ? (
        <div className="prism-rotor" style={{ transform: `translateZ(${-depth}px)` }}>
          <motion.div className="prism-rotor" key={`${turn.from}-${turn.to}`}
            initial={{ rotateY: 0 }} animate={{ rotateY: -90 * turn.direction }}
            transition={{ duration: 0.72, ease: [0.22, 0.68, 0.16, 1] }} onAnimationComplete={onComplete}>
            <div className="prism-face" style={{ transform: `translateZ(${depth}px)` }} aria-hidden="true">
              <img src={asset(images[turn.from])} alt="" decoding="async" />
            </div>
            <div className="prism-face" style={{ transform: `rotateY(${90 * turn.direction}deg) translateZ(${depth}px)` }} aria-hidden="true">
              <img src={asset(images[turn.to])} alt="" decoding="async" />
            </div>
          </motion.div>
        </div>
      ) : (
        <div className="prism-face" aria-hidden="true">
          <img src={asset(images[index])} alt="" loading="lazy" decoding="async" />
        </div>
      )}
    </div>
  );
}
