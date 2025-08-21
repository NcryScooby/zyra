import { NextRequest } from 'next/server';
import { productController } from '@/server/modules/products/product.controller';

export async function GET() {
  return productController.get();
}

export async function POST(req: NextRequest) {
  return productController.post(req);
}
