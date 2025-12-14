'use client';

import { supabase } from '@/lib/supabaseClient';
import { useEffect, useState } from 'react';
import {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct

} from '@/app/utils/adminAPI';
import { Folder, Package, Video } from 'lucide-react'; // 
import CategoriesManager from './CategoriesManagr';
import ProductsManager from './ProductsManager';
import toast from 'react-hot-toast';
import PortfolioManager from './PortfolioMager';


export default function AdminPage() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [newSubcategories, setNewSubcategories] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);
  const [productName, setProductName] = useState('');
  const [articleNo, setArticleNo] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('categories');
  const [productImageFile, setProductImageFile] = useState(null);
  const [editingProductFile, setEditingProductFile] = useState(null);
  const [categoryImageUrl, setCategoryImageUrl] = useState("");
const [categoryImageFile, setCategoryImageFile] = useState(null);
const [portfolio, setPortfolio] = useState([]);
const [portfolioFile, setPortfolioFile] = useState(null);
const [editingPortfolio, setEditingPortfolio] = useState(null);




useEffect(() => {
  const storedAuth = localStorage.getItem('admin-auth');
  if (storedAuth === 'true') {
    setIsAuthenticated(true);
    fetchCategories();
    fetchProducts();
        fetchPortfolio(); 
  } else {
    const username = prompt('Enter admin username:');
    const password = prompt('Enter admin password:');
    
  const envUsername = process.env.NEXT_PUBLIC_ADMIN_USERNAME;
    const envPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;


    // Replace with your desired username and password
    if (username === envUsername && password === envPassword) {
      localStorage.setItem('admin-auth', 'true');
      setIsAuthenticated(true);
      fetchCategories();
      fetchProducts();
    } else {
      alert('Unauthorized');
    }
  }
}, []);


  async function fetchCategories() {
    const data = await getCategories();
    setCategories(data);
  }
  async function fetchProducts() {
  const data = await getProducts();
  setProducts(data);
}


async function handleDeleteProduct(product) {
  if (!confirm("Delete this product?")) return;

  const toastId = toast.loading("Deleting product...");

  try {
    // 1️⃣ Delete product image from storage
    if (product.img_src) {
      const filePath = getStoragePathFromUrl(product.img_src);

      if (filePath) {
        await supabase.storage
          .from("product-images")
          .remove([filePath]);
      }
    }

    // 2️⃣ Delete product from DB
    await deleteProduct(product.id);

    fetchProducts();
    toast.success("Product deleted!", { id: toastId });
  } catch (err) {
    console.error(err);
    toast.error("Failed to delete product", { id: toastId });
  }
}

