import { Code, Smartphone, Globe } from "lucide-react"; // Importing icons

const servicesData = [
  {
    id: 1,
    title: "Software Development",
    description: "Building scalable, high-performance web and mobile applications.",
    icon: <Code size={48} className="mx-auto text-blue-600" />,
  },
  {
    id: 2,
    title: "Mobile Solutions",
    description: "Creating seamless mobile experiences to connect people and businesses.",
    icon: <Smartphone size={48} className="mx-auto text-blue-600" />,
  },
  {
    id: 3,
    title: "Digital Transformation",
    description: "Empowering companies with modern digital strategies and automation.",
    icon: <Globe size={48} className="mx-auto text-blue-600" />,
  },
];

export default function Services() {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6 text-center">
        {/* Section Heading */}
        <h2 className="text-4xl font-bold text-gray-900">Our Services</h2>
        <p className="mt-4 text-lg text-gray-600">
          We create innovative solutions to drive positive change in communities.
        </p>

        {/* Services Grid */}
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {servicesData.map((service) => (
            <div key={service.id} className="p-6 bg-gray-100 rounded-lg shadow-md">
              {service.icon}
              <h3 className="mt-4 text-2xl font-semibold text-gray-900">{service.title}</h3>
              <p className="mt-2 text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
