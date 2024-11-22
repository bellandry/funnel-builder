import { Droppable, Draggable } from "@hello-pangea/dnd";
import { Card } from "@/components/ui/card";

interface ElementsPanelProps {
  elements: Array<{
    type: string;
    label: string;
  }>;
}

export function ElementsPanel({ elements }: ElementsPanelProps) {
  return (
    <Droppable droppableId="elements-panel" isDropDisabled>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="space-y-2"
        >
          {elements.map((element, index) => (
            <Draggable
              key={element.type}
              draggableId={`panel-${element.type}`}
              index={index}
            >
              {(provided) => (
                <Card
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className="p-3 cursor-move"
                >
                  {element.label}
                </Card>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
