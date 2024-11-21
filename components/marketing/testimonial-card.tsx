'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface TestimonialCardProps {
  quote: string;
  author: {
    name: string;
    title: string;
    image?: string;
  };
  className?: string;
}

export function TestimonialCard({ quote, author, className }: TestimonialCardProps) {
  return (
    <Card className={cn('relative overflow-hidden', className)}>
      <CardContent className="mt-6 grid gap-4">
        <div className="relative">
          <div className="absolute -left-4 -top-4 text-6xl text-primary/10">"</div>
          <p className="relative z-10 text-muted-foreground">{quote}</p>
        </div>
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={author.image} alt={author.name} />
            <AvatarFallback>
              {author.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{author.name}</p>
            <p className="text-sm text-muted-foreground">{author.title}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
