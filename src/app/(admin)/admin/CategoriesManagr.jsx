'use client';

import React from 'react';

export default function CategoriesManager({
  categories,
  newCategory,
  newSubcategories,
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
        <h2 className="text-xl font-semibold text-yellow-300 mb-4">Manage Categories</h2>
        {categories.map((cat) => (
          <div key={cat.id} className="mb-4 border border-yellow-500 p-4">
            {editingCategory?.id === cat.id ? (
              <>
                <input
                  value={editingCategory.title}
                  onChange={(e) =>
                    setEditingCategory({ ...editingCategory, title: e.target.value })
                  }
                  className="p-2 bg-gray-800 border border-yellow-500 w-full mb-2"
                />
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
                <button
                  onClick={handleUpdateCategory}
                  className="bg-green-500 px-4 py-1 text-black mr-2"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingCategory(null)}
                  className="bg-red-600 px-4 py-1"
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
                <button
                  onClick={() => setEditingCategory(cat)}
                  className="text-sm text-blue-400 underline mr-4 mt-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteCategory(cat.id)}
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
