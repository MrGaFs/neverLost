/*
  Warnings:

  - The values [ultimate] on the enum `UserTypes` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `user_id` on the `Family_member` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[picture_id]` on the table `Family_Admin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Family_member` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[picture_id]` on the table `Family_member` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `picture_id` to the `Family_Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Family_member` table without a default value. This is not possible if the table is not empty.
  - Added the required column `medical_record` to the `Family_member` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Family_member` table without a default value. This is not possible if the table is not empty.
  - Added the required column `picture_id` to the `Family_member` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "UserTypes_new" AS ENUM ('normal', 'family_admin', 'family_member');
ALTER TABLE "User" ALTER COLUMN "user_type" TYPE "UserTypes_new" USING ("user_type"::text::"UserTypes_new");
ALTER TYPE "UserTypes" RENAME TO "UserTypes_old";
ALTER TYPE "UserTypes_new" RENAME TO "UserTypes";
DROP TYPE "UserTypes_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Family_member" DROP CONSTRAINT "Family_member_user_id_fkey";

-- DropIndex
DROP INDEX "Family_member_user_id_key";

-- AlterTable
ALTER TABLE "Family_Admin" ADD COLUMN     "picture_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Family_member" DROP COLUMN "user_id",
ADD COLUMN     "email" VARCHAR(255) NOT NULL,
ADD COLUMN     "medical_record" TEXT NOT NULL,
ADD COLUMN     "phone" VARCHAR(13) NOT NULL,
ADD COLUMN     "picture_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Family_Admin_picture_id_key" ON "Family_Admin"("picture_id");

-- CreateIndex
CREATE UNIQUE INDEX "Family_member_email_key" ON "Family_member"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Family_member_picture_id_key" ON "Family_member"("picture_id");

-- AddForeignKey
ALTER TABLE "Family_Admin" ADD CONSTRAINT "Family_Admin_picture_id_fkey" FOREIGN KEY ("picture_id") REFERENCES "Picture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Family_member" ADD CONSTRAINT "Family_member_picture_id_fkey" FOREIGN KEY ("picture_id") REFERENCES "Picture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
