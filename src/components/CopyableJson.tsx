import React, { useState } from "react";
import { Copy } from "lucide-react"; // Importa el icono de copia

const CopyableJson: React.FC<{ data: object }> = ({ data }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Oculta el mensaje después de 2 segundos
  };

  return (
    <div className="relative bg-gray-100 dark:bg-gray-700 p-4 rounded-md shadow-md">
      {/* Botón de copia con animación */}
      <button
        onClick={copyToClipboard}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:hover:text-gray-300 transition"
      >
        <Copy className="w-5 h-5" />
      </button>

      {/* Mensaje de "Copiado" flotante */}
      {copied && (
        <span className="absolute top-2 right-10 bg-gray-800 text-white text-xs py-1 px-2 rounded-md animate-fade-in">
          Copiado!
        </span>
      )}

      {/* JSON Generado */}
      <pre className="mt-4 text-sm overflow-x-auto text-gray-800 dark:text-gray-200">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
};

export default CopyableJson;
