/*
  Warnings:

  - You are about to alter the column `phone` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(13)`.
  - Added the required column `medical_history` to the `Ultimate_user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "Gender" ADD VALUE 'other';

-- AlterTable
ALTER TABLE "Ultimate_user" ADD COLUMN     "medical_history" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "address" TEXT NOT NULL,
ALTER COLUMN "phone" SET DATA TYPE VARCHAR(13);

-- CreateTable
CREATE TABLE "Picture" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "Path" TEXT NOT NULL,

    CONSTRAINT "Picture_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Picture_user_id_key" ON "Picture"("user_id");

-- AddForeignKey
ALTER TABLE "Picture" ADD CONSTRAINT "Picture_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
