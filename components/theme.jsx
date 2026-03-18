"use client";

import { ThemeSwitcher } from "@/components/kibo-ui/theme-switcher";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <ThemeSwitcher
      className="gap-2 px-2"
      value={theme === "dark" || theme === "light" ? theme : "system"}
      onChange={(value) => setTheme(value)}
      defaultValue="system"
    />
  );
};

export default ThemeToggle;