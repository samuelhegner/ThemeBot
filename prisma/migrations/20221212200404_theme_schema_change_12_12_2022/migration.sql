/*
  Warnings:

  - You are about to drop the column `creator` on the `Theme` table. All the data in the column will be lost.
  - Added the required column `creatorId` to the `Theme` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Theme` DROP FOREIGN KEY `Theme_creator_fkey`;

-- AlterTable
ALTER TABLE `Theme` DROP COLUMN `creator`,
    ADD COLUMN `creatorId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Theme` ADD CONSTRAINT `Theme_creatorId_fkey` FOREIGN KEY (`creatorId`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
