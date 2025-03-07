
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
  LayoutTemplate
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
      toast('¡Tiempo finalizado!', {
        duration: 5000,
        action: {
          label: 'Reiniciar',
          onClick: () => handleStartTimer()
        }
      });
    }, 5000);
  };

  const handleCancelTimer = () => {
    setTimeIsRunning(false);
    toast('Temporizador cancelado');
  };
  
  return (
    <div className="fixed top-16 right-4 z-10">
      <div className="flex flex-col space-y-2">
        <div className="relative group">
          <div className="absolute top-0 right-0 -mt-1 -mr-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          <UserAvatar showCollaborators={true} size="lg" className="cursor-pointer" />
          
          <div className="absolute top-0 right-12 mt-1 p-2 bg-white shadow-lg rounded-lg invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 w-max">
            <span className="text-sm font-medium">5 usuarios conectados</span>
          </div>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="bg-white shadow-sm">
              <Users className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Colaboradores</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-[250px] overflow-y-auto">
              <div className="px-2 py-1.5">
                <div className="relative mb-2">
                  <input 
                    type="text" 
                    placeholder="Buscar colaborador..."
                    className="w-full border rounded-md px-2 py-1 text-sm"
                  />
                  <svg className="absolute right-2 top-1.5 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                
                <div className="space-y-1">
                  <DropdownMenuItem>
                    <div className="flex items-center">
                      <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center mr-2 text-xs font-medium text-indigo-800">
                        GP
                      </div>
                      <div className="flex-1">
                        <div className="text-sm">Giuseppe Piminchumo</div>
                        <div className="text-xs text-gray-500">Owner</div>
                      </div>
                      <button className="text-xs text-blue-500 hover:text-blue-700">
                        Seguir
                      </button>
                    </div>
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem>
                    <div className="flex items-center">
                      <div className="w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center mr-2 text-xs font-medium text-purple-800">
                        CL
                      </div>
                      <div className="flex-1">
                        <div className="text-sm">Carlos Lujan</div>
                        <div className="text-xs text-gray-500">Editor</div>
                      </div>
                      <button className="text-xs text-blue-500 hover:text-blue-700">
                        Seguir
                      </button>
                    </div>
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem>
                    <div className="flex items-center">
                      <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center mr-2 text-xs font-medium text-green-800">
                        MU
                      </div>
                      <div className="flex-1">
                        <div className="text-sm">Manuel Uriben</div>
                        <div className="text-xs text-gray-500">Editor</div>
                      </div>
                      <button className="text-xs text-blue-500 hover:text-blue-700">
                        Seguir
                      </button>
                    </div>
                  </DropdownMenuItem>
                </div>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => toast('Función no implementada')}>
              <UserPlus className="h-4 w-4 mr-2" />
              <span>Administrar Grupos</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Button 
          variant="outline" 
          size="icon" 
          className="bg-white shadow-sm"
          onClick={onShowComments}
        >
          <MessageSquare className="h-5 w-5" />
        </Button>
        
        {!timeIsRunning ? (
          <div className="relative">
            <Button 
              variant="outline" 
              size="icon" 
              className="bg-white shadow-sm"
              onClick={toggleTimer}
            >
              <TimerReset className="h-5 w-5" />
            </Button>
            
            {showTimer && (
              <div className="absolute right-12 top-0 bg-white rounded-lg shadow-lg p-3 w-64">
                <h3 className="text-sm font-medium mb-2">Configurar temporizador</h3>
                <div className="flex space-x-2 mb-3">
                  <div className="flex-1">
                    <label className="text-xs text-gray-500 mb-1 block">Horas</label>
                    <select 
                      className="w-full border rounded-md p-1 text-sm"
                      value={hours}
                      onChange={(e) => setHours(e.target.value)}
                    >
                      {[...Array(24)].map((_, i) => (
                        <option key={i} value={i.toString().padStart(2, '0')}>
                          {i.toString().padStart(2, '0')}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className="text-xs text-gray-500 mb-1 block">Minutos</label>
                    <select 
                      className="w-full border rounded-md p-1 text-sm"
                      value={minutes}
                      onChange={(e) => setMinutes(e.target.value)}
                    >
                      {[...Array(60)].map((_, i) => (
                        <option key={i} value={i.toString().padStart(2, '0')}>
                          {i.toString().padStart(2, '0')}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className="text-xs text-gray-500 mb-1 block">Segundos</label>
                    <select 
                      className="w-full border rounded-md p-1 text-sm"
                      value={seconds}
                      onChange={(e) => setSeconds(e.target.value)}
                    >
                      {[...Array(60)].map((_, i) => (
                        <option key={i} value={i.toString().padStart(2, '0')}>
                          {i.toString().padStart(2, '0')}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={toggleTimer}
                    className="text-xs h-8"
                  >
                    Cancelar
                  </Button>
                  <Button 
                    onClick={handleStartTimer}
                    size="sm"
                    className="text-xs h-8 bg-indigo-600 hover:bg-indigo-700 text-white"
                  >
                    Iniciar
                  </Button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Button 
            variant="outline" 
            size="icon" 
            className="bg-red-50 border-red-300 text-red-600 shadow-sm relative animate-pulse"
            onClick={handleCancelTimer}
          >
            <CalendarClock className="h-5 w-5" />
            <span className="sr-only">Cancelar temporizador</span>
          </Button>
        )}
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="bg-white shadow-sm">
              <Vote className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Votación</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => toast('Función no implementada')}>
              <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>Crear nueva votación</span>
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={onShowVotingResults}>
              <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span>Ver resultados</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Button 
          variant="outline" 
          size="icon" 
          className="bg-white shadow-sm"
          onClick={toggleAuthors}
        >
          <EyeOff className="h-5 w-5" />
        </Button>
        
        <Button 
          variant="outline" 
          size="icon" 
          className="bg-white shadow-sm"
          onClick={onShowAIGenerator}
        >
          <Sparkles className="h-5 w-5" />
        </Button>
        
        <Button 
          variant="outline" 
          size="icon" 
          className="bg-white shadow-sm"
          onClick={onShowEficientisIntegration}
        >
          <Inbox className="h-5 w-5" />
        </Button>
        
        <Button 
          variant="outline" 
          size="icon" 
          className="bg-white shadow-sm"
          onClick={onShowTemplates}
        >
          <LayoutTemplate className="h-5 w-5" />
        </Button>
        
        <Button 
          variant="default" 
          className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm gap-1"
          onClick={onShowSharing}
        >
          <Share2 className="h-4 w-4" />
          <span>Compartir</span>
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="bg-white shadow-sm">
              <Settings className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Opciones del tablero</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => toast('Función no implementada')}>
              Ver detalles
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => toast('Función no implementada')}>
              Historial de cambios
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => toast('Función no implementada')}>
              Exportar tablero
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => toast('Función no implementada')}>
              Configuración
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default CollaborationToolbar;
