'use client';

import { useState, useRef, useEffect } from 'react';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ElementContent } from '@/types/element-content';
import { cn } from '@/lib/utils';

interface EditableElementProps {
  element: {
    id: string;
    type: string;
    content: ElementContent;
    styles: Record<string, any>;
  };
  onUpdate: (elementId: string, updates: any) => void;
  isSelected?: boolean;
}

export function EditableElement({ element, onUpdate, isSelected }: EditableElementProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (elementRef.current && !elementRef.current.contains(event.target as Node)) {
        setIsEditing(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleContentEdit = (key: string, value: any) => {
    onUpdate(element.id, { content: { [key]: value } });
  };

  const handleFileUpload = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      const { url } = await response.json();
      handleContentEdit('src', url);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const file = e.dataTransfer.files[0];
    if (file && (element.type === 'image' || element.type === 'video')) {
      await handleFileUpload(file);
    }
  };

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
    borderStyle: element.styles?.borderWidth ? 'solid' : 'none',
  };

  const renderElement = () => {
    switch (element.type) {
      case 'header': {
        const HeadingTag = element.content?.level || 'h1';
        return (
          <HeadingTag
            style={style}
            contentEditable={isEditing}
            suppressContentEditableWarning
            onBlur={(e: React.FocusEvent<HTMLHeadingElement>) =>
              handleContentEdit('text', e.currentTarget.textContent)
            }
            onClick={() => setIsEditing(true)}
          >
            {element.content?.text || 'Heading'}
          </HeadingTag>
        );
      }

      case 'text':
        return (
          <p
            style={style}
            contentEditable={isEditing}
            suppressContentEditableWarning
            onBlur={(e: React.FocusEvent<HTMLParagraphElement>) =>
              handleContentEdit('text', e.currentTarget.textContent)
            }
            onClick={() => setIsEditing(true)}
          >
            {element.content?.text || 'Text block'}
          </p>
        );

      case 'image':
        if (!element.content?.src) {
          return (
            <div
              ref={elementRef}
              style={style}
              className={cn(
                'flex flex-col items-center justify-center p-4 border-2 border-dashed transition-colors',
                isDragOver && 'border-primary bg-primary/5',
                isSelected && 'ring-2 ring-primary'
              )}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <Upload className="h-8 w-8 mb-2 text-muted-foreground" />
              <p className="text-muted-foreground text-sm">
                Drag and drop an image or click to upload
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileUpload(file);
                }}
              />
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => fileInputRef.current?.click()}
              >
                Choose File
              </Button>
            </div>
          );
        }
        return (
          <div
            ref={elementRef}
            className={cn(isSelected && 'ring-2 ring-primary')}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <img src={element.content.src} alt={element.content?.alt || 'Image'} style={style} />
          </div>
        );

      case 'video':
        if (!element.content?.url) {
          return (
            <div
              ref={elementRef}
              style={style}
              className={cn(
                'flex flex-col items-center justify-center p-4 border-2 border-dashed transition-colors',
                isDragOver && 'border-primary bg-primary/5',
                isSelected && 'ring-2 ring-primary'
              )}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <Upload className="h-8 w-8 mb-2 text-muted-foreground" />
              <p className="text-muted-foreground text-sm">
                Drag and drop a video or click to upload
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileUpload(file);
                }}
              />
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => fileInputRef.current?.click()}
              >
                Choose File
              </Button>
            </div>
          );
        }
        return (
          <div
            ref={elementRef}
            className={cn(isSelected && 'ring-2 ring-primary')}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <video
              src={element.content.url}
              controls={element.content?.controls}
              autoPlay={element.content?.autoplay}
              style={style}
            />
          </div>
        );

      case 'button':
        return (
          <button
            style={{
              ...style,
              cursor: 'pointer',
              border: 'none',
              padding: '8px 16px',
            }}
            contentEditable={isEditing}
            suppressContentEditableWarning
            onBlur={(e: React.FocusEvent<HTMLButtonElement>) =>
              handleContentEdit('text', e.currentTarget.textContent)
            }
            onClick={(e) => {
              e.preventDefault();
              setIsEditing(true);
            }}
          >
            {element.content?.text || 'Click me'}
          </button>
        );

      default:
        return null;
    }
  };

  return <div className="relative">{renderElement()}</div>;
}
