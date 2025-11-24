import React, { useState } from 'react';
import { User, FeedItem as FeedItemType, Collection } from '../types';
import { Feed } from './Feed';
import { MOCK_FEED, USER_COLLECTIONS } from '../constants';
import { Layers, Grid, Link2, MapPin, Calendar } from 'lucide-react';

interface Props {
  user: User;
  isCurrentUser?: boolean;
  onNavigate?: (view: 'collections') => void;
  collections?: Collection[]; // Accept dynamic collections
  onCollectionClick?: (collection: Collection) => void;
}

export const UserProfile: React.FC<Props> = ({ 
  user, 
  isCurrentUser = false, 
  onNavigate, 
  collections: propCollections,
  onCollectionClick
}) => {
  const [activeTab, setActiveTab] = useState<'activity' | 'collections'>('activity');

  const handleTabChange = (tab: 'activity' | 'collections') => {
    if (tab === 'collections' && isCurrentUser && onNavigate) {
      onNavigate('collections');
    } else {
      setActiveTab(tab);
    }
  };

  // Filter feed for this user
  const userFeed = MOCK_FEED.filter(item => item.consumedBy.id === user.id)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  // Use passed collections if available (e.g. for logged in user), otherwise fallback to constant
  const collections = propCollections || USER_COLLECTIONS[user.id] || [];

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Profile Header */}
      <div className="relative border-b border-stone-900 pb-0 mb-8 bg-white">
        {/* Cover Photo Placeholder */}
        <div className="h-32 md:h-48 bg-stone-200 w-full border-b border-stone-900 pattern-diagonal-lines"></div>
        
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-start gap-6 -mt-12 mb-6">
            {/* Avatar */}
            <div className="relative">
               <img 
                src={user.avatarUrl} 
                alt={user.name} 
                className="w-24 h-24 md:w-32 md:h-32 rounded-none border border-stone-900 shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] object-cover bg-white grayscale hover:grayscale-0 transition-all"
              />
            </div>

            {/* Info */}
            <div className="flex-1 pt-2 md:pt-14">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                 <div>
                    <h1 className="text-3xl font-serif font-bold text-stone-900">{user.name}</h1>
                    <p className="text-stone-500 font-mono text-sm">{user.handle}</p>
                 </div>
                 
                 {!isCurrentUser && (
                   <button className="px-6 py-2 bg-stone-900 text-white font-bold uppercase tracking-widest text-xs border border-stone-900 hover:bg-white hover:text-stone-900 transition-all">
                     Follow
                   </button>
                 )}
                 {isCurrentUser && (
                   <button className="px-6 py-2 border border-stone-900 text-stone-900 font-bold uppercase tracking-widest text-xs hover:bg-stone-900 hover:text-white transition-all">
                     Edit Profile
                   </button>
                 )}
              </div>

              {user.bio && (
                <p className="text-stone-700 text-base font-serif italic leading-relaxed max-w-xl mb-4 border-l-2 border-stone-300 pl-3">
                  {user.bio}
                </p>
              )}

              <div className="flex items-center gap-6 text-sm text-stone-500 font-mono">
                 <div className="flex items-center gap-1">
                    <span className="font-bold text-stone-900">142</span> Following
                 </div>
                 <div className="flex items-center gap-1">
                    <span className="font-bold text-stone-900">895</span> Followers
                 </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-0">
            <button 
              onClick={() => handleTabChange('activity')}
              className={`
                flex items-center gap-2 px-6 py-3 border-r border-t border-l border-stone-900 text-sm font-bold uppercase tracking-wider transition-all -mb-[1px]
                ${activeTab === 'activity' 
                  ? 'bg-fresco-50 text-stone-900 border-b-transparent' 
                  : 'bg-white text-stone-400 hover:text-stone-900 border-b-stone-900 border-t-transparent border-l-transparent border-r-transparent'
                }
              `}
            >
              <Layers className="w-4 h-4" />
              Activity
            </button>
            <button 
              onClick={() => handleTabChange('collections')}
              className={`
                flex items-center gap-2 px-6 py-3 border-r border-t border-l border-stone-900 text-sm font-bold uppercase tracking-wider transition-all -mb-[1px]
                ${activeTab === 'collections' 
                  ? 'bg-fresco-50 text-stone-900 border-b-transparent' 
                  : 'bg-white text-stone-400 hover:text-stone-900 border-b-stone-900 border-t-transparent border-l-transparent border-r-transparent'
                }
              `}
            >
              <Grid className="w-4 h-4" />
              Collections
            </button>
            {/* Filler for the rest of the tab line */}
            <div className="flex-1 border-b border-stone-900 self-end h-[1px]"></div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 pb-20">
        
        {activeTab === 'activity' && (
           <div className="animate-in fade-in duration-500 pt-8">
              <Feed items={userFeed} emptyMessage={`${user.name} hasn't curated anything yet.`} />
           </div>
        )}

        {activeTab === 'collections' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-500 pt-8">
             {collections.length === 0 ? (
                <div className="col-span-full py-20 text-center border border-dashed border-stone-300">
                   <div className="w-16 h-16 bg-stone-100 rounded-none flex items-center justify-center mx-auto mb-4 text-stone-400">
                     <Grid className="w-8 h-8" />
                   </div>
                   <h3 className="text-stone-900 font-bold mb-1 font-serif">No collections yet</h3>
                   <p className="text-stone-400 text-sm font-mono">When {user.name} creates a list, it will appear here.</p>
                </div>
             ) : (
               collections.map(col => (
                 <div 
                    key={col.id} 
                    onClick={() => onCollectionClick && onCollectionClick(col)}
                    className="group cursor-pointer flex flex-col gap-3"
                  >
                    <div className="relative aspect-[3/2] overflow-hidden bg-stone-100 border border-stone-900">
                       <img 
                        src={col.coverUrl} 
                        alt={col.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 grayscale group-hover:grayscale-0"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-stone-900 p-2">
                         <span className="text-xs font-mono font-bold text-stone-900">
                           {col.itemCount} items
                         </span>
                      </div>
                    </div>
                    <div>
                       <h3 className="font-serif font-bold text-lg text-stone-900 group-hover:underline transition-colors">
                         {col.title}
                       </h3>
                       {col.description && (
                         <p className="text-sm text-stone-500 line-clamp-1 italic">{col.description}</p>
                       )}
                       <p className="text-xs text-stone-400 mt-1 font-mono uppercase">Updated {col.updatedAt}</p>
                    </div>
                 </div>
               ))
             )}
          </div>
        )}

      </div>
    </div>
  );
};