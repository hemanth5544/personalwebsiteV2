"use client";

import { GitHubCalendar } from "react-github-calendar";
import * as Tooltip from "@radix-ui/react-tooltip";
import { useEffect, useState } from "react";

export default function GithubCalendarClient({
  username = "hemanth5544",
  blockSize = 10,
}) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (typeof document === "undefined") return;

    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");

    const observer = new MutationObserver(() => {
      const dark = document.documentElement.classList.contains("dark");
      setTheme(dark ? "dark" : "light");
    });

    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  return (
    <Tooltip.Provider delayDuration={100}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          marginLeft: "100px",
          marginRight: "90px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <GitHubCalendar
          username={username}
          responsive
          hideTotalCount
          colorScheme={theme === "dark" ? "dark" : "light"}
          blockSize={blockSize}
          renderBlock={(block, activity) => (
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                {block}
              </Tooltip.Trigger>

              <Tooltip.Portal>
                <Tooltip.Content
                  side="top"
                  sideOffset={8}
                  className="animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 rounded-lg px-4 py-3 text-sm shadow-lg border"
                  style={{ 
                    zIndex: 9999,
                    backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
                    color: theme === "dark" ? "#f9fafb" : "#111827",
                    borderColor: theme === "dark" ? "#374151" : "#e5e7eb",
                  }}
                >
                  <div className="flex flex-col gap-1">
                    <div className="font-semibold">
                      {activity.count === 0 ? "No contributions" : 
                       activity.count === 1 ? "1 contribution" :
                       `${activity.count} contributions`}
                    </div>
                    <div className="text-xs opacity-80">
                      {new Date(activity.date).toLocaleDateString("en-US", {
                        weekday: "short",
                        year: "numeric",
                        month: "short",
                        day: "numeric"
                      })}
                    </div>
                  </div>
                  <Tooltip.Arrow 
                    className="fill-current"
                    style={{ 
                      color: theme === "dark" ? "#1f2937" : "#ffffff",
                    }}
                    width={12}
                    height={6}
                  />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          )}
        />
      </div>
    </Tooltip.Provider>
  );
}