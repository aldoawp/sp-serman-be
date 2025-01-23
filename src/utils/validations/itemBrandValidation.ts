import { z } from 'zod';

export const itemBrandSchema = z
  .object({
    name: z
      .string()
      .nonempty('Name is required')
      .max(50, 'Exceeded max length')
      .transform((val) => val.trim())
      .transform((val) => val.replace(/[<>]/g, '')),
  })
  .strict();
