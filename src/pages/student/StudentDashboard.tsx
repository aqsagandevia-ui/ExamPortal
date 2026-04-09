import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Clock, Trophy, TrendingUp, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const scoreHistory = [
  { exam: 'JS Basics', score: 65 }, { exam: 'React', score: 78 }, { exam: 'Node.js', score: 72 },
  { exam: 'TypeScript', score: 85 }, { exam: 'DSA', score: 60 }, { exam: 'System Design', score: 90 },
];

const upcomingExams = [
  { id: '1', title: 'Advanced React Patterns', duration: 90, questions: 25, startsIn: '2 hours' },
  { id: '2', title: 'System Design Fundamentals', duration: 120, questions: 15, startsIn: '1 day' },
  { id: '3', title: 'Database Management', duration: 60, questions: 30, startsIn: '3 days' },
];

const recentResults = [
  { exam: 'JavaScript Fundamentals', score: 85, total: 100, passed: true },
  { exam: 'Python Advanced', score: 72, total: 100, passed: true },
  { exam: 'Data Structures', score: 35, total: 100, passed: false },
];

export default function StudentDashboard() {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="font-display text-2xl font-bold">Student Dashboard</h1>
          <p className="text-muted-foreground mt-1">Track your progress and upcoming exams</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'Exams Taken', value: '14', icon: <FileText className="h-5 w-5" />, color: 'text-primary' },
            { title: 'Avg Score', value: '75%', icon: <TrendingUp className="h-5 w-5" />, color: 'text-success' },
            { title: 'Rank', value: '#12', icon: <Trophy className="h-5 w-5" />, color: 'text-warning' },
            { title: 'Upcoming', value: '3', icon: <Clock className="h-5 w-5" />, color: 'text-accent' },
          ].map((stat) => (
            <div key={stat.title} className="stat-card">
              <div className={`${stat.color} mb-2`}>{stat.icon}</div>
              <p className="font-display text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.title}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Score Trend */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="font-display text-lg">Score Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={scoreHistory}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="exam" className="text-xs" />
                  <YAxis domain={[0, 100]} className="text-xs" />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(220, 25%, 11%)', border: '1px solid hsl(220, 20%, 18%)', borderRadius: '8px', color: 'hsl(220, 14%, 92%)' }} />
                  <Line type="monotone" dataKey="score" stroke="hsl(160, 84%, 39%)" strokeWidth={2.5} dot={{ fill: 'hsl(160, 84%, 39%)', r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Recent Results */}
          <Card>
            <CardHeader>
              <CardTitle className="font-display text-lg">Recent Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentResults.map((result, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-border">
                  {result.passed ? (
                    <CheckCircle className="h-5 w-5 text-success shrink-0" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-destructive shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{result.exam}</p>
                    <p className="text-xs text-muted-foreground">{result.score}/{result.total}</p>
                  </div>
                  <Badge variant="outline" className={result.passed ? 'bg-success/15 text-success border-success/20' : 'bg-destructive/15 text-destructive border-destructive/20'}>
                    {result.passed ? 'Passed' : 'Failed'}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Exams */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-display text-lg">Upcoming Exams</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => navigate('/student/exams')} className="text-primary gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {upcomingExams.map((exam) => (
                <div key={exam.id} className="exam-card">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <FileText className="h-4 w-4 text-primary" />
                    </div>
                    <Badge variant="outline" className="bg-info/15 text-info border-info/20 text-xs">
                      Starts in {exam.startsIn}
                    </Badge>
                  </div>
                  <h3 className="font-medium text-sm mb-2">{exam.title}</h3>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {exam.duration} min</span>
                    <span>{exam.questions} questions</span>
                  </div>
                  <Button size="sm" className="w-full mt-3 gradient-primary" onClick={() => navigate(`/student/exam/${exam.id}`)}>
                    Start Exam
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
