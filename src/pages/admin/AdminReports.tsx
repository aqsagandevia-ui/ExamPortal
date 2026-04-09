import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { BarChart3, TrendingUp, Users, FileText } from 'lucide-react';

const monthlyData = [
  { month: 'Jan', exams: 15, users: 50 }, { month: 'Feb', exams: 22, users: 85 },
  { month: 'Mar', exams: 30, users: 120 }, { month: 'Apr', exams: 28, users: 160 },
  { month: 'May', exams: 35, users: 200 }, { month: 'Jun', exams: 42, users: 250 },
];

const topExams = [
  { name: 'JavaScript Fundamentals', attempts: 245, avgScore: 72 },
  { name: 'React Advanced', attempts: 180, avgScore: 68 },
  { name: 'Python Basics', attempts: 320, avgScore: 81 },
  { name: 'Data Structures', attempts: 150, avgScore: 55 },
  { name: 'System Design', attempts: 90, avgScore: 63 },
];

export default function AdminReports() {
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="font-display text-2xl font-bold">Reports & Analytics</h1>
          <p className="text-muted-foreground mt-1">Platform-wide analytics</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-display text-lg flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" /> Monthly Exams
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(220, 25%, 11%)', border: '1px solid hsl(220, 20%, 18%)', borderRadius: '8px', color: 'hsl(220, 14%, 92%)' }} />
                  <Bar dataKey="exams" fill="hsl(160, 84%, 39%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-display text-lg flex items-center gap-2">
                <Users className="h-5 w-5 text-accent" /> User Growth
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(220, 25%, 11%)', border: '1px solid hsl(220, 20%, 18%)', borderRadius: '8px', color: 'hsl(220, 14%, 92%)' }} />
                  <Line type="monotone" dataKey="users" stroke="hsl(263, 70%, 58%)" strokeWidth={2.5} dot={{ fill: 'hsl(263, 70%, 58%)', r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="font-display text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" /> Top Exams
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {topExams.map((exam, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-border">
                <div className="flex items-center gap-3">
                  <span className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center font-display font-bold text-sm text-primary">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-medium">{exam.name}</p>
                    <p className="text-xs text-muted-foreground">{exam.attempts} attempts</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-display font-bold">{exam.avgScore}%</p>
                  <p className="text-xs text-muted-foreground">avg score</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
