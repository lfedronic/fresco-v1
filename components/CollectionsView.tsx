import React, { useState } from 'react';
import { Collection, User } from '../types';
import { USER_COLLECTIONS, USERS } from '../constants';
import { Plus, Lock, Globe, X, Check } from 'lucide-react';

interface Props {
  onNavigate?: (view: any) => void;
}

export const CollectionsView: React.FC<Props> = () => {
  const [collections, setCollections] = useState<Collection[]>(USER_COLLECTIONS[USERS.alice.id] || []);
  const [isCreating, setIsCreating] = useState(false);
  
  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newCollection: Collection = {
      id: `c${Date.now()}`,
      title,
      description,
      isPrivate,
      coverUrl: `https://picsum.photos/seed/${Date.now()}/600/400`, // Random placeholder
      itemCount: 0,
      updatedAt: 'Just now'
    };

    setCollections([newCollection, ...collections]);
    resetForm();
  };

  const resetForm = () => {
    setIsCreating(false);
    setTitle('');
    setDescription('');
    setIsPrivate(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 py-8 pb-20">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-stone-800 mb-2">Your Collections</h1>
          <p className="text-stone-500">Curate lists of your favorite finds for yourself or your friends.</p>
        </div>
      </div>

      {isCreating && (
        <div className="mb-10 bg-white rounded-2xl p-6 border border-fresco-200 shadow-sm animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center justify-between mb-4">
             <h3 className="font-bold text-stone-800">Create New Collection</h3>
             <button onClick={resetForm} className="text-stone-400 hover:text-stone-600">
               <X className="w-5 h-5" />
             </button>
          </div>
          
          <form onSubmit={handleCreate} className="space-y-4">
             <div>
               <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">Title</label>
               <input 
                 type="text" 
                 value={title}
                 onChange={(e) => setTitle(e.target.value)}
                 placeholder="e.g. Sunday Reads"
                 className="w-full px-4 py-2 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all"
                 autoFocus
               />
             </div>
             
             <div>
               <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">Description (Optional)</label>
               <textarea 
                 value={description}
                 onChange={(e) => setDescription(e.target.value)}
                 placeholder="What is this collection about?"
                 className="w-full px-4 py-2 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all resize-none h-20"
               />
             </div>

             <div className="flex items-center justify-between pt-2">
                <button 
                  type="button"
                  onClick={() => setIsPrivate(!isPrivate)}
                  className="flex items-center gap-2 text-sm text-stone-600 px-3 py-2 rounded-lg hover:bg-fresco-100 transition-colors"
                >
                  {isPrivate ? <Lock className="w-4 h-4" /> : <Globe className="w-4 h-4" />}
                  <span>{isPrivate ? 'Private Collection' : 'Public Collection'}</span>
                </button>

                <div className="flex items-center gap-2">
                  <button 
                    type="button" 
                    onClick={resetForm}
                    className="px-4 py-2 text-stone-500 font-medium hover:text-stone-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={!title.trim()}
                    className="px-6 py-2 bg-stone-800 text-white font-medium rounded-full hover:bg-stone-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                  >
                    Create Collection
                  </button>
                </div>
             </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Create New Card */}
        <button 
          onClick={() => setIsCreating(true)}
          className="group flex flex-col items-center justify-center aspect-[3/2] rounded-xl border-2 border-dashed border-fresco-300 hover:border-orange-400 hover:bg-orange-50 transition-all bg-fresco-50/50"
        >
           <div className="w-12 h-12 rounded-full bg-white border border-fresco-200 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-sm">
             <Plus className="w-6 h-6 text-orange-500" />
           </div>
           <span className="font-medium text-stone-600 group-hover:text-orange-600 transition-colors">Create New</span>
        </button>

        {/* Existing Collections */}
        {collections.map(col => (
          <div key={col.id} className="group cursor-pointer flex flex-col gap-3 relative">
            <div className="relative aspect-[3/2] rounded-xl overflow-hidden bg-stone-100 border border-stone-200 shadow-sm hover:shadow-md transition-all">
              <img 
                src={col.coverUrl} 
                alt={col.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60" />
              
              {/* Privacy Badge */}
              {col.isPrivate && (
                <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-sm p-1.5 rounded-full">
                  <Lock className="w-3 h-3 text-white" />
                </div>
              )}
              
              <div className="absolute bottom-3 left-3 right-3 text-white flex justify-between items-end">
                <span className="text-xs font-medium bg-white/20 backdrop-blur-md px-2 py-1 rounded-md border border-white/10">
                  {col.itemCount} items
                </span>
              </div>
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-stone-900 group-hover:text-fresco-700 transition-colors leading-tight">
                {col.title}
              </h3>
              {col.description && (
                <p className="text-sm text-stone-500 line-clamp-1 mt-1">{col.description}</p>
              )}
              <div className="flex items-center gap-2 mt-2">
                 <span className="text-xs text-stone-400">Updated {col.updatedAt}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};