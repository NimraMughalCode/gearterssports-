"use client";

import { Suspense } from "react";
import ProductsComponent from "@/components/productscomponent";

export default function Products() {
  return (
    <Suspense fallback={<div>Loading products...</div>}>
      <ProductsComponent />
    </Suspense>
  );
}
