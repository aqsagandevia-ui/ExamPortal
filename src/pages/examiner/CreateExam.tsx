import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Plus, Trash2, Code, CheckCircle2, GripVertical, Save } from 'lucide-react';
import { toast } from 'sonner';

interface MCQOption {
  text: string;
  is_correct: boolean;
}

interface Question {
  id: string;
  type: 'mcq' | 'coding';
  title: string;
  description: string;
  marks: number;
  difficulty: 'easy' | 'medium' | 'hard';
  options: MCQOption[];
  starterCode: string;
  testCases: { input: string; expectedOutput: string }[];
}

export default function CreateExam() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(60);
  const [passingMarks, setPassingMarks] = useState(40);
  const [questions, setQuestions] = useState<Question[]>([]);

  const addQuestion = (type: 'mcq' | 'coding') => {
    const q: Question = {
      id: Date.now().toString(),
      type,
      title: '',
      description: '',
      marks: type === 'mcq' ? 2 : 5,
      difficulty: 'medium',
      options: type === 'mcq' ? [
        { text: '', is_correct: true },
        { text: '', is_correct: false },
        { text: '', is_correct: false },
        { text: '', is_correct: false },
      ] : [],
      starterCode: type === 'coding' ? 'function solution() {\n  // Your code here\n}' : '',
      testCases: type === 'coding' ? [{ input: '', expectedOutput: '' }] : [],
    };
    setQuestions([...questions, q]);
  };

  const updateQuestion = (id: string, updates: Partial<Question>) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, ...updates } : q)));
  };

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const updateOption = (qId: string, optIndex: number, updates: Partial<MCQOption>) => {
    setQuestions(questions.map((q) => {
      if (q.id !== qId) return q;
      const options = [...q.options];
      if (updates.is_correct) {
        options.forEach((o, i) => { o.is_correct = i === optIndex; });
      } else {
        options[optIndex] = { ...options[optIndex], ...updates };
      }
      return { ...q, options };
    }));
  };

  const handleSave = (publish: boolean) => {
    if (!title.trim()) { toast.error('Please enter an exam title'); return; }
    if (questions.length === 0) { toast.error('Add at least one question'); return; }
    toast.success(publish ? 'Exam published successfully!' : 'Exam saved as draft');
    navigate('/examiner/exams');
  };

  const totalMarks = questions.reduce((sum, q) => sum + q.marks, 0);

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in max-w-4xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold">Create Exam</h1>
            <p className="text-muted-foreground mt-1">Design your assessment</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => handleSave(false)}><Save className="h-4 w-4 mr-1" /> Save Draft</Button>
            <Button className="gradient-primary" onClick={() => handleSave(true)}>Publish</Button>
          </div>
        </div>

        {/* Exam Details */}
        <Card>
          <CardHeader><CardTitle className="font-display text-lg">Exam Details</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 md:col-span-2">
                <Label>Title</Label>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., JavaScript Fundamentals" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Description</Label>
                <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Brief description of the exam..." />
              </div>
              <div className="space-y-2">
                <Label>Duration (minutes)</Label>
                <Input type="number" value={duration} onChange={(e) => setDuration(Number(e.target.value))} min={10} />
              </div>
              <div className="space-y-2">
                <Label>Passing Marks (%)</Label>
                <Input type="number" value={passingMarks} onChange={(e) => setPassingMarks(Number(e.target.value))} min={0} max={100} />
              </div>
            </div>
            <div className="flex items-center gap-4 pt-2 text-sm text-muted-foreground">
              <span>Total Questions: <strong className="text-foreground">{questions.length}</strong></span>
              <span>Total Marks: <strong className="text-foreground">{totalMarks}</strong></span>
            </div>
          </CardContent>
        </Card>

        {/* Questions */}
        {questions.map((q, index) => (
          <Card key={q.id} className="border-l-4 border-l-primary/50">
            <CardHeader className="flex flex-row items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab" />
                <Badge variant="outline" className={q.type === 'coding' ? 'bg-accent/15 text-accent border-accent/20' : 'bg-primary/15 text-primary border-primary/20'}>
                  {q.type === 'coding' ? <><Code className="h-3 w-3 mr-1" /> Coding</> : <><CheckCircle2 className="h-3 w-3 mr-1" /> MCQ</>}
                </Badge>
                <span className="text-sm font-medium">Q{index + 1}</span>
              </div>
              <Button variant="ghost" size="icon" onClick={() => removeQuestion(q.id)} className="text-destructive hover:text-destructive">
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <Label>Question Title</Label>
                  <Input value={q.title} onChange={(e) => updateQuestion(q.id, { title: e.target.value })} placeholder="Enter question..." />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label>Marks</Label>
                    <Input type="number" value={q.marks} onChange={(e) => updateQuestion(q.id, { marks: Number(e.target.value) })} min={1} />
                  </div>
                  <div className="space-y-2">
                    <Label>Difficulty</Label>
                    <Select value={q.difficulty} onValueChange={(v) => updateQuestion(q.id, { difficulty: v as any })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {q.type === 'mcq' && (
                <div className="space-y-2">
                  <Label>Options (select correct answer)</Label>
                  {q.options.map((opt, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <button
                        onClick={() => updateOption(q.id, i, { is_correct: true })}
                        className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-medium shrink-0 transition-all ${
                          opt.is_correct ? 'gradient-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        }`}
                      >
                        {String.fromCharCode(65 + i)}
                      </button>
                      <Input
                        value={opt.text}
                        onChange={(e) => updateOption(q.id, i, { text: e.target.value })}
                        placeholder={`Option ${String.fromCharCode(65 + i)}`}
                      />
                    </div>
                  ))}
                </div>
              )}

              {q.type === 'coding' && (
                <>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea value={q.description} onChange={(e) => updateQuestion(q.id, { description: e.target.value })} placeholder="Describe the problem..." rows={3} />
                  </div>
                  <div className="space-y-2">
                    <Label>Starter Code</Label>
                    <Textarea
                      value={q.starterCode}
                      onChange={(e) => updateQuestion(q.id, { starterCode: e.target.value })}
                      className="font-mono text-sm"
                      rows={4}
                    />
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        ))}

        {/* Add Question Buttons */}
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => addQuestion('mcq')} className="flex-1 gap-2 py-6 border-dashed">
            <CheckCircle2 className="h-5 w-5 text-primary" /> Add MCQ Question
          </Button>
          <Button variant="outline" onClick={() => addQuestion('coding')} className="flex-1 gap-2 py-6 border-dashed">
            <Code className="h-5 w-5 text-accent" /> Add Coding Question
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
