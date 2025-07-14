import { z } from "zod";

export const UserSchema = z.object({
  id: z.string(),
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(5).max(10),
});

export type User = z.infer<typeof UserSchema>;
