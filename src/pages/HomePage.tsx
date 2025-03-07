
import React, { useState } from 'react';
import Header from '@/components/Header';
import FilterTabs from '@/components/FilterTabs';
import DocumentGrid from '@/components/DocumentGrid';
import NewDocumentButton from '@/components/NewDocumentButton';
import CreateCanvasModal from '@/components/CreateCanvasModal';

const HomePage = () => {
  const [activeTab, setActiveTab] = useState<"all" | "shared">("all");
  const [sort, setSort] = useState<"a-z" | "z-a" | "recent">("recent");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
  const handleNewDocument = () => {
    setIsCreateModalOpen(true);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <div className="flex justify-between items-center p-4">
        <FilterTabs 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          sort={sort}
          setSort={setSort}
        />
        
        <NewDocumentButton onClick={handleNewDocument} />
      </div>
      
      <DocumentGrid filter={activeTab} sort={sort} />
      
      <CreateCanvasModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
};

export default HomePage;
