/*
  Warnings:

  - You are about to drop the column `cullentRuleId` on the `Room` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[currentRuleId]` on the table `Room` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `currentRuleId` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_cullentRuleId_fkey";

-- DropIndex
DROP INDEX "Room_cullentRuleId_key";

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "cullentRuleId",
ADD COLUMN     "currentRuleId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Room_currentRuleId_key" ON "Room"("currentRuleId");

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_currentRuleId_fkey" FOREIGN KEY ("currentRuleId") REFERENCES "Rule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
