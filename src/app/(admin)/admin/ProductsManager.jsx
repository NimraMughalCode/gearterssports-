'use client';

import React, { useState } from 'react';
import { Upload, X, Image as ImageIcon, Plus, Trash2 } from 'lucide-react';

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
  otherImages,
  setOtherImages,
  otherImageFiles = [],
  setOtherImageFiles,
}) {
  const [filterSubcategory, setFilterSubcategory] = useState('');

  // STATES FOR ADD PRODUCT MODE
  const [productImageType, setProductImageType] = useState("file");
  const [productImageUrl, setProductImageUrl] = useState("");

  // STATES FOR EDIT PRODUCT MODE
  const [editingProductImageType, setEditingProductImageType] = useState("file");
  const [editingProductImageUrl, setEditingProductImageUrl] = useState("");
  const [editingOtherImages, setEditingOtherImages] = useState([]);
  const [editingOtherImageFiles, setEditingOtherImageFiles] = useState([]);

  // Handlers for Add Product Additional Images
  const handleAddOtherFiles = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selected = Array.from(e.target.files);
      if (setOtherImageFiles) {
        setOtherImageFiles((prev) => [...prev, ...selected]);
      }
      e.target.value = '';
    }
  };

  const handleRemoveOtherFile = (indexToRemove) => {
    if (setOtherImageFiles) {
      setOtherImageFiles((prev) => prev.filter((_, idx) => idx !== indexToRemove));
    }
  };

  // Handlers for Edit Product Additional Images
  const handleEditAddOtherFiles = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selected = Array.from(e.target.files);
      setEditingOtherImageFiles((prev) => [...prev, ...selected]);
      e.target.value = '';
    }
  };

  const handleEditRemoveOtherFile = (indexToRemove) => {
    setEditingOtherImageFiles((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleEditRemoveExistingImage = (indexToRemove) => {
    setEditingOtherImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  return (
    <>
      {/* Add Product */}
      <section className="bg-gray-900/90 border border-yellow-500/40 p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
          <ImageIcon className="w-6 h-6 text-yellow-400" />
          Add New Product
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">
              Product Name *
            </label>
            <input
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="e.g. Boxing Gloves Pro Series"
              className="p-2.5 w-full bg-gray-800 border border-yellow-500/60 rounded focus:border-yellow-400 text-white outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">
                Article No
              </label>
              <input
                value={articleNo}
                onChange={(e) => setArticleNo(e.target.value)}
                placeholder="e.g. ART-9021"
                className="p-2.5 w-full bg-gray-800 border border-yellow-500/60 rounded focus:border-yellow-400 text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">
                Subcategory *
              </label>
              <select
                value={selectedSubcategory}
                onChange={(e) => setSelectedSubcategory(e.target.value)}
                className="p-2.5 w-full bg-gray-800 border border-yellow-500/60 rounded focus:border-yellow-400 text-white outline-none"
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
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">
              Product Description *
            </label>
            <textarea
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              placeholder="Enter comprehensive product description..."
              rows={3}
              className="p-2.5 w-full bg-gray-800 border border-yellow-500/60 rounded focus:border-yellow-400 text-white outline-none"
            />
          </div>

          {/* MAIN IMAGE SECTION */}
          <div className="p-4 rounded-lg bg-gray-800/80 border border-yellow-500/40 space-y-3">
            <div className="flex justify-between items-center flex-wrap gap-2">
              <label className="text-sm font-semibold text-yellow-300">
                Main Featured Image *
              </label>
              <div className="flex gap-4 text-xs text-white">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    value="file"
                    checked={productImageType === "file"}
                    onChange={() => setProductImageType("file")}
                    className="accent-yellow-400"
                  /> Upload File
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    value="url"
                    checked={productImageType === "url"}
                    onChange={() => setProductImageType("url")}
                    className="accent-yellow-400"
                  /> Image URL
                </label>
              </div>
            </div>

            {productImageType === "file" ? (
              <div className="space-y-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setProductImageFile(e.target.files[0] || null)}
                  className="p-2 w-full bg-gray-900 border border-yellow-500/50 rounded text-sm text-gray-300 file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-yellow-500 file:text-black hover:file:bg-yellow-400 cursor-pointer"
                />
                {productImageFile && (
                  <div className="flex items-center gap-3 bg-gray-900/90 p-2 rounded border border-yellow-500/40">
                    <img
                      src={URL.createObjectURL(productImageFile)}
                      alt="Main Preview"
                      className="w-14 h-14 object-cover rounded border border-yellow-500"
                    />
                    <div className="text-xs text-gray-300 flex-1 min-w-0">
                      <p className="font-semibold text-white truncate">{productImageFile.name}</p>
                      <p className="text-gray-400">{(productImageFile.size / 1024).toFixed(1)} KB</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setProductImageFile(null)}
                      className="text-red-400 hover:text-red-300 text-xs px-2 py-1 bg-red-950/40 rounded border border-red-800"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                <input
                  value={productImageUrl}
                  onChange={(e) => setProductImageUrl(e.target.value)}
                  placeholder="https://example.com/product-image.jpg"
                  className="p-2 w-full bg-gray-900 border border-yellow-500/50 rounded text-sm text-white"
                />
                {productImageUrl && (
                  <img
                    src={productImageUrl}
                    alt="URL Preview"
                    className="w-16 h-16 object-cover rounded border border-yellow-500 mt-2"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                )}
              </div>
            )}
          </div>

          {/* ADDITIONAL GALLERY IMAGES SECTION */}
          <div className="p-4 rounded-lg bg-gray-800/80 border border-yellow-500/40 space-y-3">
            <div>
              <h4 className="text-yellow-300 font-semibold text-sm md:text-base flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-yellow-400" />
                Additional Images (Gallery)
              </h4>
              <p className="text-xs text-gray-400 mt-0.5">
                Upload multiple images directly from your computer or provide image URLs.
              </p>
            </div>

            {/* Direct Multi-file Drop/Click Area */}
            <label className="border-2 border-dashed border-yellow-500/60 hover:border-yellow-400 bg-gray-900/60 hover:bg-gray-900 rounded-lg p-5 flex flex-col items-center justify-center cursor-pointer transition text-center group">
              <Upload className="w-8 h-8 text-yellow-400 group-hover:scale-110 transition-transform mb-1.5" />
              <span className="text-sm font-semibold text-white">
                Click to upload images directly
              </span>
              <span className="text-xs text-gray-400 mt-1">
                Select one or multiple image files (JPG, PNG, WEBP)
              </span>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleAddOtherFiles}
                className="hidden"
              />
            </label>

            {/* Direct Files Previews */}
            {otherImageFiles && otherImageFiles.length > 0 && (
              <div className="space-y-2 pt-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-yellow-300 font-semibold">
                    Staged Images to Upload ({otherImageFiles.length}):
                  </span>
                  <button
                    type="button"
                    onClick={() => setOtherImageFiles([])}
                    className="text-red-400 hover:text-red-300 underline"
                  >
                    Clear all staged
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                  {otherImageFiles.map((file, index) => (
                    <div
                      key={`${file.name}-${index}`}
                      className="relative group rounded-lg overflow-hidden border border-yellow-500/60 bg-black aspect-square shadow"
                    >
                      <img
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-1.5">
                        <button
                          type="button"
                          onClick={() => handleRemoveOtherFile(index)}
                          className="self-end bg-red-600 hover:bg-red-700 text-white rounded-full p-1 shadow transition"
                          title="Remove image"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-[10px] text-white truncate bg-black/80 px-1 rounded">
                          {file.name}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* External URLs list */}
            <div className="pt-2 border-t border-gray-700/60">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-gray-300 font-medium">
                  Add by Image URL ({otherImages.length})
                </span>
                <button
                  type="button"
                  onClick={() => setOtherImages([...otherImages, ""])}
                  className="bg-gray-700 hover:bg-gray-600 px-2.5 py-1 text-xs text-white rounded flex items-center gap-1 transition"
                >
                  <Plus className="w-3.5 h-3.5" /> Add URL
                </button>
              </div>

              {otherImages.map((img, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    value={img}
                    onChange={(e) => {
                      const updated = [...otherImages];
                      updated[index] = e.target.value;
                      setOtherImages(updated);
                    }}
                    placeholder="https://image-url.com"
                    className="p-2 text-sm flex-1 bg-gray-900 border border-yellow-500/60 rounded text-white outline-none focus:border-yellow-400"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setOtherImages(otherImages.filter((_, i) => i !== index))
                    }
                    className="bg-red-600 hover:bg-red-700 px-3 text-white rounded text-xs flex items-center transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() =>
              handleAddProduct({
                imageType: productImageType,
                file: productImageFile,
                url: productImageUrl,
                otherImageFiles: otherImageFiles,
              })
            }
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-black py-3 rounded-lg font-bold transition shadow-md flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" /> Add Product
          </button>
        </div>
      </section>

      {/* All Products */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-yellow-400 mb-4">All Products ({products.length})</h2>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setFilterSubcategory('')}
            className={`px-3 py-1.5 rounded-lg text-sm transition ${!filterSubcategory ? 'bg-yellow-500 text-black font-bold' : 'bg-gray-800 hover:bg-gray-700 text-white'}`}
          >
            All Products
          </button>
          {Array.from(new Set(products.map((prod) => prod.subcategory).filter(Boolean))).map((subcat) => (
            <button
              key={subcat}
              onClick={() => setFilterSubcategory(subcat)}
              className={`px-3 py-1.5 rounded-lg text-sm transition ${filterSubcategory === subcat ? 'bg-yellow-500 text-black font-bold' : 'bg-gray-800 hover:bg-gray-700 text-white'}`}
            >
              {subcat}
            </button>
          ))}
        </div>

        {/* Filtered Product List */}
        <div className="space-y-4">
          {products
            .filter((prod) => (filterSubcategory ? prod.subcategory === filterSubcategory : true))
            .map((prod) => (
              <div
                key={prod.id}
                className="bg-gray-900 border border-yellow-500/50 rounded-xl p-5 shadow-lg"
              >
                {editingProduct?.id === prod.id ? (
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-yellow-400">Editing: {prod.name}</h3>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Product Name</label>
                      <input
                        value={editingProduct.name}
                        onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                        className="p-2.5 bg-gray-800 border border-yellow-500/60 rounded text-white w-full outline-none focus:border-yellow-400"
                        placeholder="Product Name"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Article No</label>
                        <input
                          value={editingProduct.article_no || ''}
                          onChange={(e) => setEditingProduct({ ...editingProduct, article_no: e.target.value })}
                          className="p-2.5 bg-gray-800 border border-yellow-500/60 rounded text-white w-full outline-none focus:border-yellow-400"
                          placeholder="Article No"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Subcategory</label>
                        <select
                          value={editingProduct.subcategory}
                          onChange={(e) => setEditingProduct({ ...editingProduct, subcategory: e.target.value })}
                          className="p-2.5 bg-gray-800 border border-yellow-500/60 rounded text-white w-full outline-none focus:border-yellow-400"
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
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Description</label>
                      <textarea
                        value={editingProduct.description}
                        onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                        className="p-2.5 bg-gray-800 border border-yellow-500/60 rounded text-white w-full outline-none focus:border-yellow-400"
                        placeholder="Description"
                        rows={3}
                      />
                    </div>

                    {/* EDIT MAIN IMAGE */}
                    <div className="p-3 bg-gray-800/80 rounded-lg border border-yellow-500/40 space-y-2">
                      <div className="flex justify-between items-center flex-wrap gap-2">
                        <span className="text-xs font-semibold text-yellow-300 uppercase">Main Product Image</span>
                        <div className="flex gap-4 text-xs text-white">
                          <label className="flex items-center gap-1.5 cursor-pointer">
                            <input
                              type="radio"
                              value="file"
                              checked={editingProductImageType === "file"}
                              onChange={() => setEditingProductImageType("file")}
                              className="accent-yellow-400"
                            /> Upload New File
                          </label>
                          <label className="flex items-center gap-1.5 cursor-pointer">
                            <input
                              type="radio"
                              value="url"
                              checked={editingProductImageType === "url"}
                              onChange={() => setEditingProductImageType("url")}
                              className="accent-yellow-400"
                            /> Use Image URL
                          </label>
                        </div>
                      </div>

                      {editingProductImageType === "file" ? (
                        <div className="space-y-2">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setEditingProductFile(e.target.files[0] || null)}
                            className="p-2 bg-gray-900 border border-yellow-500/50 rounded text-sm text-gray-300 w-full file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-yellow-500 file:text-black hover:file:bg-yellow-400 cursor-pointer"
                          />
                          {editingProductFile && (
                            <div className="flex items-center gap-3 bg-gray-900 p-2 rounded border border-yellow-500/40">
                              <img
                                src={URL.createObjectURL(editingProductFile)}
                                alt="New Main Preview"
                                className="w-14 h-14 object-cover rounded border border-yellow-500"
                              />
                              <div className="text-xs text-gray-300 flex-1 min-w-0">
                                <p className="font-semibold text-white truncate">{editingProductFile.name}</p>
                                <p className="text-gray-400">{(editingProductFile.size / 1024).toFixed(1)} KB (New)</p>
                              </div>
                              <button
                                type="button"
                                onClick={() => setEditingProductFile(null)}
                                className="text-red-400 hover:text-red-300 text-xs px-2 py-1 bg-red-950/40 rounded border border-red-800"
                              >
                                Cancel New
                              </button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <input
                          value={editingProductImageUrl}
                          onChange={(e) => setEditingProductImageUrl(e.target.value)}
                          placeholder="Enter New Image URL"
                          className="p-2 bg-gray-900 border border-yellow-500/50 rounded text-sm text-white w-full outline-none focus:border-yellow-400"
                        />
                      )}
                    </div>

                    {/* EDIT ADDITIONAL / GALLERY IMAGES */}
                    <div className="p-4 bg-gray-800/80 rounded-lg border border-yellow-500/40 space-y-3">
                      <div>
                        <h4 className="text-yellow-300 font-semibold text-sm">
                          Additional Gallery Images
                        </h4>
                        <p className="text-xs text-gray-400">
                          Manage existing images or upload new ones directly from your device.
                        </p>
                      </div>

                      {/* Currently Saved Other Images */}
                      {editingOtherImages.length > 0 && (
                        <div>
                          <p className="text-xs text-gray-300 font-medium mb-1.5">
                            Current Saved Images ({editingOtherImages.length}):
                          </p>
                          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                            {editingOtherImages.map((img, index) => (
                              <div
                                key={index}
                                className="relative group rounded-lg overflow-hidden border border-yellow-500/50 bg-black aspect-square shadow"
                              >
                                <img
                                  src={img}
                                  alt={`Image ${index + 1}`}
                                  className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2">
                                  <button
                                    type="button"
                                    onClick={() => handleEditRemoveExistingImage(index)}
                                    className="bg-red-600 hover:bg-red-700 text-white rounded-full p-1.5 shadow transition"
                                    title="Delete from product"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Direct Upload for New Images */}
                      <label className="border-2 border-dashed border-yellow-500/60 hover:border-yellow-400 bg-gray-900/60 hover:bg-gray-900 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer transition text-center group">
                        <Upload className="w-6 h-6 text-yellow-400 group-hover:scale-110 transition-transform mb-1" />
                        <span className="text-xs font-semibold text-white">
                          Click to upload new additional images directly
                        </span>
                        <span className="text-[11px] text-gray-400 mt-0.5">
                          Multiple files supported (will be uploaded when saving)
                        </span>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleEditAddOtherFiles}
                          className="hidden"
                        />
                      </label>

                      {/* Newly Staged Files Previews for Edit */}
                      {editingOtherImageFiles.length > 0 && (
                        <div className="space-y-1.5">
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-yellow-400 font-semibold">
                              New Images Staged for Upload ({editingOtherImageFiles.length}):
                            </span>
                            <button
                              type="button"
                              onClick={() => setEditingOtherImageFiles([])}
                              className="text-red-400 hover:text-red-300 underline"
                            >
                              Clear staged
                            </button>
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                            {editingOtherImageFiles.map((file, index) => (
                              <div
                                key={`${file.name}-${index}`}
                                className="relative group rounded-lg overflow-hidden border border-green-500/60 bg-black aspect-square shadow"
                              >
                                <img
                                  src={URL.createObjectURL(file)}
                                  alt={file.name}
                                  className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-1.5">
                                  <button
                                    type="button"
                                    onClick={() => handleEditRemoveOtherFile(index)}
                                    className="self-end bg-red-600 hover:bg-red-700 text-white rounded-full p-1 shadow"
                                    title="Remove"
                                  >
                                    <X className="w-3.5 h-3.5" />
                                  </button>
                                  <span className="text-[10px] text-green-300 truncate bg-black/80 px-1 rounded">
                                    New: {file.name}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Optional Add by URL */}
                      <div className="pt-2 border-t border-gray-700/60">
                        <button
                          type="button"
                          onClick={() => setEditingOtherImages([...editingOtherImages, ""])}
                          className="bg-gray-700 hover:bg-gray-600 px-2.5 py-1 text-xs text-white rounded flex items-center gap-1 transition mb-2"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add URL directly
                        </button>

                        {editingOtherImages.map((img, index) => (
                          <div key={index} className="flex gap-2 mb-2">
                            <input
                              value={img}
                              onChange={(e) => {
                                const updated = [...editingOtherImages];
                                updated[index] = e.target.value;
                                setEditingOtherImages(updated);
                              }}
                              placeholder="https://image-url.com"
                              className="p-1.5 text-xs flex-1 bg-gray-900 border border-yellow-500/60 rounded text-white"
                            />
                            <button
                              type="button"
                              onClick={() => handleEditRemoveExistingImage(index)}
                              className="bg-red-600 hover:bg-red-700 px-2.5 text-white rounded text-xs flex items-center transition"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={() =>
                          handleUpdateProduct({
                            imageType: editingProductImageType,
                            file: editingProductFile,
                            url: editingProductImageUrl,
                            otherImages: editingOtherImages,
                            newOtherImageFiles: editingOtherImageFiles,
                          })
                        }
                        className="bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-2 rounded-lg font-bold transition shadow"
                      >
                        Save Changes
                      </button>
                      <button
                        onClick={() => {
                          setEditingProduct(null);
                          setEditingProductFile(null);
                          setEditingOtherImages([]);
                          setEditingOtherImageFiles([]);
                          setEditingProductImageUrl("");
                          setEditingProductImageType("file");
                        }}
                        className="bg-gray-700 hover:bg-gray-600 text-white px-5 py-2 rounded-lg font-medium transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-3">
                          <h3 className="text-xl font-bold text-yellow-400">{prod.name}</h3>
                          {prod.article_no && (
                            <span className="text-xs bg-yellow-500/20 text-yellow-300 border border-yellow-500/40 px-2 py-0.5 rounded font-mono">
                              {prod.article_no}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-yellow-500/80 font-medium">Subcategory: {prod.subcategory}</p>
                        <p className="text-sm text-gray-300 mt-2 leading-relaxed">{prod.description}</p>
                      </div>

                      <div className="flex gap-2 self-start">
                        <button
                          onClick={() => {
                            setEditingProduct(prod);
                            setEditingProductImageUrl("");
                            setEditingProductFile(null);
                            setEditingOtherImages(prod.other_images || []);
                            setEditingOtherImageFiles([]);
                          }}
                          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(prod)}
                          className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white text-xs font-semibold rounded transition"
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    {/* Product Images Showcase */}
                    <div className="mt-4 pt-4 border-t border-gray-800">
                      <p className="text-xs text-gray-400 mb-2 font-semibold">Images:</p>
                      <div className="flex flex-wrap gap-3 items-center">
                        {prod.img_src && (
                          <div className="relative group">
                            <img
                              src={prod.img_src}
                              alt={prod.name}
                              className="w-24 h-24 object-cover rounded-lg border-2 border-yellow-500 shadow"
                            />
                            <span className="absolute bottom-1 left-1 bg-yellow-500 text-black text-[10px] font-bold px-1 rounded">
                              Main
                            </span>
                          </div>
                        )}

                        {prod.other_images?.map((img, i) => (
                          <img
                            key={i}
                            src={img}
                            alt={`Gallery ${i + 1}`}
                            className="w-20 h-20 object-cover rounded-lg border border-gray-700 hover:border-yellow-500 transition cursor-pointer"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>
      </section>
    </>
  );
}
