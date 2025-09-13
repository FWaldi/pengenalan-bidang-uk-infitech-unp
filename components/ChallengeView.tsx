import React, { useState, useEffect } from 'react';
import { InteractiveChallenge, TopicContent } from '../types';
import { RestartIcon, LightbulbIcon, ArrowLeftIcon, ArrowRightIcon, RocketIcon } from './Icons';

interface ChallengeViewProps {
  challenge: InteractiveChallenge;
  introduction: TopicContent['introduction'];
  onReset: () => void;
  onNext: () => void;
  onPrev: () => void;
  onComplete: () => void;
  currentIndex: number;
  totalChallenges: number;
}

const ChallengeView: React.FC<ChallengeViewProps> = ({
  challenge,
  introduction,
  onReset,
  onNext,
  onPrev,
  onComplete,
  currentIndex,
  totalChallenges
}) => {
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  
  // Reset state when challenge changes
  useEffect(() => {
    setUserInput('');
    setFeedback(null);
    setSelected(null);
    setShowHint(false);
    setShowAnswer(false);
  }, [challenge]);


  const handleCodeSubmit = () => {
    if (challenge.type === 'code' || challenge.type === 'gaming_logic') {
      const sanitizedInput = userInput.trim().replace(/;/g, '');
      const sanitizedExpected = challenge.expectedAnswer.trim().replace(/;/g, '');
      if (sanitizedInput.toLowerCase() === sanitizedExpected.toLowerCase()) {
        setFeedback({ message: 'Kerja bagus! Jawaban Anda benar.', type: 'success' });
      } else {
        setFeedback({ message: 'Belum tepat. Coba periksa kembali jawaban Anda.', type: 'error' });
      }
    }
  };

  const handleWritingSubmit = () => {
     if (userInput.trim().length > 10) {
        setFeedback({ message: 'Jawaban yang bagus! Anda menangkap idenya.', type: 'success' });
     } else {
        setFeedback({ message: 'Coba tulis jawaban yang lebih deskriptif.', type: 'error' });
     }
  };

  const handleOptionSelect = (option: { isCorrect: boolean, [key: string]: any }, id: string) => {
    setSelected(id);
    if (option.isCorrect) {
      setFeedback({ message: 'Pilihan yang tepat! Anda memiliki pemahaman yang baik.', type: 'success' });
    } else {
      setFeedback({ message: 'Bukan pilihan yang paling tepat. Coba lagi!', type: 'error' });
    }
  };
  
  const handlePhishingClick = () => {
     if(challenge.type === 'security_phishing'){
        setFeedback({ message: challenge.feedback, type: 'info' });
     }
  }

  const renderFeedback = () => {
    if (!feedback) return <div className="h-12"></div>;
    const colors = {
      success: 'bg-green-500/20 border-green-500 text-green-300',
      error: 'bg-red-500/20 border-red-500 text-red-300',
      info: 'bg-blue-500/20 border-blue-500 text-blue-300'
    };
    return (
      <div className={`h-auto min-h-12 p-3 my-4 text-sm rounded-lg border ${colors[feedback.type]} transition-opacity duration-300 flex items-center`}>
        {feedback.message}
      </div>
    );
  };
  
  const renderChallenge = () => {
    switch(challenge.type) {
        case 'code':
            return (
                <div className="font-mono bg-slate-900/80 p-4 rounded-lg border border-slate-700 text-sm sm:text-base overflow-x-auto">
                    <pre><code className="text-cyan-300">{challenge.placeholder.replace('...', '')}<input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} className="bg-transparent text-yellow-300 w-24 focus:outline-none" /></code></pre>
                </div>
            );
        case 'writing':
             return <textarea value={userInput} onChange={(e) => setUserInput(e.target.value)} placeholder={challenge.placeholder} className="w-full h-32 p-3 bg-slate-900/80 border border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition text-sm sm:text-base" />;
        case 'design_contrast':
            return (
                <div className="p-4 sm:p-8 rounded-lg flex flex-col items-center justify-center gap-4" style={{ backgroundColor: challenge.background }}>
                    <p className="font-bold text-base sm:text-xl text-white mix-blend-difference text-center">Pilih warna teks yang paling mudah dibaca:</p>
                    <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
                    {challenge.options.map((opt, i) => (
                        <button key={i} onClick={() => handleOptionSelect(opt, opt.hex)} style={{ color: opt.hex }} className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-md font-semibold text-base sm:text-lg border-2 ${selected === opt.hex ? 'border-yellow-400' : 'border-transparent'}`}>
                            {opt.color}
                        </button>
                    ))}
                    </div>
                </div>
            );
        case 'security_phishing':
            return (
                <div className="p-4 bg-white text-black rounded-lg shadow-lg font-sans text-xs sm:text-sm border border-slate-300">
                    <p><strong>Dari:</strong> {challenge.sender}</p>
                    <p><strong>Subjek:</strong> {challenge.subject}</p>
                    <hr className="my-2"/>
                    <p>{challenge.body.greeting}</p>
                    <p className="my-2">{challenge.body.warning}</p>
                    <button onClick={handlePhishingClick} className="text-blue-600 underline hover:text-blue-800 break-all">{challenge.linkText}</button>
                    <p className="mt-2">{challenge.body.closing}</p>
                </div>
            );
        case 'content_composition':
            return (
                <div className="w-full max-w-sm mx-auto aspect-square bg-slate-700 rounded-lg border-2 border-slate-600 relative grid grid-cols-3 grid-rows-3">
                    <div className="absolute inset-0 text-slate-500/50 text-xs">
                        {[1,2].map(i => <div key={`v${i}`} className="absolute h-full w-px bg-current" style={{ left: `${i * 33.33}%`}}></div>)}
                        {[1,2].map(i => <div key={`h${i}`} className="absolute w-full h-px bg-current" style={{ top: `${i * 33.33}%`}}></div>)}
                    </div>
                    {challenge.options.map(opt => (
                        <button key={opt.label} onClick={() => handleOptionSelect(opt, opt.label)} className="absolute w-10 h-10 bg-red-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 border-4 border-transparent hover:border-yellow-400 focus:border-yellow-400 outline-none" style={{ top: opt.subjectPosition.top, left: opt.subjectPosition.left }} aria-label={`Pilih posisi ${opt.label}`}></button>
                    ))}
                </div>
            );
        case 'gaming_logic':
            return (
                <div className="font-mono text-lg sm:text-xl text-center bg-slate-900/80 p-4 rounded-lg border border-slate-700">
                    <span>{challenge.prefix}</span>
                    <input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} className="bg-transparent text-yellow-300 w-16 text-center focus:outline-none" />
                    <span>{challenge.suffix}</span>
                </div>
            );
        case 'multiple_choice':
            return (
                <div className="space-y-3">
                    <p className="text-base sm:text-lg text-slate-300">{challenge.question}</p>
                    {challenge.options.map((opt, i) => (
                        <button key={i} onClick={() => handleOptionSelect(opt, opt.text)} className={`block w-full text-left p-3 rounded-lg border-2 transition-colors text-sm sm:text-base ${selected === opt.text ? (opt.isCorrect ? 'border-green-500 bg-green-500/10' : 'border-red-500 bg-red-500/10') : 'border-slate-700 bg-slate-800/50 hover:bg-slate-800'}`}>
                           {opt.text}
                        </button>
                    ))}
                </div>
            );
        default:
            return <p>Tipe tantangan tidak diketahui.</p>;
    }
  };

  const getSubmitHandler = () => {
    switch(challenge.type) {
        case 'code':
        case 'gaming_logic':
            return handleCodeSubmit;
        case 'writing':
            return handleWritingSubmit;
        default:
            return null;
    }
  }
  
  const submitHandler = getSubmitHandler();

  return (
    <div className="w-full max-w-2xl bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 flex flex-col animate-fade-in">
        <header className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 border-b border-slate-700 pb-4 gap-4">
            <div>
                <p className="text-indigo-400 font-semibold">{introduction.title}</p>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-100">{challenge.title}</h2>
            </div>
            <button onClick={onReset} className="flex-shrink-0 flex items-center self-start sm:self-center gap-2 px-3 py-2 text-sm bg-slate-700/50 hover:bg-slate-700 border border-slate-600 rounded-lg transition-colors">
                <RestartIcon className="w-4 h-4" />
                <span>Reset</span>
            </button>
        </header>
        
        <p className="text-slate-300 mb-4 text-sm sm:text-base">{challenge.instruction}</p>

        <div className="flex-grow my-4">
            {renderChallenge()}
        </div>

        {renderFeedback()}

        {showAnswer && challenge.solution && (
            <div className="p-3 my-4 text-sm rounded-lg bg-indigo-500/20 border border-indigo-500 text-indigo-300">
                <strong>Jawaban:</strong> {challenge.solution}
            </div>
        )}

        {showHint && !showAnswer && challenge.hint && (
            <div className="p-3 my-4 text-sm rounded-lg bg-yellow-500/20 border border-yellow-500 text-yellow-300">
                <strong>Petunjuk:</strong> {challenge.hint}
            </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 mt-4">
            {challenge.hint && <button onClick={() => setShowHint(true)} className="flex-1 px-4 py-2 bg-slate-700/70 border border-slate-600 rounded-lg hover:bg-slate-700 transition-colors text-sm sm:text-base">Beri Petunjuk</button>}
            {challenge.solution && <button onClick={() => setShowAnswer(true)} className="flex-1 px-4 py-2 bg-slate-700/70 border border-slate-600 rounded-lg hover:bg-slate-700 transition-colors text-sm sm:text-base">Tampilkan Jawaban</button>}
            {submitHandler && <button onClick={submitHandler} className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 font-semibold transition-colors text-sm sm:text-base">Kirim Jawaban</button>}
        </div>

        <footer className="mt-8 pt-4 border-t border-slate-700 flex justify-between items-center">
            <button onClick={onPrev} disabled={currentIndex === 0} className="p-2 rounded-full bg-slate-700/50 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors" aria-label="Tantangan sebelumnya">
                <ArrowLeftIcon className="w-6 h-6" />
            </button>
            <p className="text-slate-400 text-sm">Tantangan {currentIndex + 1} dari {totalChallenges}</p>
            {currentIndex < totalChallenges - 1 ? (
                 <button onClick={onNext} className="p-2 rounded-full bg-slate-700/50 hover:bg-slate-700 transition-colors" aria-label="Tantangan berikutnya">
                    <ArrowRightIcon className="w-6 h-6" />
                </button>
            ) : (
                <button onClick={onComplete} className="flex items-center gap-2 px-4 py-2 text-sm bg-indigo-600 hover:bg-indigo-500 border border-indigo-500 rounded-lg transition-colors font-bold">
                    <span>Selesaikan Topik</span>
                    <RocketIcon className="w-4 h-4" />
                </button>
            )}
        </footer>
    </div>
  );
};

export default ChallengeView;