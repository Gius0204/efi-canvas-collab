
import React, { useState } from 'react';
import { X, Search, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface EficientisWidgetPanelProps {
  onClose: () => void;
  onCreateWidget: (widgetType: string) => void;
  onUseWidget: (widgetType: string) => void;
}

const EficientisWidgetPanel: React.FC<EficientisWidgetPanelProps> = ({
  onClose,
  onCreateWidget,
  onUseWidget
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const widgets = [
    { 
      id: 'foda-widget', 
      name: 'Widget FODA', 
      description: 'Análisis de fortalezas, oportunidades, debilidades y amenazas',
      thumbnail: '/lovable-uploads/4c97b60b-269d-4520-94f2-79ba47293d04.png' 
    },
    { 
      id: 'okrs-widget', 
      name: 'Widget OKRs', 
      description: 'Objetivos y resultados clave para monitoreo de desempeño',
      thumbnail: '/lovable-uploads/26b3a7d4-8e3d-4e4d-9d23-c7c6a050981d.png' 
    },
  ];

  const filteredWidgets = widgets.filter(widget => 
    widget.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    widget.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-xl max-h-[90vh] overflow-auto">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Nuevo Board para Eficientis</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <p className="text-sm text-gray-600 mb-4">
            Crea un nuevo documento para Eficientis utilizando nuestros widgets preparados
          </p>
          
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
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            {filteredWidgets.map(widget => (
              <div key={widget.id} className="border rounded-md overflow-hidden">
                <div className="h-32 bg-gray-100">
                  <img 
                    src={widget.thumbnail} 
                    alt={widget.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-sm mb-1">{widget.name}</h3>
                  <p className="text-xs text-gray-600 mb-3 line-clamp-2">{widget.description}</p>
                  <div className="flex justify-between">
                    <Button 
                      onClick={() => onCreateWidget(widget.id)}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs px-3 py-1 rounded"
                    >
                      Crear
                    </Button>
                    <div className="flex space-x-1">
                      <Button 
                        onClick={() => onUseWidget(widget.id)}
                        className="text-gray-600 hover:text-gray-900 text-xs px-3 py-1 rounded border bg-white"
                      >
                        Usar
                      </Button>
                      <Button className="text-gray-600 hover:text-gray-900 p-1 rounded border bg-white">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-end">
            <Button
              variant="default"
              className="bg-indigo-600 hover:bg-indigo-700"
              onClick={() => {}}
            >
              Ver más
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EficientisWidgetPanel;
