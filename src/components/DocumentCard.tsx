
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Copy, MoreVertical, Pencil, Trash, Copy as Duplicate, Share2, FileDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

interface DocumentCardProps {
  id: string;
  title: string;
  lastModified: string;
  thumbnail: string;
  className?: string;
}

const DocumentCard: React.FC<DocumentCardProps> = ({
  id,
  title,
  lastModified,
  thumbnail,
  className,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  
  const handleCopyLink = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(`${window.location.origin}/canvas/${id}`);
    toast.success("Enlace copiado al portapapeles");
  };

  const handleRename = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Implementation for rename functionality
    toast.success("Documento renombrado");
  };

  const handleDuplicate = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Implementation for duplicate functionality
    toast.success("Documento duplicado");
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Implementation for delete functionality
    toast.success("Documento eliminado");
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Implementation for share functionality
    toast.success("Opciones de compartir abiertas");
  };

  const handleExport = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Implementation for export functionality
    toast.success("Documento exportado");
  };

  return (
    <Link 
      to={`/canvas/${id}`}
      className={cn(
        "block canvas-card bg-white border rounded-md overflow-hidden",
        className
      )}
    >
      <div className="relative h-36 bg-gray-50">
        <img 
          src={thumbnail} 
          alt={title} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-3 flex items-center justify-between">
        <div>
          <h3 className="font-medium text-sm text-left">{title}</h3>
          <p className="text-xs text-gray-500 text-left">Editado: {lastModified}</p>
        </div>
        <div className="flex items-center space-x-1">
          <button 
            onClick={handleCopyLink}
            className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
          >
            <Copy className="h-4 w-4" />
          </button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-1.5 rounded-full hover:bg-gray-100 transition-colors">
                <MoreVertical className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={handleRename}>
                <Pencil className="mr-2 h-4 w-4" />
                <span>Renombrar</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDuplicate}>
                <Duplicate className="mr-2 h-4 w-4" />
                <span>Duplicar</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDelete}>
                <Trash className="mr-2 h-4 w-4" />
                <span>Eliminar</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleShare}>
                <Share2 className="mr-2 h-4 w-4" />
                <span>Compartir</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleExport}>
                <FileDown className="mr-2 h-4 w-4" />
                <span>Exportar</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </Link>
  );
};

export default DocumentCard;
