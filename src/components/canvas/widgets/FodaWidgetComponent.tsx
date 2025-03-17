
import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FodaItem {
  id: string;
  text: string;
  type: 'fortaleza' | 'oportunidad' | 'debilidad' | 'amenaza';
  perspective: string;
}

interface FodaWidgetComponentProps {
  onClose: () => void;
  onAddToCanvas: (widget: any) => void;
}

const FodaWidgetComponent: React.FC<FodaWidgetComponentProps> = ({ onClose, onAddToCanvas }) => {
  const [perspectives, setPerspectives] = useState(['Financiero', 'Clientes']);
  const [items, setItems] = useState<FodaItem[]>([
    { id: '1', text: 'Alta rentabilidad en los últimos 5 años.', type: 'fortaleza', perspective: 'Financiero' },
    { id: '2', text: 'Expansión a nuevos mercados internacionales.', type: 'oportunidad', perspective: 'Financiero' },
    { id: '3', text: 'Alta dependencia de un cliente o segmento específico.', type: 'debilidad', perspective: 'Financiero' },
    { id: '4', text: 'Competencia con precios más bajos.', type: 'amenaza', perspective: 'Financiero' },
    { id: '5', text: 'Aumento de la demanda en el sector objetivo.', type: 'oportunidad', perspective: 'Financiero' },
    { id: '6', text: 'Alta dependencia de un cliente o segmento específico.', type: 'debilidad', perspective: 'Clientes' }
  ]);
  
  const [newItem, setNewItem] = useState('');
  const [newPerspective, setNewPerspective] = useState('');
  const [activeType, setActiveType] = useState<'fortaleza' | 'oportunidad' | 'debilidad' | 'amenaza' | null>(null);
  const [activePerspective, setActivePerspective] = useState<string>('Financiero');
  
  const handleAddItem = () => {
    if (newItem && activeType) {
      setItems([
        ...items,
        {
          id: (items.length + 1).toString(),
          text: newItem,
          type: activeType,
          perspective: activePerspective
        }
      ]);
      setNewItem('');
      setActiveType(null);
    }
  };
  
  const handleRemoveItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };
  
  const handleAddPerspective = () => {
    if (newPerspective && !perspectives.includes(newPerspective)) {
      setPerspectives([...perspectives, newPerspective]);
      setNewPerspective('');
      setActivePerspective(newPerspective);
    }
  };

  const handleRemovePerspective = (perspective: string) => {
    if (perspectives.length > 1) {
      setPerspectives(perspectives.filter(p => p !== perspective));
      setItems(items.filter(item => item.perspective !== perspective));
      setActivePerspective(perspectives.filter(p => p !== perspective)[0]);
    }
  };

  const handleAddToCanvas = () => {
    onAddToCanvas({
      type: 'foda-widget',
      perspectives,
      items
    });
    onClose();
  };
  
  const handleTypeClick = (type: 'fortaleza' | 'oportunidad' | 'debilidad' | 'amenaza') => {
    setActiveType(type);
  };

  const typeLabels = {
    fortaleza: 'Fortaleza',
    oportunidad: 'Oportunidad',
    debilidad: 'Debilidad',
    amenaza: 'Amenaza'
  };

  const typeColors = {
    fortaleza: {
      bg: 'bg-green-500',
      bgLight: 'bg-green-100',
      hoverBg: 'hover:bg-green-200',
      textPlaceholder: '+ Añadir Fortaleza',
      icon: '👍'
    },
    oportunidad: {
      bg: 'bg-blue-500',
      bgLight: 'bg-blue-100',
      hoverBg: 'hover:bg-blue-200',
      textPlaceholder: '+ Añadir Oportunidad',
      icon: '🌍'
    },
    debilidad: {
      bg: 'bg-yellow-500',
      bgLight: 'bg-yellow-100',
      hoverBg: 'hover:bg-yellow-200',
      textPlaceholder: '+ Añadir Debilidad',
      icon: '⚠️'
    },
    amenaza: {
      bg: 'bg-red-500',
      bgLight: 'bg-red-100',
      hoverBg: 'hover:bg-red-200',
      textPlaceholder: '+ Añadir Amenaza',
      icon: '❗'
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-5xl max-h-[90vh] overflow-auto">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">FODA Widget</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="mb-4">
            <div className="mb-4 flex items-center">
              <h3 className="text-md font-semibold mr-4">Perspectivas:</h3>
              <div className="flex flex-wrap gap-2">
                {perspectives.map(p => (
                  <div 
                    key={p} 
                    className={`flex items-center px-3 py-1 rounded-md ${activePerspective === p ? 'bg-gray-200' : 'bg-gray-100'}`}
                  >
                    <span 
                      className="text-sm cursor-pointer"
                      onClick={() => setActivePerspective(p)}
                    >
                      {p}
                    </span>
                    <button 
                      onClick={() => handleRemovePerspective(p)}
                      className="ml-2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                
                <div className="flex items-center">
                  <input
                    type="text"
                    placeholder="Nueva perspectiva..."
                    className="border p-1 text-sm rounded-l-md w-40"
                    value={newPerspective}
                    onChange={(e) => setNewPerspective(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddPerspective()}
                  />
                  <button 
                    onClick={handleAddPerspective}
                    className="bg-primary text-white p-1 rounded-r-md"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-3">
              {(Object.keys(typeLabels) as Array<keyof typeof typeLabels>).map((type) => (
                <div key={type}>
                  <div className={`${typeColors[type].bg} text-white p-2 font-bold text-center rounded-t-md`}>
                    {typeLabels[type]}
                  </div>
                  {items
                    .filter(item => item.type === type && item.perspective === activePerspective)
                    .map(item => (
                      <div key={item.id} className={`${typeColors[type].bgLight} p-2 mb-2 rounded-md relative group`}>
                        <button 
                          onClick={() => handleRemoveItem(item.id)}
                          className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600"
                        >
                          <X className="h-3 w-3" />
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
                    
                  <div className="mt-2">
                    <button 
                      className={`flex items-center justify-center w-full p-2 ${typeColors[type].bgLight} ${typeColors[type].hoverBg} rounded-md text-sm`}
                      onClick={() => handleTypeClick(type)}
                    >
                      <span className="mr-1">{typeColors[type].icon}</span> {typeColors[type].textPlaceholder}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {activeType && (
            <div className="mb-4 p-3 border rounded-md bg-gray-50">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-md font-medium">
                  Añadir {typeLabels[activeType]} en {activePerspective}
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

export default FodaWidgetComponent;
