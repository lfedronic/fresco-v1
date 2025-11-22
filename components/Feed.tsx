import React from 'react';
import { FeedItem as FeedItemType, GroupedFeed } from '../types';
import { FeedItem } from './FeedItem';

interface Props {
  items: FeedItemType[];
  emptyMessage?: string;
}

// Helper to group items by week
const groupItemsByWeek = (items: FeedItemType[]): GroupedFeed[] => {
  const groups: Record<string, FeedItemType[]> = {};
  const now = new Date();
  
  // Helper to get week key
  const getWeekKey = (dateStr: string) => {
    const date = new Date(dateStr);
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 7) return 'This Week';
    if (diffDays <= 14) return 'Last Week';
    if (diffDays <= 21) return '2 Weeks Ago';
    
    // Fallback to Month Year
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  };

  items.forEach(item => {
    const key = getWeekKey(item.timestamp);
    if (!groups[key]) groups[key] = [];
    groups[key].push(item);
  });

  // Convert to array and maintain specific order logic if needed, 
  // currently relying on insertion order which approximates chronological if input is sorted
  return Object.keys(groups).map(key => ({
    weekLabel: key,
    items: groups[key]
  }));
};

export const Feed: React.FC<Props> = ({ items, emptyMessage = "No stories found." }) => {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center px-4">
        <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mb-4">
          <span className="text-3xl">🍃</span>
        </div>
        <h3 className="text-xl font-serif text-stone-600 mb-2">Quiet in here</h3>
        <p className="text-stone-400 max-w-xs">{emptyMessage}</p>
      </div>
    );
  }

  const groupedFeed = groupItemsByWeek(items);

  return (
    <div className="w-full pb-20">
      {groupedFeed.map((group) => (
        <div key={group.weekLabel} className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          
          {/* Sticky Week Header */}
          <div className="sticky top-0 z-20 py-4 bg-fresco-50/95 backdrop-blur-sm mb-6 border-b border-fresco-100">
             <h2 className="text-sm font-bold tracking-widest text-stone-400 uppercase text-center">
              {group.weekLabel}
             </h2>
          </div>

          <div className="px-4 md:px-8">
            {group.items.map(item => (
              <FeedItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      ))}
      
      <div className="text-center py-12">
        <p className="text-stone-400 text-sm font-serif italic">You're all caught up</p>
      </div>
    </div>
  );
};