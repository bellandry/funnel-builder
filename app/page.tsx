import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { auth } from '@/auth';
import Link from 'next/link';
import { FeatureCard } from '@/components/marketing/feature-card';
import { TestimonialCard } from '@/components/marketing/testimonial-card';
import { PricingCard } from '@/components/marketing/pricing-card';
import { ArrowRight, BarChart3, Blocks, Globe2, Layers, Lightbulb, Rocket, Users2 } from 'lucide-react';
import { features, plans, testimonials } from '@/constants';

export const metadata: Metadata = {
  title: 'Funnel Builder - Create High-Converting Marketing Funnels',
  description: 'Professional funnel builder for creating high-converting marketing and sales funnels.',
};

export default async function Home() {
  const session = await auth();

  return (
    <div className="flex min-h-screen flex-col container mx-auto">
      <header className="sticky px-2 top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <Rocket className="h-6 w-6" />
              <span className="font-bold">FunnelBuilder</span>
            </Link>
          </div>
          <div className="flex flex-1 items-center space-x-2 justify-end">
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
        <section className="space-y-6 my-32 md:my-0 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32 w-full">
          <div className="container mx-auto px-2 flex max-w-[64rem] flex-col items-center gap-4 text-center">
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

        <section id="features" className="container space-y-6 py-8 md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
              Features
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Everything you need to create successful marketing funnels
            </p>
          </div>
          <div className="mx-auto px-2 grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
            {features.map((feature) => (
              <FeatureCard
                key={feature.title}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
              />
            ))}
          </div>
        </section>

        <section className="container space-y-6 bg-slate-50 py-8 dark:bg-slate-900 md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
              Trusted by Marketers
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Here's what our customers have to say
            </p>
          </div>
          <div className="mx-auto px-2 md:px-0 grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                quote={testimonial.quote}
                author={testimonial.author}
              />
            ))}
          </div>
        </section>

        <section id="pricing" className="container space-y-6 py-8 md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
              Simple, Transparent Pricing
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Choose the perfect plan for your business
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
            {plans.map((plan, index) => (
              <PricingCard
                key={index}
                plan={plan}
                popular={index === 1}
              />
            ))}
          </div>
        </section>

        <section className="container space-y-6 py-8 md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center gap-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
              Ready to Get Started?
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Join thousands of marketers already growing their business with FunnelBuilder
            </p>
            <Button size="lg" className="mt-4" asChild>
              <Link href="/login">
                Start Building Now <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t py-6 px-2 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              Built with ❤️ by{' '}
              <a
                href="https://laclass.dev"
                target="_blank"
                rel="noreferrer"
                className="font-medium underline underline-offset-4"
              >
                Laclass Dev
              </a>
              . The source code is available on{' '}
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="font-medium underline underline-offset-4"
              >
                GitHub
              </a>
              .
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}