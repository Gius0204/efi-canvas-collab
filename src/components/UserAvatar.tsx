
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserAvatarProps {
  showCollaborators?: boolean;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ showCollaborators = false }) => {
  return (
    <div className="flex items-center">
      <div className="relative">
        <Avatar className="h-9 w-9 hover:ring-2 hover:ring-primary/20 cursor-pointer transition-all">
          <AvatarImage src="/lovable-uploads/406135fb-5e12-45b5-8362-afe9ed67de31.png" alt="User" />
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
