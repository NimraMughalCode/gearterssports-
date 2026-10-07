import { fetchProductBySlug, getProducts } from "@/app/utils/adminAPI";
import ProductViewClient from "@/components/ProductViewClient";
import { notFound } from "next/navigation";

export const dynamicParams = true;
export const revalidate = 3600; // Revalidate static cache every hour (ISR)

// Pre-render static params at build time
export async function generateStaticParams() {
  try {
    const products = await getProducts();
    if (!products || !Array.isArray(products)) return [];
    return products.map((product) => ({
      slug: (product.slug || product.id.toString()).toString(),
    }));
  } catch (error) {
    console.error("Error generating static params for products:", error);
    return [];
  }
}

// Generate dynamic metadata for Google & social sharing
export async function generateMetadata({ params }) {
  const { slug } = await params;

  try {
    const product = await fetchProductBySlug(slug);
    if (!product) {
      return {
        title: "Product Not Found | Gearters Sports",
        description: "The requested sports accessory or gear could not be found.",
      };
    }

    const subcategoryText = product.subcategory ? ` - Custom ${product.subcategory}` : " - Custom Combat Gear";
    const fullTitle = `${product.name} (Art No. ${product.article_no})${subcategoryText} | Gearters Sports`;
    const descStr = product.description 
      ? `${product.description} Available for worldwide custom orders & bulk export from Gearters Sports.`
      : `Get ${product.name} (Article No: ${product.article_no}) from Gearters Sports. Premium quality manufacturing, custom branding, and worldwide shipping.`;

    const canonicalUrl = `https://www.gearterssports.com/products/${product.slug || slug}`;

    return {
      title: {
        absolute: fullTitle,
      },
      description: descStr,
      keywords: [
        product.name.toLowerCase(),
        product.article_no,
        "gearters sports",
        product.subcategory ? product.subcategory.toLowerCase() : "combat gear",
        "custom boxing gloves manufacturer",
        "combat sports equipment supplier",
        "oem sports gear sialkot",
      ],
      alternates: {
        canonical: canonicalUrl,
      },
      openGraph: {
        title: fullTitle,
        description: descStr,
        url: canonicalUrl,
        siteName: "Gearters Sports",
        images: product.img_src
          ? [
              {
                url: product.img_src,
                width: 800,
                height: 800,
                alt: `${product.name} - Art No. ${product.article_no}`,
              },
            ]
          : [],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: fullTitle,
        description: descStr,
        images: product.img_src ? [product.img_src] : [],
      },
    };
  } catch (error) {
    console.error("Error generating metadata for product page:", error);
    return {
      title: "Gearters Sports Products",
      description: "Gearters Sports - Manufacturers of World Class Boxing Equipment & Combat Gear.",
    };
  }
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;

  let product = null;
  try {
    product = await fetchProductBySlug(slug);
  } catch (error) {
    console.error("Error fetching product on page load:", error);
  }

  if (!product) {
    notFound();
  }

  const pageUrl = `https://www.gearterssports.com/products/${product.slug || slug}`;
  const imageUrl = product.img_src || "https://www.gearterssports.com/logo.png";

  // Product Schema (JSON-LD) for rich snippets, SKU/MPN, and Google image indexing
  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    image: product.img_src
      ? [product.img_src, ...(product.other_images || [])]
      : ["https://www.gearterssports.com/logo.png"],
    description: product.description || `${product.name} manufactured by Gearters Sports.`,
    sku: product.article_no,
    mpn: product.article_no,
    brand: {
      "@type": "Brand",
      name: "Gearters Sports",
    },
    category: product.subcategory || "Combat Sports Equipment",
    offers: {
      "@type": "Offer",
      url: pageUrl,
      priceCurrency: "USD",
      price: "0.00",
      priceValidUntil: "2027-12-31",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: "Gearters Sports",
      },
    },
  };

  // BreadcrumbList Schema for Google search results
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.gearterssports.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Products",
        item: "https://www.gearterssports.com/products",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: pageUrl,
      },
    ],
  };

  return (
    <>
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <ProductViewClient product={product} />
    </>
  );
}
