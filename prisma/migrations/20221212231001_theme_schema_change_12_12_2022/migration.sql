/*
  Warnings:

  - Added the required column `image_url` to the `Theme` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Theme` ADD COLUMN `image_url` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE INDEX `Theme_name_idx` ON `Theme`(`name`);
