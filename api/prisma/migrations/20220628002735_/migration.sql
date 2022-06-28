/*
  Warnings:

  - You are about to drop the column `Description` on the `Feed` table. All the data in the column will be lost.
  - You are about to drop the column `pic_id` on the `Feed` table. All the data in the column will be lost.
  - You are about to drop the column `age` on the `Report` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `Report` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Report` table. All the data in the column will be lost.
  - You are about to drop the column `lost_num` on the `Report` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[picture_id]` on the table `Feed` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `content` to the `Feed` table without a default value. This is not possible if the table is not empty.
  - Added the required column `picture_id` to the `Feed` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Latitude` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Longitude` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `targeted_user_id` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Report` table without a default value. This is not possible if the table is not empty.

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

-- AlterTable
ALTER TABLE "Report" DROP COLUMN "age",
DROP COLUMN "gender",
DROP COLUMN "location",
DROP COLUMN "lost_num",
ADD COLUMN     "Latitude" TEXT NOT NULL,
ADD COLUMN     "Longitude" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "targeted_user_id" INTEGER NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "iData" (
    "id" SERIAL NOT NULL,
    "lost_num" INTEGER NOT NULL,
    "location" VARCHAR(255) NOT NULL,
    "gender" "Gender" NOT NULL,
    "age" INTEGER NOT NULL,

    CONSTRAINT "iData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Feed_picture_id_key" ON "Feed"("picture_id");

-- AddForeignKey
ALTER TABLE "Feed" ADD CONSTRAINT "Feed_picture_id_fkey" FOREIGN KEY ("picture_id") REFERENCES "Picture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_targeted_user_id_fkey" FOREIGN KEY ("targeted_user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
