import React from 'react';
import { Home, Users, Grid, User, Settings, Sparkles } from 'lucide-react';

export type ViewType = 'feed' | 'friends' | 'collections' | 'you' | 'recs';

interface Props {
  currentView: ViewType;
  onChangeView: (view: ViewType) => void;
  className?: string; // For overriding styles (e.g. mobile vs desktop)
  onClose?: () => void; // For closing mobile menu on selection
}

export const Sidebar: React.FC<Props> = ({ currentView, onChangeView, className = "", onClose }) => {
  const navItems: { id: ViewType; icon: any; label: string; disabled?: boolean; subLabel?: string }[] = [
    { id: 'feed', icon: Home, label: 'Feed' },
    { id: 'friends', icon: Users, label: 'Friends' },
    { id: 'collections', icon: Grid, label: 'Collections' },
    { id: 'you', icon: User, label: 'You' },
    { id: 'recs', icon: Sparkles, label: 'Recs', disabled: true, subLabel: 'Coming soon' },
  ];

  const handleLogoClick = () => {
    onChangeView('feed');
    if (onClose) onClose();
  };

  const handleItemClick = (id: ViewType) => {
    onChangeView(id);
    if (onClose) onClose();
  };

  return (
    <aside className={`flex flex-col bg-fresco-50 p-6 border-r border-stone-900 ${className}`}>
      <div className="mb-10 px-2">
        <button 
          onClick={handleLogoClick}
          className="font-serif text-3xl font-bold text-stone-900 tracking-tight flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <span className="w-3 h-3 rounded-none bg-orange-600 border border-stone-900 inline-block" />
          fresco
        </button>
      </div>

      <nav className="flex-1">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            const isDisabled = item.disabled;

            return (
              <li key={item.id}>
                <button 
                  onClick={() => !isDisabled && handleItemClick(item.id)}
                  disabled={isDisabled}
                  className={`
                    w-full flex items-center justify-between px-4 py-3 border border-transparent transition-all duration-200
                    ${isDisabled 
                      ? 'opacity-50 cursor-not-allowed' 
                      : isActive 
                        ? 'bg-stone-900 text-fresco-50 border-stone-900' 
                        : 'text-stone-600 hover:border-stone-900 hover:text-stone-900'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className={`w-4 h-4 ${isActive ? 'text-fresco-50' : 'text-stone-900'}`} />
                    <span className="font-medium tracking-wide">{item.label}</span>
                  </div>
                  {item.subLabel && (
                    <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-stone-500 bg-stone-200 border border-stone-300 px-1.5 py-0.5">
                      {item.subLabel}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-auto">
        <div className="pt-6 border-t-2 border-stone-900 flex items-center justify-between px-2">
          <div className="flex items-center gap-3">
            <img 
              src="https://picsum.photos/id/64/100/100" 
              alt="My Profile" 
              className="w-10 h-10 rounded-none border border-stone-900 grayscale hover:grayscale-0 transition-all"
            />
            <div className="flex flex-col text-left">
              <span className="text-sm font-bold text-stone-900">Alice Chen</span>
              <span className="text-xs text-stone-500 font-mono">@alice_c</span>
            </div>
          </div>
          <button className="text-stone-900 hover:opacity-60">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};