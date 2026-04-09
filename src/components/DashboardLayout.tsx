import { ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  LayoutDashboard, FileText, Users, BarChart3, Settings, LogOut,
  ChevronLeft, ChevronRight, GraduationCap, PenTool, Shield, Menu, X
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavItem {
  label: string;
  path: string;
  icon: ReactNode;
}

const navItems: Record<string, NavItem[]> = {
  admin: [
    { label: 'Dashboard', path: '/admin', icon: <LayoutDashboard className="h-5 w-5" /> },
    { label: 'Users', path: '/admin/users', icon: <Users className="h-5 w-5" /> },
    { label: 'Exams', path: '/admin/exams', icon: <FileText className="h-5 w-5" /> },
    { label: 'Create Exam', path: '/admin/exams/new', icon: <PenTool className="h-5 w-5" /> },
    { label: 'Reports', path: '/admin/reports', icon: <BarChart3 className="h-5 w-5" /> },
    { label: 'Settings', path: '/admin/settings', icon: <Settings className="h-5 w-5" /> },
  ],
  examiner: [
    { label: 'Dashboard', path: '/examiner', icon: <LayoutDashboard className="h-5 w-5" /> },
    { label: 'My Exams', path: '/examiner/exams', icon: <FileText className="h-5 w-5" /> },
    { label: 'Create Exam', path: '/examiner/exams/new', icon: <PenTool className="h-5 w-5" /> },
    { label: 'Results', path: '/examiner/results', icon: <BarChart3 className="h-5 w-5" /> },
  ],
  student: [
    { label: 'Dashboard', path: '/student', icon: <LayoutDashboard className="h-5 w-5" /> },
    { label: 'Exams', path: '/student/exams', icon: <FileText className="h-5 w-5" /> },
    { label: 'My Results', path: '/student/results', icon: <BarChart3 className="h-5 w-5" /> },
    { label: 'Leaderboard', path: '/student/leaderboard', icon: <GraduationCap className="h-5 w-5" /> },
  ],
};

const roleLabels = { admin: 'Administrator', examiner: 'Examiner', student: 'Student' };
const roleIcons = {
  admin: <Shield className="h-5 w-5" />,
  examiner: <PenTool className="h-5 w-5" />,
  student: <GraduationCap className="h-5 w-5" />,
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { role, user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const items = role ? navItems[role] || [] : [];
  const currentRole = role || 'student';

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-sidebar-border">
        <div className="h-9 w-9 rounded-lg gradient-primary flex items-center justify-center shrink-0">
          <GraduationCap className="h-5 w-5 text-primary-foreground" />
        </div>
        {!collapsed && <span className="font-display font-bold text-lg text-sidebar-primary-foreground">ExamForge</span>}
      </div>

      {/* Role badge */}
      {!collapsed && (
        <div className="px-4 py-3">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-sidebar-accent">
            {roleIcons[currentRole as keyof typeof roleIcons]}
            <span className="text-sm font-medium text-sidebar-accent-foreground">
              {roleLabels[currentRole as keyof typeof roleLabels]}
            </span>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {items.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={isActive ? 'sidebar-item-active' : 'sidebar-item'}
              title={collapsed ? item.label : undefined}
            >
              {item.icon}
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* User + Logout */}
      <div className="px-3 py-4 border-t border-sidebar-border space-y-2">
        {!collapsed && (
          <div className="px-3 py-2">
            <p className="text-sm font-medium text-sidebar-accent-foreground truncate">
              {user?.email}
            </p>
          </div>
        )}
        <button onClick={handleSignOut} className="sidebar-item w-full" title="Sign out">
          <LogOut className="h-5 w-5" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-background">
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-200 ${
          collapsed ? 'w-[68px]' : 'w-64'
        }`}
      >
        <SidebarContent />
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute bottom-20 -right-3 h-6 w-6 rounded-full bg-sidebar border border-sidebar-border flex items-center justify-center text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
          style={{ left: collapsed ? '56px' : '248px' }}
        >
          {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
        </button>
      </aside>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="w-64 bg-sidebar border-r border-sidebar-border">
            <SidebarContent />
          </div>
          <div className="flex-1 bg-foreground/20 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Mobile header */}
        <header className="lg:hidden flex items-center gap-3 px-4 py-3 border-b border-border bg-card">
          <Button variant="ghost" size="icon" onClick={() => setMobileOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
          <span className="font-display font-bold text-lg">ExamForge</span>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
