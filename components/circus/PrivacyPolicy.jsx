import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold mb-4">Privacy Policy for Circus</h1>
      <p className="text-gray-500 mb-4">Last updated: August 1, 2023</p>
      <p className="mb-4">
        We are committed to respecting your privacy. This Privacy Policy describes how we collect, use, and disclose your personal information when you use our app "Circus."
      </p>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Information We Collect</h2>
        <ul className="list-disc list-inside pl-6">
          <li className="mb-2">Personal Information: We may collect information like your name, email address, and contact details when you register or interact with our app.</li>
          <li className="mb-2">Usage Information: We gather data about how you use our app, including pages visited, features used, and interactions.</li>
        </ul>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">How We Use Your Information</h2>
        <ul className="list-disc list-inside pl-6">
          <li className="mb-2">Provide Services: We use your information to deliver services, process transactions, and communicate with you.</li>
          <li className="mb-2">Personalization: We personalize your experience based on your preferences and usage.</li>
        </ul>
      </div>
      <p className="mb-4">
        We do not sell, trade, or rent your personal information to third parties.
      </p>
      <p className="mb-4">
        We take security seriously and use measures to protect your data.
      </p>
      <p>
        If you have any questions or concerns about our Privacy Policy, please contact us at <a href="mailto:contact@circusapp.com" className="text-orange-500 hover:underline">contact@circusapp.com</a>.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
