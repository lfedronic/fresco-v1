import React, { useState, useMemo } from 'react';
import { Sidebar, ViewType } from './components/Sidebar';
import { Feed } from './components/Feed';
import { FriendsView } from './components/FriendsView';
import { FilterBar } from './components/FilterBar';
import { MobileHeader } from './components/MobileHeader';
import { UserProfile } from './components/UserProfile';
import { MOCK_FEED, USERS } from './constants';
import { ContentType, User } from './types';

// Extended ViewType to include 'profile'
type ExtendedViewType = ViewType | 'profile';

function App() {
  const [currentView, setCurrentView] = useState<ExtendedViewType>('feed');
  const [activeFilter, setActiveFilter] = useState<ContentType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

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

  // Navigation Handlers
  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    setCurrentView('profile');
    window.scrollTo(0,0);
  };

  const handleViewChange = (view: ViewType) => {
    if (view === 'you') {
       // "You" is just the profile view for the current user (Alice)
       handleUserClick(USERS.alice);
    } else {
       setCurrentView(view);
       window.scrollTo(0,0);
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'feed':
        return (
          <>
             {/* Intro Header */}
             <div className="pt-8 pb-4 px-4 md:px-8">
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-stone-800 mb-1">Good Morning, Alice.</h2>
                <p className="text-stone-500 text-base md:text-lg">Here is what your circle is reading this week.</p>
             </div>
            <FilterBar 
               activeFilter={activeFilter} 
               onFilterChange={setActiveFilter}
               searchQuery={searchQuery}
               onSearchChange={setSearchQuery}
             />
             <Feed items={filteredItems} onUserClick={handleUserClick} />
          </>
        );
      case 'friends':
        return <FriendsView onUserClick={handleUserClick} />;
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
      case 'profile':
        if (!selectedUser) return null;
        return (
          <UserProfile 
            user={selectedUser} 
            isCurrentUser={selectedUser.id === USERS.alice.id} 
          />
        );
      default:
        return null;
    }
  };

  // Determine which sidebar item is active
  // If we are viewing "profile" and the user is Alice, highlight 'you'.
  // If we are viewing "profile" and user is NOT Alice, no sidebar item is strictly active (or maybe 'friends'?)
  // For simplicity, we'll keep the sidebar clean if it's a friend profile.
  const getSidebarActiveView = (): ViewType => {
    if (currentView === 'profile') {
      return selectedUser?.id === USERS.alice.id ? 'you' : 'friends'; 
    }
    return currentView as ViewType;
  };

  return (
    <div className="min-h-screen bg-fresco-50 font-sans text-stone-900 flex flex-col lg:flex-row">
      
      {/* Sidebar - Hidden on Mobile */}
      <Sidebar currentView={getSidebarActiveView()} onChangeView={handleViewChange} />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* Mobile Header - Hidden on Desktop */}
        <MobileHeader />
        
        {/* Scrollable Area */}
        <div className="flex-1 overflow-y-auto scroll-smooth relative">
          <div className="max-w-4xl mx-auto">
             {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;