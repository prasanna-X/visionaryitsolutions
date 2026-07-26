// "/dashboard/login" - the ONLY public entry point under /dashboard
import LoginForm from '@/components/dashboard/auth/LoginForm';

export default function DashboardLoginPage() {
  return (
    <div>
      <h1>Admin Login</h1>
      <LoginForm />
    </div>
  );
}