async function handleUpdateProduct({ imageType, file, url }) {
  const { id, name, article_no, description, img_src, subcategory } = editingProduct;

  if (!name || !description || !subcategory) {
    return toast.error('All fields are required');
  }

  const toastId = toast.loading('Updating product...');

  try {
    let finalImageURL = img_src; // Keep old one by default

    if (imageType === "file" && file) {
      // Upload new file
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `products/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, file);

      if (uploadError) throw new Error('Image upload failed: ' + uploadError.message);

      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);

      finalImageURL = publicUrl;

    } else if (imageType === "url" && url) {
      finalImageURL = url; // Replace with URL
    }

    await updateProduct({
      id,
      name,
      article_no,
      description,
      img_src: finalImageURL,
      subcategory,
    });

    setEditingProduct(null);
    setEditingProductFile(null);
    fetchProducts();

    toast.success('Product updated successfully!', { id: toastId });

  } catch (err) {
    toast.error(err.message || 'Failed to update product', { id: toastId });
  }
}



async function handleCategoryImageUpload() {
  if (!categoryImageFile) return categoryImageUrl || "";

  const fileName = `${Date.now()}-${categoryImageFile.name}`;

  const { data, error } = await supabase.storage
    .from("product-images")
    .upload(fileName, categoryImageFile);

  if (error) {
    console.error("Image upload failed:", error);
    return categoryImageUrl || "";
  }

  const { data: publicUrlData } = supabase.storage
    .from("product-images")
    .getPublicUrl(fileName);

  return publicUrlData.publicUrl;
}



async function handleAddCategory() {
  if (!newCategory || !newSubcategories)
    return toast.error("All fields required");

  const toastId = toast.loading("Adding category...");

  try {
    // Upload image (if provided)
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
    toast.success("Category added!", { id: toastId });

  } catch (err) {
    toast.error("Failed to add category: " + err.message, { id: toastId });
  }
}





async function handleUpdateCategory() {
  if (!editingCategory.title || !editingCategory.subcategories.length)
    return toast.error("Fields cannot be empty");

  const toastId = toast.loading("Updating category...");

  try {
    let finalImageUrl = editingCategory.img_src;

    // Only upload new file if user selected a new one
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
    toast.success("Category updated!", { id: toastId });

  } catch (err) {
    toast.error("Failed to update category", { id: toastId });
  }
}




async function handleDeleteCategory(category) {
  if (!confirm("Delete this category?")) return;

  const toastId = toast.loading("Deleting category...");

  try {
    // 1️⃣ Delete image from storage
    if (category.img_src) {
      const filePath = getStoragePathFromUrl(category.img_src);

      if (filePath) {
        await supabase.storage
          .from("product-images")
          .remove([filePath]);
      }
    }

    // 2️⃣ Delete DB record
    await deleteCategory(category.id);

    fetchCategories();
    toast.success("Category deleted!", { id: toastId });
  } catch (err) {
    console.error(err);
    toast.error("Failed to delete category", { id: toastId });
  }
}






async function handleAddProduct({ imageType, file, url }) {
  if (!productName || !productDescription || !selectedSubcategory) {
    return toast.error('All product fields are required');
  }

  const toastId = toast.loading('Saving product...');

  try {
    let finalImageURL = '';

    if (imageType === "file") {
      if (!file) return toast.error("Please select an image file.");

      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `products/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, file);

      if (uploadError) throw new Error('Image upload failed: ' + uploadError.message);

      const {
        data: { publicUrl },
      } = supabase.storage.from('product-images').getPublicUrl(filePath);

      finalImageURL = publicUrl;

    } else if (imageType === "url") {
      if (!url) return toast.error("Please enter an image URL.");
      finalImageURL = url;
    }

    await addProduct({
      name: productName,
      article_no: articleNo,
      description: productDescription,
      img_src: finalImageURL,
      subcategory: selectedSubcategory,
    });

    // Reset fields
    setProductName('');
    setArticleNo('');
    setProductDescription('');
    setSelectedSubcategory('');
    setProductImageFile(null);

    toast.success('Product added successfully!', { id: toastId });
    fetchProducts();

  } catch (err) {
    toast.error(err.message || 'Failed to add product', { id: toastId });
  }
}


async function fetchPortfolio() {
  const { data, error } = await supabase
    .from('portfolio')
    .select('*')
    .order('created_at', { ascending: false });

  if (!error) setPortfolio(data);
}

