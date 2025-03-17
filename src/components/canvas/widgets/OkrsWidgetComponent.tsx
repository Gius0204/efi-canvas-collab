
import React, { useState } from 'react';
import { X, Plus, CircleDot, Zap, Flag } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface OkrItem {
  id: string;
  text: string;
  type: 'objetivo' | 'keyResult' | 'iniciativa';
}

interface OkrsWidgetComponentProps {
  onClose: () => void;
  onAddToCanvas: (widget: any) => void;
}

const OkrsWidgetComponent: React.FC<OkrsWidgetComponentProps> = ({ onClose, onAddToCanvas }) => {
  const [items, setItems] = useState<OkrItem[]>([
    { id: '1', text: 'Optimizar la gestión financiera para mejorar la rentabilidad y sostenibilidad de la empresa.', type: 'objetivo' },
    { id: '2', text: 'Reducir los costos operativos en un 15%', type: 'keyResult' },
    { id: '3', text: 'Disminuir en un 30% los errores en reportes financieros', type: 'keyResult' },
    { id: '4', text: 'Implementar un software de gestión financiera.', type: 'iniciativa' }
  ]);
  
  const [newItem, setNewItem] = useState('');
  const [activeType, setActiveType] = useState<'objetivo' | 'keyResult' | 'iniciativa' | null>(null);
  
  const handleAddItem = () => {
    if (newItem && activeType) {
      setItems([
        ...items,
        {
          id: (items.length + 1).toString(),
          text: newItem,
          type: activeType
        }
      ]);
      setNewItem('');
      setActiveType(null);
    }
  };
  
  const handleRemoveItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleAddToCanvas = () => {
    onAddToCanvas({
      type: 'okrs-widget',
      items
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-auto">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">OKRs Widget</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="mb-4">
            <div className="bg-white p-4 border rounded-lg mb-4">
              {/* Objective */}
              <div className="mb-4">
                <h3 className="text-md font-semibold mb-2 flex items-center">
                  <CircleDot className="h-5 w-5 text-green-500 mr-2" /> Objetivo
                </h3>
                {items
                  .filter(item => item.type === 'objetivo')
                  .map(item => (
                    <div key={item.id} className="bg-green-100 p-3 mb-2 rounded-md relative group">
                      <button 
                        onClick={() => handleRemoveItem(item.id)}
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                      <div
                        className="w-full min-h-[40px]"
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) => {
                          setItems(items.map(i => i.id === item.id ? { ...i, text: e.currentTarget.textContent || '' } : i));
                        }}
                      >
                        {item.text}
                      </div>
                    </div>
                  ))}
                  
                <button 
                  className="flex items-center p-2 bg-green-50 hover:bg-green-100 rounded-md text-sm"
                  onClick={() => setActiveType('objetivo')}
                >
                  <Plus className="h-4 w-4 mr-1" /> Añadir Objetivo
                </button>
              </div>
              
              {/* Key Results */}
              <div className="mb-4">
                <h3 className="text-md font-semibold mb-2 flex items-center">
                  <Zap className="h-5 w-5 text-blue-500 mr-2" /> Key Results
                </h3>
                {items
                  .filter(item => item.type === 'keyResult')
                  .map(item => (
                    <div key={item.id} className="bg-blue-100 p-3 mb-2 rounded-md relative group">
                      <button 
                        onClick={() => handleRemoveItem(item.id)}
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                      <div
                        className="w-full min-h-[40px]"
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) => {
                          setItems(items.map(i => i.id === item.id ? { ...i, text: e.currentTarget.textContent || '' } : i));
                        }}
                      >
                        {item.text}
                      </div>
                    </div>
                  ))}
                  
                <button 
                  className="flex items-center p-2 bg-blue-50 hover:bg-blue-100 rounded-md text-sm"
                  onClick={() => setActiveType('keyResult')}
                >
                  <Plus className="h-4 w-4 mr-1" /> Añadir Key Result
                </button>
              </div>
              
              {/* Initiatives */}
              <div>
                <h3 className="text-md font-semibold mb-2 flex items-center">
                  <Flag className="h-5 w-5 text-yellow-500 mr-2" /> Iniciativas
                </h3>
                {items
                  .filter(item => item.type === 'iniciativa')
                  .map(item => (
                    <div key={item.id} className="bg-yellow-100 p-3 mb-2 rounded-md relative group">
                      <button 
                        onClick={() => handleRemoveItem(item.id)}
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                      <div
                        className="w-full min-h-[40px]"
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) => {
                          setItems(items.map(i => i.id === item.id ? { ...i, text: e.currentTarget.textContent || '' } : i));
                        }}
                      >
                        {item.text}
                      </div>
                    </div>
                  ))}
                  
                <button 
                  className="flex items-center p-2 bg-yellow-50 hover:bg-yellow-100 rounded-md text-sm"
                  onClick={() => setActiveType('iniciativa')}
                >
                  <Plus className="h-4 w-4 mr-1" /> Añadir Iniciativa
                </button>
              </div>
            </div>
          </div>
          
          {activeType && (
            <div className="mb-4 p-3 border rounded-md bg-gray-50">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-md font-medium">
                  Añadir {activeType === 'objetivo' ? 'Objetivo' : 
                          activeType === 'keyResult' ? 'Key Result' : 'Iniciativa'}
                </h3>
                <Button variant="ghost" size="icon" onClick={() => setActiveType(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <textarea
                className="w-full border rounded-md p-2 resize-none"
                rows={3}
                placeholder="Escriba el texto aquí..."
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleAddItem()}
              />
              <div className="flex justify-end mt-2">
                <Button onClick={handleAddItem}>Añadir</Button>
              </div>
            </div>
          )}
          
          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="outline" onClick={onClose}>Cancelar</Button>
            <Button onClick={handleAddToCanvas}>Añadir al lienzo</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OkrsWidgetComponent;
