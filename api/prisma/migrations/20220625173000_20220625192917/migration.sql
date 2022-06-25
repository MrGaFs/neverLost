/*
  Warnings:

  - You are about to drop the column `family_members_count` on the `Family_Admin` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Family_Admin" DROP COLUMN "family_members_count",
ADD COLUMN     "memberCount" INTEGER NOT NULL DEFAULT 3;
