"use client";

import {
  Bell,
  CloudLightning,
  Music2,
  Pause,
  Phone,
  Play,
  SkipBack,
  SkipForward,
  Thermometer,
  Timer as TimerIcon,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { type ReactNode, useMemo, useState } from "react";

const BOUNCE_VARIANTS = {
  idle: 0.5,
  "ring-idle": 0.5,
  "timer-ring": 0.35,
  "ring-timer": 0.35,
  "timer-idle": 0.3,
  "idle-timer": 0.3,
  "idle-ring": 0.5,
} as const;

const DEFAULT_BOUNCE = 0.5;
const TIMER_INTERVAL_MS = 1000;

const DefaultIdle = () => {
  const [showTemp, setShowTemp] = useState(false);

  return (
    <motion.div
      className="flex items-center gap-2 px-3 py-2"
      layout
      onHoverEnd={() => setShowTemp(false)}
      onHoverStart={() => setShowTemp(true)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          initial={{ opacity: 0, scale: 0.8 }}
          key="storm"
        >
          <CloudLightning className="h-5 w-5 text-white" />
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {showTemp && (
          <motion.div
            animate={{ opacity: 1, width: "auto" }}
            className="flex items-center gap-1 overflow-hidden"
            exit={{ opacity: 0, width: 0 }}
            initial={{ opacity: 0, width: 0 }}
          >
            <Thermometer className="h-3 w-3 shrink-0 text-white" />
            <span className="pointer-events-none whitespace-nowrap text-white text-xs">
              12°C
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const DefaultRing = () => (
  <div className="flex w-64 items-center gap-3 px-4 py-3">
    <Phone className="h-5 w-5 shrink-0" style={{ color: "#4ade80" }} />
    <div className="flex-1">
      <p className="font-medium text-sm text-white">Leave a message</p>
      <p className="text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>Hemanth R</p>
    </div>
    <div className="h-2 w-2 shrink-0 animate-pulse rounded-full" style={{ backgroundColor: "#4ade80" }} />
  </div>
);

const DefaultTimer = () => {
  const [time, setTime] = useState(60);
  const maxTime = 60;

  useMemo(() => {
    const timer = setInterval(() => {
      setTime((t) => (t > 0 ? t - 1 : 0));
    }, TIMER_INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-3 px-4 py-3" style={{ width: "260px" }}>
      <TimerIcon className="h-5 w-5 shrink-0" style={{ color: "#fbbf24" }} />
      <p className="shrink-0 font-medium text-sm text-white">{time}s remaining</p>
      <div
        className="h-1.5 flex-1 overflow-hidden rounded-full"
        style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
      >
        <div
          className="h-full rounded-full transition-all duration-1000 ease-linear"
          style={{
            width: `${(time / maxTime) * 100}%`,
            backgroundColor: "#fbbf24",
          }}
        />
      </div>
    </div>
  );
};

const Notification = () => (
  <div className="flex w-64 items-center gap-3 px-4 py-3">
    <Bell className="h-5 w-5 shrink-0" style={{ color: "#facc15" }} />
    <div className="flex-1">
      <p className="font-medium text-sm text-white">New Message</p>
      <p className="text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>You have a new notification!</p>
    </div>
    <span
      className="rounded-full px-2 py-0.5 text-xs"
      style={{ backgroundColor: "rgba(250,204,21,0.25)", color: "#fde047" }}
    >
      1
    </span>
  </div>
);

const MusicPlayer = () => {
  const [playing, setPlaying] = useState(true);
  return (
    <div className="flex w-72 items-center gap-2 px-4 py-3">
      <Music2 className="h-5 w-5 shrink-0" style={{ color: "#eb8d21" }} />
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-sm text-white">Brats</p>
        <p className="truncate text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>Arjan Dhillon</p>
      </div>
      <button
        className="rounded-full p-1 hover:bg-white/20"
        style={{ color: "#ffffff" }}
        onClick={() => setPlaying(false)}
        type="button"
      >
        <SkipBack className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} />
      </button>
      <button
        className="rounded-full p-1 hover:bg-white/20"
        style={{ color: "#ffffff" }}
        onClick={() => setPlaying((p) => !p)}
        type="button"
      >
        {playing ? (
          <Pause className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} />
        ) : (
          <Play className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} />
        )}
      </button>
      <button
        className="rounded-full p-1 hover:bg-white/20"
        style={{ color: "#ffffff" }}
        onClick={() => setPlaying(true)}
        type="button"
      >
        <SkipForward className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} />
      </button>
    </div>
  );
};

type View = "idle" | "ring" | "timer" | "notification" | "music";

export interface DynamicIslandProps {
  view?: View;
  onViewChange?: (view: View) => void;
  idleContent?: ReactNode;
  ringContent?: ReactNode;
  timerContent?: ReactNode;
  className?: string;
}

export default function DynamicIsland({
  view: controlledView,
  onViewChange,
  idleContent,
  ringContent,
  timerContent,
  className = "",
}: DynamicIslandProps) {
  const [internalView, setInternalView] = useState<View>("idle");
  const [variantKey, setVariantKey] = useState<string>("idle");
  const [expanded, setExpanded] = useState(false); // collapsed by default
  const shouldReduceMotion = useReducedMotion();

  const view = controlledView ?? internalView;

  const content = useMemo(() => {
    switch (view) {
      case "ring":
        return ringContent ?? <DefaultRing />;
      case "timer":
        return timerContent ?? <DefaultTimer />;
      case "notification":
        return <Notification />;
      case "music":
        return <MusicPlayer />;
      default:
        return idleContent ?? <DefaultIdle />;
    }
  }, [view, idleContent, ringContent, timerContent]);

  const handleViewChange = (newView: View) => {
    setExpanded(true); // always expand when switching view
    if (view === newView) return;
    setVariantKey(`${view}-${newView}`);
    if (onViewChange) {
      onViewChange(newView);
    } else {
      setInternalView(newView);
    }
  };

  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>

      {/* ISLAND */}
      <motion.div
        className="w-fit rounded-full"
        layout
        style={{ borderRadius: 32, backgroundColor: "#000000" }}
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : {
                type: "spring",
                bounce:
                  BOUNCE_VARIANTS[variantKey as keyof typeof BOUNCE_VARIANTS] ??
                  DEFAULT_BOUNCE,
                duration: 0.25,
              }
        }
      >
        <div className="overflow-hidden rounded-full">
          {/* Collapsed: clickable dot */}
          {!expanded && (
            <button
              type="button"
              aria-label="Open"
              onClick={() => setExpanded(true)}
              className="flex h-8 w-8 cursor-pointer items-center justify-center"
            />
          )}

          {/* Expanded: content with close on pill click, but not on inner button clicks */}
          {expanded && (
            <motion.div
              animate={
                shouldReduceMotion
                  ? { scale: 1, opacity: 1 }
                  : {
                      scale: 1,
                      opacity: 1,
                      filter: "blur(0px)",
                      originX: 0.5,
                      originY: 0.5,
                      transition: { delay: 0.05 },
                    }
              }
              initial={{
                scale: 0.9,
                opacity: 0,
                filter: "blur(5px)",
                originX: 0.5,
                originY: 0.5,
              }}
              key={view}
              transition={{
                type: "spring",
                bounce:
                  BOUNCE_VARIANTS[variantKey as keyof typeof BOUNCE_VARIANTS] ??
                  DEFAULT_BOUNCE,
              }}
            >
              {content}
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* NAV BUTTONS */}
      <div className="flex justify-center gap-1 rounded-full border border-black/10 bg-black/5 p-1 shadow-sm dark:border-white/10 dark:bg-white/5">
        {[
          { key: "idle", icon: <CloudLightning className="size-3 text-foreground" /> },
          { key: "ring", icon: <Phone className="size-3 text-foreground" /> },
          { key: "timer", icon: <TimerIcon className="size-3 text-foreground" /> },
          { key: "notification", icon: <Bell className="size-3 text-foreground" /> },
          { key: "music", icon: <Music2 className="size-3 text-foreground" /> },
        ].map(({ key, icon }) => (
          <button
            aria-label={key}
            key={key}
            onClick={() => handleViewChange(key as View)}
            type="button"
            className="flex size-8 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-black/10 dark:hover:bg-white/10"
          >
            {icon}
          </button>
        ))}
      </div>
    </div>
  );
}