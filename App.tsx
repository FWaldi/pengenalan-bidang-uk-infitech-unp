import React, { useState, useCallback, useMemo } from 'react';
import TopicForm from './components/TopicForm';
import PresentationView from './components/PresentationView';
import ChallengeView from './components/ChallengeView';
import { topics, topicData } from './data/content';
import { introductionSlides } from './data/introduction';
import { BookOpenIcon } from './components/Icons';

type AppSection = 'general_introduction' | 'topic_selection' | 'topic_introduction' | 'challenges';

function App() {
  const [currentSection, setCurrentSection] = useState<AppSection>('general_introduction');
  const [currentTopicId, setCurrentTopicId] = useState<string | null>(null);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  
  const [backgroundStyle, setBackgroundStyle] = useState({});

  const handleStartTopicSelection = useCallback(() => {
    setBackgroundStyle({ '--bg-image': `url(https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)` });
    setCurrentSection('topic_selection');
  }, []);

  const handleSelectTopic = useCallback((topicId: string) => {
    setCurrentTopicId(topicId);
    setCurrentSection('topic_introduction');
  }, []);

  const handleStartChallenges = useCallback(() => {
    setCurrentChallengeIndex(0);
    setCurrentSection('challenges');
  }, []);

  const handleReset = useCallback(() => {
    setCurrentSection('topic_selection');
    setCurrentTopicId(null);
    setCurrentChallengeIndex(0);
  }, []);
  
  const currentTopicData = useMemo(() => {
      if (!currentTopicId) return null;
      return topicData[currentTopicId];
  }, [currentTopicId]);


  const renderContent = () => {
    switch (currentSection) {
      case 'general_introduction':
        return <PresentationView slides={introductionSlides} onComplete={handleStartTopicSelection} />;

      case 'topic_introduction':
        if (currentTopicData) {
            return <PresentationView slides={currentTopicData.slides} onComplete={handleStartChallenges} />;
        }
        return null;
      
      case 'challenges':
        if (currentTopicData) {
          const totalChallenges = currentTopicData.challenges.length;
          return (
            <ChallengeView
              key={currentChallengeIndex}
              challenge={currentTopicData.challenges[currentChallengeIndex]}
              introduction={currentTopicData.introduction}
              onNext={() => setCurrentChallengeIndex(prev => Math.min(prev + 1, totalChallenges - 1))}
              onPrev={() => setCurrentChallengeIndex(prev => Math.max(prev - 1, 0))}
              currentIndex={currentChallengeIndex}
              totalChallenges={totalChallenges}
              onComplete={handleReset}
              onReset={handleReset}
            />
          );
        }
        return null;

      case 'topic_selection':
      default:
        return <TopicForm topics={topics} onSelectTopic={handleSelectTopic} />;
    }
  };

  return (
    <div
      className="app-container min-h-screen text-white flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 font-sans transition-all duration-500"
      style={backgroundStyle}
    >
      <div className="w-full max-w-5xl mx-auto flex flex-col flex-grow relative isolate">
        <header className="text-center mb-6 md:mb-8">
          <p className="text-lg md:text-xl font-semibold text-slate-300">UK INFITECH UNP</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-400 to-cyan-400 text-transparent bg-clip-text">
            <BookOpenIcon className="w-8 h-8 sm:w-10 sm:h-10" />
            Bidang Bisnis IT: Sebuah Pengantar
          </h1>
          <p className="text-slate-400 mt-2 text-base md:text-lg max-w-3xl mx-auto">
            Jelajahi berbagai bidang dalam dunia teknologi melalui serangkaian tantangan interaktif.
          </p>
        </header>
        <main className="flex justify-center flex-grow w-full">
          {renderContent()}
        </main>
        <footer className="text-center mt-8 text-slate-500 text-sm">
          <p>© 2025 UK INFITECH UNP :: Unlimited Technology and Creativity. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;