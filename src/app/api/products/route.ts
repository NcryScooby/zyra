import { cloudinary } from "@/lib/cloudinary";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { zfd } from "zod-form-data";
import { generateSlug } from "@/helpers/gerenate-slug";
import { UploadApiResponse } from "cloudinary";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        images: true,
      },
    });
    return NextResponse.json({
      data: products,
    });
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

const productFormSchema = zfd.formData({
  name: zfd.text(z.string().min(1)),
  basePrice: zfd.text(z.coerce.number().positive()),
  specialPrice: zfd
    .text(z.string().optional())
    .transform((v) => (v ? Number(v) : undefined)),
  balance: zfd.numeric(z.number().int().min(0)),
  slug: zfd.text(z.string().min(1)).optional(),
  images: zfd
    .repeatableOfType(zfd.file())
    .transform((files) => files.slice(0, 8)),
});

type ProductFormData = z.infer<typeof productFormSchema>;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const data: ProductFormData = productFormSchema.parse(formData);

    const productExists = await prisma.product.findUnique({
      where: {
        slug: generateSlug(data.name),
      },
    });

    if (productExists) {
      return NextResponse.json(
        { error: "Esse produto já existe" },
        { status: 409 }
      );
    }

    const product = await prisma.product.create({
      data: {
        name: data.name,
        basePrice: data.basePrice,
        specialPrice: data.specialPrice,
        balance: data.balance,
        slug: generateSlug(data.name),
      },
    });

    for (const image of data.images) {
      const file = image as File;
      const buffer = Buffer.from(await file.arrayBuffer());

      const uploaded = await new Promise<UploadApiResponse>(
        (resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "zyra/products", resource_type: "image" },
            (err, res) =>
              err ? reject(err) : resolve(res as UploadApiResponse)
          );
          stream.end(buffer);
        }
      );

      await prisma.productImage.create({
        data: {
          productId: product.id,
          url: uploaded.secure_url,
        },
      });
    }

    return NextResponse.json(product, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Dados inválidos", issues: err.flatten() },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
