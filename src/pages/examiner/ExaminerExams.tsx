import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Plus, Clock, Users, MoreVertical, Edit, Trash2, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const exams = [
  { id: '1', title: 'JavaScript Fundamentals', questions: 25, duration: 90, students: 45, status: 'published', created: '2024-03-15' },
  { id: '2', title: 'React Advanced Concepts', questions: 20, duration: 120, students: 32, status: 'published', created: '2024-03-10' },
  { id: '3', title: 'Data Structures & Algorithms', questions: 30, duration: 60, students: 0, status: 'draft', created: '2024-03-08' },
  { id: '4', title: 'Python Basics', questions: 20, duration: 45, students: 60, status: 'published', created: '2024-02-28' },
  { id: '5', title: 'Node.js Mastery', questions: 15, duration: 90, students: 0, status: 'draft', created: '2024-02-25' },
];

const statusColors: Record<string, string> = {
  published: 'bg-success/15 text-success border-success/20',
  draft: 'bg-warning/15 text-warning border-warning/20',
};

export default function ExaminerExams() {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold">My Exams</h1>
            <p className="text-muted-foreground mt-1">Manage your assessments</p>
          </div>
          <Button onClick={() => navigate('/examiner/exams/new')} className="gradient-primary gap-2">
            <Plus className="h-4 w-4" /> New Exam
          </Button>
        </div>

        <div className="space-y-3">
          {exams.map((exam) => (
            <Card key={exam.id} className="hover:border-primary/20 transition-colors">
              <CardContent className="flex items-center justify-between p-5">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold">{exam.title}</h3>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                      <span>{exam.questions} questions</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {exam.duration} min</span>
                      <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {exam.students} students</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className={statusColors[exam.status]}>{exam.status}</Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem><Eye className="h-4 w-4 mr-2" /> Preview</DropdownMenuItem>
                      <DropdownMenuItem><Edit className="h-4 w-4 mr-2" /> Edit</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive"><Trash2 className="h-4 w-4 mr-2" /> Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
