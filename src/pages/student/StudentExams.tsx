import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Clock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const exams = [
  { id: '1', title: 'JavaScript Fundamentals', duration: 90, questions: 25, difficulty: 'Easy', status: 'available' },
  { id: '2', title: 'React Advanced Concepts', duration: 120, questions: 20, difficulty: 'Hard', status: 'available' },
  { id: '3', title: 'Data Structures & Algorithms', duration: 60, questions: 30, difficulty: 'Medium', status: 'upcoming' },
  { id: '4', title: 'Python Basics', duration: 45, questions: 20, difficulty: 'Easy', status: 'completed' },
  { id: '5', title: 'System Design', duration: 90, questions: 10, difficulty: 'Hard', status: 'available' },
  { id: '6', title: 'SQL Mastery', duration: 60, questions: 25, difficulty: 'Medium', status: 'upcoming' },
];

const diffColors: Record<string, string> = {
  Easy: 'bg-success/15 text-success border-success/20',
  Medium: 'bg-warning/15 text-warning border-warning/20',
  Hard: 'bg-destructive/15 text-destructive border-destructive/20',
};

const statusColors: Record<string, string> = {
  available: 'bg-primary/15 text-primary border-primary/20',
  upcoming: 'bg-info/15 text-info border-info/20',
  completed: 'bg-muted text-muted-foreground border-border',
};

export default function StudentExams() {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="font-display text-2xl font-bold">Available Exams</h1>
          <p className="text-muted-foreground mt-1">Browse and attempt assessments</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {exams.map((exam) => (
            <Card key={exam.id} className="exam-card flex flex-col">
              <CardContent className="flex-1 p-5 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="outline" className={diffColors[exam.difficulty]}>{exam.difficulty}</Badge>
                  <Badge variant="outline" className={statusColors[exam.status]}>{exam.status}</Badge>
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold">{exam.title}</h3>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {exam.duration} min</span>
                  <span>{exam.questions} questions</span>
                </div>
                <div className="mt-auto">
                  {exam.status === 'available' ? (
                    <Button className="w-full gradient-primary gap-1" onClick={() => navigate(`/student/exam/${exam.id}`)}>
                      Start Exam <ArrowRight className="h-4 w-4" />
                    </Button>
                  ) : exam.status === 'completed' ? (
                    <Button variant="outline" className="w-full" disabled>Completed</Button>
                  ) : (
                    <Button variant="outline" className="w-full" disabled>Coming Soon</Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
