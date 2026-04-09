import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { BarChart3, Users, CheckCircle, AlertCircle } from 'lucide-react';

const scoreDistribution = [
  { range: '0-20', count: 5 }, { range: '21-40', count: 12 }, { range: '41-60', count: 25 },
  { range: '61-80', count: 35 }, { range: '81-100', count: 23 },
];

const passFailData = [
  { name: 'Passed', value: 78, color: 'hsl(160, 84%, 39%)' },
  { name: 'Failed', value: 22, color: 'hsl(0, 72%, 51%)' },
];

const examResults = [
  { exam: 'JavaScript Fundamentals', attempts: 45, avgScore: 72, passRate: 82 },
  { exam: 'React Advanced', attempts: 32, avgScore: 68, passRate: 75 },
  { exam: 'Python Basics', attempts: 60, avgScore: 81, passRate: 90 },
  { exam: 'Data Structures', attempts: 28, avgScore: 55, passRate: 60 },
];

export default function ExaminerResults() {
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="font-display text-2xl font-bold">Exam Results</h1>
          <p className="text-muted-foreground mt-1">Analyze student performance</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="font-display text-lg flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" /> Score Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={scoreDistribution}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="range" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(220, 25%, 11%)', border: '1px solid hsl(220, 20%, 18%)', borderRadius: '8px', color: 'hsl(220, 14%, 92%)' }} />
                  <Bar dataKey="count" fill="hsl(160, 84%, 39%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-display text-lg">Pass/Fail Rate</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={passFailData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" strokeWidth={0}>
                    {passFailData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex gap-6 mt-2">
                {passFailData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2 text-sm">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-muted-foreground">{item.name}: {item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="font-display text-lg">Exam-wise Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {examResults.map((exam, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-primary/20 transition-colors">
                <div>
                  <h3 className="font-medium">{exam.exam}</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    <Users className="inline h-3 w-3 mr-1" />{exam.attempts} attempts · Avg {exam.avgScore}%
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="font-display font-bold text-lg">{exam.passRate}%</p>
                    <p className="text-xs text-muted-foreground">pass rate</p>
                  </div>
                  <Badge variant="outline" className={exam.passRate >= 70 ? 'bg-success/15 text-success border-success/20' : 'bg-warning/15 text-warning border-warning/20'}>
                    {exam.passRate >= 70 ? <CheckCircle className="h-3 w-3 mr-1" /> : <AlertCircle className="h-3 w-3 mr-1" />}
                    {exam.passRate >= 70 ? 'Good' : 'Review'}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
