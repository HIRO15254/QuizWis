/*
  Warnings:

  - A unique constraint covering the columns `[cullentRuleId]` on the table `Room` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cullentRuleId` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RuleType" AS ENUM ('ACTION', 'RULE');

-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "cullentRuleId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Rule" (
    "id" TEXT NOT NULL,
    "roomDatabaseId" TEXT NOT NULL,

    CONSTRAINT "Rule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Action" (
    "id" TEXT NOT NULL,
    "ruleId" TEXT NOT NULL,
    "actionUserId" TEXT NOT NULL,
    "targetUserId" TEXT NOT NULL,
    "actionType" TEXT NOT NULL,

    CONSTRAINT "Action_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_RuleToUserData" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_RuleToUserData_AB_unique" ON "_RuleToUserData"("A", "B");

-- CreateIndex
CREATE INDEX "_RuleToUserData_B_index" ON "_RuleToUserData"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Room_cullentRuleId_key" ON "Room"("cullentRuleId");

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_cullentRuleId_fkey" FOREIGN KEY ("cullentRuleId") REFERENCES "Rule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rule" ADD CONSTRAINT "Rule_roomDatabaseId_fkey" FOREIGN KEY ("roomDatabaseId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_ruleId_fkey" FOREIGN KEY ("ruleId") REFERENCES "Rule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_actionUserId_fkey" FOREIGN KEY ("actionUserId") REFERENCES "UserData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_targetUserId_fkey" FOREIGN KEY ("targetUserId") REFERENCES "UserData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RuleToUserData" ADD CONSTRAINT "_RuleToUserData_A_fkey" FOREIGN KEY ("A") REFERENCES "Rule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RuleToUserData" ADD CONSTRAINT "_RuleToUserData_B_fkey" FOREIGN KEY ("B") REFERENCES "UserData"("id") ON DELETE CASCADE ON UPDATE CASCADE;
