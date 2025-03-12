
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Share2, 
  DownloadCloud, 
  ArrowLeft, 
  Save, 
  ChevronDown, 
  Users, 
  History, 
  FileImage, 
  Menu,
  X,
  Edit,
  Clock,
  FileText,
  MoreHorizontal
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
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

interface CanvasHeaderProps {
  title: string;
}

const CanvasHeader: React.FC<CanvasHeaderProps> = ({ title }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [editableTitle, setEditableTitle] = useState(title);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [exportFormat, setExportFormat] = useState("png");
  const [exportBackground, setExportBackground] = useState("solid");
  
  const handleSave = () => {
    setIsSaving(true);
    
    // Simulate saving
    setTimeout(() => {
      setIsSaving(false);
    }, 1000);
  };

  const handleTitleEdit = () => {
    setIsEditingTitle(true);
  };

  const handleTitleSave = () => {
    // Here you would save the title to the backend
    setIsEditingTitle(false);
    // For now, we're just saving it locally
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditableTitle(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleTitleSave();
    }
  };
  
  return (
    <TooltipProvider>
      <header className="flex items-center justify-between px-4 py-2 bg-white border-b">
        <div className="flex items-center">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link to="/" className="p-1.5 mr-2 rounded-full hover:bg-gray-100">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Volver a inicio</p>
            </TooltipContent>
          </Tooltip>
          
          <div className="flex items-center">
            <svg className="h-6 w-6 mr-2 text-efi-red" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="10" />
              <text x="12" y="16" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">E</text>
            </svg>
            
            <div className="flex items-center">
              {isEditingTitle ? (
                <div className="flex items-center">
                  <Input
                    value={editableTitle}
                    onChange={handleTitleChange}
                    onBlur={handleTitleSave}
                    onKeyDown={handleKeyDown}
                    className="h-8 text-base font-medium"
                    autoFocus
                  />
                </div>
              ) : (
                <div 
                  className="flex items-center cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
                  onClick={handleTitleEdit}
                >
                  <h1 className="font-medium mr-2">{editableTitle}</h1>
                  <Edit className="h-3 w-3 text-gray-500" />
                </div>
              )}
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-7 px-2 ml-1">
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-60">
                  <DropdownMenuLabel>Opciones de documento</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  
                  {/* Quick Menu */}
                  <Sheet>
                    <SheetTrigger asChild>
                      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <Menu className="mr-2 h-4 w-4" />
                        <span>Menú rápido</span>
                      </DropdownMenuItem>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-80 sm:w-96">
                      <SheetHeader>
                        <SheetTitle>Dashboard Dinámico</SheetTitle>
                        <SheetDescription>
                          Acceso rápido a sus documentos
                        </SheetDescription>
                      </SheetHeader>
                      <div className="py-4">
                        <div className="relative mb-4">
                          <Input
                            placeholder="Buscar..."
                            className="pl-8"
                          />
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-2 top-2.5 h-4 w-4 text-gray-400">
                            <circle cx="11" cy="11" r="8"/>
                            <path d="m21 21-4.3-4.3"/>
                          </svg>
                        </div>
                        
                        <div className="relative mb-4">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" className="w-full justify-between">
                                <span>Última modificación</span>
                                <ChevronDown className="h-4 w-4 opacity-50" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem>
                                Última modificación
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                Título (A-Z)
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                Título (Z-A)
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        
                        <div className="space-y-4">
                          {[
                            { title: 'Pestel Eficientis', time: 'Editado a las 19:50', img: '/lovable-uploads/40097394-44a8-4e3b-a650-4dff0315f093.png' },
                            { title: 'Foda Marketing', time: 'Editado a las 13:50', img: '/lovable-uploads/4c97b60b-269d-4520-94f2-79ba47293d04.png' },
                            { title: 'OKRs Proyecto Económico', time: 'Editado a las 10:50', img: '/lovable-uploads/26b3a7d4-8e3d-4e4d-9d23-c7c6a050981d.png' },
                            { title: 'Mapa BSC Relaciones Exteriores', time: 'Editado hace 3 días', img: '/lovable-uploads/e6a590cd-abad-475c-9560-946cd7364af8.png' },
                          ].map((item, i) => (
                            <div key={i} className="flex items-center p-2 hover:bg-gray-100 rounded-md transition cursor-pointer">
                              <img 
                                src={item.img} 
                                alt={item.title} 
                                className="w-12 h-12 object-cover rounded mr-3"
                              />
                              <div className="flex-1">
                                <h4 className="text-sm font-medium">{item.title}</h4>
                                <p className="text-xs text-gray-500">por GusPlay</p>
                                <p className="text-xs text-gray-500">{item.time}</p>
                              </div>
                              <Link className="text-gray-500 hover:text-gray-700" to="#">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                                </svg>
                              </Link>
                            </div>
                          ))}
                        </div>
                      </div>
                    </SheetContent>
                  </Sheet>
                  
                  {/* Version History */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <History className="mr-2 h-4 w-4" />
                        <span>Historial de versiones</span>
                      </DropdownMenuItem>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Historial de Versiones</DialogTitle>
                        <DialogDescription>
                          Vea y restaure versiones anteriores del documento
                        </DialogDescription>
                      </DialogHeader>
                      <div className="max-h-[400px] overflow-y-auto py-4">
                        <div className="mb-4">
                          <div className="flex items-center">
                            <div className="h-3 w-3 rounded-full bg-blue-500 mr-2"></div>
                            <span className="text-sm font-medium">Versión actual</span>
                          </div>
                        </div>
                        
                        <div className="mb-2">
                          <span className="text-xs text-gray-500">27 versiones autoguardadas</span>
                        </div>
                        
                        <div className="space-y-4">
                          {['10:50 AM', '10:12 AM', '9:45 AM', '9:30 AM', '9:01 AM', '8:20 AM'].map((time, i) => (
                            <div key={i} className="flex items-center p-2 hover:bg-gray-100 rounded-md transition cursor-pointer">
                              <div className="mr-3 text-right">
                                <p className="text-xs font-medium">{time}</p>
                              </div>
                              <div className="h-7 w-7 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium border-2 border-white">
                                GP
                              </div>
                              {i === 0 && (
                                <Button size="sm" variant="outline" className="ml-auto text-xs">
                                  Restaurar
                                </Button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  {/* Export */}
                  <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
                    <DialogTrigger asChild>
                      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <FileImage className="mr-2 h-4 w-4" />
                        <span>Exportar</span>
                      </DropdownMenuItem>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Exportar</DialogTitle>
                        <DialogDescription>
                          Exporte su lienzo como imagen o documento
                        </DialogDescription>
                      </DialogHeader>
                      <div className="py-4">
                        <div className="mb-4">
                          <Label>Tipo de archivo</Label>
                          <RadioGroup 
                            defaultValue="png" 
                            className="grid grid-cols-2 gap-4 mt-2"
                            value={exportFormat}
                            onValueChange={setExportFormat}
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="png" id="png" />
                              <Label htmlFor="png">PNG</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="jpg" id="jpg" />
                              <Label htmlFor="jpg">JPG</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="pdf" id="pdf" />
                              <Label htmlFor="pdf">PDF</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="csv" id="csv" />
                              <Label htmlFor="csv">CSV</Label>
                            </div>
                          </RadioGroup>
                        </div>
                        
                        <div className="mb-4">
                          <Label>Fondo</Label>
                          <div className="flex items-center mt-2">
                            <select 
                              className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                              value={exportBackground}
                              onChange={(e) => setExportBackground(e.target.value)}
                            >
                              <option value="solid">Sólido</option>
                              <option value="transparent">Transparente</option>
                              <option value="grid">Cuadrícula</option>
                            </select>
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <Label>Área de exportación</Label>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-sm">Archivo completo</span>
                            <Button variant="outline" size="sm">
                              Seleccionar área
                            </Button>
                          </div>
                        </div>
                        
                        <div className="text-center text-xs text-gray-500 mt-6 mb-4">
                          <Clock className="inline-block h-4 w-4 mr-1" />
                          La exportación puede tardar un minuto o dos
                        </div>
                        
                        <div className="flex justify-end">
                          <DialogClose asChild>
                            <Button variant="secondary" className="mr-2">
                              Cancelar
                            </Button>
                          </DialogClose>
                          <Button>
                            Exportar
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  {/* More Options */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <MoreHorizontal className="mr-2 h-4 w-4" />
                        <span>Más opciones</span>
                      </DropdownMenuItem>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        Nuevo lienzo
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        Hacer una copia
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-500">
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Tooltip>
            <TooltipTrigger asChild>
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
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Guardar lienzo</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm" className="h-8">
                <Share2 className="h-4 w-4 mr-1" />
                <span>Compartir</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Compartir con otros</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className="h-8"
                onClick={() => setShowExportDialog(true)}
              >
                <DownloadCloud className="h-4 w-4 mr-1" />
                <span>Exportar</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Exportar lienzo</p>
            </TooltipContent>
          </Tooltip>
          
          <div className="flex -space-x-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-medium border-2 border-white cursor-pointer">
                  A
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Usuario A está editando</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center text-white text-sm font-medium border-2 border-white cursor-pointer">
                  B
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Usuario B está editando</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-medium border-2 border-white cursor-pointer">
                  C
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Usuario C está editando</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </header>
    </TooltipProvider>
  );
};

export default CanvasHeader;
