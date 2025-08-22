import { ProductRepository, productRepository } from './product.repository';
import { storageService } from '@/server/shared/storage/storage.service';
import { toSlug } from '@/helpers/to-slug';
import { CreateProductData } from './dto/product.dto';
import { ConflictError, NotFoundError } from '@/domain/errors';

export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async findAll() {
    const products = await this.productRepository.findMany({
      include: {
        images: {
          omit: {
            productId: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    return products;
  }

  async findById(id: string) {
    const product = await this.productRepository.findUnique({
      where: { id },
      include: {
        images: {
          omit: {
            productId: true,
          },
        },
      },
    });

    if (!product) throw new NotFoundError('Product not found');

    return product;
  }

  async create(data: CreateProductData) {
    const slug = toSlug(data.name);

    const exists = await this.productRepository.findUnique({ where: { slug } });

    if (exists) throw new ConflictError('Product already exists');

    const productData = {
      name: data.name,
      basePrice: data.basePrice,
      specialPrice: data.specialPrice,
      balance: data.balance,
      slug,
    };

    const product = await this.productRepository.create({ data: productData });

    for (const file of data.images) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const uploaded = await storageService.uploadImage(buffer, {
        folder: 'zyra/products',
        resourceType: 'image',
      });

      await this.productRepository.createImage({
        data: {
          productId: product.id,
          url: uploaded.secure_url,
        },
      });
    }

    return product;
  }
}

export const productService = new ProductService(productRepository);
