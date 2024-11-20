import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/auth';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Funnel Builder - Create High-Converting Marketing Funnels',
  description: 'Professional funnel builder for creating high-converting marketing and sales funnels.',
};

export default async function Home() {
  const session = await auth();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <span className="font-bold">FunnelBuilder</span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            {session ? (
              <Button asChild>
                <Link href="/dashboard">
                  Go to Dashboard
                </Link>
              </Button>
            ) : (
              <Button asChild>
                <Link href="/login">
                  Get Started
                </Link>
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
          <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
            <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
              Create High-Converting Marketing Funnels in Minutes
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              Powerful drag-and-drop builder, pre-built templates, and advanced analytics. 
              Everything you need to create, optimize, and scale your marketing funnels.
            </p>
            <div className="space-x-4">
              <Button size="lg" asChild>
                <Link href="/login">
                  Start Building for Free
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#features">
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}