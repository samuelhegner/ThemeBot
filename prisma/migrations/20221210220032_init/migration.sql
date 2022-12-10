/*
  Warnings:

  - You are about to drop the column `creator` on the `Entry` table. All the data in the column will be lost.
  - You are about to drop the column `entryName` on the `Entry` table. All the data in the column will be lost.
  - You are about to drop the column `submissionTime` on the `Entry` table. All the data in the column will be lost.
  - You are about to drop the column `themeName` on the `Entry` table. All the data in the column will be lost.
  - Added the required column `name` to the `Entry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `theme_name` to the `Entry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_name` to the `Entry` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Entry` DROP FOREIGN KEY `Entry_creator_fkey`;

-- DropForeignKey
ALTER TABLE `Entry` DROP FOREIGN KEY `Entry_themeName_fkey`;

-- AlterTable
ALTER TABLE `Entry` DROP COLUMN `creator`,
    DROP COLUMN `entryName`,
    DROP COLUMN `submissionTime`,
    DROP COLUMN `themeName`,
    ADD COLUMN `create_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `theme_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `update_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `user_name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Theme` MODIFY `end_date` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `create_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE `Entry` ADD CONSTRAINT `Entry_user_name_fkey` FOREIGN KEY (`user_name`) REFERENCES `User`(`user_name`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Entry` ADD CONSTRAINT `Entry_theme_name_fkey` FOREIGN KEY (`theme_name`) REFERENCES `Theme`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;
