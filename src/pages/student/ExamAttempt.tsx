import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Clock, ChevronLeft, ChevronRight, Flag, Send, AlertTriangle,
  Maximize, Eye, Code, CheckCircle2
} from 'lucide-react';
import { toast } from 'sonner';

interface Question {
  id: string;
  type: 'mcq' | 'coding';
  title: string;
  description?: string;
  marks: number;
  difficulty: 'easy' | 'medium' | 'hard';
  options?: { text: string; is_correct: boolean }[];
  starterCode?: string;
}

// Demo questions
const demoQuestions: Question[] = [
  {
    id: '1', type: 'mcq', title: 'What is the output of typeof null in JavaScript?',
    marks: 2, difficulty: 'easy',
    options: [
      { text: '"null"', is_correct: false },
      { text: '"object"', is_correct: true },
      { text: '"undefined"', is_correct: false },
      { text: '"number"', is_correct: false },
    ],
  },
  {
    id: '2', type: 'mcq', title: 'Which hook is used for side effects in React?',
    marks: 2, difficulty: 'easy',
    options: [
      { text: 'useState', is_correct: false },
      { text: 'useEffect', is_correct: true },
      { text: 'useContext', is_correct: false },
      { text: 'useReducer', is_correct: false },
    ],
  },
  {
    id: '3', type: 'mcq', title: 'What is the time complexity of binary search?',
    marks: 3, difficulty: 'medium',
    options: [
      { text: 'O(n)', is_correct: false },
      { text: 'O(n log n)', is_correct: false },
      { text: 'O(log n)', is_correct: true },
      { text: 'O(1)', is_correct: false },
    ],
  },
  {
    id: '4', type: 'coding', title: 'Reverse a String',
    description: 'Write a function that takes a string and returns it reversed. Do not use the built-in reverse method.',
    marks: 5, difficulty: 'easy',
    starterCode: 'function reverseString(str) {\n  // Your code here\n}',
  },
  {
    id: '5', type: 'coding', title: 'Two Sum',
    description: 'Given an array of integers and a target, return indices of the two numbers that add up to the target.',
    marks: 8, difficulty: 'medium',
    starterCode: 'function twoSum(nums, target) {\n  // Your code here\n}',
  },
];

const difficultyColors = {
  easy: 'bg-success/15 text-success border-success/20',
  medium: 'bg-warning/15 text-warning border-warning/20',
  hard: 'bg-destructive/15 text-destructive border-destructive/20',
};