async function handleAddPortfolio() {
  if (!portfolioFile) return toast.error('Select a video');

  const toastId = toast.loading('Uploading video...');

  try {
    const fileExt = portfolioFile.name.split('.').pop();
    const fileName = `portfolio/${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(fileName, portfolioFile);

    if (uploadError) throw uploadError;

    const {
      data: { publicUrl },
    } = supabase.storage.from('product-images').getPublicUrl(fileName);

    await supabase.from('portfolio').insert({
      url: publicUrl,
    });

    setPortfolioFile(null);
    fetchPortfolio();
    toast.success('Video added!', { id: toastId });
  } catch (err) {
    toast.error('Upload failed', { id: toastId });
  }
}

async function handleUpdatePortfolio() {
  if (!editingPortfolio) return;

  const toastId = toast.loading('Updating video...');

  try {
    let finalUrl = editingPortfolio.url;

    if (portfolioFile) {
      const fileExt = portfolioFile.name.split('.').pop();
      const fileName = `portfolio/${Date.now()}.${fileExt}`;

      await supabase.storage
        .from('product-images')
        .upload(fileName, portfolioFile);

      const {
        data: { publicUrl },
      } = supabase.storage.from('product-images').getPublicUrl(fileName);

      finalUrl = publicUrl;
    }

    await supabase
      .from('portfolio')
      .update({ url: finalUrl })
      .eq('id', editingPortfolio.id);

    setEditingPortfolio(null);
    setPortfolioFile(null);
    fetchPortfolio();

    toast.success('Updated!', { id: toastId });
  } catch {
    toast.error('Update failed', { id: toastId });
  }
}


function getStoragePathFromUrl(url) {
  if (!url) return null;

  const marker = "/product-images/";
  const index = url.indexOf(marker);

  if (index === -1) return null;

  return url.substring(index + marker.length);
}


async function handleDeletePortfolio(item) {
  if (!confirm("Delete this video?")) return;

  const toastId = toast.loading("Deleting video...");

  try {
    await supabase.from("portfolio").delete().eq("id", item.id);

    if (item.url) {
      const filePath = getStoragePathFromUrl(item.url);
console.log("got this file path",filePath);

      if (filePath) {
        await supabase.storage
          .from("product-images")
          .remove([filePath]);
      }
    }

    fetchPortfolio();
    toast.success("Video deleted!", { id: toastId });
  } catch (err) {
    console.error(err);
    toast.error("Delete failed", { id: toastId });
  }
}





if (!isAuthenticated) {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-2xl font-bold text-red-500">Access Denied</h1>
    </div>
  );
}


  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 space-y-12">
<div className="flex justify-between items-center mb-8">
  <h1 className="text-3xl font-bold text-yellow-400">Admin Panel</h1>
  <button
    onClick={() => {
      localStorage.removeItem('admin-auth');
      window.location.reload();
    }}
    className="text-sm px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded"
  >
    Log Out
  </button>
</div>

<div className="flex space-x-4 mb-8">
  <button
    onClick={() => setActiveTab('categories')}
    className={`flex items-center px-4 py-2 rounded ${
      activeTab === 'categories'
        ? 'bg-yellow-500 text-black font-semibold'
        : 'bg-gray-700 text-white'
    }`}
  >
    <Folder className="w-4 h-4 mr-2" />
    Categories
  </button>
  <button
    onClick={() => setActiveTab('products')}
    className={`flex items-center px-4 py-2 rounded ${
      activeTab === 'products'
        ? 'bg-yellow-500 text-black font-semibold'
        : 'bg-gray-700 text-white'
    }`}
  >
    <Package className="w-4 h-4 mr-2" />
    Products
  </button>

  <button
  onClick={() => setActiveTab('portfolio')}
  className={`flex items-center px-4 py-2 rounded ${
    activeTab === 'portfolio'
      ? 'bg-yellow-500 text-black font-semibold'
      : 'bg-gray-700 text-white'
  }`}
>
  <Video className="w-4 h-4 mr-2" />
  Portfolio
</button>

</div>


{activeTab === 'categories' && (
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
    setNewCategory={setNewCategory}          // ✅ ADD THIS
    setNewSubcategories={setNewSubcategories} 
    
/>

)}

{activeTab === 'products' && (
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
  />




)}

{activeTab === 'portfolio' && (
  <PortfolioManager
    portfolio={portfolio}
    portfolioFile={portfolioFile}
    setPortfolioFile={setPortfolioFile}
    editingPortfolio={editingPortfolio}
    setEditingPortfolio={setEditingPortfolio}
    handleAddPortfolio={handleAddPortfolio}
    handleUpdatePortfolio={handleUpdatePortfolio}
    handleDeletePortfolio={handleDeletePortfolio}
  />
)}



   

    </div>
  );
}
