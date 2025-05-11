export default function PrivacyPolicy() {
  return (
    <section className="bg-white py-16 px-6 md:px-12 lg:px-20">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
        <p className="text-gray-600 mb-4">
          At Gearters Sports, we take your privacy seriously and are committed to protecting your personal information. 
          This Privacy Policy explains how we collect, use, and safeguard your data when you interact with our website, 
          purchase our gloves and other sports gear, or use our services. By using our platform, you agree to the practices described in this policy.
        </p>

        {/* Information Collection */}
        <h2 className="text-2xl font-semibold text-gray-800 mt-8">What Information Do We Collect?</h2>
        <p className="text-gray-600 mt-2">
          We collect personal information that you provide directly, such as your name, email address, shipping address, and payment details. 
          Additionally, we automatically collect data like your IP address, device information, and browsing behavior through 
          cookies and similar technologies to enhance your shopping experience.
        </p>

        {/* Use of Information */}
        <h2 className="text-2xl font-semibold text-gray-800 mt-8">How Do We Use Your Information?</h2>
        <ul className="list-disc list-inside text-gray-600 mt-2 space-y-2">
          <li>To process orders and deliver high-quality gloves and sports gear.</li>
          <li>To provide customer support and respond to inquiries.</li>
          <li>To personalize your shopping experience and recommend products suited to your needs.</li>
          <li>To send order updates, promotions, and newsletters (with your consent).</li>
          <li>To analyze customer preferences and improve our product offerings.</li>
          <li>To detect and prevent fraudulent transactions or unauthorized activities.</li>
        </ul>

        {/* Sharing of Information */}
        <h2 className="text-2xl font-semibold text-gray-800 mt-8">How Do We Share Your Information?</h2>
        <ul className="list-disc list-inside text-gray-600 mt-2 space-y-2">
          <li>With trusted third-party service providers who assist in payment processing, order fulfillment, and logistics.</li>
          <li>With other users when you post product reviews or interact publicly on our platform.</li>
          <li>With business partners or distributors to improve product accessibility and customer service.</li>
          <li>With legal authorities if required to comply with laws or to protect our rights.</li>
        </ul>

        {/* Data Protection */}
        <h2 className="text-2xl font-semibold text-gray-800 mt-8">How Do We Protect Your Information?</h2>
        <p className="text-gray-600 mt-2">
          We implement security measures such as encryption, firewalls, and secure payment gateways to safeguard your personal data. 
          However, no method of transmission or storage is completely secure. Customers are advised to keep their account credentials 
          confidential and notify us immediately if they suspect unauthorized access.
        </p>

        {/* Data Storage */}
        <h2 className="text-2xl font-semibold text-gray-800 mt-8">Where Do We Store Your Information?</h2>
        <p className="text-gray-600 mt-2">
          Your data may be stored and processed in various locations worldwide, including countries outside your jurisdiction. 
          By purchasing from us, you consent to the transfer and storage of your information across borders.
        </p>

        {/* Your Rights */}
        <h2 className="text-2xl font-semibold text-gray-800 mt-8">Your Rights and Choices</h2>
        <ul className="list-disc list-inside text-gray-600 mt-2 space-y-2">
          <li>You can access, update, or delete your personal information at any time.</li>
          <li>You may opt out of receiving marketing emails by using the unsubscribe link.</li>
          <li>You can manage or disable cookies through your browser settings.</li>
          <li>You have the right to request a copy of your data or its deletion, subject to legal requirements.</li>
        </ul>

        {/* Policy Updates */}
        <h2 className="text-2xl font-semibold text-gray-800 mt-8">Updates to This Policy</h2>
        <p className="text-gray-600 mt-2">
          We may update this Privacy Policy periodically to reflect changes in our business or legal requirements. 
          Any updates will be posted on this page, and your continued use of our services constitutes acceptance of the revised policy.
        </p>

        {/* Contact Information */}
        <h2 className="text-2xl font-semibold text-gray-800 mt-8">Contact Us</h2>
        <p className="text-gray-600 mt-2">
          If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
          <br />
          <a href="mailto:support@gearterssports.com" className="text-blue-500 hover:underline">
            support@gearterssports.com
          </a>
        </p>
      </div>
    </section>
  );
}
