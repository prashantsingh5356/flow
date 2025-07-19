import { NextResponse } from "next/server";

function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");
  const age = searchParams.get("age");

  return NextResponse.json(
    {
      message: "Got your request",
      name: name ?? "",
      age: age ?? "",
    },
    { status: 200 }
  );
}

export { GET };
