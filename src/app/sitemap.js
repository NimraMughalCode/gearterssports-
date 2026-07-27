import { getProducts } from "@/app/utils/adminAPI";

export default async function sitemap() {
  const baseUrl = 'https://www.gearterssports.com';

  // 1. Static Routes (Explicitly configured for optimal indexing)
  const staticRoutes = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'monthly', priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/products`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/categoryproducts`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/faq`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ];

  // 2. Dynamic Product Routes (Querying database at build time)
  let productRoutes = [];
  try {
    const products = await getProducts();
    if (products && Array.isArray(products)) {
      productRoutes = products.map((product) => ({
        url: `${baseUrl}/productview/${product.id}`,
        lastModified: product.created_at ? new Date(product.created_at) : new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      }));
    }
  } catch (error) {
    console.error("Error generating product routes for sitemap:", error);
  }

  return [...staticRoutes, ...productRoutes];
}
