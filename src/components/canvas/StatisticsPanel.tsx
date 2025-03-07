
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface StatisticItem {
  id: string;
  content: string;
  percentage: number;
  category: 'fortalezas' | 'oportunidades' | 'debilidades' | 'amenazas' | 'all';
  color?: string;
}

interface StatisticsPanelProps {
  title: string;
  items: StatisticItem[];
  onClose: () => void;
}

const StatisticsPanel: React.FC<StatisticsPanelProps> = ({
  title,
  items,
  onClose
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const getColorByCategory = (category: string): string => {
    switch(category) {
      case 'fortalezas':
        return 'bg-green-500 text-white';
      case 'oportunidades':
        return 'bg-blue-500 text-white';
      case 'debilidades':
        return 'bg-orange-500 text-white';
      case 'amenazas':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-200 text-gray-700';
    }
  };
  
  const getBarColor = (category: string): string => {
    switch(category) {
      case 'fortalezas':
        return 'bg-green-500';
      case 'oportunidades':
        return 'bg-blue-500';
      case 'debilidades':
        return 'bg-orange-400';
      case 'amenazas':
        return 'bg-red-500';
      default:
        return '';
    }
  };
  
  const filteredItems = selectedCategory === 'all' 
    ? items 
    : items.filter(item => item.category === selectedCategory);
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">ESTADÍSTICAS</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="flex">
            <div className="w-48 flex flex-col space-y-2 mr-6">
              <button
                className={`p-3 rounded-md flex items-center space-x-2 ${selectedCategory === 'all' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-700'}`}
                onClick={() => setSelectedCategory('all')}
              >
                <div className="w-5 h-5 rounded-full bg-gray-400 flex items-center justify-center text-white text-xs">T</div>
                <span className="font-medium">TODAS</span>
              </button>
              
              <button
                className={`p-3 rounded-md flex items-center space-x-2 ${selectedCategory === 'fortalezas' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => setSelectedCategory('fortalezas')}
              >
                <div className="w-5 h-5 rounded-full bg-green-400 flex items-center justify-center text-white text-xs">F</div>
                <span className="font-medium">FORTALEZAS</span>
              </button>
              
              <button
                className={`p-3 rounded-md flex items-center space-x-2 ${selectedCategory === 'oportunidades' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => setSelectedCategory('oportunidades')}
              >
                <div className="w-5 h-5 rounded-full bg-blue-400 flex items-center justify-center text-white text-xs">O</div>
                <span className="font-medium">OPORTUNIDADES</span>
              </button>
              
              <button
                className={`p-3 rounded-md flex items-center space-x-2 ${selectedCategory === 'debilidades' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => setSelectedCategory('debilidades')}
              >
                <div className="w-5 h-5 rounded-full bg-orange-400 flex items-center justify-center text-white text-xs">D</div>
                <span className="font-medium">DEBILIDADES</span>
              </button>
              
              <button
                className={`p-3 rounded-md flex items-center space-x-2 ${selectedCategory === 'amenazas' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => setSelectedCategory('amenazas')}
              >
                <div className="w-5 h-5 rounded-full bg-red-400 flex items-center justify-center text-white text-xs">A</div>
                <span className="font-medium">AMENAZAS</span>
              </button>
            </div>
            
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-6">
                {selectedCategory === 'all' 
                  ? '¿Cuál es la opinión general para el FODA realizado?' 
                  : `¿Cuáles son las ${selectedCategory.toUpperCase()} para el FODA realizado?`}
              </h3>
              
              <div className="space-y-8 max-h-[400px] overflow-y-auto pr-4">
                {filteredItems.map((item, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <p>{item.content}</p>
                      <span className="font-bold">{item.percentage}%</span>
                    </div>
                    <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${item.color || getBarColor(item.category)}`} 
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPanel;
