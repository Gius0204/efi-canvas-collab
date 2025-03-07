
import React, { useState } from 'react';
import { X, BarChart2, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type StatisticCategory = "fortalezas" | "oportunidades" | "debilidades" | "amenazas" | "all";

export interface StatisticItem {
  id: string;
  content: string;
  percentage: number;
  category: StatisticCategory;
  color: string;
}

interface StatisticsPanelProps {
  title: string;
  items: StatisticItem[];
  onClose: () => void;
}

const StatisticsPanel: React.FC<StatisticsPanelProps> = ({ title, items, onClose }) => {
  const [activeCategory, setActiveCategory] = useState<StatisticCategory>("all");
  
  const categories = [
    { id: "all", name: "Todos" },
    { id: "fortalezas", name: "Fortalezas" },
    { id: "oportunidades", name: "Oportunidades" },
    { id: "debilidades", name: "Debilidades" },
    { id: "amenazas", name: "Amenazas" }
  ];
  
  const filteredItems = activeCategory === "all" 
    ? items 
    : items.filter(item => item.category === activeCategory);
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-medium text-gray-900">Estadísticas: {title}</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-4">
              {categories.map(category => (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id}
                  onClick={() => setActiveCategory(category.id as StatisticCategory)}
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
            
            <TabsContent value={activeCategory} className="mt-0">
              <div className="space-y-3">
                {filteredItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="w-full max-w-lg">
                      <div className="flex justify-between mb-1 text-sm">
                        <span>{item.content}</span>
                        <span className="font-medium">{item.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className={`h-2.5 rounded-full ${item.color}`} 
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                    <div className="text-xs px-2 py-1 rounded uppercase font-medium bg-gray-100 text-gray-700 whitespace-nowrap">
                      {item.category}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPanel;
