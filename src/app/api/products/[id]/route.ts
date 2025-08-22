import { productController } from '@/server/modules/products/product.controller';

export const GET = productController.findById;
