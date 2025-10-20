import React, { useState, useCallback } from 'react';
import { INITIAL_GIT_HOOKS_TEXT } from './constants';
import { analyzeGitHooks } from './services/geminiService';
import CodeInput from './components/CodeInput';
import AnalysisDisplay from './components/AnalysisDisplay';
import SparklesIcon from './components/icons/SparklesIcon';
import LoaderIcon from './components/icons/LoaderIcon';

const App: React.FC = () => {
  const [inputText, setInputText] = useState<string>(INITIAL_GIT_HOOKS_TEXT);
  const [analysis, setAnalysis] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = useCallback(async () => {
    if (!inputText.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setAnalysis('');

    try {
      const result = await analyzeGitHooks(inputText);
      setAnalysis(result);
    } catch (e: any) {
      setError(e.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [inputText, isLoading]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col p-4 sm:p-6 lg:p-8">
      <header className="text-center mb-6">
        <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Git Hook Analyzer
        </h1>
        <p className="mt-2 text-lg text-gray-400">
          Leveraging Gemini to demystify your Git hook scripts.
        </p>
      </header>

      <main className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-150px)]">
        <CodeInput 
          value={inputText}
          onChange={setInputText}
          disabled={isLoading}
        />
        <AnalysisDisplay 
          analysis={analysis}
          isLoading={isLoading}
          error={error}
        />
      </main>

      <footer className="mt-6 flex justify-center">
        <button
          onClick={handleAnalyze}
          disabled={isLoading || !inputText.trim()}
          className="inline-flex items-center justify-center px-8 py-3 font-semibold text-white transition-all duration-200 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg shadow-lg hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-pink-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <LoaderIcon />
              <span className="ml-2">Analyzing...</span>
            </>
          ) : (
            <>
              <SparklesIcon />
              <span className="ml-2">Analyze with Gemini</span>
            </>
          )}
        </button>
      </footer>
    </div>
  );
};

export default App;
