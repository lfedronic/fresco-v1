import React, { useState, useMemo } from 'react';
import { Sidebar, ViewType } from './components/Sidebar';
import { Feed } from './components/Feed';
import { FriendsView } from './components/FriendsView';
import { FilterBar } from './components/FilterBar';
import { MobileHeader } from './components/MobileHeader';
import { MOCK_FEED } from './constants';
import { ContentType } from './types';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('feed');
  const [activeFilter, setActiveFilter] = useState<ContentType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter and Search Logic for Feed
  const filteredItems = useMemo(() => {
    let items = MOCK_FEED;

    if (activeFilter !== 'all') {
      items = items.filter(item => item.type === activeFilter);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      items = items.filter(item => 
        item.title.toLowerCase().includes(query) ||
        item.publicationName.toLowerCase().includes(query) ||
        item.consumedBy.name.toLowerCase().includes(query) ||
        item.description?.toLowerCase().includes(query)
      );
    }
    
    return items.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }, [activeFilter, searchQuery]);

  const renderContent = () => {
    switch (currentView) {
      case 'feed':
        return (
          <>
            <FilterBar 
               activeFilter={activeFilter} 
               onFilterChange={setActiveFilter}
               searchQuery={searchQuery}
               onSearchChange={setSearchQuery}
             />
             <Feed items={filteredItems} />
          </>
        );
      case 'friends':
        return <FriendsView />;
      case 'favorites':
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center px-4">
            <div className="w-16 h-16 bg-red-50 text-red-400 rounded-full flex items-center justify-center mb-4">
              <span className="text-3xl">❤️</span>
            </div>
            <h2 className="text-xl font-serif font-bold text-stone-800 mb-2">Your Favorites</h2>
            <p className="text-stone-400 max-w-sm">Collections of your favorite reads and watches are coming soon.</p>
          </div>
        );
      case 'you':
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center px-4">
            <div className="w-16 h-16 bg-fresco-100 text-fresco-600 rounded-full flex items-center justify-center mb-4">
              <span className="text-3xl">👤</span>
            </div>
            <h2 className="text-xl font-serif font-bold text-stone-800 mb-2">Your Profile</h2>
            <p className="text-stone-400 max-w-sm">Your personal history and curation stats will appear here.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-fresco-50 font-sans text-stone-900 flex flex-col lg:flex-row">
      
      {/* Sidebar - Hidden on Mobile */}
      <Sidebar currentView={currentView} onChangeView={setCurrentView} />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* Mobile Header - Hidden on Desktop */}
        <MobileHeader />
        
        {/* Scrollable Area */}
        <div className="flex-1 overflow-y-auto scroll-smooth relative">
          <div className="max-w-4xl mx-auto">
             {/* Intro Header */}
             {currentView === 'feed' && (
               <div className="pt-8 pb-4 px-4 md:px-8">
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-stone-800 mb-1">Good Morning, Alice.</h2>
                  <p className="text-stone-500 text-base md:text-lg">Here is what your circle is reading this week.</p>
               </div>
             )}

             {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;