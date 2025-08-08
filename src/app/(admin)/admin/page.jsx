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
import { Folder, Package } from 'lucide-react'; // 
import CategoriesManager from './CategoriesManagr';
import ProductsManager from './ProductsManager';
import toast from 'react-hot-toast';


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


useEffect(() => {
  const storedAuth = localStorage.getItem('admin-auth');
  if (storedAuth === 'true') {
    setIsAuthenticated(true);
    fetchCategories();
    fetchProducts();
  } else {
    const username = prompt('Enter admin username:');
    const password = prompt('Enter admin password:');
    
    // Replace with your desired username and password
    if (username === 'nimramughal' && password === 'Nimra123$') {
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


async function handleDeleteProduct(id) {
  const confirmed = window.confirm('Delete this product?');
  if (!confirmed) return;

  const toastId = toast.loading('Deleting product...');

  try {
    await deleteProduct(id);
    fetchProducts();
    toast.success('Product deleted!', { id: toastId });
  } catch (err) {
    toast.error('Failed to delete product', { id: toastId });
  }
}

async function handleUpdateProduct() {
  const { id, name, article_no, description, img_src, subcategory } = editingProduct;
  if (!name || !description || !subcategory) {
    return toast.error('All fields are required');
  }

  const toastId = toast.loading('Updating product...');

  try {
    let finalImageURL = img_src;

    if (editingProductFile) {
      const fileExt = editingProductFile.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `products/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, editingProductFile);

      if (uploadError) throw new Error('Image upload failed: ' + uploadError.message);

      const {
        data: { publicUrl },
      } = supabase.storage.from('product-images').getPublicUrl(filePath);

      finalImageURL = publicUrl;
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



async function handleAddCategory() {
  if (!newCategory || !newSubcategories)
    return toast.error('All fields required');

  const toastId = toast.loading('Adding category...');

  try {
    await addCategory({
      title: newCategory,
      subcategories: newSubcategories.split(',').map(s => s.trim()),
    });

    setNewCategory('');
    setNewSubcategories('');
    await fetchCategories();
    toast.success('Category added!', { id: toastId });
  } catch (err) {
    toast.error('Failed to add category', { id: toastId });
  }
}

//   async function handleAddCategory() {
//     if (!newCategory || !newSubcategories) return alert('All fields required');
//     console.log(newCategory, newSubcategories);
    
//   await addCategory({
//   title: newCategory,
//   subcategories: newSubcategories.split(',').map(s => s.trim()),
// });
//     setNewCategory('');
//     setNewSubcategories('');
//     fetchCategories();
//   }



async function handleUpdateCategory() {
  if (!editingCategory.title || !editingCategory.subcategories.length)
    return toast.error('Fields cannot be empty');

  const toastId = toast.loading('Updating category...');

  try {
    await updateCategory(editingCategory);
    setEditingCategory(null);
    await fetchCategories();
    toast.success('Category updated!', { id: toastId });
  } catch (err) {
    toast.error('Failed to update category', { id: toastId });
  }
}


  // async function handleUpdateCategory() {
  //   if (!editingCategory.title || !editingCategory.subcategories.length)
  //     return alert('Fields cannot be empty');

  //   await updateCategory(editingCategory);
  //   setEditingCategory(null);
  //   fetchCategories();
  // }

  async function handleDeleteCategory(id) {
  if (!confirm('Delete this category?')) return;

  const toastId = toast.loading('Deleting category...');

  try {
    await deleteCategory(id);
    await fetchCategories();
    toast.success('Category deleted!', { id: toastId });
  } catch (err) {
    toast.error('Failed to delete category', { id: toastId });
  }
}


  // async function handleDeleteCategory(id) {
  //   if (!confirm('Delete this category?')) return;
  //   await deleteCategory(id);
  //   fetchCategories();
  // }


async function handleAddProduct() {
  if (!productName || !productDescription || !productImageFile || !selectedSubcategory) {
    return toast.error('All product fields are required');
  }

  const toastId = toast.loading('Uploading product...');

  try {
    const fileExt = productImageFile.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `products/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(filePath, productImageFile);

    if (uploadError) throw new Error('Image upload failed: ' + uploadError.message);

    const {
      data: { publicUrl },
    } = supabase.storage.from('product-images').getPublicUrl(filePath);

    await addProduct({
      name: productName,
      article_no: articleNo,
      description: productDescription,
      img_src: publicUrl,
      subcategory: selectedSubcategory,
    });

    setProductName('');
    setArticleNo('');
    setProductDescription('');
    setProductImageFile(null);
    setSelectedSubcategory('');

    toast.success('Product added successfully!', { id: toastId });
    fetchProducts();
  } catch (err) {
    toast.error(err.message || 'Failed to add product', { id: toastId });
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
</div>


{activeTab === 'categories' && (
  <CategoriesManager
    categories={categories}
    newCategory={newCategory}
    newSubcategories={newSubcategories}
    setNewCategory={setNewCategory}
    setNewSubcategories={setNewSubcategories}
    editingCategory={editingCategory}
    setEditingCategory={setEditingCategory}
    handleAddCategory={handleAddCategory}
    handleUpdateCategory={handleUpdateCategory}
    handleDeleteCategory={handleDeleteCategory}
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




   

    </div>
  );
}
