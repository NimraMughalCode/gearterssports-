import Head from "next/head";

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terms and Conditions | ProgrUmar Solutions</title>
      </Head>

      <div className="bg-white container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Terms and Conditions</h1>
        <p className="text-gray-700 mb-4">
          Welcome to ProgrUmar Solutions! These terms and conditions outline the rules and regulations for using our website, products, and services. 
          By accessing or using our platform, you agree to comply with these terms. If you disagree with any part of these terms, please refrain from using our services.
        </p>

        {/* Acceptance of Terms */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Acceptance of Terms</h2>
          <p className="text-gray-700">
            By using ProgrUmar Solutions, you agree to be bound by these terms and conditions. We grant you a limited, non-exclusive, and non-transferable license 
            to access and use our website, products, and services for personal or business purposes, provided you comply with these terms. You may not use our 
            platform for any illegal, unethical, or unauthorized purposes, or in a way that violates these terms or applicable laws.
          </p>
        </section>

        {/* Changes to Terms */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Changes to Terms</h2>
          <p className="text-gray-700">
            ProgrUmar Solutions reserves the right to update or modify these terms and conditions at any time without prior notice. Any changes will be effective 
            immediately upon posting on our website. Your continued use of our platform after such changes constitutes your acceptance of the updated terms. 
            We encourage you to review this page periodically to stay informed.
          </p>
        </section>

        {/* User Responsibilities */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">User Responsibilities</h2>
          <p className="text-gray-700">
            When using ProgrUmar Solutions, you agree to the following:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mt-2">
            <li>Provide accurate and up-to-date information when creating an account or using our services.</li>
            <li>Respect the rights and privacy of other users and refrain from posting harmful, offensive, or inappropriate content.</li>
            <li>Comply with all applicable laws and regulations while using our platform.</li>
            <li>Do not attempt to disrupt or interfere with the security, functionality, or performance of our website, products, or services.</li>
            <li>Do not use our platform for any fraudulent, malicious, or unauthorized activities.</li>
          </ul>
          <p className="text-gray-700 mt-4">
            ProgrUmar Solutions reserves the right to suspend or terminate your access if you violate these terms or engage in any prohibited behavior.
          </p>
        </section>

        {/* Intellectual Property */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Intellectual Property</h2>
          <p className="text-gray-700">
            All content, features, and functionality on ProgrUmar Solutions, including but not limited to text, graphics, logos, icons, and software, are the 
            exclusive property of ProgrUmar Solutions or its licensors. You may not copy, reproduce, distribute, or create derivative works from any part of 
            our platform without our prior written consent.
          </p>
        </section>

        {/* Limitation of Liability */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Limitation of Liability</h2>
          <p className="text-gray-700">
            ProgrUmar Solutions and its affiliates shall not be liable for any indirect, incidental, or consequential damages arising from your use of our 
            website, products, or services. While we strive to provide accurate and reliable information, we do not guarantee the completeness, accuracy, or 
            reliability of any content on our platform.
          </p>
        </section>

        {/* Governing Law */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Governing Law</h2>
          <p className="text-gray-700">
            These terms and conditions are governed by and construed in accordance with the laws of Pakistan. Any disputes arising from your use 
            of ProgrUmar Solutions will be subject to the exclusive jurisdiction of the courts located in Pakistan.
          </p>
        </section>

        {/* Contact Us */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Contact Us</h2>
          <p className="text-gray-700">
            If you have any questions or concerns about these terms and conditions, please contact us at <a href="mailto:progrumar@gmail.com" className="text-blue-500">progrumar@gmail.com</a>.
          </p>
        </section>
      </div>
    </>
  );
}