import Image from 'next/image';

export default function About() {
  return (
    <section className="bg-gray-100 py-16 px-6 md:px-12 lg:px-20">
      <div className="container mx-auto">
        {/* Section Heading */}
        <h1 className="text-4xl font-bold text-gray-900 mb-6">About Us</h1>

        {/* Our Purpose */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Purpose</h2>
          <p className="text-gray-700 leading-relaxed">
            Our purpose is to empower people to live, learn, and connect in harmony with themselves, others, and the environment. We do this by developing solutions for the common good.
          </p>
        </section>

        {/* Vision & Mission */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Vision & Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            We envision a future where technology empowers communities to thrive. That’s why we develop innovative B2C software solutions that tackle real-world challenges and create a positive social impact. We believe in technology that’s ethical, inclusive, and designed with people in mind.
          </p>
        </section>

        {/* Our Story */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Story</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            ProgrUmar started with a simple idea: create technology that serves people, not the other way around. Existing solutions often felt impersonal, and we saw a gap in market solutions that addressed the specific needs of diverse communities. We were driven to fill this gap by offering accessible and user-friendly tools that empower individuals and foster a sense of connection.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            We also saw an opportunity to make a difference in the world, we decided to take action and start our journey, ProgrUmar. We wanted to create solutions for humanity, software that would empower, enhance, and enrich the lives of the people and the world.
          </p>
          <p className="text-gray-700 leading-relaxed">
            We gathered a team of talented and like-minded people who shared our vision and values. Together, we embarked on a mission to create software for humanity, software that would empower, enhance, and enrich the lives of the people and the world.
          </p>
        </section>

        {/* Values in Action */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Values in Action</h2>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2">
            <li><strong>Empowerment:</strong> We design technology that empowers individuals and communities to live and connect meaningfully.</li>
            <li><strong>Sustainability:</strong> We prioritize eco-friendly solutions that contribute to a healthier planet.</li>
            <li><strong>Safety:</strong> We take safety seriously, with features that provide peace of mind for all users, especially families.</li>
            <li><strong>Inclusion:</strong> We believe everyone deserves access to technology that benefits their lives, regardless of background.</li>
          </ul>
        </section>

        {/* Team */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Team</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            We’re a passionate team of developers, designers, and innovators dedicated to building technology for good. Our diverse backgrounds and expertise fuel our drive to create impactful solutions.
          </p>
        
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Join Us in Our Journey</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            We are proud of our story, and we are excited about our future. We believe that technology can be a force for good, and that we can make a positive change in the world with our software. We are ProgrUmar, and we invite you to join us in our journey.
          </p>
          <a href="/contact" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-300">
            Contact Us
          </a>
        </section>
      </div>
    </section>
  );
}
