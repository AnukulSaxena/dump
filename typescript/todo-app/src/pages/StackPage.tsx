import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { useLocation } from 'react-router-dom';

interface StackTrace {
  id: string;
  title: string;
  content: string;
  timestamp: string;
}

const initialStackTraces: StackTrace[] = [
  {
    id: '1',
    title: 'React Router Integration',
    content: 'Error: Cannot find module \'react-router-dom\'\n  at Function.Module._resolveFilename (node:internal/modules/cjs/loader:1075:15)\n  at Function.Module._load (node:internal/modules/cjs/loader:920:27)\n  at Module.require (node:internal/modules/cjs/loader:1141:19)\n  at require (node:internal/modules/helpers:110:18)\n  at Object.<anonymous> (/app/src/main.tsx:3:1)',
    timestamp: '2023-07-15 14:32:45'
  },
  {
    id: '2',
    title: 'Context API Implementation',
    content: 'TypeError: Cannot read properties of undefined (reading \'id\')\n  at HomePage (/app/src/pages/HomePage.tsx:12:29)\n  at renderWithHooks (/app/node_modules/react-dom/cjs/react-dom.development.js:16305:18)\n  at mountIndeterminateComponent (/app/node_modules/react-dom/cjs/react-dom.development.js:20074:13)',
    timestamp: '2023-07-16 09:15:22'
  },
  {
    id: '3',
    title: 'Tailwind Configuration',
    content: 'Error: PostCSS plugin tailwindcss requires PostCSS 8.\n  at Object.<anonymous> (/app/node_modules/tailwindcss/lib/index.js:15:23)\n  at Module._compile (node:internal/modules/cjs/loader:1256:14)\n  at Module._extensions..js (node:internal/modules/cjs/loader:1310:10)',
    timestamp: '2023-07-17 11:45:33'
  }
];

const StackPage = () => {
  // Using simple state array instead of localStorage
  const [stackTraces, setStackTraces] = useState<StackTrace[]>(initialStackTraces);
  const [showForm, setShowForm] = useState(false);
  const location = useLocation();
  const formRef = useRef<HTMLDivElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);
  
  const [newStackTrace, setNewStackTrace] = useState<{title: string, content: string}>({
    title: '',
    content: ''
  });
  
  useEffect(() => {
    // Check if the URL has the showForm parameter
    const queryParams = new URLSearchParams(location.search);
    const shouldShowForm = queryParams.get('showForm') === 'true';
    
    if (shouldShowForm) {
      setShowForm(true);
      // Scroll to the form after a short delay to ensure the DOM is ready
      setTimeout(() => {
        if (formRef.current) {
          formRef.current.scrollIntoView({ behavior: 'smooth' });
          if (titleInputRef.current) {
            titleInputRef.current.focus();
          }
        }
      }, 100);
      
      // Clean up the URL without reloading the page
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
    }
  }, [location.search]);
  
  const handleAddStackTrace = () => {
    if (newStackTrace.title.trim() === '' || newStackTrace.content.trim() === '') {
      return;
    }
    
    const newTrace: StackTrace = {
      id: Date.now().toString(),
      title: newStackTrace.title,
      content: newStackTrace.content,
      timestamp: new Date().toLocaleString()
    };
    
    // Add new trace to the beginning of the array
    setStackTraces([newTrace, ...stackTraces]);
    setNewStackTrace({ title: '', content: '' });
    setShowForm(false);
  };
  
  const handleDeleteStackTrace = (id: string) => {
    setStackTraces(stackTraces.filter(trace => trace.id !== id));
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    if (!showForm) {
      setTimeout(() => {
        if (formRef.current) {
          formRef.current.scrollIntoView({ behavior: 'smooth' });
          if (titleInputRef.current) {
            titleInputRef.current.focus();
          }
        }
      }, 100);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Stack Traces</h1>
        <Button 
          onClick={toggleForm}
          className="px-4"
        >
          {showForm ? "Hide Form" : "Add Stack Trace"}
        </Button>
      </div>
      
      {/* Stack Trace Section */}
      <div className="mb-12">
        <div className="flex items-center mb-6">
          <h2 className="text-2xl font-semibold">Saved Traces ({stackTraces.length})</h2>
        </div>
        
        {/* Add New Stack Trace Form */}
        {showForm && (
          <div ref={formRef} className="bg-neutral-700 rounded-lg p-6 shadow-md mb-8 border-2 border-blue-500">
            <h3 className="text-xl font-medium mb-4">Add New Stack Trace</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="traceTitle" className="block text-sm font-medium mb-1">Title</label>
                <input
                  id="traceTitle"
                  ref={titleInputRef}
                  type="text"
                  className="w-full p-2 rounded-md bg-neutral-800 border border-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newStackTrace.title}
                  onChange={(e) => setNewStackTrace({...newStackTrace, title: e.target.value})}
                  placeholder="Enter stack trace title"
                />
              </div>
              <div>
                <label htmlFor="traceContent" className="block text-sm font-medium mb-1">Stack Trace Content</label>
                <textarea
                  id="traceContent"
                  rows={5}
                  className="w-full p-2 rounded-md bg-neutral-800 border border-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                  value={newStackTrace.content}
                  onChange={(e) => setNewStackTrace({...newStackTrace, content: e.target.value})}
                  placeholder="Paste your stack trace here"
                />
              </div>
              <div className="flex gap-3">
                <Button 
                  onClick={handleAddStackTrace}
                  className="flex-1"
                >
                  Add Stack Trace
                </Button>
                <Button 
                  onClick={() => setShowForm(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {/* Stack Traces List */}
        <div className="space-y-6">
          {stackTraces.length === 0 ? (
            <div className="bg-neutral-700 rounded-lg p-6 text-center">
              <p className="text-neutral-300">No stack traces yet. Add one above!</p>
            </div>
          ) : (
            stackTraces.map((trace) => (
              <div key={trace.id} className="bg-neutral-700 rounded-lg overflow-hidden shadow-md">
                <div className="bg-neutral-600 p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-lg">{trace.title}</h3>
                    <p className="text-xs text-neutral-300">{trace.timestamp}</p>
                  </div>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => handleDeleteStackTrace(trace.id)}
                  >
                    Delete
                  </Button>
                </div>
                <div className="p-4">
                  <pre className="bg-neutral-800 p-4 rounded-md overflow-x-auto text-sm font-mono whitespace-pre-wrap">
                    {trace.content}
                  </pre>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default StackPage; 