/*
  Warnings:

  - You are about to drop the column `isCurrent` on the `Rule` table. All the data in the column will be lost.
  - You are about to drop the column `roomId` on the `Rule` table. All the data in the column will be lost.
  - You are about to drop the `RuleAction` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "RoundActionType" AS ENUM ('JOIN', 'LEAVE', 'CORRECT', 'WRONG', 'THROUGH');

-- DropForeignKey
ALTER TABLE "Rule" DROP CONSTRAINT "Rule_roomId_fkey";

-- DropForeignKey
ALTER TABLE "RuleAction" DROP CONSTRAINT "RuleAction_actionUserId_fkey";

-- DropForeignKey
ALTER TABLE "RuleAction" DROP CONSTRAINT "RuleAction_prevActionId_fkey";

-- DropForeignKey
ALTER TABLE "RuleAction" DROP CONSTRAINT "RuleAction_ruleId_fkey";

-- DropForeignKey
ALTER TABLE "RuleAction" DROP CONSTRAINT "RuleAction_targetUserId_fkey";

-- AlterTable
ALTER TABLE "Rule" DROP COLUMN "isCurrent",
DROP COLUMN "roomId",
ADD COLUMN     "params" INTEGER[];

-- DropTable
DROP TABLE "RuleAction";

-- DropEnum
DROP TYPE "RuleActionType";

-- CreateTable
CREATE TABLE "Round" (
    "id" TEXT NOT NULL,
    "ruleId" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "isCurrent" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Round_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoundAction" (
    "id" TEXT NOT NULL,
    "roundId" TEXT NOT NULL,
    "actionUserId" TEXT NOT NULL,
    "targetUserId" TEXT NOT NULL,
    "actionType" "RoundActionType" NOT NULL,
    "prevActionId" TEXT,
    "isCurrent" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RoundAction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RoundAction_prevActionId_key" ON "RoundAction"("prevActionId");

-- AddForeignKey
ALTER TABLE "Round" ADD CONSTRAINT "Round_ruleId_fkey" FOREIGN KEY ("ruleId") REFERENCES "Rule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Round" ADD CONSTRAINT "Round_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoundAction" ADD CONSTRAINT "RoundAction_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES "Round"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoundAction" ADD CONSTRAINT "RoundAction_actionUserId_fkey" FOREIGN KEY ("actionUserId") REFERENCES "UserData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoundAction" ADD CONSTRAINT "RoundAction_targetUserId_fkey" FOREIGN KEY ("targetUserId") REFERENCES "UserData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoundAction" ADD CONSTRAINT "RoundAction_prevActionId_fkey" FOREIGN KEY ("prevActionId") REFERENCES "RoundAction"("id") ON DELETE SET NULL ON UPDATE CASCADE;
