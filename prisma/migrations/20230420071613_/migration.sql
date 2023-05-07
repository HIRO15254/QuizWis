-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "RuleType" ADD VALUE 'SIMPLE';
ALTER TYPE "RuleType" ADD VALUE 'PLUS_MINUS';
ALTER TYPE "RuleType" ADD VALUE 'UP_DOWN';
ALTER TYPE "RuleType" ADD VALUE 'SWEDISH';
ALTER TYPE "RuleType" ADD VALUE 'BY';
ALTER TYPE "RuleType" ADD VALUE 'DIVIDE';

-- AlterTable
ALTER TABLE "Rule" ADD COLUMN     "questionLimit" INTEGER,
ADD COLUMN     "timeLimit" TIMESTAMP(3),
ALTER COLUMN "name" DROP NOT NULL;
