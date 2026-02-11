import React from 'react';
import { Button } from './Button';

interface HeroProps {
  onStart: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center animate-fade-in">
      <div className="max-w-4xl mx-auto space-y-8">
        <span className="text-xs font-bold tracking-[0.2em] text-stone-400 uppercase">
          Digital Stylist
        </span>
        
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-stone-900 leading-[1.1] font-medium">
          Turn saved aesthetics <br /> into <span className="italic font-normal text-stone-600">real life.</span>
        </h1>
        
        <p className="max-w-lg mx-auto text-lg text-stone-500 font-sans font-light leading-relaxed">
          MoodBoard IRL transforms your visual inspiration into actionable styling advice using AI visual analysis.
        </p>
        
        <div className="pt-8">
          <Button size="lg" onClick={onStart}>
            Upload Moodboard
          </Button>
        </div>
      </div>
      
      {/* Decorative images to set the mood */}
      <div className="mt-20 w-full max-w-6xl grid grid-cols-3 gap-4 md:gap-8 opacity-90 pointer-events-none select-none">
        <div className="aspect-[3/4] rounded-lg overflow-hidden bg-stone-200 translate-y-8 shadow-xl">
           <img src="https://picsum.photos/400/600?random=1" className="w-full h-full object-cover grayscale-[0.2]" alt="Fashion editorial" />
        </div>
        <div className="aspect-[3/4] rounded-lg overflow-hidden bg-stone-200 shadow-xl">
           <img src="https://picsum.photos/400/600?random=2" className="w-full h-full object-cover grayscale-[0.2]" alt="Texture detail" />
        </div>
        <div className="aspect-[3/4] rounded-lg overflow-hidden bg-stone-200 translate-y-8 shadow-xl">
           <img src="https://picsum.photos/400/600?random=3" className="w-full h-full object-cover grayscale-[0.2]" alt="Street style" />
        </div>
      </div>
    </div>
  );
};