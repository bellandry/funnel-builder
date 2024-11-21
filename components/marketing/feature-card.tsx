import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
}

export function FeatureCard({ title, description, icon: Icon, className }: FeatureCardProps) {
  return (
    <div className={cn(
      'group relative overflow-hidden rounded-lg border p-6 hover:border-foreground/50 transition-colors',
      className
    )}>
      <div className="flex items-center gap-4">
        <Icon className="h-8 w-8 text-primary" />
        <h3 className="font-semibold">{title}</h3>
      </div>
      <p className="mt-2 text-muted-foreground">{description}</p>
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
    </div>
  );
}
