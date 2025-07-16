import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="py-4 text-center text-sm text-gray-600 dark:text-gray-400">
      Otras utilidades{' '}
      <a
        href="https://donbuga.github.io/rutGenerator/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
      >
        RUT Generator
      </a>
    </footer>
  );
};

export default Footer;
