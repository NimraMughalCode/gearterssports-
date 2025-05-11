import Head from "next/head";

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terms and Conditions | Gearters Sports</title>
      </Head>

      <div className="bg-black text-white mx-auto px-16 py-12">
        <h1 className="text-4xl font-bold text-primary mb-6">Terms and Conditions</h1>

        <p className="text-gray-300 mb-4">
          Welcome to <span className="font-semibold">Gearters Sports</span>! These Terms and Conditions govern the use of our website, products, and services.
          By accessing or using our platform, you agree to comply with these terms. If you disagree with any part, please refrain from using our services.
        </p>

        <h2 className="text-2xl font-semibold text-primary mt-6">1. Acceptance of Terms</h2>
        <p className="text-gray-300 mb-4">
          By accessing Gearters Sports, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
        </p>

        <h2 className="text-2xl font-semibold text-primary mt-6">2. User Responsibilities</h2>
        <p className="text-gray-300 mb-4">
          You agree to use our website and services responsibly and in compliance with all applicable laws and regulations.
        </p>

        <h2 className="text-2xl font-semibold text-primary mt-6">3. Product Information and Orders</h2>
        <p className="text-gray-300 mb-4">
          We strive to provide accurate product descriptions, but we do not guarantee that all information is free from errors. We reserve the right to cancel or refuse orders at our discretion.
        </p>

        <h2 className="text-2xl font-semibold text-primary mt-6">4. Pricing and Payments</h2>
        <p className="text-gray-300 mb-4">
          Prices are subject to change without prior notice. Payments must be made in full before orders are processed and shipped.
        </p>

        <h2 className="text-2xl font-semibold text-primary mt-6">5. Intellectual Property</h2>
        <p className="text-gray-300 mb-4">
          All content on Gearters Sports, including logos, images, and text, is the property of Gearters Sports and may not be copied or used without permission.
        </p>

        <h2 className="text-2xl font-semibold text-primary mt-6">6. Returns and Refunds</h2>
        <p className="text-gray-300 mb-4">
          Our return policy allows returns within a specified period. Please review our return policy for more details.
        </p>

        <h2 className="text-2xl font-semibold text-primary mt-6">7. Limitation of Liability</h2>
        <p className="text-gray-300 mb-4">
          Gearters Sports is not responsible for any indirect, incidental, or consequential damages arising from the use of our products or services.
        </p>

        <h2 className="text-2xl font-semibold text-primary mt-6">8. Changes to Terms</h2>
        <p className="text-gray-300 mb-4">
          Gearters Sports reserves the right to update these terms at any time. Continued use of our services after changes are posted constitutes acceptance of the revised terms.
        </p>

        <h2 className="text-2xl font-semibold text-primary mt-6">9. Contact Us</h2>
        <p className="text-gray-300 mb-4">
          If you have any questions regarding these Terms and Conditions, please contact us at:
          <br />
          <a href="mailto:support@gearterssports.com" className="text-primary hover:text-primary underline">
            support@gearterssports.com
          </a>
        </p>
      </div>
    </>
  );
}
