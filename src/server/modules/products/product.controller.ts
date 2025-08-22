import type { NextRequest } from 'next/server';
import { withValidation } from '@/lib/validate';
import { controller } from '@/lib/controller';
import { createProductFormPipeline, productParamsSchema } from './dto/product.dto';
import { productService, type ProductService } from './product.service';
import { StatusCodes } from 'http-status-codes';

export class ProductController {
  constructor(private readonly service: ProductService) {}

  findAll = controller(() => this.service.findAll(), { successStatus: StatusCodes.OK });

  create = withValidation(createProductFormPipeline, (req: NextRequest) => req.formData())(
    controller((data) => this.service.create(data), { successStatus: StatusCodes.CREATED })
  );

  findById = withValidation(productParamsSchema, (_req: NextRequest, ctx: { params: { id: string } }) => ({
    id: ctx.params.id,
  }))(controller(({ id }) => this.service.findById(id)));
}

export const productController = new ProductController(productService);
