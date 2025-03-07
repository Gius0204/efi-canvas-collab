
import React, { useState } from 'react';
import { X, Copy, ChevronDown, Users, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

interface Collaborator {
  id: string;
  name: string;
  avatar?: string;
  permission: 'owner' | 'edit' | 'view';
}

interface SharePanelProps {
  title: string;
  collaborators: Collaborator[];
  onClose: () => void;
  onInvite: (email: string, permission: string) => void;
  onUpdateCollaborator: (id: string, permission: string) => void;
  onRemoveCollaborator: (id: string) => void;
}

const SharePanel: React.FC<SharePanelProps> = ({
  title,
  collaborators,
  onClose,
  onInvite,
  onUpdateCollaborator,
  onRemoveCollaborator
}) => {
  const [activeTab, setActiveTab] = useState<string>('email');
  const [email, setEmail] = useState('');
  const [permission, setPermission] = useState('edit');
  const [notifyCollaborators, setNotifyCollaborators] = useState(false);
  const [linkPermission, setLinkPermission] = useState('edit');
  const [showManageAccess, setShowManageAccess] = useState(false);
  
  const handleInvite = () => {
    if (!email.trim()) return;
    onInvite(email, permission);
    setEmail('');
    toast.success('Invitación enviada correctamente');
  };
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://enlace.para.compartir/lienzo-' + Date.now());
    toast.success('Enlace copiado al portapapeles');
  };
  
  const handleSaveAccess = () => {
    setShowManageAccess(false);
    toast.success('Permisos de acceso actualizados correctamente');
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        {!showManageAccess ? (
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">COMPARTIR Lienzo {title}</h2>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <Tabs defaultValue="email" onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="email" className="data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 rounded-none py-2 text-sm">
                  Invitar por correo electrónico
                </TabsTrigger>
                <TabsTrigger value="link" className="data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 rounded-none py-2 text-sm">
                  Enlace para compartir
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="email" className="mt-0">
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-2">
                      <Input 
                        placeholder="Invitar por correo electrónico" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="col-span-1 flex items-center">
                      <Select value={permission} onValueChange={setPermission}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Editar" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="edit">Editar</SelectItem>
                          <SelectItem value="view">Ver</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={handleInvite}
                    disabled={!email.trim()}
                  >
                    Invitar
                  </Button>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="notify" 
                      checked={notifyCollaborators}
                      onCheckedChange={(checked) => setNotifyCollaborators(checked as boolean)}
                    />
                    <label htmlFor="notify" className="text-sm">
                      Notificar a los colaboradores
                    </label>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="link" className="mt-0">
                <div className="space-y-4">
                  <div className="border rounded-md p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="p-1 bg-gray-100 rounded-full">
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <span>Cualquier persona con el enlace (Público)</span>
                      </div>
                      <ChevronDown className="h-4 w-4 opacity-50" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-2">
                      <Input 
                        value="https://enlace.para.compartir/..." 
                        readOnly
                        className="bg-gray-50"
                      />
                    </div>
                    <div className="col-span-1">
                      <Select value={permission} onValueChange={setPermission}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Editar" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="edit">Editar</SelectItem>
                          <SelectItem value="view">Ver</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={handleCopyLink}
                  >
                    Copiar
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
            
            <Separator className="my-4" />
            
            <div className="space-y-3">
              <p className="font-medium">Colaboradores</p>
              
              <div className="flex items-center">
                <div className="flex -space-x-2">
                  {collaborators.slice(0, 4).map((collab) => (
                    <Avatar key={collab.id} className="h-8 w-8 border-2 border-white">
                      {collab.avatar ? (
                        <AvatarImage src={collab.avatar} alt={collab.name} />
                      ) : (
                        <AvatarFallback>{collab.name.charAt(0)}</AvatarFallback>
                      )}
                    </Avatar>
                  ))}
                  {collaborators.length > 4 && (
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-sm border-2 border-white">
                      +{collaborators.length - 4}
                    </div>
                  )}
                </div>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="ml-4 text-blue-600"
                  onClick={() => setShowManageAccess(true)}
                >
                  <Users className="h-4 w-4 mr-1" />
                  Gestionar el acceso
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4">
            <div className="flex items-center mb-6">
              <Button 
                variant="ghost" 
                size="icon" 
                className="mr-2"
                onClick={() => setShowManageAccess(false)}
              >
                <ChevronDown className="h-4 w-4 -rotate-90" />
              </Button>
              <h2 className="text-lg font-bold">GESTIONAR COLABORADORES</h2>
            </div>
            
            <Separator className="mb-4" />
            
            <div className="space-y-4 max-h-[400px] overflow-y-auto">
              {collaborators.map((collab) => (
                <div key={collab.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      {collab.avatar ? (
                        <AvatarImage src={collab.avatar} alt={collab.name} />
                      ) : (
                        <AvatarFallback>{collab.name.charAt(0)}</AvatarFallback>
                      )}
                    </Avatar>
                    <span className="font-medium">{collab.name}</span>
                  </div>
                  <div className="flex items-center">
                    {collab.permission === 'owner' ? (
                      <span className="text-gray-500">Propietario</span>
                    ) : (
                      <>
                        <Select 
                          value={collab.permission} 
                          onValueChange={(value) => onUpdateCollaborator(collab.id, value)}
                          disabled={collab.permission === 'owner'}
                        >
                          <SelectTrigger className="w-20 h-8">
                            <SelectValue placeholder="Editar" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="edit">Editar</SelectItem>
                            <SelectItem value="view">Ver</SelectItem>
                          </SelectContent>
                        </Select>
                        
                        {collab.permission !== 'owner' && (
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="ml-2 text-red-500 h-7 w-7"
                            onClick={() => onRemoveCollaborator(collab.id)}
                          >
                            <div className="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center">
                              <X className="h-3 w-3" />
                            </div>
                          </Button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <Separator className="my-4" />
            
            <Button 
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
              onClick={handleSaveAccess}
            >
              Guardar
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SharePanel;
