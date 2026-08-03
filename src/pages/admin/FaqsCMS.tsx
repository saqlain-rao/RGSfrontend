import { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit, Trash2, X } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function FaqsCMS() {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    question: '', answer: '', category: 'General', isActive: true, order: 0
  });

  const fetchFaqs = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/faqs`);
      // Sort by order
      const sorted = data.data.sort((a: any, b: any) => a.order - b.order);
      setFaqs(sorted);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchFaqs(); }, []);

  const handleInputChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData({ 
      ...formData, 
      [name]: type === 'checkbox' ? checked : (name === 'order' ? parseInt(value) || 0 : value) 
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API_URL}/faqs/${editingId}`, formData);
      } else {
        await axios.post(`${API_URL}/faqs`, formData);
      }
      setModalOpen(false);
      fetchFaqs();
    } catch (error) {
      alert('Failed to save FAQ');
    }
  };

  const handleEdit = (faq: any) => {
    setEditingId(faq._id);
    setFormData({
      question: faq.question || '',
      answer: faq.answer || '',
      category: faq.category || 'General',
      isActive: faq.isActive !== undefined ? faq.isActive : true,
      order: faq.order || 0
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this FAQ?')) {
      try {
        await axios.delete(`${API_URL}/faqs/${id}`);
        fetchFaqs();
      } catch (error) {
        alert('Failed to delete');
      }
    }
  };

  const openNewModal = () => {
    setEditingId(null);
    setFormData({ question: '', answer: '', category: 'General', isActive: true, order: faqs.length });
    setModalOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Manage FAQs</h1>
          <p className="text-gray-500 mt-1">Add, edit, or remove Frequently Asked Questions.</p>
        </div>
        <button onClick={openNewModal} className="bg-primary text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-primary/90 font-medium">
          <Plus size={20} /> Add FAQ
        </button>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <thead className="bg-gray-50 dark:bg-zinc-800/50 text-gray-700 dark:text-gray-300 uppercase font-semibold">
              <tr>
                <th className="px-6 py-4 w-16">Order</th>
                <th className="px-6 py-4">Question</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={4} className="text-center py-10">Loading...</td></tr>
              ) : faqs.length === 0 ? (
                <tr><td colSpan={4} className="text-center py-10">No FAQs found.</td></tr>
              ) : (
                faqs.map((faq) => (
                  <tr key={faq._id} className="border-b border-zinc-200 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-800/30">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{faq.order}</td>
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                      {faq.question}
                      {!faq.isActive && <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-600 text-xs rounded-full">Hidden</span>}
                    </td>
                    <td className="px-6 py-4"><span className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full text-xs font-medium">{faq.category}</span></td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => handleEdit(faq)} className="text-blue-500 hover:text-blue-600 p-2"><Edit size={18} /></button>
                      <button onClick={() => handleDelete(faq._id)} className="text-red-500 hover:text-red-600 p-2"><Trash2 size={18} /></button>
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
          <div className="bg-white dark:bg-zinc-900 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-zinc-200 dark:border-zinc-800 shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b border-zinc-200 dark:border-zinc-800 sticky top-0 bg-white dark:bg-zinc-900 z-10">
              <h2 className="text-2xl font-bold dark:text-white">{editingId ? 'Edit FAQ' : 'New FAQ'}</h2>
              <button onClick={() => setModalOpen(false)} className="text-gray-500 hover:text-gray-800 dark:hover:text-white"><X size={24} /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2 dark:text-gray-300">Question</label>
                  <input required type="text" name="question" value={formData.question} onChange={handleInputChange} className="w-full bg-transparent border border-zinc-300 dark:border-zinc-700 rounded-lg px-4 py-3 dark:text-white focus:border-primary outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-gray-300">Category</label>
                  <input required type="text" name="category" value={formData.category} onChange={handleInputChange} placeholder="e.g. General, Services, Pricing" className="w-full bg-transparent border border-zinc-300 dark:border-zinc-700 rounded-lg px-4 py-3 dark:text-white focus:border-primary outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-gray-300">Display Order</label>
                  <input required type="number" name="order" value={formData.order} onChange={handleInputChange} className="w-full bg-transparent border border-zinc-300 dark:border-zinc-700 rounded-lg px-4 py-3 dark:text-white focus:border-primary outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 dark:text-gray-300">Answer</label>
                <textarea rows={5} required name="answer" value={formData.answer} onChange={handleInputChange} className="w-full bg-transparent border border-zinc-300 dark:border-zinc-700 rounded-lg px-4 py-3 dark:text-white focus:border-primary outline-none"></textarea>
              </div>

              <div className="flex items-center gap-3 bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-lg border border-zinc-200 dark:border-zinc-700">
                <input type="checkbox" name="isActive" id="isActive" checked={formData.isActive} onChange={handleInputChange} className="w-5 h-5 accent-primary" />
                <label htmlFor="isActive" className="text-sm font-medium dark:text-white cursor-pointer">Active (Show on Website)</label>
              </div>

              <div className="flex justify-end gap-4 pt-6 border-t border-zinc-200 dark:border-zinc-800">
                <button type="button" onClick={() => setModalOpen(false)} className="px-6 py-3 font-medium rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800">Cancel</button>
                <button type="submit" className="px-6 py-3 font-medium rounded-lg bg-primary text-white hover:bg-primary/90">Save FAQ</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
