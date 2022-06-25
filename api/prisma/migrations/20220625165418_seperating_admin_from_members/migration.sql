/*
  Warnings:

  - You are about to drop the `Ultimate_user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Ultimate_user" DROP CONSTRAINT "Ultimate_user_family_admin_id_fkey";

-- DropForeignKey
ALTER TABLE "Ultimate_user" DROP CONSTRAINT "Ultimate_user_user_id_fkey";

-- DropTable
DROP TABLE "Ultimate_user";

-- CreateTable
CREATE TABLE "Family_Admin" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "family_members_count" INTEGER NOT NULL DEFAULT 3,

    CONSTRAINT "Family_Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Family_member" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "family_admin_id" INTEGER NOT NULL,

    CONSTRAINT "Family_member_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Family_Admin_user_id_key" ON "Family_Admin"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Family_member_user_id_key" ON "Family_member"("user_id");

-- AddForeignKey
ALTER TABLE "Family_Admin" ADD CONSTRAINT "Family_Admin_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Family_member" ADD CONSTRAINT "Family_member_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Family_member" ADD CONSTRAINT "Family_member_family_admin_id_fkey" FOREIGN KEY ("family_admin_id") REFERENCES "Family_Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
