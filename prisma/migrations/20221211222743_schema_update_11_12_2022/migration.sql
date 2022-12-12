/*
  Warnings:

  - You are about to drop the column `user_name` on the `Entry` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[user_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `author` to the `Entry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_url` to the `Entry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Entry` DROP FOREIGN KEY `Entry_user_name_fkey`;

-- DropForeignKey
ALTER TABLE `Theme` DROP FOREIGN KEY `Theme_creator_fkey`;

-- DropIndex
DROP INDEX `User_user_name_key` ON `User`;

-- AlterTable
ALTER TABLE `Entry` DROP COLUMN `user_name`,
    ADD COLUMN `author` VARCHAR(191) NOT NULL,
    ADD COLUMN `image_url` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Theme` ADD COLUMN `update_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `User` DROP PRIMARY KEY,
    ADD COLUMN `user_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`user_id`);

-- CreateIndex
CREATE INDEX `Theme_start_date_idx` ON `Theme`(`start_date`);

-- CreateIndex
CREATE UNIQUE INDEX `User_user_id_key` ON `User`(`user_id`);

-- AddForeignKey
ALTER TABLE `Theme` ADD CONSTRAINT `Theme_creator_fkey` FOREIGN KEY (`creator`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Entry` ADD CONSTRAINT `Entry_author_fkey` FOREIGN KEY (`author`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
