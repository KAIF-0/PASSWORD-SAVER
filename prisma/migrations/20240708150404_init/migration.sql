-- CreateTable
CREATE TABLE "Password" (
    "id" SERIAL NOT NULL,
    "site" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "userid" TEXT NOT NULL,

    CONSTRAINT "Password_pkey" PRIMARY KEY ("id")
);
