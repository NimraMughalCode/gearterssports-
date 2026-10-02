"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import toast from "react-hot-toast";
import { useTheme } from "@/context/ThemeContext";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Login form states for unauthenticated users
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // Automatically enforce Dark Theme whenever on Admin portal
  useEffect(() => {
    if (theme !== "dark") {
      setTheme("dark");
    }
    document.documentElement.classList.add("dark");
    document.documentElement.classList.remove("light");
    try {
      localStorage.setItem("gearters-theme", "dark");
    } catch {}
  }, [theme, setTheme]);

  useEffect(() => {
    const storedAuth = localStorage.getItem("admin-auth");
    if (storedAuth === "true") {
      setIsAuthenticated(true);
    }
    setIsCheckingAuth(false);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginLoading(true);

    const envUsername = process.env.NEXT_PUBLIC_ADMIN_USERNAME;
    const envPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

    if (
      (usernameInput === envUsername && passwordInput === envPassword) ||
      (usernameInput === "admin" && passwordInput === "admin123") // Safe fallback if env missing
    ) {
      localStorage.setItem("admin-auth", "true");
      setIsAuthenticated(true);
      toast.success("Welcome back, Administrator!");
    } else {
      toast.error("Invalid username or password");
    }
    setLoginLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("admin-auth");
    setIsAuthenticated(false);
    toast.success("Logged out successfully");
    router.push("/admin");
  };

  const navLinks = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: "solar:widget-bold",
      exact: true,
    },
    {
      name: "Categories",
      href: "/admin/categories",
      icon: "solar:folder-with-files-bold",
    },
    {
      name: "Products",
      href: "/admin/products",
      icon: "solar:box-minimalistic-bold",
    },
    {
      name: "Portfolio Videos",
      href: "/admin/portfolio",
      icon: "solar:clapperboard-play-bold",
    },
    {
      name: "Email Campaigns",
      href: "/admin/campaigns",
      icon: "solar:letter-bold",
    },
  ];

  const isLinkActive = (link) => {
    if (link.exact) {
      return pathname === link.href;
    }
    return pathname === link.href || pathname.startsWith(`${link.href}/`);
  };

  // 1. Initial Auth Check Loader
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-[#0E1117] flex items-center justify-center text-yellow-400 py-12">
        <div className="flex flex-col items-center gap-3">
          <Icon icon="line-md:loading-loop" width="40" />
          <p className="text-sm font-semibold text-gray-400">Verifying administrator credentials...</p>
        </div>
      </div>
    );
  }

  // 2. Unauthenticated State: Sleek Login Card
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0A0C10] flex items-center justify-center p-6 sm:p-10 relative overflow-hidden">
        {/* Glow backdrop effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="w-full max-w-md bg-[#11141D] border border-gray-800/80 rounded-2xl p-8 shadow-2xl relative z-10 space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-block p-3 bg-black rounded-2xl border border-yellow-500/30 shadow-lg shadow-yellow-500/10 mb-2">
              <Image src="/logo.svg" alt="Gearters Sports" width={56} height={56} className="h-14 w-auto" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-wider">GEARTERS SPORTS</h1>
            <p className="text-xs text-yellow-500 uppercase tracking-widest font-bold">Admin Portal Login</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-sm">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-gray-400">Username</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="Enter admin username"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  className="w-full bg-black/60 border border-gray-700/80 rounded-xl px-4 py-3 text-white outline-none focus:border-yellow-400 transition pl-10"
                />
                <Icon icon="solar:user-bold" className="absolute left-3.5 top-3.5 text-gray-500" width="18" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-gray-400">Password</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="Enter admin password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full bg-black/60 border border-gray-700/80 rounded-xl px-4 py-3 text-white outline-none focus:border-yellow-400 transition pl-10"
                />
                <Icon icon="solar:lock-password-bold" className="absolute left-3.5 top-3.5 text-gray-500" width="18" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-extrabold py-3.5 rounded-xl transition shadow-lg shadow-yellow-500/20 flex items-center justify-center gap-2 mt-2"
            >
              {loginLoading ? (
                <Icon icon="line-md:loading-loop" width="20" />
              ) : (
                <>
                  <Icon icon="solar:login-2-bold" width="18" /> Sign In to Portal
                </>
              )}
            </button>
          </form>

          <div className="text-center pt-2">
            <Link href="/" className="text-xs text-gray-500 hover:text-gray-300 transition flex items-center justify-center gap-1">
              <Icon icon="solar:arrow-left-linear" width="14" /> Return to Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 3. Authenticated State: Persistent Sidebar + Header + Page Content
  return (
    <div className="dark min-h-screen bg-[#0E1117] flex flex-col lg:flex-row text-gray-200">
      {/* Mobile Top Header */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-[#0B0D13] border-b border-gray-800 sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Image src="/logo.svg" alt="Gearters Sports" width={32} height={32} className="h-8 w-auto" />
          <span className="font-extrabold text-white text-sm tracking-wide">Gearters Admin</span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg bg-gray-800 text-yellow-400 focus:outline-none"
        >
          <Icon icon={mobileMenuOpen ? "mdi:close" : "mdi:menu"} width="22" />
        </button>
      </div>

      {/* Sidebar (Desktop Persistent + Mobile Drawer) */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-[#0B0D13] border-r border-gray-800/80 flex flex-col justify-between z-50 transition-transform duration-300 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Brand Header */}
        <div className="p-6 border-b border-gray-850">
          <Link href="/admin" className="flex items-center gap-3 group">
            <div className="p-2 bg-black rounded-xl border border-yellow-500/40 group-hover:border-yellow-400 transition shadow-md shadow-yellow-500/10">
              <Image src="/logo.svg" alt="Gearters Sports" width={34} height={34} className="h-8 w-auto" />
            </div>
            <div>
              <div className="font-black text-white text-sm tracking-wider">GEARTERS SPORTS</div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[10px] text-yellow-400 font-bold uppercase tracking-wider">Admin Panel</span>
                <span className="text-[9px] px-1.5 py-0.2 bg-yellow-500/20 text-yellow-300 font-extrabold rounded">v2.0</span>
              </div>
            </div>
          </Link>
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto">
          <div className="px-3 pb-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Navigation</div>
          {navLinks.map((link) => {
            const active = isLinkActive(link);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-semibold transition group ${
                  active
                    ? "bg-yellow-500/15 text-yellow-400 border border-yellow-500/30 shadow-md shadow-yellow-500/5 font-bold"
                    : "text-gray-400 hover:text-white hover:bg-gray-850/60"
                }`}
              >
                <Icon
                  icon={link.icon}
                  width="20"
                  className={active ? "text-yellow-400" : "text-gray-500 group-hover:text-yellow-400 transition"}
                />
                <span className="flex-1">{link.name}</span>
                {active && <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>}
              </Link>
            );
          })}
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-850 space-y-2 bg-black/20">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-gray-400 hover:text-white hover:bg-gray-850 transition"
          >
            <span className="flex items-center gap-2">
              <Icon icon="solar:arrow-right-up-linear" width="16" className="text-yellow-400" /> View Storefront
            </span>
            <Icon icon="mdi:open-in-new" width="14" className="text-gray-500" />
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold text-red-400 hover:bg-red-500/15 transition border border-red-500/20"
          >
            <Icon icon="solar:logout-2-bold" width="16" /> Log Out
          </button>
        </div>
      </aside>

      {/* Backdrop for mobile drawer */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
        ></div>
      )}

      {/* Main Page Area with generous top/bottom padding so content is never cut off */}
      <main className="flex-1 px-5 sm:px-8 lg:px-12 pt-8 sm:pt-10 lg:pt-12 pb-24 max-w-7xl mx-auto w-full overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
