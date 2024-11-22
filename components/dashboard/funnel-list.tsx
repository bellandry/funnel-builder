'use client';

import { Funnel } from '@prisma/client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit2, BarChart2, Trash2 } from 'lucide-react';
import Link from 'next/link';

interface FunnelListProps {
  funnels: (Funnel & {
    pages: any[];
  })[];
}

export function FunnelList({ funnels }: FunnelListProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {funnels.map((funnel) => (
        <Card key={funnel.id}>
          <CardHeader>
            <CardTitle>{funnel.name}</CardTitle>
            <CardDescription>
              {funnel.pages.length} pages • {funnel.published ? 'Published' : 'Draft'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between">
              <Button variant="outline" size="sm" asChild>
                <Link href={`/dashboard/funnels/${funnel.id}/builder`}>
                  <Edit2 className="mr-2 h-4 w-4" />
                  Edit
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href={`/dashboard/funnels/${funnel.id}/analytics`}>
                  <BarChart2 className="mr-2 h-4 w-4" />
                  Analytics
                </Link>
              </Button>
              <Button variant="outline" size="sm">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}