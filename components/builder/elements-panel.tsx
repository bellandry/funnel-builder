import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  Search,
  Type,
  Image,
  PlaySquare,
  Timer,
  CreditCard,
  Mail,
  Layout,
  Star,
  Box,
  Sparkles
} from "lucide-react";

const ELEMENT_CATEGORIES = {
  basic: {
    label: "Basic",
    icon: Layout,
    elements: [
      { type: "header", label: "Header", description: "Add a heading to your page", icon: Type },
      { type: "text", label: "Text Block", description: "Add paragraphs of text", icon: Type },
      { type: "image", label: "Image", description: "Add images or graphics", icon: Image },
      { type: "button", label: "Button", description: "Add clickable buttons", icon: Box },
    ]
  },
  media: {
    label: "Media",
    icon: PlaySquare,
    elements: [
      { type: "video", label: "Video", description: "Embed videos from YouTube or Vimeo", icon: PlaySquare },
      { type: "countdown", label: "Countdown", description: "Add countdown timers", icon: Timer },
    ]
  },
  conversion: {
    label: "Conversion",
    icon: Star,
    elements: [
      { type: "form", label: "Form", description: "Add input forms for data collection", icon: Mail },
      { type: "pricing", label: "Pricing", description: "Add pricing tables", icon: CreditCard },
    ]
  }
};

interface ElementsPanelProps {
  onAddElement: (type: string) => void;
  elements: { type: string; label: string; }[];
}

export function ElementsPanel({ onAddElement, elements }: ElementsPanelProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [draggedElement, setDraggedElement] = useState<string | null>(null);

  const handleDragStart = (type: string) => {
    setDraggedElement(type);
  };

  const handleDragEnd = () => {
    setDraggedElement(null);
  };

  const filterElements = (elements: any[]) => {
    return elements.filter(element =>
      element.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      element.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search elements..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {searchQuery ? (
            <div className="space-y-4">
              {Object.values(ELEMENT_CATEGORIES).map(category => {
                const filteredElements = filterElements(category.elements);
                if (filteredElements.length === 0) return null;

                return (
                  <div key={category.label}>
                    <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                      <category.icon className="h-4 w-4" />
                      {category.label}
                    </h3>
                    <div className="grid grid-cols-1 gap-2">
                      {filteredElements.map(element => (
                        <ElementCard
                          key={element.type}
                          element={element}
                          onDragStart={() => handleDragStart(element.type)}
                          onDragEnd={handleDragEnd}
                          onClick={() => onAddElement(element.type)}
                          isDragging={draggedElement === element.type}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="w-full grid grid-cols-3">
                {Object.entries(ELEMENT_CATEGORIES).map(([key, category]) => (
                  <TabsTrigger key={key} value={key} className="flex items-center gap-2">
                    <category.icon className="h-4 w-4" />
                    {category.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {Object.entries(ELEMENT_CATEGORIES).map(([key, category]) => (
                <TabsContent key={key} value={key} className="mt-4">
                  <div className="grid grid-cols-1 gap-2">
                    {category.elements.map(element => (
                      <ElementCard
                        key={element.type}
                        element={element}
                        onDragStart={() => handleDragStart(element.type)}
                        onDragEnd={handleDragEnd}
                        onClick={() => onAddElement(element.type)}
                        isDragging={draggedElement === element.type}
                      />
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t bg-muted/50">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Sparkles className="h-4 w-4" />
          <p>Drag elements or click to add them to your page</p>
        </div>
      </div>
    </div>
  );
}

interface ElementCardProps {
  element: {
    type: string;
    label: string;
    description: string;
    icon: any;
  };
  onDragStart: () => void;
  onDragEnd: () => void;
  onClick: () => void;
  isDragging: boolean;
}

function ElementCard({ element, onDragStart, onDragEnd, onClick, isDragging }: ElementCardProps) {
  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={onClick}
      className={cn(
        "p-3 rounded-lg border-2 cursor-move transition-all hover:border-primary",
        isDragging && "border-primary bg-primary/5",
        "group"
      )}
    >
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-md bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
          <element.icon className="h-4 w-4" />
        </div>
        <div>
          <h4 className="text-sm font-medium leading-none mb-1">{element.label}</h4>
          <p className="text-xs text-muted-foreground">{element.description}</p>
        </div>
      </div>
    </div>
  );
}
