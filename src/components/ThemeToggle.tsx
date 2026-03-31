import { useTheme } from "../hooks/useTheme";
import { SunIcon, MoonIcon, MonitorIcon } from "./Icons";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const nextTheme = () => {
    const order: Array<"light" | "dark" | "system"> = ["light", "dark", "system"];
    const idx = order.indexOf(theme);
    setTheme(order[(idx + 1) % order.length]);
  };

  return (
    <button
      onClick={nextTheme}
      className="relative p-2 rounded-xl text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
      aria-label={`当前主题: ${theme}, 点击切换`}
      title={`当前: ${theme === "light" ? "浅色" : theme === "dark" ? "深色" : "跟随系统"}`}
    >
      <span className="relative w-5 h-5 flex items-center justify-center">
        <SunIcon
          size={18}
          className={`absolute transition-all duration-300 ${
            theme === "light"
              ? "opacity-100 rotate-0 scale-100"
              : "opacity-0 rotate-90 scale-50"
          }`}
        />
        <MoonIcon
          size={18}
          className={`absolute transition-all duration-300 ${
            theme === "dark"
              ? "opacity-100 rotate-0 scale-100"
              : "opacity-0 -rotate-90 scale-50"
          }`}
        />
        <MonitorIcon
          size={18}
          className={`absolute transition-all duration-300 ${
            theme === "system"
              ? "opacity-100 rotate-0 scale-100"
              : "opacity-0 rotate-90 scale-50"
          }`}
        />
      </span>
    </button>
  );
}
