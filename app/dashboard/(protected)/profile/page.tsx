// "/dashboard/profile" - logged-in admin's own details
import ProfileCard from '@/components/dashboard/profile/ProfileCard';
import { getCurrentAdmin } from '@/lib/services/authService';

export default async function ProfilePage() {
  const admin = await getCurrentAdmin();
  return <ProfileCard admin={admin} />;
}
