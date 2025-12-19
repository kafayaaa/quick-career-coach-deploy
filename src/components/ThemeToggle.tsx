"use client";
import { useEffect, useState } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";

export default function ThemeToggle() {
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.theme === "dark";
    }
    return false;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const toggleTheme = () => {
    const newTheme = !dark;
    setDark(newTheme);
    localStorage.theme = newTheme ? "dark" : "light";
  };

  return (
    <button
      onClick={toggleTheme}
      className={`fixed bottom-5 left-5 size-10 rounded-full flex items-center justify-center transition-all duration-300 ease-in border shadow-md inset-shadow-xs backdrop-blur-lg ${
        dark
          ? "bg-sky-200/50  border-sky-200/50 shadow-sky-200/50 inset-shadow-sky-200/50"
          : "bg-sky-700/50  border-sky-700/35 shadow-sky-700/50 inset-shadow-sky-700/35"
      }`}
    >
      {dark ? (
        <div className="text-sky-50 ">
          <MdLightMode size={25} />
        </div>
      ) : (
        <div className="text-sky-50">
          <MdDarkMode size={25} />
        </div>
      )}
    </button>
  );
}
