'use client';

import React from 'react';
import { useState } from 'react';




export default function ProductsManager({
  categories,
  products,
  productName,
  articleNo,
  productDescription,
  selectedSubcategory,
  productImageFile,
  setProductName,
  setArticleNo,
  setProductDescription,
  setSelectedSubcategory,
  setProductImageFile,
  handleAddProduct,
  editingProduct,
  setEditingProduct,
  editingProductFile,
  setEditingProductFile,
  handleUpdateProduct,
  handleDeleteProduct,
}) 



{
  const [filterSubcategory, setFilterSubcategory] = useState('');
  return (
    <>
      {/* Add Product */}
      <section>
        <h2 className="text-xl font-semibold text-yellow-300 mb-2">Add Product</h2>
        <div className="space-y-2">
          <input
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Product Name"
            className="p-2 w-full bg-gray-800 border border-yellow-500"
          />
          <input
            value={articleNo}
            onChange={(e) => setArticleNo(e.target.value)}
            placeholder="Article No"
            className="p-2 w-full bg-gray-800 border border-yellow-500"
          />
          <textarea
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            placeholder="Product Description"
            className="p-2 w-full bg-gray-800 border border-yellow-500"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProductImageFile(e.target.files[0])}
            className="p-2 w-full bg-gray-800 border border-yellow-500"
          />
          <select
            value={selectedSubcategory}
            onChange={(e) => setSelectedSubcategory(e.target.value)}
            className="p-2 w-full bg-gray-800 border border-yellow-500"
          >
            <option value="">Select Subcategory</option>
            {categories.flatMap((cat) =>
              cat.subcategories.map((sub) => (
                <option key={`${cat.id}-${sub}`} value={sub}>
                  {cat.title} → {sub}
                </option>
              ))
            )}
          </select>
          <button
            onClick={handleAddProduct}
            className="bg-yellow-500 text-black px-4 py-2 font-semibold"
          >
            Add Product
          </button>
        </div>
      </section>

      {/* All Products */}
      
        {/* <section>
          <h2 className="text-xl font-semibold text-yellow-300 mb-4">All Products</h2>
          {products.map((prod) => (
            <div key={prod.id} className="mb-4 border border-yellow-500 p-4">
              {editingProduct?.id === prod.id ? (
                <>
                  <input
                    value={editingProduct.name}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, name: e.target.value })
                    }
                    className="p-2 bg-gray-800 border border-yellow-500 w-full mb-2"
                    placeholder="Product Name"
                  />
                  <input
                    value={editingProduct.article_no}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, article_no: e.target.value })
                    }
                    className="p-2 bg-gray-800 border border-yellow-500 w-full mb-2"
                    placeholder="Article No"
                  />
                  <textarea
                    value={editingProduct.description}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, description: e.target.value })
                    }
                    className="p-2 bg-gray-800 border border-yellow-500 w-full mb-2"
                    placeholder="Description"
                  />
                  <select
                    value={editingProduct.subcategory}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, subcategory: e.target.value })
                    }
                    className="p-2 bg-gray-800 border border-yellow-500 w-full mb-2"
                  >
                    <option value="">Select Subcategory</option>
                    {categories.flatMap((cat) =>
                      cat.subcategories.map((sub) => (
                        <option key={`${cat.id}-${sub}`} value={sub}>
                          {cat.title} → {sub}
                        </option>
                      ))
                    )}
                  </select>
                  <h4 className="text-white italic">
                    This is optional. If left empty the old file will be saved
                  </h4>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setEditingProductFile(e.target.files[0])}
                    className="p-2 bg-gray-800 border border-yellow-500 w-full mb-2"
                  />
                  <button
                    onClick={handleUpdateProduct}
                    className="bg-green-500 px-4 py-1 text-black mr-2"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setEditingProduct(null);
                      setEditingProductFile(null);
                    }}
                    className="bg-red-600 px-4 py-1"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <h3 className="text-lg font-bold text-yellow-400">{prod.name}</h3>
                  <p className="text-sm text-gray-300">Article No: {prod.article_no}</p>
                  <p className="text-sm text-gray-300">Description: {prod.description}</p>
                  <p className="text-sm text-gray-300">Subcategory: {prod.subcategory}</p>
                  <img
                    src={prod.img_src}
                    alt={prod.name}
                    className="w-32 h-32 object-cover mt-2 border border-yellow-500"
                  />
                  <div className="mt-2">
                    <button
                      onClick={() => setEditingProduct(prod)}
                      className="text-sm text-blue-400 underline mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(prod.id)}
                      className="text-sm text-red-400 underline"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </section> */}


<section>
  <h2 className="text-xl font-semibold text-yellow-300 mb-4">All Products</h2>

  {/* Filter Tabs */}
  <div className="flex flex-wrap gap-2 mb-4">
    <button
      onClick={() => setFilterSubcategory('')}
      className={`px-3 py-1 rounded ${
        !filterSubcategory
          ? 'bg-yellow-500 text-black font-semibold'
          : 'bg-gray-700 text-white'
      }`}
    >
      All
    </button>
    {Array.from(
      new Set(products.map((prod) => prod.subcategory))
    ).map((subcat) => (
      <button
        key={subcat}
        onClick={() => setFilterSubcategory(subcat)}
        className={`px-3 py-1 rounded ${
          filterSubcategory === subcat
            ? 'bg-yellow-500 text-black font-semibold'
            : 'bg-gray-700 text-white'
        }`}
      >
        {subcat}
      </button>
    ))}
  </div>

  {/* Filtered Product List */}
  {products
    .filter((prod) =>
      filterSubcategory ? prod.subcategory === filterSubcategory : true
    )
    .map((prod) => (
      <div key={prod.id} className="mb-4 border border-yellow-500 p-4">
        {editingProduct?.id === prod.id ? (
          <>
            {/* Editing Fields (same as before) */}
          </>
        ) : (
          <>
            <h3 className="text-lg font-bold text-yellow-400">{prod.name}</h3>
            <p className="text-sm text-gray-300">Article No: {prod.article_no}</p>
            <p className="text-sm text-gray-300">Description: {prod.description}</p>
            <p className="text-sm text-gray-300">Subcategory: {prod.subcategory}</p>
            <img
              src={prod.img_src}
              alt={prod.name}
              className="w-32 h-32 object-cover mt-2 border border-yellow-500"
            />
            <div className="mt-2">
              <button
                onClick={() => setEditingProduct(prod)}
                className="text-sm text-blue-400 underline mr-4"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteProduct(prod.id)}
                className="text-sm text-red-400 underline"
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    ))}
</section>

    </>
  );
}
