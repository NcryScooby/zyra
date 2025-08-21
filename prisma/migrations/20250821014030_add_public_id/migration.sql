/*
  Warnings:

  - You are about to drop the column `public_id` on the `product_images` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."product_images" DROP COLUMN "public_id",
ADD COLUMN     "publicId" TEXT;
