/*
  Warnings:

  - The primary key for the `User_ScoreBoardRoom` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[userDataId,scoreBoardRoomId]` on the table `User_ScoreBoardRoom` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `User_ScoreBoardRoom` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "User_ScoreBoardRoom" DROP CONSTRAINT "User_ScoreBoardRoom_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "User_ScoreBoardRoom_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_ScoreBoardRoom_userDataId_scoreBoardRoomId_key" ON "User_ScoreBoardRoom"("userDataId", "scoreBoardRoomId");
