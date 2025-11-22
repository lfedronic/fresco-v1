import React from 'react';
import { Menu } from 'lucide-react';

export const MobileHeader: React.FC = () => {
  return (
    <header className="lg:hidden bg-fresco-50 border-b border-fresco-200 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-orange-500 inline-block" />
        <h1 className="font-serif text-xl font-bold text-stone-800">fresco</h1>
      </div>
      <button className="p-2 text-stone-600 hover:bg-fresco-100 rounded-full">
        <Menu className="w-6 h-6" />
      </button>
    </header>
  );
};