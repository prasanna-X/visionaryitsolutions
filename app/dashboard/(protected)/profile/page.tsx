// "/dashboard/profile"
import { redirect } from 'next/navigation';
import ProfileCard from '@/components/dashboard/profile/ProfileCard';
import { getCurrentAdmin } from '@/lib/services/authService';

export default async function ProfilePage() {
  const admin = await getCurrentAdmin();

  if (!admin) {
    redirect('/login');
  }

  return <ProfileCard admin={admin} />;
}