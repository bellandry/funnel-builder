# Funnel Builder

A modern marketing funnel builder built with Next.js, Prisma, and TypeScript. Create, manage, and optimize your marketing funnels with an intuitive drag-and-drop interface.

## Features

- 🔐 Authentication with NextAuth.js (GitHub & Google providers)
- 🎨 Modern UI with Tailwind CSS and Radix UI
- 📱 Fully responsive design
- 🔄 Real-time funnel editing
- 📊 Analytics integration
- 👥 Team collaboration
- 🌐 Multi-tenant architecture
- 🚀 High-performance database with MySQL

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: MySQL with [Prisma](https://www.prisma.io/) ORM
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) validation

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- MySQL 8+ running locally or a remote MySQL database
- GitHub OAuth application (for authentication)
- Google OAuth application (for authentication)

### Installation

1. Clone the repository:
\`\`\`bash
git clone <your-repo-url>
cd funnel-builder
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Copy the example environment file:
\`\`\`bash
cp .env.example .env
\`\`\`

4. Update the environment variables in \`.env\`:
\`\`\`plaintext
# Auth
AUTH_SECRET=<your-generated-secret>
GITHUB_ID=<your-github-client-id>
GITHUB_SECRET=<your-github-client-secret>
GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CLIENT_SECRET=<your-google-client-secret>

# Database
DATABASE_URL="mysql://root@localhost:3306/funnel-builder"
\`\`\`

5. Set up the database:
\`\`\`bash
npx prisma generate
npx prisma db push
\`\`\`

6. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

The application will be available at [http://localhost:3000](http://localhost:3000).

## Project Structure

- \`/app\` - Next.js app router pages and API routes
- \`/components\` - React components
  - \`/ui\` - Reusable UI components
  - \`/dashboard\` - Dashboard-specific components
  - \`/auth\` - Authentication components
- \`/lib\` - Utility functions and shared logic
- \`/prisma\` - Database schema and migrations
- \`/public\` - Static assets
- \`/styles\` - Global styles and Tailwind CSS configuration

## Development

### Database Management

- Generate Prisma Client: \`npx prisma generate\`
- Push Schema Changes: \`npx prisma db push\`
- Open Prisma Studio: \`npx prisma studio\`

### Code Quality

- Run ESLint: \`npm run lint\`
- Run TypeScript Check: \`npm run typecheck\`
- Format Code: \`npm run format\`

## Contributing

1. Fork the repository
2. Create a new branch: \`git checkout -b feature/your-feature\`
3. Make your changes
4. Push to the branch: \`git push origin feature/your-feature\`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please open an issue in the GitHub repository or contact the maintainers.

## Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Prisma](https://www.prisma.io/) - Next-generation ORM
- [NextAuth.js](https://next-auth.js.org/) - Authentication for Next.js
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible components
