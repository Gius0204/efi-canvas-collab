
import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface PerspectiveProps {
  name: string;
  items: string[];
  onAddItem: (item: string) => void;
}

interface FodaWidgetProps {
  title?: string;
  onClose?: () => void;
  isPreview?: boolean;
}

const FodaWidget: React.FC<FodaWidgetProps> = ({ 
  title = "New Doc Eficientis - Widget FODA",
  onClose,
  isPreview = false
}) => {
  const [perspectives, setPerspectives] = useState([
    { id: 'financiero', name: 'Financiero' }
  ]);
  
  const [items, setItems] = useState({
    fortalezas: [] as string[],
    oportunidades: [] as string[],
    debilidades: [] as string[],
    amenazas: [] as string[]
  });
  
  const handleAddItem = (category: keyof typeof items, item: string) => {
    setItems(prev => ({
      ...prev,
      [category]: [...prev[category], item]
    }));
  };
  
  const handleAddPerspective = () => {
    setPerspectives(prev => [
      ...prev,
      { id: `perspectiva-${prev.length + 1}`, name: `Perspectiva ${prev.length + 1}` }
    ]);
  };
  
  return (
    <div className={`bg-white rounded-lg ${isPreview ? '' : 'shadow-lg border'} w-full ${isPreview ? 'max-w-full' : 'max-w-5xl'}`}>
      <div className="p-3 border-b">
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-4 gap-4 mb-4">
          <div className="bg-green-500 text-white p-3 rounded text-center font-medium">
            Fortalezas
          </div>
          <div className="bg-blue-500 text-white p-3 rounded text-center font-medium">
            Oportunidades
          </div>
          <div className="bg-yellow-500 text-white p-3 rounded text-center font-medium">
            Debilidades
          </div>
          <div className="bg-red-500 text-white p-3 rounded text-center font-medium">
            Amenazas
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-4">
          {/* Fortalezas */}
          <div className="space-y-2">
            {items.fortalezas.map((item, index) => (
              <div key={`fortaleza-${index}`} className="bg-green-100 p-3 rounded text-sm">
                {item}
              </div>
            ))}
            <button
              className="w-full p-2 border border-dashed border-green-300 rounded flex items-center justify-center text-green-600 hover:bg-green-50"
              onClick={() => handleAddItem('fortalezas', `Fortaleza ${items.fortalezas.length + 1}`)}
            >
              <Plus className="h-4 w-4 mr-1" /> Añadir Fortaleza
            </button>
          </div>
          
          {/* Oportunidades */}
          <div className="space-y-2">
            {items.oportunidades.map((item, index) => (
              <div key={`oportunidad-${index}`} className="bg-blue-100 p-3 rounded text-sm">
                {item}
              </div>
            ))}
            <button
              className="w-full p-2 border border-dashed border-blue-300 rounded flex items-center justify-center text-blue-600 hover:bg-blue-50"
              onClick={() => handleAddItem('oportunidades', `Oportunidad ${items.oportunidades.length + 1}`)}
            >
              <Plus className="h-4 w-4 mr-1" /> Añadir Oportunidad
            </button>
          </div>
          
          {/* Debilidades */}
          <div className="space-y-2">
            {items.debilidades.map((item, index) => (
              <div key={`debilidad-${index}`} className="bg-yellow-100 p-3 rounded text-sm">
                {item}
              </div>
            ))}
            <button
              className="w-full p-2 border border-dashed border-yellow-300 rounded flex items-center justify-center text-yellow-600 hover:bg-yellow-50"
              onClick={() => handleAddItem('debilidades', `Debilidad ${items.debilidades.length + 1}`)}
            >
              <Plus className="h-4 w-4 mr-1" /> Añadir Debilidad
            </button>
          </div>
          
          {/* Amenazas */}
          <div className="space-y-2">
            {items.amenazas.map((item, index) => (
              <div key={`amenaza-${index}`} className="bg-red-100 p-3 rounded text-sm">
                {item}
              </div>
            ))}
            <button
              className="w-full p-2 border border-dashed border-red-300 rounded flex items-center justify-center text-red-600 hover:bg-red-50"
              onClick={() => handleAddItem('amenazas', `Amenaza ${items.amenazas.length + 1}`)}
            >
              <Plus className="h-4 w-4 mr-1" /> Añadir Amenaza
            </button>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex flex-row">
            {perspectives.map((perspective, index) => (
              <div key={perspective.id} className="flex border p-3 mr-2 text-sm font-medium items-center justify-center rotate-[270deg] origin-bottom-left">
                {perspective.name}
              </div>
            ))}
            <button
              className="flex items-center justify-center p-1 border rounded-full h-6 w-6 hover:bg-gray-50"
              onClick={handleAddPerspective}
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FodaWidget;
