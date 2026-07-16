import { fetchProduct, getProducts } from "@/app/utils/adminAPI";
import ProductViewClient from "./ProductViewClient";

export const dynamicParams = true; // Allow dynamic generation for products not returned by generateStaticParams

// Generate static params for all products to pre-render pages at build time
export async function generateStaticParams() {
  try {
    const products = await getProducts();
    if (!products || !Array.isArray(products)) return [];
    return products.map((product) => ({
      id: product.id.toString(),
    }));
  } catch (error) {
    console.error("Error generating static params for product view:", error);
    return [];
  }
}

// Generate dynamic metadata for search engines
export async function generateMetadata({ params }) {
  // In Next.js 15+, params is a Promise, so we await it
  const { id } = await params;

  try {
    const product = await fetchProduct(id);
    if (!product) {
      return {
        title: "Product Not Found",
        description: "The requested sports accessory or glove product could not be found.",
      };
    }

    const titleStr = `${product.name} (Art No. ${product.article_no})`;
    const descStr = product.description || `Get ${product.name} (Article No: ${product.article_no}) from Gearters Sports. We are recognized among the best manufacturers of gloves and premium sports gear.`;

    return {
      title: titleStr,
      description: descStr,
      keywords: [
        "best manufacturers of gloves",
        "best manufacturer of sports",
        product.name.toLowerCase(),
        product.article_no,
        "boxing gloves",
        "sports gloves",
        "boxing accessories",
        "custom sports gear",
        "sports equipment manufacturer",
        product.subcategory ? product.subcategory.toLowerCase() : "combat gear",
      ],
      alternates: {
        canonical: `/productview/${id}`,
      },
      openGraph: {
        title: `${titleStr} | Gearters Sports - Best Manufacturer of Gloves`,
        description: descStr,
        images: product.img_src ? [{ url: product.img_src }] : [],
      },
    };
  } catch (error) {
    console.error("Error generating metadata for product view page:", error);
    return {
      title: "Gearters Sports Product",
      description: "Gearters Sports - Manufacturers of World Class Boxing Equipments & Combat Sports Gear.",
    };
  }
}

export default async function ProductViewPage({ params }) {
  // In Next.js 15+, params must be awaited
  const { id } = await params;
  
  let product = null;
  try {
    product = await fetchProduct(id);
  } catch (error) {
    console.error("Error fetching product on page load:", error);
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p className="text-sm tracking-wide">Product not found.</p>
      </div>
    );
  }

  return <ProductViewClient product={product} />;
}
