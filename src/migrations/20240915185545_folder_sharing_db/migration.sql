-- AlterTable
ALTER TABLE "Folder" ADD COLUMN     "isPublic" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "sharedUntil" TIMESTAMP(3);
