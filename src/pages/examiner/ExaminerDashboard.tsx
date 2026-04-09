import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Plus, Clock, Users, BarChart3, TrendingUp, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const performanceData = [
  { day: 'Mon', submissions: 12 }, { day: 'Tue', submissions: 19 }, { day: 'Wed', submissions: 8 },
  { day: 'Thu', submissions: 22 }, { day: 'Fri', submissions: 30 }, { day: 'Sat', submissions: 5 },
];

const recentExams = [
  { id: '1', title: 'JavaScript Fundamentals', students: 45, avgScore: 72, status: 'active' },
  { id: '2', title: 'React Advanced Concepts', students: 32, avgScore: 68, status: 'active' },
  { id: '3', title: 'Data Structures & Algorithms', students: 28, avgScore: 55, status: 'draft' },
  { id: '4', title: 'Python Basics', students: 60, avgScore: 81, status: 'completed' },
];

const statusColors: Record<string, string> = {
  active: 'bg-success/15 text-success border-success/20',
  draft: 'bg-warning/15 text-warning border-warning/20',
  completed: 'bg-muted text-muted-foreground border-border',
};

export default function ExaminerDashboard() {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold">Examiner Dashboard</h1>
            <p className="text-muted-foreground mt-1">Create and manage your assessments</p>
          </div>
          <Button onClick={() => navigate('/examiner/exams/new')} className="gradient-primary gap-2">
            <Plus className="h-4 w-4" /> Create Exam
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'Total Exams', value: '12', icon: <FileText className="h-5 w-5" />, color: 'text-primary' },
            { title: 'Active Now', value: '3', icon: <Clock className="h-5 w-5" />, color: 'text-success' },
            { title: 'Total Students', value: '165', icon: <Users className="h-5 w-5" />, color: 'text-accent' },
            { title: 'Avg Score', value: '69%', icon: <TrendingUp className="h-5 w-5" />, color: 'text-warning' },
          ].map((stat) => (
            <div key={stat.title} className="stat-card">
              <div className={`${stat.color} mb-2`}>{stat.icon}</div>
              <p className="font-display text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.title}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="font-display text-lg">Submissions This Week</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="day" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(220, 25%, 11%)', border: '1px solid hsl(220, 20%, 18%)', borderRadius: '8px', color: 'hsl(220, 14%, 92%)' }} />
                  <Area type="monotone" dataKey="submissions" stroke="hsl(160, 84%, 39%)" fill="hsl(160, 84%, 39%)" fillOpacity={0.15} strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Recent Exams */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="font-display text-lg">Recent Exams</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentExams.map((exam) => (
                <div key={exam.id} className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary/20 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{exam.title}</p>
                      <p className="text-xs text-muted-foreground">{exam.students} students · Avg {exam.avgScore}%</p>
                    </div>
                  </div>
                  <Badge variant="outline" className={statusColors[exam.status]}>
                    {exam.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
