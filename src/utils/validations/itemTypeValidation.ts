import { z } from 'zod';

export const itemTypeSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Name is required')
      .max(50, 'Exceed max allowed character')
      .transform((val) => val.trim())
      .transform((val) => val.replace(/[<>]/g, '')),
  })
  .strict();
