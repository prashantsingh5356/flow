import { z } from "zod";

export const UserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(5),
  firstName: z.string(),
  lastName: z.string(),
  image: z.string(),
});

export type User = z.infer<typeof UserSchema>;
