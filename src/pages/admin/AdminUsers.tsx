import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Users, Search, MoreVertical, Shield, PenTool, GraduationCap, Trash2, Edit } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useState } from 'react';

const users = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com', role: 'student', exams: 12, joined: '2024-01-15' },
  { id: '2', name: 'Bob Smith', email: 'bob@example.com', role: 'examiner', exams: 5, joined: '2024-02-01' },
  { id: '3', name: 'Charlie Chen', email: 'charlie@example.com', role: 'student', exams: 8, joined: '2024-02-10' },
  { id: '4', name: 'Diana Kumar', email: 'diana@example.com', role: 'admin', exams: 0, joined: '2024-01-01' },
  { id: '5', name: 'Eve Williams', email: 'eve@example.com', role: 'student', exams: 15, joined: '2024-03-01' },
  { id: '6', name: 'Frank Miller', email: 'frank@example.com', role: 'examiner', exams: 3, joined: '2024-02-20' },
];

const roleIcons: Record<string, React.ReactNode> = {
  admin: <Shield className="h-3.5 w-3.5" />,
  examiner: <PenTool className="h-3.5 w-3.5" />,
  student: <GraduationCap className="h-3.5 w-3.5" />,
};

const roleColors: Record<string, string> = {
  admin: 'bg-destructive/15 text-destructive border-destructive/20',
  examiner: 'bg-accent/15 text-accent border-accent/20',
  student: 'bg-primary/15 text-primary border-primary/20',
};

export default function AdminUsers() {
  const [search, setSearch] = useState('');
  const filtered = users.filter((u) => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold">Users</h1>
            <p className="text-muted-foreground mt-1">Manage platform users</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input className="pl-9 w-60" placeholder="Search users..." value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {filtered.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-display font-bold text-primary">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant="outline" className={`gap-1 ${roleColors[user.role]}`}>
                      {roleIcons[user.role]} {user.role}
                    </Badge>
                    <span className="text-sm text-muted-foreground hidden sm:inline">{user.exams} exams</span>
                    <span className="text-sm text-muted-foreground hidden md:inline">{user.joined}</span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem><Edit className="h-4 w-4 mr-2" /> Edit Role</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive"><Trash2 className="h-4 w-4 mr-2" /> Remove</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
