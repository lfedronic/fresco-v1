import React, { useState } from 'react';
import { Collection, User } from '../types';
import { Plus, Lock, Globe, X } from 'lucide-react';

interface Props {
  collections: Collection[];
  onCreateCollection: (collection: Collection) => void;
  onCollectionClick: (collection: Collection) => void;
}

export const CollectionsView: React.FC<Props> = ({ collections, onCreateCollection, onCollectionClick }) => {
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
      updatedAt: 'Just now',
      items: []
    };

    onCreateCollection(newCollection);
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
        <div className="mb-10 bg-white rounded-2xl p-8 border border-stone-200 shadow-xl shadow-stone-100/50 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center justify-between mb-6">
             <h3 className="font-serif text-xl font-bold text-stone-900">Create New Collection</h3>
             <button onClick={resetForm} className="text-stone-400 hover:text-stone-600 transition-colors">
               <X className="w-5 h-5" />
             </button>
          </div>
          
          <form onSubmit={handleCreate} className="space-y-5">
             <div>
               <label className="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Title</label>
               <input 
                 type="text" 
                 value={title}
                 onChange={(e) => setTitle(e.target.value)}
                 placeholder="e.g. Sunday Reads"
                 className="w-full px-4 py-3 rounded-xl bg-white border border-stone-200 text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent transition-all"
                 autoFocus
               />
             </div>
             
             <div>
               <label className="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Description <span className="text-stone-400 font-normal normal-case">(Optional)</span></label>
               <textarea 
                 value={description}
                 onChange={(e) => setDescription(e.target.value)}
                 placeholder="What is this collection about?"
                 className="w-full px-4 py-3 rounded-xl bg-white border border-stone-200 text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent transition-all resize-none h-24"
               />
             </div>

             <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-4 border-t border-stone-100">
                <button 
                  type="button"
                  onClick={() => setIsPrivate(!isPrivate)}
                  className={`
                    flex items-center gap-2 text-sm font-medium px-4 py-2.5 rounded-lg transition-all border
                    ${isPrivate 
                      ? 'bg-stone-900 text-white border-stone-900' 
                      : 'bg-white text-stone-600 border-stone-200 hover:border-stone-300'
                    }
                  `}
                >
                  {isPrivate ? <Lock className="w-4 h-4" /> : <Globe className="w-4 h-4" />}
                  <span>{isPrivate ? 'Private Collection' : 'Public Collection'}</span>
                </button>

                <div className="flex items-center gap-3 justify-end">
                  <button 
                    type="button" 
                    onClick={resetForm}
                    className="px-5 py-2.5 text-stone-500 font-medium hover:text-stone-900 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={!title.trim()}
                    className="px-8 py-2.5 bg-orange-500 text-white font-medium rounded-full hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md shadow-orange-200"
                  >
                    Create
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
          className="group flex flex-col items-center justify-center aspect-[3/2] rounded-xl border-2 border-dashed border-stone-300 hover:border-orange-400 hover:bg-orange-50 transition-all bg-white"
        >
           <div className="w-14 h-14 rounded-full bg-stone-50 border border-stone-200 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-sm">
             <Plus className="w-6 h-6 text-stone-400 group-hover:text-orange-500" />
           </div>
           <span className="font-bold text-stone-500 group-hover:text-orange-600 transition-colors">Create New Collection</span>
        </button>

        {/* Existing Collections */}
        {collections.map(col => (
          <div 
            key={col.id} 
            onClick={() => onCollectionClick(col)}
            className="group cursor-pointer flex flex-col gap-3 relative"
          >
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