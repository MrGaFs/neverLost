/*
  Warnings:

  - You are about to drop the column `username` on the `Family_member` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[fmUsername]` on the table `Family_member` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fmUsername` to the `Family_member` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Family_member_username_key";

-- AlterTable
ALTER TABLE "Family_member" DROP COLUMN "username",
ADD COLUMN     "fmUsername" VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Family_member_fmUsername_key" ON "Family_member"("fmUsername");
