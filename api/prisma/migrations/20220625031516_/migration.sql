/*
  Warnings:

  - You are about to drop the column `user_type` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "user_type";

-- DropEnum
DROP TYPE "UserTypes";

-- CreateTable
CREATE TABLE "Report" (
    "id" SERIAL NOT NULL,
    "lost_num" INTEGER NOT NULL,
    "location" VARCHAR(255) NOT NULL,
    "gender" "Gender" NOT NULL,
    "age" INTEGER NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feed" (
    "id" SERIAL NOT NULL,
    "Description" TEXT NOT NULL,
    "pic_id" INTEGER NOT NULL,

    CONSTRAINT "Feed_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Feed_pic_id_key" ON "Feed"("pic_id");

-- AddForeignKey
ALTER TABLE "Feed" ADD CONSTRAINT "Feed_pic_id_fkey" FOREIGN KEY ("pic_id") REFERENCES "Picture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
