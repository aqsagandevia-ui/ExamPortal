import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Medal, Award, TrendingUp } from 'lucide-react';

const leaderboard = [
  { rank: 1, name: 'Alice Johnson', score: 945, exams: 12, avgScore: 92 },
  { rank: 2, name: 'Bob Smith', score: 920, exams: 14, avgScore: 88 },
  { rank: 3, name: 'Charlie Chen', score: 895, exams: 11, avgScore: 85 },
  { rank: 4, name: 'Diana Kumar', score: 870, exams: 13, avgScore: 82 },
  { rank: 5, name: 'Eve Williams', score: 850, exams: 10, avgScore: 80 },
  { rank: 6, name: 'Frank Miller', score: 830, exams: 12, avgScore: 78 },
  { rank: 7, name: 'Grace Lee', score: 810, exams: 11, avgScore: 76 },
  { rank: 8, name: 'Henry Brown', score: 790, exams: 9, avgScore: 75 },
  { rank: 9, name: 'Ivy Davis', score: 770, exams: 10, avgScore: 73 },
  { rank: 10, name: 'Jack Wilson', score: 750, exams: 8, avgScore: 71 },
];

const rankIcons: Record<number, React.ReactNode> = {
  1: <Trophy className="h-5 w-5 text-warning" />,
  2: <Medal className="h-5 w-5 text-muted-foreground" />,
  3: <Award className="h-5 w-5 text-warning/60" />,
};

export default function Leaderboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="font-display text-2xl font-bold">Leaderboard</h1>
          <p className="text-muted-foreground mt-1">Top performers across all exams</p>
        </div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {leaderboard.slice(0, 3).map((student, i) => (
            <Card key={student.rank} className={`text-center ${i === 0 ? 'md:order-2 border-warning/30' : i === 1 ? 'md:order-1' : 'md:order-3'}`}>
              <CardContent className="pt-6 pb-6">
                <div className="mb-3">{rankIcons[student.rank]}</div>
                <div className={`h-14 w-14 rounded-full mx-auto mb-3 flex items-center justify-center font-display font-bold text-xl ${
                  i === 0 ? 'gradient-primary text-primary-foreground shadow-glow' : 'bg-muted text-muted-foreground'
                }`}>
                  #{student.rank}
                </div>
                <h3 className="font-display font-semibold">{student.name}</h3>
                <p className="text-2xl font-bold font-display mt-1">{student.score}</p>
                <p className="text-xs text-muted-foreground mt-1">{student.exams} exams · Avg {student.avgScore}%</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Full list */}
        <Card>
          <CardHeader>
            <CardTitle className="font-display text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" /> Rankings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {leaderboard.map((student) => (
                <div key={student.rank} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <span className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      student.rank <= 3 ? 'gradient-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                    }`}>
                      {student.rank}
                    </span>
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-xs text-muted-foreground">{student.exams} exams completed</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-display font-bold">{student.score}</p>
                      <p className="text-xs text-muted-foreground">Avg {student.avgScore}%</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
