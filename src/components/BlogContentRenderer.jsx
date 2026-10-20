"use client";

import React from "react";

/**
 * Lightweight, secure markdown parser for blog content
 * Supports:
 * - H2 (##) & H3 (###)
 * - Bold (**text**) & Italic (*text*)
 * - Blockquotes (> quote)
 * - Bullet lists (- item) & Numbered lists (1. item)
 * - Links [label](url)
 * - Images ![alt](url)
 * - Horizontal rules (---)
 * - Paragraphs
 */
export default function BlogContentRenderer({ content }) {
  if (!content) return null;

  const lines = content.split("\n");
  const renderedElements = [];
  let currentList = [];
  let currentListType = null; // 'ul' | 'ol'

  const flushList = (key) => {
    if (currentList.length > 0) {
      if (currentListType === "ol") {
        renderedElements.push(
          <ol key={`ol-${key}`} className="list-decimal list-outside pl-6 space-y-2 text-[#2D2A26] dark:text-gray-300 text-base sm:text-lg leading-relaxed my-4">
            {currentList.map((item, idx) => (
              <li key={idx} dangerouslySetInnerHTML={{ __html: parseInline(item) }} />
            ))}
          </ol>
        );
      } else {
        renderedElements.push(
          <ul key={`ul-${key}`} className="list-disc list-outside pl-6 space-y-2 text-[#2D2A26] dark:text-gray-300 text-base sm:text-lg leading-relaxed my-4">
            {currentList.map((item, idx) => (
              <li key={idx} dangerouslySetInnerHTML={{ __html: parseInline(item) }} />
            ))}
          </ul>
        );
      }
      currentList = [];
      currentListType = null;
    }
  };

  const parseInline = (text) => {
    return text
      // Images: ![alt](url)
      .replace(
        /!\[(.*?)\]\((.*?)\)/g,
        '<div class="my-6 rounded-2xl overflow-hidden border border-yellow-500/20 shadow-lg"><img src="$2" alt="$1" class="w-full max-h-[500px] object-cover" /><p class="text-xs text-center text-gray-500 dark:text-gray-400 py-2 bg-gray-100 dark:bg-black/60">$1</p></div>'
      )
      // Links: [label](url)
      .replace(
        /\[(.*?)\]\((.*?)\)/g,
        '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-[#C67D00] dark:text-yellow-400 hover:text-[#A76900] dark:hover:text-yellow-300 font-semibold underline underline-offset-4 decoration-[#C67D00]/40 dark:decoration-yellow-400/40 hover:decoration-yellow-400 transition">$1</a>'
      )
      // Bold: **text**
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-[#18181B] dark:text-white">$1</strong>')
      // Italic: *text*
      .replace(/\*(.*?)\*/g, '<em class="italic text-[#3F3B36] dark:text-gray-200">$1</em>')
      // Inline Code: `code`
      .replace(/`([^`]+)`/g, '<code class="bg-gray-100 dark:bg-gray-800 text-[#C67D00] dark:text-yellow-400 px-1.5 py-0.5 rounded text-xs font-mono border border-gray-200 dark:border-gray-700">$1</code>');
  };

  lines.forEach((rawLine, index) => {
    const line = rawLine.trim();

    // Check for empty line
    if (!line) {
      flushList(index);
      return;
    }

    // Horizontal Rule: ---
    if (line === "---" || line === "***") {
      flushList(index);
      renderedElements.push(
        <hr key={`hr-${index}`} className="my-8 border-t border-gray-300 dark:border-gray-800" />
      );
      return;
    }

    // Heading 2: ## Title
    if (line.startsWith("## ")) {
      flushList(index);
      const text = line.replace(/^##\s+/, "");
      renderedElements.push(
        <h2
          key={`h2-${index}`}
          className="text-2xl sm:text-3xl font-extrabold text-[#18181B] dark:text-white mt-10 mb-4 tracking-tight border-b border-[#C67D00]/25 dark:border-yellow-500/20 pb-2.5"
          dangerouslySetInnerHTML={{ __html: parseInline(text) }}
        />
      );
      return;
    }

    // Heading 3: ### Title
    if (line.startsWith("### ")) {
      flushList(index);
      const text = line.replace(/^###\s+/, "");
      renderedElements.push(
        <h3
          key={`h3-${index}`}
          className="text-xl sm:text-2xl font-bold text-[#C67D00] dark:text-yellow-400 mt-7 mb-3 tracking-tight"
          dangerouslySetInnerHTML={{ __html: parseInline(text) }}
        />
      );
      return;
    }

    // Blockquote: > quote text
    if (line.startsWith("> ")) {
      flushList(index);
      const text = line.replace(/^>\s+/, "");
      renderedElements.push(
        <blockquote
          key={`quote-${index}`}
          className="border-l-4 border-[#C67D00] dark:border-yellow-500 pl-4 py-2.5 my-6 bg-[#C67D00]/8 dark:bg-yellow-500/5 rounded-r-xl text-[#2D2A26] dark:text-gray-200 italic font-medium"
          dangerouslySetInnerHTML={{ __html: parseInline(text) }}
        />
      );
      return;
    }

    // Bullet List: - item or * item
    if (line.startsWith("- ") || line.startsWith("* ")) {
      if (currentListType && currentListType !== "ul") {
        flushList(index);
      }
      currentListType = "ul";
      currentList.push(line.replace(/^[-*]\s+/, ""));
      return;
    }

    // Numbered List: 1. item
    if (/^\d+\.\s+/.test(line)) {
      if (currentListType && currentListType !== "ol") {
        flushList(index);
      }
      currentListType = "ol";
      currentList.push(line.replace(/^\d+\.\s+/, ""));
      return;
    }

    // Standalone Image: ![alt](url)
    if (/^!\[(.*?)\]\((.*?)\)$/.test(line)) {
      flushList(index);
      const match = line.match(/^!\[(.*?)\]\((.*?)\)$/);
      if (match) {
        renderedElements.push(
          <div key={`img-${index}`} className="my-8 rounded-2xl overflow-hidden border border-yellow-500/20 shadow-xl bg-black">
            <img src={match[2]} alt={match[1]} className="w-full max-h-[500px] object-cover" />
            {match[1] && <p className="text-xs text-center text-gray-400 py-2.5 bg-black/60">{match[1]}</p>}
          </div>
        );
        return;
      }
    }

    // Regular Paragraph
    flushList(index);
    renderedElements.push(
      <p
        key={`p-${index}`}
        className="text-[#2D2A26] dark:text-gray-300 text-base sm:text-lg leading-relaxed mb-5"
        dangerouslySetInnerHTML={{ __html: parseInline(line) }}
      />
    );
  });

  flushList("end");

  return <div className="blog-rendered-content space-y-1">{renderedElements}</div>;
}
