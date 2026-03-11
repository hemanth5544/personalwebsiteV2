import { NextResponse } from "next/server";

type StatusState = "operational" | "degraded" | "outage" | "unknown";

function detectStatus(html: string): { state: StatusState; label: string } {
  const text = html.replace(/\s+/g, " ").trim();

  const known = [
    { re: /All Systems Operational/i, state: "operational" as const, label: "All Systems Operational" },
    { re: /Degraded Performance/i, state: "degraded" as const, label: "Degraded Performance" },
    { re: /Partial Outage/i, state: "outage" as const, label: "Partial Outage" },
    { re: /Major Outage/i, state: "outage" as const, label: "Major Outage" },
  ];

  for (const k of known) {
    if (k.re.test(text)) return { state: k.state, label: k.label };
  }

  // Fallback: try to grab the first recognizable status-ish phrase.
  const m = text.match(
    /\b(All Systems Operational|Degraded Performance|Partial Outage|Major Outage)\b/i
  );
  if (m?.[1]) {
    const label = m[1]
      .toLowerCase()
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    const state: StatusState =
      /All Systems Operational/i.test(m[1])
        ? "operational"
        : /Degraded/i.test(m[1])
          ? "degraded"
          : /Outage/i.test(m[1])
            ? "outage"
            : "unknown";
    return { state, label };
  }

  return { state: "unknown", label: "All Systems Operational" };
}

export async function GET() {
  try {
    const res = await fetch("https://status.hemanthr.xyz/", {
      // Keep it lightweight and cache a bit on the Next server.
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return NextResponse.json(
        { state: "unknown" as const, label: "All Systems Operational" },
        { status: 200 }
      );
    }

    const html = await res.text();
    const { state, label } = detectStatus(html);

    return NextResponse.json({ state, label }, { status: 200 });
  } catch {
    return NextResponse.json(
      { state: "unknown" as const, label: "All Systems Operational" },
      { status: 200 }
    );
  }
}

