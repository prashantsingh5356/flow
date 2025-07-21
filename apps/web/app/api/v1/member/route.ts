import { NextResponse } from "next/server";
import { prisma } from "@repo/db";

import { MemberSchema } from "@repo/validation";
import bcrypt from "bcrypt";

// Get Members in a workspace
async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const workspaceId = searchParams.get("workspace");

    if (!workspaceId) throw new Error("Something went wrong");

    const response = await prisma.members.findMany({
      where: {
        workspaceId: workspaceId,
      },
      include: {
        user: true,
      },
    });

    if (!response) throw new Error("Something went wrong");

    let workspaceMembers = response.map((members) => members.user);

    return NextResponse.json(
      {
        workspaceId: workspaceId,
        data: workspaceMembers,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      { status: 404 }
    );
  }
}

// Add member to workspace
async function POST(req: Request) {
  try {
    const memberData = await req.json();

    const parsedData = MemberSchema.safeParse(memberData);

    if (!parsedData.success) throw new Error("Invalid Member details");

    // encrypt member pasword
    parsedData.data.password = await bcrypt.hash(parsedData.data.password, 10);
    const workspaceId = parsedData.data.workspaceId;

    // TODO : IF MEMBER EXISTS, THEN JUST ADD ACCESS TO WORKSPACE
    const response = await prisma.user.create({
      data: {
        email: parsedData.data.email,
        password: parsedData.data.password,
        name: parsedData.data.name,
        role: {
          create: {
            role: parsedData.data.role,
          },
        },
      },
      include: {
        role: true,
      },
    });

    if (!response) throw new Error("Something went wrong while adding member");

    const memberResponse = await prisma.members.create({
      data: {
        userId: response.id,
        roleId: response?.role[0]?.id ?? " ",
        workspaceId: workspaceId,
      },
    });

    if (!memberResponse)
      throw new Error("Something went wrong while adding member");

    return NextResponse.json(
      {
        message: "Added member to workspace",
        status: "success",
        data: parsedData.data,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: error.message,
          status: "fail",
        },
        { status: 404 }
      );
    } else {
      return NextResponse.json(
        {
          message: error,
          status: "fail",
        },
        { status: 404 }
      );
    }
  }
}

export { GET, POST };
