import { getProducts, getBlogs } from "@/app/utils/adminAPI";

export const revalidate = 3600; // Regenerate sitemap periodically

export default async function sitemap() {
  const baseUrl = 'https://www.gearterssports.com';

  // 1. Static Routes (Explicitly configured for optimal indexing)
  const staticRoutes = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'monthly', priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/products`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/categoryproducts`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/blogs`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/faq`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ];

  // 2. Dynamic Product Routes with SEO Slugs
  let productRoutes = [];
  try {
    const products = await getProducts();
    if (products && Array.isArray(products)) {
      productRoutes = products.map((product) => ({
        url: `${baseUrl}/products/${product.slug || product.id}`,
        lastModified: product.created_at ? new Date(product.created_at) : new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      }));
    }
  } catch (error) {
    console.error("Error generating product routes for sitemap:", error);
  }

  // 3. Dynamic Blog Routes with SEO Slugs
  let blogRoutes = [];
  try {
    const blogs = await getBlogs({ publishedOnly: true });
    if (blogs && Array.isArray(blogs)) {
      blogRoutes = blogs.map((blog) => ({
        url: `${baseUrl}/blogs/${blog.slug}`,
        lastModified: blog.updated_at ? new Date(blog.updated_at) : (blog.created_at ? new Date(blog.created_at) : new Date()),
        changeFrequency: 'weekly',
        priority: 0.8,
      }));
    }
  } catch (error) {
    console.error("Error generating blog routes for sitemap:", error);
  }

  return [...staticRoutes, ...productRoutes, ...blogRoutes];
}
