import { supabase } from "@/app/utils/supabaseClient";

//////////////////////
// 🔹 CATEGORY APIS //
//////////////////////

// ✅ Get all categories (relational join with subcategories table)
export async function getCategories() {
  const { data, error } = await supabase
    .from("categories")
    .select("id, title, img_src, created_at, subcategories(id, title, slug, display_order)")
    .order("id", { ascending: true })
    .order("id", { foreignTable: "subcategories", ascending: true });

  if (error) throw new Error(error.message);

  return (data || []).map((cat) => ({
    ...cat,
    subcategories: (cat.subcategories || []).map((s) => s.title),
    subcategories_data: cat.subcategories || [],
  }));
}

// ✅ Add new category (relational subcategories creation)
export async function addCategory({ title, subcategories = [], img_src }) {
  console.log("Sending to Supabase:", { title, subcategories, img_src });
  const { data: newCat, error: catError } = await supabase
    .from("categories")
    .insert([
      {
        title,
        img_src,
        created_at: new Date().toISOString(),
      },
    ])
    .select()
    .single();

  if (catError) throw new Error("Failed to add category: " + catError.message);

  if (newCat?.id && Array.isArray(subcategories) && subcategories.length > 0) {
    const subRows = subcategories
      .map((s) => (typeof s === "string" ? s.trim() : s?.title?.trim()))
      .filter(Boolean)
      .map((subTitle) => ({
        category_id: newCat.id,
        title: subTitle,
        slug: subTitle
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]+/g, "-")
          .replace(/^-+|-+$/g, ""),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }));

    if (subRows.length > 0) {
      const { error: subErr } = await supabase
        .from("subcategories")
        .insert(subRows);
      if (subErr) console.error("Error creating subcategories:", subErr);
    }
  }

  return newCat;
}

// ✅ Update existing category (relational subcategories sync)
export async function updateCategory({ id, title, subcategories, img_src }) {
  const updateFields = { title };
  if (img_src !== undefined) updateFields.img_src = img_src;

  const { error: catError } = await supabase
    .from("categories")
    .update(updateFields)
    .eq("id", id);

  if (catError) throw new Error("Failed to update category: " + catError.message);

  if (Array.isArray(subcategories)) {
    const cleanTitles = subcategories
      .map((s) => (typeof s === "string" ? s.trim() : s?.title?.trim()))
      .filter(Boolean);

    const { data: existingSubs } = await supabase
      .from("subcategories")
      .select("id, title")
      .eq("category_id", id);

    const existingMap = new Map(
      (existingSubs || []).map((s) => [s.title.toLowerCase(), s])
    );

    const toInsert = cleanTitles
      .filter((t) => !existingMap.has(t.toLowerCase()))
      .map((subTitle) => ({
        category_id: id,
        title: subTitle,
        slug: subTitle
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]+/g, "-")
          .replace(/^-+|-+$/g, ""),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }));

    const newTitlesSet = new Set(cleanTitles.map((t) => t.toLowerCase()));
    const toDeleteIds = (existingSubs || [])
      .filter((s) => !newTitlesSet.has(s.title.toLowerCase()))
      .map((s) => s.id);

    if (toInsert.length > 0) {
      await supabase.from("subcategories").insert(toInsert);
    }

    if (toDeleteIds.length > 0) {
      await supabase.from("subcategories").delete().in("id", toDeleteIds);
    }
  }
}

// ✅ Delete category
export async function deleteCategory(id) {
  const { error } = await supabase.from("categories").delete().eq("id", id);

  if (error) throw new Error("Failed to delete category: " + error.message);
}

//////////////////////////
// 🔹 SUBCATEGORY APIS //
//////////////////////////

// ✅ Get all subcategories (optionally filtered by category_id)
export async function getSubcategories(categoryId = null) {
  try {
    let query = supabase
      .from("subcategories")
      .select("*, categories(id, title)");

    if (categoryId) {
      query = query.eq("category_id", categoryId);
    }

    const { data, error } = await query.order("title", { ascending: true });
    if (error) {
      return [];
    }
    return data || [];
  } catch (err) {
    return [];
  }
}

