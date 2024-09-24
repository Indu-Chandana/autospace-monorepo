/*
  Warnings:

  - You are about to drop the column `licenceId` on the `Valet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Valet" DROP COLUMN "licenceId",
ADD COLUMN     "licenceID" TEXT NOT NULL DEFAULT '';
