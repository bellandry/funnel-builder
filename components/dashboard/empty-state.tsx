'use client';

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export function EmptyState() {
  return (
    <div className="flex h-[450px] shrink-0 items-center justify-center rounded-md border border-dashed">
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
        <h3 className="mt-4 text-lg font-semibold">No funnels created</h3>
        <p className="mb-4 mt-2 text-sm text-muted-foreground">
          You haven't created any funnels yet. Start building your first funnel.
        </p>
        <Button asChild>
          <Link href="/dashboard/funnels/new">
            <Plus className="mr-2 h-4 w-4" />
            New Funnel
          </Link>
        </Button>
      </div>
    </div>
  );
}