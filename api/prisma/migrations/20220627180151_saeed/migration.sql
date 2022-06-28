/*
  Warnings:

  - You are about to drop the column `Description` on the `Feed` table. All the data in the column will be lost.
  - You are about to drop the column `pic_id` on the `Feed` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[picture_id]` on the table `Feed` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `content` to the `Feed` table without a default value. This is not possible if the table is not empty.
  - Added the required column `picture_id` to the `Feed` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Feed" DROP CONSTRAINT "Feed_pic_id_fkey";

-- DropIndex
DROP INDEX "Feed_pic_id_key";

-- DropIndex
DROP INDEX "Picture_user_id_key";

-- AlterTable
ALTER TABLE "Feed" DROP COLUMN "Description",
DROP COLUMN "pic_id",
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "picture_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Feed_picture_id_key" ON "Feed"("picture_id");

-- AddForeignKey
ALTER TABLE "Feed" ADD CONSTRAINT "Feed_picture_id_fkey" FOREIGN KEY ("picture_id") REFERENCES "Picture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