// ✅ Add new subcategory
export async function addSubcategory({ category_id, title, slug, display_order }) {
  const cleanSlug =
    slug ||
    title
      ?.toLowerCase()
      .trim()
      .replace(/[^a-zA-Z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const payload = {
    category_id,
    title: title.trim(),
    slug: cleanSlug,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  if (display_order !== undefined && display_order !== null && display_order !== "") {
    payload.display_order = parseInt(display_order, 10);
  }

  const { data, error } = await supabase
    .from("subcategories")
    .insert([payload])
    .select()
    .single();

  if (error) throw new Error("Failed to add subcategory: " + error.message);
  return data;
}

// ✅ Update subcategory
export async function updateSubcategory({ id, ...fields }) {
  fields.updated_at = new Date().toISOString();
  const { data, error } = await supabase
    .from("subcategories")
    .update(fields)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error("Failed to update subcategory: " + error.message);
  return data;
}

// ✅ Delete subcategory
export async function deleteSubcategory(id) {
  const { error } = await supabase.from("subcategories").delete().eq("id", id);
  if (error) throw new Error("Failed to delete subcategory: " + error.message);
  return true;
}

////////////////////
// 🔹 PRODUCT APIS //
////////////////////

// ✅ Get all products (relational join with subcategories, display order first, newest uploaded first)
export async function getProducts() {
  let { data, error } = await supabase
    .from("products")
    .select("id, name, article_no, description, img_src, other_images, slug, display_order, created_at, subcategory_id, subcategories(id, title, slug, category_id)")
    .order("display_order", { ascending: true, nullsFirst: false })
    .order("created_at", { ascending: false })
    .order("id", { ascending: false });

  if (error) throw new Error(error.message);

  return (data || []).map((p) => ({
    ...p,
    subcategory: p.subcategories?.title || "",
  }));
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
  subcategory_id,
  other_images,
  slug,
  display_order,
}) {
  const finalSlug = slug || generateSlug(name, article_no);

  let resolvedSubcategoryId = subcategory_id;
  if (!resolvedSubcategoryId && subcategory) {
    try {
      const { data: matchedSub } = await supabase
        .from("subcategories")
        .select("id")
        .ilike("title", subcategory.trim())
        .limit(1)
        .maybeSingle();
      if (matchedSub?.id) {
        resolvedSubcategoryId = matchedSub.id;
      }
    } catch (e) {
      console.warn("Subcategory lookup error:", e);
    }
  }

  const payload = {
    name,
    article_no,
    description,
    img_src,
    subcategory_id: resolvedSubcategoryId || null,
    other_images,
    slug: finalSlug,
    created_at: new Date().toISOString(),
  };

  const parsedOrder =
    display_order !== undefined && display_order !== "" && display_order !== null
      ? parseInt(display_order, 10)
      : null;

  if (parsedOrder !== null && !isNaN(parsedOrder)) {
    payload.display_order = parsedOrder;
  }

  const { error } = await supabase.from("products").insert([payload]);
  if (error) throw new Error("Failed to add product: " + error.message);
}

// ✅ Update product
export async function updateProduct({ id, ...fields }) {
  if (!fields.slug && (fields.name || fields.article_no)) {
    const { data: existing } = await supabase
      .from("products")
      .select("name, article_no")
      .eq("id", id)
      .single();

    const nameToUse = fields.name ?? existing?.name ?? "";
    const artNoToUse = fields.article_no ?? existing?.article_no ?? "";
    fields.slug = generateSlug(nameToUse, artNoToUse);
  }

  // If subcategory string is passed, resolve to subcategory_id and strip the string field
  if (fields.subcategory !== undefined) {
    if (fields.subcategory && !fields.subcategory_id) {
      try {
        const { data: matchedSub } = await supabase
          .from("subcategories")
          .select("id")
          .ilike("title", fields.subcategory.trim())
          .limit(1)
          .maybeSingle();
        if (matchedSub?.id) {
          fields.subcategory_id = matchedSub.id;
        }
      } catch (e) {
        console.warn("Subcategory lookup error:", e);
      }
    }
    delete fields.subcategory;
  }

  if (fields.display_order !== undefined) {
    if (fields.display_order === "" || fields.display_order === null) {
      fields.display_order = null;
    } else {
      const parsed = parseInt(fields.display_order, 10);
      fields.display_order = isNaN(parsed) ? null : parsed;
    }
  }

  delete fields.subcategories;

  const { error } = await supabase
    .from("products")
    .update(fields)
    .eq("id", id);

  if (error) throw new Error("Failed to update product: " + error.message);
}

// ✅ Quick update display position for a product
export async function updateProductPosition(id, position) {
  const parsed =
    position !== "" && position !== null && position !== undefined
      ? parseInt(position, 10)
      : null;

  const val = isNaN(parsed) ? null : parsed;

  const { error } = await supabase
    .from("products")
    .update({ display_order: val })
    .eq("id", id);

  if (error) {
    if (error.code === "42703" || error.message?.includes("display_order")) {
      throw new Error(
        "Please run the SQL command in supabase_products_order_setup.sql in your Supabase SQL Editor to enable custom ordering."
      );
    }
    throw new Error("Failed to update product position: " + error.message);
  }
}

// ✅ Delete product
export async function deleteProduct(id) {
  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) throw new Error("Failed to delete product: " + error.message);
}

export async function fetchProduct(id) {
  const { data, error } = await supabase
    .from("products")
    .select("id, name, article_no, description, img_src, other_images, slug, display_order, created_at, subcategory_id, subcategories(id, title, slug, category_id)")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);
  return {
    ...data,
    subcategory: data.subcategories?.title || "",
  };
}

export async function fetchProductBySlug(slug) {
  if (!slug) return null;

  const selectQuery = "id, name, article_no, description, img_src, other_images, slug, display_order, created_at, subcategory_id, subcategories(id, title, slug, category_id)";
  const normalize = (prod) => (prod ? { ...prod, subcategory: prod.subcategories?.title || "" } : null);

  // 1. Try direct slug match
  const { data, error } = await supabase
    .from("products")
    .select(selectQuery)
    .eq("slug", slug)
    .single();

  if (!error && data) return normalize(data);

  // 2. Fallback: If slug is numeric, check by id
  if (!isNaN(slug)) {
    const { data: byId } = await supabase
      .from("products")
      .select(selectQuery)
      .eq("id", slug)
      .single();
    if (byId) return normalize(byId);
  }

  // 3. Fallback: Check if slug ends with -[id] (e.g. product-name-23)
  const idMatch = String(slug).match(/-(\d+)$/);
  if (idMatch) {
    const extractedId = idMatch[1];
    const { data: byExtractedId } = await supabase
      .from("products")
      .select(selectQuery)
      .eq("id", extractedId)
      .single();
    if (byExtractedId) return normalize(byExtractedId);
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
