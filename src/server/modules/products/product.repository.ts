import type { Prisma, Product, ProductImage, PrismaClient } from '@/generated/prisma';
import prisma from '@/lib/prisma';

export class ProductRepository {
  constructor(private readonly prismaService: PrismaClient) {}

  findMany(argsFindMany: Prisma.ProductFindManyArgs): Promise<Product[]> {
    return this.prismaService.product.findMany(argsFindMany);
  }

  findUnique(argsFindUnique: Prisma.ProductFindUniqueArgs): Promise<Product | null> {
    return this.prismaService.product.findUnique(argsFindUnique);
  }

  create(argsCreate: Prisma.ProductCreateArgs): Promise<Product> {
    return this.prismaService.product.create(argsCreate);
  }

  createImage(argsCreate: Prisma.ProductImageCreateArgs): Promise<ProductImage> {
    return this.prismaService.productImage.create(argsCreate);
  }
}

export const productRepository = new ProductRepository(prisma);
