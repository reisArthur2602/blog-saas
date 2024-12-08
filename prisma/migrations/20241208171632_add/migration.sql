/*
  Warnings:

  - Added the required column `category` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PostCategory" AS ENUM ('TECHNOLOGY', 'EDUCATION', 'HEALTH_AND_WELLNESS', 'TRAVEL', 'BUSINESS_AND_ENTREPRENEURSHIP', 'CULTURE_AND_ENTERTAINMENT', 'CULINARY_AND_GASTRONOMY', 'LIFESTYLE', 'SCIENCE_AND_INNOVATION', 'SUSTAINABILITY_AND_ENVIRONMENT');

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "category" "PostCategory" NOT NULL;
