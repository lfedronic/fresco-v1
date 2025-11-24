import React from 'react';
import { User } from '../types';
import { FRIEND_LISTS } from '../constants';
import { UserPlus, Check } from 'lucide-react';

interface UserGridProps {
  title: string;
  users: User[];
  type: 'following' | 'follower' | 'recommended';
  onUserClick?: (user: User) => void;
}

const UserCard: React.FC<{ user: User; type: 'following' | 'follower' | 'recommended'; onClick?: () => void }> = ({ user, type, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="flex flex-col items-center p-4 bg-white border border-stone-900 hover:bg-fresco-50 transition-all group cursor-pointer"
    >
      <div className="relative mb-3">
        <img 
          src={user.avatarUrl} 
          alt={user.name}
          className="w-20 h-20 rounded-none object-cover border border-stone-900 grayscale group-hover:grayscale-0 transition-transform"
        />
        {type === 'recommended' && (
           <div className="absolute -bottom-2 -right-2 bg-stone-900 text-white p-1 shadow-sm border border-white">
              <UserPlus className="w-3 h-3" />
           </div>
        )}
      </div>
      <h3 className="font-bold text-stone-900 text-sm text-center font-serif">{user.name}</h3>
      <p className="text-xs text-stone-500 mb-4 font-mono">{user.handle}</p>
      
      <button className={`
        w-full py-2 px-4 text-xs font-bold uppercase tracking-widest transition-colors border border-stone-900
        ${type === 'following' 
          ? 'bg-fresco-100 text-stone-500 hover:bg-stone-200' 
          : type === 'follower'
            ? 'bg-white text-stone-900 hover:bg-stone-900 hover:text-white'
            : 'bg-stone-900 text-white hover:bg-white hover:text-stone-900'
        }
      `}
      onClick={(e) => e.stopPropagation()} // Prevent card click when button is clicked
      >
        {type === 'following' ? 'Following' : type === 'follower' ? 'Follow Back' : 'Follow'}
      </button>
    </div>
  );
};

const Section: React.FC<UserGridProps> = ({ title, users, type, onUserClick }) => (
  <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
    <div className="flex items-center justify-between mb-4 px-1 border-b border-stone-900 pb-2">
       <h2 className="text-xl font-serif font-bold text-stone-900 flex items-center gap-2">
         {title}
         <span className="text-sm font-mono font-normal text-stone-900 border border-stone-900 px-2 py-0.5">
           {users.length}
         </span>
       </h2>
       {users.length > 4 && (
         <button className="text-sm text-stone-500 font-mono font-bold uppercase hover:text-stone-900 hover:underline">View all</button>
       )}
    </div>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {users.map(user => (
        <UserCard 
          key={user.id} 
          user={user} 
          type={type} 
          onClick={() => onUserClick && onUserClick(user)}
        />
      ))}
    </div>
  </div>
);

export const FriendsView: React.FC<{ onUserClick?: (user: User) => void }> = ({ onUserClick }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 py-8 pb-20">
      <div className="mb-8">
        <h1 className="text-4xl font-serif font-bold text-stone-900 mb-2">Your Circle</h1>
        <p className="text-stone-600 font-serif italic">Manage who you see on your feed and discover new tastemakers.</p>
      </div>
      
      <Section 
        title="Following" 
        users={FRIEND_LISTS.following} 
        type="following" 
        onUserClick={onUserClick}
      />
      
      <Section 
        title="Followers" 
        users={FRIEND_LISTS.followers} 
        type="follower" 
        onUserClick={onUserClick}
      />
      
      <div className="p-6 bg-white border border-stone-900">
         <Section 
          title="Suggested" 
          users={FRIEND_LISTS.recommended} 
          type="recommended" 
          onUserClick={onUserClick}
        />
      </div>
    </div>
  );
};