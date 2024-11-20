import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { DashboardHeader } from '@/components/dashboard/header';
import { DashboardShell } from '@/components/dashboard/shell';
import { FunnelList } from '@/components/dashboard/funnel-list';
import { EmptyState } from '@/components/dashboard/empty-state';
import { prisma } from '@/lib/prisma';

export default async function DashboardPage() {
  const session = await auth();
  
  if (!session?.user) {
    redirect('/login');
  }

  const funnels = await prisma.funnel.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      pages: true,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Funnels"
        text="Create and manage your marketing funnels."
      />
      {funnels.length > 0 ? (
        <FunnelList funnels={funnels} />
      ) : (
        <EmptyState />
      )}
    </DashboardShell>
  );
}