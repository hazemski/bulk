import React, { useState } from 'react';
import { fetchBacklinkData } from './services/api';
import { BacklinkData } from './types';
import { ResultsTable } from './components/ResultsTable';
import { DomainInput } from './components/DomainInput';

function App() {
  const [results, setResults] = useState<BacklinkData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (domainList: string[]) => {
    setIsLoading(true);
    setError(null);

    try {
      if (domainList.length === 0) {
        throw new Error('Please enter at least one domain');
      }

      if (domainList.length > 100) {
        throw new Error('Maximum 100 domains allowed');
      }

      const data = await fetchBacklinkData(domainList);
      setResults(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Bulk Backlink Analysis
          </h1>
          
          <DomainInput onAnalyze={handleAnalyze} />

          <ResultsTable 
            data={results}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </div>
    </div>
  );
}

export default App;