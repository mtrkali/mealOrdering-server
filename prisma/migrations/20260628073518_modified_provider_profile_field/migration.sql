/*
  Warnings:

  - Added the required column `address` to the `ProviderProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `ProviderProfile` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ProviderProfileStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- AlterTable
ALTER TABLE "ProviderProfile" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "status" "ProviderProfileStatus" NOT NULL DEFAULT 'ACTIVE';
