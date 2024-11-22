import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface PreviewModalProps {
  funnel: any;
  page: any;
  onClose: () => void;
}

export function PreviewModal({ funnel, page, onClose }: PreviewModalProps) {
  const renderElement = (element: any) => {
    const style = {
      fontFamily: element.styles?.fontFamily,
      fontSize: element.styles?.fontSize,
      fontWeight: element.styles?.fontWeight,
      color: element.styles?.color,
      backgroundColor: element.styles?.backgroundColor,
      padding: `${element.styles?.paddingTop || 0} ${element.styles?.paddingRight || 0} ${
        element.styles?.paddingBottom || 0
      } ${element.styles?.paddingLeft || 0}`,
      margin: `${element.styles?.marginTop || 0} ${element.styles?.marginRight || 0} ${
        element.styles?.marginBottom || 0
      } ${element.styles?.marginLeft || 0}`,
      borderWidth: element.styles?.borderWidth,
      borderColor: element.styles?.borderColor,
      borderRadius: element.styles?.borderRadius,
      borderStyle: element.styles?.borderWidth ? "solid" : "none",
    };

    switch (element.type) {
      case "header":
        const HeadingTag = element.content?.level || "h1";
        return (
          <HeadingTag style={style}>
            {element.content?.text || "Heading"}
          </HeadingTag>
        );

      case "text":
        return (
          <p style={style}>
            {element.content?.text || "Text block"}
          </p>
        );

      case "image":
        return (
          <img
            src={element.content?.src}
            alt={element.content?.alt}
            style={style}
          />
        );

      case "button":
        return (
          <button
            style={{
              ...style,
              cursor: "pointer",
              border: "none",
              padding: "8px 16px",
            }}
            onClick={() => {
              if (element.content?.url) {
                window.open(
                  element.content.url,
                  element.content.openInNewTab ? "_blank" : "_self"
                );
              }
            }}
          >
            {element.content?.text || "Click me"}
          </button>
        );

      case "form":
        return (
          <form
            style={style}
            onSubmit={(e) => {
              e.preventDefault();
              alert(element.content?.successMessage || "Form submitted!");
            }}
          >
            <h3>{element.content?.title || "Contact Form"}</h3>
            <div style={{ marginBottom: "1rem" }}>
              <input
                type="text"
                placeholder="Name"
                style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
              />
              <input
                type="email"
                placeholder="Email"
                style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
              />
              <textarea
                placeholder="Message"
                style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
              />
            </div>
            <button
              type="submit"
              style={{
                backgroundColor: "#000",
                color: "#fff",
                border: "none",
                padding: "8px 16px",
                cursor: "pointer",
              }}
            >
              {element.content?.submitText || "Submit"}
            </button>
          </form>
        );

      case "video":
        return (
          <video
            src={element.content?.url}
            controls={element.content?.controls}
            autoPlay={element.content?.autoplay}
            style={style}
          />
        );

      case "countdown":
        return (
          <div style={style}>
            {new Date(element.content?.endDate).getTime() > Date.now()
              ? "Countdown Timer"
              : element.content?.expiryText || "Offer has ended!"}
          </div>
        );

      case "pricing":
        return (
          <div style={style}>
            <div style={{ fontSize: "2em", fontWeight: "bold" }}>
              {element.content?.currency || "$"}
              {element.content?.price || "0"}
            </div>
            <div>
              per {element.content?.period || "month"}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Preview: {page?.name} - {funnel.name}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 p-4">
          {page?.elements.map((element: any) => (
            <div key={element.id}>{renderElement(element)}</div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
