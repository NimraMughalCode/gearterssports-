"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/app/utils/supabaseClient";
import {
  getCategories,
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from "@/app/utils/adminAPI";
import ProductsManager from "../ProductsManager";
import AdminSeoGuideline from "@/components/AdminSeoGuideline";
import toast from "react-hot-toast";
import { Icon } from "@iconify/react";

function getStoragePathFromUrl(url) {
  if (!url) return null;
  const marker = "/product-images/";
  const index = url.indexOf(marker);
  if (index === -1) return null;
  return url.substring(index + marker.length);
}

export default function AdminProductsPage() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form states for Add Product
  const [productName, setProductName] = useState("");
  const [articleNo, setArticleNo] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [productImageFile, setProductImageFile] = useState(null);
  const [otherImages, setOtherImages] = useState([]);
  const [otherImageFiles, setOtherImageFiles] = useState([]);

  // States for Edit Product
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingProductFile, setEditingProductFile] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    try {
      const [cats, prods] = await Promise.all([getCategories(), getProducts()]);
      setCategories(cats || []);
      setProducts(prods || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  }

  async function fetchProducts() {
    const data = await getProducts();
    setProducts(data || []);
  }

  async function handleAddProduct({ imageType, file, url, otherImageFiles: newOtherFiles = [] }) {
    if (!productName || !productDescription || !selectedSubcategory) {
      return toast.error("All product fields are required");
    }

    const toastId = toast.loading("Saving product...");

    try {
      let finalImageURL = "";

      if (imageType === "file") {
        if (!file) return toast.error("Please select a main image file.");

        const fileExt = file.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `products/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("product-images")
          .upload(filePath, file);

        if (uploadError) throw new Error("Image upload failed: " + uploadError.message);

        const {
          data: { publicUrl },
        } = supabase.storage.from("product-images").getPublicUrl(filePath);

        finalImageURL = publicUrl;
      } else if (imageType === "url") {
        if (!url) return toast.error("Please enter an image URL.");
        finalImageURL = url;
      }

      // Loop through direct image files for other images and upload to Supabase storage
      const uploadedOtherUrls = [];
      if (newOtherFiles && newOtherFiles.length > 0) {
        for (let i = 0; i < newOtherFiles.length; i++) {
          const fileItem = newOtherFiles[i];
          toast.loading(`Uploading additional image ${i + 1} of ${newOtherFiles.length}...`, { id: toastId });

          const fileExt = fileItem.name.split(".").pop();
          const safeName = fileItem.name.replace(/[^a-zA-Z0-9.-]/g, "_");
          const fileName = `products/other/${Date.now()}-${i}-${safeName}`;

          const { error: uploadErr } = await supabase.storage
            .from("product-images")
            .upload(fileName, fileItem);

          if (uploadErr) {
            throw new Error(`Failed to upload ${fileItem.name}: ${uploadErr.message}`);
          }

          const {
            data: { publicUrl },
          } = supabase.storage.from("product-images").getPublicUrl(fileName);

          uploadedOtherUrls.push(publicUrl);
        }
      }

      const allOtherImages = [
        ...otherImages.filter(Boolean),
        ...uploadedOtherUrls,
      ];

      await addProduct({
        name: productName,
        article_no: articleNo,
        description: productDescription,
        img_src: finalImageURL,
        subcategory: selectedSubcategory,
        other_images: allOtherImages,
      });

      // Reset fields
      setProductName("");
      setArticleNo("");
      setProductDescription("");
      setSelectedSubcategory("");
      setProductImageFile(null);
      setOtherImages([]);
      setOtherImageFiles([]);

      toast.success("Product added successfully!", { id: toastId });
      fetchProducts();
    } catch (err) {
      toast.error(err.message || "Failed to add product", { id: toastId });
    }
  }

  async function handleUpdateProduct({
    imageType,
    file,
    url,
    otherImages = [],
    newOtherImageFiles = [],
  }) {
    const { id, name, article_no, description, img_src, subcategory } = editingProduct;

    if (!name || !description || !subcategory) {
      return toast.error("All fields are required");
    }

    const toastId = toast.loading("Updating product...");

    try {
      let finalImageURL = img_src;

      if (imageType === "file" && file) {
        const fileExt = file.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `products/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("product-images")
          .upload(filePath, file);

        if (uploadError) throw new Error("Image upload failed: " + uploadError.message);

        const {
          data: { publicUrl },
        } = supabase.storage.from("product-images").getPublicUrl(filePath);

        finalImageURL = publicUrl;
      } else if (imageType === "url" && url) {
        finalImageURL = url;
      }

      const uploadedNewOtherUrls = [];
      if (newOtherImageFiles && newOtherImageFiles.length > 0) {
        for (let i = 0; i < newOtherImageFiles.length; i++) {
          const fileItem = newOtherImageFiles[i];
          toast.loading(`Uploading image ${i + 1} of ${newOtherImageFiles.length}...`, { id: toastId });

          const fileExt = fileItem.name.split(".").pop();
          const safeName = fileItem.name.replace(/[^a-zA-Z0-9.-]/g, "_");
          const fileName = `products/other/${Date.now()}-${i}-${safeName}`;

          const { error: uploadErr } = await supabase.storage
            .from("product-images")
            .upload(fileName, fileItem);

          if (uploadErr) {
            throw new Error(`Failed to upload ${fileItem.name}: ${uploadErr.message}`);
          }

          const {
            data: { publicUrl },
          } = supabase.storage.from("product-images").getPublicUrl(fileName);

          uploadedNewOtherUrls.push(publicUrl);
        }
      }

      const finalOtherImages = [
        ...otherImages.filter(Boolean),
        ...uploadedNewOtherUrls,
      ];

      await updateProduct({
        id,
        name,
        article_no,
        description,
        img_src: finalImageURL,
        subcategory,
        other_images: finalOtherImages,
      });

      setEditingProduct(null);
      setEditingProductFile(null);
      fetchProducts();

      toast.success("Product updated successfully!", { id: toastId });
    } catch (err) {
      toast.error(err.message || "Failed to update product", { id: toastId });
    }
  }

  async function handleDeleteProduct(product) {
    if (!confirm(`Delete product "${product.name}"?`)) return;

    const toastId = toast.loading("Deleting product...");

    try {
      if (product.img_src) {
        const filePath = getStoragePathFromUrl(product.img_src);
        if (filePath) {
          await supabase.storage.from("product-images").remove([filePath]);
        }
      }

      if (product.other_images && Array.isArray(product.other_images)) {
        const otherPaths = product.other_images
          .map(getStoragePathFromUrl)
          .filter(Boolean);

        if (otherPaths.length > 0) {
          await supabase.storage.from("product-images").remove(otherPaths);
        }
      }

      await deleteProduct(product.id);
      fetchProducts();
      toast.success("Product deleted!", { id: toastId });
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete product", { id: toastId });
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-4 border-b border-gray-800">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Icon icon="solar:box-minimalistic-bold" className="text-yellow-400" /> Manage Products
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Add, update, and manage boxing equipment inventory and multi-angle product photography.
          </p>
        </div>
        <div className="text-xs font-semibold px-3 py-1.5 bg-yellow-500/15 text-yellow-400 border border-yellow-500/30 rounded-lg w-fit">
          {products.length} Products Cataloged
        </div>
      </div>

      {/* Interactive SEO & Product Upload Guidelines Card */}
      <AdminSeoGuideline />

      {loading ? (
        <div className="text-center py-16 text-gray-500 flex flex-col items-center justify-center gap-2">
          <Icon icon="line-md:loading-loop" width="36" className="text-yellow-400" />
          <p className="text-sm">Loading product catalog from database...</p>
        </div>
      ) : (
        <ProductsManager
          categories={categories}
          products={products}
          productName={productName}
          articleNo={articleNo}
          productDescription={productDescription}
          selectedSubcategory={selectedSubcategory}
          productImageFile={productImageFile}
          setProductName={setProductName}
          setArticleNo={setArticleNo}
          setProductDescription={setProductDescription}
          setSelectedSubcategory={setSelectedSubcategory}
          setProductImageFile={setProductImageFile}
          handleAddProduct={handleAddProduct}
          editingProduct={editingProduct}
          setEditingProduct={setEditingProduct}
          editingProductFile={editingProductFile}
          setEditingProductFile={setEditingProductFile}
          handleUpdateProduct={handleUpdateProduct}
          handleDeleteProduct={handleDeleteProduct}
          otherImages={otherImages}
          setOtherImages={setOtherImages}
          otherImageFiles={otherImageFiles}
          setOtherImageFiles={setOtherImageFiles}
        />
      )}
    </div>
  );
}
