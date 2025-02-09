export default function PrivacyPolicy() {
  return (
    <section className="bg-white py-16 px-6 md:px-12 lg:px-20">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
        <p className="text-gray-600 mb-4">
          At ProgrUmar Solutions, we value your privacy and are committed to safeguarding your personal information. 
          This Privacy Policy outlines how we collect, use, and protect your data when you interact with our website, 
          products, and services. By using our platform, you agree to the practices described in this policy.
        </p>

        {/* Information Collection */}
        <h2 className="text-2xl font-semibold text-gray-800 mt-8">What Information Do We Collect?</h2>
        <p className="text-gray-600 mt-2">
          We collect information you provide directly, such as your name, email address, phone number, and payment details. 
          Additionally, we automatically gather data like your IP address, device information, and browsing behavior through 
          cookies and similar technologies.
        </p>

        {/* Use of Information */}
        <h2 className="text-2xl font-semibold text-gray-800 mt-8">How Do We Use Your Information?</h2>
        <ul className="list-disc list-inside text-gray-600 mt-2 space-y-2">
          <li>To deliver, maintain, and enhance our products and services.</li>
          <li>To personalize your experience and provide tailored content.</li>
          <li>To communicate with you, respond to inquiries, and provide support.</li>
          <li>To send updates, newsletters, and promotional materials (with your consent).</li>
          <li>To analyze usage patterns and improve our platform's performance.</li>
          <li>To detect and prevent fraudulent or unauthorized activities.</li>
        </ul>

        {/* Sharing of Information */}
        <h2 className="text-2xl font-semibold text-gray-800 mt-8">How Do We Share Your Information?</h2>
        <ul className="list-disc list-inside text-gray-600 mt-2 space-y-2">
          <li>With trusted third-party service providers who assist in operating our platform (e.g., hosting, payment processing).</li>
          <li>With other users when you engage in public interactions on our platform.</li>
          <li>With affiliates or partners for business purposes, provided they adhere to confidentiality agreements.</li>
          <li>With legal authorities if required to comply with applicable laws or protect our rights.</li>
        </ul>

        {/* Data Protection */}
        <h2 className="text-2xl font-semibold text-gray-800 mt-8">How Do We Protect Your Information?</h2>
        <p className="text-gray-600 mt-2">
          We implement robust security measures, including encryption, firewalls, and secure servers, to protect your data. 
          However, no method of transmission or storage is 100% secure. You are responsible for keeping your account credentials 
          confidential and notifying us immediately of any unauthorized access.
        </p>

        {/* Data Storage */}
        <h2 className="text-2xl font-semibold text-gray-800 mt-8">Where Do We Store Your Information?</h2>
        <p className="text-gray-600 mt-2">
          Your data may be stored and processed in various locations worldwide, including countries outside your jurisdiction. 
          By using our services, you consent to the transfer and storage of your information across borders.
        </p>

        {/* Your Rights */}
        <h2 className="text-2xl font-semibold text-gray-800 mt-8">Your Rights and Choices</h2>
        <ul className="list-disc list-inside text-gray-600 mt-2 space-y-2">
          <li>You can access, update, or delete your account information at any time.</li>
          <li>You may opt out of receiving marketing communications by using the unsubscribe link in our emails.</li>
          <li>You can manage or disable cookies through your browser settings.</li>
          <li>You have the right to request a copy of your data or its deletion, subject to legal requirements.</li>
        </ul>

        {/* Policy Updates */}
        <h2 className="text-2xl font-semibold text-gray-800 mt-8">Updates to This Policy</h2>
        <p className="text-gray-600 mt-2">
          We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. 
          Any updates will be posted on this page, and your continued use of our services constitutes acceptance of the revised policy.
        </p>

        {/* Contact Information */}
        <h2 className="text-2xl font-semibold text-gray-800 mt-8">Contact Us</h2>
        <p className="text-gray-600 mt-2">
          If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
          <br />
          <a href="mailto:progrumar@gmail.com" className="text-blue-500 hover:underline">
            progrumar@gmail.com
          </a>
        </p>
      </div>
    </section>
  );
}