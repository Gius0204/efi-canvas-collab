
import React, { useState } from 'react';
import { 
  Users, 
  MessageSquare, 
  TimerReset, 
  Vote, 
  Settings, 
  Share2, 
  EyeOff, 
  CalendarClock, 
  UserPlus, 
  ChevronDown,
  Sparkles,
  Inbox,
  LayoutTemplate,
  Menu,
  Search,
  X,
  Eye
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import UserAvatar from '@/components/UserAvatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface CollaborationToolbarProps {
  onShowVotingResults: () => void;
  onShowAIGenerator: () => void;
  onShowComments: () => void;
  onShowSharing: () => void;
  onShowEficientisIntegration: () => void;
  onShowTemplates: () => void;
}

const CollaborationToolbar: React.FC<CollaborationToolbarProps> = ({
  onShowVotingResults,
  onShowAIGenerator,
  onShowComments,
  onShowSharing,
  onShowEficientisIntegration,
  onShowTemplates
}) => {
  const [showAuthors, setShowAuthors] = useState(true);
  const [showTimer, setShowTimer] = useState(false);
  const [hours, setHours] = useState('00');
  const [minutes, setMinutes] = useState('30');
  const [seconds, setSeconds] = useState('00');
  const [timeIsRunning, setTimeIsRunning] = useState(false);
  const [showCollaborators, setShowCollaborators] = useState(false);
  const [showGroups, setShowGroups] = useState(false);
  const [showTimerFinishedDialog, setShowTimerFinishedDialog] = useState(false);
  
  const toggleAuthors = () => {
    setShowAuthors(!showAuthors);
    toast(showAuthors ? 'Autores ocultos' : 'Autores visibles');
  };

  const toggleTimer = () => {
    setShowTimer(!showTimer);
  };

  const handleStartTimer = () => {
    if (hours === '00' && minutes === '00' && seconds === '00') {
      toast.error('Debes configurar un tiempo mayor a cero');
      return;
    }
    
    setTimeIsRunning(true);
    setShowTimer(false);
    toast.success(`Temporizador iniciado: ${hours}:${minutes}:${seconds}`);
    
    // In a real app, we would start a countdown timer here
    // For this demo, we'll just simulate it ending after a few seconds
    setTimeout(() => {
      setTimeIsRunning(false);
      setShowTimerFinishedDialog(true);
    }, 5000);
  };

  const handleCancelTimer = () => {
    setTimeIsRunning(false);
    toast('Temporizador cancelado');
  };

  const handleCollaboratorsClick = () => {
    setShowCollaborators(!showCollaborators);
  };

  const handleGroupsClick = () => {
    setShowGroups(!showGroups);
  };

  const mockCollaborators = [
    { id: '1', name: 'GIUSEPPE PIMINCHUMO LEYVA', avatar: '/lovable-uploads/cd62cb53-a08a-4049-b537-c910fa5ed4ca.png', permission: 'owner' as const },
    { id: '2', name: 'CARLOS ANTONIO LUJAN', avatar: '/lovable-uploads/cd62cb53-a08a-4049-b537-c910fa5ed4ca.png', permission: 'edit' as const },
    { id: '3', name: 'MANUEL URIBEN', avatar: '/lovable-uploads/cd62cb53-a08a-4049-b537-c910fa5ed4ca.png', permission: 'edit' as const },
    { id: '4', name: 'JORGE CENTURION', avatar: 'https://i.pravatar.cc/150?img=33', permission: 'view' as const },
    { id: '5', name: 'MARIA BECERRA', avatar: 'https://i.pravatar.cc/150?img=5', permission: 'view' as const }
  ];
  
  return (
    <TooltipProvider>
      <div className="absolute top-0 left-0 right-0 flex justify-between items-start p-4 z-50 pointer-events-none">
        {/* Left menu */}
        <div className="flex items-center space-x-2 pointer-events-auto">
          <Button variant="outline" size="icon" className="bg-white/80 backdrop-blur-sm shadow-sm hover:bg-white">
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* Right menu */}
        <div className="flex items-center space-x-2 pointer-events-auto">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="relative group">
                <div className="absolute top-0 right-0 -mt-1 -mr-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                <UserAvatar showCollaborators={true} size="sm" className="cursor-pointer" onClick={handleCollaboratorsClick} />
                
                <div className="absolute top-full right-0 mt-2 p-2 bg-white/80 backdrop-blur-sm shadow-lg rounded-lg invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 w-max">
                  <span className="text-sm font-medium">5 usuarios conectados</span>
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Colaboradores</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                className="bg-white/80 backdrop-blur-sm shadow-sm hover:bg-white transition-colors"
                onClick={onShowComments}
              >
                <MessageSquare className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Comentarios</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                className="bg-white/80 backdrop-blur-sm shadow-sm hover:bg-white transition-colors"
                onClick={toggleTimer}
              >
                <TimerReset className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Temporizador</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                className="bg-white/80 backdrop-blur-sm shadow-sm hover:bg-white transition-colors"
                onClick={onShowVotingResults}
              >
                <Vote className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Votación</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                className="bg-white/80 backdrop-blur-sm shadow-sm hover:bg-white transition-colors"
                onClick={onShowAIGenerator}
              >
                <Sparkles className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Generador IA</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                className="bg-white/80 backdrop-blur-sm shadow-sm hover:bg-white transition-colors"
                onClick={toggleAuthors}
              >
                {showAuthors ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>{showAuthors ? 'Ocultar autores' : 'Mostrar autores'}</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="default" 
                className="bg-white/80 backdrop-blur-sm shadow-sm hover:bg-white text-black gap-1 transition-colors"
                onClick={onShowSharing}
              >
                <Share2 className="h-4 w-4 mr-1" />
                <span>Compartir</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Compartir tablero</p>
            </TooltipContent>
          </Tooltip>

          {/* Timer Setup Dialog */}
          {showTimer && (
            <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg p-4 w-72">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Configurar Temporizador</h3>
                <Button variant="ghost" size="icon" onClick={() => setShowTimer(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div>
                  <Label htmlFor="hours">Horas</Label>
                  <Input 
                    id="hours"
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                    type="number"
                    min="0"
                    max="23"
                  />
                </div>
                <div>
                  <Label htmlFor="minutes">Minutos</Label>
                  <Input 
                    id="minutes"
                    value={minutes}
                    onChange={(e) => setMinutes(e.target.value)}
                    type="number"
                    min="0"
                    max="59"
                  />
                </div>
                <div>
                  <Label htmlFor="seconds">Segundos</Label>
                  <Input 
                    id="seconds"
                    value={seconds}
                    onChange={(e) => setSeconds(e.target.value)}
                    type="number"
                    min="0"
                    max="59"
                  />
                </div>
              </div>
              
              <Button onClick={handleStartTimer} className="w-full">Iniciar</Button>
            </div>
          )}

          {/* Timer Finished Dialog - Center of screen */}
          <Dialog open={showTimerFinishedDialog} onOpenChange={setShowTimerFinishedDialog}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>¡Tiempo finalizado!</DialogTitle>
                <DialogDescription>
                  El temporizador ha finalizado.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="flex justify-end gap-2 mt-4">
                <DialogClose asChild>
                  <Button variant="outline">Cerrar</Button>
                </DialogClose>
                <Button onClick={handleStartTimer}>Reiniciar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Collaborators Panel */}
          {showCollaborators && (
            <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg w-72">
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <UserAvatar />
                    <h3 className="ml-3 font-medium">GIUSEPPE PIMINCHUMO</h3>
                  </div>
                  <Button variant="ghost" size="icon" onClick={handleCollaboratorsClick}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="relative mb-4">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                  <Input placeholder="Buscar a alguien para seguir" className="pl-9" />
                </div>

                <div className="max-h-[200px] overflow-y-auto space-y-2 mb-4">
                  {mockCollaborators.map((collaborator) => (
                    <div key={collaborator.id} className="flex items-center p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={collaborator.avatar} alt={collaborator.name} />
                        <AvatarFallback>{collaborator.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <span className="ml-3 font-medium text-sm">{collaborator.name}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white" 
                  onClick={handleGroupsClick}
                >
                  Gestionar grupos
                </Button>
              </div>
            </div>
          )}

          {/* Groups Management Panel */}
          {showGroups && (
            <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-lg">
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
        </div>
      </div>
    </TooltipProvider>
  );
};

export default CollaborationToolbar;
