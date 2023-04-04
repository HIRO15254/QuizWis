/*
  Warnings:

  - You are about to drop the column `currentRuleId` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the `Action` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_RuleToUserData` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `ruleType` to the `Rule` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RuleType" AS ENUM ('FREE');

-- CreateEnum
CREATE TYPE "RuleActionType" AS ENUM ('JOIN', 'LEAVE', 'CORRECT', 'WRONG', 'THROUGH');

-- DropForeignKey
ALTER TABLE "Action" DROP CONSTRAINT "Action_actionUserId_fkey";

-- DropForeignKey
ALTER TABLE "Action" DROP CONSTRAINT "Action_ruleId_fkey";

-- DropForeignKey
ALTER TABLE "Action" DROP CONSTRAINT "Action_targetUserId_fkey";

-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_currentRuleId_fkey";

-- DropForeignKey
ALTER TABLE "_RuleToUserData" DROP CONSTRAINT "_RuleToUserData_A_fkey";

-- DropForeignKey
ALTER TABLE "_RuleToUserData" DROP CONSTRAINT "_RuleToUserData_B_fkey";

-- DropIndex
DROP INDEX "Room_currentRuleId_key";

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "currentRuleId";

-- AlterTable
ALTER TABLE "Rule" ADD COLUMN     "isCurrent" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "ruleType" "RuleType" NOT NULL;

-- DropTable
DROP TABLE "Action";

-- DropTable
DROP TABLE "_RuleToUserData";

-- CreateTable
CREATE TABLE "RuleAction" (
    "id" TEXT NOT NULL,
    "ruleId" TEXT NOT NULL,
    "actionUserId" TEXT NOT NULL,
    "targetUserId" TEXT NOT NULL,
    "actionType" "RuleActionType" NOT NULL,
    "prevActionId" TEXT,
    "isCurrent" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RuleAction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RuleAction_prevActionId_key" ON "RuleAction"("prevActionId");

-- AddForeignKey
ALTER TABLE "RuleAction" ADD CONSTRAINT "RuleAction_ruleId_fkey" FOREIGN KEY ("ruleId") REFERENCES "Rule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RuleAction" ADD CONSTRAINT "RuleAction_actionUserId_fkey" FOREIGN KEY ("actionUserId") REFERENCES "UserData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RuleAction" ADD CONSTRAINT "RuleAction_targetUserId_fkey" FOREIGN KEY ("targetUserId") REFERENCES "UserData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RuleAction" ADD CONSTRAINT "RuleAction_prevActionId_fkey" FOREIGN KEY ("prevActionId") REFERENCES "RuleAction"("id") ON DELETE SET NULL ON UPDATE CASCADE;
