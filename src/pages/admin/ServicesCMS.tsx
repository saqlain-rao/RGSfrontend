import { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit, Trash2, X, Image as ImageIcon } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function ServicesCMS() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    title: '', slug: '', shortDescription: '', fullDescription: '', icon: 'Settings', image: '', features: '', isActive: true, order: 0
  });
  
  const [uploading, setUploading] = useState(false);

  const fetchServices = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/services`);
      setServices(data.data.sort((a: any, b: any) => a.order - b.order));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchServices(); }, []);

  const handleInputChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
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
    if (!formData.image) {
      alert('Please upload a service image before saving.');
      return;
    }

    try {
      const payload = {
        ...formData,
        features: formData.features.split(',').map(f => f.trim()).filter(f => f !== '')
      };

      if (editingId) {
        await axios.put(`${API_URL}/services/${editingId}`, payload);
      } else {
        await axios.post(`${API_URL}/services`, payload);
      }
      setModalOpen(false);
      fetchServices();
    } catch (error: any) {
      console.error(error.response?.data || error.message);
      alert('Failed to save service: ' + (error.response?.data?.error || error.message));
    }
  };

  const handleEdit = (service: any) => {
    setEditingId(service._id);
    setFormData({
      title: service.title || '',
      slug: service.slug || '',
      shortDescription: service.shortDescription || '',
      fullDescription: service.fullDescription || '',
      icon: service.icon || 'Settings',
      image: service.image || '',
      features: (service.features || []).join(', '),
      isActive: service.isActive !== undefined ? service.isActive : true,
      order: service.order || 0
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await axios.delete(`${API_URL}/services/${id}`);
        fetchServices();
      } catch (error) {
        alert('Failed to delete');
      }
    }
  };

  const openNewModal = () => {
    setEditingId(null);
    setFormData({ title: '', slug: '', shortDescription: '', fullDescription: '', icon: 'Settings', image: '', features: '', isActive: true, order: 0 });
    setModalOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-foreground">Manage Services</h1>
          <p className="text-muted-foreground mt-1">Add, edit, or remove services offered by the company.</p>
        </div>
        <button onClick={openNewModal} className="bg-primary text-foreground px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-primary/90 font-medium">
          <Plus size={20} /> Add New Service
        </button>
      </div>

      <div className="bg-white dark:bg-card rounded-xl shadow-sm border border-zinc-200 dark:border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-muted-foreground dark:text-muted-foreground">
            <thead className="bg-gray-50 dark:bg-accent/50 text-gray-700 dark:text-foreground/80 uppercase font-semibold">
              <tr>
                <th className="px-6 py-4">Image</th>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Icon Name</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} className="text-center py-10">Loading...</td></tr>
              ) : services.length === 0 ? (
                <tr><td colSpan={5} className="text-center py-10">No services found.</td></tr>
              ) : (
                services.map((service) => (
                  <tr key={service._id} className="border-b border-zinc-200 dark:border-border hover:bg-gray-50 dark:hover:bg-accent/30">
                    <td className="px-6 py-4">
                      {service.image ? (
                        <img src={service.image} alt={service.title} className="w-16 h-12 object-cover rounded-md border border-zinc-200 dark:border-border" />
                      ) : (
                        <div className="w-16 h-12 bg-accent rounded-md flex items-center justify-center"><ImageIcon className="w-5 h-5 text-zinc-500" /></div>
                      )}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-foreground">{service.title}</td>
                    <td className="px-6 py-4"><span className="px-3 py-1 bg-zinc-100 dark:bg-accent rounded-full text-xs font-medium">{service.icon}</span></td>
                    <td className="px-6 py-4">{service.isActive ? <span className="text-green-500">Active</span> : <span className="text-red-500">Inactive</span>}</td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => handleEdit(service)} className="text-blue-500 hover:text-blue-600 p-2"><Edit size={18} /></button>
                      <button onClick={() => handleDelete(service._id)} className="text-red-500 hover:text-red-600 p-2"><Trash2 size={18} /></button>
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
        <div className="fixed inset-0 bg-background/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-card rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-zinc-200 dark:border-border shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b border-zinc-200 dark:border-border sticky top-0 bg-white dark:bg-card z-10">
              <h2 className="text-2xl font-bold dark:text-foreground">{editingId ? 'Edit Service' : 'New Service'}</h2>
              <button onClick={() => setModalOpen(false)} className="text-muted-foreground hover:text-gray-800 dark:hover:text-foreground"><X size={24} /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-foreground/80">Service Title</label>
                  <input required type="text" name="title" value={formData.title} onChange={handleInputChange} className="w-full bg-transparent border border-zinc-300 dark:border-border rounded-lg px-4 py-3 dark:text-foreground focus:border-primary outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-foreground/80">URL Slug</label>
                  <input required type="text" name="slug" value={formData.slug} onChange={handleInputChange} className="w-full bg-transparent border border-zinc-300 dark:border-border rounded-lg px-4 py-3 dark:text-foreground focus:border-primary outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-foreground/80">Icon Name (Lucide React)</label>
                  <input required type="text" name="icon" value={formData.icon} onChange={handleInputChange} placeholder="e.g. Settings, Home, HardHat" className="w-full bg-transparent border border-zinc-300 dark:border-border rounded-lg px-4 py-3 dark:text-foreground focus:border-primary outline-none" />
                  <p className="text-xs text-muted-foreground mt-1">Check lucide.dev for icon names.</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-foreground/80">Display Order</label>
                  <input required type="number" name="order" value={formData.order} onChange={handleInputChange} className="w-full bg-transparent border border-zinc-300 dark:border-border rounded-lg px-4 py-3 dark:text-foreground focus:border-primary outline-none" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 dark:text-foreground/80">Short Description</label>
                <textarea rows={2} required name="shortDescription" value={formData.shortDescription} onChange={handleInputChange} className="w-full bg-transparent border border-zinc-300 dark:border-border rounded-lg px-4 py-3 dark:text-foreground focus:border-primary outline-none"></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 dark:text-foreground/80">Full Description</label>
                <textarea rows={4} required name="fullDescription" value={formData.fullDescription} onChange={handleInputChange} className="w-full bg-transparent border border-zinc-300 dark:border-border rounded-lg px-4 py-3 dark:text-foreground focus:border-primary outline-none"></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 dark:text-foreground/80">Features (Comma separated)</label>
                <input type="text" name="features" value={formData.features} onChange={handleInputChange} placeholder="e.g. 24/7 Support, Quality Materials, Expert Team" className="w-full bg-transparent border border-zinc-300 dark:border-border rounded-lg px-4 py-3 dark:text-foreground focus:border-primary outline-none" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 dark:text-foreground/80">Service Image (Upload)</label>
                <div className="flex items-center gap-4">
                  {formData.image && <img src={formData.image} alt="Preview" className="w-24 h-24 object-cover rounded-lg border border-border" />}
                  <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-zinc-300 dark:border-border border-dashed rounded-lg cursor-pointer hover:bg-zinc-50 dark:hover:bg-accent/50">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      {uploading ? <span className="text-sm dark:text-muted-foreground">Uploading...</span> : <span className="text-sm dark:text-muted-foreground">Click to upload custom image</span>}
                    </div>
                    <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} disabled={uploading} />
                  </label>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-zinc-50 dark:bg-accent/50 p-4 rounded-lg border border-zinc-200 dark:border-border">
                <input type="checkbox" name="isActive" id="isActive" checked={formData.isActive} onChange={handleInputChange} className="w-5 h-5 accent-primary" />
                <label htmlFor="isActive" className="text-sm font-medium dark:text-foreground cursor-pointer">Active Service (Show on Website)</label>
              </div>

              <div className="flex justify-end gap-4 pt-6 border-t border-zinc-200 dark:border-border">
                <button type="button" onClick={() => setModalOpen(false)} className="px-6 py-3 font-medium rounded-lg text-gray-700 dark:text-foreground/80 hover:bg-gray-100 dark:hover:bg-accent">Cancel</button>
                <button type="submit" className="px-6 py-3 font-medium rounded-lg bg-primary text-foreground hover:bg-primary/90">Save Service</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
