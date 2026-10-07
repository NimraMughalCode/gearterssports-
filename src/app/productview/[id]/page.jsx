import { fetchProduct } from "@/app/utils/adminAPI";
import { permanentRedirect, notFound } from "next/navigation";

export const dynamicParams = true;

// 301/308 Permanent Redirect from old /productview/[id] to new /products/[slug]
export default async function ProductViewRedirectPage({ params }) {
  const { id } = await params;

  let product = null;
  try {
    product = await fetchProduct(id);
  } catch (error) {
    console.error("Error fetching product for redirect:", error);
  }

  if (product) {
    const targetSlug = product.slug || product.id;
    permanentRedirect(`/products/${targetSlug}`);
  }

  notFound();
}
