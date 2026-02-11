import React, { useState, useRef } from 'react';
import { Button } from './Button';
import { UploadedImage } from '../types';

interface UploadStudioProps {
  onAnalyze: (images: UploadedImage[]) => void;
  isAnalyzing: boolean;
}

export const UploadStudio: React.FC<UploadStudioProps> = ({ onAnalyze, isAnalyzing }) => {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    if (images.length + files.length > 6) {
      setError("Please limit to 6 inspiration images.");
      return;
    }
    setError(null);
    
    Array.from(files).forEach((file: File) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setImages((prev) => [
            ...prev, 
            {
              id: Math.random().toString(36).slice(2, 11),
              url: e.target!.result as string,
              file: file
            }
          ]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter(img => img.id !== id));
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] max-w-5xl mx-auto px-6 py-12 animate-fade-in">
      <div className="text-center mb-12 space-y-4">
        <h2 className="font-serif text-4xl text-stone-800">The Studio</h2>
        <p className="text-stone-500 max-w-md mx-auto">
          Upload 3–6 images that capture the vibe you want to achieve.
        </p>
      </div>

      {/* Grid */}
      <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
        {images.map((img) => (
          <div key={img.id} className="group relative aspect-[3/4] bg-stone-100 rounded-sm overflow-hidden shadow-sm transition-transform hover:shadow-md">
            <img src={img.url} alt="Upload" className="w-full h-full object-cover" />
            <button 
              onClick={() => removeImage(img.id)}
              className="absolute top-2 right-2 bg-stone-900/50 text-white w-8 h-8 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm hover:bg-stone-900/70"
            >
              &times;
            </button>
          </div>
        ))}

        {images.length < 6 && (
          <button 
            onClick={triggerUpload}
            className="aspect-[3/4] border border-dashed border-stone-300 rounded-sm flex flex-col items-center justify-center text-stone-400 hover:bg-stone-50 hover:border-stone-400 transition-colors cursor-pointer group"
          >
            <span className="text-4xl font-light mb-2 group-hover:scale-110 transition-transform">+</span>
            <span className="text-sm font-medium tracking-wide">ADD IMAGE</span>
          </button>
        )}
      </div>

      <input 
        type="file" 
        multiple 
        accept="image/*" 
        className="hidden" 
        ref={fileInputRef} 
        onChange={handleFileChange}
      />

      {error && (
        <p className="text-red-400 text-sm mb-6">{error}</p>
      )}

      <div className="flex gap-4">
        <Button 
          onClick={() => onAnalyze(images)} 
          disabled={images.length < 1} 
          isLoading={isAnalyzing}
          size="lg"
        >
          {isAnalyzing ? 'Analyzing Mood...' : 'Analyze Aesthetic'}
        </Button>
      </div>
    </div>
  );
};