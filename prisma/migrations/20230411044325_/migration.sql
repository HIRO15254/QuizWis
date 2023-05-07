/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `ScoreBoardRoom` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ScoreBoardRoom_name_key" ON "ScoreBoardRoom"("name");
