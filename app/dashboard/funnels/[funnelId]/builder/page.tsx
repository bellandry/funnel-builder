"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Plus, Trash2, Settings, Eye, Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ElementsPanel } from "@/components/builder/elements-panel";
import { StylesPanel } from "@/components/builder/styles-panel";
import { SettingsPanel } from "@/components/builder/settings-panel";
import { PreviewModal } from "@/components/builder/preview-modal";
import { toast } from "sonner";

interface Element {
  id: string;
  type: string;
  content: Record<string, any>;
  styles: Record<string, any>;
}

interface Page {
  id: string;
  name: string;
  content: {
    elements: Element[];
  };
}

interface FunnelData {
  name: string;
  pages: Page[];
}

const AVAILABLE_ELEMENTS = [
  { type: "header", label: "Header" },
  { type: "text", label: "Text Block" },
  { type: "image", label: "Image" },
  { type: "button", label: "Button" },
  { type: "form", label: "Form" },
  { type: "video", label: "Video" },
  { type: "countdown", label: "Countdown Timer" },
  { type: "pricing", label: "Pricing Table" },
];

export default function FunnelBuilder() {
  const params = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [activeElement, setActiveElement] = useState<Element | null>(null);
  const [funnelData, setFunnelData] = useState<FunnelData>({
    name: "",
    pages: []
  });
  const [activePage, setActivePage] = useState<string | null>(null);

  useEffect(() => {
    loadFunnelData();
  }, []);

  const loadFunnelData = async () => {
    try {
      // Load funnel data
      const funnelResponse = await fetch(`/api/funnels/${params.funnelId}/pages`);
      if (!funnelResponse.ok) throw new Error("Failed to load funnel");
      const funnelData = await funnelResponse.json();

      // Load pages data
      const pagesResponse = await fetch(`/api/funnels/${params.funnelId}/pages`);
      if (!pagesResponse.ok) throw new Error("Failed to load pages");
      const pages = await pagesResponse.json();

      setFunnelData({
        ...funnelData,
        pages: pages,
      });

      // Set active page to first page or null if no pages
      setActivePage(pages[0]?.id || null);
    } catch (error) {
      console.error("Error loading funnel:", error);
      toast.error("Failed to load funnel data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDragEnd = async (result: any) => {
    if (!result.destination || !activePage) return;

    const { source, destination } = result;
    const currentPage = funnelData.pages.find(p => p.id === activePage);
    if (!currentPage) return;

    const newElements = Array.from(currentPage.content.elements || []);

    try {
      if (source.droppableId === "elements-panel") {
        // Adding new element from panel
        const elementType = AVAILABLE_ELEMENTS[source.index].type;
        const newElement: Element = {
          id: `element-${Date.now()}`,
          type: elementType,
          content: {},
          styles: {}
        };
        newElements.splice(destination.index, 0, newElement);
      } else {
        // Reordering existing elements
        const [removed] = newElements.splice(source.index, 1);
        newElements.splice(destination.index, 0, removed);
      }

      // Update local state
      setFunnelData(prev => ({
        ...prev,
        pages: prev.pages.map(p => 
          p.id === activePage
            ? { 
                ...p, 
                content: { 
                  ...p.content,
                  elements: newElements 
                }
              }
            : p
        )
      }));

      // Save to server
      const response = await fetch(`/api/funnels/${params.funnelId}/pages/${activePage}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: { elements: newElements }
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to save changes");
      }
    } catch (error) {
      console.error("Error saving changes:", error);
      toast.error(error instanceof Error ? error.message : "Failed to save changes");
      // Rollback changes if save failed
      loadFunnelData();
    }
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const currentPage = funnelData.pages.find(p => p.id === activePage);
      if (!currentPage) {
        throw new Error("No active page selected");
      }

      const response = await fetch(`/api/funnels/${params.funnelId}/pages/${activePage}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: currentPage.content
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to save changes");
      }
      
      toast.success("Changes saved successfully");
    } catch (error) {
      console.error("Error saving:", error);
      toast.error(error instanceof Error ? error.message : "Failed to save changes");
    } finally {
      setIsSaving(false);
    }
  };

  const addNewPage = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/funnels/${params.funnelId}/pages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `Page ${funnelData.pages.length + 1}`,
          content: { elements: [] }
        }),
      });

      if (!response.ok) throw new Error("Failed to create page");
      const newPage = await response.json();

      setFunnelData(prev => ({
        ...prev,
        pages: [...prev.pages, newPage]
      }));
      setActivePage(newPage.id);
      toast.success("New page created");
    } catch (error) {
      console.error("Error creating page:", error);
      toast.error("Failed to create page");
    } finally {
      setIsLoading(false);
    }
  };

  const deletePage = async (pageId: string) => {
    if (!confirm("Are you sure you want to delete this page?")) return;

    try {
      setIsLoading(true);
      const response = await fetch(`/api/funnels/${params.funnelId}/pages/${pageId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete page");

      setFunnelData(prev => ({
        ...prev,
        pages: prev.pages.filter(p => p.id !== pageId)
      }));

      if (activePage === pageId) {
        setActivePage(funnelData.pages[0]?.id || null);
      }

      toast.success("Page deleted successfully");
    } catch (error) {
      console.error("Error deleting page:", error);
      toast.error("Failed to delete page");
    } finally {
      setIsLoading(false);
    }
  };

  const handleElementUpdate = async (elementId: string, updates: any) => {
    if (!activePage) return;

    const currentPage = funnelData.pages.find(p => p.id === activePage);
    if (!currentPage) return;

    try {
      const updatedElements = currentPage.content.elements.map(element =>
        element.id === elementId ? { ...element, ...updates } : element
      );

      // Update local state
      setFunnelData(prev => ({
        ...prev,
        pages: prev.pages.map(p =>
          p.id === activePage
            ? {
                ...p,
                content: {
                  ...p.content,
                  elements: updatedElements
                }
              }
            : p
        )
      }));

      // Save to server
      const response = await fetch(`/api/funnels/${params.funnelId}/pages/${activePage}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: { elements: updatedElements }
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to save changes");
      }

      toast.success("Element updated successfully");
    } catch (error) {
      console.error("Error updating element:", error);
      toast.error(error instanceof Error ? error.message : "Failed to update element");
      // Rollback changes if save failed
      loadFunnelData();
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  const currentPage = funnelData.pages.find(p => p.id === activePage);

  return (
    <div className="h-screen flex flex-col">
      {/* Top Bar */}
      <div className="border-b p-4 flex items-center justify-between bg-background">
        <h1 className="text-xl font-bold">{funnelData.name}</h1>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowPreview(true)}
            disabled={!currentPage}
          >
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button
            onClick={handleSave}
            disabled={isSaving || !currentPage}
          >
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Left Sidebar - Pages */}
        <div className="w-64 border-r p-4 bg-muted">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Pages</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={addNewPage}
              disabled={isLoading}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="space-y-2">
            {funnelData.pages.map((page) => (
              <div key={page.id} className="flex items-center gap-2">
                <Button
                  variant={activePage === page.id ? "default" : "ghost"}
                  className="flex-1 justify-start"
                  onClick={() => setActivePage(page.id)}
                >
                  {page.name}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deletePage(page.id)}
                  disabled={funnelData.pages.length === 1}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        {currentPage ? (
          <div className="flex-1 flex">
            <DragDropContext onDragEnd={handleDragEnd}>
              {/* Canvas */}
              <div className="flex-1 p-8 bg-slate-50 overflow-auto">
                <Droppable droppableId="canvas">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      className="min-h-full"
                      ref={provided.innerRef}
                    >
                      {currentPage.content.elements?.map((element, index) => (
                        <Draggable
                          key={element.id}
                          draggableId={element.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              className="mb-4"
                              onClick={() => setActiveElement(element)}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <Card className="p-4">
                                {element.type}
                              </Card>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>

              {/* Right Sidebar */}
              <div className="w-80 border-l bg-muted">
                <Tabs defaultValue="elements">
                  <TabsList className="w-full">
                    <TabsTrigger value="elements">Elements</TabsTrigger>
                    <TabsTrigger value="styles">Styles</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                  </TabsList>
                  <div className="p-4">
                    <TabsContent value="elements">
                      <ElementsPanel 
                        elements={AVAILABLE_ELEMENTS} 
                        onAddElement={(type) => {
                          // Add logic to add a new element of the specified type
                          const newElement: Element = {
                            id: crypto.randomUUID(),
                            type,
                            content: {},
                            styles: {}
                          };
                          const updatedElements = [...currentPage.content.elements, newElement];
                          setFunnelData(prev => ({
                            ...prev,
                            pages: prev.pages.map(p => 
                              p.id === activePage
                                ? {
                                    ...p,
                                    content: {
                                      ...p.content,
                                      elements: updatedElements
                                    }
                                  }
                                : p
                            )
                          }));
                        }} 
                        onUpdateElement={handleElementUpdate}
                      />
                    </TabsContent>
                    <TabsContent value="styles">
                      <StylesPanel
                        element={activeElement}
                        onUpdate={(styles) => {
                          if (!activeElement) return;
                          const updatedElements = currentPage.content.elements.map(e =>
                            e.id === activeElement.id
                              ? { ...e, styles }
                              : e
                          );
                          setFunnelData(prev => ({
                            ...prev,
                            pages: prev.pages.map(p => 
                              p.id === activePage
                                ? {
                                    ...p,
                                    content: {
                                      ...p.content,
                                      elements: updatedElements
                                    }
                                  }
                                : p
                            )
                          }));
                        }}
                      />
                    </TabsContent>
                    <TabsContent value="settings">
                      <SettingsPanel
                        element={activeElement}
                        onUpdate={async (content) => {
                          if (!activeElement || !currentPage) return;
                          
                          try {
                            const updatedElements = currentPage.content.elements.map(e =>
                              e.id === activeElement.id
                                ? { ...e, content }
                                : e
                            );

                            // Update local state
                            setFunnelData(prev => ({
                              ...prev,
                              pages: prev.pages.map(p => 
                                p.id === activePage
                                  ? {
                                      ...p,
                                      content: {
                                        ...p.content,
                                        elements: updatedElements
                                      }
                                    }
                                  : p
                              )
                            }));

                            // Save to server
                            const response = await fetch(`/api/funnels/${params.funnelId}/pages/${activePage}`, {
                              method: "PATCH",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({
                                content: {
                                  elements: updatedElements
                                }
                              }),
                            });

                            if (!response.ok) {
                              const error = await response.json();
                              throw new Error(error.message || "Failed to save changes");
                            }
                          } catch (error) {
                            console.error("Error saving element settings:", error);
                            toast.error(error instanceof Error ? error.message : "Failed to save changes");
                            // Rollback changes if save failed
                            loadFunnelData();
                          }
                        }}
                      />
                    </TabsContent>
                  </div>
                </Tabs>
              </div>
            </DragDropContext>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            Create a page to start building your funnel
          </div>
        )}
      </div>

      {showPreview && currentPage && (
        <PreviewModal
          funnel={funnelData}
          page={currentPage}
          onClose={() => setShowPreview(false)}
          onElementUpdate={handleElementUpdate}
        />
      )}
    </div>
  );
}
