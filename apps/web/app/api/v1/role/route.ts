import { NextResponse } from "next/server";

function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");
  const age = searchParams.get("age");
  console.log("------ Hello from server --------");
  return NextResponse.json(
    {
      message: "Got your request",
      name: name ?? "",
      age: age ?? "",
    },
    { status: 200 }
  );
}

async function POST(req: Request) {
  console.log("------ ROLE: POST data  ------");
  const data = await req.json();
  console.log(data?.data);

  return NextResponse.json({ message: "Recieved data" }, { status: 200 });
}

export { GET, POST };
