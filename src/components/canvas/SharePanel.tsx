
import React, { useState } from 'react';
import { X, Copy, UserPlus, ChevronDown, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import UserAvatar from '@/components/UserAvatar';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Permission = "view" | "edit" | "owner";

interface Collaborator {
  id: string;
  name: string;
  avatar: string;
  permission: Permission;
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
  const [email, setEmail] = useState('');
  const [permission, setPermission] = useState<Permission>('edit');
  const [notifyCollaborators, setNotifyCollaborators] = useState(true);
  const [publicLinkEnabled, setPublicLinkEnabled] = useState(false);
  const [publicPermission, setPublicPermission] = useState<Permission>('view');
  const [manageMode, setManageMode] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  
  const publicLink = `https://eficiente.io/board/${Math.random().toString(36).substring(2, 15)}`;
  
  const handleInvite = () => {
    if (!email.trim()) {
      toast.error('Por favor ingresa un correo electrónico');
      return;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Por favor ingresa un correo electrónico válido');
      return;
    }
    
    onInvite(email, permission);
    setEmail('');
  };
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(publicLink);
    setLinkCopied(true);
    toast.success('Enlace copiado al portapapeles');
    
    setTimeout(() => {
      setLinkCopied(false);
    }, 2000);
  };
  
  const handlePermissionChange = (id: string, newPermission: Permission) => {
    onUpdateCollaborator(id, newPermission);
  };
  
  const handleRemoveCollaborator = (id: string) => {
    onRemoveCollaborator(id);
  };

  const toggleManageMode = () => {
    setManageMode(!manageMode);
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg">
        {manageMode ? (
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">GESTIONAR COLABORADORES</h2>
              <Button variant="ghost" size="icon" onClick={toggleManageMode}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="space-y-3 mt-2">
              {collaborators.map((collaborator) => (
                <div key={collaborator.id} className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={collaborator.avatar} alt={collaborator.name} />
                      <AvatarFallback>{collaborator.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{collaborator.name}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {collaborator.permission === "owner" ? (
                      <span className="text-gray-600">Propietario</span>
                    ) : (
                      <>
                        <Select 
                          value={collaborator.permission} 
                          onValueChange={(value) => handlePermissionChange(collaborator.id, value as Permission)}
                        >
                          <SelectTrigger className="w-24 h-9">
                            <SelectValue placeholder={collaborator.permission === "edit" ? "Editar" : "Ver"} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="edit">Editar</SelectItem>
                            <SelectItem value="view">Ver</SelectItem>
                          </SelectContent>
                        </Select>
                        
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="text-red-500 hover:bg-red-50 hover:text-red-600 rounded-full"
                          onClick={() => handleRemoveCollaborator(collaborator.id)}
                        >
                          <X className="h-5 w-5" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <Button 
              className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white"
              onClick={toggleManageMode}
            >
              Guardar
            </Button>
          </div>
        ) : (
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Compartir {title}</h2>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="mb-6">
              <div className="flex gap-2">
                <Input
                  placeholder="Añadir personas por correo"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1"
                />
                <Select value={permission} onValueChange={(value) => setPermission(value as Permission)}>
                  <SelectTrigger className="w-28">
                    <SelectValue placeholder="Permisos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="edit">Editar</SelectItem>
                    <SelectItem value="view">Ver</SelectItem>
                  </SelectContent>
                </Select>
                <Button 
                  variant="default" 
                  className="whitespace-nowrap bg-indigo-600 hover:bg-indigo-700"
                  onClick={handleInvite}
                >
                  Invitar
                </Button>
              </div>
              
              <div className="flex items-center gap-2 mt-2">
                <Checkbox 
                  id="notify-collaborators" 
                  checked={notifyCollaborators}
                  onCheckedChange={() => setNotifyCollaborators(!notifyCollaborators)}
                />
                <label htmlFor="notify-collaborators" className="text-sm text-gray-600">
                  Notificar a los colaboradores
                </label>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium mb-2">Enlace público</h3>
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center flex-1">
                  <Switch 
                    checked={publicLinkEnabled}
                    onCheckedChange={setPublicLinkEnabled}
                    id="public-link"
                  />
                  <label htmlFor="public-link" className="ml-2 text-sm">
                    {publicLinkEnabled ? 'Enlace activado' : 'Enlace desactivado'}
                  </label>
                </div>
                
                {publicLinkEnabled && (
                  <Select 
                    value={publicPermission} 
                    onValueChange={(value) => setPublicPermission(value as Permission)}
                    disabled={!publicLinkEnabled}
                  >
                    <SelectTrigger className="w-28">
                      <SelectValue placeholder="Permisos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="edit">Editar</SelectItem>
                      <SelectItem value="view">Ver</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </div>
              
              {publicLinkEnabled && (
                <div className="flex items-center gap-2">
                  <Input 
                    value={publicLink}
                    readOnly
                    className="flex-1 bg-gray-50"
                  />
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={handleCopyLink}
                    className={linkCopied ? "bg-green-50 text-green-600" : ""}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
            
            <Separator className="my-4" />
            
            <div className="mb-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <div className="flex -space-x-2 mr-2">
                    {collaborators.slice(0, 3).map((collaborator) => (
                      <Avatar key={collaborator.id} className="h-8 w-8 border-2 border-white">
                        <AvatarImage src={collaborator.avatar} alt={collaborator.name} />
                        <AvatarFallback>{collaborator.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                    ))}
                    {collaborators.length > 3 && (
                      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium border-2 border-white">
                        +{collaborators.length - 3}
                      </div>
                    )}
                  </div>
                  <span className="text-sm font-medium">Colaboradores</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-blue-600 border-none"
                  onClick={toggleManageMode}
                >
                  <Users className="h-4 w-4 mr-1" />
                  Gestionar el acceso
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SharePanel;
