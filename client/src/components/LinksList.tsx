import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { useLinks } from '@/context/LinkContext';
import LinkCard from '@/components/LinkCard';
import { Link as LinkType } from '@/context/LinkContext';
import { reorderLinks as reorderLinksApi } from '@/lib/apis';
import { toast } from 'sonner';

interface LinksListProps {
  pageId: string;
  links: LinkType[];
}

const LinksList: React.FC<LinksListProps> = ({ pageId, links }) => {
  const { reorderLinks } = useLinks();
  const [isReordering, setIsReordering] = useState(false);
  
  const handleDragEnd = async (result: DropResult) => {
    // Dropped outside the list
    if (!result.destination) {
      return;
    }
    
    // If position didn't change
    if (result.destination.index === result.source.index) {
      return;
    }
    
    try {
      setIsReordering(true);
      
      // First update local state for immediate feedback
      reorderLinks(pageId, result.source.index, result.destination.index);
      
      // Then update backend
      // We need to get the updated order of link IDs after reordering
      const reorderedLinks = [...links];
      const [removed] = reorderedLinks.splice(result.source.index, 1);
      reorderedLinks.splice(result.destination.index, 0, removed);
      
      const itemIds = reorderedLinks.map(link => link.id);
      
      const response = await reorderLinksApi(pageId, itemIds);
      
      if (response.status !== 200) {
        throw new Error('Failed to save link order on the server');
      }
      
    } catch (error) {
      console.error('Error updating link order:', error);
      toast.error('Failed to save the new link order');
      
      // Optionally revert the local state if you want to be strict about consistency
      // This would require saving the original order before reordering
    } finally {
      setIsReordering(false);
    }
  };
  
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="links-list" isDropDisabled={isReordering}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-3"
          >
            {links.map((link, index) => (
              <Draggable 
                key={link.id} 
                draggableId={link.id} 
                index={index}
                isDragDisabled={isReordering}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`transition-all duration-200 ${
                      snapshot.isDragging ? 'opacity-80 scale-[1.02] shadow-lg' : ''
                    }`}
                  >
                    <LinkCard link={link} pageId={pageId} isDragging={snapshot.isDragging} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default LinksList;