"use client";
import { useEffect } from "react";

export default function Oneko() {
  useEffect(() => {
    if (typeof document === 'undefined') return
    const script = document.createElement("script");
    script.src = "/oneko.js"; // adjust path accordingly
    script.async = true;
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);
  return null;
}
