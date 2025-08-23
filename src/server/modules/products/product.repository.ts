import type { Prisma, ProductImage, PrismaClient } from '@/generated/prisma';
import prisma from '@/lib/prisma';

export class ProductRepository {
  constructor(private readonly prismaService: PrismaClient) {}

  findMany<T extends Prisma.ProductFindManyArgs>(
    argsFindMany: Prisma.SelectSubset<T, Prisma.ProductFindManyArgs>
  ): Promise<Prisma.ProductGetPayload<T>[]> {
    return this.prismaService.product.findMany(argsFindMany);
  }

  findUnique<T extends Prisma.ProductFindUniqueArgs>(
    argsFindUnique: Prisma.SelectSubset<T, Prisma.ProductFindUniqueArgs>
  ): Promise<Prisma.ProductGetPayload<T> | null> {
    return this.prismaService.product.findUnique(argsFindUnique);
  }

  create<T extends Prisma.ProductCreateArgs>(
    argsCreate: Prisma.SelectSubset<T, Prisma.ProductCreateArgs>
  ): Promise<Prisma.ProductGetPayload<T>> {
    return this.prismaService.product.create(argsCreate);
  }

  update<T extends Prisma.ProductUpdateArgs>(
    argsUpdate: Prisma.SelectSubset<T, Prisma.ProductUpdateArgs>
  ): Promise<Prisma.ProductGetPayload<T>> {
    return this.prismaService.product.update(argsUpdate);
  }

  delete<T extends Prisma.ProductDeleteArgs>(
    argsDelete: Prisma.SelectSubset<T, Prisma.ProductDeleteArgs>
  ): Promise<Prisma.ProductGetPayload<T>> {
    return this.prismaService.product.delete(argsDelete);
  }

  createImage(argsCreate: Prisma.ProductImageCreateArgs): Promise<ProductImage> {
    return this.prismaService.productImage.create(argsCreate);
  }
}

export const productRepository = new ProductRepository(prisma);
