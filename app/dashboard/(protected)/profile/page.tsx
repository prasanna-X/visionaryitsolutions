// "/dashboard/profile" - logged-in admin's own details
import { getCurrentAdmin } from '@/lib/services/authService';

export default async function ProfilePage() {
  const admin = await getCurrentAdmin();
  return <div>Profile: {admin?.name}</div>;
}
