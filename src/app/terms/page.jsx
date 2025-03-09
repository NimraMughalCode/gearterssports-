import Head from "next/head";

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terms and Conditions | Gearterssports</title>
      </Head>

      <div className="bg-black text-white mx-auto px-16  py-12">
        <h1 className="text-4xl font-bold text-primary mb-6">Terms and Conditions</h1>

        <p className="text-gray-300 mb-4">
          Welcome to <span className="font-semibold">Gearterssports</span>! These Terms and Conditions outline the rules and regulations for using our website, products, and services.
          By accessing or using our platform, you agree to comply with these terms. If you disagree with any part of these terms, please refrain from using our services.
        </p>

        <h2 className="text-2xl font-semibold text-primary mt-6">1. Acceptance of Terms</h2>
        <p className="text-gray-300 mb-4">
          By accessing or using Gearterssports, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree, please discontinue use.
        </p>

        <h2 className="text-2xl font-semibold text-primary mt-6">2. User Responsibilities</h2>
        <p className="text-gray-300 mb-4">
          You agree to use our services only for lawful purposes. You must not engage in any activities that could harm the platform, interfere with other users, or violate any applicable laws.
        </p>

        <h2 className="text-2xl font-semibold text-primary mt-6">3. Intellectual Property</h2>
        <p className="text-gray-300 mb-4">
          All content on Gearterssports, including text, images, logos, and software, is the property of Gearterssports and is protected by copyright and trademark laws. Unauthorized use or reproduction is strictly prohibited.
        </p>

        <h2 className="text-2xl font-semibold text-primary mt-6">4. Privacy Policy</h2>
        <p className="text-gray-300 mb-4">
          Your privacy is important to us. Please review our <a href="/privacy" className="text-primary text-primary underline">Privacy Policy</a> to understand how we collect, use, and protect your data.
        </p>

        <h2 className="text-2xl font-semibold text-primary mt-6">5. Limitation of Liability</h2>
        <p className="text-gray-300 mb-4">
          Gearterssports is not liable for any damages or losses resulting from your use of our website or services. We provide our services "as is" without any warranties.
        </p>

        <h2 className="text-2xl font-semibold text-primary mt-6">6. Changes to Terms</h2>
        <p className="text-gray-300 mb-4">
          Gearterssports reserves the right to modify these terms at any time. It is your responsibility to check this page periodically for updates.
        </p>

        <h2 className="text-2xl font-semibold text-primary mt-6">7. Contact Us</h2>
        <p className="text-gray-300 mb-4">
          If you have any questions regarding these Terms and Conditions, please contact us at <a href="mailto:support@gearterssports.com" className="text-primary hover:text-primary underline">support@gearterssports.com</a>.
        </p>
      </div>
    </>
  );
}
