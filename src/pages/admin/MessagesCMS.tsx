import { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Eye, Mail, Phone, Clock, CheckCircle } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function MessagesCMS() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<any>(null);

  const fetchMessages = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/contactmessages`);
      setMessages(data.data.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMessages(); }, []);

  const handleView = async (msg: any) => {
    setSelectedMessage(msg);
    if (msg.status === 'Unread') {
      try {
        await axios.put(`${API_URL}/contactmessages/${msg._id}`, { status: 'Read' });
        fetchMessages();
      } catch (error) {
        console.error('Failed to update status');
      }
    }
  };

  const handleMarkReplied = async () => {
    if (!selectedMessage) return;
    try {
      await axios.put(`${API_URL}/contactmessages/${selectedMessage._id}`, { status: 'Replied' });
      setSelectedMessage({ ...selectedMessage, status: 'Replied' });
      fetchMessages();
    } catch (error) {
      console.error('Failed to update status');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await axios.delete(`${API_URL}/contactmessages/${id}`);
        if (selectedMessage?._id === id) setSelectedMessage(null);
        fetchMessages();
      } catch (error) {
        alert('Failed to delete');
      }
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', month: 'short', day: 'numeric', 
      hour: '2-digit', minute: '2-digit' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-foreground">Inbox</h1>
          <p className="text-muted-foreground mt-1">View messages submitted from the contact form.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-1 bg-white dark:bg-card rounded-xl shadow-sm border border-zinc-200 dark:border-border overflow-hidden flex flex-col h-[75vh]">
          <div className="p-4 border-b border-zinc-200 dark:border-border bg-gray-50 dark:bg-accent/50">
            <h2 className="font-semibold text-gray-700 dark:text-foreground/80">All Messages ({messages.length})</h2>
          </div>
          <div className="overflow-y-auto flex-1">
            {loading ? (
              <div className="p-8 text-center text-muted-foreground">Loading...</div>
            ) : messages.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">No messages found.</div>
            ) : (
              <ul className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {messages.map((msg) => (
                  <li 
                    key={msg._id} 
                    onClick={() => handleView(msg)}
                    className={`p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-accent/50 transition-colors ${selectedMessage?._id === msg._id ? 'bg-blue-50 dark:bg-accent border-l-4 border-primary' : 'border-l-4 border-transparent'}`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h3 className={`font-medium ${msg.status === 'Unread' ? 'text-gray-900 dark:text-foreground font-bold' : 'text-gray-700 dark:text-foreground/80'}`}>
                        {msg.name}
                      </h3>
                      <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                        {new Date(msg.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className={`text-sm truncate mb-2 ${msg.status === 'Unread' ? 'text-gray-800 dark:text-gray-200 font-medium' : 'text-muted-foreground dark:text-muted-foreground'}`}>
                      {msg.subject}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        msg.status === 'Unread' ? 'bg-blue-100 text-blue-700' :
                        msg.status === 'Replied' ? 'bg-green-100 text-green-700' :
                        'bg-gray-100 text-gray-600 dark:bg-zinc-700 dark:text-foreground/80'
                      }`}>
                        {msg.status}
                      </span>
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleDelete(msg._id); }} 
                        className="text-muted-foreground hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Message Detail View */}
        <div className="lg:col-span-2 bg-white dark:bg-card rounded-xl shadow-sm border border-zinc-200 dark:border-border h-[75vh] flex flex-col">
          {selectedMessage ? (
            <>
              <div className="p-6 border-b border-zinc-200 dark:border-border flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-foreground mb-4">{selectedMessage.subject}</h2>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-muted-foreground">
                    <div className="flex items-center gap-1.5 font-medium text-gray-900 dark:text-gray-200">
                      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                        {selectedMessage.name.charAt(0)}
                      </div>
                      <span className="ml-1">{selectedMessage.name}</span>
                    </div>
                    <div className="flex items-center gap-1.5 border-l border-zinc-300 dark:border-border pl-4">
                      <Mail size={16} /> <a href={`mailto:${selectedMessage.email}`} className="hover:text-primary transition-colors">{selectedMessage.email}</a>
                    </div>
                    <div className="flex items-center gap-1.5 border-l border-zinc-300 dark:border-border pl-4">
                      <Phone size={16} /> <a href={`tel:${selectedMessage.phone}`} className="hover:text-primary transition-colors">{selectedMessage.phone}</a>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Clock size={14} /> {formatDate(selectedMessage.createdAt)}
                  </div>
                  {selectedMessage.status !== 'Replied' && (
                    <button onClick={handleMarkReplied} className="text-xs flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded hover:bg-green-100 transition-colors">
                      <CheckCircle size={12} /> Mark Replied
                    </button>
                  )}
                </div>
              </div>
              
              <div className="p-6 flex-1 overflow-y-auto">
                <div className="bg-gray-50 dark:bg-accent/30 p-6 rounded-lg whitespace-pre-wrap text-gray-800 dark:text-gray-200 leading-relaxed font-medium">
                  {selectedMessage.message}
                </div>
              </div>
              
              <div className="p-4 border-t border-zinc-200 dark:border-border bg-gray-50 dark:bg-accent/50 flex justify-end">
                <a 
                  href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                  className="bg-primary text-foreground px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
                >
                  <Mail size={18} /> Reply via Email
                </a>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground">
              <Eye size={48} className="mb-4 opacity-20" />
              <p>Select a message to read</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
