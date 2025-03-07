
import React from 'react';
import { 
  Pen, 
  StickyNote, 
  Circle, 
  Square, 
  Triangle, 
  ArrowRight, 
  Text, 
  Layout, 
  LayoutTemplate,
  PenTool,
  Eraser
} from 'lucide-react';

interface ToolbarProps {
  activeTool: string;
  setActiveTool: (tool: string) => void;
  showPenOptions: boolean;
  setShowPenOptions: (show: boolean) => void;
  showStickyOptions: boolean;
  setShowStickyOptions: (show: boolean) => void;
  showShapesOptions: boolean;
  setShowShapesOptions: (show: boolean) => void;
}

const CanvasToolbar: React.FC<ToolbarProps> = ({
  activeTool,
  setActiveTool,
  showPenOptions,
  setShowPenOptions,
  showStickyOptions,
  setShowStickyOptions,
  showShapesOptions,
  setShowShapesOptions
}) => {
  const handleToolClick = (tool: string) => {
    setActiveTool(tool);
    
    // Reset all option menus
    setShowPenOptions(tool === 'marker' && !showPenOptions);
    setShowStickyOptions(tool === 'sticky' && !showStickyOptions);
    setShowShapesOptions(tool === 'shapes' && !showShapesOptions);
  };

  const isPenActive = activeTool === 'marker' || activeTool === 'pen' || activeTool === 'eraser';
  const isStickyActive = activeTool === 'sticky';
  const isShapesActive = activeTool === 'circle' || activeTool === 'square' || activeTool === 'triangle' || activeTool === 'arrow';
  const isTextActive = activeTool === 'text';
  const isSectionActive = activeTool === 'section';
  const isTemplateActive = activeTool === 'template';
  const isJiraActive = activeTool === 'jira';

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-full shadow-lg z-10">
      <div className="flex items-center px-4 py-2 space-x-6">
        {/* Marker Tool */}
        <div className="relative tooltip-trigger">
          <button
            onClick={() => handleToolClick(isPenActive ? '' : 'marker')}
            className={`p-2 rounded-full ${isPenActive ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
          >
            <Pen className="h-5 w-5" />
            <span className="tooltip">Marcador</span>
          </button>
          
          {showPenOptions && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-2 bg-white rounded-lg shadow-lg animate-scale-in">
              <div className="flex space-x-2 mb-2">
                <button
                  onClick={() => setActiveTool('pen')}
                  className={`p-2 rounded-full ${activeTool === 'pen' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                >
                  <PenTool className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setActiveTool('eraser')}
                  className={`p-2 rounded-full ${activeTool === 'eraser' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                >
                  <Eraser className="h-5 w-5" />
                </button>
              </div>
              <div className="flex space-x-2">
                <button className="w-6 h-6 rounded-full bg-black" onClick={() => {}}></button>
                <button className="w-6 h-6 rounded-full bg-red-500" onClick={() => {}}></button>
                <button className="w-6 h-6 rounded-full bg-blue-500" onClick={() => {}}></button>
                <button className="w-6 h-6 rounded-full bg-green-500" onClick={() => {}}></button>
              </div>
            </div>
          )}
        </div>
        
        {/* Sticky Note Tool */}
        <div className="relative tooltip-trigger">
          <button
            onClick={() => handleToolClick(isStickyActive ? '' : 'sticky')}
            className={`p-2 rounded-full ${isStickyActive ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
          >
            <StickyNote className="h-5 w-5" />
            <span className="tooltip">Nota adhesiva</span>
          </button>
          
          {showStickyOptions && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-2 bg-white rounded-lg shadow-lg grid grid-cols-4 gap-2 animate-scale-in">
              <button className="w-6 h-6 rounded-sm bg-yellow-300 hover:ring-2 ring-gray-400"></button>
              <button className="w-6 h-6 rounded-sm bg-orange-400 hover:ring-2 ring-gray-400"></button>
              <button className="w-6 h-6 rounded-sm bg-pink-300 hover:ring-2 ring-gray-400"></button>
              <button className="w-6 h-6 rounded-sm bg-red-400 hover:ring-2 ring-gray-400"></button>
              <button className="w-6 h-6 rounded-sm bg-purple-400 hover:ring-2 ring-gray-400"></button>
              <button className="w-6 h-6 rounded-sm bg-blue-400 hover:ring-2 ring-gray-400"></button>
              <button className="w-6 h-6 rounded-sm bg-cyan-300 hover:ring-2 ring-gray-400"></button>
              <button className="w-6 h-6 rounded-sm bg-green-400 hover:ring-2 ring-gray-400"></button>
              <button className="w-6 h-6 rounded-sm bg-lime-300 hover:ring-2 ring-gray-400"></button>
              <button className="w-6 h-6 rounded-sm bg-gray-300 hover:ring-2 ring-gray-400"></button>
              <button className="w-6 h-6 rounded-sm bg-gray-100 hover:ring-2 ring-gray-400"></button>
              <button className="w-6 h-6 rounded-sm bg-white hover:ring-2 ring-gray-400 border"></button>
            </div>
          )}
        </div>
        
        {/* Shapes Tool */}
        <div className="relative tooltip-trigger">
          <button
            onClick={() => handleToolClick(isShapesActive ? '' : 'shapes')}
            className={`p-2 rounded-full ${isShapesActive ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
          >
            <div className="flex items-center">
              <Circle className="h-5 w-5" />
              <Square className="h-4 w-4 -ml-2" />
            </div>
            <span className="tooltip">Formas</span>
          </button>
          
          {showShapesOptions && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-2 bg-white rounded-lg shadow-lg animate-scale-in">
              <div className="flex space-x-3">
                <button
                  onClick={() => setActiveTool('circle')}
                  className={`p-2 rounded-lg ${activeTool === 'circle' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                >
                  <Circle className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setActiveTool('square')}
                  className={`p-2 rounded-lg ${activeTool === 'square' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                >
                  <Square className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setActiveTool('triangle')}
                  className={`p-2 rounded-lg ${activeTool === 'triangle' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                >
                  <Triangle className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setActiveTool('arrow')}
                  className={`p-2 rounded-lg ${activeTool === 'arrow' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                >
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Text Tool */}
        <div className="tooltip-trigger">
          <button
            onClick={() => handleToolClick(isTextActive ? '' : 'text')}
            className={`p-2 rounded-full ${isTextActive ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
          >
            <Text className="h-5 w-5" />
            <span className="tooltip">Texto</span>
          </button>
        </div>
        
        {/* Section Tool */}
        <div className="tooltip-trigger">
          <button
            onClick={() => handleToolClick(isSectionActive ? '' : 'section')}
            className={`p-2 rounded-full ${isSectionActive ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
          >
            <Layout className="h-5 w-5" />
            <span className="tooltip">Sección</span>
          </button>
        </div>
        
        {/* Template Tool */}
        <div className="tooltip-trigger">
          <button
            onClick={() => handleToolClick(isTemplateActive ? '' : 'template')}
            className={`p-2 rounded-full ${isTemplateActive ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
          >
            <LayoutTemplate className="h-5 w-5" />
            <span className="tooltip">Plantillas</span>
          </button>
        </div>
        
        {/* Jira Integration */}
        <div className="tooltip-trigger">
          <button
            onClick={() => handleToolClick(isJiraActive ? '' : 'jira')}
            className={`p-2 rounded-full ${isJiraActive ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.5 16.5L15.5 12.5L11.5 8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8.5 8.5L12.5 12.5L8.5 16.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="tooltip">Integración Jira</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CanvasToolbar;
