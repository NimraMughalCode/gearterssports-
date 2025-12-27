import { supabase } from "@/app/utils/supabaseClient";

//////////////////////
// 🔹 CATEGORY APIS //
//////////////////////

// ✅ Get all categories
export async function getCategories() {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("id", { ascending: true });

  if (error) throw new Error(error.message);
  return data;
}

// ✅ Add new category
export async function addCategory({ title, subcategories, img_src }) {
   console.log("Sending to Supabase:", { title, subcategories, img_src });
  const { error } = await supabase.from("categories").insert([
    {
      title,
      subcategories,
        img_src, 
      created_at: new Date().toISOString(),
    },
  ]);

  if (error) throw new Error("Failed to add category: " + error.message);
}

// ✅ Update existing category
export async function updateCategory({ id, title, subcategories,  img_src }) {
  const { error } = await supabase
    .from("categories")
    .update({
      title,
      subcategories,
      img_src
    })
    .eq("id", id);

  if (error) throw new Error("Failed to update category: " + error.message);
}

// ✅ Delete category
export async function deleteCategory(id) {
  const { error } = await supabase.from("categories").delete().eq("id", id);

  if (error) throw new Error("Failed to delete category: " + error.message);
}

////////////////////
// 🔹 PRODUCT APIS //
////////////////////

// ✅ Get all products
export async function getProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("id", { ascending: true });

  if (error) throw new Error(error.message);
  return data;
}

// ✅ Add product
export async function addProduct({
  name,
  article_no,
  description,
  img_src,
  subcategory,
}) {
  const { error } = await supabase.from("products").insert([
    {
      name,
      article_no,
      description,
      img_src,
      subcategory,
      created_at: new Date().toISOString(),
    },
  ]);

  if (error) throw new Error("Failed to add product: " + error.message);
}

// ✅ Update product
export async function updateProduct({ id, ...fields }) {
  const { error } = await supabase
    .from("products")
    .update(fields)
    .eq("id", id);

  if (error) throw new Error("Failed to update product: " + error.message);
}

// ✅ Delete product
export async function deleteProduct(id) {
  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) throw new Error("Failed to delete product: " + error.message);
}
