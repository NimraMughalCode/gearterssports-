"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/app/utils/supabaseClient";
import {
  getBlogs,
  addBlog,
  updateBlog,
  deleteBlog,
  generateBlogSlug,
} from "@/app/utils/adminAPI";
import toast from "react-hot-toast";
import { Icon } from "@iconify/react";

const CATEGORY_SUGGESTIONS = [
  "Equipment Guide",
  "Boxing & Combat",
  "Manufacturing & OEM",
  "Training & Technique",
  "Industry News",
  "Product Spotlight",
];

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("list"); // 'list' | 'editor'
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("ALL");
  const [filterStatus, setFilterStatus] = useState("ALL");

  // Form State
  const [editingBlogId, setEditingBlogId] = useState(null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugManualEdit, setSlugManualEdit] = useState(false);
  const [category, setCategory] = useState("Equipment Guide");
  const [author, setAuthor] = useState("Gearters Sports Team");
  const [readTime, setReadTime] = useState("4 min read");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [coverImageType, setCoverImageType] = useState("url"); // 'file' | 'url'
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [coverImageFile, setCoverImageFile] = useState(null);
  const [isFeatured, setIsFeatured] = useState(false);
  const [isPublished, setIsPublished] = useState(true);

  // SEO Fields
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaKeywords, setMetaKeywords] = useState("");
  const [showSeoSettings, setShowSeoSettings] = useState(false);
  const [editorMode, setEditorMode] = useState("edit"); // 'edit' | 'preview'
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchBlogList();
  }, []);

  async function fetchBlogList() {
    setLoading(true);
    try {
      const data = await getBlogs();
      setBlogs(data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load blogs");
    } finally {
      setLoading(false);
    }
  }

  // Auto-slug update when typing title (unless user explicitly edited slug)
  const handleTitleChange = (val) => {
    setTitle(val);
    if (!slugManualEdit) {
      setSlug(generateBlogSlug(val));
    }
    if (!metaTitle) {
      setMetaTitle(val ? `${val} | Gearters Sports` : "");
    }
  };

  // Word count & read time estimator
  useEffect(() => {
    if (content) {
      const words = content.trim().split(/\s+/).filter(Boolean).length;
      const minutes = Math.max(1, Math.ceil(words / 200));
      setReadTime(`${minutes} min read`);
    }
  }, [content]);

  // Insert markdown snippets into content
  const insertFormatting = (prefix, suffix = "") => {
    const textarea = document.getElementById("blog-content-textarea");
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const current = textarea.value;
    const selected = current.substring(start, end) || "text";

    const replacement = `${prefix}${selected}${suffix}`;
    const nextVal = current.substring(0, start) + replacement + current.substring(end);
    setContent(nextVal);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + selected.length);
    }, 0);
  };

  const resetForm = () => {
    setEditingBlogId(null);
    setTitle("");
    setSlug("");
    setSlugManualEdit(false);
    setCategory("Equipment Guide");
    setAuthor("Gearters Sports Team");
    setReadTime("4 min read");
    setExcerpt("");
    setContent("");
    setCoverImageType("url");
    setCoverImageUrl("");
    setCoverImageFile(null);
    setIsFeatured(false);
    setIsPublished(true);
    setMetaTitle("");
    setMetaDescription("");
    setMetaKeywords("");
    setEditorMode("edit");
  };

  const handleStartCreate = () => {
    resetForm();
    setActiveTab("editor");
  };

  const handleStartEdit = (blog) => {
    setEditingBlogId(blog.id);
    setTitle(blog.title || "");
    setSlug(blog.slug || "");
    setSlugManualEdit(true);
    setCategory(blog.category || "Equipment Guide");
    setAuthor(blog.author || "Gearters Sports Team");
    setReadTime(blog.read_time || "4 min read");
    setExcerpt(blog.excerpt || "");
    setContent(blog.content || "");
    setCoverImageType(blog.cover_image?.startsWith("http") ? "url" : "url");
    setCoverImageUrl(blog.cover_image || "");
    setCoverImageFile(null);
    setIsFeatured(Boolean(blog.is_featured));
    setIsPublished(Boolean(blog.is_published));
    setMetaTitle(blog.meta_title || "");
    setMetaDescription(blog.meta_description || "");
    setMetaKeywords(blog.meta_keywords || "");
    setActiveTab("editor");
  };

  const handleSaveBlog = async (e) => {
    e.preventDefault();

    if (!title.trim()) return toast.error("Please enter an article title");
    if (!content.trim()) return toast.error("Please write some article content");

    const finalSlug = (slug || generateBlogSlug(title)).trim();
    if (!finalSlug) return toast.error("Please provide a valid URL slug");

    setIsSubmitting(true);
    const toastId = toast.loading(editingBlogId ? "Updating article..." : "Publishing article...");

    try {
      let finalCoverImage = coverImageUrl;

      // Handle file upload to Supabase Storage if file is chosen
      if (coverImageType === "file" && coverImageFile) {
        const fileExt = coverImageFile.name.split(".").pop();
        const fileName = `blogs/${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("product-images")
          .upload(fileName, coverImageFile);

        if (uploadError) {
          throw new Error("Cover image upload failed: " + uploadError.message);
        }

        const { data: { publicUrl } } = supabase.storage
          .from("product-images")
          .getPublicUrl(fileName);

        finalCoverImage = publicUrl;
      }

      const blogPayload = {
        title: title.trim(),
        slug: finalSlug,
        excerpt: excerpt.trim() || title.trim(),
        content: content.trim(),
        cover_image: finalCoverImage,
        category: category || "Boxing & Combat",
        author: author || "Gearters Sports Team",
        read_time: readTime || "4 min read",
        is_featured: Boolean(isFeatured),
        is_published: Boolean(isPublished),
        meta_title: metaTitle.trim() || `${title.trim()} | Gearters Sports`,
        meta_description: metaDescription.trim() || excerpt.trim() || title.trim(),
        meta_keywords: metaKeywords.trim(),
      };

      if (editingBlogId) {
        await updateBlog({ id: editingBlogId, ...blogPayload });
        toast.success("Article updated successfully!", { id: toastId });
      } else {
        await addBlog(blogPayload);
        toast.success("Article published successfully!", { id: toastId });
      }

      await fetchBlogList();
      resetForm();
      setActiveTab("list");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to save article", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (blog) => {
    if (!window.confirm(`Are you sure you want to permanently delete "${blog.title}"?`)) {
      return;
    }

    const toastId = toast.loading("Deleting article...");
    try {
      await deleteBlog(blog.id);
      toast.success("Article deleted successfully", { id: toastId });
      setBlogs((prev) => prev.filter((b) => b.id !== blog.id));
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete article: " + err.message, { id: toastId });
    }
  };

  const handleToggleFeatured = async (blog) => {
    const nextVal = !blog.is_featured;
    try {
      await updateBlog({ id: blog.id, is_featured: nextVal });
      setBlogs((prev) =>
        prev.map((b) => (b.id === blog.id ? { ...b, is_featured: nextVal } : b))
      );
      toast.success(nextVal ? "Marked as Featured on Landing Page" : "Removed from Featured");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update featured status");
    }
  };

  const handleTogglePublished = async (blog) => {
    const nextVal = !blog.is_published;
    try {
      await updateBlog({ id: blog.id, is_published: nextVal });
      setBlogs((prev) =>
        prev.map((b) => (b.id === blog.id ? { ...b, is_published: nextVal } : b))
      );
      toast.success(nextVal ? "Article is now Published (Live)" : "Article set to Draft");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    }
  };

  // Filtered blogs
  const filteredBlogs = blogs.filter((b) => {
    const matchesSearch =
      (b.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (b.slug || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (b.category || "").toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      filterCategory === "ALL" || b.category === filterCategory;

    const matchesStatus =
      filterStatus === "ALL" ||
      (filterStatus === "PUBLISHED" && b.is_published) ||
      (filterStatus === "DRAFT" && !b.is_published) ||
      (filterStatus === "FEATURED" && b.is_featured);

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const allCategories = [
    ...new Set(blogs.map((b) => b.category).filter(Boolean)),
  ];

  return (
    <div className="space-y-6">
      {/* Top Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#161B22] p-6 rounded-2xl border border-gray-800">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Icon icon="solar:document-text-bold" className="text-yellow-400 w-7 h-7" />
            Blog & Article Manager
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Create, publish, and manage SEO-optimized articles, guides, and combat sports journals.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {activeTab === "editor" ? (
            <button
              onClick={() => {
                resetForm();
                setActiveTab("list");
              }}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-200 text-sm font-semibold rounded-xl border border-gray-700 transition"
            >
              <Icon icon="solar:arrow-left-linear" width="18" />
              Back to Articles
            </button>
          ) : (
            <button
              onClick={handleStartCreate}
              className="flex items-center gap-2 px-5 py-2.5 bg-yellow-500 hover:bg-yellow-400 text-black text-sm font-bold rounded-xl transition shadow-lg shadow-yellow-500/20"
            >
              <Icon icon="solar:add-circle-bold" width="20" />
              Write New Article
            </button>
          )}

          <Link
            href="/blogs"
            target="_blank"
            className="flex items-center gap-1.5 px-3.5 py-2 bg-gray-800/80 hover:bg-gray-700 text-yellow-400 text-sm font-medium rounded-xl border border-yellow-500/30 transition"
          >
            <Icon icon="solar:external-link-bold" width="16" />
            View Blog Page
          </Link>
        </div>
      </div>

      {/* TAB 1: BLOG LIST & STATS */}
      {activeTab === "list" && (
        <div className="space-y-6">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-[#161B22] border border-gray-800 p-4 rounded-xl">
              <span className="text-xs text-gray-400 uppercase font-semibold">Total Articles</span>
              <p className="text-2xl font-bold text-white mt-1">{blogs.length}</p>
            </div>
            <div className="bg-[#161B22] border border-gray-800 p-4 rounded-xl">
              <span className="text-xs text-green-400 uppercase font-semibold">Published (Live)</span>
              <p className="text-2xl font-bold text-green-400 mt-1">
                {blogs.filter((b) => b.is_published).length}
              </p>
            </div>
            <div className="bg-[#161B22] border border-gray-800 p-4 rounded-xl">
              <span className="text-xs text-yellow-400 uppercase font-semibold">Featured on Home</span>
              <p className="text-2xl font-bold text-yellow-400 mt-1">
                {blogs.filter((b) => b.is_featured).length}
              </p>
            </div>
            <div className="bg-[#161B22] border border-gray-800 p-4 rounded-xl">
              <span className="text-xs text-gray-500 uppercase font-semibold">Drafts</span>
              <p className="text-2xl font-bold text-gray-300 mt-1">
                {blogs.filter((b) => !b.is_published).length}
              </p>
            </div>
          </div>

          {/* Search & Filters */}
          <div className="bg-[#161B22] border border-gray-800 p-4 rounded-xl flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="relative w-full sm:w-80">
              <Icon
                icon="solar:magnifer-linear"
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4"
              />
              <input
                type="text"
                placeholder="Search articles, slugs, tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400"
              />
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="bg-gray-900 border border-gray-700 text-gray-300 text-sm rounded-lg px-3 py-2 outline-none focus:border-yellow-400"
              >
                <option value="ALL">All Categories</option>
                {allCategories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-gray-900 border border-gray-700 text-gray-300 text-sm rounded-lg px-3 py-2 outline-none focus:border-yellow-400"
              >
                <option value="ALL">All Status</option>
                <option value="PUBLISHED">Published Only</option>
                <option value="FEATURED">Featured Only</option>
                <option value="DRAFT">Drafts Only</option>
              </select>
            </div>
          </div>

          {/* Blogs Table / List */}
          {loading ? (
            <div className="bg-[#161B22] border border-gray-800 p-12 rounded-2xl flex flex-col items-center justify-center text-yellow-400 gap-3">
              <Icon icon="line-md:loading-loop" width="40" />
              <p className="text-gray-400 text-sm">Loading articles from database...</p>
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="bg-[#161B22] border border-gray-800 p-12 rounded-2xl text-center">
              <Icon
                icon="solar:notes-bold"
                className="w-14 h-14 text-gray-600 mx-auto mb-3"
              />
              <h3 className="text-lg font-bold text-white">No articles found</h3>
              <p className="text-gray-400 text-sm max-w-md mx-auto mt-1 mb-5">
                {blogs.length === 0
                  ? "You have not published any articles yet. Create your first combat sports guide or manufacturing blog!"
                  : "No articles matched your filter or search criteria."}
              </p>
              <button
                onClick={handleStartCreate}
                className="px-5 py-2.5 bg-yellow-500 hover:bg-yellow-400 text-black text-sm font-bold rounded-xl transition"
              >
                Create First Article
              </button>
            </div>
          ) : (
            <div className="bg-[#161B22] border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-300">
                  <thead className="bg-gray-900/80 text-xs uppercase text-gray-400 border-b border-gray-800">
                    <tr>
                      <th className="px-5 py-3.5">Article</th>
                      <th className="px-4 py-3.5">Category</th>
                      <th className="px-4 py-3.5">Status</th>
                      <th className="px-4 py-3.5 text-center">Featured on Home</th>
                      <th className="px-4 py-3.5">Created</th>
                      <th className="px-5 py-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800/60">
                    {filteredBlogs.map((b) => (
                      <tr key={b.id} className="hover:bg-gray-800/40 transition">
                        {/* Article Info */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-14 h-14 rounded-lg bg-gray-800 border border-gray-700 overflow-hidden flex-shrink-0 relative">
                              {b.cover_image ? (
                                <img
                                  src={b.cover_image}
                                  alt={b.title}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-600">
                                  <Icon icon="solar:gallery-bold" width="22" />
                                </div>
                              )}
                            </div>
                            <div className="min-w-0 max-w-sm">
                              <p className="font-semibold text-white truncate text-base hover:text-yellow-400 transition">
                                {b.title}
                              </p>
                              <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                                <span className="font-mono text-yellow-500/80">
                                  /blogs/{b.slug}
                                </span>
                                <span>•</span>
                                <span>{b.read_time || "3 min read"}</span>
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/30">
                            {b.category || "General"}
                          </span>
                        </td>

                        {/* Status (Live toggle) */}
                        <td className="px-4 py-4 whitespace-nowrap">
                          <button
                            onClick={() => handleTogglePublished(b)}
                            className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 transition ${
                              b.is_published
                                ? "bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30"
                                : "bg-gray-700/50 text-gray-400 border border-gray-600 hover:bg-gray-700"
                            }`}
                          >
                            <span
                              className={`w-2 h-2 rounded-full ${
                                b.is_published ? "bg-green-400 animate-pulse" : "bg-gray-500"
                              }`}
                            />
                            {b.is_published ? "Published" : "Draft"}
                          </button>
                        </td>

                        {/* Featured (Home toggle) */}
                        <td className="px-4 py-4 text-center whitespace-nowrap">
                          <button
                            onClick={() => handleToggleFeatured(b)}
                            title={
                              b.is_featured
                                ? "Featured on Landing Page (Click to unfeature)"
                                : "Click to feature on Landing Page"
                            }
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition ${
                              b.is_featured
                                ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/40"
                                : "bg-gray-800 text-gray-500 border border-gray-700 hover:text-gray-300"
                            }`}
                          >
                            <Icon
                              icon="solar:star-bold"
                              className={b.is_featured ? "text-yellow-400" : "text-gray-600"}
                              width="14"
                            />
                            {b.is_featured ? "Featured ⭐" : "Standard"}
                          </button>
                        </td>

                        {/* Date */}
                        <td className="px-4 py-4 whitespace-nowrap text-xs text-gray-400">
                          {b.created_at
                            ? new Date(b.created_at).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })
                            : "—"}
                        </td>

                        {/* Actions */}
                        <td className="px-5 py-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-2">
                            {b.is_published && (
                              <Link
                                href={`/blogs/${b.slug}`}
                                target="_blank"
                                title="View Live Article"
                                className="p-2 text-gray-400 hover:text-yellow-400 hover:bg-gray-800 rounded-lg transition"
                              >
                                <Icon icon="solar:eye-bold" width="18" />
                              </Link>
                            )}

                            <button
                              onClick={() => handleStartEdit(b)}
                              title="Edit Article"
                              className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition"
                            >
                              <Icon icon="solar:pen-bold" width="18" />
                            </button>

                            <button
                              onClick={() => handleDelete(b)}
                              title="Delete Article"
                              className="p-2 text-red-400/80 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition"
                            >
                              <Icon icon="solar:trash-bin-trash-bold" width="18" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: WRITE / EDIT ARTICLE FORM */}
      {activeTab === "editor" && (
        <form onSubmit={handleSaveBlog} className="space-y-6">
          <div className="bg-[#161B22] border border-gray-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="border-b border-gray-800 pb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">
                  {editingBlogId ? "Edit Article" : "Write New Article"}
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  Write in Markdown or rich text with SEO meta tags and live Google preview.
                </p>
              </div>

              {/* Status toggles in header */}
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-xs font-semibold text-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="w-4 h-4 accent-yellow-500 rounded cursor-pointer"
                  />
                  <span>Feature on Homepage ⭐</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-semibold text-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isPublished}
                    onChange={(e) => setIsPublished(e.target.checked)}
                    className="w-4 h-4 accent-green-500 rounded cursor-pointer"
                  />
                  <span>Publish Immediately</span>
                </label>
              </div>
            </div>

            {/* Title & Slug */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-300 mb-1.5">
                  Article Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 7 Key Differences Between Pro Fight and Sparring Gloves"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white font-medium text-lg placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition"
                />
              </div>

              {/* Slug (URL) Bar */}
              <div className="bg-gray-900/80 border border-gray-800 p-3.5 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-sm flex-1">
                  <span className="text-gray-400 text-xs font-mono">
                    https://www.gearterssports.com/blogs/
                  </span>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => {
                      setSlugManualEdit(true);
                      setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"));
                    }}
                    placeholder="custom-article-slug"
                    className="flex-1 bg-black/60 border border-yellow-500/30 rounded-lg px-2.5 py-1 text-yellow-400 font-mono text-xs focus:outline-none focus:border-yellow-400"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSlugManualEdit(false);
                    setSlug(generateBlogSlug(title));
                    toast.success("Slug re-generated from title");
                  }}
                  className="text-xs text-gray-400 hover:text-yellow-400 transition underline whitespace-nowrap"
                >
                  Regenerate from Title
                </button>
              </div>
            </div>

            {/* Category, Author, Read Time */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-300 mb-1.5">
                  Category
                </label>
                <div className="space-y-1.5">
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="e.g. Equipment Guide"
                    className="w-full px-3.5 py-2.5 bg-gray-900 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:border-yellow-400"
                  />
                  {/* Category Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {CATEGORY_SUGGESTIONS.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setCategory(cat)}
                        className={`text-[10px] px-2 py-0.5 rounded-full transition ${
                          category === cat
                            ? "bg-yellow-500 text-black font-bold"
                            : "bg-gray-800 text-gray-400 hover:text-white"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-300 mb-1.5">
                  Author Name
                </label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="e.g. Gearters Sports Team"
                  className="w-full px-3.5 py-2.5 bg-gray-900 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:border-yellow-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-300 mb-1.5">
                  Read Time (Estimated)
                </label>
                <input
                  type="text"
                  value={readTime}
                  onChange={(e) => setReadTime(e.target.value)}
                  placeholder="e.g. 5 min read"
                  className="w-full px-3.5 py-2.5 bg-gray-900 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:border-yellow-400"
                />
              </div>
            </div>

            {/* Cover Image Upload / URL */}
            <div className="border border-gray-800 bg-gray-900/40 p-4 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase text-gray-300 flex items-center gap-2">
                  <Icon icon="solar:gallery-bold" className="text-yellow-400" width="16" />
                  Article Cover Image
                </label>
                <div className="flex items-center gap-2 text-xs bg-gray-900 p-1 rounded-lg border border-gray-700">
                  <button
                    type="button"
                    onClick={() => setCoverImageType("url")}
                    className={`px-3 py-1 rounded transition ${
                      coverImageType === "url"
                        ? "bg-yellow-500 text-black font-semibold"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    Image URL
                  </button>
                  <button
                    type="button"
                    onClick={() => setCoverImageType("file")}
                    className={`px-3 py-1 rounded transition ${
                      coverImageType === "file"
                        ? "bg-yellow-500 text-black font-semibold"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    Upload File
                  </button>
                </div>
              </div>

              {coverImageType === "url" ? (
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/... or cloud image URL"
                  value={coverImageUrl}
                  onChange={(e) => setCoverImageUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-900 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:border-yellow-400"
                />
              ) : (
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setCoverImageFile(e.target.files[0]);
                    }
                  }}
                  className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-yellow-500 file:text-black hover:file:bg-yellow-400 cursor-pointer"
                />
              )}

              {/* Cover Image Preview */}
              {(coverImageUrl || coverImageFile) && (
                <div className="relative mt-2 w-full max-w-sm h-40 rounded-xl overflow-hidden border border-gray-700 bg-black">
                  <img
                    src={coverImageFile ? URL.createObjectURL(coverImageFile) : coverImageUrl}
                    alt="Cover preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setCoverImageUrl("");
                      setCoverImageFile(null);
                    }}
                    className="absolute top-2 right-2 p-1 bg-black/80 hover:bg-red-600 text-white rounded-lg transition"
                  >
                    <Icon icon="solar:close-circle-bold" width="18" />
                  </button>
                </div>
              )}
            </div>

            {/* Excerpt (Meta Description & Card Summary) */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-bold uppercase text-gray-300">
                  Short Excerpt / Summary (Used in cards & search engines)
                </label>
                <span
                  className={`text-xs ${
                    excerpt.length > 160 ? "text-yellow-400" : "text-gray-500"
                  }`}
                >
                  {excerpt.length} / 160 recommended
                </span>
              </div>
              <textarea
                rows={2}
                value={excerpt}
                onChange={(e) => {
                  setExcerpt(e.target.value);
                  if (!metaDescription) setMetaDescription(e.target.value);
                }}
                placeholder="A compelling 1-2 sentence preview of this article for social cards and Google search results..."
                className="w-full px-3.5 py-2.5 bg-gray-900 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:border-yellow-400"
              />
            </div>

            {/* Content Editor with Markdown Toolbar & Preview */}
            <div className="space-y-2">
              <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                <label className="text-xs font-bold uppercase text-gray-300">
                  Article Body (Markdown Supported) *
                </label>

                {/* Editor / Preview Tabs */}
                <div className="flex items-center gap-1 bg-gray-900 p-1 rounded-lg border border-gray-700">
                  <button
                    type="button"
                    onClick={() => setEditorMode("edit")}
                    className={`px-3 py-1 rounded text-xs font-medium transition ${
                      editorMode === "edit"
                        ? "bg-yellow-500 text-black font-semibold"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    Write
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditorMode("preview")}
                    className={`px-3 py-1 rounded text-xs font-medium transition ${
                      editorMode === "preview"
                        ? "bg-yellow-500 text-black font-semibold"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    Live Preview
                  </button>
                </div>
              </div>

              {/* Formatting Quick Toolbar */}
              {editorMode === "edit" && (
                <div className="flex flex-wrap items-center gap-1.5 p-2 bg-gray-900/90 rounded-lg border border-gray-800 text-gray-300 text-xs">
                  <button
                    type="button"
                    onClick={() => insertFormatting("## ")}
                    className="px-2 py-1 hover:bg-gray-800 rounded font-bold"
                    title="Heading 2"
                  >
                    H2
                  </button>
                  <button
                    type="button"
                    onClick={() => insertFormatting("### ")}
                    className="px-2 py-1 hover:bg-gray-800 rounded font-bold"
                    title="Heading 3"
                  >
                    H3
                  </button>
                  <div className="w-[1px] h-4 bg-gray-700 mx-1" />
                  <button
                    type="button"
                    onClick={() => insertFormatting("**", "**")}
                    className="px-2 py-1 hover:bg-gray-800 rounded font-bold"
                    title="Bold"
                  >
                    B
                  </button>
                  <button
                    type="button"
                    onClick={() => insertFormatting("*", "*")}
                    className="px-2 py-1 hover:bg-gray-800 rounded italic"
                    title="Italic"
                  >
                    I
                  </button>
                  <button
                    type="button"
                    onClick={() => insertFormatting("> ")}
                    className="px-2 py-1 hover:bg-gray-800 rounded"
                    title="Quote"
                  >
                    Quote
                  </button>
                  <button
                    type="button"
                    onClick={() => insertFormatting("- ")}
                    className="px-2 py-1 hover:bg-gray-800 rounded"
                    title="Bullet List"
                  >
                    • Bullet
                  </button>
                  <button
                    type="button"
                    onClick={() => insertFormatting("1. ")}
                    className="px-2 py-1 hover:bg-gray-800 rounded"
                    title="Numbered List"
                  >
                    1. Numbered
                  </button>
                  <div className="w-[1px] h-4 bg-gray-700 mx-1" />
                  <button
                    type="button"
                    onClick={() => insertFormatting("[Link Text](", ")")}
                    className="px-2 py-1 hover:bg-gray-800 rounded text-yellow-400"
                    title="Add Link"
                  >
                    🔗 Link
                  </button>
                  <button
                    type="button"
                    onClick={() => insertFormatting("![Image Alt](", ")")}
                    className="px-2 py-1 hover:bg-gray-800 rounded text-yellow-400"
                    title="Add Image"
                  >
                    🖼️ Image
                  </button>
                  <button
                    type="button"
                    onClick={() => insertFormatting("\n---\n")}
                    className="px-2 py-1 hover:bg-gray-800 rounded"
                    title="Divider"
                  >
                    Divider
                  </button>
                </div>
              )}

              {/* Editor or Preview Pane */}
              {editorMode === "edit" ? (
                <textarea
                  id="blog-content-textarea"
                  rows={14}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your article here using markdown formatting...
## Introduction
Start with a strong hook about combat sports gear or factory manufacturing.

### Key Factors
- Point one
- Point two

> Expert tip from Gearters Sports engineering team."
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white font-mono text-sm leading-relaxed focus:outline-none focus:border-yellow-400 resize-y"
                />
              ) : (
                <div className="min-h-[300px] p-6 bg-gray-900 border border-gray-700 rounded-xl text-gray-200 prose prose-invert max-w-none">
                  {content ? (
                    <div className="space-y-4 text-sm leading-relaxed whitespace-pre-wrap font-sans">
                      {content}
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">No content to preview yet.</p>
                  )}
                </div>
              )}
            </div>

            {/* SEO Accordion & Google Preview */}
            <div className="border border-gray-800 bg-gray-900/30 rounded-xl overflow-hidden">
              <button
                type="button"
                onClick={() => setShowSeoSettings(!showSeoSettings)}
                className="w-full px-5 py-3.5 flex items-center justify-between text-left hover:bg-gray-800/40 transition"
              >
                <div className="flex items-center gap-2">
                  <Icon icon="solar:global-bold" className="text-yellow-400 w-5 h-5" />
                  <div>
                    <span className="font-bold text-sm text-white">Search Engine Optimization (SEO)</span>
                    <p className="text-xs text-gray-400">
                      Customize how this article will appear on Google and social media cards
                    </p>
                  </div>
                </div>
                <Icon
                  icon="solar:alt-arrow-down-linear"
                  className={`text-gray-400 transition-transform ${
                    showSeoSettings ? "rotate-180" : ""
                  }`}
                  width="18"
                />
              </button>

              {showSeoSettings && (
                <div className="p-5 border-t border-gray-800 space-y-4">
                  {/* Google Preview Snippet */}
                  <div className="bg-[#1f242c] p-4 rounded-xl border border-gray-700">
                    <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block mb-2">
                      Google Search Result Snippet Preview
                    </span>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-xs text-gray-400">
                        <span>https://www.gearterssports.com</span>
                        <span>›</span>
                        <span>blogs</span>
                        <span>›</span>
                        <span className="text-yellow-400">{slug || "article-slug"}</span>
                      </div>
                      <h4 className="text-blue-400 hover:underline font-semibold text-base cursor-pointer">
                        {metaTitle || `${title || "Article Title"} | Gearters Sports`}
                      </h4>
                      <p className="text-xs text-gray-300 leading-relaxed line-clamp-2">
                        {metaDescription || excerpt || "Write an excerpt or meta description above to preview how Google displays your article snippet in search engine results..."}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">
                        Custom Meta Title
                      </label>
                      <input
                        type="text"
                        value={metaTitle}
                        onChange={(e) => setMetaTitle(e.target.value)}
                        placeholder="defaults to Article Title | Gearters Sports"
                        className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white text-xs focus:outline-none focus:border-yellow-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">
                        Meta Keywords (Comma separated)
                      </label>
                      <input
                        type="text"
                        value={metaKeywords}
                        onChange={(e) => setMetaKeywords(e.target.value)}
                        placeholder="boxing gloves, combat gear manufacturer, custom OEM gear"
                        className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white text-xs focus:outline-none focus:border-yellow-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">
                      Custom Meta Description
                    </label>
                    <textarea
                      rows={2}
                      value={metaDescription}
                      onChange={(e) => setMetaDescription(e.target.value)}
                      placeholder="defaults to your article excerpt"
                      className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white text-xs focus:outline-none focus:border-yellow-400"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Submit Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-gray-800">
              <button
                type="button"
                onClick={() => {
                  resetForm();
                  setActiveTab("list");
                }}
                disabled={isSubmitting}
                className="w-full sm:w-auto px-5 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 font-semibold text-sm rounded-xl transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-7 py-2.5 bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-sm rounded-xl transition shadow-lg shadow-yellow-500/20 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Icon icon="line-md:loading-loop" width="18" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Icon icon="solar:disk-bold" width="18" />
                    <span>{editingBlogId ? "Update Article" : "Save & Publish Article"}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
