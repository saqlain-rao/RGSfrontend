import { useState, useEffect } from 'react';
import { Settings as SettingsType } from '../../../types';
import { getSettings, updateSettings } from '../../../services/api';
import { Save, Loader2, AlertCircle } from 'lucide-react';

export default function SettingsCMS() {
  const [settings, setSettings] = useState<SettingsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const data = await getSettings();
      setSettings(data);
    } catch (err: any) {
      setError('Failed to fetch settings');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    
    setSaving(true);
    setError('');
    setSuccess('');
    
    try {
      // @ts-ignore (assuming _id exists on the returned object despite interface)
      const updated = await updateSettings(settings._id, settings);
      setSettings(updated);
      setSuccess('Settings updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to update settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  }

  if (!settings) {
    return <div className="text-red-500">Settings not found in database.</div>;
  }

  return (
    <div className="max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Global Settings</h1>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 mb-6 flex items-center gap-3">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-500/10 border border-green-500/50 text-green-500 p-4 mb-6 font-medium">
          {success}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8 bg-zinc-900 border border-zinc-800 p-8">
        
        {/* Company Info */}
        <section>
          <h2 className="text-xl font-semibold text-primary mb-4 border-b border-zinc-800 pb-2">Company Details</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Company Name</label>
              <input
                type="text"
                value={settings.companyName}
                onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                className="w-full bg-black border border-zinc-700 px-4 py-2 text-white focus:border-primary outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Contact Email</label>
              <input
                type="email"
                value={settings.contactEmail}
                onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                className="w-full bg-black border border-zinc-700 px-4 py-2 text-white focus:border-primary outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Contact Phone</label>
              <input
                type="text"
                value={settings.contactPhone}
                onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                className="w-full bg-black border border-zinc-700 px-4 py-2 text-white focus:border-primary outline-none"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm text-gray-400 mb-2">Address</label>
              <input
                type="text"
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                className="w-full bg-black border border-zinc-700 px-4 py-2 text-white focus:border-primary outline-none"
              />
            </div>
          </div>
        </section>

        {/* Social Links */}
        <section>
          <h2 className="text-xl font-semibold text-primary mb-4 border-b border-zinc-800 pb-2">Social Media Links</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Facebook URL</label>
              <input
                type="url"
                value={settings.socialLinks?.facebook || ''}
                onChange={(e) => setSettings({ ...settings, socialLinks: { ...settings.socialLinks, facebook: e.target.value } })}
                className="w-full bg-black border border-zinc-700 px-4 py-2 text-white focus:border-primary outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">LinkedIn URL</label>
              <input
                type="url"
                value={settings.socialLinks?.linkedin || ''}
                onChange={(e) => setSettings({ ...settings, socialLinks: { ...settings.socialLinks, linkedin: e.target.value } })}
                className="w-full bg-black border border-zinc-700 px-4 py-2 text-white focus:border-primary outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Twitter URL</label>
              <input
                type="url"
                value={settings.socialLinks?.twitter || ''}
                onChange={(e) => setSettings({ ...settings, socialLinks: { ...settings.socialLinks, twitter: e.target.value } })}
                className="w-full bg-black border border-zinc-700 px-4 py-2 text-white focus:border-primary outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Instagram URL</label>
              <input
                type="url"
                value={settings.socialLinks?.instagram || ''}
                onChange={(e) => setSettings({ ...settings, socialLinks: { ...settings.socialLinks, instagram: e.target.value } })}
                className="w-full bg-black border border-zinc-700 px-4 py-2 text-white focus:border-primary outline-none"
              />
            </div>
          </div>
        </section>

        <div className="pt-6">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 bg-primary text-black font-bold px-6 py-3 hover:bg-white transition-colors disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}
