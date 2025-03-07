
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Share2, DownloadCloud, ArrowLeft, Save, ChevronDown, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CanvasHeaderProps {
  title: string;
}

const CanvasHeader: React.FC<CanvasHeaderProps> = ({ title }) => {
  const [isSaving, setIsSaving] = useState(false);
  
  const handleSave = () => {
    setIsSaving(true);
    
    // Simulate saving
    setTimeout(() => {
      setIsSaving(false);
    }, 1000);
  };
  
  return (
    <header className="flex items-center justify-between px-4 py-2 bg-white border-b">
      <div className="flex items-center">
        <Link to="/" className="p-1.5 mr-2 rounded-full hover:bg-gray-100">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        
        <div className="flex items-center">
          <svg className="h-6 w-6 mr-2 text-efi-red" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="10" />
            <text x="12" y="16" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">E</text>
          </svg>
          
          <div className="flex items-center">
            <h1 className="font-medium mr-2">{title}</h1>
            <Button variant="ghost" size="sm" className="h-7 px-2">
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="h-8"
          onClick={handleSave}
        >
          {isSaving ? (
            <>
              <span className="animate-spin mr-1">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeDasharray="32" strokeDashoffset="10" />
                </svg>
              </span>
              <span>Guardando...</span>
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-1" />
              <span>Guardar</span>
            </>
          )}
        </Button>
        
        <Button variant="outline" size="sm" className="h-8">
          <Share2 className="h-4 w-4 mr-1" />
          <span>Compartir</span>
        </Button>
        
        <Button variant="outline" size="sm" className="h-8">
          <DownloadCloud className="h-4 w-4 mr-1" />
          <span>Exportar</span>
        </Button>
        
        <div className="flex -space-x-2">
          <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-medium border-2 border-white">
            A
          </div>
          <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center text-white text-sm font-medium border-2 border-white">
            B
          </div>
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-medium border-2 border-white">
            C
          </div>
          <Button variant="outline" size="sm" className="ml-1 h-8">
            <Users className="h-4 w-4 mr-1" />
            <span>Colaborar</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default CanvasHeader;
