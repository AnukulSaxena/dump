import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { useLocation } from 'react-router-dom';
import { useStackItems, useCreateStackItem, useUpdateStackItem, useDeleteStackItem } from '@/hooks/useStackItems';
import { StackItem } from '@/todoService/stackService';
import { useMyContext } from '@/components/MyContext';

const StackPage = () => {
  const { id } = useMyContext();
  const owner = id || 'Default';
  
  // Use TanStack Query hooks
  const { data: stackTraces = [], isLoading, isError } = useStackItems(owner);
  const createStackItemMutation = useCreateStackItem();
  const updateStackItemMutation = useUpdateStackItem(owner);
  const deleteStackItemMutation = useDeleteStackItem(owner);
  
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<StackItem | null>(null);
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
    if (newStackTrace.title.trim() === '' || newStackTrace.content.trim() === '' || !owner) {
      return;
    }
    
    if (editingItem) {
      // Update existing stack item
      updateStackItemMutation.mutate({
        id: editingItem._id || '',
        updates: {
          title: newStackTrace.title,
          content: newStackTrace.content
        }
      }, {
        onSuccess: () => {
          setNewStackTrace({ title: '', content: '' });
          setShowForm(false);
          setEditingItem(null);
        }
      });
    } else {
      // Create new stack item
      createStackItemMutation.mutate({
        title: newStackTrace.title,
        content: newStackTrace.content,
        owner
      }, {
        onSuccess: () => {
          setNewStackTrace({ title: '', content: '' });
          setShowForm(false);
        }
      });
    }
  };
  
  const handleEditStackTrace = (trace: StackItem) => {
    setEditingItem(trace);
    setNewStackTrace({
      title: trace.title,
      content: trace.content
    });
    setShowForm(true);
    
    // Scroll to the form
    setTimeout(() => {
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: 'smooth' });
        if (titleInputRef.current) {
          titleInputRef.current.focus();
        }
      }
    }, 100);
  };
  
  const handleDeleteStackTrace = (id: string) => {
    deleteStackItemMutation.mutate(id);
  };

  const toggleForm = () => {
    if (showForm) {
      // If closing the form, reset the editing state
      setEditingItem(null);
      setNewStackTrace({ title: '', content: '' });
    }
    
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
        
        {/* Add/Edit Stack Trace Form */}
        {showForm && (
          <div ref={formRef} className="bg-neutral-700 rounded-lg p-6 shadow-md mb-8 border-2 border-blue-500">
            <h3 className="text-xl font-medium mb-4">
              {editingItem ? "Edit Stack Trace" : "Add New Stack Trace"}
            </h3>
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
                  disabled={createStackItemMutation.isPending || updateStackItemMutation.isPending}
                >
                  {editingItem 
                    ? (updateStackItemMutation.isPending ? "Updating..." : "Update Stack Trace") 
                    : (createStackItemMutation.isPending ? "Adding..." : "Add Stack Trace")}
                </Button>
                <Button 
                  onClick={toggleForm}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {/* Loading and Error States */}
        {isLoading && (
          <div className="bg-neutral-700 rounded-lg p-6 text-center">
            <p className="text-neutral-300">Loading stack traces...</p>
          </div>
        )}
        
        {isError && (
          <div className="bg-red-900/30 rounded-lg p-6 text-center">
            <p className="text-red-300">Error loading stack traces. Please try again later.</p>
          </div>
        )}
        
        {/* Stack Traces List */}
        {!isLoading && !isError && (
          <div className="space-y-6">
            {stackTraces.length === 0 ? (
              <div className="bg-neutral-700 rounded-lg p-6 text-center">
                <p className="text-neutral-300">No stack traces yet. Add one above!</p>
              </div>
            ) : (
              stackTraces.map((trace) => (
                <div key={trace._id} className="bg-neutral-700 rounded-lg overflow-hidden shadow-md">
                  <div className="bg-neutral-600 p-4 flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-lg">{trace.title}</h3>
                      <p className="text-xs text-neutral-300">{new Date(trace.createdAt || '').toLocaleString()}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="secondary" 
                        size="sm"
                        onClick={() => handleEditStackTrace(trace)}
                      >
                        Edit
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleDeleteStackTrace(trace._id || '')}
                        disabled={deleteStackItemMutation.isPending}
                      >
                        {deleteStackItemMutation.isPending && deleteStackItemMutation.variables === trace._id 
                          ? "Deleting..." 
                          : "Delete"}
                      </Button>
                    </div>
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
        )}
      </div>
    </div>
  );
};

export default StackPage; 