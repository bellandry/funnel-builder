import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { name, description, slug } = await req.json();

    if (!name || !slug) {
      return new NextResponse("Name and slug are required", { status: 400 });
    }

    // Check if slug is already taken
    const existingFunnel = await prisma.funnel.findFirst({
      where: { slug }
    });

    if (existingFunnel) {
      return new NextResponse("Slug already exists", { status: 400 });
    }

    const funnel = await prisma.funnel.create({
      data: {
        name,
        description,
        slug,
        userId: session.user.id!,
        published: false, // Required field from schema with default
      },
    });

    return NextResponse.json(funnel);
  } catch (error) {
    console.error("[FUNNEL_CREATE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}