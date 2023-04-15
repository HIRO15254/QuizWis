/*
  Warnings:

  - The values [JOIN] on the enum `RoundActionType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `roomRole` on the `UserData` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "RoundActionType_new" AS ENUM ('JOIN_ADMIN', 'JOIN_PLAYER', 'MOVE_ADMIN', 'MOVE_PLAYER', 'LEAVE', 'CORRECT', 'WRONG', 'THROUGH');
ALTER TABLE "RoundAction" ALTER COLUMN "actionType" TYPE "RoundActionType_new" USING ("actionType"::text::"RoundActionType_new");
ALTER TYPE "RoundActionType" RENAME TO "RoundActionType_old";
ALTER TYPE "RoundActionType_new" RENAME TO "RoundActionType";
DROP TYPE "RoundActionType_old";
COMMIT;

-- AlterTable
ALTER TABLE "UserData" DROP COLUMN "roomRole";

-- DropEnum
DROP TYPE "RoomRole";

-- CreateTable
CREATE TABLE "_adminUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_playerUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_adminUser_AB_unique" ON "_adminUser"("A", "B");

-- CreateIndex
CREATE INDEX "_adminUser_B_index" ON "_adminUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_playerUser_AB_unique" ON "_playerUser"("A", "B");

-- CreateIndex
CREATE INDEX "_playerUser_B_index" ON "_playerUser"("B");

-- AddForeignKey
ALTER TABLE "_adminUser" ADD CONSTRAINT "_adminUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Round"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_adminUser" ADD CONSTRAINT "_adminUser_B_fkey" FOREIGN KEY ("B") REFERENCES "UserData"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_playerUser" ADD CONSTRAINT "_playerUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Round"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_playerUser" ADD CONSTRAINT "_playerUser_B_fkey" FOREIGN KEY ("B") REFERENCES "UserData"("id") ON DELETE CASCADE ON UPDATE CASCADE;
