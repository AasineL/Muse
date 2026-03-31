import { useState } from "react";
import { NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { HomeIcon, TagIcon, UserIcon, MenuIcon, XIcon } from "./Icons";

const navItems = [
  { to: "/", label: "首页", icon: HomeIcon },
  { to: "/tags", label: "标签", icon: TagIcon },
  { to: "/about", label: "关于", icon: UserIcon },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink
            to="/"
            className="flex items-center gap-2 text-xl font-bold tracking-tight"
          >
            <span className="gradient-text">Muse</span>
            <span className="text-sm font-normal text-gray-400 hidden sm:inline">
              / 博客
            </span>
          </NavLink>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "nav-link-active bg-primary-50 dark:bg-primary-950/50"
                      : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800/50"
                  }`
                }
              >
                <span className="flex items-center gap-1.5">
                  <item.icon size={16} />
                  {item.label}
                </span>
              </NavLink>
            ))}
            <div className="ml-2 pl-2 border-l border-gray-200 dark:border-gray-800">
              <ThemeToggle />
            </div>
          </nav>

          {/* Mobile Controls */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
              aria-label="菜单"
            >
              {mobileOpen ? <XIcon size={20} /> : <MenuIcon size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <nav className="md:hidden pb-4 animate-fade-in">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? "nav-link-active bg-primary-50 dark:bg-primary-950/50"
                        : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800/50"
                    }`
                  }
                >
                  <span className="flex items-center gap-2">
                    <item.icon size={16} />
                    {item.label}
                  </span>
                </NavLink>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
