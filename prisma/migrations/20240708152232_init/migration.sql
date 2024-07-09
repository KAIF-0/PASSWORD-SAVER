/*
  Warnings:

  - You are about to drop the `Password` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Password";

-- CreateTable
CREATE TABLE "password" (
    "id" SERIAL NOT NULL,
    "site" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "userid" TEXT NOT NULL,

    CONSTRAINT "password_pkey" PRIMARY KEY ("id")
);
