/*
  Warnings:

  - The values [PRAYER] on the enum `RoundRole` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "RoundRole_new" AS ENUM ('PLAYER', 'ADMIN');
ALTER TABLE "User_Round" ALTER COLUMN "role" TYPE "RoundRole_new" USING ("role"::text::"RoundRole_new");
ALTER TYPE "RoundRole" RENAME TO "RoundRole_old";
ALTER TYPE "RoundRole_new" RENAME TO "RoundRole";
DROP TYPE "RoundRole_old";
COMMIT;
