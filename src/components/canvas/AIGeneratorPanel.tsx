
import React, { useState } from 'react';
import { X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface TemplateOption {
  id: string;
  name: string;
  icon: React.ReactNode;
  description?: string;
}

interface AIGeneratorPanelProps {
  onClose: () => void;
  onGenerate: (prompt: string, template: string) => void;
}

const AIGeneratorPanel: React.FC<AIGeneratorPanelProps> = ({
  onClose,
  onGenerate
}) => {
  const [prompt, setPrompt] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const templateOptions: TemplateOption[] = [
    { 
      id: 'okrs', 
      name: 'OKRs', 
      icon: <span className="text-lg">📊</span>,
      description: 'Objetivos y resultados clave para medir el progreso'
    },
    { 
      id: 'foda', 
      name: 'Foda BSC', 
      icon: <span className="text-lg">🔄</span>,
      description: 'Análisis de fortalezas, oportunidades, debilidades y amenazas'
    },
    { 
      id: 'mapa', 
      name: 'Mapa BSC', 
      icon: <span className="text-lg">🗺️</span>,
      description: 'Mapa estratégico para visualizar objetivos'
    },
    { 
      id: 'pestel', 
      name: 'PESTEL', 
      icon: <span className="text-lg">🌐</span>,
      description: 'Análisis de factores externos: políticos, económicos, sociales...'
    },
    { 
      id: 'brainstorm', 
      name: 'Brainstorm', 
      icon: <span className="text-lg">💡</span>,
      description: 'Generación de ideas colaborativas'
    }
  ];
  
  const handleGenerate = () => {
    if (!prompt || !selectedTemplate) return;
    
    setIsGenerating(true);
    // Simulate generation process
    setTimeout(() => {
      onGenerate(prompt, selectedTemplate);
      setIsGenerating(false);
      onClose();
    }, 1500);
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-medium text-blue-600 flex items-center">
              DupreeAI <span className="ml-2">🐼</span>
            </h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg mb-5">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Crea elementos usando IA</h3>
            <Textarea
              placeholder="Escribe un prompt para empezar a crear ideas según tu tema de interés..."
              className="mb-6 min-h-[100px] bg-white resize-none"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Selecciona una plantilla</h4>
              <div className="grid grid-cols-3 gap-2">
                {templateOptions.map((option) => (
                  <button
                    key={option.id}
                    className={`flex flex-col items-center py-3 px-2 rounded-md transition-all ${
                      selectedTemplate === option.id 
                        ? 'ring-2 ring-blue-500 bg-blue-50' 
                        : 'bg-white border hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedTemplate(option.id)}
                  >
                    <div className="mb-1">{option.icon}</div>
                    <span className="text-xs font-medium">{option.name}</span>
                  </button>
                ))}
              </div>
              
              {selectedTemplate && (
                <div className="text-xs text-gray-600 mt-2 p-2 bg-blue-50 rounded-md">
                  {templateOptions.find(t => t.id === selectedTemplate)?.description}
                </div>
              )}
            </div>
          </div>
          
          <Button 
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
            onClick={handleGenerate}
            disabled={!prompt || !selectedTemplate || isGenerating}
          >
            {isGenerating ? (
              <span className="flex items-center">
                Generando <span className="animate-pulse ml-2">...</span>
              </span>
            ) : (
              <span className="flex items-center">
                Generar <Sparkles className="ml-1 h-4 w-4" />
              </span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIGeneratorPanel;
