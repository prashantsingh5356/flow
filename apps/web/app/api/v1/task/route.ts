import { NextResponse } from "next/server";
import { prisma } from "@repo/db";

// Get user tasks in workspace
async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const workspaceId = searchParams.get("workspace") ?? "";

    // Get all tasks in workspace

    const response = await prisma.tasks.findMany({
      where: {
        workspaceId: workspaceId,
      },
      include: {
        project: {
          select: {
            id: true,
            name: true,
          },
        },
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    const result = response.map((task) => {
      return {
        id: task.id,
        name: task.name,
        description: task.description,
        status: task.status,
        createdOn: task.createdOn,
        dueDate: task.dueDate,
        assignee: task.user.name,
        completed: task.completed,
        userId: task.userId,
        workspaceId: task.workspaceId,
        projectId: task.project.id,
        projectName: task.project.name,
      };
    });

    return NextResponse.json(
      {
        message: "Success",
        data: result,
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
