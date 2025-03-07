
import React, { useState } from 'react';
import { Users, List, Clock, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Voter {
  id: string;
  name: string;
  avatar: string;
  hasVoted: boolean;
  votesUsed: number;
  totalVotes: number;
}

interface VoteItem {
  id: string;
  content: string;
  color: string;
  votes: number;
}

interface VotingProgressPanelProps {
  isOwner?: boolean;
  voters: Voter[];
  voteItems: VoteItem[];
  timeRemaining: string;
  onFinish: () => void;
  onFinishForAll: () => void;
  onAddTime: () => void;
}

const VotingProgressPanel: React.FC<VotingProgressPanelProps> = ({
  isOwner = false,
  voters,
  voteItems,
  timeRemaining,
  onFinish,
  onFinishForAll,
  onAddTime
}) => {
  const [activeTab, setActiveTab] = useState<'voters' | 'top'>('voters');
  const totalVoters = voters.length;
  const votedCount = voters.filter(voter => voter.hasVoted).length;
  
  const sortedVoteItems = [...voteItems].sort((a, b) => b.votes - a.votes);
  
  return (
    <div className="fixed top-24 right-6 bg-white rounded-lg shadow-lg w-64 z-30">
      <div className="p-4">
        <h3 className="font-medium mb-2">Votación</h3>
        
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm">0 votos restantes</span>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span className="text-sm">{timeRemaining}</span>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'voters' | 'top')}>
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="voters" className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              <span>{votedCount} de {totalVoters} votaron</span>
            </TabsTrigger>
            <TabsTrigger value="top" className="flex items-center">
              <List className="h-4 w-4 mr-1" />
              <span>Votos en curso</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="voters" className="max-h-60 overflow-y-auto mt-0">
            {voters.map(voter => (
              <div key={voter.id} className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  {voter.avatar ? (
                    <img src={voter.avatar} alt={voter.name} className="w-6 h-6 rounded-full mr-2" />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-800 flex items-center justify-center text-xs mr-2">
                      {voter.name.charAt(0)}
                    </div>
                  )}
                  <span className="text-sm">{voter.name}</span>
                </div>
                {voter.hasVoted ? (
                  <div className="flex items-center text-green-500">
                    <Check className="h-4 w-4 mr-1" />
                    <span className="text-xs">Ha votado</span>
                  </div>
                ) : (
                  <div className="w-24 h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-indigo-600" 
                      style={{ width: `${(voter.votesUsed / voter.totalVotes) * 100}%` }}
                    ></div>
                  </div>
                )}
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="top" className="max-h-60 overflow-y-auto space-y-3 mt-0">
            {sortedVoteItems.slice(0, 5).map((item) => (
              <div key={item.id} className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`w-6 h-6 rounded ${item.color}`}></div>
                    <span className="text-sm truncate w-36">{item.content}</span>
                  </div>
                  <span className="text-sm font-bold">{item.votes} VOTOS</span>
                </div>
                <Progress value={(item.votes / Math.max(...voteItems.map(v => v.votes))) * 100} className="h-2 bg-gray-200" />
              </div>
            ))}
          </TabsContent>
        </Tabs>
        
        <div className="flex items-center space-x-2 mt-4">
          <Button 
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white"
            onClick={onFinish}
          >
            He finalizado
          </Button>
          
          {isOwner && (
            <>
              <Button 
                className="flex-1 bg-indigo-700 hover:bg-indigo-800 text-white"
                onClick={onFinishForAll}
              >
                Finalizar para todos
              </Button>
              <Button 
                variant="outline"
                size="sm"
                onClick={onAddTime}
              >
                +1 min
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VotingProgressPanel;
