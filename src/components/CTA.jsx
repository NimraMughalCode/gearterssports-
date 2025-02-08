import Link from "next/link";

export default function CTA() {
  return (
    <section className=" bg-gray-900 text-white py-16">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold">
          Ready to Bring Your Ideas to Life?
        </h2>
        <p className="mt-4 text-lg">
          Contact us today and let's build something amazing together!
        </p>
        <div className="mt-6">
          <Link
            href="/contact"
            className="bg-white text-gray-900 px-6 py-3 rounded-lg text-lg font-medium shadow-md hover:bg-gray-200"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
