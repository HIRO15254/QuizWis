/*
  Warnings:

  - You are about to drop the column `isCurrent` on the `Round` table. All the data in the column will be lost.
  - You are about to drop the column `roomId` on the `Round` table. All the data in the column will be lost.
  - You are about to drop the column `isCurrent` on the `RoundAction` table. All the data in the column will be lost.
  - You are about to drop the column `userDataId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `roomId` on the `UserData` table. All the data in the column will be lost.
  - You are about to drop the `Room` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_adminUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_playerUser` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[scoreBoardRoomId]` on the table `Round` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[authUserId]` on the table `UserData` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `scoreBoardRoomId` to the `Round` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Rule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authUserId` to the `UserData` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ScoreBoardRoomRole" AS ENUM ('OWNER', 'MEMBER');

-- CreateEnum
CREATE TYPE "RoundRole" AS ENUM ('PRAYER', 'ADMIN');

-- DropForeignKey
ALTER TABLE "Round" DROP CONSTRAINT "Round_roomId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_userDataId_fkey";

-- DropForeignKey
ALTER TABLE "UserData" DROP CONSTRAINT "UserData_roomId_fkey";

-- DropForeignKey
ALTER TABLE "_adminUser" DROP CONSTRAINT "_adminUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_adminUser" DROP CONSTRAINT "_adminUser_B_fkey";

-- DropForeignKey
ALTER TABLE "_playerUser" DROP CONSTRAINT "_playerUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_playerUser" DROP CONSTRAINT "_playerUser_B_fkey";

-- DropIndex
DROP INDEX "User_userDataId_key";

-- AlterTable
ALTER TABLE "Round" DROP COLUMN "isCurrent",
DROP COLUMN "roomId",
ADD COLUMN     "scoreBoardRoomId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "RoundAction" DROP COLUMN "isCurrent",
ADD COLUMN     "params" INTEGER[];

-- AlterTable
ALTER TABLE "Rule" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "userDataId";

-- AlterTable
ALTER TABLE "UserData" DROP COLUMN "roomId",
ADD COLUMN     "authUserId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Room";

-- DropTable
DROP TABLE "_adminUser";

-- DropTable
DROP TABLE "_playerUser";

-- CreateTable
CREATE TABLE "ScoreBoardRoom" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "hashedPassword" TEXT,

    CONSTRAINT "ScoreBoardRoom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User_ScoreBoardRoom" (
    "userDataId" TEXT NOT NULL,
    "scoreBoardRoomId" TEXT NOT NULL,
    "role" "ScoreBoardRoomRole" NOT NULL DEFAULT 'MEMBER',

    CONSTRAINT "User_ScoreBoardRoom_pkey" PRIMARY KEY ("userDataId","scoreBoardRoomId")
);

-- CreateTable
CREATE TABLE "User_Round" (
    "userDataId" TEXT NOT NULL,
    "roundId" TEXT NOT NULL,
    "role" "RoundRole" NOT NULL,
    "rootActionId" TEXT NOT NULL,
    "headActionId" TEXT,

    CONSTRAINT "User_Round_pkey" PRIMARY KEY ("userDataId","roundId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Round_userDataId_key" ON "User_Round"("userDataId");

-- CreateIndex
CREATE UNIQUE INDEX "User_Round_rootActionId_key" ON "User_Round"("rootActionId");

-- CreateIndex
CREATE UNIQUE INDEX "User_Round_headActionId_key" ON "User_Round"("headActionId");

-- CreateIndex
CREATE UNIQUE INDEX "Round_scoreBoardRoomId_key" ON "Round"("scoreBoardRoomId");

-- CreateIndex
CREATE UNIQUE INDEX "UserData_authUserId_key" ON "UserData"("authUserId");

-- CreateIndex
CREATE INDEX "UserData_userId_idx" ON "UserData" USING HASH ("userId");

-- CreateIndex
CREATE INDEX "UserData_name_idx" ON "UserData" USING HASH ("name");

-- AddForeignKey
ALTER TABLE "UserData" ADD CONSTRAINT "UserData_authUserId_fkey" FOREIGN KEY ("authUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_ScoreBoardRoom" ADD CONSTRAINT "User_ScoreBoardRoom_userDataId_fkey" FOREIGN KEY ("userDataId") REFERENCES "UserData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_ScoreBoardRoom" ADD CONSTRAINT "User_ScoreBoardRoom_scoreBoardRoomId_fkey" FOREIGN KEY ("scoreBoardRoomId") REFERENCES "ScoreBoardRoom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Round" ADD CONSTRAINT "Round_scoreBoardRoomId_fkey" FOREIGN KEY ("scoreBoardRoomId") REFERENCES "ScoreBoardRoom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Round" ADD CONSTRAINT "User_Round_userDataId_fkey" FOREIGN KEY ("userDataId") REFERENCES "UserData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Round" ADD CONSTRAINT "User_Round_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES "Round"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Round" ADD CONSTRAINT "User_Round_rootActionId_fkey" FOREIGN KEY ("rootActionId") REFERENCES "RoundAction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Round" ADD CONSTRAINT "User_Round_headActionId_fkey" FOREIGN KEY ("headActionId") REFERENCES "RoundAction"("id") ON DELETE SET NULL ON UPDATE CASCADE;
