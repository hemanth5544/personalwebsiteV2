"use client";
import React from "react";
import { FloatingDock } from "./kaif-ui/floating-dock";
import {
  IconBrandGithub,
  IconBrandX,
  IconHome,
  IconBrandLinkedin,
  IconUserFilled,
  IconPencil,
} from "@tabler/icons-react";

export function FloatingDockDemo({ github, linkedin, twitter, blog, portfolio, home }) {
  const navigationItems = [
    { label: "Home",      icon: <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />,      link: home || "#",  newTab: false },
    { label: "Blog",      icon: <IconPencil className="h-full w-full text-neutral-500 dark:text-neutral-300" />,    link: blog || "#",  newTab: false },
    // { label: "Portfolio", icon: <IconUserFilled className="h-full w-full text-neutral-500 dark:text-neutral-300" />, link: portfolio || "#",  newTab: false },
    { label: "LinkedIn",  icon: <IconBrandLinkedin className="h-full w-full text-neutral-500 dark:text-neutral-300" />, link: linkedin || "#",  newTab: true },
    { label: "Twitter",   icon: <IconBrandX className="h-full w-full text-neutral-500 dark:text-neutral-300" />,    link: twitter || "#",  newTab: true },
    { label: "GitHub",    icon: <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />, link: github || "#",  newTab: true },
  ];



  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[999]">
      <FloatingDock
        desktopClassName="flex bg-gray-100 dark:bg-neutral-900 rounded-2xl px-4 pb-3"
        mobileClassName="hidden"
        navigationItems={navigationItems}
      />
    </div>
  );
}

export default FloatingDockDemo;