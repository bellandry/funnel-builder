import { auth } from '@/auth';
import { DashboardHeader } from '@/components/dashboard/header';
import { DashboardShell } from '@/components/dashboard/shell';
import { ProfileForm } from '@/components/dashboard/profile-form';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';

export default async function SettingsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!user) {
    redirect('/login');
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Settings"
        text="Manage your account settings and preferences."
      />
      <div className="grid gap-10">
        <ProfileForm user={user} />
      </div>
    </DashboardShell>
  );
}
