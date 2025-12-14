'use client';

import React from 'react';

export default function CategoriesManager({
  categories,
  newCategory,
  newSubcategories,
  categoryImageFile,
  setCategoryImageFile,
  setNewCategory,
  setNewSubcategories,
  editingCategory,
  setEditingCategory,
  handleAddCategory,
  handleUpdateCategory,
  handleDeleteCategory,
}) {
  return (
    <>
      {/* Add Category */}
      <section>
        <h2 className="text-xl font-semibold text-yellow-300 mb-2">Add Category</h2>
        <div className="space-y-2">

          <input
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Category Title"
            className="p-2 w-full bg-gray-800 border border-yellow-500"
          />

          <input
            value={newSubcategories}
            onChange={(e) => setNewSubcategories(e.target.value)}
            placeholder="Subcategories (comma separated)"
            className="p-2 w-full bg-gray-800 border border-yellow-500"
          />

          {/* CATEGORY IMAGE UPLOAD */}
          <div className="space-y-1">
            <label className="text-sm text-gray-300">Category Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setCategoryImageFile(e.target.files[0])}
              className="p-2 bg-gray-800 border border-yellow-500 w-full"
            />
          </div>

          {/* PREVIEW */}
          {categoryImageFile && (
            <img
              src={URL.createObjectURL(categoryImageFile)}
              alt="Preview"
              className="w-24 h-24 object-cover border border-yellow-500"
            />
          )}

          <button
            onClick={handleAddCategory}
            className="bg-yellow-500 text-black px-4 py-2 font-semibold"
          >
            Add Category
          </button>
        </div>
      </section>

      {/* Edit/Delete Category */}
      <section>
        <h2 className="text-xl font-semibold text-yellow-300 mb-4">
          Manage Categories
        </h2>

        {categories.map((cat) => (
          <div key={cat.id} className="mb-4 border border-yellow-500 p-4">

            {editingCategory?.id === cat.id ? (
              <>
                {/* Title */}
                <input
                  value={editingCategory.title}
                  onChange={(e) =>
                    setEditingCategory({ ...editingCategory, title: e.target.value })
                  }
                  className="p-2 bg-gray-800 border border-yellow-500 w-full mb-2"
                />

                {/* Subcategories */}
                <input
                  value={editingCategory.subcategories.join(', ')}
                  onChange={(e) =>
                    setEditingCategory({
                      ...editingCategory,
                      subcategories: e.target.value.split(',').map((s) => s.trim()),
                    })
                  }
                  className="p-2 bg-gray-800 border border-yellow-500 w-full mb-2"
                />

                {/* CURRENT IMAGE */}
                {editingCategory.img_src && (
                  <div className="mb-2">
                    <p className="text-sm text-gray-300 mb-1">Current Image:</p>
                    <img
                      src={editingCategory.img_src}
                      alt="Category"
                      className="w-24 h-24 object-cover border border-yellow-500"
                    />
                  </div>
                )}

                {/* NEW IMAGE UPLOAD */}
                <div className="space-y-1">
                  <label className="text-sm text-gray-300">Replace Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setCategoryImageFile(e.target.files[0])}
                    className="p-2 w-full bg-gray-800 border border-yellow-500"
                  />
                </div>

                {/* NEW IMAGE PREVIEW */}
                {categoryImageFile && (
                  <img
                    src={URL.createObjectURL(categoryImageFile)}
                    alt="Preview"
                    className="w-24 h-24 object-cover border border-green-500 mt-2"
                  />
                )}

                <button
                  onClick={handleUpdateCategory}
                  className="bg-green-500 px-4 py-1 text-black mr-2 mt-3"
                >
                  Save
                </button>

                <button
                  onClick={() => {
                    setEditingCategory(null);
                    setCategoryImageFile(null);
                  }}
                  className="bg-red-600 px-4 py-1 mt-3"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <h3 className="text-lg font-bold text-yellow-400">{cat.title}</h3>
                <p className="text-sm text-gray-300">
                  Subcategories: {cat.subcategories.join(', ')}
                </p>

                {/* SHOW CATEGORY IMAGE */}
                {cat.img_src && (
                  <img
                    src={cat.img_src}
                    className="w-20 h-20 object-cover mt-2 border border-yellow-500"
                  />
                )}

                <button
                  onClick={() => setEditingCategory(cat)}
                  className="text-sm text-blue-400 underline mr-4 mt-2"
                >
                  Edit
                </button>

                <button
                 onClick={() => handleDeleteCategory(cat)}

                  className="text-sm text-red-400 underline mt-2"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
      </section>
    </>
  );
}
