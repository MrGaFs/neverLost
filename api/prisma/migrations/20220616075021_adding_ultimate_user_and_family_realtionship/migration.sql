/*
  Warnings:

  - You are about to drop the `normal_user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "normal_user";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "first_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "national_id" VARCHAR(14) NOT NULL,
    "gender" "Gender" NOT NULL,
    "phone" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ultimate_user" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "family_admin_id" INTEGER NOT NULL,

    CONSTRAINT "Ultimate_user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_national_id_key" ON "User"("national_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Ultimate_user_user_id_key" ON "Ultimate_user"("user_id");

-- AddForeignKey
ALTER TABLE "Ultimate_user" ADD CONSTRAINT "Ultimate_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ultimate_user" ADD CONSTRAINT "Ultimate_user_family_admin_id_fkey" FOREIGN KEY ("family_admin_id") REFERENCES "Ultimate_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
