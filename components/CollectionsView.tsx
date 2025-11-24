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
      <div className="mb-8 border-b-4 border-stone-900 pb-2">
        <h1 className="text-4xl font-serif font-bold text-stone-900 mb-2">Collections</h1>
        <p className="text-stone-600 font-serif italic">Curated lists from the archives.</p>
      </div>

      {isCreating && (
        <div className="mb-10 bg-white p-8 border border-stone-900 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center justify-between mb-6 border-b border-stone-200 pb-4">
             <h3 className="font-serif text-xl font-bold text-stone-900">New Collection</h3>
             <button onClick={resetForm} className="text-stone-400 hover:text-stone-900 transition-colors">
               <X className="w-6 h-6" />
             </button>
          </div>
          
          <form onSubmit={handleCreate} className="space-y-5">
             <div>
               <label className="block text-xs font-mono font-bold text-stone-900 uppercase tracking-wider mb-2">Title</label>
               <input 
                 type="text" 
                 value={title}
                 onChange={(e) => setTitle(e.target.value)}
                 placeholder="e.g. Sunday Reads"
                 className="w-full px-4 py-3 bg-white border border-stone-400 text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-900 transition-all rounded-none font-serif"
                 autoFocus
               />
             </div>
             
             <div>
               <label className="block text-xs font-mono font-bold text-stone-900 uppercase tracking-wider mb-2">Description</label>
               <textarea 
                 value={description}
                 onChange={(e) => setDescription(e.target.value)}
                 placeholder="What is this collection about?"
                 className="w-full px-4 py-3 bg-white border border-stone-400 text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-900 transition-all resize-none h-24 rounded-none font-serif"
               />
             </div>

             <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-4">
                <button 
                  type="button"
                  onClick={() => setIsPrivate(!isPrivate)}
                  className={`
                    flex items-center gap-2 text-sm font-bold px-4 py-3 transition-all border
                    ${isPrivate 
                      ? 'bg-stone-900 text-white border-stone-900' 
                      : 'bg-white text-stone-600 border-stone-300 hover:border-stone-900'
                    }
                  `}
                >
                  {isPrivate ? <Lock className="w-4 h-4" /> : <Globe className="w-4 h-4" />}
                  <span>{isPrivate ? 'PRIVATE' : 'PUBLIC'}</span>
                </button>

                <div className="flex items-center gap-3 justify-end">
                  <button 
                    type="button" 
                    onClick={resetForm}
                    className="px-5 py-3 text-stone-500 font-bold hover:text-stone-900 transition-colors uppercase tracking-wider text-xs"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={!title.trim()}
                    className="px-8 py-3 bg-orange-600 text-white font-bold hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all border border-stone-900 uppercase tracking-wider text-xs shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
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
          className="group flex flex-col items-center justify-center aspect-[3/2] border border-dashed border-stone-400 hover:border-stone-900 hover:bg-white transition-all bg-transparent"
        >
           <div className="w-12 h-12 bg-white border border-stone-300 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
             <Plus className="w-6 h-6 text-stone-400 group-hover:text-stone-900" />
           </div>
           <span className="font-bold font-mono text-stone-500 group-hover:text-stone-900 transition-colors uppercase tracking-widest text-xs">Create New</span>
        </button>

        {/* Existing Collections */}
        {collections.map(col => (
          <div 
            key={col.id} 
            onClick={() => onCollectionClick(col)}
            className="group cursor-pointer flex flex-col gap-3 relative"
          >
            <div className="relative aspect-[3/2] overflow-hidden bg-stone-100 border border-stone-900">
              <img 
                src={col.coverUrl} 
                alt={col.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
              />
              
              {/* Privacy Badge */}
              {col.isPrivate && (
                <div className="absolute top-0 right-0 bg-stone-900 p-1.5 border-l border-b border-white">
                  <Lock className="w-3 h-3 text-white" />
                </div>
              )}
              
              <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-stone-900 p-2 flex justify-between items-center">
                <span className="text-xs font-mono font-bold text-stone-900">
                  {col.itemCount} items
                </span>
              </div>
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-stone-900 group-hover:underline transition-colors leading-tight">
                {col.title}
              </h3>
              {col.description && (
                <p className="text-sm text-stone-500 line-clamp-1 mt-1 font-serif italic">{col.description}</p>
              )}
              <div className="flex items-center gap-2 mt-1">
                 <span className="text-xs text-stone-400 font-mono uppercase">Updated {col.updatedAt}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};