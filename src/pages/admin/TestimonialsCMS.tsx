import { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit, Trash2, X, Image as ImageIcon, Star } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function TestimonialsCMS() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    clientName: '', company: '', role: '', content: '', rating: 5, image: '', isActive: true
  });
  
  const [uploading, setUploading] = useState(false);

  const fetchTestimonials = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/testimonials`);
      setTestimonials(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTestimonials(); }, []);

  const handleInputChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData({ 
      ...formData, 
      [name]: type === 'checkbox' ? checked : (name === 'rating' ? parseInt(value) : value) 
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
      if (editingId) {
        await axios.put(`${API_URL}/testimonials/${editingId}`, formData);
      } else {
        await axios.post(`${API_URL}/testimonials`, formData);
      }
      setModalOpen(false);
      fetchTestimonials();
    } catch (error) {
      alert('Failed to save testimonial');
    }
  };

  const handleEdit = (item: any) => {
    setEditingId(item._id);
    setFormData({
      clientName: item.clientName || '',
      company: item.company || '',
      role: item.role || '',
      content: item.content || '',
      rating: item.rating || 5,
      image: item.image || '',
      isActive: item.isActive !== undefined ? item.isActive : true
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      try {
        await axios.delete(`${API_URL}/testimonials/${id}`);
        fetchTestimonials();
      } catch (error) {
        alert('Failed to delete');
      }
    }
  };

  const openNewModal = () => {
    setEditingId(null);
    setFormData({ clientName: '', company: '', role: '', content: '', rating: 5, image: '', isActive: true });
    setModalOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-foreground">Manage Testimonials</h1>
          <p className="text-muted-foreground mt-1">Add, edit, or remove client feedback and reviews.</p>
        </div>
        <button onClick={openNewModal} className="bg-primary text-foreground px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-primary/90 font-medium">
          <Plus size={20} /> Add Testimonial
        </button>
      </div>

      <div className="bg-white dark:bg-card rounded-xl shadow-sm border border-zinc-200 dark:border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-muted-foreground dark:text-muted-foreground">
            <thead className="bg-gray-50 dark:bg-accent/50 text-gray-700 dark:text-foreground/80 uppercase font-semibold">
              <tr>
                <th className="px-6 py-4">Image</th>
                <th className="px-6 py-4">Client Name</th>
                <th className="px-6 py-4">Company / Role</th>
                <th className="px-6 py-4">Rating</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} className="text-center py-10">Loading...</td></tr>
              ) : testimonials.length === 0 ? (
                <tr><td colSpan={5} className="text-center py-10">No testimonials found.</td></tr>
              ) : (
                testimonials.map((item) => (
                  <tr key={item._id} className="border-b border-zinc-200 dark:border-border hover:bg-gray-50 dark:hover:bg-accent/30">
                    <td className="px-6 py-4">
                      {item.image ? (
                        <img src={item.image} alt={item.clientName} className="w-12 h-12 object-cover rounded-full border border-zinc-200 dark:border-border" />
                      ) : (
                        <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center"><ImageIcon className="w-5 h-5 text-zinc-500" /></div>
                      )}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-foreground">
                      {item.clientName}
                      {!item.isActive && <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-600 text-xs rounded-full">Hidden</span>}
                    </td>
                    <td className="px-6 py-4">{item.role}{item.company ? ` @ ${item.company}` : ''}</td>
                    <td className="px-6 py-4">
                      <div className="flex text-yellow-400">
                        {[...Array(item.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => handleEdit(item)} className="text-blue-500 hover:text-blue-600 p-2"><Edit size={18} /></button>
                      <button onClick={() => handleDelete(item._id)} className="text-red-500 hover:text-red-600 p-2"><Trash2 size={18} /></button>
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
          <div className="bg-white dark:bg-card rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-zinc-200 dark:border-border shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b border-zinc-200 dark:border-border sticky top-0 bg-white dark:bg-card z-10">
              <h2 className="text-2xl font-bold dark:text-foreground">{editingId ? 'Edit Testimonial' : 'New Testimonial'}</h2>
              <button onClick={() => setModalOpen(false)} className="text-muted-foreground hover:text-gray-800 dark:hover:text-foreground"><X size={24} /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-foreground/80">Client Name</label>
                  <input required type="text" name="clientName" value={formData.clientName} onChange={handleInputChange} className="w-full bg-transparent border border-zinc-300 dark:border-border rounded-lg px-4 py-3 dark:text-foreground focus:border-primary outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-foreground/80">Rating (1-5)</label>
                  <select name="rating" value={formData.rating} onChange={handleInputChange} className="w-full bg-transparent border border-zinc-300 dark:border-border rounded-lg px-4 py-3 dark:text-foreground focus:border-primary outline-none">
                    <option value="5">5 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="2">2 Stars</option>
                    <option value="1">1 Star</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-foreground/80">Company Name</label>
                  <input type="text" name="company" value={formData.company} onChange={handleInputChange} className="w-full bg-transparent border border-zinc-300 dark:border-border rounded-lg px-4 py-3 dark:text-foreground focus:border-primary outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-foreground/80">Client Role</label>
                  <input type="text" name="role" value={formData.role} onChange={handleInputChange} className="w-full bg-transparent border border-zinc-300 dark:border-border rounded-lg px-4 py-3 dark:text-foreground focus:border-primary outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 dark:text-foreground/80">Feedback / Content</label>
                <textarea rows={4} required name="content" value={formData.content} onChange={handleInputChange} className="w-full bg-transparent border border-zinc-300 dark:border-border rounded-lg px-4 py-3 dark:text-foreground focus:border-primary outline-none"></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 dark:text-foreground/80">Client Photo (Upload)</label>
                <div className="flex items-center gap-4">
                  {formData.image && <img src={formData.image} alt="Preview" className="w-16 h-16 object-cover rounded-full border border-border" />}
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
                <label htmlFor="isActive" className="text-sm font-medium dark:text-foreground cursor-pointer">Active (Show on Website)</label>
              </div>

              <div className="flex justify-end gap-4 pt-6 border-t border-zinc-200 dark:border-border">
                <button type="button" onClick={() => setModalOpen(false)} className="px-6 py-3 font-medium rounded-lg text-gray-700 dark:text-foreground/80 hover:bg-gray-100 dark:hover:bg-accent">Cancel</button>
                <button type="submit" className="px-6 py-3 font-medium rounded-lg bg-primary text-foreground hover:bg-primary/90">Save Testimonial</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
