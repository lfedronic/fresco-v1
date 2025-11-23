import React, { useState, useMemo } from 'react';
import { Sidebar, ViewType } from './components/Sidebar';
import { Feed } from './components/Feed';
import { FriendsView } from './components/FriendsView';
import { CollectionsView } from './components/CollectionsView';
import { CollectionDetail } from './components/CollectionDetail';
import { FilterBar } from './components/FilterBar';
import { MobileHeader } from './components/MobileHeader';
import { UserProfile } from './components/UserProfile';
import { MOCK_FEED, USERS, USER_COLLECTIONS } from './constants';
import { ContentType, User, Collection } from './types';

// Extended ViewType to include 'profile' and 'collection-detail'
type ExtendedViewType = ViewType | 'profile' | 'collection-detail';

function App() {
  const [currentView, setCurrentView] = useState<ExtendedViewType>('feed');
  const [activeFilter, setActiveFilter] = useState<ContentType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null);
  
  // Global Collections State (initialized with mocks)
  // In a real app, this would store all collections, but here we focus on 'alice' (current user) modifications
  // We maintain a map of userId -> Collection[]
  const [allCollections, setAllCollections] = useState<Record<string, Collection[]>>(USER_COLLECTIONS);

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

  const handleNavigateFromProfile = (view: 'collections') => {
    setCurrentView('collections');
    window.scrollTo(0,0);
  };
  
  // Collections Handlers
  const handleCreateCollection = (newCollection: Collection) => {
     const userId = USERS.alice.id;
     setAllCollections(prev => ({
       ...prev,
       [userId]: [newCollection, ...(prev[userId] || [])]
     }));
     // Navigate directly to the new collection detail view
     handleCollectionClick(newCollection);
  };

  const handleCollectionClick = (collection: Collection) => {
    setSelectedCollection(collection);
    setCurrentView('collection-detail');
    window.scrollTo(0,0);
  };

  const handleUpdateCollection = (updatedCollection: Collection) => {
    // Update in global state
    // We need to find which user owns this collection. For simplicity, assuming it's Alice or we just search all.
    // Since we only really edit Alice's collections in this demo:
    const userId = USERS.alice.id;
    
    setAllCollections(prev => ({
      ...prev,
      [userId]: (prev[userId] || []).map(c => c.id === updatedCollection.id ? updatedCollection : c)
    }));
    
    setSelectedCollection(updatedCollection);
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
      case 'collections':
        return (
          <CollectionsView 
            collections={allCollections[USERS.alice.id] || []} 
            onCreateCollection={handleCreateCollection}
            onCollectionClick={handleCollectionClick}
          />
        );
      case 'collection-detail':
        if (!selectedCollection) return null;
        return (
          <CollectionDetail 
            collection={selectedCollection} 
            onBack={() => setCurrentView('collections')} 
            onUpdateCollection={handleUpdateCollection}
          />
        );
      case 'profile':
        if (!selectedUser) return null;
        return (
          <UserProfile 
            user={selectedUser} 
            isCurrentUser={selectedUser.id === USERS.alice.id}
            onNavigate={handleNavigateFromProfile}
            // Pass the dynamic collections list for this user from global state
            collections={allCollections[selectedUser.id]}
            onCollectionClick={handleCollectionClick}
          />
        );
      default:
        return null;
    }
  };

  // Determine which sidebar item is active
  const getSidebarActiveView = (): ViewType => {
    if (currentView === 'profile') {
      return selectedUser?.id === USERS.alice.id ? 'you' : 'friends'; 
    }
    if (currentView === 'collection-detail') {
      return 'collections';
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