import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ColorPicker } from "@/components/ui/color-picker";

interface StylesPanelProps {
  element: any;
  onUpdate: (styles: any) => void;
}

export function StylesPanel({ element, onUpdate }: StylesPanelProps) {
  if (!element) {
    return (
      <div className="text-center text-muted-foreground p-4">
        Select an element to edit its styles
      </div>
    );
  }

  const updateStyle = (key: string, value: any) => {
    onUpdate({
      ...element.styles,
      [key]: value,
    });
  };

  return (
    <div className="space-y-4">
      {/* Typography */}
      <div className="space-y-2">
        <Label>Font Family</Label>
        <Select
          value={element.styles.fontFamily || "sans"}
          onValueChange={(value) => updateStyle("fontFamily", value)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sans">Sans-serif</SelectItem>
            <SelectItem value="serif">Serif</SelectItem>
            <SelectItem value="mono">Monospace</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Font Size (px)</Label>
        <Input
          type="number"
          value={element.styles.fontSize || "16"}
          onChange={(e) => updateStyle("fontSize", e.target.value + "px")}
        />
      </div>

      <div className="space-y-2">
        <Label>Font Weight</Label>
        <Select
          value={element.styles.fontWeight || "400"}
          onValueChange={(value) => updateStyle("fontWeight", value)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="300">Light</SelectItem>
            <SelectItem value="400">Regular</SelectItem>
            <SelectItem value="500">Medium</SelectItem>
            <SelectItem value="600">Semi Bold</SelectItem>
            <SelectItem value="700">Bold</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Colors */}
      <div className="space-y-2">
        <Label>Text Color</Label>
        <ColorPicker
          value={element.styles.color || "#000000"}
          onChange={(value) => updateStyle("color", value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Background Color</Label>
        <ColorPicker
          value={element.styles.backgroundColor || "transparent"}
          onChange={(value) => updateStyle("backgroundColor", value)}
        />
      </div>

      {/* Spacing */}
      <div className="space-y-2">
        <Label>Padding (px)</Label>
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="number"
            placeholder="Top"
            value={element.styles.paddingTop || "0"}
            onChange={(e) => updateStyle("paddingTop", e.target.value + "px")}
          />
          <Input
            type="number"
            placeholder="Right"
            value={element.styles.paddingRight || "0"}
            onChange={(e) => updateStyle("paddingRight", e.target.value + "px")}
          />
          <Input
            type="number"
            placeholder="Bottom"
            value={element.styles.paddingBottom || "0"}
            onChange={(e) => updateStyle("paddingBottom", e.target.value + "px")}
          />
          <Input
            type="number"
            placeholder="Left"
            value={element.styles.paddingLeft || "0"}
            onChange={(e) => updateStyle("paddingLeft", e.target.value + "px")}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Margin (px)</Label>
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="number"
            placeholder="Top"
            value={element.styles.marginTop || "0"}
            onChange={(e) => updateStyle("marginTop", e.target.value + "px")}
          />
          <Input
            type="number"
            placeholder="Right"
            value={element.styles.marginRight || "0"}
            onChange={(e) => updateStyle("marginRight", e.target.value + "px")}
          />
          <Input
            type="number"
            placeholder="Bottom"
            value={element.styles.marginBottom || "0"}
            onChange={(e) => updateStyle("marginBottom", e.target.value + "px")}
          />
          <Input
            type="number"
            placeholder="Left"
            value={element.styles.marginLeft || "0"}
            onChange={(e) => updateStyle("marginLeft", e.target.value + "px")}
          />
        </div>
      </div>

      {/* Border */}
      <div className="space-y-2">
        <Label>Border Width (px)</Label>
        <Input
          type="number"
          value={element.styles.borderWidth || "0"}
          onChange={(e) => updateStyle("borderWidth", e.target.value + "px")}
        />
      </div>

      <div className="space-y-2">
        <Label>Border Color</Label>
        <ColorPicker
          value={element.styles.borderColor || "#000000"}
          onChange={(value) => updateStyle("borderColor", value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Border Radius (px)</Label>
        <Input
          type="number"
          value={element.styles.borderRadius || "0"}
          onChange={(e) => updateStyle("borderRadius", e.target.value + "px")}
        />
      </div>
    </div>
  );
}
