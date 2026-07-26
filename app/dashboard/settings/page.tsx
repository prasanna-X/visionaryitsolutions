// "/dashboard/settings" - general/site settings
import { getSettings } from '@/lib/services/settingsService';
import SettingsForm from '@/components/dashboard/settings/SettingsForm';

export default async function SettingsPage() {
  const settings = await getSettings();
  return <SettingsForm settings={settings} />;
}
