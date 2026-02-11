import React, { useState } from 'react';
import { Hero } from './components/Hero';
import { UploadStudio } from './components/UploadStudio';
import { AnalysisResults } from './components/AnalysisResults';
import { ViewState, UploadedImage, AestheticAnalysis } from './types';
import { analyzeMoodboard } from './services/geminiService';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('landing');
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [analysis, setAnalysis] = useState<AestheticAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const startProcess = () => setView('upload');

  const handleAnalyze = async (uploadedImages: UploadedImage[]) => {
    setImages(uploadedImages);
    setIsAnalyzing(true);
    
    // Smooth transition UI
    try {
      // Extract base64 strings
      const base64List = uploadedImages.map(img => img.url);
      const result = await analyzeMoodboard(base64List);
      
      setAnalysis(result);
      setView('results');
    } catch (error) {
      console.error(error);
      alert("Something went wrong with the AI stylist. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setImages([]);
    setAnalysis(null);
    setView('landing');
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-800 selection:bg-stone-200">
      {/* Navigation / Header */}
      <nav className="w-full py-6 px-6 md:px-12 flex justify-between items-center fixed top-0 z-50 bg-stone-50/80 backdrop-blur-md border-b border-stone-100/50">
        <div 
          className="text-2xl font-serif font-semibold tracking-tighter cursor-pointer"
          onClick={handleReset}
        >
          MoodBoard <span className="italic font-light">IRL</span>
        </div>
        <div>
          {view === 'results' && (
             <button onClick={handleReset} className="text-xs font-bold tracking-widest text-stone-400 hover:text-stone-900 transition-colors uppercase">
               New Board
             </button>
          )}
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="pt-24 pb-12">
        {view === 'landing' && (
          <Hero onStart={startProcess} />
        )}
        
        {view === 'upload' && (
          <UploadStudio onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
        )}

        {view === 'results' && analysis && (
          <AnalysisResults data={analysis} images={images} onReset={handleReset} />
        )}
      </main>

      {/* Footer */}
      <footer className="w-full py-8 text-center text-stone-400 text-xs tracking-widest uppercase border-t border-stone-200/50 mt-auto">
        <p>Powered by Gemini AI • Mixboard • Pomelli</p>
      </footer>
    </div>
  );
};

export default App;