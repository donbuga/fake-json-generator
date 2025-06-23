import React, { useState, useEffect } from "react";
import { faker } from "@faker-js/faker";
import { generateChileanPhone, generateRut } from "./utils/commons";
import CopyableJson from "./components/CopyableJson";

type AttributeType =
  | "string"
  | "number"
  | "boolean"
  | "email"
  | "url"
  | "date"
  | "uuid"
  | "color"
  | "ipAddress"
  | "paragraph"
  | "RUT"
  | "firstName"
  | "lastName"
  | "chileanPhone"
  | "random9digits"
  | "testEmail"

interface Attribute {
  name: string;
  type: AttributeType;
}

const App: React.FC = () => {
  const [attributes, setAttributes] = useState<Attribute[]>([
    { name: "firstName", type: "string" },
    { name: "lastName", type: "string" },
    { name: "phoneNumber", type: "string" },
    { name: "email", type: "email" },
    { name: "country", type: "string" },
    { name: "random9digits", type: "random9digits" },
    { name: "testEmail", type: "testEmail" },
  ]);

  const [generatedData, setGeneratedData] = useState<object[]>([]);
  const [newAttribute, setNewAttribute] = useState<Attribute>({
    name: "",
    type: "string",
  });

  const [numElements, setNumElements] = useState<number>(1);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Persistencia del modo oscuro
  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode");
    if (savedTheme === "true") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  };

  const generateData = () => {
    const newData = Array.from({ length: numElements }, () =>
      attributes.reduce((acc, attr) => {
        if (attr.name in standardAttributes) {
          acc[attr.name] = standardAttributes[attr.name]();
        } else {
          switch (attr.type) {
            case "string":
              acc[attr.name] = faker.word.words();
              break;
            case "number":
              acc[attr.name] = faker.number.int();
              break;
            case "boolean":
              acc[attr.name] = faker.datatype.boolean();
              break;
            case "RUT":
              acc[attr.name] = generateRut();
              break;
            case "firstName":
              acc[attr.name] = faker.person.firstName();
              break;
            case "lastName":
              acc[attr.name] = faker.person.lastName();
              break;
            case "email":
              acc[attr.name] = faker.internet.email();
              break;
            case "url":
              acc[attr.name] = faker.internet.url();
              break;
            case "date":
              acc[attr.name] = faker.date.recent().toISOString();
              break;
            case "uuid":
              acc[attr.name] = faker.string.uuid();
              break;
            case "color":
              acc[attr.name] = faker.color.rgb();
              break;
            case "ipAddress":
              acc[attr.name] = faker.internet.ipv4();
              break;
            case "paragraph":
              acc[attr.name] = faker.lorem.paragraph();
              break;
            case "chileanPhone":  
              acc[attr.name] = generateChileanPhone();
              break;
            case "random9digits":  
              acc[attr.name] = faker.number.int({ min: 100000000, max: 999999999 });
              break;
            case "testEmail":  
              acc[attr.name]  = faker.number.int({ min: 10000, max: 999999999 }).toString() + "@mailinator.com";
              break;
            default:
              acc[attr.name] = null;
          }
        }
        return acc;
      }, {} as Record<string, any>)
    );
    setGeneratedData(newData);
  };

  const handleAddAttribute = () => {
    if (
      newAttribute.name.trim() &&
      !attributes.find((attr) => attr.name === newAttribute.name)
    ) {
      setAttributes([...attributes, newAttribute]);
      setNewAttribute({ name: "", type: "string" });
    }
  };

  const handleDeleteAttribute = (name: string) => {
    setAttributes(attributes.filter((attr) => attr.name !== name));
  };

  const standardAttributes: Record<string, () => any> = {
    firstName: faker.person.firstName,
    lastName: faker.person.lastName,
    phoneNumber: faker.phone.number,
    email: faker.internet.email,
    country: faker.location.country,
  };

  const typeOptions = [
    { label: "String", value: "string" },
    { label: "Number", value: "number" },
    { label: "Boolean", value: "boolean" },
    { label: "Email", value: "email" },
    { label: "URL", value: "url" },
    { label: "Date", value: "date" },
    { label: "UUID", value: "uuid" },
    { label: "Color", value: "color" },
    { label: "IP Address", value: "ipAddress" },
    { label: "Paragraph", value: "paragraph" },
    { label: "-RUT chileno", value: "RUT" },
    { label: "-Teléfono chileno", value: "chileanPhone" },
    { label: "-9d random", value: "random9digits" },
    { label: "-Test email", value: "testEmail" },
  ];

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "dark" : ""
      } bg-gray-100 dark:bg-gray-900 transition-colors`}
    >
      {/* Barra superior */}
      <header className="flex justify-between items-center px-4 py-2 bg-white dark:bg-gray-800 shadow-md">
        <h1 className="text-xl font-bold text-gray-800 dark:text-gray-200">
          Fake JSON Generator
        </h1>
        <button
          onClick={toggleDarkMode}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-200 dark:bg-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          {darkMode ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m8.485-9H21m-16 0H3m15.364-6.364l-.707-.707M6.343 18.364l-.707-.707m13.121 0l-.707.707M6.343 5.636l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"
                />
              </svg>
              Light Mode
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
                />
              </svg>
              Dark Mode
            </>
          )}
        </button>
      </header>

      {/* Contenido principal */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Formulario */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-md transition-colors">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Add Attribute
            </h2>
            <div className="mt-4">
              <input
                type="text"
                placeholder="Attribute Name"
                value={newAttribute.name}
                onChange={(e) =>
                  setNewAttribute({ ...newAttribute, name: e.target.value })
                }
                className="w-full px-3 py-2 mb-2 border rounded-md dark:bg-gray-700 dark:text-gray-300"
              />
              <select
                value={newAttribute.type}
                onChange={(e) =>
                  setNewAttribute({
                    ...newAttribute,
                    type: e.target.value as AttributeType,
                  })
                }
                className="w-full px-3 py-2 mb-2 border rounded-md dark:bg-gray-700 dark:text-gray-300"
              >
                {typeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <button
                onClick={handleAddAttribute}
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
              >
                Add Attribute
              </button>
            </div>
            <div className="mt-4">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Attributes
              </h2>
              <ul>
                {attributes.map((attr) => (
                  <li
                    key={attr.name}
                    className="flex justify-between items-center py-1"
                  >
                    <span className="text-gray-700 dark:text-gray-300">
                      {attr.name} ({attr.type})
                    </span>
                    <button
                      onClick={() => handleDeleteAttribute(attr.name)}
                      className="text-red-500 hover:text-red-600 transition"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Configuración y JSON */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-md transition-colors">
            <div>
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Number of JSON Elements
              </h2>
              <input
                type="number"
                value={numElements}
                min={1}
                max={20000}
                onChange={(e) => {
                  const value = Math.min(Number(e.target.value), 20000); // Limita el valor a 50,000
                  setNumElements(value);
                }}
                className="w-full px-3 py-2 mt-2 border rounded-md dark:bg-gray-700 dark:text-gray-300"
              />
            </div>
            <button
              onClick={generateData}
              className="w-full mt-4 bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
            >
              Generate JSON
            </button>
      
            <CopyableJson data={generatedData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
