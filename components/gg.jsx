"use client";

import {GitHubCalendar} from "react-github-calendar";
import { useEffect, useState } from "react";

export default function GithubCalendarClient({
  username = "hemanth5544",
  blockSize = 10,
}) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (typeof document === 'undefined') return
    const classBased = document.documentElement.classList.contains("dark");
    const saved = classBased
      ? "dark"
      : document.documentElement.getAttribute("data-theme") ||
        (typeof localStorage !== 'undefined' ? localStorage.getItem("theme") : null) ||
        "light";

    setTheme(saved);

    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === "attributes") {
          if (m.attributeName === "class") {
            const isDark = document.documentElement.classList.contains("dark");
            setTheme(isDark ? "dark" : "light");
          } else if (m.attributeName === "data-theme") {
            const newTheme =
              document.documentElement.getAttribute("data-theme") || "light";
            setTheme(newTheme);
          }
        }
      }
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "flex-start", marginLeft: "100px", marginRight: "90px" }}>
      <GitHubCalendar
        username={username}
        responsive={true}
        hideTotalCount
        colorScheme={theme === "dark" ? "dark" : "light"}
        blockSize={blockSize}
      />
    </div>
  );
}

