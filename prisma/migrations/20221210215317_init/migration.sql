/*
  Warnings:

  - You are about to drop the column `userName` on the `Entry` table. All the data in the column will be lost.
  - Added the required column `creator` to the `Entry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `creator` to the `Theme` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Entry` DROP FOREIGN KEY `Entry_userName_fkey`;

-- AlterTable
ALTER TABLE `Entry` DROP COLUMN `userName`,
    ADD COLUMN `creator` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Theme` ADD COLUMN `creator` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Theme` ADD CONSTRAINT `Theme_creator_fkey` FOREIGN KEY (`creator`) REFERENCES `User`(`user_name`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Entry` ADD CONSTRAINT `Entry_creator_fkey` FOREIGN KEY (`creator`) REFERENCES `User`(`user_name`) ON DELETE RESTRICT ON UPDATE CASCADE;
