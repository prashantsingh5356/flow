import { NextResponse } from "next/server";
import { prisma } from "@repo/db";

async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const workspace_id = searchParams.get("workspace") ?? "";
    const res = await prisma.projects.findMany({
      where: {
        workspaceId: workspace_id,
      },
    });

    if (!res) throw new Error("Something went wrong");

    return NextResponse.json(
      {
        workSpaceId: workspace_id,
        data: res,
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
