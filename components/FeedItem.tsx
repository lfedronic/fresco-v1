import React from 'react';
import { FeedItem as FeedItemType, ContentType } from '../types';
import { Play, BookOpen, ExternalLink, Clock, Share2 } from 'lucide-react';

interface Props {
  item: FeedItemType;
}

export const FeedItem: React.FC<Props> = ({ item }) => {
  const isArticle = item.type === ContentType.ARTICLE;

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }).format(new Date(item.timestamp));

  return (
    <div className="group relative mb-8 w-full max-w-3xl mx-auto transition-all duration-300 ease-out">
      
      {/* Connector Line for timeline effect (optional aesthetic choice) */}
      <div className="absolute -left-4 md:-left-8 top-8 bottom-0 w-px bg-fresco-200 group-last:hidden" />
      <div className="absolute -left-[21px] md:-left-[37px] top-8 w-2.5 h-2.5 rounded-full bg-fresco-300 border-2 border-white z-10" />

      {/* User Attribution Header */}
      <div className="flex items-center gap-3 mb-3">
        <button className="relative group/avatar">
          <img 
            src={item.consumedBy.avatarUrl} 
            alt={item.consumedBy.name}
            className="w-10 h-10 rounded-full object-cover border-2 border-fresco-100 shadow-sm transition-transform group-hover/avatar:scale-105"
          />
        </button>
        <div className="flex flex-col">
          <span className="text-sm text-stone-800 font-medium">
            <span className="font-bold hover:text-fresco-800 cursor-pointer transition-colors">{item.consumedBy.name}</span> 
            <span className="text-stone-500 font-normal">
              {isArticle ? ' read' : ' watched'}
            </span>
          </span>
          <span className="text-xs text-stone-400">{formattedDate}</span>
        </div>
      </div>

      {/* Card Content */}
      <div className={`
        relative overflow-hidden rounded-2xl border transition-all duration-300 shadow-sm hover:shadow-md
        ${isArticle 
          ? 'bg-white border-stone-200' 
          : 'bg-stone-900 border-stone-800 text-white'
        }
      `}>
        <a href={item.url} target="_blank" rel="noopener noreferrer" className="block">
          
          {/* Article Layout */}
          {isArticle && (
            <div className="flex flex-col md:flex-row">
               <div className="md:w-2/5 h-48 md:h-auto relative overflow-hidden">
                <img 
                  src={item.thumbnailUrl} 
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Icon badge */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm p-1.5 rounded-lg shadow-sm">
                    <BookOpen className="w-4 h-4 text-stone-700" />
                </div>
              </div>
              
              <div className="md:w-3/5 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold tracking-wider text-fresco-600 uppercase">
                      {item.publicationName}
                    </span>
                    {item.readTimeOrDuration && (
                      <span className="text-xs text-stone-400 flex items-center gap-1">
                         <Clock className="w-3 h-3" /> {item.readTimeOrDuration}
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif text-xl md:text-2xl leading-snug text-stone-900 mb-3 group-hover:text-fresco-800 transition-colors">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-stone-500 text-sm leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  )}
                </div>
                
                <div className="mt-4 flex items-center gap-2 text-xs font-medium text-stone-400 group-hover:text-fresco-600 transition-colors">
                  <span>Read article</span>
                  <ExternalLink className="w-3 h-3" />
                </div>
              </div>
            </div>
          )}

          {/* Video Layout */}
          {!isArticle && (
            <div className="flex flex-col">
              <div className="relative w-full aspect-video overflow-hidden bg-black">
                 <img 
                  src={item.thumbnailUrl} 
                  alt={item.title}
                  className="w-full h-full object-cover opacity-80 transition-opacity duration-300 group-hover:opacity-60"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 transition-transform duration-300 group-hover:scale-110">
                     <Play className="w-6 h-6 text-white fill-white ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-3 right-3 bg-black/70 px-2 py-1 rounded text-xs font-medium text-white">
                  {item.readTimeOrDuration}
                </div>
              </div>
              
              <div className="p-5">
                <div className="flex items-start justify-between">
                   <div>
                      <h3 className="font-sans font-semibold text-lg md:text-xl leading-tight text-stone-100 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-stone-400 text-sm">
                        {item.publicationName}
                      </p>
                   </div>
                   <button className="p-2 rounded-full hover:bg-white/10 text-stone-400 hover:text-white transition-colors">
                      <Share2 className="w-5 h-5" />
                   </button>
                </div>
                {item.description && (
                  <p className="mt-3 text-stone-400 text-sm line-clamp-2">
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