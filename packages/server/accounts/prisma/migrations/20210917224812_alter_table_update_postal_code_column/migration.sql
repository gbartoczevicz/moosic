/*
  Warnings:

  - You are about to drop the column `postalCode` on the `locations` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[postal_code]` on the table `locations` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `postal_code` to the `locations` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "locations.postalCode_unique";

-- AlterTable
ALTER TABLE "locations" DROP COLUMN "postalCode",
ADD COLUMN     "postal_code" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "locations.postal_code_unique" ON "locations"("postal_code");
