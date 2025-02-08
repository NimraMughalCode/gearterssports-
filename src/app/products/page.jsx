export default function Products() {
    return (
      <section className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-6">
        {/* Background Blur Effect */}
        <div className="absolute inset-0 bg-[url('https://source.unsplash.com/1600x900/?technology,design')] bg-cover bg-center opacity-30"></div>
  
        <div className="relative text-center">
          {/* Beautiful Title */}
          <h1 className="text-6xl font-extrabold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 drop-shadow-lg leading-[1.2] pb-2">
  Coming Soon
</h1>

  
          {/* Subtitle */}
          <p className="mt-4 text-lg text-gray-300 max-w-lg mx-auto">
            Our innovative products are in the works! Stay tuned for something amazing.
          </p>
  
          {/* Countdown Timer - Just for visual effect */}
          {/* <div className="mt-8 flex space-x-4">
            <div className="w-20 h-20 flex flex-col items-center justify-center bg-gray-800 rounded-lg shadow-lg">
              <span className="text-3xl font-bold">10</span>
              <span className="text-sm text-gray-400">Days</span>
            </div>
            <div className="w-20 h-20 flex flex-col items-center justify-center bg-gray-800 rounded-lg shadow-lg">
              <span className="text-3xl font-bold">14</span>
              <span className="text-sm text-gray-400">Hours</span>
            </div>
            <div className="w-20 h-20 flex flex-col items-center justify-center bg-gray-800 rounded-lg shadow-lg">
              <span className="text-3xl font-bold">38</span>
              <span className="text-sm text-gray-400">Mins</span>
            </div>
          </div> */}
  
          {/* Notify Me Button */}
          {/* <button className="mt-8 px-6 py-3 text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-80 transition-all duration-300 rounded-full shadow-lg">
            Notify Me
          </button> */}
        </div>
      </section>
    );
  }
  