-- DropIndex
DROP INDEX "Comparison_createdAt_idx";

-- DropIndex
DROP INDEX "Comparison_userId_idx";

-- AlterTable
ALTER TABLE "Comparison" ADD COLUMN     "claudeScore" INTEGER,
ADD COLUMN     "geminiScore" INTEGER,
ADD COLUMN     "gptScore" INTEGER,
ADD COLUMN     "winner" TEXT;
