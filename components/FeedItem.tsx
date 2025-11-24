import React from 'react';
import { FeedItem as FeedItemType, ContentType, User } from '../types';
import { Play, BookOpen, ExternalLink, Clock, Share2 } from 'lucide-react';

interface Props {
  item: FeedItemType;
  onUserClick?: (user: User) => void;
}

export const FeedItem: React.FC<Props> = ({ item, onUserClick }) => {
  const isArticle = item.type === ContentType.ARTICLE;

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }).format(new Date(item.timestamp));

  const handleUserClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onUserClick) {
      onUserClick(item.consumedBy);
    }
  };

  return (
    <div className="group relative mb-8 w-full max-w-3xl mx-auto">
      
      {/* User Attribution Header */}
      <div className="flex items-center justify-between mb-2 pb-2 border-b border-stone-300 border-dashed">
        <div className="flex items-center gap-3">
            <button onClick={handleUserClick} className="relative group/avatar">
            <img 
                src={item.consumedBy.avatarUrl} 
                alt={item.consumedBy.name}
                className="w-8 h-8 rounded-none object-cover border border-stone-900 grayscale group-hover/avatar:grayscale-0 transition-all"
            />
            </button>
            <div className="flex items-baseline gap-2">
            <button onClick={handleUserClick} className="text-sm font-bold text-stone-900 hover:underline">
                {item.consumedBy.name}
            </button> 
            <span className="text-xs font-serif italic text-stone-500">
                {isArticle ? 'read' : 'watched'}
            </span>
            </div>
        </div>
        <span className="text-xs font-mono text-stone-500 uppercase tracking-tight">{formattedDate}</span>
      </div>

      {/* Card Content */}
      <div className={`
        relative border border-stone-900 bg-white transition-all duration-200
        hover:translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(28,25,23,1)]
      `}>
        <a href={item.url} target="_blank" rel="noopener noreferrer" className="block">
          
          {/* Article Layout */}
          {isArticle && (
            <div className="flex flex-col md:flex-row">
               <div className="md:w-1/3 h-48 md:h-auto relative border-b md:border-b-0 md:border-r border-stone-900 overflow-hidden group-inner">
                <img 
                  src={item.thumbnailUrl} 
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute top-0 left-0 bg-stone-900 text-white px-2 py-1">
                    <BookOpen className="w-3 h-3" />
                </div>
              </div>
              
              <div className="md:w-2/3 p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold tracking-wider text-stone-900 uppercase border border-stone-200 px-1">
                      {item.publicationName}
                    </span>
                    {item.readTimeOrDuration && (
                      <span className="text-xs font-mono text-stone-400 flex items-center gap-1">
                         {item.readTimeOrDuration}
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif text-xl md:text-2xl leading-tight text-stone-900 mb-3 group-hover:text-orange-700 transition-colors">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-stone-600 text-sm leading-relaxed line-clamp-3 font-serif">
                      {item.description}
                    </p>
                  )}
                </div>
                
                <div className="mt-4 flex items-center justify-end gap-1 text-xs font-bold uppercase tracking-widest text-stone-900 group-hover:underline">
                  <span>Read Story</span>
                  <ExternalLink className="w-3 h-3" />
                </div>
              </div>
            </div>
          )}

          {/* Video Layout */}
          {!isArticle && (
            <div className="flex flex-col">
              <div className="relative w-full aspect-video border-b border-stone-900 bg-black overflow-hidden">
                 <img 
                  src={item.thumbnailUrl} 
                  alt={item.title}
                  className="w-full h-full object-cover opacity-80 grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white border border-stone-900 flex items-center justify-center hover:bg-stone-900 hover:text-white transition-colors">
                     <Play className="w-5 h-5 ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-0 right-0 bg-stone-900 px-2 py-0.5 text-xs font-mono text-white border-t border-l border-white">
                  {item.readTimeOrDuration}
                </div>
              </div>
              
              <div className="p-5 bg-stone-900">
                <div className="flex items-start justify-between">
                   <div>
                      <h3 className="font-sans font-bold text-lg md:text-xl leading-tight text-white mb-1">
                        {item.title}
                      </h3>
                      <p className="text-stone-400 text-sm font-mono uppercase tracking-wider">
                        {item.publicationName}
                      </p>
                   </div>
                   <button className="p-2 text-stone-400 hover:text-white transition-colors">
                      <Share2 className="w-4 h-4" />
                   </button>
                </div>
                {item.description && (
                  <p className="mt-3 text-stone-400 text-sm line-clamp-2 font-serif border-l-2 border-stone-700 pl-3">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          )}

        </a>
      </div>
    </div>
  );
};