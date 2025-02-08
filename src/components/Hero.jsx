import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative bg-gray-100 py-20 lg:py-32">
      <div className="container mx-auto px-6 flex flex-col-reverse lg:flex-row items-center gap-10">
        {/* Left Content */}
        <div className="text-center lg:text-left lg:w-1/2">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Empowering Tech for a Better Future
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            We build innovative software solutions to make an impact on 
            communities and the environment.
          </p>
          <div className="mt-6">
            <Link
              href="/contact"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium shadow-md hover:bg-blue-700"
            >
              Get in Touch
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="lg:w-1/2">
          <img
            src='https://c1.wallpaperflare.com/preview/655/355/690/programming-keyboard-computer-environment-syntax-program.jpg' // Change this to your actual image
            alt="Tech Innovation"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
