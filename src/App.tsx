import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminReports from "./pages/admin/AdminReports";

import ExaminerDashboard from "./pages/examiner/ExaminerDashboard";
import ExaminerExams from "./pages/examiner/ExaminerExams";
import CreateExam from "./pages/examiner/CreateExam";
import ExaminerResults from "./pages/examiner/ExaminerResults";

import StudentDashboard from "./pages/student/StudentDashboard";
import StudentExams from "./pages/student/StudentExams";
import StudentResults from "./pages/student/StudentResults";
import ExamAttempt from "./pages/student/ExamAttempt";
import Leaderboard from "./pages/student/Leaderboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/users" element={<ProtectedRoute allowedRoles={['admin']}><AdminUsers /></ProtectedRoute>} />
            <Route path="/admin/exams" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/exams/new" element={<ProtectedRoute allowedRoles={['admin']}><CreateExam /></ProtectedRoute>} />
            <Route path="/admin/reports" element={<ProtectedRoute allowedRoles={['admin']}><AdminReports /></ProtectedRoute>} />
            <Route path="/admin/settings" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />

            {/* Examiner Routes */}
            <Route path="/examiner" element={<ProtectedRoute allowedRoles={['examiner']}><ExaminerDashboard /></ProtectedRoute>} />
            <Route path="/examiner/exams" element={<ProtectedRoute allowedRoles={['examiner']}><ExaminerExams /></ProtectedRoute>} />
            <Route path="/examiner/exams/new" element={<ProtectedRoute allowedRoles={['examiner']}><CreateExam /></ProtectedRoute>} />
            <Route path="/examiner/results" element={<ProtectedRoute allowedRoles={['examiner']}><ExaminerResults /></ProtectedRoute>} />

            {/* Student Routes */}
            <Route path="/student" element={<ProtectedRoute allowedRoles={['student']}><StudentDashboard /></ProtectedRoute>} />
            <Route path="/student/exams" element={<ProtectedRoute allowedRoles={['student']}><StudentExams /></ProtectedRoute>} />
            <Route path="/student/exam/:id" element={<ProtectedRoute allowedRoles={['student']}><ExamAttempt /></ProtectedRoute>} />
            <Route path="/student/results" element={<ProtectedRoute allowedRoles={['student']}><StudentResults /></ProtectedRoute>} />
            <Route path="/student/leaderboard" element={<ProtectedRoute allowedRoles={['student']}><Leaderboard /></ProtectedRoute>} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
