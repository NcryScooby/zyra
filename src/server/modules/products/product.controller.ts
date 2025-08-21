import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { productService } from './product.service';
import { productFormSchema, createProductSchema } from './dto/create-product.dto';

export class ProductController {
  async get() {
    try {
      const products = await productService.findAll();
      return NextResponse.json({ data: products });
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
    }
  }

  async post(req: NextRequest) {
    try {
      const formData = await req.formData();
      const parsed = productFormSchema.parse(formData);

      const input = createProductSchema.parse({
        name: parsed.name,
        basePrice: parsed.basePrice,
        specialPrice: parsed.specialPrice,
        balance: parsed.balance,
        images: parsed.images as File[],
      });

      const product = await productService.create(input);
      return NextResponse.json(product, { status: 201 });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return NextResponse.json({ error: 'Dados inválidos', issues: err.flatten() }, { status: 400 });
      }
      if (err instanceof Error && err.message === 'Esse produto já existe') {
        return NextResponse.json({ error: err.message }, { status: 409 });
      }
      return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
    }
  }
}

export const productController = new ProductController();
