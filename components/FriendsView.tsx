import React from 'react';
import { User } from '../types';
import { FRIEND_LISTS } from '../constants';
import { UserPlus, Check } from 'lucide-react';

interface UserGridProps {
  title: string;
  users: User[];
  type: 'following' | 'follower' | 'recommended';
}

const UserCard: React.FC<{ user: User; type: 'following' | 'follower' | 'recommended' }> = ({ user, type }) => {
  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-xl border border-fresco-100 shadow-sm hover:shadow-md transition-all group">
      <div className="relative mb-3">
        <img 
          src={user.avatarUrl} 
          alt={user.name}
          className="w-20 h-20 rounded-full object-cover border-2 border-fresco-100 group-hover:scale-105 transition-transform"
        />
        {type === 'recommended' && (
           <div className="absolute -bottom-1 -right-1 bg-orange-500 text-white p-1 rounded-full shadow-sm">
              <UserPlus className="w-3 h-3" />
           </div>
        )}
      </div>
      <h3 className="font-bold text-stone-800 text-sm text-center">{user.name}</h3>
      <p className="text-xs text-stone-400 mb-4">{user.handle}</p>
      
      <button className={`
        w-full py-1.5 px-4 rounded-full text-xs font-medium transition-colors
        ${type === 'following' 
          ? 'bg-fresco-100 text-fresco-800 hover:bg-fresco-200' 
          : type === 'follower'
            ? 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            : 'bg-stone-800 text-white hover:bg-stone-900'
        }
      `}>
        {type === 'following' ? 'Following' : type === 'follower' ? 'Follow Back' : 'Follow'}
      </button>
    </div>
  );
};

const Section: React.FC<UserGridProps> = ({ title, users, type }) => (
  <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
    <div className="flex items-center justify-between mb-6 px-1">
       <h2 className="text-xl font-serif font-bold text-stone-800 flex items-center gap-2">
         {title}
         <span className="text-sm font-sans font-normal text-stone-400 bg-fresco-100 px-2 py-0.5 rounded-full">
           {users.length}
         </span>
       </h2>
       {users.length > 4 && (
         <button className="text-sm text-fresco-600 font-medium hover:text-fresco-800">View all</button>
       )}
    </div>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {users.map(user => (
        <UserCard key={user.id} user={user} type={type} />
      ))}
    </div>
  </div>
);

export const FriendsView: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 py-8 pb-20">
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-stone-800 mb-2">Your Circle</h1>
        <p className="text-stone-500">Manage who you see on your feed and discover new tastemakers.</p>
      </div>
      
      <Section 
        title="Following" 
        users={FRIEND_LISTS.following} 
        type="following" 
      />
      
      <Section 
        title="Followers" 
        users={FRIEND_LISTS.followers} 
        type="follower" 
      />
      
      <div className="p-6 bg-orange-50/50 rounded-2xl border border-orange-100">
         <Section 
          title="Suggested for you" 
          users={FRIEND_LISTS.recommended} 
          type="recommended" 
        />
      </div>
    </div>
  );
};