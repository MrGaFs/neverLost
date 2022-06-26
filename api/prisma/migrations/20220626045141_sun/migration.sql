/*
  Warnings:

  - You are about to drop the column `memberCount` on the `Family_Admin` table. All the data in the column will be lost.
  - You are about to drop the column `Path` on the `Picture` table. All the data in the column will be lost.
  - Added the required column `path` to the `Picture` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Family_Admin" DROP COLUMN "memberCount",
ADD COLUMN     "membersCount" INTEGER NOT NULL DEFAULT 3;

-- AlterTable
ALTER TABLE "Picture" DROP COLUMN "Path",
ADD COLUMN     "path" TEXT NOT NULL;
