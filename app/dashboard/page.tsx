import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { DashboardHeader } from '@/components/dashboard/header';
import { DashboardShell } from '@/components/dashboard/shell';
import { FunnelList } from '@/components/dashboard/funnel-list';
import { EmptyState } from '@/components/dashboard/empty-state';
import { prisma } from '@/lib/prisma';

export default async function DashboardPage() {
  const session = await auth();
  
  if (!session?.user?.id) {
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
        text="Create and manage your sales funnels."
      />
      {funnels.length === 0 ? (
        <EmptyState />
      ) : (
        <FunnelList funnels={funnels} />
      )}
    </DashboardShell>
  );
}