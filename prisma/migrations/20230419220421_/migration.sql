/*
  Warnings:

  - The primary key for the `User_Round` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[userDataId,roundId]` on the table `User_Round` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `User_Round` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "User_Round" DROP CONSTRAINT "User_Round_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "User_Round_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_Round_userDataId_roundId_key" ON "User_Round"("userDataId", "roundId");
