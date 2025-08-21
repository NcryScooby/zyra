import { z } from "zod";
import { zfd } from "zod-form-data";

export const productFormSchema = zfd.formData({
  name: zfd.text(z.string().min(1)),
  basePrice: zfd.text(z.coerce.number().positive()),
  specialPrice: zfd
    .text(z.string().optional())
    .transform((v) => (v ? Number(v) : undefined)),
  balance: zfd.numeric(z.number().int().min(0)),
  images: zfd
    .repeatableOfType(zfd.file())
    .transform((files) => files.slice(0, 8)),
});

export const createProductSchema = z.object({
  name: z.string().min(1),
  basePrice: z.number().positive(),
  specialPrice: z.number().positive().optional(),
  balance: z.number().int().min(0),
  images: z.instanceof(File).array().max(8),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
