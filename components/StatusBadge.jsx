"use client";

import { Status, StatusLabel } from "@/components/kibo-ui/status";

const Pill = () => (
  <a
    href="https://status.hemanthr.xyz"
    target="_blank"
    rel="noopener noreferrer"
  >
    <Status
      className="gap-1.5 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs cursor-pointer hover:bg-green-500/20 transition-colors"
      status="online"
    >
      <span className="relative flex size-1.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
        <span className="relative inline-flex size-1.5 rounded-full bg-green-500" />
      </span>
      <StatusLabel className="font-mono text-green-400">Fully operational</StatusLabel>
    </Status>
  </a>
);

export default Pill;