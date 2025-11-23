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
    // If it's the current user clicking collections, redirect to the main Collections Management view
    // NOT the profile collections list, which is read-onlyish.
    // Actually per user request: "clicking the collections subtab within the user profile tab (if its the user themself) should also navigate to this collections creation page."
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
      <div className="relative bg-white border-b border-fresco-100 pb-0 mb-8">
        {/* Cover Photo Placeholder (Optional) */}
        <div className="h-32 md:h-48 bg-gradient-to-r from-fresco-200 to-stone-200 w-full"></div>
        
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-start gap-6 -mt-12 mb-6">
            {/* Avatar */}
            <div className="relative">
               <img 
                src={user.avatarUrl} 
                alt={user.name} 
                className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-md object-cover bg-white"
              />
            </div>

            {/* Info */}
            <div className="flex-1 pt-2 md:pt-14">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                 <div>
                    <h1 className="text-2xl md:text-3xl font-serif font-bold text-stone-900">{user.name}</h1>
                    <p className="text-stone-500">{user.handle}</p>
                 </div>
                 
                 {!isCurrentUser && (
                   <button className="px-6 py-2 bg-stone-900 text-white font-medium rounded-full shadow-sm hover:bg-stone-800 transition-all active:scale-95">
                     Follow
                   </button>
                 )}
                 {isCurrentUser && (
                   <button className="px-6 py-2 border border-stone-300 text-stone-600 font-medium rounded-full hover:bg-stone-50 transition-all">
                     Edit Profile
                   </button>
                 )}
              </div>

              {user.bio && (
                <p className="text-stone-600 text-sm md:text-base leading-relaxed max-w-xl mb-4">
                  {user.bio}
                </p>
              )}

              <div className="flex items-center gap-6 text-sm text-stone-500">
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
          <div className="flex items-center gap-8 border-t border-transparent">
            <button 
              onClick={() => handleTabChange('activity')}
              className={`
                flex items-center gap-2 pb-3 pt-2 border-b-2 text-sm font-medium transition-all
                ${activeTab === 'activity' 
                  ? 'border-stone-800 text-stone-900' 
                  : 'border-transparent text-stone-400 hover:text-stone-600'
                }
              `}
            >
              <Layers className="w-4 h-4" />
              Activity
            </button>
            <button 
              onClick={() => handleTabChange('collections')}
              className={`
                flex items-center gap-2 pb-3 pt-2 border-b-2 text-sm font-medium transition-all
                ${activeTab === 'collections' 
                  ? 'border-stone-800 text-stone-900' 
                  : 'border-transparent text-stone-400 hover:text-stone-600'
                }
              `}
            >
              <Grid className="w-4 h-4" />
              Collections
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 pb-20">
        
        {activeTab === 'activity' && (
           <div className="animate-in fade-in duration-500">
              <Feed items={userFeed} emptyMessage={`${user.name} hasn't curated anything yet.`} />
           </div>
        )}

        {activeTab === 'collections' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-500">
             {collections.length === 0 ? (
                <div className="col-span-full py-20 text-center">
                   <div className="w-16 h-16 bg-fresco-100 rounded-full flex items-center justify-center mx-auto mb-4 text-fresco-500">
                     <Grid className="w-8 h-8" />
                   </div>
                   <h3 className="text-stone-900 font-medium mb-1">No collections yet</h3>
                   <p className="text-stone-400 text-sm">When {user.name} creates a list, it will appear here.</p>
                </div>
             ) : (
               collections.map(col => (
                 <div 
                    key={col.id} 
                    onClick={() => onCollectionClick && onCollectionClick(col)}
                    className="group cursor-pointer flex flex-col gap-3"
                  >
                    <div className="relative aspect-[3/2] rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
                       <img 
                        src={col.coverUrl} 
                        alt={col.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                      <div className="absolute bottom-3 left-3 text-white">
                         <span className="text-xs font-medium bg-black/30 backdrop-blur-sm px-2 py-1 rounded-md border border-white/20">
                           {col.itemCount} items
                         </span>
                      </div>
                    </div>
                    <div>
                       <h3 className="font-serif font-bold text-lg text-stone-900 group-hover:text-fresco-700 transition-colors">
                         {col.title}
                       </h3>
                       {col.description && (
                         <p className="text-sm text-stone-500 line-clamp-1">{col.description}</p>
                       )}
                       <p className="text-xs text-stone-400 mt-1">Updated {col.updatedAt}</p>
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