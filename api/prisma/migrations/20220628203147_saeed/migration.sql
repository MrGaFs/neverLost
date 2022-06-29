-- CreateEnum
CREATE TYPE "UserTypes" AS ENUM ('normal', 'family_admin', 'family_member');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female', 'other');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('active', 'done');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "first_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "national_id" VARCHAR(14) NOT NULL,
    "gender" "Gender" NOT NULL,
    "user_type" "UserTypes" NOT NULL,
    "phone" VARCHAR(13) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "address" TEXT NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Family_Admin" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "membersCount" INTEGER NOT NULL DEFAULT 3,
    "picture_id" INTEGER NOT NULL,

    CONSTRAINT "Family_Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Family_member" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "family_admin_id" INTEGER NOT NULL,
    "medical_record" TEXT NOT NULL,
    "phone" VARCHAR(13) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "picture_id" INTEGER NOT NULL,

    CONSTRAINT "Family_member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Picture" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "path" TEXT NOT NULL,

    CONSTRAINT "Picture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "iData" (
    "id" SERIAL NOT NULL,
    "lost_num" INTEGER NOT NULL,
    "location" VARCHAR(255) NOT NULL,
    "gender" "Gender" NOT NULL,
    "age" INTEGER NOT NULL,

    CONSTRAINT "iData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feed" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "picture_id" INTEGER NOT NULL,

    CONSTRAINT "Feed_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Report" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "targeted_user_id" INTEGER NOT NULL,
    "member_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "Latitude" TEXT NOT NULL,
    "Longitude" TEXT NOT NULL,
    "status" "Status" NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QrCode" (
    "id" SERIAL NOT NULL,
    "member_id" INTEGER NOT NULL,
    "path" TEXT NOT NULL,

    CONSTRAINT "QrCode_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_national_id_key" ON "User"("national_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Family_Admin_user_id_key" ON "Family_Admin"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Family_Admin_picture_id_key" ON "Family_Admin"("picture_id");

-- CreateIndex
CREATE UNIQUE INDEX "Family_member_email_key" ON "Family_member"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Family_member_picture_id_key" ON "Family_member"("picture_id");

-- CreateIndex
CREATE UNIQUE INDEX "Feed_picture_id_key" ON "Feed"("picture_id");

-- CreateIndex
CREATE UNIQUE INDEX "QrCode_member_id_key" ON "QrCode"("member_id");

-- AddForeignKey
ALTER TABLE "Family_Admin" ADD CONSTRAINT "Family_Admin_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Family_Admin" ADD CONSTRAINT "Family_Admin_picture_id_fkey" FOREIGN KEY ("picture_id") REFERENCES "Picture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Family_member" ADD CONSTRAINT "Family_member_family_admin_id_fkey" FOREIGN KEY ("family_admin_id") REFERENCES "Family_Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Family_member" ADD CONSTRAINT "Family_member_picture_id_fkey" FOREIGN KEY ("picture_id") REFERENCES "Picture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Picture" ADD CONSTRAINT "Picture_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feed" ADD CONSTRAINT "Feed_picture_id_fkey" FOREIGN KEY ("picture_id") REFERENCES "Picture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_targeted_user_id_fkey" FOREIGN KEY ("targeted_user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "Family_member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QrCode" ADD CONSTRAINT "QrCode_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "Family_member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
