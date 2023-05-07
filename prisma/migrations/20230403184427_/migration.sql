/*
  Warnings:

  - You are about to drop the column `roomDatabaseId` on the `Rule` table. All the data in the column will be lost.
  - Added the required column `roomId` to the `Rule` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Rule" DROP CONSTRAINT "Rule_roomDatabaseId_fkey";

-- AlterTable
ALTER TABLE "Rule" DROP COLUMN "roomDatabaseId",
ADD COLUMN     "roomId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Rule" ADD CONSTRAINT "Rule_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
