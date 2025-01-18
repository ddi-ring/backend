-- DropForeignKey
ALTER TABLE "event_card" DROP CONSTRAINT "event_card_thumbnail_image_id_fkey";

-- AlterTable
ALTER TABLE "event_card" ALTER COLUMN "thumbnail_image_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "event_card" ADD CONSTRAINT "event_card_thumbnail_image_id_fkey" FOREIGN KEY ("thumbnail_image_id") REFERENCES "event_card_file"("id") ON DELETE SET NULL ON UPDATE CASCADE;
