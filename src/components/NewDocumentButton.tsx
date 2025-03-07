
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface NewDocumentButtonProps {
  onClick: () => void;
}

const NewDocumentButton: React.FC<NewDocumentButtonProps> = ({ onClick }) => {
  return (
    <Button 
      onClick={onClick}
      className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md transition-all"
    >
      <Plus className="mr-1 h-4 w-4" />
      Nuevo Lienzo
    </Button>
  );
};

export default NewDocumentButton;
