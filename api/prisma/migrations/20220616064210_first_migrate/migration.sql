-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female');

-- CreateTable
CREATE TABLE "normal_user" (
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

    CONSTRAINT "normal_user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "normal_user_username_key" ON "normal_user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "normal_user_national_id_key" ON "normal_user"("national_id");

-- CreateIndex
CREATE UNIQUE INDEX "normal_user_email_key" ON "normal_user"("email");
