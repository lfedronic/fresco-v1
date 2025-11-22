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
    <div className="sticky top-0 z-30 bg-fresco-50/80 backdrop-blur-md border-b border-fresco-100 px-4 md:px-8 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
      
      {/* Search */}
      <div className="relative w-full md:w-96">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-stone-400" />
        </div>
        <input
          type="text"
          placeholder="Search by title, friend, or publisher..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="block w-full pl-10 pr-3 py-2.5 border-none rounded-xl leading-5 bg-white text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:bg-white shadow-sm transition-all"
        />
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
         <button
            onClick={() => onFilterChange('all')}
            className={`
              px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap
              ${activeFilter === 'all' 
                ? 'bg-stone-800 text-white shadow-md' 
                : 'bg-white text-stone-600 hover:bg-fresco-100 border border-transparent'
              }
            `}
          >
            All Updates
          </button>
          <button
            onClick={() => onFilterChange(ContentType.ARTICLE)}
            className={`
              px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap flex items-center gap-2
              ${activeFilter === ContentType.ARTICLE 
                ? 'bg-blue-100 text-blue-800 border border-blue-200 shadow-sm' 
                : 'bg-white text-stone-600 hover:bg-fresco-100'
              }
            `}
          >
            Reads
          </button>
          <button
            onClick={() => onFilterChange(ContentType.VIDEO)}
            className={`
              px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap flex items-center gap-2
              ${activeFilter === ContentType.VIDEO 
                ? 'bg-orange-100 text-orange-800 border border-orange-200 shadow-sm' 
                : 'bg-white text-stone-600 hover:bg-fresco-100'
              }
            `}
          >
            Watch
          </button>
      </div>
    </div>
  );
};