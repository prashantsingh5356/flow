import { prisma } from "@repo/db";
import { Card } from "@repo/ui/card";
import { Button } from "@/components/ui/button";

import { UserSchema, type User } from "@repo/validation";

export default async function Home() {
  const user = await prisma.user.findFirst();

  const testUser: User = {
    id: String(user?.id),
    name: user?.name ?? "",
    email: user?.email ?? "",
    password: "testing",
  };
  const result = UserSchema.safeParse(testUser);
  console.log(result);

  return (
    <>
      <Card title="My portfolio" href="https://www.devprashant.tech">
        My Portfolio
      </Card>
      <h1 className="text-2xl text-center">Hello, {user?.name}</h1>
      <Button variant="destructive">Click me</Button>
    </>
  );
}
