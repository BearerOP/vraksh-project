import React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { useLinks } from '@/context/LinkContext';
import LinkCard from '@/components/LinkCard';
import { Link as LinkType } from '@/context/LinkContext';

interface LinksListProps {
  pageId: string;
  links: LinkType[];
}

const LinksList: React.FC<LinksListProps> = ({ pageId, links }) => {
  const { reorderLinks } = useLinks();
  
  const handleDragEnd = (result: DropResult) => {
    // Dropped outside the list
    if (!result.destination) {
      return;
    }
    
    // If position didn't change
    if (result.destination.index === result.source.index) {
      return;
    }
    
    // Call context method to update the order
    reorderLinks(pageId, result.source.index, result.destination.index);
  };
  
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="links-list">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-3"
          >
            {links.map((link, index) => (
              <Draggable key={link.id} draggableId={link.id} index={index}>
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