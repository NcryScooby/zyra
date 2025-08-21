import { productRepository } from './product.repository';
import { storageService } from '@/server/shared/storage/storage.service';
import { toSlug } from '@/helpers/to-slug';
import { CreateProductInput } from './dto/create-product.dto';

export class ProductService {
  async findAll() {
    return productRepository.findMany({ include: { images: true } });
  }

  async create(input: CreateProductInput) {
    const slug = toSlug(input.name);

    const exists = await productRepository.findUnique({ where: { slug } });

    if (exists) {
      throw new Error('Esse produto já existe');
    }

    const product = await productRepository.create({
      data: {
        name: input.name,
        basePrice: input.basePrice,
        specialPrice: input.specialPrice,
        balance: input.balance,
        slug,
      },
    });

    for (const file of input.images) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const uploaded = await storageService.uploadImage(buffer, {
        folder: 'zyra/products',
        resourceType: 'image',
      });
      await productRepository.createImage({
        data: {
          productId: product.id,
          url: uploaded.secure_url,
        },
      });
    }

    return product;
  }
}

export const productService = new ProductService();
