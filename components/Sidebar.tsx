import React from 'react';
import { Home, Users, Bookmark, Settings, PlusCircle, LogOut } from 'lucide-react';

export const Sidebar: React.FC = () => {
  const navItems = [
    { icon: Home, label: 'Feed', active: true },
    { icon: Users, label: 'Friends', active: false },
    { icon: Bookmark, label: 'Saved', active: false },
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
          {navItems.map((item) => (
            <li key={item.label}>
              <a 
                href="#" 
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                  ${item.active 
                    ? 'bg-white shadow-sm text-stone-900 font-medium' 
                    : 'text-stone-500 hover:bg-fresco-100 hover:text-stone-800'
                  }
                `}
              >
                <item.icon className={`w-5 h-5 ${item.active ? 'text-orange-500' : 'text-stone-400'}`} />
                {item.label}
              </a>
            </li>
          ))}
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
            <div className="flex flex-col">
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