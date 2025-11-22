import React, { useState, useMemo } from 'react';
import { Sidebar } from './components/Sidebar';
import { Feed } from './components/Feed';
import { FilterBar } from './components/FilterBar';
import { MobileHeader } from './components/MobileHeader';
import { MOCK_FEED } from './constants';
import { ContentType } from './types';

function App() {
  const [activeFilter, setActiveFilter] = useState<ContentType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter and Search Logic
  const filteredItems = useMemo(() => {
    let items = MOCK_FEED;

    // 1. Filter by Category (Article/Video)
    if (activeFilter !== 'all') {
      items = items.filter(item => item.type === activeFilter);
    }

    // 2. Filter by Search Query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      items = items.filter(item => 
        item.title.toLowerCase().includes(query) ||
        item.publicationName.toLowerCase().includes(query) ||
        item.consumedBy.name.toLowerCase().includes(query) ||
        item.description?.toLowerCase().includes(query)
      );
    }
    
    // Sort by date descending
    return items.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }, [activeFilter, searchQuery]);

  return (
    <div className="min-h-screen bg-fresco-50 font-sans text-stone-900 flex flex-col lg:flex-row">
      
      {/* Sidebar - Hidden on Mobile */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* Mobile Header - Hidden on Desktop */}
        <MobileHeader />
        
        {/* Scrollable Area */}
        <div className="flex-1 overflow-y-auto scroll-smooth relative">
          <div className="max-w-4xl mx-auto">
             {/* Header / Intro */}
             <div className="pt-8 pb-2 px-4 md:px-8 lg:hidden">
                <h2 className="text-2xl font-serif font-bold text-stone-800">Good Morning, Alice.</h2>
                <p className="text-stone-500">Here is what your circle is reading this week.</p>
             </div>

             {/* Sticky Filter Bar */}
             <FilterBar 
               activeFilter={activeFilter} 
               onFilterChange={setActiveFilter}
               searchQuery={searchQuery}
               onSearchChange={setSearchQuery}
             />

             {/* Feed Content */}
             <Feed items={filteredItems} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;