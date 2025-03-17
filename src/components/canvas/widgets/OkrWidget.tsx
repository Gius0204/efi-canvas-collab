
import React, { useState } from 'react';
import { Plus, Target, Zap, Trophy } from 'lucide-react';

interface OkrItem {
  id: string;
  content: string;
  type: 'objetivo' | 'keyresult' | 'iniciativa';
}

interface OkrWidgetProps {
  title?: string;
  onClose?: () => void;
  onAddToCanvas?: (data: any) => void;
  isPreview?: boolean;
}

const OkrWidget: React.FC<OkrWidgetProps> = ({ 
  title = "New Doc Eficientis - Widget OKRs",
  onClose,
  onAddToCanvas,
  isPreview = false
}) => {
  const [items, setItems] = useState<OkrItem[]>([
    { 
      id: 'obj-1', 
      content: 'Optimizar la gestión financiera para mejorar la rentabilidad y sostenibilidad de la empresa.', 
      type: 'objetivo' 
    },
    { 
      id: 'kr-1', 
      content: 'Reducir los costos operativos en un 15%', 
      type: 'keyresult' 
    },
    { 
      id: 'kr-2', 
      content: 'Disminuir en un 30% los errores en reportes financieros', 
      type: 'keyresult' 
    },
    { 
      id: 'in-1', 
      content: 'Implementar un software de gestión financiera.', 
      type: 'iniciativa' 
    }
  ]);
  
  const handleAddItem = (type: 'objetivo' | 'keyresult' | 'iniciativa') => {
    const newItem: OkrItem = {
      id: `${type.substring(0, 2)}-${Date.now()}`,
      content: `Nuevo ${type === 'objetivo' ? 'Objetivo' : type === 'keyresult' ? 'Key Result' : 'Iniciativa'}`,
      type
    };
    
    setItems(prev => [...prev, newItem]);
  };
  
  const handleDeleteItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };
  
  return (
    <div className={`bg-white rounded-lg ${isPreview ? '' : 'shadow-lg border'} w-full ${isPreview ? 'max-w-full' : 'max-w-3xl'}`}>
      <div className="p-3 border-b">
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      
      <div className="p-4">
        <div className="space-y-4">
          {/* Objective */}
          <div className="bg-white border rounded-lg p-4 shadow-sm">
            {items.filter(item => item.type === 'objetivo').map(item => (
              <div key={item.id} className="flex items-start mb-3">
                <div className="flex-shrink-0 mr-2">
                  <div className="bg-blue-100 p-1 rounded-full">
                    <Target className="h-4 w-4 text-blue-600" />
                  </div>
                </div>
                <div className="flex-grow">
                  <p className="text-sm font-medium">{item.content}</p>
                </div>
                <button
                  className="ml-2 text-gray-400 hover:text-gray-600"
                  onClick={() => handleDeleteItem(item.id)}
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
            
            <button
              className="w-full p-2 mt-2 border border-dashed border-blue-300 rounded flex items-center justify-center text-blue-600 hover:bg-blue-50"
              onClick={() => handleAddItem('objetivo')}
            >
              <Target className="h-4 w-4 mr-1" /> Añadir Objetivo
            </button>
          </div>
          
          {/* Key Results */}
          <div className="space-y-2">
            {items.filter(item => item.type === 'keyresult').map(item => (
              <div key={item.id} className="flex items-start bg-cyan-50 p-3 rounded-lg">
                <div className="flex-shrink-0 mr-2">
                  <div className="bg-cyan-100 p-1 rounded-full">
                    <Zap className="h-4 w-4 text-cyan-600" />
                  </div>
                </div>
                <div className="flex-grow">
                  <p className="text-sm">{item.content}</p>
                </div>
                <button
                  className="ml-2 text-gray-400 hover:text-gray-600"
                  onClick={() => handleDeleteItem(item.id)}
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
            
            <button
              className="w-full p-2 border border-dashed border-cyan-300 rounded flex items-center justify-center text-cyan-600 hover:bg-cyan-50"
              onClick={() => handleAddItem('keyresult')}
            >
              <Zap className="h-4 w-4 mr-1" /> Añadir Key Result
            </button>
          </div>
          
          {/* Initiatives */}
          <div className="space-y-2">
            {items.filter(item => item.type === 'iniciativa').map(item => (
              <div key={item.id} className="flex items-start bg-amber-50 p-3 rounded-lg">
                <div className="flex-shrink-0 mr-2">
                  <div className="bg-amber-100 p-1 rounded-full">
                    <Trophy className="h-4 w-4 text-amber-600" />
                  </div>
                </div>
                <div className="flex-grow">
                  <p className="text-sm">{item.content}</p>
                </div>
                <button
                  className="ml-2 text-gray-400 hover:text-gray-600"
                  onClick={() => handleDeleteItem(item.id)}
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
            
            <button
              className="w-full p-2 border border-dashed border-amber-300 rounded flex items-center justify-center text-amber-600 hover:bg-amber-50"
              onClick={() => handleAddItem('iniciativa')}
            >
              <Trophy className="h-4 w-4 mr-1" /> Añadir Iniciativa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OkrWidget;
