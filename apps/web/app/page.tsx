import { prisma } from "@repo/db";
import { Card } from "@repo/ui/card";

export default async function Home() {
  const user = await prisma.user.findFirst();
  return (
    <>
      <Card title="My portfolio" href="https://www.devprashant.tech">
        My Portfolio
      </Card>
      <h1 className="text-2xl text-center">Hello, {user?.name}</h1>
    </>
  );
}
