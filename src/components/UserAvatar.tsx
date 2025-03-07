
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserAvatar = () => {
  return (
    <Avatar className="h-9 w-9 hover:ring-2 hover:ring-primary/20 cursor-pointer transition-all">
      <AvatarImage src="/lovable-uploads/406135fb-5e12-45b5-8362-afe9ed67de31.png" alt="User" />
      <AvatarFallback>U</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
