import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const updatePageSchema = z.object({
  name: z.string().min(1).optional(),
  content: z.object({
    elements: z.array(z.object({
      id: z.string(),
      type: z.string(),
      content: z.record(z.any()),
      styles: z.record(z.any()),
    })),
  }).optional(),
  order: z.number().optional(),
});

export async function PATCH(
  req: Request,
  { params }: { params: { funnelId: string; pageId: string } }
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
        pages: true,
      },
    });

    if (!funnel) {
      return new NextResponse("Funnel not found", { status: 404 });
    }

    const page = funnel.pages.find((p) => p.id === params.pageId);
    if (!page) {
      return new NextResponse("Page not found", { status: 404 });
    }

    const json = await req.json();
    const body = updatePageSchema.parse(json);

    let slug = page.slug;
    if (body.name) {
      slug = body.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
    }

    const updatedPage = await prisma.page.update({
      where: {
        id: params.pageId,
      },
      data: {
        name: body.name,
        slug,
        content: body.content,
        order: body.order,
      },
    });

    return NextResponse.json(updatedPage);
  } catch (error) {
    console.error("[PAGE_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { funnelId: string; pageId: string } }
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

    await prisma.page.delete({
      where: {
        id: params.pageId,
        funnelId: params.funnelId,
      },
    });

    // Reorder remaining pages
    const remainingPages = await prisma.page.findMany({
      where: {
        funnelId: params.funnelId,
      },
      orderBy: {
        order: "asc",
      },
    });

    // Update order for remaining pages
    await Promise.all(
      remainingPages.map((page, index) =>
        prisma.page.update({
          where: { id: page.id },
          data: { order: index },
        })
      )
    );

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[PAGE_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
