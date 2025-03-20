
import React from 'react';
import DocumentCard from './DocumentCard';

// Sample document data
const documents = [
  {
    id: "1",
    title: "Pestel Eficiente",
    lastModified: "ayer 18:00",
    thumbnail: "/lovable-uploads/40097394-44a8-4e3b-a650-4dff0315f093.png"
  },
  {
    id: "2",
    title: "Foda Marketing",
    lastModified: "hace 3 días",
    thumbnail: "/lovable-uploads/4c97b60b-269d-4520-94f2-79ba47293d04.png"
  },
  {
    id: "3",
    title: "OKRs Proyecto Economico",
    lastModified: "hace 1 día",
    thumbnail: "/lovable-uploads/26b3a7d4-8e3d-4e4d-9d23-c7c6a050981d.png"
  },
  {
    id: "4",
    title: "Mapa ESC Relaciones Exteriores",
    lastModified: "hace 2 días",
    thumbnail: "/lovable-uploads/e6a590cd-abad-475c-9560-946cd7364af8.png"
  },
  {
    id: "5",
    title: "Foda Sistemas",
    lastModified: "hace 5 días",
    thumbnail: "/lovable-uploads/4c97b60b-269d-4520-94f2-79ba47293d04.png"
  },
  {
    id: "6",
    title: "Foda Planeación",
    lastModified: "hace 7 días",
    thumbnail: "/lovable-uploads/4c97b60b-269d-4520-94f2-79ba47293d04.png"
  },
  {
    id: "7",
    title: "OKRs Gestión de riesgos",
    lastModified: "hace 2 días",
    thumbnail: "/lovable-uploads/26b3a7d4-8e3d-4e4d-9d23-c7c6a050981d.png"
  },
  {
    id: "8",
    title: "Pestel MIT",
    lastModified: "ayer 19:30",
    thumbnail: "/lovable-uploads/40097394-44a8-4e3b-a650-4dff0315f093.png"
  },
  {
    id: "9",
    title: "Foda Control +",
    lastModified: "hace 3 días",
    thumbnail: "/lovable-uploads/4c97b60b-269d-4520-94f2-79ba47293d04.png"
  }
];

interface DocumentGridProps {
  filter?: "all" | "shared";
  sort?: "a-z" | "z-a" | "recent";
}

const DocumentGrid: React.FC<DocumentGridProps> = ({ 
  filter = "all",
  sort = "recent" 
}) => {
  // Filter logic
  let filteredDocs = [...documents];
  
  // Sorting logic
  switch (sort) {
    case "a-z":
      filteredDocs.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "z-a":
      filteredDocs.sort((a, b) => b.title.localeCompare(a.title));
      break;
    case "recent":
      // Already sorted by date in our mock data
      break;
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4 p-4">
      {filteredDocs.map((doc) => (
        <DocumentCard
          key={doc.id}
          id={doc.id}
          title={doc.title}
          lastModified={doc.lastModified}
          thumbnail={doc.thumbnail}
        />
      ))}
    </div>
  );
};

export default DocumentGrid;
