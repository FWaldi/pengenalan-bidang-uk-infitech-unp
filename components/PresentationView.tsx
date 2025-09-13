import React, { useState } from 'react';
import { Slide as SlideType } from '../types';
import Slide from './Slide';
import { ArrowLeftIcon, ArrowRightIcon, RocketIcon } from './Icons';

interface PresentationViewProps {
  slides: SlideType[];
  onComplete: () => void;
}

const PresentationView: React.FC<PresentationViewProps> = ({ slides, onComplete }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    setCurrentSlide(prev => Math.min(prev + 1, slides.length - 1));
  };

  const handlePrev = () => {
    setCurrentSlide(prev => Math.max(prev - 1, 0));
  };

  const isLastSlide = currentSlide === slides.length - 1;

  return (
    <div className="w-full max-w-2xl bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 flex flex-col animate-fade-in">
      <div className="flex-grow">
        <Slide slide={slides[currentSlide]} />
      </div>

      <div className="flex items-center justify-between mt-8 pt-4 border-t border-slate-700">
        <button 
          onClick={handlePrev} 
          disabled={currentSlide === 0}
          className="p-3 rounded-full bg-slate-700/50 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          aria-label="Slide sebelumnya"
        >
          <ArrowLeftIcon className="w-6 h-6" />
        </button>
        
        <div className="flex items-center gap-2">
            {slides.map((_, index) => (
                <div key={index} className={`w-2.5 h-2.5 rounded-full transition-colors ${currentSlide === index ? 'bg-indigo-400' : 'bg-slate-600'}`}></div>
            ))}
        </div>

        {isLastSlide ? (
          <button
            onClick={onComplete}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-indigo-600 hover:bg-indigo-500 border border-indigo-500 rounded-lg transition-colors font-bold"
          >
            Mulai Tantangan
            <RocketIcon className="w-4 h-4" />
          </button>
        ) : (
          <button 
            onClick={handleNext} 
            className="p-3 rounded-full bg-slate-700/50 hover:bg-slate-700 transition-colors"
            aria-label="Slide berikutnya"
          >
            <ArrowRightIcon className="w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  );
};

export default PresentationView;