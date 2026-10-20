"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import toast from "react-hot-toast";

export default function BlogShareButtons({ title, slug }) {
  const [copied, setCopied] = useState(false);
  const articleUrl = `https://www.gearterssports.com/blogs/${slug}`;
  const encodedUrl = encodeURIComponent(articleUrl);
  const encodedTitle = encodeURIComponent(title || "Gearters Sports Article");

  const copyToClipboard = () => {
    if (typeof window !== "undefined" && navigator?.clipboard) {
      navigator.clipboard.writeText(articleUrl);
      setCopied(true);
      toast.success("Article link copied to clipboard!");
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs uppercase font-bold text-[#524E48] dark:text-gray-400 mr-1">Share:</span>

      {/* WhatsApp */}
      <a
        href={`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on WhatsApp"
        className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-500/10 transition shadow-sm"
      >
        <Icon icon="solar:chat-round-dots-bold" width="18" />
      </a>

      {/* Twitter / X */}
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Twitter"
        className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 text-gray-700 dark:text-gray-300 hover:text-[#C67D00] dark:hover:text-yellow-400 hover:bg-yellow-500/10 transition shadow-sm"
      >
        <Icon icon="simple-icons:x" width="16" />
      </a>

      {/* Facebook */}
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Facebook"
        className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-500/10 transition shadow-sm"
      >
        <Icon icon="solar:letter-bold" width="18" />
      </a>

      {/* Copy Link */}
      <button
        type="button"
        onClick={copyToClipboard}
        aria-label="Copy Article Link"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:text-[#C67D00] dark:hover:text-yellow-400 hover:bg-yellow-500/10 transition shadow-sm"
      >
        <Icon icon={copied ? "solar:check-circle-bold" : "solar:link-round-linear"} width="16" />
        <span>{copied ? "Copied" : "Copy Link"}</span>
      </button>
    </div>
  );
}
