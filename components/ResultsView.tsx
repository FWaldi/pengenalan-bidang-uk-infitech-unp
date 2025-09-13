import React from 'react';
import { TopicResult } from '../types';
import { RestartIcon, CheckCircleIcon, StarIcon, ArrowUpIcon, ArrowRightIcon } from './Icons';
import RaisecGraph from './RaisecGraph';

interface ResultsViewProps {
  result: TopicResult;
  onReset: () => void;
}

const raisecLegend = [
    { code: 'R', name: 'Realistic', description: 'Praktis, fisik, dan berorientasi pada tindakan.' },
    { code: 'I', name: 'Investigative', description: 'Analitis, intelektual, dan berorientasi pada sains.' },
    { code: 'A', name: 'Artistic', description: 'Kreatif, orisinal, dan independen.' },
    { code: 'S', name: 'Social', description: 'Kooperatif, mendukung, dan suka membantu.' },
    { code: 'E', name: 'Enterprising', description: 'Kompetitif, persuasif, dan pemimpin.' },
    { code: 'C', name: 'Conventional', description: 'Detail, terorganisir, dan mengikuti aturan.' },
];


const SuitabilityBadge: React.FC<{ suitability: TopicResult['suitability'] }> = ({ suitability }) => {
  const styles = {
    'Sangat Cocok': 'bg-green-500/20 text-green-300 border-green-500',
    'Cocok': 'bg-sky-500/20 text-sky-300 border-sky-500',
    'Potensi Menjanjikan': 'bg-amber-500/20 text-amber-300 border-amber-500',
  };
  return (
    <div className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold border ${styles[suitability]}`}>
      {suitability}
    </div>
  );
};

const ResultsView: React.FC<ResultsViewProps> = ({ result, onReset }) => {
  return (
    <div className="w-full max-w-5xl bg-slate-800/60 backdrop-blur-sm border border-slate-700 rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 flex flex-col items-center text-center animate-fade-in">
      <header className="mb-6 w-full">
        <SuitabilityBadge suitability={result.suitability} />
        <h2 className="text-2xl sm:text-3xl lg:text-4xl mt-4 font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 text-transparent bg-clip-text">{result.title}</h2>
      </header>
      
      <p className="text-slate-300 leading-relaxed text-base sm:text-lg max-w-3xl">
        {result.summary}
      </p>

      <div className="flex flex-col lg:flex-row gap-8 w-full mt-8">
        <div className="w-full lg:w-1/3 flex flex-col items-center">
            <h3 className="text-lg sm:text-xl font-semibold text-slate-100 mb-4">Profil Kepribadian Karir Anda</h3>
            <RaisecGraph scores={result.raisecScores} />
        </div>
        <div className="w-full lg:w-2/3 grid md:grid-cols-2 gap-6 text-left">
           <div className="bg-slate-900/50 p-4 sm:p-6 rounded-lg border border-slate-700">
                <h3 className="text-lg sm:text-xl font-semibold text-slate-100 flex items-center gap-2 mb-4">
                    <StarIcon className="w-6 h-6 text-yellow-400" />
                    Karakteristik Kunci Anda
                </h3>
                <ul className="space-y-3 list-inside">
                    {result.keyTraits.map((trait, index) => (
                        <li key={index} className="flex items-start gap-3 text-slate-300 text-sm sm:text-base">
                            <CheckCircleIcon className="w-5 h-5 mt-0.5 text-green-400 flex-shrink-0" />
                            <span>{trait}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="bg-slate-900/50 p-4 sm:p-6 rounded-lg border border-slate-700">
                <h3 className="text-lg sm:text-xl font-semibold text-slate-100 flex items-center gap-2 mb-4">
                    <ArrowUpIcon className="w-6 h-6 text-indigo-400" />
                    Area untuk Pengembangan
                </h3>
                <ul className="space-y-3 list-inside">
                    {result.growthAreas.map((area, index) => (
                        <li key={index} className="flex items-start gap-3 text-slate-300 text-sm sm:text-base">
                            <ArrowRightIcon className="w-5 h-5 mt-0.5 text-indigo-400 flex-shrink-0" />
                            <span>{area}</span>
                        </li>
                    ))}
                </ul>
            </div>
             <div className="bg-slate-900/50 p-4 sm:p-6 rounded-lg border border-slate-700 md:col-span-2">
                <h3 className="text-lg sm:text-xl font-semibold text-slate-100 mb-3">Model Kepribadian RAISEC</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3">
                {raisecLegend.map(item => (
                    <div key={item.code}>
                        <p className="font-bold text-slate-200 text-sm sm:text-base">{item.code} - {item.name}</p>
                        <p className="text-xs text-slate-400">{item.description}</p>
                    </div>
                ))}
                </div>
            </div>
        </div>
      </div>


      <footer className="mt-10 pt-6 border-t border-slate-700 w-full">
        <p className="text-slate-400 mb-4">Semoga ini memberikan Anda wawasan baru!</p>
        <button 
          onClick={onReset}
          className="flex items-center gap-2 mx-auto px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold transition-colors hover:bg-indigo-500"
        >
          <RestartIcon className="w-5 h-5" />
          Jelajahi Bidang Lain
        </button>
      </footer>
    </div>
  );
};

export default ResultsView;