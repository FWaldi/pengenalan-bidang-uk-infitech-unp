import React from 'react';
import { Slide as SlideType } from '../types';

interface SlideProps {
  slide: SlideType;
}

const Slide: React.FC<SlideProps> = ({ slide }) => {
  return (
    <div className="h-full flex flex-col justify-center text-center">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-cyan-400 text-transparent bg-clip-text">{slide.title}</h2>
      <ul className="space-y-4 text-base sm:text-lg text-slate-300">
        {slide.content.map((point, index) => (
          <li key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 150}ms` }}>
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Slide;