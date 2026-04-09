import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const results = [
  { exam: 'JavaScript Fundamentals', score: 85, total: 100, passed: true, date: '2024-03-15', duration: '78 min' },
  { exam: 'React Advanced', score: 72, total: 100, passed: true, date: '2024-03-10', duration: '112 min' },
  { exam: 'Data Structures', score: 35, total: 100, passed: false, date: '2024-03-05', duration: '55 min' },
  { exam: 'Python Basics', score: 92, total: 100, passed: true, date: '2024-02-28', duration: '32 min' },
  { exam: 'Node.js Advanced', score: 67, total: 100, passed: true, date: '2024-02-20', duration: '88 min' },
];

const chartData = results.map((r) => ({ name: r.exam.split(' ')[0], score: r.score, passing: 40 })).reverse();

export default function StudentResults() {
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="font-display text-2xl font-bold">My Results</h1>
          <p className="text-muted-foreground mt-1">Your exam history and performance</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="font-display text-lg flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" /> Score Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="name" className="text-xs" />
                <YAxis domain={[0, 100]} className="text-xs" />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(220, 25%, 11%)', border: '1px solid hsl(220, 20%, 18%)', borderRadius: '8px', color: 'hsl(220, 14%, 92%)' }} />
                <Bar dataKey="score" fill="hsl(160, 84%, 39%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="passing" fill="hsl(0, 72%, 51%)" radius={[4, 4, 0, 0]} opacity={0.3} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="space-y-3">
          {results.map((result, i) => (
            <Card key={i} className="hover:border-primary/20 transition-colors">
              <CardContent className="flex items-center justify-between p-5">
                <div className="flex items-center gap-4">
                  {result.passed ? (
                    <div className="h-10 w-10 rounded-full bg-success/15 flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-success" />
                    </div>
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-destructive/15 flex items-center justify-center">
                      <AlertCircle className="h-5 w-5 text-destructive" />
                    </div>
                  )}
                  <div>
                    <h3 className="font-medium">{result.exam}</h3>
                    <p className="text-sm text-muted-foreground">{result.date} · {result.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="font-display text-xl font-bold">{result.score}%</p>
                    <p className="text-xs text-muted-foreground">{result.score}/{result.total}</p>
                  </div>
                  <Badge variant="outline" className={result.passed ? 'bg-success/15 text-success border-success/20' : 'bg-destructive/15 text-destructive border-destructive/20'}>
                    {result.passed ? 'Passed' : 'Failed'}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
