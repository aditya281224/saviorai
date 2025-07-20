/*
  Warnings:

  - You are about to drop the `CoverLetter` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CoverLetter" DROP CONSTRAINT "CoverLetter_userId_fkey";

-- DropTable
DROP TABLE "CoverLetter";
