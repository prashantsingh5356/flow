import { NextResponse } from "next/server";
import { prisma } from "@repo/db";

// Get user workspaces
async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userEmail = searchParams.get("user") ?? "";
    const user = await prisma.user.findFirst({
      where: {
        email: userEmail,
      },
    });

    let userId = user?.id;
    const res = await prisma.members.findMany({
      where: {
        userId: userId,
      },
      include: {
        workspace: true,
      },
    });

    if (!res) throw new Error("Something went wrong");

    const userworkspaces = res.map((member) => member.workspace);

    return NextResponse.json(
      {
        id: userId,
        data: userworkspaces,
      },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json(
      {
        message: e,
      },
      { status: 401 }
    );
  }
}

export { GET };
