
import React, { useState } from 'react';
import { X, Plus, Layout, Lightbulb, Play, ArrowLeft, Eye, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface CreateCanvasModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateCanvasModal: React.FC<CreateCanvasModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  
  const handleCreateBlank = () => {
    navigate('/canvas/new');
    onClose();
  };
  
  const handleCreateFromTemplate = () => {
    // Navigate to template selection instead of closing
    setShowTemplates(true);
  };
  
  const handleCreateWithAI = () => {
    // AI creation functionality (future feature)
    navigate('/canvas/ai-new');
    onClose();
  };
  
  const [showTemplates, setShowTemplates] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('estrategia');

  const templateCategories = [
    { id: 'brainstorming', name: 'Brainstorming' },
    { id: 'widgets', name: 'Widgets' },
    { id: 'estrategia', name: 'Estrategia' },
    { id: 'gestion', name: 'Gestión de Proyectos' },
    { id: 'diagramas', name: 'Diagramas' },
    { id: 'desarrollo', name: 'Desarrollo' },
    { id: 'diseño', name: 'Diseño' },
    { id: 'mis', name: 'Mis plantillas' },
  ];

  const templates = [
    { id: 'foda', name: 'BSC FODA', category: 'estrategia', thumbnail: '/lovable-uploads/4c97b60b-269d-4520-94f2-79ba47293d04.png' },
    { id: 'okrs', name: 'OKRs', category: 'estrategia', thumbnail: '/lovable-uploads/26b3a7d4-8e3d-4e4d-9d23-c7c6a050981d.png' },
    { id: 'pestel', name: 'PESTEL', category: 'estrategia', thumbnail: '/lovable-uploads/40097394-44a8-4e3b-a650-4dff0315f093.png' },
    { id: 'mapa', name: 'MAPA ESTRATÉGICO', category: 'estrategia', thumbnail: '/lovable-uploads/e6a590cd-abad-475c-9560-946cd7364af8.png' },
  ];

  const widgets = [
    { id: 'foda-widget', name: 'Widget FODA', category: 'widgets', thumbnail: '/lovable-uploads/8bf3774b-aec4-40f1-b295-a28fbd9062e6.png' },
    { id: 'okrs-widget', name: 'Widget OKRs', category: 'widgets', thumbnail: '/lovable-uploads/f8d90d40-5409-4bde-a4cf-db2e296f7adb.png' },
  ];

  const handleBackToOptions = () => {
    setShowTemplates(false);
    setSelectedTemplate(null);
  };

  const handleTemplateClick = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    setSelectedTemplate(null);
  };

  const handleCreateWithTemplate = (templateId: string) => {
    navigate(`/canvas/template/${templateId}`);
    onClose();
  };

  const handleViewTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  const selectedTemplateData = selectedTemplate 
    ? [...templates, ...widgets].find(t => t.id === selectedTemplate) 
    : null;

  const filteredTemplates = [...templates, ...widgets].filter(t => 
    (!searchQuery || t.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (t.id !== selectedTemplate) && 
    (!selectedTemplate ? (t.category === activeCategory) : (t.category === selectedTemplateData?.category))
  );

  const displayedItems = activeCategory === 'widgets' ? widgets : templates.filter(t => t.category === activeCategory);

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[600px] p-0">
        <div className="relative">
          
          {!showTemplates && !selectedTemplate && (
            <div className="p-6">
              <h2 className="text-center text-sm text-gray-500 mb-1">Bienvenido a Eficiente Board</h2>
              <h1 className="text-center text-2xl font-bold mb-6">Cree un lienzo</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div 
                  onClick={handleCreateBlank}
                  className="flex flex-col items-center justify-center p-8 border rounded-md hover:border-primary hover:shadow-md cursor-pointer transition-all"
                >
                  <div className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded mb-2">
                    <Plus className="h-5 w-5 text-gray-700" />
                  </div>
                  <span className="text-sm font-medium">En blanco</span>
                </div>
                
                <div 
                  onClick={handleCreateFromTemplate}
                  className="flex flex-col items-center justify-center p-8 border rounded-md hover:border-primary hover:shadow-md cursor-pointer transition-all"
                >
                  <div className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded mb-2">
                    <Layout className="h-5 w-5 text-gray-700" />
                  </div>
                  <span className="text-sm font-medium">Por plantilla</span>
                </div>
                
                <div 
                  onClick={handleCreateWithAI}
                  className="flex flex-col items-center justify-center p-8 border rounded-md hover:border-primary hover:shadow-md cursor-pointer transition-all"
                >
                  <div className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded mb-2">
                    <Lightbulb className="h-5 w-5 text-gray-700" />
                  </div>
                  <span className="text-sm font-medium">Crear con IA</span>
                </div>
              </div>
              
              <div className="flex items-center justify-center mt-4">
                <button className="flex items-center text-sm text-primary hover:underline">
                  <Play className="h-4 w-4 mr-1" />
                  Mira el video de introducción rápido para conocer Eficiente Board
                </button>
              </div>
            </div>
          )}
          
          {showTemplates && !selectedTemplate && (
            <div className="p-4">
              <div className="flex items-center mb-4">
                <button 
                  onClick={handleBackToOptions}
                  className="p-1 mr-2 hover:bg-gray-100 rounded-full"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <h2 className="text-lg font-semibold">Plantillas</h2>
              </div>
              
              <div className="flex mb-6">
                <div className="w-48 pr-4 border-r">
                  <ul className="space-y-2">
                    {templateCategories.map(category => (
                      <li key={category.id}>
                        <button 
                          className={`w-full text-left px-2 py-1 rounded hover:bg-gray-100 text-sm ${activeCategory === category.id ? 'bg-gray-100 font-medium' : ''}`}
                          onClick={() => handleCategoryClick(category.id)}
                        >
                          {category.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex-1 pl-4">
                  <div className="relative mb-4">
                    <Input
                      type="text"
                      placeholder="Buscar..."
                      className="w-full p-2 pl-8 border rounded-md text-sm"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {displayedItems.map(item => (
                      <div key={item.id} className="border rounded-md overflow-hidden">
                        <div className="h-24 bg-gray-100">
                          <img 
                            src={item.thumbnail} 
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-2 flex flex-col">
                          <h3 className="font-medium text-sm mb-2">{item.name}</h3>
                          <div className="flex justify-between">
                            <Button 
                              onClick={() => handleCreateWithTemplate(item.id)}
                              className="bg-purple-600 hover:bg-purple-700 text-white text-xs px-3 py-1 rounded"
                            >
                              Crear
                            </Button>
                            <Button 
                              onClick={() => handleViewTemplate(item.id)}
                              className="text-gray-600 hover:text-gray-900 p-1 rounded border bg-white"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {selectedTemplate && (
            <div className="p-4">
              <div className="flex items-center mb-4">
                <button 
                  onClick={handleBackToOptions}
                  className="p-1 mr-2 hover:bg-gray-100 rounded-full"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <h2 className="text-lg font-semibold">Plantillas</h2>
              </div>
              
              {selectedTemplateData && (
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-2">{selectedTemplateData.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Esta plantilla está diseñada para representar el proceso de establecimiento de objetivos, métricas o análisis según el tipo seleccionado.
                  </p>
                  
                  <div className="mb-6">
                    <img 
                      src={selectedTemplateData.thumbnail}
                      alt={selectedTemplateData.name}
                      className="w-full h-auto max-h-64 object-contain border rounded-md"
                    />
                  </div>
                  
                  <Button 
                    onClick={() => handleCreateWithTemplate(selectedTemplateData.id)}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md"
                  >
                    Usar plantilla
                  </Button>
                  
                  <div className="mt-8">
                    <h4 className="text-lg font-semibold mb-4">Otras plantillas</h4>
                    <div className="grid grid-cols-3 gap-4">
                      {filteredTemplates.slice(0, 3).map(template => (
                        <div 
                          key={template.id} 
                          className="border rounded-md overflow-hidden cursor-pointer hover:shadow-md transition-all"
                          onClick={() => handleTemplateClick(template.id)}
                        >
                          <div className="h-20 bg-gray-100">
                            <img 
                              src={template.thumbnail}
                              alt={template.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="p-2">
                            <h5 className="font-medium text-xs">{template.name}</h5>
                            <div className="mt-2">
                              <Button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCreateWithTemplate(template.id);
                                }}
                                className="bg-purple-600 hover:bg-purple-700 text-white text-xs px-2 py-0.5 w-full rounded"
                              >
                                Crear
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCanvasModal;
