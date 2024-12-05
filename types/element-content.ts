export interface ElementContent {
  text?: string;
  level?: 'h1' | 'h2' | 'h3' | 'h4';
  src?: string;
  alt?: string;
  url?: string;
  openInNewTab?: boolean;
  title?: string;
  submitText?: string;
  successMessage?: string;
  autoplay?: boolean;
  controls?: boolean;
  endDate?: string;
  expiryText?: string;
  price?: number;
  currency?: string;
  period?: 'month' | 'year' | 'one-time';
}

export interface Element {
    type: string;  // assuming you have a type field
    content: ElementContent;  // add this line
    // other properties as needed
  }