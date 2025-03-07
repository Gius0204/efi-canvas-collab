
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserAvatarProps {
  showCollaborators?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ 
  showCollaborators = false,
  className = '',
  size = 'md',
  onClick
}) => {
  const sizeClasses = {
    sm: 'h-7 w-7',
    md: 'h-9 w-9',
    lg: 'h-12 w-12'
  };

  return (
    <div className={`flex items-center ${className}`}>
      <div className="relative">
        <Avatar 
          className={`${sizeClasses[size]} hover:ring-2 hover:ring-primary/20 cursor-pointer transition-all`}
          onClick={onClick}
        >
          <AvatarImage src="/lovable-uploads/cd62cb53-a08a-4049-b537-c910fa5ed4ca.png" alt="User" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        {showCollaborators && (
          <div className="absolute -top-1 -right-1 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full px-1.5 flex items-center justify-center">
            +5
          </div>
        )}
      </div>
    </div>
  );
};

export default UserAvatar;
