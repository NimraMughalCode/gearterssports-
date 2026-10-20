import { getBlogs } from "@/app/utils/adminAPI";
import BlogsArchiveClient from "@/components/BlogsArchiveClient";

export const revalidate = 3600; // ISR revalidation every hour

export const metadata = {
  title: "Boxing & Combat Sports Journal | Gearters Sports Blog",
  description:
    "Explore authoritative guides, equipment reviews, and OEM manufacturing insights on custom boxing gloves, combat sports gear, and apparel from Gearters Sports.",
  keywords: [
    "boxing gear blog",
    "combat sports equipment guide",
    "custom boxing gloves manufacturer",
    "leather boxing gloves reviews",
    "OEM sports gear sialkot",
    "mma equipment manufacturing",
    "gearters sports blog",
  ],
  alternates: {
    canonical: "https://www.gearterssports.com/blogs",
  },
  openGraph: {
    title: "Boxing & Combat Sports Journal | Gearters Sports Blog",
    description:
      "Authoritative combat sports guides, manufacturing insights, and equipment reviews from Gearters Sports.",
    url: "https://www.gearterssports.com/blogs",
    siteName: "Gearters Sports",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Gearters Sports Combat Journal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Boxing & Combat Sports Journal | Gearters Sports Blog",
    description:
      "Authoritative combat sports guides, manufacturing insights, and equipment reviews from Gearters Sports.",
  },
};

export default async function BlogsPage() {
  let blogs = [];
  try {
    blogs = await getBlogs({ publishedOnly: true });
  } catch (error) {
    console.error("Error fetching blogs on /blogs page:", error);
  }

  // Starter sample post if database is empty or not yet seeded
  if (!blogs || blogs.length === 0) {
    blogs = [
      {
        id: 1,
        title: "How to Choose the Best Boxing Gloves for Sparring & Training in 2026",
        slug: "how-to-choose-the-best-boxing-gloves-for-sparring-training-2026",
        excerpt:
          "A comprehensive guide for fighters, coaches, and sports brands on selecting genuine leather boxing gloves with optimal foam density, wrist support, and OEM manufacturing standards.",
        category: "Equipment Guide",
        author: "Gearters Sports Team",
        read_time: "4 min read",
        is_featured: true,
        cover_image:
          "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=1200&auto=format&fit=crop",
        created_at: new Date().toISOString(),
      },
      {
        id: 2,
        title: "The Ultimate Guide to Custom OEM Boxing Equipment Manufacturing",
        slug: "the-ultimate-guide-to-custom-oem-boxing-equipment-manufacturing",
        excerpt:
          "How sports brands, fight promotions, and gym chains engineer bespoke fight gear from private label leather stitching to custom logo embossing.",
        category: "Manufacturing & OEM",
        author: "Gearters Sports Engineering",
        read_time: "5 min read",
        is_featured: false,
        cover_image:
          "https://images.unsplash.com/photo-1517438322307-e67111335449?q=80&w=1200&auto=format&fit=crop",
        created_at: new Date().toISOString(),
      },
      {
        id: 3,
        title: "10oz vs 16oz Boxing Gloves: Understanding Weights, Density & Safety",
        slug: "10oz-vs-16oz-boxing-gloves-understanding-weights-density-safety",
        excerpt:
          "Understand the scientific differences between fight night 10oz gloves and sparring 16oz multi-layered protection gloves.",
        category: "Boxing & Combat",
        author: "Gearters Sports Team",
        read_time: "3 min read",
        is_featured: false,
        cover_image:
          "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop",
        created_at: new Date().toISOString(),
      },
    ];
  }

  return <BlogsArchiveClient initialBlogs={blogs} />;
}
