import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SettingsPanelProps {
  element: any;
  onUpdate: (content: any) => void;
}

export function SettingsPanel({ element, onUpdate }: SettingsPanelProps) {
  if (!element) {
    return (
      <div className="text-center text-muted-foreground p-4">
        Select an element to edit its settings
      </div>
    );
  }

  const updateContent = (key: string, value: any) => {
    onUpdate({
      ...element.content,
      [key]: value,
    });
  };

  const renderSettings = () => {
    switch (element.type) {
      case "header":
        return (
          <>
            <div className="space-y-2">
              <Label>Heading Text</Label>
              <Input
                value={element.content.text || ""}
                onChange={(e) => updateContent("text", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Heading Level</Label>
              <Select
                value={element.content.level || "h1"}
                onValueChange={(value) => updateContent("level", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="h1">H1</SelectItem>
                  <SelectItem value="h2">H2</SelectItem>
                  <SelectItem value="h3">H3</SelectItem>
                  <SelectItem value="h4">H4</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        );

      case "text":
        return (
          <div className="space-y-2">
            <Label>Text Content</Label>
            <Textarea
              value={element.content.text || ""}
              onChange={(e) => updateContent("text", e.target.value)}
            />
          </div>
        );

      case "image":
        return (
          <>
            <div className="space-y-2">
              <Label>Image URL</Label>
              <Input
                value={element.content.src || ""}
                onChange={(e) => updateContent("src", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Alt Text</Label>
              <Input
                value={element.content.alt || ""}
                onChange={(e) => updateContent("alt", e.target.value)}
              />
            </div>
          </>
        );

      case "button":
        return (
          <>
            <div className="space-y-2">
              <Label>Button Text</Label>
              <Input
                value={element.content.text || ""}
                onChange={(e) => updateContent("text", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Link URL</Label>
              <Input
                value={element.content.url || ""}
                onChange={(e) => updateContent("url", e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={element.content.openInNewTab || false}
                onCheckedChange={(checked: boolean) => updateContent("openInNewTab", checked)}
              />
              <Label>Open in New Tab</Label>
            </div>
          </>
        );

      case "form":
        return (
          <>
            <div className="space-y-2">
              <Label>Form Title</Label>
              <Input
                value={element.content.title || ""}
                onChange={(e) => updateContent("title", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Submit Button Text</Label>
              <Input
                value={element.content.submitText || "Submit"}
                onChange={(e) => updateContent("submitText", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Success Message</Label>
              <Input
                value={element.content.successMessage || "Form submitted successfully!"}
                onChange={(e) => updateContent("successMessage", e.target.value)}
              />
            </div>
          </>
        );

      case "video":
        return (
          <>
            <div className="space-y-2">
              <Label>Video URL</Label>
              <Input
                value={element.content.url || ""}
                onChange={(e) => updateContent("url", e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={element.content.autoplay || false}
                onCheckedChange={(checked: boolean) => updateContent("autoplay", checked)}
              />
              <Label>Autoplay</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={element.content.controls || true}
                onCheckedChange={(checked: boolean) => updateContent("controls", checked)}
              />
              <Label>Show Controls</Label>
            </div>
          </>
        );

      case "countdown":
        return (
          <>
            <div className="space-y-2">
              <Label>End Date</Label>
              <Input
                type="datetime-local"
                value={element.content.endDate || ""}
                onChange={(e) => updateContent("endDate", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Expiry Text</Label>
              <Input
                value={element.content.expiryText || "Offer has ended!"}
                onChange={(e) => updateContent("expiryText", e.target.value)}
              />
            </div>
          </>
        );

      case "pricing":
        return (
          <>
            <div className="space-y-2">
              <Label>Price</Label>
              <Input
                type="number"
                value={element.content.price || ""}
                onChange={(e) => updateContent("price", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Currency</Label>
              <Input
                value={element.content.currency || "USD"}
                onChange={(e) => updateContent("currency", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Period</Label>
              <Select
                value={element.content.period || "month"}
                onValueChange={(value) => updateContent("period", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month">Monthly</SelectItem>
                  <SelectItem value="year">Yearly</SelectItem>
                  <SelectItem value="one-time">One-time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        );

      default:
        return (
          <div className="text-center text-muted-foreground">
            No settings available for this element type
          </div>
        );
    }
  };

  return <div className="space-y-4">{renderSettings()}</div>;
}
