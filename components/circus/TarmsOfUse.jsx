import React from 'react';

const TermsOfUse = () => {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold mb-4">Terms of Use for Circus</h1>
      <p className="text-gray-500 mb-4">Last updated: August 1, 2023</p>
      <p className="mb-4">
        By using our app "Circus," you agree to the following terms:
      </p>
      <h2 className="text-xl font-semibold mb-2">Content</h2>
      <p className="mb-4">
        You are responsible for the content you create and share on our app. Do not post inappropriate, harmful, or copyrighted content.
      </p>
      <h2 className="text-xl font-semibold mb-2">User Conduct</h2>
      <p className="mb-4">
        You agree to use our app responsibly and not engage in activities that violate laws or infringe upon others' rights.
      </p>
      <h2 className="text-xl font-semibold mb-2">Intellectual Property</h2>
      <p className="mb-4">
        You retain ownership of the content you create. We have the right to use, reproduce, and distribute user-generated content within the app.
      </p>
      <h2 className="text-xl font-semibold mb-2">Disclaimers</h2>
      <p className="mb-4">
        Our app is provided "as is." We do not guarantee the accuracy or availability of content.
      </p>
      <h2 className="text-xl font-semibold mb-2">Limitation of Liability</h2>
      <p className="mb-4">
        We are not liable for any damages arising from the use of our app.
      </p>
      <h2 className="text-xl font-semibold mb-2">Changes to Terms</h2>
      <p className="mb-4">
        We may update these terms. Continued use of our app signifies acceptance of the updated terms.
      </p>
      <p>
        If you have any questions or concerns about our Terms of Use, please contact us at <a href="mailto:contact@circusapp.com" className="text-orange-500 hover:underline">contact@circusapp.com</a>.
      </p>
    </div>
  );
};

export default TermsOfUse;
