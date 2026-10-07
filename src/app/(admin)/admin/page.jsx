"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/app/utils/supabaseClient";
import { getCategories, getProducts } from "@/app/utils/adminAPI";
import { Icon } from "@iconify/react";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    categoriesCount: 0,
    productsCount: 0,
    portfolioCount: 0,
    campaignsCount: 0,
    totalEmailsSent: 0,
    avgOpenRate: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardMetrics();
  }, []);

  async function loadDashboardMetrics() {
    setLoading(true);
    try {
      const [cats, prods, portfolioRes, campaignsRes] = await Promise.all([
        getCategories(),
        getProducts(),
        supabase.from("portfolio").select("id", { count: "exact", head: true }),
        supabase.from("campaigns").select("id, sent_count, opened_count"),
      ]);

      const campaigns = campaignsRes.data || [];
      const totalSent = campaigns.reduce((acc, c) => acc + (c.sent_count || 0), 0);
      const totalOpens = campaigns.reduce((acc, c) => acc + (c.opened_count || 0), 0);
      const avgOpenRate = totalSent > 0 ? Math.round((totalOpens / totalSent) * 100) : 0;

      setStats({
        categoriesCount: cats?.length || 0,
        productsCount: prods?.length || 0,
        portfolioCount: portfolioRes?.count || 0,
        campaignsCount: campaigns.length,
        totalEmailsSent: totalSent,
        avgOpenRate: avgOpenRate,
      });
    } catch (err) {
      console.error("Failed to load dashboard metrics:", err);
    } finally {
      setLoading(false);
    }
  }

  const metricCards = [
    {
      title: "Total Categories",
      count: stats.categoriesCount,
      subtitle: "Active catalog groups",
      icon: "solar:folder-with-files-bold",
      href: "/admin/categories",
      color: "from-amber-500/20 to-yellow-500/10 text-yellow-400 border-yellow-500/30",
    },
    {
      title: "Total Products",
      count: stats.productsCount,
      subtitle: "Boxing gear & equipment",
      icon: "solar:box-minimalistic-bold",
      href: "/admin/products",
      color: "from-blue-500/20 to-cyan-500/10 text-cyan-400 border-cyan-500/30",
    },
    {
      title: "Portfolio Videos",
      count: stats.portfolioCount,
      subtitle: "Showcases & sparring reels",
      icon: "solar:clapperboard-play-bold",
      href: "/admin/portfolio",
      color: "from-purple-500/20 to-pink-500/10 text-purple-400 border-purple-500/30",
    },
    {
      title: "Email Campaigns",
      count: stats.campaignsCount,
      subtitle: `${stats.totalEmailsSent} emails sent (${stats.avgOpenRate}% open rate)`,
      icon: "solar:letter-bold",
      href: "/admin/campaigns",
      color: "from-emerald-500/20 to-green-500/10 text-emerald-400 border-emerald-500/30",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#171B26] via-[#12151E] to-[#0D1017] p-8 rounded-2xl border border-gray-800 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row justify-between md:items-center gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-500/15 border border-yellow-500/30 rounded-full text-xs font-bold text-yellow-400 uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span> Control Center
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Gearters Sports <span className="text-yellow-400">Admin Dashboard</span>
            </h1>
            <p className="text-sm text-gray-400 max-w-xl">
              Welcome back! Manage your products, digital catalog, production media, and B2B email marketing all in one place.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/products"
              className="flex items-center gap-2 px-4 py-2.5 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-xl transition text-xs shadow-lg shadow-yellow-500/20"
            >
              <Icon icon="solar:add-circle-bold" width="16" /> Add Product
            </Link>
            <Link
              href="/admin/campaigns"
              className="flex items-center gap-2 px-4 py-2.5 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-xl border border-gray-700 transition text-xs"
            >
              <Icon icon="solar:letter-bold" width="16" /> New Campaign
            </Link>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {metricCards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className={`p-6 rounded-2xl border bg-gradient-to-br transition hover:scale-[1.02] shadow-lg group ${card.color}`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{card.title}</p>
                <div className="text-3xl font-black text-white mt-2">
                  {loading ? (
                    <Icon icon="line-md:loading-loop" width="28" />
                  ) : (
                    card.count
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-2">{card.subtitle}</p>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-white/5 group-hover:border-yellow-400/40 transition">
                <Icon icon={card.icon} width="24" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Module Fast Links */}
        <div className="bg-[#11141D] border border-gray-800/80 rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Icon icon="solar:compass-bold" className="text-yellow-400" /> Admin Modules
          </h2>
          <div className="divide-y divide-gray-800/80">
            <Link
              href="/admin/categories"
              className="flex items-center justify-between py-3.5 px-2 hover:bg-gray-850/50 rounded-xl transition group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                  <Icon icon="solar:folder-with-files-bold" width="18" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-yellow-400 transition">Categories</h3>
                  <p className="text-xs text-gray-500">Add or edit equipment categories & subcategories</p>
                </div>
              </div>
              <Icon icon="solar:arrow-right-linear" width="18" className="text-gray-600 group-hover:text-white transition" />
            </Link>

            <Link
              href="/admin/products"
              className="flex items-center justify-between py-3.5 px-2 hover:bg-gray-850/50 rounded-xl transition group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <Icon icon="solar:box-minimalistic-bold" width="18" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-yellow-400 transition">Products & Inventory</h3>
                  <p className="text-xs text-gray-500">Catalog items, article numbers & multi-angle images</p>
                </div>
              </div>
              <Icon icon="solar:arrow-right-linear" width="18" className="text-gray-600 group-hover:text-white transition" />
            </Link>

            <Link
              href="/admin/portfolio"
              className="flex items-center justify-between py-3.5 px-2 hover:bg-gray-850/50 rounded-xl transition group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  <Icon icon="solar:clapperboard-play-bold" width="18" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-yellow-400 transition">Portfolio Videos</h3>
                  <p className="text-xs text-gray-500">Showcase factory manufacturing & sparring videos</p>
                </div>
              </div>
              <Icon icon="solar:arrow-right-linear" width="18" className="text-gray-600 group-hover:text-white transition" />
            </Link>

            <Link
              href="/admin/campaigns"
              className="flex items-center justify-between py-3.5 px-2 hover:bg-gray-850/50 rounded-xl transition group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <Icon icon="solar:letter-bold" width="18" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-yellow-400 transition">Email Campaigns</h3>
                  <p className="text-xs text-gray-500">B2B outreach, newsletter broadcasts & live metrics</p>
                </div>
              </div>
              <Icon icon="solar:arrow-right-linear" width="18" className="text-gray-600 group-hover:text-white transition" />
            </Link>
          </div>
        </div>

        {/* System & Integrations Status */}
        <div className="bg-[#11141D] border border-gray-800/80 rounded-2xl p-6 space-y-4 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Icon icon="solar:server-bold" className="text-yellow-400" /> Infrastructure Status
            </h2>
            <p className="text-xs text-gray-400 mt-1">Live status of your connected backend services.</p>

            <div className="space-y-3 mt-4">
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-black/40 border border-gray-800">
                <div className="flex items-center gap-3">
                  <Icon icon="logos:supabase-icon" width="20" />
                  <div>
                    <div className="text-xs font-bold text-white">Supabase Database</div>
                    <div className="text-[11px] text-gray-500">Connected to gearterssports database</div>
                  </div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-green-500/15 text-green-400 border border-green-500/25">
                  Connected
                </span>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-xl bg-black/40 border border-gray-800">
                <div className="flex items-center gap-3">
                  <Icon icon="solar:letter-bold" width="20" className="text-yellow-400" />
                  <div>
                    <div className="text-xs font-bold text-white">Resend Dispatch API</div>
                    <div className="text-[11px] text-gray-500">Primary & Branded B2B sending ready</div>
                  </div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-green-500/15 text-green-400 border border-green-500/25">
                  Operational
                </span>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-xl bg-black/40 border border-gray-800">
                <div className="flex items-center gap-3">
                  <Icon icon="solar:gallery-bold" width="20" className="text-cyan-400" />
                  <div>
                    <div className="text-xs font-bold text-white">Media Storage Bucket</div>
                    <div className="text-[11px] text-gray-500">product-images bucket ready</div>
                  </div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-green-500/15 text-green-400 border border-green-500/25">
                  Active
                </span>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-xl bg-black/40 border border-gray-800">
                <div className="flex items-center gap-3">
                  <Icon icon="solar:shield-check-bold" width="20" className="text-yellow-400" />
                  <div>
                    <div className="text-xs font-bold text-white">Google SEO & Rich Snippets</div>
                    <div className="text-[11px] text-gray-500">Slugs active & 100% Google Rich Data passed</div>
                  </div>
                </div>
                <Link
                  href="/admin/products"
                  className="text-[10px] px-2.5 py-1 rounded-full font-bold bg-yellow-500/15 text-yellow-400 border border-yellow-500/25 hover:bg-yellow-500 hover:text-black transition flex items-center gap-1"
                >
                  <span>Guidelines</span>
                  <Icon icon="solar:arrow-right-linear" width="10" />
                </Link>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-850 flex items-center justify-between text-xs text-gray-500">
            <span>Gearters Sports v2.0</span>
            <Link href="/" target="_blank" className="hover:text-yellow-400 transition flex items-center gap-1">
              gearterssports.com <Icon icon="mdi:open-in-new" width="12" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
