"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function LayoutSwitcher() {
  const [activeLayout, setActiveLayout] = useState('option1');
  
  return (
    <div className="min-h-screen">
      <div className="bg-gray-100 border-b p-4">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-lg font-bold">Layout Preview</h1>
          <div className="flex items-center gap-4">
            <button
              className={`px-3 py-1 rounded text-sm ${activeLayout === 'option1' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setActiveLayout('option1')}
            >
              Option 1: Stepper
            </button>
            <button
              className={`px-3 py-1 rounded text-sm ${activeLayout === 'option2' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setActiveLayout('option2')}
            >
              Option 2: Two Column
            </button>
            <button
              className={`px-3 py-1 rounded text-sm ${activeLayout === 'option3' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setActiveLayout('option3')}
            >
              Option 3: Tabs
            </button>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto mt-4">
        {activeLayout === 'option1' && (
          <div className="border rounded-lg p-4">
            <h2 className="text-lg font-bold mb-2">Option 1: Stepper Layout</h2>
            <p>This layout provides a guided step-by-step process with a progress indicator. Visit <Link href="/dashboard/new-consultation/option1" className="text-blue-500 underline">Option 1 Page</Link> to see it in action.</p>
          </div>
        )}
        
        {activeLayout === 'option2' && (
          <div className="border rounded-lg p-4">
            <h2 className="text-lg font-bold mb-2">Option 2: Two Column Layout</h2>
            <p>This layout uses a split screen with form on left and live preview on right. Visit <Link href="/dashboard/new-consultation/option2" className="text-blue-500 underline">Option 2 Page</Link> to see it in action.</p>
          </div>
        )}
        
        {activeLayout === 'option3' && (
          <div className="border rounded-lg p-4">
            <h2 className="text-lg font-bold mb-2">Option 3: Tab-Based Layout</h2>
            <p>This layout uses tabs for clear section organization with helpful sidebars. Visit <Link href="/dashboard/new-consultation/option3" className="text-blue-500 underline">Option 3 Page</Link> to see it in action.</p>
          </div>
        )}
      </div>
    </div>
  );
} 