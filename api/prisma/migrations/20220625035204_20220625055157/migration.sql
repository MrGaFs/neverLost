/*
  Warnings:

  - Added the required column `user_type` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserTypes" AS ENUM ('normal', 'ultimate');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "user_type" "UserTypes" NOT NULL;
