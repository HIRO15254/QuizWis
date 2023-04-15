/*
  Warnings:

  - You are about to drop the column `authUserId` on the `UserData` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userDataId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "UserData" DROP CONSTRAINT "UserData_authUserId_fkey";

-- DropIndex
DROP INDEX "UserData_authUserId_key";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "userDataId" TEXT;

-- AlterTable
ALTER TABLE "UserData" DROP COLUMN "authUserId";

-- CreateIndex
CREATE UNIQUE INDEX "User_userDataId_key" ON "User"("userDataId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_userDataId_fkey" FOREIGN KEY ("userDataId") REFERENCES "UserData"("id") ON DELETE SET NULL ON UPDATE CASCADE;
