import React from 'react';
import { Menu } from 'lucide-react';

interface Props {
  onMenuClick: () => void;
  onLogoClick: () => void;
}

export const MobileHeader: React.FC<Props> = ({ onMenuClick, onLogoClick }) => {
  return (
    <header className="lg:hidden bg-fresco-50 border-b border-stone-900 px-4 py-3 flex items-center gap-4 sticky top-0 z-40">
      <button 
        onClick={onMenuClick}
        className="p-1 -ml-1 text-stone-900 hover:bg-stone-200 border border-transparent hover:border-stone-900 transition-all"
      >
        <Menu className="w-6 h-6" />
      </button>

      <button onClick={onLogoClick} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
        <span className="w-3 h-3 bg-orange-600 border border-stone-900 inline-block" />
        <h1 className="font-serif text-xl font-bold text-stone-900">fresco</h1>
      </button>
    </header>
  );
};