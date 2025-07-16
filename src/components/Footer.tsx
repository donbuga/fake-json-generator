import React from "react";

const Footer: React.FC = () => {
  return (
   <footer className="bg-gray-200 text-center py-4 mt-6">
     <p className="text-sm text-gray-600">Fake json generator</p>
     <p className="text-sm text-gray-600">
       Otras utilidades:{' '}
       <a
         href="https://donbuga.github.io/rutGenerator/"
         className="text-blue-500 hover:underline"
       >
         RUT Generator
       </a>
     </p>
   </footer>
  );
};

export default Footer;
