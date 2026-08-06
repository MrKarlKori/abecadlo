import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLanguageData } from '../hooks/useLanguageData';
import { useProgress } from '../hooks/useProgress';
import type { CharacterData } from '../types';

type Question = {
  type: 'target-to-english' | 'english-to-target';
  target: CharacterData;
  options: CharacterData[];
};

export function QuizPage() {
  const { lang } = useParams();
  const langId = lang || 'ru';
  const { characters, loading } = useLanguageData(langId);
  const { progress, updateQuizScore } = useProgress(langId);
  
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizState, setQuizState] = useState<'start' | 'playing' | 'finished'>('start');
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const generateQuiz = () => {
    if (characters.length < 4) return;
    
    // Create 10 random questions
    const newQuestions: Question[] = [];
    for (let i = 0; i < 10; i++) {
      const type = Math.random() > 0.5 ? 'target-to-english' : 'english-to-target';
      const target = characters[Math.floor(Math.random() * characters.length)];
      
      // Get 3 random wrong options
      const otherChars = characters.filter(c => c.id !== target.id);
      const wrongOptions = [...otherChars].sort(() => 0.5 - Math.random()).slice(0, 3);
      
      // Mix them
      const options = [target, ...wrongOptions].sort(() => 0.5 - Math.random());
      
      newQuestions.push({ type, target, options });
    }
    
    setQuestions(newQuestions);
    setCurrentIndex(0);
    setScore(0);
    setQuizState('playing');
    setSelectedAnswer(null);
  };

  const handleAnswer = (optionId: string) => {
    if (selectedAnswer) return; // Prevent multiple clicks
    
    setSelectedAnswer(optionId);
    
    const isCorrect = optionId === questions[currentIndex].target.id;
    if (isCorrect) setScore(s => s + 1);
    
    setTimeout(() => {
      if (currentIndex < 9) {
        setCurrentIndex(c => c + 1);
        setSelectedAnswer(null);
      } else {
        const finalScore = score + (isCorrect ? 1 : 0);
        updateQuizScore(finalScore);
        setQuizState('finished');
      }
    }, 1500);
  };

  const getFeedbackMessage = (finalScore: number) => {
    if (finalScore === 10) return "Comrade! KGB level perfection!";
    if (finalScore >= 8) return "Excellent! The Party is pleased.";
    if (finalScore >= 5) return "Acceptable, but you must study harder for the motherland.";
    return "A bear in Siberia reads better. Try again.";
  };

  if (loading) return <div className="text-center font-serif text-2xl mt-12 animate-pulse">Preparing Exam...</div>;
  if (characters.length < 4) return <div className="text-center">Not enough data to generate quiz. (Need at least 4 items)</div>;

  return (
    <div className="max-w-xl mx-auto">
      <div className="flex justify-between items-end mb-8 border-b-2 border-vintage-ink pb-4">
        <h1 className="text-4xl text-vintage-ink m-0">The Exam</h1>
        <div className="text-sm font-mono font-bold text-vintage-red">
          High Score: {progress.quizHighScore}/10
        </div>
      </div>

      {quizState === 'start' && (
        <div className="vintage-card text-center p-12">
          <h2 className="text-2xl mb-4">Are you ready for evaluation?</h2>
          <p className="font-mono mb-8 opacity-80">You will be tested on 10 random characters.</p>
          <button onClick={generateQuiz} className="vintage-button text-xl">
            Commence Test
          </button>
        </div>
      )}

      {quizState === 'playing' && questions.length > 0 && (
        <div className="vintage-card p-8">
          <div className="flex justify-between font-mono text-sm mb-8">
            <span>Question {currentIndex + 1} of 10</span>
            <span>Score: {score}</span>
          </div>
          
          <div className="text-center mb-12">
            <h3 className="font-serif italic text-lg mb-4">
              {questions[currentIndex].type === 'target-to-english' 
                ? 'What is the phonetic sound of:'
                : 'Which character makes this sound:'}
            </h3>
            
            <div className="text-7xl font-serif font-bold text-vintage-ink p-8 border-2 border-vintage-ink inline-block bg-[#F9F6EE] shadow-[8px_8px_0_0_#C84B31]">
              {questions[currentIndex].type === 'target-to-english' 
                ? questions[currentIndex].target.character
                : `[${questions[currentIndex].target.phonetic}]`}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {questions[currentIndex].options.map((opt) => {
              const isSelected = selectedAnswer === opt.id;
              const isCorrectAnswer = questions[currentIndex].target.id === opt.id;
              
              let btnClass = "vintage-button-secondary text-xl py-4 flex items-center justify-center";
              if (selectedAnswer) {
                if (isCorrectAnswer) btnClass = "bg-green-600 text-white border-2 border-vintage-ink shadow-[4px_4px_0_0_#2C2A29] px-6 py-4 font-serif font-bold text-xl";
                else if (isSelected) btnClass = "bg-vintage-red text-white border-2 border-vintage-ink shadow-[4px_4px_0_0_#2C2A29] px-6 py-4 font-serif font-bold text-xl";
                else btnClass = "vintage-button-secondary text-xl py-4 opacity-50";
              }
              
              return (
                <button
                  key={opt.id}
                  disabled={selectedAnswer !== null}
                  onClick={() => handleAnswer(opt.id)}
                  className={btnClass}
                >
                  {questions[currentIndex].type === 'target-to-english' 
                    ? `[${opt.phonetic}]` 
                    : opt.character}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {quizState === 'finished' && (
        <div className="vintage-card text-center p-12">
          <h2 className="text-4xl mb-2 text-vintage-red font-bold">Evaluation Complete</h2>
          <div className="text-6xl font-serif my-8">{score}/10</div>
          <p className="font-mono text-lg mb-8 italic border-y-2 py-4 border-vintage-ink/20">
            "{getFeedbackMessage(score)}"
          </p>
          <button onClick={generateQuiz} className="vintage-button">
            Re-take Exam
          </button>
        </div>
      )}
    </div>
  );
}
