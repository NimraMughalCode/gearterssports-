"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import toast from "react-hot-toast";

export default function AdminSeoGuideline() {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("rules"); // "standings" | "rules" | "reality" | "template"

  const sampleTemplate = `The [Product Name] (Art No. [Article No]) is engineered for professional combat training and sparring. Handcrafted from premium genuine cowhide leather with multi-layered shock-absorbing EVA foam padding for superior knuckle protection and wrist support. Features an ergonomic fit, secure wrap-around Velcro wrist closure, and breathable moisture-wicking palm mesh. Built for gym owners, fight academies, and retail sports brands. Available for custom logo printing, private labeling, and bulk export orders worldwide with low MOQ.`;

  const copyTemplate = () => {
    navigator.clipboard.writeText(sampleTemplate);
    toast.success("Description template copied to clipboard!");
  };

  return (
    <div className="bg-[#121212] border border-yellow-500/30 rounded-2xl p-5 md:p-6 shadow-xl mb-8 transition-all">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-gray-800">
        <div className="flex items-start gap-3">
          <div className="p-2.5 bg-yellow-500/10 border border-yellow-500/30 rounded-xl text-yellow-400 mt-0.5">
            <Icon icon="solar:shield-check-bold" width="26" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-bold text-white tracking-wide">
                SEO & Product Management Guide
              </h2>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                100% Google Rich Data Passed ✓
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Official guide for product upload rules, current Google standing, and international B2B buyer targeting.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <a
            href="/Gearters_Sports_SEO_Report.pdf"
            download="Gearters_Sports_SEO_Report.pdf"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-500 text-black font-semibold rounded-lg text-xs hover:bg-yellow-400 transition"
            title="Download PDF Client Report"
          >
            <Icon icon="solar:document-bold" width="16" />
            <span>Download PDF Report</span>
          </a>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-xs font-medium transition flex items-center gap-1 border border-gray-700"
          >
            <Icon icon={isOpen ? "solar:alt-arrow-up-linear" : "solar:alt-arrow-down-linear"} width="14" />
            <span>{isOpen ? "Collapse" : "Expand Guide"}</span>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="mt-5 space-y-5 animate-in fade-in duration-200">
          {/* Status Badges Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-[#181818] border border-gray-800 rounded-xl p-3 text-center">
              <span className="text-[11px] text-gray-400 block">Google Search</span>
              <span className="text-xs font-bold text-emerald-400 flex items-center justify-center gap-1 mt-0.5">
                <Icon icon="solar:check-circle-bold" width="14" /> Indexed & Live
              </span>
            </div>
            <div className="bg-[#181818] border border-gray-800 rounded-xl p-3 text-center">
              <span className="text-[11px] text-gray-400 block">Clean SEO Slugs</span>
              <span className="text-xs font-bold text-yellow-400 flex items-center justify-center gap-1 mt-0.5">
                <Icon icon="solar:link-bold" width="14" /> /products/[slug] Active
              </span>
            </div>
            <div className="bg-[#181818] border border-gray-800 rounded-xl p-3 text-center">
              <span className="text-[11px] text-gray-400 block">301 Redirects</span>
              <span className="text-xs font-bold text-blue-400 flex items-center justify-center gap-1 mt-0.5">
                <Icon icon="solar:traffic-bold" width="14" /> Zero 404 Errors
              </span>
            </div>
            <div className="bg-[#181818] border border-gray-800 rounded-xl p-3 text-center">
              <span className="text-[11px] text-gray-400 block">Top Ranking</span>
              <span className="text-xs font-bold text-amber-300 flex items-center justify-center gap-1 mt-0.5">
                <Icon icon="solar:cup-star-bold" width="14" /> GS-1003 (#1 on Google)
              </span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 border-b border-gray-800 pb-3">
            <button
              onClick={() => setActiveTab("rules")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
                activeTab === "rules"
                  ? "bg-yellow-500 text-black shadow-md"
                  : "bg-gray-800/80 text-gray-400 hover:text-white"
              }`}
            >
              <Icon icon="solar:checklist-bold" width="15" />
              <span>Rules to Add Products</span>
            </button>

            <button
              onClick={() => setActiveTab("standings")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
                activeTab === "standings"
                  ? "bg-yellow-500 text-black shadow-md"
                  : "bg-gray-800/80 text-gray-400 hover:text-white"
              }`}
            >
              <Icon icon="solar:chart-square-bold" width="15" />
              <span>Where We Are Standing</span>
            </button>

            <button
              onClick={() => setActiveTab("reality")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
                activeTab === "reality"
                  ? "bg-yellow-500 text-black shadow-md"
                  : "bg-gray-800/80 text-gray-400 hover:text-white"
              }`}
            >
              <Icon icon="solar:lightbulb-bolt-bold" width="15" />
              <span>What CAN vs CANNOT Be Done</span>
            </button>

            <button
              onClick={() => setActiveTab("template")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
                activeTab === "template"
                  ? "bg-yellow-500 text-black shadow-md"
                  : "bg-gray-800/80 text-gray-400 hover:text-white"
              }`}
            >
              <Icon icon="solar:copy-bold" width="15" />
              <span>Description Copy-Paste Template</span>
            </button>
          </div>

          {/* TAB 1: RULES FOR ADDING PRODUCTS */}
          {activeTab === "rules" && (
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Rule A */}
                <div className="bg-[#181818] border border-gray-800 p-4 rounded-xl space-y-2">
                  <div className="flex items-center gap-2 text-yellow-400 font-bold text-sm">
                    <Icon icon="solar:text-bold" width="16" />
                    <span>Rule 1: Product Name (Title)</span>
                  </div>
                  <p className="text-gray-300">
                    Keep the title clean and describe what the item is. <strong>Do NOT type &ldquo;Gearter&rdquo; in front</strong> of the name because the website automatically appends &ldquo;Gearters Sports&rdquo; at the end for Google.
                  </p>
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div className="p-2.5 bg-red-950/30 border border-red-900/50 rounded-lg text-red-300">
                      <strong className="block text-red-400 mb-0.5">❌ Do Not Use:</strong>
                      Gearter Combat Shorts<br />
                      Gearter Pro Gloves
                    </div>
                    <div className="p-2.5 bg-emerald-950/30 border border-emerald-900/50 rounded-lg text-emerald-300">
                      <strong className="block text-emerald-400 mb-0.5">✓ Best Practice:</strong>
                      Combat Fight Shorts<br />
                      Pro Competition Gloves
                    </div>
                  </div>
                  <p className="text-[11px] text-gray-400 pt-1">
                    <em>Important: Always enter the accurate <strong>Article Number</strong> (e.g. GS-1003, S-0001). Foreign buyers search using exact codes!</em>
                  </p>
                </div>

                {/* Rule B */}
                <div className="bg-[#181818] border border-gray-800 p-4 rounded-xl space-y-2">
                  <div className="flex items-center gap-2 text-yellow-400 font-bold text-sm">
                    <Icon icon="solar:document-text-bold" width="16" />
                    <span>Rule 2: Product Description (Crucial!)</span>
                  </div>
                  <p className="text-gray-300">
                    <strong>Never write just 1 sentence!</strong> A 1-sentence description gives Google almost zero words to rank. Aim for <strong>80 to 120 words</strong> covering:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-gray-300 pt-1">
                    <li><strong className="text-white">Material:</strong> Cowhide leather, 4-way stretch polyester, EVA foam.</li>
                    <li><strong className="text-white">Closure:</strong> Wrap-around Velcro, lace-up, drawstring waistband.</li>
                    <li><strong className="text-white">Usage:</strong> Pro sparring, heavy bag conditioning, competition.</li>
                    <li><strong className="text-white">Wholesale line:</strong> <em>&ldquo;Available for custom logo printing, private labeling, and bulk export worldwide.&rdquo;</em></li>
                  </ul>
                </div>
              </div>

              {/* Rule C */}
              <div className="bg-[#181818] border border-gray-800 p-4 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-yellow-400 font-bold text-sm">
                  <Icon icon="solar:camera-bold" width="16" />
                  <span>Rule 3: Multi-Angle Photography</span>
                </div>
                <p className="text-gray-300">
                  Upload crisp, clean photos on clean or transparent backgrounds. Adding 2 to 3 photos (front view, back view, wrist closure or palm mesh) lets international importers inspect stitching and craftsmanship.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: WHERE WE ARE STANDING */}
          {activeTab === "standings" && (
            <div className="space-y-4 text-xs text-gray-300">
              <div className="bg-[#181818] border border-gray-800 p-4 rounded-xl space-y-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Icon icon="solar:star-circle-bold" className="text-yellow-400" width="18" />
                  Current Achievements on Google:
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✔</span>
                    <div>
                      <strong className="text-white">#1 Ranking on Google Search:</strong> Searching for exact codes like <code>Pro Competition Gloves (Art No. GS-1003)</code> ranks Gearters Sports at the #1 position on Google.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✔</span>
                    <div>
                      <strong className="text-white">Clean URL Slugs:</strong> Replaced generic numbers (like <code>/productview/23</code>) with SEO keywords in URLs (e.g. <code>/products/pro-competition-gloves-gs-1003</code>).
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✔</span>
                    <div>
                      <strong className="text-white">100% Passed Google Rich Results:</strong> Tested on Google&apos;s official tool with green checkmarks for Product, SKU, Breadcrumbs, and Brand.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✔</span>
                    <div>
                      <strong className="text-white">Safe 301 Permanent Redirects:</strong> Any buyer or crawler visiting old links gets forwarded to the new slug URL with zero broken links.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✔</span>
                    <div>
                      <strong className="text-white">Official Brand Registration:</strong> Google Knowledge Graph now recognizes <strong>Gearters Sports</strong> as an official manufacturing brand, stopping spellcheck confusions with &ldquo;Greater&rdquo;.
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 3: WHAT CAN VS CANNOT BE DONE */}
          {activeTab === "reality" && (
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* What CAN be done */}
                <div className="bg-emerald-950/20 border border-emerald-900/50 p-4 rounded-xl space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                    <Icon icon="solar:check-circle-bold" width="18" />
                    <span>What CAN Be Done (Our Winning Strategy)</span>
                  </div>
                  <ul className="space-y-2 text-gray-300">
                    <li>
                      <strong className="text-emerald-300">Rank #1 for Product Codes:</strong> When foreign buyers search for model codes like <code>GS-1003</code> or <code>PM-0021</code>, you rank at the top.
                    </li>
                    <li>
                      <strong className="text-emerald-300">Win B2B Factory Keywords:</strong> Rank for <em>&ldquo;custom boxing gloves manufacturer Sialkot&rdquo;</em>, <em>&ldquo;leather sparring gloves wholesale&rdquo;</em>, <em>&ldquo;OEM fight gear low MOQ&rdquo;</em> (65%–85% chance).
                    </li>
                    <li>
                      <strong className="text-emerald-300">Target Serious Importers:</strong> Attract gym owners, fight clubs, and retail sports brands ordering 50 to 500+ custom pairs.
                    </li>
                  </ul>
                </div>

                {/* What CANNOT be done */}
                <div className="bg-red-950/20 border border-red-900/50 p-4 rounded-xl space-y-2">
                  <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
                    <Icon icon="solar:close-circle-bold" width="18" />
                    <span>What CANNOT Be Done (And Why)</span>
                  </div>
                  <ul className="space-y-2 text-gray-300">
                    <li>
                      <strong className="text-red-300">Beating Amazon for &ldquo;boxing gloves&rdquo;:</strong> Multi-billion dollar retail giants (Amazon, Venum, Everlast) have 20+ years of domain authority and millions of backlinks.
                    </li>
                    <li>
                      <strong className="text-red-300">Ranking #1 for &ldquo;best boxing gloves&rdquo;:</strong> Google only shows magazine review articles (NYTimes Wirecutter, Men&apos;s Health) for this search, never individual product pages.
                    </li>
                    <li>
                      <strong className="text-yellow-300">Good News:</strong> You are an <strong>exporter/manufacturer</strong>, not a retail shop. Casual 1-piece retail shoppers are not your target audience anyway!
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: TEMPLATE */}
          {activeTab === "template" && (
            <div className="bg-[#181818] border border-gray-800 p-4 rounded-xl space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">Standard 100-Word Product Description Template:</span>
                <button
                  onClick={copyTemplate}
                  className="px-3 py-1.5 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-lg flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Icon icon="solar:copy-bold" width="14" />
                  <span>Copy Template</span>
                </button>
              </div>

              <div className="p-3 bg-[#0d0d0d] border border-gray-800 rounded-lg text-gray-300 font-mono text-[11.5px] leading-relaxed select-all">
                {sampleTemplate}
              </div>

              <p className="text-[11px] text-gray-400">
                <em>Tip: Whenever adding a new product, click <strong>&ldquo;Copy Template&rdquo;</strong>, paste it into the description box, and replace the bracketed details. This ensures every product has optimal SEO keywords!</em>
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
