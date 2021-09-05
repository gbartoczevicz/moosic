/*
  Warnings:

  - You are about to drop the column `userId` on the `restaurateurs` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `restaurateurs` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `restaurateurs` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "restaurateurs" DROP CONSTRAINT "restaurateurs_userId_fkey";

-- DropIndex
DROP INDEX "restaurateurs.userId_unique";

-- AlterTable
ALTER TABLE "restaurateurs" DROP COLUMN "userId",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "restaurateurs.user_id_unique" ON "restaurateurs"("user_id");

-- AddForeignKey
ALTER TABLE "restaurateurs" ADD FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
