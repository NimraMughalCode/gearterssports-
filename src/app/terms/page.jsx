import Head from "next/head";

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terms and Conditions | ProgrUmar</title>
      </Head>

      <div className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Terms and Conditions</h1>
        <p className="text-gray-700 mb-4">
          ProgrUmar provides you with a website, products, and services subject to the following terms and conditions. 
          By using our website, products, and services, you agree to these terms and conditions. Please read them carefully and contact us if you have any questions.
        </p>

        {/* Acceptance of Terms */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Acceptance of Terms</h2>
          <p className="text-gray-700">
            ProgrUmar grants you a limited, non-exclusive, non-transferable, and revocable license to access and use our website, products, and services for 
            your personal and non-commercial use. You cannot share, sell, or modify them without our permission, subject to your compliance with these terms 
            and conditions. You may not use our website, products, and services for any illegal, harmful, or unauthorized purpose, or in any manner that 
            violates these terms and conditions or any applicable law.
          </p>
        </section>

        {/* Modification of Terms */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Modification of Terms</h2>
          <p className="text-gray-700">
            ProgrUmar reserves the right to modify these terms and conditions at any time, without prior notice. Any changes will be effective immediately 
            upon posting on our website. Your continued use of our website, products, and services after any such changes constitutes your acceptance of 
            the modified terms and conditions. You are advised to review these terms and conditions periodically for any updates.
          </p>
        </section>

        {/* User Conduct */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">User Conduct</h2>
          <p className="text-gray-700">
            You are responsible for your conduct and content when using our website, products, and services. You agree to:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mt-2">
            <li>Provide accurate, complete, and current information when registering, creating a profile, or using our features and services.</li>
            <li>Respect the rights and interests of other users and third parties, and refrain from any abusive, harassing, threatening, defamatory, or offensive behavior or content.</li>
            <li>Comply with the rules and guidelines of any group, community, or platform that you join or interact with on our website, products, and services.</li>
            <li>Respect the intellectual property rights of others, and refrain from any infringing, plagiarizing, or misappropriating behavior or content.</li>
            <li>Use our website, products, and services only for lawful and legitimate purposes, and refrain from any illegal, harmful, or unauthorized behavior or content.</li>
            <li>Use our website, products, and services only in accordance with these terms and conditions and any applicable law.</li>
          </ul>
          <p className="text-gray-700 mt-4">
            ProgrUmar reserves the right to monitor, review, remove, or disable any content or access that violates these terms and conditions or any applicable 
            law, at its sole discretion and without prior notice.
          </p>
        </section>

        {/* Intellectual Property Rights */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Intellectual Property Rights</h2>
          <p className="text-gray-700">
            ProgrUmar owns and retains all rights, titles, and interests in and to its website, products, and services, including but not limited to its name, 
            logo, trademarks, design, content, features, and technology. You may not copy, reproduce, modify, distribute, or create derivative works of any 
            part of our website, products, and services without our explicit permission.
          </p>
        </section>
      </div>
    </>
  );
}
