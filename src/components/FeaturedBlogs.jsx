"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { getFeaturedBlogs } from "@/app/utils/adminAPI";

export default function FeaturedBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFeatured() {
      try {
        const data = await getFeaturedBlogs(3);
        if (data && data.length > 0) {
          setBlogs(data);
        } else {
          // Fallback starter data if database is fresh
          setBlogs([
            {
              id: 1,
              title: "How to Choose the Best Boxing Gloves for Sparring & Training in 2026",
              slug: "how-to-choose-the-best-boxing-gloves-for-sparring-training-2026",
              excerpt:
                "Selecting the right foam density, genuine cowhide leather, and wrist alignment support for high-impact sparring.",
              category: "Equipment Guide",
              read_time: "4 min read",
              cover_image:
                "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=800&auto=format&fit=crop",
              created_at: new Date().toISOString(),
            },
            {
              id: 2,
              title: "The Ultimate Guide to Custom OEM Boxing Equipment Manufacturing",
              slug: "the-ultimate-guide-to-custom-oem-boxing-equipment-manufacturing",
              excerpt:
                "How international combat brands engineer bespoke fight gear from private label leather stitching to custom logos.",
              category: "Manufacturing",
              read_time: "5 min read",
              cover_image:
                "https://images.unsplash.com/photo-1517438322307-e67111335449?q=80&w=800&auto=format&fit=crop",
              created_at: new Date().toISOString(),
            },
            {
              id: 3,
              title: "10oz vs 16oz Boxing Gloves: Understanding Weights, Density & Safety",
              slug: "10oz-vs-16oz-boxing-gloves-understanding-weights-density-safety",
              excerpt:
                "The scientific differences between competition 10oz gloves and training 16oz multi-layered protection gloves.",
              category: "Combat Gear",
              read_time: "3 min read",
              cover_image:
                "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
              created_at: new Date().toISOString(),
            },
          ]);
        }
      } catch (err) {
        console.error("Error loading featured blogs:", err);
      } finally {
        setLoading(false);
      }
    }

    loadFeatured();
  }, []);

  return (
    <section className="relative w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden font-sans transition-colors duration-300">
      {/* Subtle ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#FCA600]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#FCA600]/10 text-[#FCA600] border border-[#FCA600]/30 mb-3">
              <Icon icon="solar:document-text-bold" width="14" />
              Latest Insights & Guides
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#18181B] dark:text-white leading-tight">
              Featured Combat Sports <span className="text-[#FCA600]">Articles</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#4B4742] dark:text-gray-300 leading-relaxed">
              Discover industry manufacturing tips, combat gear guides, and glove engineering insights from our factory experts.
            </p>
          </div>

          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-transparent border-2 border-[#FCA600] text-[#FCA600] hover:bg-[#FCA600] hover:text-black font-bold text-sm transition-all duration-300 group self-start md:self-end shadow-sm"
          >
            <span>Explore All Articles</span>
            <Icon
              icon="solar:arrow-right-linear"
              width="18"
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>

        {/* 3 Featured Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <article
              key={blog.id}
              className="group flex flex-col rounded-3xl overflow-hidden border border-[#FCA600]/20 bg-white dark:bg-[#111827] shadow-lg hover:shadow-2xl hover:border-[#FCA600]/60 transition-all duration-500 hover:-translate-y-1"
            >
              {/* Card Media Banner */}
              <Link
                href={`/blogs/${blog.slug}`}
                className="relative h-52 w-full block overflow-hidden bg-black"
              >
                {blog.cover_image ? (
                  <img
                    src={blog.cover_image}
                    alt={blog.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-600">
                    <Icon icon="solar:gallery-bold" width="40" />
                  </div>
                )}
                {blog.category && (
                  <span className="absolute top-3 left-3 bg-black/80 backdrop-blur-md text-[#FCA600] font-bold text-[11px] uppercase tracking-wider px-3 py-1 rounded-full border border-[#FCA600]/30 shadow-md">
                    {blog.category}
                  </span>
                )}
              </Link>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-2 font-medium">
                    <span>
                      {blog.created_at
                        ? new Date(blog.created_at).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : ""}
                    </span>
                    <span>•</span>
                    <span>{blog.read_time || "4 min read"}</span>
                  </div>

                  <h3 className="text-lg font-bold text-[#18181B] dark:text-white line-clamp-2 mb-2 group-hover:text-[#FCA600] transition">
                    <Link href={`/blogs/${blog.slug}`}>
                      {blog.title}
                    </Link>
                  </h3>

                  <p className="text-xs sm:text-sm text-[#4B4742] dark:text-gray-300 line-clamp-3 leading-relaxed mb-4">
                    {blog.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                    {blog.author || "Gearters Sports"}
                  </span>
                  <Link
                    href={`/blogs/${blog.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#FCA600] hover:text-yellow-400 group-hover:translate-x-1 transition-transform"
                  >
                    Read Guide
                    <Icon icon="solar:arrow-right-linear" width="16" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
