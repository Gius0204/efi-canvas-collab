
import React from 'react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from 'lucide-react';

interface FilterTabsProps {
  activeTab: "all" | "shared";
  setActiveTab: (tab: "all" | "shared") => void;
  sort: "a-z" | "z-a" | "recent";
  setSort: (sort: "a-z" | "z-a" | "recent") => void;
}

const FilterTabs: React.FC<FilterTabsProps> = ({
  activeTab,
  setActiveTab,
  sort,
  setSort
}) => {
  return (
    <div className="flex justify-between items-center p-4">
      <div className="flex space-x-2">
        <Button 
          variant={activeTab === "all" ? "default" : "outline"} 
          size="sm"
          onClick={() => setActiveTab("all")}
          className="text-sm"
        >
          Todos los documentos
        </Button>
        <Button 
          variant={activeTab === "shared" ? "default" : "outline"} 
          size="sm"
          onClick={() => setActiveTab("shared")}
          className="text-sm"
        >
          Compartidos conmigo
        </Button>
      </div>
      
      <div className="flex items-center space-x-2 ml-6">
        <span className="text-sm text-gray-500">Filtrar por:</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="text-sm">
              {sort === "a-z" ? "A-Z" : sort === "z-a" ? "Z-A" : "Última modificación"}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setSort("a-z")}>
              A-Z
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSort("z-a")}>
              Z-A
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSort("recent")}>
              Última modificación
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default FilterTabs;
