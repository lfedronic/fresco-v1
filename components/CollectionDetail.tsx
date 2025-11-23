import React, { useState } from 'react';
import { Collection, FeedItem, ContentType } from '../types';
import { MOCK_FEED, USERS } from '../constants';
import { ArrowLeft, Plus, Search, Link as LinkIcon, Trash2, MoreHorizontal, BookOpen, Play } from 'lucide-react';

interface Props {
  collection: Collection;
  onBack: () => void;
  onUpdateCollection: (updated: Collection) => void;
}

export const CollectionDetail: React.FC<Props> = ({ collection, onBack, onUpdateCollection }) => {
  const [activeTab, setActiveTab] = useState<'list' | 'add'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [urlInput, setUrlInput] = useState('');
  
  // Local state for items if not present in collection (fallback for mock data)
  const collectionItems = collection.items || [];

  const handleAddItem = (item: FeedItem) => {
    const updatedCollection = {
      ...collection,
      items: [item, ...(collection.items || [])],
      itemCount: (collection.itemCount || 0) + 1
    };
    onUpdateCollection(updatedCollection);
    setActiveTab('list');
  };

  const handleCreateFromUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;

    // Mock creating an item from URL
    const newItem: FeedItem = {
      id: `new_${Date.now()}`,
      type: ContentType.ARTICLE,
      title: 'New Saved Link',
      publicationName: new URL(urlInput).hostname,
      url: urlInput,
      thumbnailUrl: `https://picsum.photos/seed/${Date.now()}/200/200`,
      description: 'Manually added via link.',
      consumedBy: USERS.alice,
      timestamp: new Date().toISOString(),
      readTimeOrDuration: '5 min'
    };

    handleAddItem(newItem);
    setUrlInput('');
  };

  const handleRemoveItem = (itemId: string) => {
    const updatedCollection = {
      ...collection,
      items: (collection.items || []).filter(i => i.id !== itemId),
      itemCount: Math.max(0, (collection.itemCount || 0) - 1)
    };
    onUpdateCollection(updatedCollection);
  };

  // Filter MOCK_FEED for "saved content" search
  const searchResults = MOCK_FEED.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.publicationName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-8 pb-20 animate-in fade-in duration-300">
      {/* Navigation */}
      <button 
        onClick={onBack}
        className="group flex items-center gap-2 text-stone-500 hover:text-stone-800 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium">Back to Collections</span>
      </button>

      {/* Header */}
      <div className="relative bg-white rounded-2xl p-8 border border-stone-200 shadow-sm mb-8 overflow-hidden">
        <div className="absolute top-0 right-0 p-4">
           <button className="text-stone-400 hover:text-stone-600 p-2 hover:bg-stone-100 rounded-full transition-colors">
             <MoreHorizontal className="w-5 h-5" />
           </button>
        </div>
        <div className="flex flex-col md:flex-row gap-6 items-start relative z-10">
          <div className="w-32 h-32 rounded-xl overflow-hidden shadow-md bg-stone-100 shrink-0">
            <img src={collection.coverUrl} alt={collection.title} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-serif font-bold text-stone-900">{collection.title}</h1>
              {collection.isPrivate && (
                 <span className="bg-stone-100 text-stone-500 text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">Private</span>
              )}
            </div>
            <p className="text-stone-600 text-lg mb-4 max-w-2xl">{collection.description || 'No description provided.'}</p>
            <div className="flex items-center gap-4 text-sm text-stone-500">
              <span>{collection.itemCount} items</span>
              <span className="w-1 h-1 bg-stone-300 rounded-full"></span>
              <span>Updated {collection.updatedAt}</span>
            </div>
          </div>
        </div>
        {/* Background decoration */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-orange-50 rounded-full opacity-50 blur-3xl"></div>
      </div>

      {/* Action Tabs */}
      <div className="flex items-center gap-1 mb-6 border-b border-fresco-200">
        <button
          onClick={() => setActiveTab('list')}
          className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'list' ? 'border-stone-800 text-stone-900' : 'border-transparent text-stone-400 hover:text-stone-600'}`}
        >
          Content
        </button>
        <button
          onClick={() => setActiveTab('add')}
          className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'add' ? 'border-orange-500 text-orange-600' : 'border-transparent text-stone-400 hover:text-stone-600'}`}
        >
          Add Items
        </button>
      </div>

      {activeTab === 'list' ? (
        <div className="space-y-3">
           {collectionItems.length === 0 ? (
             <div className="text-center py-16 bg-stone-50 rounded-xl border border-dashed border-stone-200">
                <p className="text-stone-500 mb-4">This collection is empty.</p>
                <button 
                  onClick={() => setActiveTab('add')}
                  className="px-4 py-2 bg-stone-800 text-white text-sm font-medium rounded-full hover:bg-stone-900 transition-colors"
                >
                  Add your first item
                </button>
             </div>
           ) : (
             collectionItems.map(item => (
               <div key={item.id} className="group flex items-start gap-4 p-4 bg-white rounded-xl border border-fresco-100 hover:border-fresco-300 hover:shadow-md transition-all">
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-stone-100 shrink-0 relative">
                    <img src={item.thumbnailUrl} alt={item.title} className="w-full h-full object-cover" />
                     <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                        {item.type === ContentType.ARTICLE ? <BookOpen className="w-5 h-5 text-white drop-shadow-sm" /> : <Play className="w-5 h-5 text-white drop-shadow-sm" />}
                     </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-stone-900 truncate pr-4">{item.title}</h3>
                      <button 
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-stone-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-sm text-stone-500 mb-1">{item.publicationName}</p>
                    <p className="text-xs text-stone-400 line-clamp-1">{item.description}</p>
                  </div>
               </div>
             ))
           )}
        </div>
      ) : (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
           
           {/* Add via URL */}
           <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
              <h3 className="font-bold text-stone-800 mb-4 flex items-center gap-2">
                <LinkIcon className="w-4 h-4" />
                Add from Link
              </h3>
              <form onSubmit={handleCreateFromUrl} className="flex gap-3">
                <input 
                  type="url" 
                  placeholder="Paste a URL (e.g. https://nytimes.com/...)"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  className="flex-1 px-4 py-2.5 bg-white border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-stone-200"
                />
                <button type="submit" className="px-5 py-2.5 bg-stone-900 text-white font-medium rounded-xl text-sm hover:bg-stone-800 transition-colors">
                  Add Link
                </button>
              </form>
           </div>

           {/* Search Saved */}
           <div>
              <h3 className="font-bold text-stone-800 mb-4 flex items-center gap-2">
                <Search className="w-4 h-4" />
                Search Saved Content
              </h3>
              <div className="relative mb-4">
                 <Search className="absolute left-3 top-3 w-4 h-4 text-stone-400" />
                 <input 
                  type="text"
                  placeholder="Search your history..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-stone-200"
                 />
              </div>
              
              {searchQuery && (
                <div className="space-y-2">
                  {searchResults.length === 0 ? (
                    <p className="text-stone-500 text-sm italic">No results found.</p>
                  ) : (
                    searchResults.slice(0, 3).map(item => (
                      <div key={item.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-stone-100">
                         <div className="flex items-center gap-3 overflow-hidden">
                            <img src={item.thumbnailUrl} className="w-10 h-10 rounded object-cover" alt="" />
                            <div className="min-w-0">
                               <p className="text-sm font-medium text-stone-900 truncate">{item.title}</p>
                               <p className="text-xs text-stone-500">{item.publicationName}</p>
                            </div>
                         </div>
                         <button 
                           onClick={() => handleAddItem(item)}
                           className="ml-4 px-3 py-1.5 bg-fresco-100 text-fresco-700 text-xs font-bold rounded-full hover:bg-fresco-200 transition-colors"
                         >
                           Add
                         </button>
                      </div>
                    ))
                  )}
                </div>
              )}
           </div>
        </div>
      )}
    </div>
  );
};