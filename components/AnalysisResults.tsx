import React from 'react';
import { AestheticAnalysis, UploadedImage } from '../types';
import { Button } from './Button';

interface AnalysisResultsProps {
  data: AestheticAnalysis;
  images: UploadedImage[];
  onReset: () => void;
}

export const AnalysisResults: React.FC<AnalysisResultsProps> = ({ data, images, onReset }) => {
  return (
    <div className="animate-fade-in w-full max-w-6xl mx-auto px-4 py-12 md:py-20">
      
      {/* Header / Aesthetic Name */}
      <div className="text-center mb-16 md:mb-24 space-y-6">
        <div className="flex justify-center gap-3 mb-6">
            {data.moodKeywords.map((keyword, idx) => (
                <span key={idx} className="text-xs font-bold tracking-widest uppercase text-stone-400 border border-stone-200 px-3 py-1 rounded-full">
                    {keyword}
                </span>
            ))}
        </div>
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-stone-900 capitalize tracking-tight leading-none">
          {data.aestheticName}
        </h1>
        <p className="max-w-2xl mx-auto text-xl text-stone-500 font-serif italic">
          "{data.emotionalTone}"
        </p>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
        
        {/* Left Column: Color & Texture */}
        <div className="md:col-span-4 space-y-12">
          
          <section>
            <h3 className="font-sans text-xs font-bold tracking-[0.2em] text-stone-900 mb-6 uppercase border-b border-stone-200 pb-2">
              Color Story
            </h3>
            <p className="text-stone-600 mb-6 font-light leading-relaxed">
              {data.colorStory.description}
            </p>
            <div className="flex flex-wrap gap-3">
              {data.colorStory.palette.map((color, idx) => (
                <div key={idx} className="group flex flex-col items-center gap-2">
                  <div 
                    className="w-12 h-12 rounded-full shadow-inner border border-stone-100"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span className="text-[10px] uppercase tracking-wider text-stone-400 group-hover:text-stone-700 transition-colors">
                    {color.name}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section>
             <h3 className="font-sans text-xs font-bold tracking-[0.2em] text-stone-900 mb-6 uppercase border-b border-stone-200 pb-2">
              Texture & Material
            </h3>
             <p className="text-stone-600 font-light leading-relaxed">
              {data.textureMaterial}
            </p>
          </section>

        </div>

        {/* Center Column: Visual Context (The Images) */}
        <div className="md:col-span-4 flex flex-col gap-4">
             {/* Dynamic Masonry-ish layout using 3 images max to save space */}
             {images.slice(0, 3).map((img, idx) => (
                 <div key={img.id} className={`w-full overflow-hidden rounded-sm shadow-sm ${idx === 1 ? 'scale-95 opacity-90' : ''}`}>
                    <img src={img.url} className="w-full h-auto object-cover" alt="Inspiration" />
                 </div>
             ))}
        </div>

        {/* Right Column: Styling & Advice */}
        <div className="md:col-span-4 space-y-12">
          
          <section>
            <h3 className="font-sans text-xs font-bold tracking-[0.2em] text-stone-900 mb-6 uppercase border-b border-stone-200 pb-2">
              The Translation
            </h3>
            <p className="text-lg text-stone-800 font-serif leading-relaxed mb-4">
              {data.realLifeTranslation}
            </p>
            <p className="text-sm text-stone-500 italic">
               Energy: {data.stylingEnergy}
            </p>
          </section>

           <div className="grid grid-cols-1 gap-8">
               <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-100">
                   <h4 className="font-serif text-lg text-stone-800 mb-4 italic">Do This</h4>
                   <ul className="space-y-3">
                       {data.doList.map((item, i) => (
                           <li key={i} className="flex items-start gap-3 text-stone-600 font-light text-sm">
                               <span className="text-emerald-400 text-lg leading-none">•</span>
                               {item}
                           </li>
                       ))}
                   </ul>
               </div>

               <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-100">
                   <h4 className="font-serif text-lg text-stone-800 mb-4 italic">Avoid This</h4>
                   <ul className="space-y-3">
                       {data.dontList.map((item, i) => (
                           <li key={i} className="flex items-start gap-3 text-stone-600 font-light text-sm">
                               <span className="text-rose-300 text-lg leading-none">•</span>
                               {item}
                           </li>
                       ))}
                   </ul>
               </div>
           </div>

        </div>
      </div>
      
      <div className="text-center pt-12 border-t border-stone-200">
        <Button variant="outline" onClick={onReset}>
           Start New Board
        </Button>
      </div>

    </div>
  );
};