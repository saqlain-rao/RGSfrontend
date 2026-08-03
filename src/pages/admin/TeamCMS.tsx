import { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit, Trash2, X, Image as ImageIcon } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function TeamCMS() {
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '', role: '', bio: '', image: '', 
    linkedin: '', twitter: '', email: '', 
    order: 0, isActive: true
  });
  
  const [uploading, setUploading] = useState(false);

  const fetchTeam = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/teams`);
      const sorted = data.data.sort((a: any, b: any) => a.order - b.order);
      setTeamMembers(sorted);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTeam(); }, []);

  const handleInputChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData({ 
      ...formData, 
      [name]: type === 'checkbox' ? checked : (name === 'order' ? parseInt(value) || 0 : value) 
    });
  };

  const handleFileUpload = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    const form = new FormData();
    form.append('image', file);

    setUploading(true);
    try {
      const { data } = await axios.post(`${API_URL}/upload`, form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setFormData({ ...formData, image: data.data.url });
    } catch (error) {
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const payload = {
        name: formData.name,
        role: formData.role,
        bio: formData.bio,
        image: formData.image,
        socialLinks: {
          linkedin: formData.linkedin,
          twitter: formData.twitter,
          email: formData.email
        },
        order: formData.order,
        isActive: formData.isActive
      };

      if (editingId) {
        await axios.put(`${API_URL}/teams/${editingId}`, payload);
      } else {
        await axios.post(`${API_URL}/teams`, payload);
      }
      setModalOpen(false);
      fetchTeam();
    } catch (error) {
      alert('Failed to save team member');
    }
  };

  const handleEdit = (member: any) => {
    setEditingId(member._id);
    setFormData({
      name: member.name || '',
      role: member.role || '',
      bio: member.bio || '',
      image: member.image || '',
      linkedin: member.socialLinks?.linkedin || '',
      twitter: member.socialLinks?.twitter || '',
      email: member.socialLinks?.email || '',
      order: member.order || 0,
      isActive: member.isActive !== undefined ? member.isActive : true
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this team member?')) {
      try {
        await axios.delete(`${API_URL}/teams/${id}`);
        fetchTeam();
      } catch (error) {
        alert('Failed to delete');
      }
    }
  };

  const openNewModal = () => {
    setEditingId(null);
    setFormData({ 
      name: '', role: '', bio: '', image: '', 
      linkedin: '', twitter: '', email: '', 
      order: teamMembers.length, isActive: true 
    });
    setModalOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Manage Team</h1>
          <p className="text-gray-500 mt-1">Add, edit, or remove company team members.</p>
        </div>
        <button onClick={openNewModal} className="bg-primary text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-primary/90 font-medium">
          <Plus size={20} /> Add Team Member
        </button>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <thead className="bg-gray-50 dark:bg-zinc-800/50 text-gray-700 dark:text-gray-300 uppercase font-semibold">
              <tr>
                <th className="px-6 py-4 w-16">Order</th>
                <th className="px-6 py-4">Photo</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} className="text-center py-10">Loading...</td></tr>
              ) : teamMembers.length === 0 ? (
                <tr><td colSpan={5} className="text-center py-10">No team members found.</td></tr>
              ) : (
                teamMembers.map((member) => (
                  <tr key={member._id} className="border-b border-zinc-200 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-800/30">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{member.order}</td>
                    <td className="px-6 py-4">
                      {member.image ? (
                        <img src={member.image} alt={member.name} className="w-12 h-12 object-cover rounded-full border border-zinc-200 dark:border-zinc-700" />
                      ) : (
                        <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center"><ImageIcon className="w-5 h-5 text-zinc-500" /></div>
                      )}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                      {member.name}
                      {!member.isActive && <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-600 text-xs rounded-full">Hidden</span>}
                    </td>
                    <td className="px-6 py-4">{member.role}</td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => handleEdit(member)} className="text-blue-500 hover:text-blue-600 p-2"><Edit size={18} /></button>
                      <button onClick={() => handleDelete(member._id)} className="text-red-500 hover:text-red-600 p-2"><Trash2 size={18} /></button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-zinc-200 dark:border-zinc-800 shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b border-zinc-200 dark:border-zinc-800 sticky top-0 bg-white dark:bg-zinc-900 z-10">
              <h2 className="text-2xl font-bold dark:text-white">{editingId ? 'Edit Team Member' : 'New Team Member'}</h2>
              <button onClick={() => setModalOpen(false)} className="text-gray-500 hover:text-gray-800 dark:hover:text-white"><X size={24} /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-gray-300">Name</label>
                  <input required type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full bg-transparent border border-zinc-300 dark:border-zinc-700 rounded-lg px-4 py-3 dark:text-white focus:border-primary outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-gray-300">Role / Position</label>
                  <input required type="text" name="role" value={formData.role} onChange={handleInputChange} className="w-full bg-transparent border border-zinc-300 dark:border-zinc-700 rounded-lg px-4 py-3 dark:text-white focus:border-primary outline-none" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2 dark:text-gray-300">Biography</label>
                  <textarea rows={3} required name="bio" value={formData.bio} onChange={handleInputChange} className="w-full bg-transparent border border-zinc-300 dark:border-zinc-700 rounded-lg px-4 py-3 dark:text-white focus:border-primary outline-none"></textarea>
                </div>
              </div>

              <div className="border-t border-zinc-200 dark:border-zinc-800 pt-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Social Links</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 dark:text-gray-300">LinkedIn URL</label>
                    <input type="url" name="linkedin" value={formData.linkedin} onChange={handleInputChange} className="w-full bg-transparent border border-zinc-300 dark:border-zinc-700 rounded-lg px-4 py-3 dark:text-white focus:border-primary outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 dark:text-gray-300">Twitter URL</label>
                    <input type="url" name="twitter" value={formData.twitter} onChange={handleInputChange} className="w-full bg-transparent border border-zinc-300 dark:border-zinc-700 rounded-lg px-4 py-3 dark:text-white focus:border-primary outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 dark:text-gray-300">Email Address</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full bg-transparent border border-zinc-300 dark:border-zinc-700 rounded-lg px-4 py-3 dark:text-white focus:border-primary outline-none" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-gray-300">Profile Photo (Upload)</label>
                  <div className="flex items-center gap-4">
                    {formData.image && <img src={formData.image} alt="Preview" className="w-16 h-16 object-cover rounded-full border border-zinc-700" />}
                    <label className="flex flex-col items-center justify-center w-full h-16 border-2 border-zinc-300 dark:border-zinc-700 border-dashed rounded-lg cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                      <div className="flex flex-col items-center justify-center">
                        {uploading ? <span className="text-sm dark:text-gray-400">Uploading...</span> : <span className="text-sm dark:text-gray-400">Upload Photo</span>}
                      </div>
                      <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} disabled={uploading} />
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-gray-300">Display Order</label>
                  <input required type="number" name="order" value={formData.order} onChange={handleInputChange} className="w-full bg-transparent border border-zinc-300 dark:border-zinc-700 rounded-lg px-4 py-3 dark:text-white focus:border-primary outline-none" />
                </div>
              </div>

              <div className="flex items-center gap-3 bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-lg border border-zinc-200 dark:border-zinc-700">
                <input type="checkbox" name="isActive" id="isActive" checked={formData.isActive} onChange={handleInputChange} className="w-5 h-5 accent-primary" />
                <label htmlFor="isActive" className="text-sm font-medium dark:text-white cursor-pointer">Active (Show on Website)</label>
              </div>

              <div className="flex justify-end gap-4 pt-6 border-t border-zinc-200 dark:border-zinc-800">
                <button type="button" onClick={() => setModalOpen(false)} className="px-6 py-3 font-medium rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800">Cancel</button>
                <button type="submit" className="px-6 py-3 font-medium rounded-lg bg-primary text-white hover:bg-primary/90">Save Member</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
