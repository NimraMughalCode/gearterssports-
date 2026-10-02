"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/app/utils/supabaseClient";
import {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "@/app/utils/adminAPI";
import CategoriesManager from "../CategoriesManagr";
import toast from "react-hot-toast";
import { Icon } from "@iconify/react";

function getStoragePathFromUrl(url) {
  if (!url) return null;
  const marker = "/product-images/";
  const index = url.indexOf(marker);
  if (index === -1) return null;
  return url.substring(index + marker.length);
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newCategory, setNewCategory] = useState("");
  const [newSubcategories, setNewSubcategories] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryImageFile, setCategoryImageFile] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    setLoading(true);
    try {
      const data = await getCategories();
      setCategories(data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  }

  async function handleAddCategory() {
    if (!newCategory || !newSubcategories) {
      return toast.error("All fields required");
    }

    const toastId = toast.loading("Adding category...");

    try {
      let finalImageUrl = "";
      if (categoryImageFile) {
        const fileName = `categories/${Date.now()}-${categoryImageFile.name}`;

        const { error: uploadError } = await supabase.storage
          .from("product-images")
          .upload(fileName, categoryImageFile);

        if (uploadError) throw new Error(uploadError.message);

        const {
          data: { publicUrl },
        } = supabase.storage.from("product-images").getPublicUrl(fileName);

        finalImageUrl = publicUrl;
      }

      await addCategory({
        title: newCategory,
        subcategories: newSubcategories.split(",").map((s) => s.trim()),
        img_src: finalImageUrl,
      });

      setNewCategory("");
      setNewSubcategories("");
      setCategoryImageFile(null);

      await fetchCategories();
      toast.success("Category added successfully!", { id: toastId });
    } catch (err) {
      toast.error("Failed to add category: " + err.message, { id: toastId });
    }
  }

  async function handleUpdateCategory() {
    if (!editingCategory?.title || !editingCategory?.subcategories?.length) {
      return toast.error("Fields cannot be empty");
    }

    const toastId = toast.loading("Updating category...");

    try {
      let finalImageUrl = editingCategory.img_src;

      if (categoryImageFile) {
        const fileName = `categories/${Date.now()}-${categoryImageFile.name}`;

        const { error: uploadError } = await supabase.storage
          .from("product-images")
          .upload(fileName, categoryImageFile);

        if (uploadError) throw new Error(uploadError.message);

        const {
          data: { publicUrl },
        } = supabase.storage.from("product-images").getPublicUrl(fileName);

        finalImageUrl = publicUrl;
      }

      await updateCategory({
        id: editingCategory.id,
        title: editingCategory.title,
        subcategories: editingCategory.subcategories,
        img_src: finalImageUrl,
      });

      setEditingCategory(null);
      setCategoryImageFile(null);

      await fetchCategories();
      toast.success("Category updated successfully!", { id: toastId });
    } catch (err) {
      toast.error("Failed to update category", { id: toastId });
    }
  }

  async function handleDeleteCategory(category) {
    if (!confirm(`Delete category "${category.title}"?`)) return;

    const toastId = toast.loading("Deleting category...");

    try {
      if (category.img_src) {
        const filePath = getStoragePathFromUrl(category.img_src);
        if (filePath) {
          await supabase.storage.from("product-images").remove([filePath]);
        }
      }

      await deleteCategory(category.id);
      await fetchCategories();
      toast.success("Category deleted!", { id: toastId });
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete category", { id: toastId });
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-4 border-b border-gray-800">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Icon icon="solar:folder-with-files-bold" className="text-yellow-400" /> Manage Categories
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Organize boxing equipment categories and subcategories for the catalog.
          </p>
        </div>
        <div className="text-xs font-semibold px-3 py-1.5 bg-yellow-500/15 text-yellow-400 border border-yellow-500/30 rounded-lg w-fit">
          {categories.length} Categories Active
        </div>
      </div>

      {loading ? (
        <div className="text-center py-16 text-gray-500 flex flex-col items-center justify-center gap-2">
          <Icon icon="line-md:loading-loop" width="36" className="text-yellow-400" />
          <p className="text-sm">Loading categories from database...</p>
        </div>
      ) : (
        <CategoriesManager
          categories={categories}
          newCategory={newCategory}
          newSubcategories={newSubcategories}
          categoryImageFile={categoryImageFile}
          setCategoryImageFile={setCategoryImageFile}
          editingCategory={editingCategory}
          setEditingCategory={setEditingCategory}
          handleAddCategory={handleAddCategory}
          handleUpdateCategory={handleUpdateCategory}
          handleDeleteCategory={handleDeleteCategory}
          setNewCategory={setNewCategory}
          setNewSubcategories={setNewSubcategories}
        />
      )}
    </div>
  );
}