export default function ExamAttempt() {
  const navigate = useNavigate();
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number | string>>({});
  const [flagged, setFlagged] = useState<Set<string>>(new Set());
  const [timeLeft, setTimeLeft] = useState(90 * 60); // 90 min
  const [violations, setViolations] = useState<string[]>([]);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const question = demoQuestions[currentQ];
  const progress = ((currentQ + 1) / demoQuestions.length) * 100;

  // Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Anti-cheat: tab switch detection
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        const v = `Tab switch at ${new Date().toLocaleTimeString()}`;
        setViolations((prev) => [...prev, v]);
        toast.warning('Tab switch detected! This will be reported.');
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  // Anti-cheat: disable right-click and copy
  useEffect(() => {
    const preventContext = (e: MouseEvent) => { e.preventDefault(); toast.warning('Right-click is disabled during exam.'); };
    const preventCopy = (e: ClipboardEvent) => { e.preventDefault(); toast.warning('Copy/paste is disabled during exam.'); };
    document.addEventListener('contextmenu', preventContext);
    document.addEventListener('copy', preventCopy);
    document.addEventListener('paste', preventCopy);
    return () => {
      document.removeEventListener('contextmenu', preventContext);
      document.removeEventListener('copy', preventCopy);
      document.removeEventListener('paste', preventCopy);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (questionId: string, answer: number | string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const toggleFlag = (questionId: string) => {
    setFlagged((prev) => {
      const next = new Set(prev);
      next.has(questionId) ? next.delete(questionId) : next.add(questionId);
      return next;
    });
  };

  const enterFullscreen = () => {
    document.documentElement.requestFullscreen?.();
    setIsFullscreen(true);
  };

  const handleSubmit = () => {
    // Calculate score
    let score = 0;
    let total = 0;
    demoQuestions.forEach((q) => {
      total += q.marks;
      if (q.type === 'mcq' && q.options) {
        const selected = answers[q.id] as number;
        if (selected !== undefined && q.options[selected]?.is_correct) {
          score += q.marks;
        }
      }
    });
    toast.success(`Exam submitted! Score: ${score}/${total}`);
    navigate('/student/results');
  };

  const isTimeWarning = timeLeft < 300;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top bar */}
      <header className="bg-card border-b border-border px-4 py-3 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <h1 className="font-display font-bold text-lg hidden sm:block">JavaScript Assessment</h1>
          <Badge variant="outline" className="text-xs">
            Q {currentQ + 1}/{demoQuestions.length}
          </Badge>
        </div>
        <div className="flex items-center gap-3">
          {violations.length > 0 && (
            <Badge variant="outline" className="bg-destructive/15 text-destructive border-destructive/20 gap-1">
              <AlertTriangle className="h-3 w-3" /> {violations.length} violations
            </Badge>
          )}
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-sm font-medium ${
            isTimeWarning ? 'bg-destructive/15 text-destructive animate-pulse' : 'bg-muted'
          }`}>
            <Clock className="h-4 w-4" />
            {formatTime(timeLeft)}
          </div>
          {!isFullscreen && (
            <Button variant="outline" size="sm" onClick={enterFullscreen} className="gap-1">
              <Maximize className="h-4 w-4" /> Fullscreen
            </Button>
          )}
          <Button onClick={handleSubmit} className="gradient-primary gap-1" size="sm">
            <Send className="h-4 w-4" /> Submit
          </Button>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Question navigator sidebar */}
        <aside className="hidden md:flex flex-col w-16 lg:w-20 bg-card border-r border-border py-4 items-center gap-2 overflow-y-auto">
          {demoQuestions.map((q, i) => {
            const isAnswered = answers[q.id] !== undefined;
            const isFlagged = flagged.has(q.id);
            const isCurrent = i === currentQ;
            return (
              <button
                key={q.id}
                onClick={() => setCurrentQ(i)}
                className={`relative h-10 w-10 rounded-lg text-sm font-medium transition-all flex items-center justify-center ${
                  isCurrent ? 'gradient-primary text-primary-foreground shadow-glow' :
                  isAnswered ? 'bg-success/15 text-success border border-success/20' :
                  'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {i + 1}
                {isFlagged && (
                  <Flag className="absolute -top-1 -right-1 h-3 w-3 text-warning fill-warning" />
                )}
              </button>
            );
          })}
        </aside>

        {/* Main question area */}
        <div className="flex-1 p-4 md:p-6 lg:p-8 max-w-4xl mx-auto w-full">
          <Progress value={progress} className="mb-6 h-1.5" />

          <div className="space-y-6 animate-fade-in" key={question.id}>
            {/* Question header */}
            <div className="flex items-center gap-3 flex-wrap">
              <Badge variant="outline" className={difficultyColors[question.difficulty]}>
                {question.difficulty}
              </Badge>
              <Badge variant="outline" className="bg-muted text-muted-foreground">
                {question.marks} marks
              </Badge>
              <Badge variant="outline" className={question.type === 'coding' ? 'bg-accent/15 text-accent border-accent/20' : 'bg-primary/15 text-primary border-primary/20'}>
                {question.type === 'coding' ? <><Code className="h-3 w-3 mr-1" /> Coding</> : <><CheckCircle2 className="h-3 w-3 mr-1" /> MCQ</>}
              </Badge>
              <button onClick={() => toggleFlag(question.id)} className={`ml-auto flex items-center gap-1 text-sm ${flagged.has(question.id) ? 'text-warning' : 'text-muted-foreground hover:text-foreground'}`}>
                <Flag className={`h-4 w-4 ${flagged.has(question.id) ? 'fill-warning' : ''}`} />
                {flagged.has(question.id) ? 'Flagged' : 'Flag'}
              </button>
            </div>

            {/* Question content */}
            <h2 className="font-display text-xl font-semibold">{question.title}</h2>
            {question.description && <p className="text-muted-foreground leading-relaxed">{question.description}</p>}

            {/* MCQ Options */}
            {question.type === 'mcq' && question.options && (
              <div className="space-y-3">
                {question.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(question.id, i)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all flex items-center gap-3 ${
                      answers[question.id] === i
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-muted-foreground/30'
                    }`}
                  >
                    <span className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium shrink-0 ${
                      answers[question.id] === i ? 'gradient-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                    }`}>
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="text-sm">{opt.text}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Coding Editor */}
            {question.type === 'coding' && (
              <div className="code-editor-container">
                <div className="flex items-center gap-2 px-4 py-2.5 bg-muted/50 border-b border-border">
                  <Code className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs font-mono text-muted-foreground">solution.js</span>
                </div>
                <textarea
                  className="w-full min-h-[300px] p-4 bg-card font-mono text-sm resize-y focus:outline-none"
                  value={(answers[question.id] as string) || question.starterCode || ''}
                  onChange={(e) => handleAnswer(question.id, e.target.value)}
                  spellCheck={false}
                />
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between pt-4">
              <Button
                variant="outline"
                onClick={() => setCurrentQ(Math.max(0, currentQ - 1))}
                disabled={currentQ === 0}
                className="gap-1"
              >
                <ChevronLeft className="h-4 w-4" /> Previous
              </Button>

              {/* Mobile question dots */}
              <div className="flex md:hidden gap-1.5">
                {demoQuestions.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentQ(i)}
                    className={`h-2.5 w-2.5 rounded-full transition-all ${
                      i === currentQ ? 'bg-primary scale-125' :
                      answers[demoQuestions[i].id] !== undefined ? 'bg-success' : 'bg-muted'
                    }`}
                  />
                ))}
              </div>

              {currentQ < demoQuestions.length - 1 ? (
                <Button onClick={() => setCurrentQ(currentQ + 1)} className="gap-1">
                  Next <ChevronRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} className="gradient-primary gap-1">
                  <Send className="h-4 w-4" /> Submit Exam
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
