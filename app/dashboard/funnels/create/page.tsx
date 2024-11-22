"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { InfoIcon, Loader2, Rocket } from "lucide-react";
import { toast } from "sonner";

const templates = [
  {
    id: "blank",
    name: "Blank Funnel",
    description: "Start from scratch with a blank canvas",
    icon: "🎨"
  },
  {
    id: "sales",
    name: "Sales Funnel",
    description: "Optimized for product sales with landing page and checkout",
    icon: "💰"
  },
  {
    id: "leadgen",
    name: "Lead Generation",
    description: "Capture leads with opt-in forms and lead magnets",
    icon: "📝"
  },
  {
    id: "webinar",
    name: "Webinar Funnel",
    description: "Perfect for webinar registration and follow-up",
    icon: "🎥"
  }
];

// Helper function to generate slug from name
const generateSlug = (name: string) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 60);
};

export default function CreateFunnelPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("blank");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    slug: "",
    template: "blank"
  });

  useEffect(() => {
    if (formData.name) {
      setFormData(prev => ({
        ...prev,
        slug: generateSlug(formData.name)
      }));
    }
  }, [formData.name]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/funnels", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, template: selectedTemplate }),
      });

      if (!response.ok) {
        throw new Error("Failed to create funnel");
      }

      const data = await response.json();
      toast.success("Funnel created successfully!");
      router.push(`/dashboard/funnels/${data.id}/builder`);
    } catch (error) {
      console.error("Error creating funnel:", error);
      toast.error("Failed to create funnel. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="container max-w-4xl py-10">
      <Card className="border-2">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Rocket className="w-6 h-6 text-primary" />
            <CardTitle>Create New Funnel</CardTitle>
          </div>
          <CardDescription>
            Create a new sales funnel to start converting your visitors into customers.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-8">
            <Tabs defaultValue="template" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="template">Choose Template</TabsTrigger>
                <TabsTrigger value="details">Funnel Details</TabsTrigger>
              </TabsList>
              
              <TabsContent value="template" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {templates.map((template) => (
                    <div
                      key={template.id}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedTemplate === template.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => setSelectedTemplate(template.id)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="text-2xl">{template.icon}</div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{template.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {template.description}
                          </p>
                        </div>
                        <RadioGroup value={selectedTemplate} className="mt-1">
                          <RadioGroupItem value={template.id} id={template.id} />
                        </RadioGroup>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="details" className="mt-6 space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="name">Funnel Name</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <InfoIcon className="w-4 h-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Choose a descriptive name for your funnel</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Input
                    id="name"
                    name="name"
                    placeholder="e.g., Product Launch Funnel 2024"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="slug">Funnel URL</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <InfoIcon className="w-4 h-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>This will be the URL of your funnel</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Input
                    id="slug"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    className="w-full font-mono text-sm"
                    placeholder="your-funnel-url"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe the purpose of your funnel..."
                    value={formData.description}
                    onChange={handleChange}
                    className="min-h-[100px]"
                  />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Funnel
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}