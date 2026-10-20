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

// ✅ Slug generator helper
export function generateSlug(name, article_no) {
  const cleanName = (name || "")
    .trim()
    .replace(/^(gearters?)\s+/i, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();

  const cleanArtNo = (article_no || "")
    .trim()
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();

  return [cleanName, cleanArtNo].filter(Boolean).join("-") || "product";
}

// ✅ Add product
export async function addProduct({
  name,
  article_no,
  description,
  img_src,
  subcategory,
  other_images,
  slug,
}) {
  const finalSlug = slug || generateSlug(name, article_no);

  const { error } = await supabase.from("products").insert([
    {
      name,
      article_no,
      description,
      img_src,
      subcategory,
      other_images,
      slug: finalSlug,
      created_at: new Date().toISOString(),
    },
  ]);

  if (error) throw new Error("Failed to add product: " + error.message);
}

// ✅ Update product
export async function updateProduct({ id, ...fields }) {
  if (!fields.slug && (fields.name || fields.article_no)) {
    // If name or article_no is being updated without explicit slug, regenerate slug
    const { data: existing } = await supabase
      .from("products")
      .select("name, article_no")
      .eq("id", id)
      .single();

    const nameToUse = fields.name ?? existing?.name ?? "";
    const artNoToUse = fields.article_no ?? existing?.article_no ?? "";
    fields.slug = generateSlug(nameToUse, artNoToUse);
  }

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

export async function fetchProduct(id) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function fetchProductBySlug(slug) {
  if (!slug) return null;

  // 1. Try direct slug match
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!error && data) return data;

  // 2. Fallback: If slug is numeric, check by id
  if (!isNaN(slug)) {
    const { data: byId } = await supabase
      .from("products")
      .select("*")
      .eq("id", slug)
      .single();
    if (byId) return byId;
  }

  // 3. Fallback: Check if slug ends with -[id] (e.g. product-name-23)
  const idMatch = String(slug).match(/-(\d+)$/);
  if (idMatch) {
    const extractedId = idMatch[1];
    const { data: byExtractedId } = await supabase
      .from("products")
      .select("*")
      .eq("id", extractedId)
      .single();
    if (byExtractedId) return byExtractedId;
  }

  return null;
}


export async function getPortfolio() {
  const { data, error } = await supabase
    .from('portfolio')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

////////////////////
// 🔹 BLOG APIS   //
////////////////////

// ✅ Generate SEO-friendly slug for blogs
export function generateBlogSlug(title) {
  if (!title) return "article-" + Date.now();
  return title
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // remove non-alphanumeric except spaces & hyphens
    .replace(/[\s_-]+/g, "-") // replace spaces and underscores with single hyphen
    .replace(/^-+|-+$/g, ""); // trim leading/trailing hyphens
}

// ✅ Get all blogs (optionally filter for published only)
export async function getBlogs({ publishedOnly = false, limit } = {}) {
  let query = supabase
    .from("blogs")
    .select("*")
    .order("created_at", { ascending: false });

  if (publishedOnly) {
    query = query.eq("is_published", true);
  }

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;
  if (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
  return data || [];
}

// ✅ Get featured blogs for landing page
export async function getFeaturedBlogs(limit = 3) {
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("is_published", true)
    .eq("is_featured", true)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching featured blogs:", error);
    // Fallback: If no featured, grab the latest published blogs
    const { data: latest } = await supabase
      .from("blogs")
      .select("*")
      .eq("is_published", true)
      .order("created_at", { ascending: false })
      .limit(limit);
    return latest || [];
  }

  // If fewer than limit featured blogs found, fill in with recent published ones
  if (!data || data.length === 0) {
    const { data: fallback } = await supabase
      .from("blogs")
      .select("*")
      .eq("is_published", true)
      .order("created_at", { ascending: false })
      .limit(limit);
    return fallback || [];
  }

  return data;
}

// ✅ Fetch single blog by slug with fallback to ID
export async function fetchBlogBySlug(slug) {
  if (!slug) return null;

  // 1. Direct slug lookup
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!error && data) return data;

  // 2. Numeric fallback lookup
  if (!isNaN(slug)) {
    const { data: byId } = await supabase
      .from("blogs")
      .select("*")
      .eq("id", slug)
      .single();
    if (byId) return byId;
  }

  return null;
}

// ✅ Add new blog
export async function addBlog({
  title,
  slug,
  excerpt,
  content,
  cover_image,
  category = "Boxing & Combat",
  author = "Gearters Sports Team",
  read_time = "4 min read",
  is_featured = false,
  is_published = true,
  meta_title,
  meta_description,
  meta_keywords,
}) {
  const finalSlug = (slug || generateBlogSlug(title)).toLowerCase();

  const { data, error } = await supabase
    .from("blogs")
    .insert([
      {
        title,
        slug: finalSlug,
        excerpt: excerpt || "",
        content,
        cover_image: cover_image || "",
        category: category || "Boxing & Combat",
        author: author || "Gearters Sports Team",
        read_time: read_time || "4 min read",
        is_featured: Boolean(is_featured),
        is_published: Boolean(is_published),
        meta_title: meta_title || title,
        meta_description: meta_description || excerpt || "",
        meta_keywords: meta_keywords || "",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ])
    .select()
    .single();

  if (error) throw new Error("Failed to add blog: " + error.message);
  return data;
}

// ✅ Update existing blog
export async function updateBlog({ id, ...fields }) {
  if (fields.title && !fields.slug) {
    fields.slug = generateBlogSlug(fields.title);
  }
  if (fields.slug) {
    fields.slug = fields.slug.toLowerCase().trim();
  }

  fields.updated_at = new Date().toISOString();

  const { data, error } = await supabase
    .from("blogs")
    .update(fields)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error("Failed to update blog: " + error.message);
  return data;
}

// ✅ Delete blog
export async function deleteBlog(id) {
  const { error } = await supabase.from("blogs").delete().eq("id", id);
  if (error) throw new Error("Failed to delete blog: " + error.message);
  return true;
}

