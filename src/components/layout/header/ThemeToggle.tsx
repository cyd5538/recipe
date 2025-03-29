"use client";

import { MoonStar, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="py-1 px-2 hover:bg-gray-900 dark:hover:bg-yellow-500 rounded-md "
    > 
      {theme === "dark" ? <Sun color="#00f" /> : <MoonStar color="#fff" />}
    </button>
  );
}
