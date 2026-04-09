import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, FileText, BarChart3, Shield, TrendingUp, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const examData = [
  { name: 'Mon', exams: 4 }, { name: 'Tue', exams: 7 }, { name: 'Wed', exams: 5 },
  { name: 'Thu', exams: 8 }, { name: 'Fri', exams: 12 }, { name: 'Sat', exams: 3 }, { name: 'Sun', exams: 2 },
];

const roleDistribution = [
  { name: 'Students', value: 450, color: 'hsl(160, 84%, 39%)' },
  { name: 'Examiners', value: 45, color: 'hsl(263, 70%, 58%)' },
  { name: 'Admins', value: 5, color: 'hsl(38, 92%, 50%)' },
];

const stats = [
  { title: 'Total Users', value: '500', change: '+12%', icon: <Users className="h-5 w-5" />, color: 'text-primary' },
  { title: 'Active Exams', value: '24', change: '+5%', icon: <FileText className="h-5 w-5" />, color: 'text-accent' },
  { title: 'Completion Rate', value: '87%', change: '+3%', icon: <BarChart3 className="h-5 w-5" />, color: 'text-success' },
  { title: 'Avg Score', value: '72%', change: '+8%', icon: <TrendingUp className="h-5 w-5" />, color: 'text-warning' },
];

export default function AdminDashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="font-display text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">Platform overview and management</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.title} className="stat-card">
              <div className="flex items-center justify-between mb-3">
                <div className={stat.color}>{stat.icon}</div>
                <span className="text-xs font-medium text-success bg-success/10 px-2 py-0.5 rounded-full">
                  {stat.change}
                </span>
              </div>
              <p className="font-display text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.title}</p>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="font-display text-lg flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Exam Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={examData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="name" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(220, 25%, 11%)',
                      border: '1px solid hsl(220, 20%, 18%)',
                      borderRadius: '8px',
                      color: 'hsl(220, 14%, 92%)',
                    }}
                  />
                  <Bar dataKey="exams" fill="hsl(160, 84%, 39%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-display text-lg flex items-center gap-2">
                <Shield className="h-5 w-5 text-accent" />
                User Roles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={roleDistribution} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" strokeWidth={0}>
                    {roleDistribution.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-2">
                {roleDistribution.map((item) => (
                  <div key={item.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-muted-foreground">{item.name}</span>
                    </div>
                    <span className="font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
