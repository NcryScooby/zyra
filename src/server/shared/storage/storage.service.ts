import { UploadApiResponse, UploadApiOptions } from 'cloudinary';
import { cloudinary } from '@/lib/cloudinary';

export type UploadImageOptions = {
  folder: string;
  resourceType: UploadApiOptions['resource_type'];
};

export class StorageService {
  async uploadImage(buffer: Buffer, options: UploadImageOptions): Promise<UploadApiResponse> {
    const folder = options.folder;
    const resourceType = options.resourceType;

    const response = await new Promise<UploadApiResponse>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream({ folder, resource_type: resourceType }, (err, res) =>
        err ? reject(err) : resolve(res as UploadApiResponse)
      );
      stream.end(buffer);
    });

    return response;
  }
}

export const storageService = new StorageService();
