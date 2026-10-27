import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import type { Lang } from "@/data/content";

export function ThemeToggle({ lang }: { lang: Lang }) {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"));
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.style.colorScheme = dark ? "dark" : "light";
  }, [dark]);

  const label = lang === "ar"
    ? (dark ? "تفعيل الوضع الفاتح" : "تفعيل الوضع الداكن")
    : (dark ? "Switch to light mode" : "Switch to dark mode");

  function toggle() {
    const next = !dark;
    setDark(next);
    try { localStorage.setItem("am-theme", next ? "dark" : "light"); } catch { /* Theme works without storage. */ }
  }

  return (
    <button type="button" onClick={toggle} aria-label={label} title={label} aria-pressed={dark}
      data-testid="button-theme" className="glass-button grid h-9 w-9 place-items-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
      {dark ? <Sun size={17} /> : <Moon size={17} />}
    </button>
  );
}
