-- CreateEnum
CREATE TYPE "ProviderApplicationStatus" AS ENUM ('PENDING', 'REJECTED', 'APPROVED');

-- CreateTable
CREATE TABLE "providerApplication" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "businessName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "status" "ProviderApplicationStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "providerApplication_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "providerApplication_userId_key" ON "providerApplication"("userId");

-- AddForeignKey
ALTER TABLE "providerApplication" ADD CONSTRAINT "providerApplication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
