import { z } from 'zod';

export const authSchema = z
  .object({
    username: z
      .string()
      .nonempty('Username is required')
      .transform((val) => val.trim()),
    password: z.string().nonempty('Password is required'),
  })
  .strict();
