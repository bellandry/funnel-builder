import { BarChart3, Blocks, Globe2, Layers, Lightbulb, Users2 } from "lucide-react";

export const features = [
    {
      title: 'Drag & Drop Builder',
      description: 'Create beautiful funnels with our intuitive drag & drop interface. No coding required.',
      icon: Blocks,
    },
    {
      title: 'Pre-built Templates',
      description: 'Start with professionally designed templates and customize them to match your brand.',
      icon: Layers,
    },
    {
      title: 'Advanced Analytics',
      description: 'Track your funnel performance with detailed analytics and conversion metrics.',
      icon: BarChart3,
    },
    {
      title: 'Team Collaboration',
      description: 'Work together with your team in real-time. Share, edit, and manage funnels seamlessly.',
      icon: Users2,
    },
    {
      title: 'Global CDN',
      description: 'Lightning-fast page loads with our global content delivery network.',
      icon: Globe2,
    },
    {
      title: 'Smart Optimization',
      description: 'AI-powered suggestions to improve your funnel conversion rates.',
      icon: Lightbulb,
    },
  ];
  
export  const testimonials = [
    {
      quote: "FunnelBuilder has transformed how we create marketing funnels. It's incredibly intuitive and the results speak for themselves.",
      author: {
        name: 'Sarah Johnson',
        title: 'Marketing Director',
        image: '/testimonials/sarah.jpg',
      },
    },
    {
      quote: "The analytics and optimization features are game-changing. We've seen a 40% increase in conversions since switching to FunnelBuilder.",
      author: {
        name: 'Michael Chen',
        title: 'Growth Lead',
        image: '/testimonials/michael.jpg',
      },
    },
    {
      quote: "Best funnel builder I've ever used. The templates are beautiful and the team collaboration features are perfect for our agency.",
      author: {
        name: 'Emma Davis',
        title: 'Agency Owner',
        image: '/testimonials/emma.jpg',
      },
    },
  ];
  
export  const plans = [
    {
      name: 'Starter',
      price: '$29/month',
      description: 'Perfect for solo entrepreneurs',
      features: [
        'Up to 3 funnels',
        '10,000 monthly visitors',
        'Basic analytics',
        'Pre-built templates',
        'Email support',
      ],
    },
    {
      name: 'Professional',
      price: '$79/month',
      description: 'For growing businesses',
      features: [
        'Unlimited funnels',
        '100,000 monthly visitors',
        'Advanced analytics',
        'A/B testing',
        'Team collaboration',
        'Priority support',
      ],
    },
    {
      name: 'Enterprise',
      price: '$199/month',
      description: 'For large teams and agencies',
      features: [
        'Unlimited everything',
        'Custom templates',
        'API access',
        'White labeling',
        'Dedicated success manager',
        '24/7 phone support',
      ],
    },
  ];