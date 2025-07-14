import { prisma } from "@repo/db";

export default async function Home() {
  const user = await prisma.user.findFirst();
  return (
    <>
      <h1>Hello, {user?.name}</h1>
    </>
  );
}
