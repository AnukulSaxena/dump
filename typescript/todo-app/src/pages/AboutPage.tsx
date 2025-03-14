import React from 'react';

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">About This Todo App</h1>
      <div className="prose prose-invert max-w-none">
        <p className="mb-4">
          This Todo application was built using React, TypeScript, and Tailwind CSS. 
          It allows users to manage their daily tasks efficiently.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-4">Features</h2>
        <ul className="list-disc pl-6 mb-6">
          <li>Create, read, update, and delete todos</li>
          <li>Mark todos as complete</li>
          <li>Filter todos by status</li>
          <li>Responsive design for all devices</li>
          <li>Dark mode support</li>
        </ul>
        <h2 className="text-2xl font-semibold mt-6 mb-4">Technologies Used</h2>
        <ul className="list-disc pl-6 mb-6">
          <li>React</li>
          <li>TypeScript</li>
          <li>Tailwind CSS</li>
          <li>React Router</li>
          <li>React Query</li>
        </ul>
      </div>
    </div>
  );
};

export default AboutPage; 