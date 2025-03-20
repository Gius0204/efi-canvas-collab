
import React, { useState } from 'react';
import { X, Search, Send, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';

interface Comment {
  id: string;
  author: {
    name: string;
    avatar?: string;
  };
  content: string;
  timestamp: string;
  isResolved?: boolean;
  objectName?: string;
}

interface CommentsPanelProps {
  comments: Comment[];
  onClose: () => void;
  onAddComment: (comment: string, isChat: boolean) => void;
  onResolveComment: (id: string) => void;
}

const CommentsPanel: React.FC<CommentsPanelProps> = ({
  comments,
  onClose,
  onAddComment,
  onResolveComment
}) => {
  const [activeTab, setActiveTab] = useState<string>('comments');
  const [searchQuery, setSearchQuery] = useState('');
  const [newComment, setNewComment] = useState('');
  
  const filteredComments = comments.filter(comment => 
    comment.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    comment.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (comment.objectName && comment.objectName.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  const commentItems = filteredComments.filter(comment => comment.objectName);
  const chatItems = filteredComments.filter(comment => !comment.objectName);
  
  const handleSubmitComment = () => {
    if (!newComment.trim()) return;
    onAddComment(newComment, activeTab === 'chat');
    setNewComment('');
  };
  
  return (
    <div className="fixed top-[68px] right-6 bg-white rounded-lg shadow-lg w-80 z-30 max-h-[80vh] flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Comentarios y Chat</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="relative mt-2">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Buscar..." 
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <Tabs defaultValue="comments" className="flex-1 flex flex-col" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 border-b rounded-none h-12">
          <TabsTrigger value="comments" className="data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 rounded-none">Comentarios</TabsTrigger>
          <TabsTrigger value="chat" className="data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 rounded-none">Chat</TabsTrigger>
        </TabsList>
        
        <TabsContent value="comments" className="flex-1 overflow-y-auto p-2 space-y-3 mt-0">
          {commentItems.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No hay comentarios que mostrar
            </div>
          )}
          
          {commentItems.map((comment) => (
            <div key={comment.id} className={`rounded-lg border p-3 ${comment.isResolved ? 'bg-gray-50' : 'bg-white'}`}>
              <div className="flex items-start gap-2">
                <Avatar className="h-8 w-8">
                  {comment.author.avatar ? (
                    <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                  ) : (
                    <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                  )}
                </Avatar>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="font-medium text-sm">{comment.author.name}</p>
                    <span className="text-xs text-gray-500">{comment.timestamp}</span>
                  </div>
                  {comment.objectName && (
                    <p className="text-xs text-blue-500 hover:underline cursor-pointer">
                      {comment.objectName}
                    </p>
                  )}
                  <p className="text-sm mt-1">{comment.content}</p>
                </div>
                {!comment.isResolved && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6 text-green-500"
                    onClick={() => onResolveComment(comment.id)}
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </TabsContent>
        
        <TabsContent value="chat" className="flex-1 overflow-y-auto p-2 flex flex-col mt-0">
          <div className="flex-1 space-y-3">
            {chatItems.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No hay mensajes de chat que mostrar
              </div>
            )}
            
            {chatItems.map((comment) => (
              <div key={comment.id} className="flex items-start gap-2">
                <Avatar className="h-8 w-8">
                  {comment.author.avatar ? (
                    <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                  ) : (
                    <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                  )}
                </Avatar>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="font-medium text-sm">{comment.author.name}</p>
                    <span className="text-xs text-gray-500">{comment.timestamp}</span>
                  </div>
                  <p className="text-sm mt-1">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="p-3 border-t">
        <div className="flex items-end gap-2">
          <Textarea 
            placeholder="Escribe un comentario..." 
            className="min-h-[60px] resize-none"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmitComment();
              }
            }}
          />
          <Button 
            className="bg-indigo-600 hover:bg-indigo-700 rounded-full h-8 w-8 p-0 flex items-center justify-center"
            onClick={handleSubmitComment}
          >
            <Send className="h-4 w-4 text-white" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommentsPanel;
