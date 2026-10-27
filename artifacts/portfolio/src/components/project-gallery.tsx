import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { asset, type Lang } from "@/data/content";
import { PrismImage, type PrismTurn } from "@/components/prism-image";

interface Props {
  images: string[];
  name: string;
  lang: Lang;
  expanded?: boolean;
  onExpand?: () => void;
}

export function ProjectGallery({ images, name, lang, expanded = false, onExpand }: Props) {
  const [index, setIndex] = useState(0);
  const [turn, setTurn] = useState<PrismTurn | null>(null);
  const currentIndex = useRef(0);
  const turning = useRef(false);
  const [paused, setPaused] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(!document.hidden);
  const element = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const ar = lang === "ar";
  const goTo = useCallback((target: number, direction = 1) => {
    if (turning.current || target === currentIndex.current) return;
    if (reduce) {
      currentIndex.current = target;
      setIndex(target);
      return;
    }
    turning.current = true;
    setTurn({ from: currentIndex.current, to: target, direction });
  }, [reduce]);
  const move = useCallback((step: number) => {
    goTo((currentIndex.current + step + images.length) % images.length, step > 0 ? 1 : -1);
  }, [goTo, images.length]);
  const finishTurn = () => {
    if (!turn) return;
    currentIndex.current = turn.to;
    setIndex(turn.to);
    setTurn(null);
    turning.current = false;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.1 });
    if (element.current) observer.observe(element.current);
    const change = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", change);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", change); };
  }, []);

  useEffect(() => {
    if (paused || hovering || reduce || !visible || !pageVisible || images.length < 2) return;
    const timer = window.setInterval(() => move(1), 1500);
    return () => window.clearInterval(timer);
  }, [paused, hovering, reduce, visible, pageVisible, images.length, move]);

  useEffect(() => {
    if (!visible || images.length < 2) return;
    const next = new Image();
    next.src = asset(images[(index + 1) % images.length]);
  }, [index, images, visible]);

  const image = <PrismImage images={images} index={index} turn={turn} onComplete={finishTurn}
    alt={`${name} — ${ar ? "صورة" : "image"} ${(turn?.to ?? index) + 1}`} />;

  return (
    <div ref={element} className="relative bg-muted/35" dir="ltr"
      onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}
      onFocusCapture={() => setHovering(true)}
      onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setHovering(false); }}
      role="region" aria-roledescription={ar ? "معرض صور" : "carousel"} aria-label={name}>
      {onExpand ? (
        <button onClick={onExpand} className="block aspect-[16/10] w-full p-3 focus-visible:outline-2 focus-visible:outline-primary"
          aria-label={`${ar ? "تكبير صور" : "Expand images of"} ${name}`}>{image}</button>
      ) : (
        <div className={expanded ? "flex h-[min(65dvh,640px)] w-full items-center justify-center p-3 md:p-6" : "aspect-[16/10] p-3"}>{image}</div>
      )}
      <div className="glass-header flex items-center justify-between gap-3 border-t border-foreground/10 px-4 py-2.5">
        <span className="font-mono-x text-[11px] tabular-nums text-foreground/55" aria-live={paused ? "polite" : "off"}>{String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}</span>
        <div className="flex items-center gap-1">
          <button onClick={() => move(-1)} aria-label={ar ? "الصورة السابقة" : "Previous image"} className="grid h-9 w-9 place-items-center rounded-full text-foreground/70 transition-colors hover:bg-foreground hover:text-background focus-visible:outline-2 focus-visible:outline-primary"><ChevronLeft size={18} /></button>
          <button onClick={() => setPaused(!paused)} aria-pressed={paused}
            aria-label={paused ? (ar ? "تشغيل العرض التلقائي" : "Play slideshow") : (ar ? "إيقاف العرض التلقائي" : "Pause slideshow")}
            disabled={!!reduce} title={reduce ? (ar ? "الحركة التلقائية معطلة حسب إعدادات جهازك" : "Autoplay disabled by your motion preferences") : undefined}
            className="grid h-9 w-9 place-items-center rounded-full text-foreground/70 transition-colors hover:bg-foreground hover:text-background disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-primary">
            {paused || reduce ? <Play size={15} /> : <Pause size={15} />}
          </button>
          <button onClick={() => move(1)} aria-label={ar ? "الصورة التالية" : "Next image"} className="grid h-9 w-9 place-items-center rounded-full text-foreground/70 transition-colors hover:bg-foreground hover:text-background focus-visible:outline-2 focus-visible:outline-primary"><ChevronRight size={18} /></button>
        </div>
      </div>
      {expanded && (
        <div className="flex gap-2 overflow-x-auto border-t border-foreground/10 bg-background p-3">
          {images.map((src, i) => (
            <button key={src} onClick={() => goTo(i, i > currentIndex.current ? 1 : -1)} aria-label={`${ar ? "عرض الصورة" : "Show image"} ${i + 1}`} aria-current={index === i ? "true" : undefined}
              className={`h-14 w-20 shrink-0 overflow-hidden rounded-md border-2 bg-muted transition-colors ${index === i ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"}`}>
              <img src={asset(src)} alt="" loading="lazy" className="h-full w-full object-contain" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
