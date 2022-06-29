/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `Family_member` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `Family_member` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Family_member" ADD COLUMN     "username" VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Family_member_username_key" ON "Family_member"("username");
