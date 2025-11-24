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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Global Collections State
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
    setIsMobileMenuOpen(false);
    window.scrollTo(0,0);
  };

  const handleViewChange = (view: ViewType) => {
    if (view === 'you') {
       handleUserClick(USERS.alice);
    } else {
       setCurrentView(view);
       window.scrollTo(0,0);
    }
    setIsMobileMenuOpen(false);
  };

  const handleNavigateFromProfile = (view: 'collections') => {
    setCurrentView('collections');
    window.scrollTo(0,0);
  };
  
  const handleLogoClick = () => {
    setCurrentView('feed');
    setIsMobileMenuOpen(false);
    window.scrollTo(0,0);
  };

  // Collections Handlers
  const handleCreateCollection = (newCollection: Collection) => {
     const userId = USERS.alice.id;
     setAllCollections(prev => ({
       ...prev,
       [userId]: [newCollection, ...(prev[userId] || [])]
     }));
     handleCollectionClick(newCollection);
  };

  const handleCollectionClick = (collection: Collection) => {
    setSelectedCollection(collection);
    setCurrentView('collection-detail');
    setIsMobileMenuOpen(false);
    window.scrollTo(0,0);
  };

  const handleUpdateCollection = (updatedCollection: Collection) => {
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
             <div className="pt-8 pb-4 px-4 md:px-8">
                {/* Newspaper Masthead Effect */}
                <div className="border-b-4 border-stone-900 mb-1">
                    <div className="border-b border-stone-900 pb-4 mb-1">
                        <h2 className="text-3xl md:text-5xl font-serif font-bold text-stone-900 mb-2 tracking-tight">
                            Good Morning, Alice.
                        </h2>
                        <div className="flex items-center justify-between">
                            <p className="text-stone-600 text-sm md:text-base font-serif italic">
                                Your curated digest for the week.
                            </p>
                            <span className="text-xs font-mono uppercase tracking-widest text-stone-400">
                                Vol. 24
                            </span>
                        </div>
                    </div>
                </div>
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
            collections={allCollections[selectedUser.id]}
            onCollectionClick={handleCollectionClick}
          />
        );
      default:
        return null;
    }
  };

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
    <div className="min-h-screen bg-fresco-50 texture-paper font-sans text-stone-900 flex flex-col lg:flex-row">
      
      {/* Desktop Sidebar */}
      <Sidebar 
        className="hidden lg:flex w-64 h-screen sticky top-0"
        currentView={getSidebarActiveView()} 
        onChangeView={handleViewChange} 
      />

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
           <div 
             className="fixed inset-0 bg-stone-900/50 backdrop-blur-sm transition-opacity"
             onClick={() => setIsMobileMenuOpen(false)}
           />
           <div className="relative w-64 h-full shadow-2xl animate-in slide-in-from-left duration-300">
              <Sidebar 
                className="w-full h-full" 
                currentView={getSidebarActiveView()} 
                onChangeView={handleViewChange}
                onClose={() => setIsMobileMenuOpen(false)}
              />
           </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* Mobile Header */}
        <MobileHeader 
          onMenuClick={() => setIsMobileMenuOpen(true)} 
          onLogoClick={handleLogoClick}
        />
        
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