
import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VotingNotificationProps {
  onJoin: () => void;
  onDismiss: () => void;
  initiator: string;
  description: string;
}

const VotingNotification: React.FC<VotingNotificationProps> = ({
  onJoin,
  onDismiss,
  initiator,
  description
}) => {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl p-6 w-96 z-50">
      <div className="flex justify-end">
        <Button variant="ghost" size="icon" onClick={onDismiss}>
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="flex flex-col items-center mb-6">
        <div className="bg-yellow-200 rounded-full p-4 mb-4">
          <div className="border border-black w-16 h-16 rounded flex items-center justify-center">
            <div className="relative">
              <div className="w-4 h-4 bg-white absolute -top-4 -right-3 rounded-full"></div>
              <svg viewBox="0 0 24 24" className="w-8 h-8" stroke="currentColor" strokeWidth="2">
                <path d="M17 8l-10 8M7 8l10 8"></path>
              </svg>
            </div>
          </div>
        </div>
        
        <h2 className="text-xl font-bold mb-1">Sesión de votación iniciada</h2>
        <p className="text-gray-500 mb-3">por {initiator}</p>
        <p className="text-center mb-6">{description}</p>
        
        <Button 
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white mb-3"
          onClick={onJoin}
        >
          Unirme a la votación
        </Button>
        
        <Button 
          variant="outline"
          className="w-full"
          onClick={onDismiss}
        >
          No participar
        </Button>
      </div>
    </div>
  );
};

export default VotingNotification;
