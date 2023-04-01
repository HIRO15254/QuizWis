/*
  Warnings:

  - You are about to drop the `_RoomToUserData` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "RoomRole" AS ENUM ('OWNER', 'PLAYER');

-- DropForeignKey
ALTER TABLE "_RoomToUserData" DROP CONSTRAINT "_RoomToUserData_A_fkey";

-- DropForeignKey
ALTER TABLE "_RoomToUserData" DROP CONSTRAINT "_RoomToUserData_B_fkey";

-- AlterTable
ALTER TABLE "UserData" ADD COLUMN     "roomId" TEXT,
ADD COLUMN     "roomRole" "RoomRole";

-- DropTable
DROP TABLE "_RoomToUserData";

-- AddForeignKey
ALTER TABLE "UserData" ADD CONSTRAINT "UserData_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE SET NULL ON UPDATE CASCADE;
