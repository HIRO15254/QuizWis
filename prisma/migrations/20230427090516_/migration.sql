/*
  Warnings:

  - You are about to drop the column `scoreBoardRoomId` on the `Round` table. All the data in the column will be lost.
  - You are about to drop the `ScoreBoardRoom` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User_ScoreBoardRoom` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[roomId]` on the table `Round` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `roomId` to the `Round` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RoomRole" AS ENUM ('OWNER', 'MEMBER');

-- DropForeignKey
ALTER TABLE "Round" DROP CONSTRAINT "Round_scoreBoardRoomId_fkey";

-- DropForeignKey
ALTER TABLE "User_ScoreBoardRoom" DROP CONSTRAINT "User_ScoreBoardRoom_scoreBoardRoomId_fkey";

-- DropForeignKey
ALTER TABLE "User_ScoreBoardRoom" DROP CONSTRAINT "User_ScoreBoardRoom_userDataId_fkey";

-- DropIndex
DROP INDEX "Round_scoreBoardRoomId_key";

-- AlterTable
ALTER TABLE "Round" DROP COLUMN "scoreBoardRoomId",
ADD COLUMN     "name" TEXT,
ADD COLUMN     "roomId" TEXT NOT NULL;

-- DropTable
DROP TABLE "ScoreBoardRoom";

-- DropTable
DROP TABLE "User_ScoreBoardRoom";

-- DropEnum
DROP TYPE "ScoreBoardRoomRole";

-- CreateTable
CREATE TABLE "Room" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "hashedPassword" TEXT,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User_Room" (
    "id" TEXT NOT NULL,
    "userDataId" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "role" "RoomRole" NOT NULL DEFAULT 'MEMBER',

    CONSTRAINT "User_Room_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Room_userDataId_roomId_key" ON "User_Room"("userDataId", "roomId");

-- CreateIndex
CREATE UNIQUE INDEX "Round_roomId_key" ON "Round"("roomId");

-- AddForeignKey
ALTER TABLE "User_Room" ADD CONSTRAINT "User_Room_userDataId_fkey" FOREIGN KEY ("userDataId") REFERENCES "UserData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Room" ADD CONSTRAINT "User_Room_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Round" ADD CONSTRAINT "Round_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
