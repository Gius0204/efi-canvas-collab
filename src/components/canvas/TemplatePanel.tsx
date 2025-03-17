
import React, { useState } from 'react';
import { X, Search, ArrowLeft, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';

interface TemplatePanelProps {
  onClose: () => void;
}

const TemplatePanel: React.FC<TemplatePanelProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const [showTemplates, setShowTemplates] = useState(true);
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
    setShowTemplates(true);
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

  const handleUseTemplate = (templateId: string) => {
    // Add template to current canvas
    console.log('Using template:', templateId);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-auto">
        <div className="relative p-4">
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
          
          {showTemplates && !selectedTemplate && (
            <div className="p-2">
              <div className="flex items-center mb-4">
                <h2 className="text-xl font-semibold">Plantillas</h2>
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
                        <div className="h-36 bg-gray-100">
                          <img 
                            src={item.thumbnail} 
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-3 flex flex-col">
                          <h3 className="font-medium text-sm mb-2">{item.name}</h3>
                          <div className="flex justify-between">
                            <Button 
                              onClick={() => handleCreateWithTemplate(item.id)}
                              className="bg-primary text-white text-xs px-3 py-1 rounded hover:bg-primary/90"
                            >
                              Crear
                            </Button>
                            <div className="flex space-x-1">
                              <Button 
                                onClick={() => handleUseTemplate(item.id)}
                                className="text-gray-600 hover:text-gray-900 text-xs px-3 py-1 rounded border bg-white"
                              >
                                Usar
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
                  
                  <div className="flex space-x-3">
                    <Button 
                      onClick={() => handleCreateWithTemplate(selectedTemplateData.id)}
                      className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90"
                    >
                      Crear nuevo
                    </Button>
                    
                    <Button 
                      onClick={() => handleUseTemplate(selectedTemplateData.id)}
                      className="bg-white border text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50"
                    >
                      Usar en este lienzo
                    </Button>
                  </div>
                  
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
                            <div className="flex justify-between mt-2">
                              <Button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCreateWithTemplate(template.id);
                                }}
                                className="bg-primary text-white text-xs px-2 py-0.5 rounded"
                              >
                                Crear
                              </Button>
                              <Button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleUseTemplate(template.id);
                                }}
                                className="text-gray-600 text-xs px-2 py-0.5 rounded border"
                              >
                                Usar
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
      </div>
    </div>
  );
};

export default TemplatePanel;
