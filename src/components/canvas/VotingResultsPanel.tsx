
import React from 'react';
import { X, ChevronLeft, Users, BarChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface VoteItem {
  id: string;
  content: string;
  color: string;
  votes: number;
  voters?: { avatar?: string; name: string }[];
}

interface VotingResultsPanelProps {
  title: string;
  date: string;
  creator: string;
  voteItems: VoteItem[];
  onClose: () => void;
  onShowStatistics: () => void;
  onBack?: () => void;
}

const VotingResultsPanel: React.FC<VotingResultsPanelProps> = ({
  title,
  date,
  creator,
  voteItems,
  onClose,
  onShowStatistics,
  onBack
}) => {
  const maxVotes = Math.max(...voteItems.map(item => item.votes));
  const sortedItems = [...voteItems].sort((a, b) => b.votes - a.votes);
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            {onBack ? (
              <Button variant="ghost" size="icon" onClick={onBack} className="h-8 w-8">
                <ChevronLeft className="h-4 w-4" />
              </Button>
            ) : (
              <div className="w-8"></div>
            )}
            <h2 className="text-lg font-medium">Votación</h2>
            <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="mb-6">
            <h3 className="text-base font-bold">{title}</h3>
            <p className="text-sm text-gray-500">{date}</p>
            <p className="text-xs text-gray-400">Creado por {creator}</p>
          </div>
          
          <div className="space-y-6 max-h-[400px] overflow-y-auto">
            {sortedItems.map((item) => (
              <div key={item.id} className="space-y-2">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 flex-shrink-0 ${item.color} rounded-md`}></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <p className="text-sm">{item.content}</p>
                      <span className="font-bold">{item.votes} VOTOS</span>
                    </div>
                    <Progress 
                      value={(item.votes / maxVotes) * 100} 
                      className="h-2 mt-1" 
                    />
                    
                    {item.voters && (
                      <div className="flex -space-x-2 mt-2">
                        {item.voters.map((voter, idx) => (
                          <Avatar key={idx} className="h-6 w-6 border-2 border-white">
                            {voter.avatar ? (
                              <AvatarImage src={voter.avatar} alt={voter.name} />
                            ) : (
                              <AvatarFallback className="text-[10px]">{voter.name.charAt(0)}</AvatarFallback>
                            )}
                          </Avatar>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 space-y-2">
            <Button 
              className="w-full" 
              variant="outline"
              onClick={onClose}
            >
              Cerrar Resultados
            </Button>
            <Button 
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
              onClick={onShowStatistics}
            >
              Ver estadísticas
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VotingResultsPanel;
