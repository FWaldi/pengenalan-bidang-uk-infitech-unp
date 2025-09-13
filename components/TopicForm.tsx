import React from 'react';
import { Topic } from '../data/content';

interface TopicFormProps {
  topics: Topic[];
  onSelectTopic: (topicId: string) => void;
}

const TopicForm: React.FC<TopicFormProps> = ({ topics, onSelectTopic }) => {
  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
      <div className="text-center w-full">
        <p className="text-slate-300 mb-8 text-xl">Pilih sebuah topik untuk memulai eksplorasi Anda:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => onSelectTopic(topic.id)}
              className="group text-left p-6 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl transform hover:-translate-y-1 hover:border-indigo-500 hover:bg-slate-800/80 transition-all duration-300 shadow-lg hover:shadow-indigo-500/10"
            >
              <div className="flex items-center gap-4 mb-3">
                 <topic.icon className="w-8 h-8 text-indigo-400 transition-colors" />
                <h3 className="text-xl font-bold text-slate-100">{topic.name}</h3>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">{topic.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopicForm;