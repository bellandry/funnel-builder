import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import * as z from 'zod';

const profileSchema = z.object({
  name: z.string().min(2).max(30),
  email: z.string().email(),
});

export async function PATCH(req: Request) {
  try {
    const session = await auth();

    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const json = await req.json();
    const body = profileSchema.parse(json);

    const user = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        name: body.name,
        email: body.email,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 422 });
    }

    return new NextResponse(null, { status: 500 });
  }
}
