import React from 'react';
import { Search, Filter } from 'lucide-react';
import { ContentType } from '../types';

interface Props {
  activeFilter: ContentType | 'all';
  onFilterChange: (filter: ContentType | 'all') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const FilterBar: React.FC<Props> = ({ activeFilter, onFilterChange, searchQuery, onSearchChange }) => {
  return (
    <div className="sticky top-0 z-30 bg-fresco-50 border-b border-stone-900 px-4 md:px-8 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
      
      {/* Search */}
      <div className="relative w-full md:w-96">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-stone-900" />
        </div>
        <input
          type="text"
          placeholder="Search items..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="block w-full pl-10 pr-3 py-2 border border-stone-400 rounded-none leading-5 bg-transparent text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-900 focus:ring-0 transition-all"
        />
      </div>

      {/* Filters */}
      <div className="flex items-center gap-0 border border-stone-900 bg-white">
         <button
            onClick={() => onFilterChange('all')}
            className={`
              px-4 py-2 text-sm font-bold border-r border-stone-900 last:border-r-0 transition-all uppercase tracking-wide
              ${activeFilter === 'all' 
                ? 'bg-stone-900 text-white' 
                : 'bg-white text-stone-500 hover:text-stone-900 hover:bg-fresco-100'
              }
            `}
          >
            All
          </button>
          <button
            onClick={() => onFilterChange(ContentType.ARTICLE)}
            className={`
              px-4 py-2 text-sm font-bold border-r border-stone-900 last:border-r-0 transition-all uppercase tracking-wide
              ${activeFilter === ContentType.ARTICLE 
                ? 'bg-stone-900 text-white' 
                : 'bg-white text-stone-500 hover:text-stone-900 hover:bg-fresco-100'
              }
            `}
          >
            Reads
          </button>
          <button
            onClick={() => onFilterChange(ContentType.VIDEO)}
            className={`
              px-4 py-2 text-sm font-bold transition-all uppercase tracking-wide
              ${activeFilter === ContentType.VIDEO 
                ? 'bg-stone-900 text-white' 
                : 'bg-white text-stone-500 hover:text-stone-900 hover:bg-fresco-100'
              }
            `}
          >
            Watch
          </button>
      </div>
    </div>
  );
};