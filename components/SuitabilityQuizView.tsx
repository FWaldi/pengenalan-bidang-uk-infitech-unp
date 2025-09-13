import React, { useState } from 'react';
import { SuitabilityQuestion } from '../types';

interface SuitabilityQuizViewProps {
  questions: SuitabilityQuestion[];
  onSubmit: () => void;
}

const SuitabilityQuizView: React.FC<SuitabilityQuizViewProps> = ({ questions, onSubmit }) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleOptionChange = (questionId: string, option: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: option }));
  };

  const allAnswered = Object.keys(answers).length === questions.length;

  return (
    <div className="w-full max-w-2xl bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 flex flex-col animate-fade-in">
      <header className="text-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">Kuis Kecocokan</h2>
        <p className="text-slate-400 mt-1 text-sm sm:text-base">Jawab beberapa pertanyaan untuk melihat seberapa cocok Anda dengan bidang ini.</p>
      </header>

      <div className="space-y-8">
        {questions.map((q, index) => (
          <div key={q.id}>
            <p className="font-semibold text-slate-200 mb-3 text-base sm:text-lg">{index + 1}. {q.question}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              {q.options.map(opt => (
                <label key={opt} className={`flex-1 p-3 text-center border-2 rounded-lg cursor-pointer transition-colors text-sm sm:text-base ${answers[q.id] === opt ? 'bg-indigo-600 border-indigo-500' : 'bg-slate-800/60 border-slate-700 hover:bg-slate-700/80'}`}>
                  <input
                    type="radio"
                    name={q.id}
                    value={opt}
                    checked={answers[q.id] === opt}
                    onChange={() => handleOptionChange(q.id, opt)}
                    className="sr-only"
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <footer className="mt-8 pt-6 border-t border-slate-700 text-center">
        <button 
          onClick={onSubmit}
          disabled={!allAnswered}
          className="w-full sm:w-auto px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed hover:bg-indigo-500"
        >
          Lihat Hasil Analisis
        </button>
         {!allAnswered && <p className="text-sm text-slate-500 mt-3">Harap jawab semua pertanyaan untuk melanjutkan.</p>}
      </footer>
    </div>
  );
};

export default SuitabilityQuizView;