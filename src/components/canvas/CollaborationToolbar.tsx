
import React, { useState } from 'react';
import { 
  Users, 
  Clock, 
  CheckSquare, 
  Sparkles, 
  MessageCircle, 
  Share2, 
  Link2,
  Search,
  UserPlus,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import UserAvatar from '@/components/UserAvatar';

interface CollaborationToolbarProps {
  className?: string;
}

const CollaborationToolbar: React.FC<CollaborationToolbarProps> = ({ className }) => {
  const [showCollaborators, setShowCollaborators] = useState(false);
  const [showGroups, setShowGroups] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [showVoting, setShowVoting] = useState(false);
  const [votingTab, setVotingTab] = useState<'new' | 'results'>('new');
  const [showNotesAuthors, setShowNotesAuthors] = useState(true);
  const [showTimerNotification, setShowTimerNotification] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(34);
  
  const handleCollaboratorsClick = () => {
    setShowCollaborators(!showCollaborators);
    setShowGroups(false);
    setShowTimer(false);
    setShowVoting(false);
  };
  
  const handleGroupsClick = () => {
    setShowGroups(true);
    setShowCollaborators(false);
  };
  
  const handleTimerClick = () => {
    setShowTimer(!showTimer);
    setShowCollaborators(false);
    setShowGroups(false);
    setShowVoting(false);
  };
  
  const handleVotingClick = () => {
    setShowVoting(!showVoting);
    setShowCollaborators(false);
    setShowGroups(false);
    setShowTimer(false);
  };
  
  const handleToggleAuthors = () => {
    setShowNotesAuthors(!showNotesAuthors);
  };
  
  const handleStartTimer = () => {
    setShowTimer(false);
    // Here we would normally start a real timer
    // For demo purposes, we'll just show the notification after a short delay
    setTimeout(() => {
      setShowTimerNotification(true);
    }, 2000);
  };
  
  return (
    <TooltipProvider>
      <div className={`fixed top-[68px] right-6 bg-white rounded-lg shadow-md p-2 z-20 ${className}`}>
        <div className="flex flex-col space-y-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className={`rounded-md ${showCollaborators ? 'bg-gray-100' : ''}`}
                onClick={handleCollaboratorsClick}
              >
                <Users className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Colaboradores</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className={`rounded-md ${showTimer ? 'bg-gray-100' : ''}`}
                onClick={handleTimerClick}
              >
                <Clock className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Temporizador</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className={`rounded-md ${showVoting ? 'bg-gray-100' : ''}`}
                onClick={handleVotingClick}
              >
                <CheckSquare className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Votación</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-md"
                onClick={handleToggleAuthors}
              >
                <Sparkles className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>{showNotesAuthors ? 'Ocultar autores' : 'Mostrar autores'}</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-md">
                <MessageCircle className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Comentarios</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="primary" size="icon" className="rounded-md bg-indigo-600 hover:bg-indigo-700">
                <Share2 className="h-5 w-5 text-white" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Compartir</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-md">
                <Link2 className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Copiar enlace</p>
            </TooltipContent>
          </Tooltip>
        </div>
        
        {/* Collaborators Panel */}
        {showCollaborators && (
          <div className="absolute top-0 right-16 w-72 bg-white rounded-lg shadow-lg">
            <div className="p-4 max-h-96 overflow-auto">
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  <UserAvatar />
                  <h3 className="ml-3 font-medium">GIUSEPPE PIMINCHUMO</h3>
                </div>
                <Button variant="ghost" size="icon" className="ml-auto" onClick={handleCollaboratorsClick}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <Separator className="my-4" />
              <div className="relative mb-4">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                <Input placeholder="Buscar a alguien para seguir" className="pl-9" />
              </div>
              
              <div className="space-y-3 mt-4">
                <div className="flex items-center p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                  <UserAvatar />
                  <span className="ml-3 font-medium">CARLOS ANTONIO LUJAN</span>
                </div>
                <div className="flex items-center p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="https://i.pravatar.cc/150?img=33" alt="Jorge" />
                    <AvatarFallback>JC</AvatarFallback>
                  </Avatar>
                  <span className="ml-3 font-medium">JORGE CENTURION</span>
                </div>
                <div className="flex items-center p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="https://i.pravatar.cc/150?img=5" alt="Maria" />
                    <AvatarFallback>MB</AvatarFallback>
                  </Avatar>
                  <span className="ml-3 font-medium">MARIA BECERRA</span>
                </div>
                <div className="flex items-center p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                  <UserAvatar />
                  <span className="ml-3 font-medium">CARLOS ANTONIO LUJAN</span>
                </div>
              </div>
              
              <Button 
                className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white" 
                onClick={handleGroupsClick}
              >
                Gestionar grupos
              </Button>
            </div>
          </div>
        )}
        
        {/* Groups Management */}
        {showGroups && (
          <div className="absolute top-0 right-16 w-80 bg-white rounded-lg shadow-lg">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">GRUPOS</h3>
                <Button variant="ghost" size="icon" onClick={() => setShowGroups(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <select className="w-full h-10 px-3 py-2 bg-gray-200 rounded-md">
                    <option>G1 - Area de Desarrollo Software</option>
                  </select>
                  <div className="flex items-center mt-2 p-2 bg-gray-50 rounded-md">
                    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                      <UserPlus className="h-5 w-5 text-gray-600" />
                    </div>
                    <span className="ml-3 font-medium">Agregar un miembro</span>
                  </div>
                </div>
                
                <select className="w-full h-10 px-3 py-2 bg-gray-200 rounded-md">
                  <option>G2 - Area de marketing</option>
                </select>
                
                <select className="w-full h-10 px-3 py-2 bg-gray-200 rounded-md">
                  <option>G3 - Area de administracion</option>
                </select>
                
                <select className="w-full h-10 px-3 py-2 bg-gray-200 rounded-md">
                  <option>G4 - Area de Diseño Software</option>
                </select>
                
                <div className="flex items-center justify-between">
                  <span>Carlos Lujan</span>
                  <span className="text-gray-500">Mover</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span>Manuel Uriben</span>
                  <span className="text-gray-500">Mover</span>
                </div>
                
                <Separator />
                
                <h3 className="font-bold">Participantes</h3>
                
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                  <Input placeholder="Buscar..." className="pl-9" />
                </div>
                
                <div className="max-h-40 overflow-y-auto space-y-2">
                  <div>Jorge Centurion</div>
                  <div>Julio Gutierrez</div>
                  <div>Carlos Antonio</div>
                  <div>Giuseppe Piminchumo</div>
                </div>
                
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                  Guardar grupos
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {/* Timer Panel */}
        {showTimer && (
          <div className="absolute top-0 right-16 w-64 bg-white rounded-lg shadow-lg">
            <div className="p-4">
              <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <Clock className="h-8 w-8 text-indigo-600" />
                  <span className="text-2xl font-bold ml-2">{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</span>
                </div>
                <Button 
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white" 
                  onClick={handleStartTimer}
                >
                  Iniciar tiempo
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {/* Timer Notification */}
        {showTimerNotification && (
          <Dialog open={showTimerNotification} onOpenChange={setShowTimerNotification}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-center text-lg font-bold">AVISO DE TIMER</DialogTitle>
              </DialogHeader>
              <Separator />
              <div className="flex flex-col items-center p-4">
                <p className="text-center mb-4">
                  El tiempo ha finalizado. te lo notificamos para que continúes con tus actividades
                </p>
                <img 
                  src="/lovable-uploads/ed7975e1-d87a-43ee-bbf5-560a68e7f93c.png" 
                  alt="Timer" 
                  className="h-20 w-20 mb-4" 
                />
                <Button 
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white" 
                  onClick={() => setShowTimerNotification(false)}
                >
                  Cerrar Notificacion
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
        
        {/* Voting Panel */}
        {showVoting && (
          <div className="absolute top-0 right-16 w-80 bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Votación</h3>
                <Button variant="ghost" size="icon" onClick={() => setShowVoting(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-0.5 bg-gray-200 rounded-md mb-4">
                <Button 
                  variant={votingTab === 'new' ? 'default' : 'ghost'} 
                  className={`rounded-none ${votingTab === 'new' ? 'bg-white hover:bg-white text-black' : 'bg-gray-100'}`}
                  onClick={() => setVotingTab('new')}
                >
                  Nueva Sesión
                </Button>
                <Button 
                  variant={votingTab === 'results' ? 'default' : 'ghost'} 
                  className={`rounded-none ${votingTab === 'results' ? 'bg-white hover:bg-white text-black' : 'bg-gray-100'}`}
                  onClick={() => setVotingTab('results')}
                >
                  Resultados
                </Button>
              </div>
              
              {votingTab === 'new' ? (
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2">Nombre de Sesión</label>
                    <Input placeholder="Escribir nombre de votación" />
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-1/2">
                      <label className="block mb-2">Votos</label>
                      <div className="flex items-center">
                        <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">-</Button>
                        <span className="mx-3 font-bold">1</span>
                        <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">+</Button>
                      </div>
                    </div>
                    
                    <div className="w-1/2">
                      <label className="block mb-2">Segundos</label>
                      <div className="flex items-center">
                        <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">-</Button>
                        <span className="mx-3 font-bold">1</span>
                        <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">+</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <label>Múltiples votos por objeto</label>
                    <Switch />
                  </div>
                  
                  <div>
                    <label className="block mb-2">Seleccionar área de votación</label>
                    <Button variant="outline" className="w-full bg-gray-100">Seleccionar</Button>
                  </div>
                  
                  <div className="bg-gray-100 p-3 rounded-md">
                    <h4 className="font-bold mb-2">Filtros</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          Sticky Notes
                        </label>
                        <span>32</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          Formas
                        </label>
                        <span>12</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          Imágenes
                        </label>
                        <span>0</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          Textos
                        </label>
                        <span>0</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          Sections
                        </label>
                        <span>4</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                    Iniciar para todos
                  </Button>
                </div>
              ) : (
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {[
                    { name: 'Voten por las mejores opciones del FODA realizado', date: '15 Feb' },
                    { name: 'Qué fortalezas y debilidades son más importantes en la empresa', date: '08 Feb' },
                    { name: 'Votación 3', date: '01 Feb' },
                    { name: 'Votación 2', date: '14 Ene' },
                    { name: 'Cuales son las más importantes opciones de todos los FODAs', date: '03 Ene' }
                  ].map((vote, index) => (
                    <div 
                      key={index} 
                      className="p-3 border-l-4 border-indigo-600 bg-white hover:bg-gray-50 cursor-pointer flex justify-between items-center"
                    >
                      <div className="text-sm">{vote.name}</div>
                      <div className="text-xs text-gray-500">{vote.date}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
};

export default CollaborationToolbar;
