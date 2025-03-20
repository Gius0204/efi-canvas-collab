
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import Logo from './Logo';
import UserAvatar from './UserAvatar';

interface HeaderProps {
  showSearchBar?: boolean;
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ showSearchBar = true, title }) => {
  return (
    <header className="flex items-center justify-between px-4 py-2 border-b">
      <div className="flex items-center gap-4">
        <Logo />
        {title && (
          <div className="flex items-center ml-4">
            <h1 className="text-lg font-semibold">{title}</h1>
          </div>
        )}
      </div>
      
      {showSearchBar && (
        <div className="flex-1 max-w-xl mx-auto">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar..."
              className="pl-8 bg-gray-50 border-gray-200"
            />
          </div>
        </div>
      )}
      
      <UserAvatar />
    </header>
  );
};

export default Header;
