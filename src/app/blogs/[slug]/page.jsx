import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@iconify/react";
import { fetchBlogBySlug, getBlogs } from "@/app/utils/adminAPI";
import BlogContentRenderer from "@/components/BlogContentRenderer";
import BlogShareButtons from "@/components/BlogShareButtons";

export const dynamicParams = true;
export const revalidate = 3600; // Regenerate ISR static cache periodically

// Pre-render static paths at build time
export async function generateStaticParams() {
  try {
    const blogs = await getBlogs({ publishedOnly: true });
    if (!blogs || !Array.isArray(blogs)) return [];
    return blogs.map((b) => ({
      slug: (b.slug || b.id.toString()).toString(),
    }));
  } catch (error) {
    console.error("Error generating static params for blogs:", error);
    return [];
  }
}

// Generate dynamic SEO Metadata for Google & Social Platforms
export async function generateMetadata({ params }) {
  const { slug } = await params;

  try {
    const blog = await fetchBlogBySlug(slug);

    if (!blog) {
      return {
        title: "Article Not Found | Gearters Sports Blog",
        description: "The requested combat sports guide or article could not be found.",
      };
    }

    const titleStr = blog.meta_title || `${blog.title} | Gearters Sports`;
    const descStr =
      blog.meta_description ||
      blog.excerpt ||
      `Read ${blog.title} on Gearters Sports Combat Journal.`;
    const canonicalUrl = `https://www.gearterssports.com/blogs/${blog.slug || slug}`;
    const keywords = blog.meta_keywords
      ? blog.meta_keywords.split(",").map((k) => k.trim())
      : [
          blog.title.toLowerCase(),
          blog.category ? blog.category.toLowerCase() : "combat gear",
          "boxing gloves manufacturer",
          "gearters sports blog",
          "custom sports gear sialkot",
        ];

    return {
      title: {
        absolute: titleStr,
      },
      description: descStr,
      keywords,
      alternates: {
        canonical: canonicalUrl,
      },
      openGraph: {
        title: titleStr,
        description: descStr,
        url: canonicalUrl,
        siteName: "Gearters Sports",
        type: "article",
        publishedTime: blog.created_at,
        modifiedTime: blog.updated_at || blog.created_at,
        authors: [blog.author || "Gearters Sports Team"],
        images: blog.cover_image
          ? [
              {
                url: blog.cover_image,
                width: 1200,
                height: 630,
                alt: blog.title,
              },
            ]
          : [],
      },
      twitter: {
        card: "summary_large_image",
        title: titleStr,
        description: descStr,
        images: blog.cover_image ? [blog.cover_image] : [],
      },
    };
  } catch (error) {
    console.error("Error generating metadata for blog post:", error);
    return {
      title: "Gearters Sports Blog",
      description: "Leading combat sports journal and equipment insights.",
    };
  }
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;

  let blog = null;
  let relatedBlogs = [];

  try {
    blog = await fetchBlogBySlug(slug);
    const allBlogs = await getBlogs({ publishedOnly: true, limit: 4 });
    relatedBlogs = (allBlogs || []).filter((b) => b.slug !== slug).slice(0, 3);
  } catch (error) {
    console.error("Error fetching blog on page load:", error);
  }

  // Fallback demo blog if table not yet populated
  if (!blog && slug === "how-to-choose-the-best-boxing-gloves-for-sparring-training-2026") {
    blog = {
      title: "How to Choose the Best Boxing Gloves for Sparring & Training in 2026",
      slug: "how-to-choose-the-best-boxing-gloves-for-sparring-training-2026",
      excerpt:
        "A comprehensive guide for fighters, coaches, and sports brands on selecting genuine leather boxing gloves with optimal foam density, wrist support, and OEM manufacturing standards.",
      category: "Equipment Guide",
      author: "Gearters Sports Team",
      read_time: "4 min read",
      cover_image:
        "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=1200&auto=format&fit=crop",
      created_at: new Date().toISOString(),
      content: `## Finding the Right Gloves for Every Fighter

Whether you are an aspiring fighter stepping into the ring for the first time or a sports brand looking to engineer a custom line of combat gear, selecting the proper boxing glove is paramount. The right glove protects your metacarpals, supports your wrist alignment, and delivers optimal feedback on impact.

### 1. Genuine Cowhide Leather vs. Microfiber & PU
- **Genuine Cowhide Leather**: The undisputed gold standard for durability, breathability, and natural hand contouring. Cowhide stretches gracefully with use and withstands thousands of heavy-bag rounds.
- **Microfiber Leather**: A premium synthetic alternative that offers exceptional tear resistance and water repellency, making it great for high-humidity gyms.
- **PU Synthetics**: Budget-friendly options ideal for entry-level recreational training.

### 2. Glove Weight & Purpose Breakdown
Selecting glove weight depends on your training discipline:
- **10 oz - 12 oz**: Ideal for bag work, precision pad drills, and amateur competition bouts.
- **14 oz**: The versatile all-rounder, excellent for moderate sparring and bag routines.
- **16 oz**: The mandatory standard in most professional boxing gyms for full sparring to protect training partners.

### 3. Foam Padding Technology
Modern combat equipment utilizes multi-layered foam structures:
- **IMF (Injected Molded Foam)**: Provides uniform shock dispersion across the entire knuckle area.
- **Layered Foam with Horsehair**: Favored by traditional punchers for snappy impact and customized break-in comfort.

---

### Need Custom Branded Boxing Equipment?
At **Gearters Sports**, we specialize in OEM manufacturing of bespoke boxing gloves, MMA shin guards, and combat apparel tailored to your gym or brand specifications. [Contact our team today](/contact) for custom samples and factory-direct pricing.`,
    };
  }

  if (!blog) {
    notFound();
  }

  // Schema.org Structured Data for Google Rich Snippets
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.excerpt,
    image: blog.cover_image ? [blog.cover_image] : [],
    datePublished: blog.created_at,
    dateModified: blog.updated_at || blog.created_at,
    author: {
      "@type": "Organization",
      name: blog.author || "Gearters Sports",
    },
    publisher: {
      "@type": "Organization",
      name: "Gearters Sports",
      logo: {
        "@type": "ImageObject",
        url: "https://www.gearterssports.com/logo.svg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.gearterssports.com/blogs/${blog.slug}`,
    },
  };

  return (
    <article className="min-h-screen dark:bg-black bg-[#FAF7F2] text-current pt-28 pb-20 transition-colors duration-300">
      {/* Schema.org JSON-LD Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400 mb-6 font-medium">
          <Link href="/" className="hover:text-yellow-500 transition">
            Home
          </Link>
          <span>/</span>
          <Link href="/blogs" className="hover:text-yellow-500 transition">
            Blogs
          </Link>
          <span>/</span>
          <span className="text-yellow-500 dark:text-yellow-400 font-semibold truncate max-w-xs">
            {blog.title}
          </span>
        </nav>

        {/* Category & Read Time */}
        <div className="flex flex-wrap items-center gap-3 text-xs mb-4">
          {blog.category && (
            <span className="px-3 py-1 rounded-full font-bold uppercase tracking-wider bg-yellow-500/10 text-yellow-500 border border-yellow-500/30">
              {blog.category}
            </span>
          )}
          <span className="text-gray-500 dark:text-gray-400">•</span>
          <span className="text-gray-500 dark:text-gray-400 font-medium">
            {blog.read_time || "4 min read"}
          </span>
          <span className="text-gray-500 dark:text-gray-400">•</span>
          <span className="text-gray-500 dark:text-gray-400">
            {blog.created_at
              ? new Date(blog.created_at).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })
              : ""}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#18181B] dark:text-white leading-[1.15] mb-6">
          {blog.title}
        </h1>

        {/* Excerpt Summary */}
        {blog.excerpt && (
          <p className="text-lg sm:text-xl text-[#3F3B36] dark:text-gray-300 font-normal leading-relaxed mb-8 border-l-4 border-[#C67D00] dark:border-yellow-500 pl-4 py-1 italic">
            {blog.excerpt}
          </p>
        )}

        {/* Author & Share Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-y border-[#C67D00]/20 dark:border-gray-800 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FCA600] flex items-center justify-center text-black font-extrabold text-sm shadow-md">
              GS
            </div>
            <div>
              <p className="text-sm font-bold text-[#18181B] dark:text-white">
                {blog.author || "Gearters Sports Team"}
              </p>
              <p className="text-xs text-[#524E48] dark:text-gray-400">
                Combat Equipment Specialists & OEM Manufacturers
              </p>
            </div>
          </div>

          {/* Social Share Buttons */}
          <BlogShareButtons title={blog.title} slug={blog.slug} />
        </div>

        {/* Main Cover Image */}
        {blog.cover_image && (
          <div className="rounded-3xl overflow-hidden shadow-2xl border border-yellow-500/20 mb-12 bg-black">
            <img
              src={blog.cover_image}
              alt={blog.title}
              className="w-full max-h-[520px] object-cover"
            />
          </div>
        )}

        {/* Formatted Content Body */}
        <div className="max-w-none text-[#2D2A26] dark:text-gray-200">
          <BlogContentRenderer content={blog.content} />
        </div>

        {/* B2B Manufacturer Callout CTA */}
        <div className="my-14 p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#0D1117] border-2 border-[#C67D00]/25 dark:border-[#FCA600]/40 text-center relative overflow-hidden shadow-[0_15px_35px_rgba(198,125,0,0.12)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
          {/* Subtle gold ambient glow in dark mode */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#FCA600]/5 to-transparent pointer-events-none hidden dark:block" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#FCA600] text-black shadow-md">
              OEM & Private Label Services
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#18181B] dark:text-white tracking-tight">
              Launch Your Own Combat Sports Brand With Us
            </h3>
            <p className="text-sm sm:text-base text-[#494540] dark:text-gray-300 leading-relaxed">
              Gearters Sports designs and manufactures world-class boxing gloves, MMA protectors, and combat apparel for international gyms, promotions, and retail brands. Custom logos, bespoke leather choices, and low MOQs available.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="px-6 py-3 bg-[#FCA600] hover:bg-[#E59500] text-black font-bold text-sm rounded-xl transition shadow-lg shadow-[#FCA600]/25"
              >
                Inquire For Custom Manufacturing
              </Link>
              <Link
                href="/products"
                className="px-6 py-3 border-2 border-[#18181B] dark:border-[#FCA600] text-[#18181B] dark:text-[#FCA600] hover:bg-[#18181B] hover:text-white dark:hover:bg-[#FCA600] dark:hover:text-black font-bold text-sm rounded-xl transition shadow-sm"
              >
                Explore Product Catalog
              </Link>
            </div>
          </div>
        </div>

        {/* Share Again at Article End */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6 border-t border-[#C67D00]/20 dark:border-gray-800 mb-16">
          <span className="text-sm font-semibold text-[#18181B] dark:text-gray-300">
            Enjoyed this guide? Share it with fighters and sports brands:
          </span>
          <BlogShareButtons title={blog.title} slug={blog.slug} />
        </div>

        {/* Related Articles Section */}
        {relatedBlogs.length > 0 && (
          <div className="pt-10 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                More From The Journal
              </h3>
              <Link
                href="/blogs"
                className="text-xs font-bold text-yellow-500 hover:text-yellow-400 flex items-center gap-1 group"
              >
                <span>View All Articles</span>
                <Icon icon="solar:arrow-right-linear" width="16" className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedBlogs.map((rel) => (
                <div
                  key={rel.id}
                  className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#111827] flex flex-col justify-between group hover:border-yellow-500/40 transition"
                >
                  <Link href={`/blogs/${rel.slug}`} className="h-40 w-full block overflow-hidden bg-black">
                    {rel.cover_image ? (
                      <img
                        src={rel.cover_image}
                        alt={rel.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-600">
                        <Icon icon="solar:gallery-bold" width="30" />
                      </div>
                    )}
                  </Link>

                  <div className="p-4 flex flex-col flex-1 justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-yellow-500 block mb-1">
                        {rel.category || "Combat Gear"}
                      </span>
                      <h4 className="text-sm font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-yellow-500 transition mb-2">
                        <Link href={`/blogs/${rel.slug}`}>
                          {rel.title}
                        </Link>
                      </h4>
                    </div>

                    <Link
                      href={`/blogs/${rel.slug}`}
                      className="text-xs font-semibold text-yellow-500 flex items-center gap-1 mt-2"
                    >
                      <span>Read Story</span>
                      <Icon icon="solar:arrow-right-linear" width="14" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
