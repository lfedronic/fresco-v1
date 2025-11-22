import React from 'react';
import { Home, Users, Grid, User, PlusCircle, Settings, Sparkles } from 'lucide-react';

export type ViewType = 'feed' | 'friends' | 'collections' | 'you' | 'recs';

interface Props {
  currentView: ViewType;
  onChangeView: (view: ViewType) => void;
}

export const Sidebar: React.FC<Props> = ({ currentView, onChangeView }) => {
  const navItems: { id: ViewType; icon: any; label: string; disabled?: boolean; subLabel?: string }[] = [
    { id: 'feed', icon: Home, label: 'Feed' },
    { id: 'friends', icon: Users, label: 'Friends' },
    { id: 'collections', icon: Grid, label: 'Collections' },
    { id: 'you', icon: User, label: 'You' },
    { id: 'recs', icon: Sparkles, label: 'Recs', disabled: true, subLabel: 'Coming soon' },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 h-screen sticky top-0 border-r border-fresco-200 bg-fresco-50 p-6">
      <div className="mb-10 px-2">
        <h1 className="font-serif text-3xl font-bold text-stone-800 tracking-tight flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-orange-500 inline-block" />
          fresco
        </h1>
      </div>

      <nav className="flex-1">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            const isDisabled = item.disabled;

            return (
              <li key={item.id}>
                <button 
                  onClick={() => !isDisabled && onChangeView(item.id)}
                  disabled={isDisabled}
                  className={`
                    w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200
                    ${isDisabled 
                      ? 'opacity-50 cursor-not-allowed hover:bg-transparent' 
                      : isActive 
                        ? 'bg-white shadow-sm text-stone-900 font-medium' 
                        : 'text-stone-500 hover:bg-fresco-100 hover:text-stone-800'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className={`w-5 h-5 ${isActive ? 'text-orange-500' : 'text-stone-400'}`} />
                    {item.label}
                  </div>
                  {item.subLabel && (
                    <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 bg-stone-100 px-1.5 py-0.5 rounded">
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
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-stone-800 text-white hover:bg-stone-900 transition-colors shadow-lg shadow-stone-200 mb-6">
           <PlusCircle className="w-5 h-5" />
           <span className="font-medium">Curate New</span>
        </button>

        <div className="pt-6 border-t border-fresco-200 flex items-center justify-between px-2">
          <div className="flex items-center gap-3">
            <img 
              src="https://picsum.photos/id/64/100/100" 
              alt="My Profile" 
              className="w-9 h-9 rounded-full border border-white shadow-sm"
            />
            <div className="flex flex-col text-left">
              <span className="text-sm font-bold text-stone-800">Alice Chen</span>
              <span className="text-xs text-stone-400">@alice_c</span>
            </div>
          </div>
          <button className="text-stone-400 hover:text-stone-600">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};