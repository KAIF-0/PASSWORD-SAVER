/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `password` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "password_id_key" ON "password"("id");
