/*
  Warnings:

  - Added the required column `member_id` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('active', 'done');

-- AlterTable
ALTER TABLE "Report" ADD COLUMN     "member_id" INTEGER NOT NULL,
ADD COLUMN     "status" "Status" NOT NULL;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "Family_member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
