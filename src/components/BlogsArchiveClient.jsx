"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";

export default function BlogsArchiveClient({ initialBlogs = [] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set();
    initialBlogs.forEach((b) => {
      if (b.category) set.add(b.category);
    });
    return Array.from(set);
  }, [initialBlogs]);

  // Filtered blogs
  const filteredBlogs = useMemo(() => {
    return initialBlogs.filter((blog) => {
      const matchesSearch =
        !searchQuery.trim() ||
        (blog.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (blog.excerpt || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (blog.category || "").toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "ALL" || blog.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [initialBlogs, searchQuery, selectedCategory]);

  // Top featured post for hero spotlight (if any)
  const featuredPost = useMemo(() => {
    return initialBlogs.find((b) => b.is_featured) || initialBlogs[0] || null;
  }, [initialBlogs]);

  return (
    <div className="min-h-screen dark:bg-black bg-[#FAF7F2] text-current pt-28 pb-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400 mb-6 font-medium">
          <Link href="/" className="hover:text-yellow-500 transition">
            Home
          </Link>
          <span>/</span>
          <span className="text-yellow-500 dark:text-yellow-400 font-semibold">Blogs & Articles</span>
        </nav>

        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-yellow-500/10 text-yellow-500 border border-yellow-500/30 mb-4">
            <Icon icon="solar:document-text-bold" width="16" />
            Gearters Sports Journal
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4">
            Insights, Guides & <span className="text-yellow-500">Combat Gear</span> Trends
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Explore expert guides on boxing equipment, OEM manufacturing standards, fighter training tips, and industry innovations directly from our sports lab.
          </p>
        </div>

        {/* Featured Hero Article Spotlight (if available) */}
        {featuredPost && (
          <div className="mb-14">
            <div className="relative rounded-3xl overflow-hidden border border-yellow-500/20 bg-white dark:bg-[#111827] shadow-2xl transition hover:border-yellow-500/40">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                {/* Hero Image */}
                <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-auto min-h-[300px] overflow-hidden bg-black">
                  {featuredPost.cover_image ? (
                    <img
                      src={featuredPost.cover_image}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-900 text-yellow-500">
                      <Icon icon="solar:gallery-bold" width="60" />
                    </div>
                  )}
                  <div className="absolute top-4 left-4 bg-yellow-500 text-black font-extrabold text-xs uppercase px-3 py-1 rounded-full shadow-lg">
                    Featured Story ⭐
                  </div>
                </div>

                {/* Hero Content */}
                <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-3 font-semibold">
                      <span className="text-yellow-500 font-bold uppercase tracking-wider">
                        {featuredPost.category || "Combat Gear"}
                      </span>
                      <span>•</span>
                      <span>{featuredPost.read_time || "4 min read"}</span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white leading-tight mb-4 hover:text-yellow-500 transition">
                      <Link href={`/blogs/${featuredPost.slug}`}>
                        {featuredPost.title}
                      </Link>
                    </h2>

                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3 mb-6">
                      {featuredPost.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <Icon icon="solar:user-bold" className="text-yellow-500" width="16" />
                      <span>{featuredPost.author || "Gearters Sports Team"}</span>
                    </div>

                    <Link
                      href={`/blogs/${featuredPost.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-yellow-500 hover:text-yellow-400 group transition"
                    >
                      <span>Read Story</span>
                      <Icon
                        icon="solar:arrow-right-linear"
                        className="group-hover:translate-x-1 transition-transform"
                        width="18"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filters & Search Toolbar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-gray-200 dark:border-gray-800">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <button
              onClick={() => setSelectedCategory("ALL")}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
                selectedCategory === "ALL"
                  ? "bg-yellow-500 text-black shadow-md shadow-yellow-500/20"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              All Articles
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
                  selectedCategory === cat
                    ? "bg-yellow-500 text-black shadow-md shadow-yellow-500/20"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Icon
              icon="solar:magnifer-linear"
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4"
            />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-gray-100 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 transition"
            />
          </div>
        </div>

        {/* Article Cards Grid */}
        {filteredBlogs.length === 0 ? (
          <div className="py-20 text-center">
            <Icon icon="solar:notes-bold" className="w-16 h-16 text-yellow-500/40 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">No articles found</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm max-w-sm mx-auto mt-2">
              We couldn't find any articles matching your search or category filter. Check back soon or browse all categories!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
              <article
                key={blog.id}
                className="group flex flex-col rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#111827] shadow-sm hover:shadow-xl hover:border-yellow-500/40 transition duration-300"
              >
                {/* Card Thumbnail */}
                <Link
                  href={`/blogs/${blog.slug}`}
                  className="relative h-56 w-full overflow-hidden bg-black block"
                >
                  {blog.cover_image ? (
                    <img
                      src={blog.cover_image}
                      alt={blog.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-600">
                      <Icon icon="solar:gallery-bold" width="36" />
                    </div>
                  )}
                  {blog.category && (
                    <span className="absolute top-3 left-3 bg-black/80 backdrop-blur-md text-yellow-400 font-bold text-[11px] uppercase tracking-wider px-3 py-1 rounded-full border border-yellow-500/30">
                      {blog.category}
                    </span>
                  )}
                </Link>

                {/* Card Body */}
                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    {/* Meta Info */}
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-2.5 font-medium">
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

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2.5 line-clamp-2 group-hover:text-yellow-500 transition">
                      <Link href={`/blogs/${blog.slug}`}>
                        {blog.title}
                      </Link>
                    </h3>

                    {/* Excerpt */}
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed mb-4">
                      {blog.excerpt}
                    </p>
                  </div>

                  {/* Footer link */}
                  <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      By {blog.author || "Gearters Sports"}
                    </span>
                    <Link
                      href={`/blogs/${blog.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-yellow-500 hover:text-yellow-400 group-hover:translate-x-1 transition-transform"
                    >
                      Read More
                      <Icon icon="solar:arrow-right-linear" width="16" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
