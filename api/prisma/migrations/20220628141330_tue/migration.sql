-- CreateTable
CREATE TABLE "QrCode" (
    "id" SERIAL NOT NULL,
    "member_id" INTEGER NOT NULL,
    "path" TEXT NOT NULL,

    CONSTRAINT "QrCode_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "QrCode_member_id_key" ON "QrCode"("member_id");

-- AddForeignKey
ALTER TABLE "QrCode" ADD CONSTRAINT "QrCode_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "Family_member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
