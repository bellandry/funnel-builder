import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const pageSchema = z.object({
  name: z.string().min(1),
  content: z.object({
    elements: z.array(z.object({
      id: z.string(),
      type: z.string(),
      content: z.record(z.any()),
      styles: z.record(z.any()),
    })),
  }).default({ elements: [] }),
});

export async function POST(
  req: Request,
  { params }: { params: { funnelId: string } }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const funnel = await prisma.funnel.findUnique({
      where: {
        id: params.funnelId,
        userId: session.user.id,
      },
    });

    if (!funnel) {
      return new NextResponse("Funnel not found", { status: 404 });
    }

    const json = await req.json();
    const body = pageSchema.parse(json);

    // Generate a slug from the name
    const slug = body.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    // Get the highest order number
    const lastPage = await prisma.page.findFirst({
      where: { funnelId: params.funnelId },
      orderBy: { order: "desc" },
    });

    const newOrder = (lastPage?.order ?? -1) + 1;

    const page = await prisma.page.create({
      data: {
        name: body.name,
        slug,
        content: body.content,
        order: newOrder,
        funnelId: params.funnelId,
      },
    });

    return NextResponse.json(page);
  } catch (error) {
    console.error("[PAGES_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { funnelId: string } }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const funnel = await prisma.funnel.findUnique({
      where: {
        id: params.funnelId,
        userId: session.user.id,
      },
      include: {
        pages: {
          orderBy: { order: "asc" },
        },
      },
    });

    if (!funnel) {
      return new NextResponse("Funnel not found", { status: 404 });
    }

    return NextResponse.json(funnel.pages);
  } catch (error) {
    console.error("[PAGES_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
