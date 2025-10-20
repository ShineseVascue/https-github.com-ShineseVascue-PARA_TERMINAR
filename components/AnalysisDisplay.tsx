import React, { useEffect, useRef } from 'react';
import LoaderIcon from './icons/LoaderIcon';

declare global {
  interface Window {
    marked: {
      parse(markdown: string): string;
    };
  }
}

interface AnalysisDisplayProps {
  analysis: string;
  isLoading: boolean;
  error: string | null;
}

const AnalysisDisplay: React.FC<AnalysisDisplayProps> = ({ analysis, isLoading, error }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [analysis]);
  
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-gray-400">
          <LoaderIcon />
          <p className="mt-4 text-lg">Analyzing scripts...</p>
          <p className="text-sm">This might take a moment.</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center justify-center h-full text-red-400 p-4">
          <div className="text-center bg-red-900/50 p-4 rounded-lg">
            <h3 className="text-xl font-bold">An Error Occurred</h3>
            <p className="mt-2 font-mono text-left">{error}</p>
          </div>
        </div>
      );
    }

    if (!analysis) {
      return (
        <div className="flex items-center justify-center h-full text-gray-500">
          <p className="text-lg">The analysis will appear here.</p>
        </div>
      );
    }
    
    const parsedHtml = window.marked.parse(analysis);

    return (
        <div 
          className="prose prose-invert prose-sm sm:prose-base max-w-none p-6"
          dangerouslySetInnerHTML={{ __html: parsedHtml }}
        />
    );
  };

  return (
    <div className="flex flex-col h-full bg-gray-800 rounded-lg shadow-lg">
      <div className="flex-shrink-0 p-3 bg-gray-700/50 rounded-t-lg">
        <h2 className="text-lg font-semibold text-gray-200">Gemini Analysis</h2>
      </div>
      <div ref={contentRef} className="flex-grow overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default AnalysisDisplay;
