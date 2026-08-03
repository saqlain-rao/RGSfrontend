import { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit, Trash2, X, Image as ImageIcon, Eye, EyeOff } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function BlogsCMS() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    title: '', slug: '', excerpt: '', content: '', author: 'Admin', image: '', tags: '', isPublished: true
  });
  
  const [uploading, setUploading] = useState(false);

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/blogs`);
      setBlogs(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBlogs(); }, []);

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
    try {
      const payload = {
        ...formData,
        tags: formData.tags.split(',').map(t => t.trim()).filter(t => t !== '')
      };

      if (editingId) {
        await axios.put(`${API_URL}/blogs/${editingId}`, payload);
      } else {
        await axios.post(`${API_URL}/blogs`, payload);
      }
      setModalOpen(false);
      fetchBlogs();
    } catch (error) {
      alert('Failed to save blog');
    }
  };

  const handleEdit = (blog: any) => {
    setEditingId(blog._id);
    setFormData({
      title: blog.title || '',
      slug: blog.slug || '',
      excerpt: blog.excerpt || '',
      content: blog.content || '',
      author: blog.author || 'Admin',
      image: blog.image || '',
      tags: (blog.tags || []).join(', '),
      isPublished: blog.isPublished !== undefined ? blog.isPublished : true
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        await axios.delete(`${API_URL}/blogs/${id}`);
        fetchBlogs();
      } catch (error) {
        alert('Failed to delete');
      }
    }
  };

  const openNewModal = () => {
    setEditingId(null);
    setFormData({ title: '', slug: '', excerpt: '', content: '', author: 'Admin', image: '', tags: '', isPublished: true });
    setModalOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Manage Blogs</h1>
          <p className="text-gray-500 mt-1">Publish, edit, or remove news and articles.</p>
        </div>
        <button onClick={openNewModal} className="bg-primary text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-primary/90 font-medium">
          <Plus size={20} /> New Blog Post
        </button>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <thead className="bg-gray-50 dark:bg-zinc-800/50 text-gray-700 dark:text-gray-300 uppercase font-semibold">
              <tr>
                <th className="px-6 py-4">Cover</th>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Author</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} className="text-center py-10">Loading...</td></tr>
              ) : blogs.length === 0 ? (
                <tr><td colSpan={5} className="text-center py-10">No blog posts found.</td></tr>
              ) : (
                blogs.map((blog) => (
                  <tr key={blog._id} className="border-b border-zinc-200 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-800/30">
                    <td className="px-6 py-4">
                      {blog.image ? (
                        <img src={blog.image} alt={blog.title} className="w-16 h-12 object-cover rounded-md border border-zinc-200 dark:border-zinc-700" />
                      ) : (
                        <div className="w-16 h-12 bg-zinc-800 rounded-md flex items-center justify-center"><ImageIcon className="w-5 h-5 text-zinc-500" /></div>
                      )}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                      {blog.title}
                      <div className="text-xs text-gray-400 font-normal mt-1">/{blog.slug}</div>
                    </td>
                    <td className="px-6 py-4">{blog.author}</td>
                    <td className="px-6 py-4">
                      {blog.isPublished ? (
                        <span className="flex items-center gap-1 text-green-600 bg-green-100 px-2 py-1 rounded-full text-xs font-medium w-fit"><Eye size={14}/> Published</span>
                      ) : (
                        <span className="flex items-center gap-1 text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full text-xs font-medium w-fit"><EyeOff size={14}/> Draft</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => handleEdit(blog)} className="text-blue-500 hover:text-blue-600 p-2"><Edit size={18} /></button>
                      <button onClick={() => handleDelete(blog._id)} className="text-red-500 hover:text-red-600 p-2"><Trash2 size={18} /></button>
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
          <div className="bg-white dark:bg-zinc-900 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-zinc-200 dark:border-zinc-800 shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b border-zinc-200 dark:border-zinc-800 sticky top-0 bg-white dark:bg-zinc-900 z-10">
              <h2 className="text-2xl font-bold dark:text-white">{editingId ? 'Edit Blog Post' : 'New Blog Post'}</h2>
              <button onClick={() => setModalOpen(false)} className="text-gray-500 hover:text-gray-800 dark:hover:text-white"><X size={24} /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 dark:text-gray-300">Blog Title</label>
                    <input required type="text" name="title" value={formData.title} onChange={handleInputChange} className="w-full bg-transparent border border-zinc-300 dark:border-zinc-700 rounded-lg px-4 py-3 dark:text-white focus:border-primary outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 dark:text-gray-300">URL Slug</label>
                    <input required type="text" name="slug" value={formData.slug} onChange={handleInputChange} className="w-full bg-transparent border border-zinc-300 dark:border-zinc-700 rounded-lg px-4 py-3 dark:text-white focus:border-primary outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 dark:text-gray-300">Author Name</label>
                    <input required type="text" name="author" value={formData.author} onChange={handleInputChange} className="w-full bg-transparent border border-zinc-300 dark:border-zinc-700 rounded-lg px-4 py-3 dark:text-white focus:border-primary outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 dark:text-gray-300">Tags (Comma separated)</label>
                    <input type="text" name="tags" value={formData.tags} onChange={handleInputChange} placeholder="e.g. Construction, News, Update" className="w-full bg-transparent border border-zinc-300 dark:border-zinc-700 rounded-lg px-4 py-3 dark:text-white focus:border-primary outline-none" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2 dark:text-gray-300">Short Excerpt (Intro text)</label>
                    <textarea rows={3} required name="excerpt" value={formData.excerpt} onChange={handleInputChange} className="w-full bg-transparent border border-zinc-300 dark:border-zinc-700 rounded-lg px-4 py-3 dark:text-white focus:border-primary outline-none"></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 dark:text-gray-300">Cover Image (Upload)</label>
                    <div className="flex items-center gap-4">
                      {formData.image && <img src={formData.image} alt="Preview" className="w-24 h-16 object-cover rounded-md border border-zinc-700" />}
                      <label className="flex flex-col items-center justify-center w-full h-16 border-2 border-zinc-300 dark:border-zinc-700 border-dashed rounded-lg cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                        <div className="flex flex-col items-center justify-center">
                          {uploading ? <span className="text-sm dark:text-gray-400">Uploading...</span> : <span className="text-sm dark:text-gray-400">Upload Image</span>}
                        </div>
                        <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} disabled={uploading} />
                      </label>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-lg border border-zinc-200 dark:border-zinc-700">
                    <input type="checkbox" name="isPublished" id="isPublished" checked={formData.isPublished} onChange={handleInputChange} className="w-5 h-5 accent-primary" />
                    <label htmlFor="isPublished" className="text-sm font-medium dark:text-white cursor-pointer">Publish Immediately</label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-gray-300">Full Content (HTML/Text)</label>
                  <textarea rows={24} required name="content" value={formData.content} onChange={handleInputChange} className="w-full h-[calc(100%-2rem)] bg-transparent border border-zinc-300 dark:border-zinc-700 rounded-lg px-4 py-3 dark:text-white focus:border-primary outline-none font-mono text-sm leading-relaxed"></textarea>
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-6 border-t border-zinc-200 dark:border-zinc-800">
                <button type="button" onClick={() => setModalOpen(false)} className="px-6 py-3 font-medium rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800">Cancel</button>
                <button type="submit" className="px-6 py-3 font-medium rounded-lg bg-primary text-white hover:bg-primary/90">Save Post</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
