"use client";

export default function PortfolioManager({
  portfolio,
  portfolioFile,
  setPortfolioFile,
  editingPortfolio,
  setEditingPortfolio,
  handleAddPortfolio,
  handleUpdatePortfolio,
  handleDeletePortfolio,
})


{

  

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-yellow-400">
        {editingPortfolio ? 'Edit Video' : 'Add Video'}
      </h2>

      <input
        type="file"
        accept="video/*"
        onChange={(e) => setPortfolioFile(e.target.files[0])}
        className="block"
      />

      {editingPortfolio ? (
        <button
          onClick={handleUpdatePortfolio}
          className="px-4 py-2 bg-yellow-500 text-black rounded"
        >
          Update Video
        </button>
      ) : (
        <button
          onClick={handleAddPortfolio}
          className="px-4 py-2 bg-green-600 rounded"
        >
          Add Video
        </button>
      )}

      <div className="grid grid-cols-2 gap-6 pt-6">
        {portfolio.map((item) => (
          <div key={item.id} className="bg-gray-800 p-4 rounded">
         <div className="aspect-square w-full overflow-hidden rounded mb-3 bg-black">
  <video
    src={item.url}
    controls
    className="w-full h-full object-cover"
  />
</div>


            <div className="flex justify-between">
              <button
                onClick={() => setEditingPortfolio(item)}
                className="text-yellow-400 text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeletePortfolio(item)}
                className="text-red-500 text-sm"
              >
                Delete
              </button>


              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
